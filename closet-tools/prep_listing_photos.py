#!/usr/bin/env python3
"""
Prepare mannequin-shot closet photos for marketplace listings.

Assumes a uniform light-to-mid gray backdrop, which is used as a
known-neutral reference for color correction and as fill when padding
to a different aspect ratio.

Outputs, per source image:
  <id>_poshmark.jpg   1200x1600  (3:4 portrait cover slot)
  <id>_ebay.jpg       1600x1600  (square, zoom-enabled)

Usage:
  python3 prep_listing_photos.py IN_DIR OUT_DIR [--no-neutralize]
"""

import argparse
import os
import sys

from PIL import Image, ImageEnhance, ImageOps, ImageFilter, ImageStat

POSH_SIZE = (1200, 1600)   # 3:4 portrait
EBAY_SIZE = (1600, 1600)   # 1:1 square
MARGIN = 0.06              # fraction of item bbox kept as breathing room
JPEG_QUALITY = 92


def sample_backdrop(img, frac=0.045):
    """Median color of the four corner patches = the backdrop."""
    w, h = img.size
    bw, bh = max(8, int(w * frac)), max(8, int(h * frac))
    patches = [
        img.crop((0, 0, bw, bh)),
        img.crop((w - bw, 0, w, bh)),
        img.crop((0, h - bh, bw, h)),
        img.crop((w - bw, h - bh, w, h)),
    ]
    channels = []
    for c in range(3):
        vals = sorted(ImageStat.Stat(p).median[c] for p in patches)
        channels.append((vals[1] + vals[2]) / 2.0)  # middle two, drop outliers
    return tuple(int(round(v)) for v in channels)


def neutralize(img, backdrop):
    """Remove the lighting's color cast.

    A true-gray backdrop must have R == G == B. Whatever spread we
    measure is the cast, so we scale each channel to flatten it. This
    moves the image toward true color, never away from it.
    """
    target = sum(backdrop) / 3.0
    if target <= 1:
        return img, backdrop
    scales = [target / max(v, 1) for v in backdrop]
    # Clamp so a wildly off reading can't wreck the image.
    scales = [min(max(s, 0.75), 1.33) for s in scales]
    lut = []
    for s in scales:
        lut.extend(min(255, int(round(i * s))) for i in range(256))
    out = img.point(lut)
    return out, sample_backdrop(out)


def item_bbox(img, backdrop, tol=26):
    """Bounding box of everything that isn't backdrop."""
    bg = Image.new("RGB", img.size, backdrop)
    diff = ImageOps.grayscale(Image.blend(img, bg, 0.0))
    # Manual per-pixel distance is slow; use difference against a flat bg.
    from PIL import ImageChops
    d = ImageChops.difference(img, bg).convert("L")
    mask = d.point(lambda p: 255 if p > tol else 0)
    mask = mask.filter(ImageFilter.MedianFilter(5))
    return mask.getbbox()


def expand_bbox(box, size, margin=MARGIN):
    if box is None:
        return (0, 0, size[0], size[1])
    l, t, r, b = box
    w, h = r - l, b - t
    mx, my = int(w * margin), int(h * margin)
    return (
        max(0, l - mx), max(0, t - my),
        min(size[0], r + mx), min(size[1], b + my),
    )


def fit_to_ratio(img, box, ratio_w, ratio_h, backdrop):
    """Crop around the item to the target ratio, padding with backdrop
    color when the source doesn't have enough room."""
    l, t, r, b = box
    cx, cy = (l + r) / 2.0, (t + b) / 2.0
    bw, bh = r - l, b - t

    target = ratio_w / ratio_h
    if bw / bh > target:
        out_w = bw
        out_h = bw / target
    else:
        out_h = bh
        out_w = bh * target

    nl = int(round(cx - out_w / 2))
    nt = int(round(cy - out_h / 2))
    nr = int(round(cx + out_w / 2))
    nb = int(round(cy + out_h / 2))

    canvas = Image.new("RGB", (nr - nl, nb - nt), backdrop)
    sl, st = max(0, nl), max(0, nt)
    sr, sb = min(img.size[0], nr), min(img.size[1], nb)
    if sr > sl and sb > st:
        canvas.paste(img.crop((sl, st, sr, sb)), (sl - nl, st - nt))
    return canvas


def normalize_exposure(img, backdrop, floor=188):
    """Lift the backdrop toward a clean light gray without clipping."""
    level = sum(backdrop) / 3.0
    if level >= floor:
        return img
    factor = min(floor / max(level, 1), 1.45)
    return ImageEnhance.Brightness(img).enhance(factor)


def process(path, out_dir, do_neutralize=True):
    stem = os.path.splitext(os.path.basename(path))[0]
    img = ImageOps.exif_transpose(Image.open(path)).convert("RGB")

    backdrop = sample_backdrop(img)
    if do_neutralize:
        img, backdrop = neutralize(img, backdrop)

    img = normalize_exposure(img, backdrop)
    backdrop = sample_backdrop(img)

    box = expand_bbox(item_bbox(img, backdrop), img.size)

    results = []
    for label, (rw, rh), size in (
        ("poshmark", (3, 4), POSH_SIZE),
        ("ebay", (1, 1), EBAY_SIZE),
    ):
        framed = fit_to_ratio(img, box, rw, rh, backdrop)
        framed = framed.resize(size, Image.LANCZOS)
        framed = framed.filter(
            ImageFilter.UnsharpMask(radius=1.6, percent=105, threshold=3)
        )
        dest = os.path.join(out_dir, f"{stem}_{label}.jpg")
        framed.save(dest, "JPEG", quality=JPEG_QUALITY, optimize=True)
        results.append(dest)

    return backdrop, box, results


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("in_dir")
    ap.add_argument("out_dir")
    ap.add_argument("--no-neutralize", action="store_true")
    args = ap.parse_args()

    os.makedirs(args.out_dir, exist_ok=True)
    exts = {".jpg", ".jpeg", ".png", ".heic", ".webp", ".tif", ".tiff"}
    files = sorted(
        f for f in os.listdir(args.in_dir)
        if os.path.splitext(f)[1].lower() in exts
    )
    if not files:
        sys.exit(f"No images found in {args.in_dir}")

    for f in files:
        src = os.path.join(args.in_dir, f)
        try:
            backdrop, box, out = process(src, args.out_dir, not args.no_neutralize)
            print(f"{f}: backdrop={backdrop} item_box={box}")
            for o in out:
                print(f"    -> {os.path.basename(o)}")
        except Exception as e:
            print(f"{f}: FAILED ({e})")


if __name__ == "__main__":
    main()
