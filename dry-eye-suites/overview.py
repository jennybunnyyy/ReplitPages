"""Build a one-image overview of each clinic's suite (like a product mockup) + a combined PDF."""
import base64, glob, os, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build import BRANDS, CHROME, ROOT

LABELS = {"01": "At-Home Plan", "02": "Intake & SPEED", "03": "Tri-Fold Brochure", "04": "Treatment Plan & Pricing",
          "05": "Aftercare Rack Card", "06": "Treatment Logs", "07": "Consent Package"}

for slug, b in BRANDS.items():
    out = os.path.join(ROOT, "out", slug)
    pdfs = sorted(glob.glob(os.path.join(out, "0*.pdf")))
    order = ["03", "01", "02", "04", "05", "06", "07"]
    subprocess.run(["pdfunite", *pdfs, os.path.join(out, f"{slug}-dry-eye-suite-ALL.pdf")], check=True)
    tiles = []
    for p in sorted(pdfs, key=lambda p: order.index(os.path.basename(p)[:2])):
        n = os.path.basename(p)[:2]
        pre = os.path.join(out, "preview", os.path.basename(p)[:-4])
        subprocess.run(["pdftoppm", "-png", "-r", "70", p, pre], check=True)
        pages = sorted(glob.glob(pre + "-*.png"))[:3]
        imgs = "".join(f'<img src="data:image/png;base64,{base64.b64encode(open(x,"rb").read()).decode()}" style="--i:{i}">' for i, x in enumerate(pages))
        tiles.append(f'<div class="tile t{n}"><div class="stack n{len(pages)}">{imgs}</div><div class="lab"><span>{int(n)}</span>{LABELS[n]}</div></div>')
    c = b["c"]
    html = f"""<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?{b['fonts']}&display=block" rel="stylesheet"><style>
html{{background:#111}}body{{margin:0;width:1600px;height:2000px;background:radial-gradient(120% 80% at 30% 0%, {c['acc2']} 0%, {c['ink']} 55%, #111 100%);font-family:{b['bf']};color:{c['paper']};overflow:hidden}}
.hd{{display:flex;justify-content:space-between;align-items:flex-end;padding:70px 80px 30px}}
.hd .logo{{height:110px}} .wordmark{{display:flex;align-items:center;gap:16px;color:{c['soft']}}} .wordmark .lotus{{width:80px;height:56px}}
.wm1{{display:block;font-family:{b['hf']};font-size:52px;color:{c['paper']};line-height:.95}} .wm2{{display:block;font-size:15px;letter-spacing:.32em;text-transform:uppercase;color:{c['soft']};margin-top:6px}}
h1{{font-family:{b['hf']};font-weight:500;font-size:96px;margin:0;line-height:.9;text-align:right}} h1 em{{color:{c['soft']}}}
.sub{{text-align:right;letter-spacing:.24em;text-transform:uppercase;font-size:16px;color:{c['line']};margin-top:12px}}
.grid{{display:grid;grid-template-columns:repeat(3,1fr);gap:40px 50px;padding:30px 80px}}
.tile{{display:flex;flex-direction:column;align-items:center}} .t03{{grid-column:span 2}}
.stack{{position:relative;height:420px;width:100%}}
.stack img{{position:absolute;top:calc(var(--i)*26px);left:calc(50% - 150px + var(--i)*46px);height:380px;box-shadow:0 18px 40px rgba(0,0,0,.45);border-radius:3px}}
.t03 .stack img{{height:340px;left:calc(var(--i)*260px + 20px)}} .t05 .stack img{{left:calc(50% - 110px + var(--i)*110px)}}
.lab{{margin-top:8px;font-family:{b['hf']};font-size:32px;display:flex;align-items:center;gap:12px}}
.info{{align-self:center;border:1px solid {c['acc2']};border-radius:18px;padding:30px 34px;font-size:22px;line-height:1.5}} .info .k{{font-size:14px;letter-spacing:.24em;text-transform:uppercase;color:{c['soft']}}} .info ul{{margin:10px 0 0;padding-left:20px}}
.lab span{{width:40px;height:40px;border-radius:50%;background:{c['acc']};display:flex;align-items:center;justify-content:center;font-size:22px;color:#fff}}
</style></head><body><div class="hd">{b['logo_light']}<div><h1>Dry Eye <em>Suite</em></h1><div class="sub">Patient education · Forms · Consents</div></div></div>
<div class="grid">{''.join(tiles)}<div class="info"><div class="k">Tailored to {b['short']}</div><ul>{''.join(f'<li>{t[1]}</li>' for t in b['treatments'])}</ul><div class="k" style="margin-top:18px">{b['site']}</div></div></div></body></html>"""
    hp = os.path.join(out, "html", "overview.html")
    open(hp, "w").write(html)
    subprocess.run([CHROME, "--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--window-size=1600,2000",
                    "--virtual-time-budget=15000", f"--screenshot={os.path.join(out, slug + '-suite-overview.png')}", "file://" + hp],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("overview", slug)
