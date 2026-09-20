# Closet listing photo tools

Prep mannequin-shot photos for Poshmark / eBay / Mercari listings.

## Assumptions

- Uniform light-to-mid gray backdrop, used as a known-neutral reference
  for color correction and as fill when padding to another aspect ratio.
- Shot in portrait, with margin around the item on all four sides.

## Usage

```
pip install Pillow
python3 prep_listing_photos.py IN_DIR OUT_DIR
```

Per source image it writes:

| Output | Size | For |
| --- | --- | --- |
| `<id>_poshmark.jpg` | 1200x1600 (3:4) | Poshmark portrait cover slot |
| `<id>_ebay.jpg` | 1600x1600 (1:1) | eBay, zoom-enabled |

`--no-neutralize` skips white-balance correction, for when the backdrop
is intentionally not gray.

## What it does

1. Applies EXIF orientation.
2. Samples the backdrop from four corner patches (median, outliers dropped).
3. Neutralizes the lighting's color cast so the gray reads as true gray.
4. Lifts exposure so the backdrop sits at a clean light gray.
5. Finds the item's bounding box by difference from the backdrop.
6. Crops to each target ratio around the item, padding with the sampled
   backdrop color where the source runs out of room.
7. Resizes and applies unsharp mask.

Corrections move toward true color, never away from it. Misrepresenting
an item's color causes returns and not-as-described cases.
