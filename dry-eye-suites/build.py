"""Generate branded dry eye patient-education suites for each client practice.

Usage: python3 build.py            -> writes HTML + PDF + PNG previews to out/<clinic>/
"""
import base64, io, os, subprocess, sys
import qrcode

ROOT = os.path.dirname(os.path.abspath(__file__))
CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"


def b64img(path):
    ext = path.rsplit(".", 1)[1].replace("jpg", "jpeg")
    with open(path, "rb") as f:
        return f"data:image/{ext};base64," + base64.b64encode(f.read()).decode()


def qr(url, color):
    q = qrcode.QRCode(border=0, box_size=10)
    q.add_data(url)
    img = q.make_image(fill_color=color, back_color="white")
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()


LOTUS = """<svg viewBox="0 0 64 44" class="lotus" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round">
<path d="M32 4c-6 7-8 15-6 24 2 6 4 10 6 12 2-2 4-6 6-12 2-9 0-17-6-24z"/>
<path d="M26 28c-5-6-12-9-19-9 1 9 6 17 15 20 4 1 8 1 10 1"/>
<path d="M38 28c5-6 12-9 19-9-1 9-6 17-15 20-4 1-8 1-10 1"/>
<path d="M4 40c8 3 18 3 28 0 10 3 20 3 28 0"/></g></svg>"""

# ----------------------------------------------------------------------------
# Brand + practice data (pulled from each practice's website)
# ----------------------------------------------------------------------------
A = lambda p: os.path.join(ROOT, "assets", p)

BRANDS = {
    "inland-family-optometry": dict(
        name="Inland Family Optometry",
        short="Inland Family",
        tagline="A clearer view, the Inland way.",
        site="inlandfamilyvision.com",
        url="https://www.inlandfamilyvision.com",
        logo=f'<img class="logo" src="{b64img(A("ifo/ifo-logo.png"))}" alt="Inland Family Optometry">',
        logo_light=f'<img class="logo" src="{b64img(A("ifo/ifo-logo-light.png"))}" alt="Inland Family Optometry">',
        cover_img=b64img(A("ifo/ifo-eyespa.jpg")),
        c=dict(ink="#312B25", paper="#FAF8F4", sand="#ECE8DF", acc="#8B6F2F", acc2="#6B5D3A",
               mut="#6F675D", line="#D9CDB4", soft="#C9B27A", tint="#F3EEE3"),
        hf="'Cormorant Garamond', serif", bf="'Inter', sans-serif",
        fonts="family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@400;500;600;700",
        locations=[("Rancho Cucamonga", "8977 Foothill Blvd, Suite C, Rancho Cucamonga, CA 91730", "(909) 345-6100"),
                   ("Chino", "5250 Philadelphia St, Suite D, Chino, CA", "(909) 345-9809")],
        email=None,
        doctors=["Dr. Quynh Tran, OD", "Dr. Nancy Banh, OD", "Dr. Deborah Duan, OD"],
        since="Caring for Inland Empire families since 1982.",
        phone_line="Rancho Cucamonga (909) 345-6100 · Chino (909) 345-9809",
        # in-office treatments offered (key, name, short description, sessions guidance)
        treatments=[
            ("ipl", "Lumenis IPL", "Gentle pulses of light calm inflammation and the tiny blood vessels along the lids, so the oil glands can work again. A bonus: it also softens redness, sun spots and uneven tone.", "4 sessions, 2–4 weeks apart"),
            ("optilift", "OptiLIFT", "Gentle muscle stimulation tones the lower lids and supports a full, healthy blink, which spreads oil across the eye. No needles, no downtime.", "4 sessions, about 1 week apart"),
            ("spa", "Eye Spa lid care", "In-office lid cleaning and warm gland care in our Eye Spa to clear blocked glands and reset your lids before or between treatments.", "As recommended"),
        ],
        home_products=["Moist-heat eye mask", "Hypochlorous lid & lash spray", "Lid cleansing wipes",
                       "Tea tree wipes (Demodex)", "Preservative-free tears", "Overnight gel / ointment"],
        has_rf=False,
        muscle="OptiLIFT",
        extras="Dry Eye Center · Eye Spa · Myopia management · Specialty contact lenses",
        consult=("Complimentary consultation", "Not sure which treatment is right for you? Book a complimentary IPL or OptiLIFT consultation at inlandfamilyvision.com."),
    ),
    "toluca-lake-optometric": dict(
        name="Toluca Lake Optometric Center",
        short="Toluca Lake",
        tagline="Clarity begins here.",
        site="tolucalakeoptometric.com",
        url="https://tolucalakeoptometric.com",
        logo=f'<div class="wordmark">{LOTUS}<div><span class="wm1">Toluca Lake</span><span class="wm2">Optometric Center</span></div></div>',
        logo_light=f'<div class="wordmark light">{LOTUS}<div><span class="wm1">Toluca Lake</span><span class="wm2">Optometric Center</span></div></div>',
        cover_img=None,
        c=dict(ink="#3A2A28", paper="#FBF5F2", sand="#EAD5D1", acc="#8D5049", acc2="#B5827C",
               mut="#6E5A57", line="#E2CFCB", soft="#D7B9B3", tint="#F6EBE8"),
        hf="'Cormorant Garamond', serif", bf="'Jost', sans-serif",
        fonts="family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Jost:wght@400;500;600",
        locations=[("Burbank", "4100 W Alameda Ave, Suite 102, Burbank, CA 91505", "(818) 841-1212")],
        email="tloc91505@gmail.com",
        doctors=["Dr. Vanessa Ferrucci, OD"],
        since="Personalized eye care in Burbank for over 20 years.",
        phone_line="(818) 841-1212",
        treatments=[
            ("ipl", "OptiLight IPL by Lumenis", "The first and only IPL FDA-approved for dry eye. Light pulses calm inflammation around the lids so the oil glands can recover, and also calm facial redness and rosacea.", "4 sessions, 2–4 weeks apart"),
            ("rf", "TempSure Envi Radiofrequency", "Gentle radiofrequency warmth melts thickened oils and reopens the eyelid glands. Drug-free and non-invasive with no downtime, with smoother, firmer skin as a bonus.", "3–4 sessions, 2–4 weeks apart"),
            ("lllt", "Low-Level Light Therapy", "Specific wavelengths of light warm the lid glands, reduce inflammation and support cellular repair. Relaxing, mask-based and quick.", "Weekly or as recommended"),
            ("amnio", "Amniotic Membrane", "Hydrated, cryopreserved tissue placed comfortably on the eye in office. Its natural anti-inflammatory properties help the surface of the eye heal.", "Typically one treatment, 3–7 days"),
            ("trilift", "TriLift", "Dynamic muscle stimulation tones the muscles around the eyes for a fuller blink and a lifted look. No needles and no downtime. 20–30 minute sessions.", "4 sessions, about 1 week apart"),
        ],
        home_products=["Moist-heat eye mask", "Lid & lash cleanser", "Tea tree wipes (blepharitis / Demodex)",
                       "Soothing antibacterial wipes", "Preservative-free tears", "Overnight gel / ointment"],
        has_rf=True,
        muscle="TriLift",
        extras="Dry Eye Clinic · Myopia management · Scleral & specialty lenses · AlumierMD skincare",
        consult=("More than one approach", "Most patients do best with a combination of treatments. Dr. Ferrucci will build the right mix for your eyes. Book online at tolucalakeoptometric.com."),
    ),
}

# ----------------------------------------------------------------------------
# Shared CSS
# ----------------------------------------------------------------------------
CSS = """
@page { size: %(size)s; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { font-family: var(--bf); color: var(--ink); font-size: 9.4pt; line-height: 1.38;
  -webkit-print-color-adjust: exact; print-color-adjust: exact; }
:root { --ink:%(ink)s; --paper:%(paper)s; --sand:%(sand)s; --acc:%(acc)s; --acc2:%(acc2)s;
  --mut:%(mut)s; --line:%(line)s; --soft:%(soft)s; --tint:%(tint)s; --hf:%(hf)s; --bf:%(bf)s; }
.page { width: %(w)s; height: %(h)s; padding: 0.5in 0.55in 0.45in; position: relative; overflow: hidden;
  background: var(--paper); page-break-after: always; display: flex; flex-direction: column; }
.page:last-child { page-break-after: auto; }
h1, h2, h3 { font-family: var(--hf); font-weight: 600; margin: 0; line-height: 1.05; letter-spacing: .005em; }
h1 { font-size: 30pt; } h1 em, h2 em { font-style: italic; color: var(--acc); font-weight: 500; }
h2 { font-size: 17pt; color: var(--ink); }
h3 { font-size: 13pt; color: var(--acc); }
p { margin: 0 0 6px; }
.eyebrow { font-family: var(--bf); text-transform: uppercase; letter-spacing: .18em; font-size: 7.2pt; font-weight: 600; color: var(--acc); }
.top { display: flex; align-items: flex-end; justify-content: space-between; border-bottom: 1px solid var(--line); padding-bottom: 12px; margin-bottom: 14px; }
.top .logo { height: 66px; display: block; }
img.logo, .wordmark { align-self: flex-start; width: auto; object-fit: contain; }
.top .ttl { text-align: right; }
.top .ttl h1 { font-size: 24pt; }
.wordmark { display: flex; align-items: center; gap: 10px; color: var(--acc); }
.wordmark .lotus { width: 46px; height: 32px; }
.wordmark .wm1 { display: block; font-family: var(--hf); font-size: 21pt; font-weight: 600; color: var(--ink); line-height: .95; }
.wordmark .wm2 { display: block; font-size: 6.8pt; letter-spacing: .32em; text-transform: uppercase; color: var(--acc); margin-top: 3px; }
.wordmark.light, .wordmark.light .wm1 { color: var(--paper); }
.wordmark.light .wm2 { color: var(--soft); }
.fields { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 6px 18px; margin-bottom: 14px; }
.fld { display: flex; gap: 6px; align-items: flex-end; font-size: 7.6pt; text-transform: uppercase; letter-spacing: .1em; color: var(--mut); font-weight: 600; white-space: nowrap; }
.fld span { flex: 1; border-bottom: 1px solid var(--soft); height: 14px; }
.foot { margin-top: auto; padding-top: 10px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center; font-size: 7.6pt; color: var(--mut); gap: 12px; }
.foot b { color: var(--ink); font-weight: 600; }
.foot .q { width: 44px; height: 44px; }
.cb { display: inline-block; width: 9px; height: 9px; border: 1.1px solid var(--acc2); border-radius: 2px; margin-right: 5px; vertical-align: -1px; background: #fff; }
.card { background: #fff; border: 1px solid var(--line); border-radius: 12px; padding: 12px 14px; }
.tint { background: var(--tint); border-color: transparent; }
.dark { background: var(--ink); color: var(--paper); border-color: transparent; }
.dark h2, .dark h3 { color: var(--paper); }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
.step { display: flex; gap: 10px; }
.num { flex: 0 0 auto; width: 28px; height: 28px; border-radius: 50%%; background: var(--acc); color: #fff; font-family: var(--hf); font-size: 14pt; font-weight: 600; display: flex; align-items: center; justify-content: center; }
ul.clean { list-style: none; padding: 0; margin: 4px 0 0; }
ul.clean li { margin: 2px 0; }
ul.dots { padding-left: 14px; margin: 4px 0; } ul.dots li { margin: 2px 0; } ul.dots li::marker { color: var(--acc); }
.opts { display: flex; flex-wrap: wrap; gap: 3px 14px; margin-top: 5px; font-size: 8.6pt; }
table { width: 100%%; border-collapse: collapse; font-size: 8.6pt; }
th { text-align: left; font-size: 7pt; text-transform: uppercase; letter-spacing: .12em; color: var(--acc); font-weight: 600; padding: 5px 6px; border-bottom: 1.2px solid var(--acc); }
td { padding: 5px 6px; border-bottom: 1px solid var(--line); vertical-align: top; }
td.c, th.c { text-align: center; }
.blank { display: inline-block; min-width: 60px; border-bottom: 1px solid var(--soft); height: 11px; }
.sec { display: flex; align-items: center; gap: 10px; margin: 10px 0 6px; }
.sec h3 { white-space: nowrap; }
.sec::after { content: ""; flex: 1; height: 1px; background: var(--line); }
.cols2 { columns: 2; column-gap: 18px; } .cols3 { columns: 3; column-gap: 14px; } .cols4 { columns: 4; column-gap: 12px; }
.cols2 > div, .cols3 > div, .cols4 > div { break-inside: avoid; margin-bottom: 2px; }
.sig { display: grid; grid-template-columns: 2fr 1fr; gap: 10px 22px; margin-top: 14px; }
.sig div { border-top: 1px solid var(--ink); padding-top: 3px; font-size: 7.4pt; color: var(--mut); text-transform: uppercase; letter-spacing: .1em; }
.small { font-size: 7.8pt; color: var(--mut); }
.note { font-size: 7.4pt; color: var(--mut); font-style: italic; }
.pill { display: inline-block; padding: 3px 10px; border-radius: 99px; background: var(--acc); color: #fff; font-size: 7.2pt; letter-spacing: .14em; text-transform: uppercase; font-weight: 600; }
.lines div { border-bottom: 1px solid var(--line); height: 20px; }
"""


def head(b, title, size="letter", w="8.5in", h="11in", extra=""):
    css = CSS % dict(size=size, w=w, h=h, hf=b["hf"], bf=b["bf"], **b["c"])
    return f"""<!doctype html><html><head><meta charset="utf-8"><title>{title} · {b['name']}</title>
<link href="https://fonts.googleapis.com/css2?{b['fonts']}&display=block" rel="stylesheet">
<style>{css}{extra}</style></head><body>"""


def top(b, eyebrow, title):
    return f"""<div class="top">{b['logo']}<div class="ttl"><div class="eyebrow">{eyebrow}</div><h1>{title}</h1></div></div>"""


def foot(b, left=None):
    left = left or f"Questions about your care? Call us: <b>{b['phone_line']}</b>"
    return f"""<div class="foot"><div>{left}<br>{b['site']}{' · ' + b['email'] if b['email'] else ''}</div>
<img class="q" src="{b['qr']}" alt="QR code to {b['site']}"></div>"""


def fields(*names):
    return '<div class="fields">' + "".join(f'<div class="fld">{n}<span></span></div>' for n in names) + "</div>"


def cbs(items, cls="opts"):
    return f'<div class="{cls}">' + "".join(f'<span><i class="cb"></i>{i}</span>' for i in items) + "</div>"


def tname(b, key):
    for k, n, *_ in b["treatments"]:
        if k == key:
            return n
    return None

# ----------------------------------------------------------------------------
# 01 At-home therapy plan
# ----------------------------------------------------------------------------
def home_plan(b):
    steps = [
        ("Warm", "Heat therapy", "Use a moist-heat eye mask for <b>10–15 minutes</b> to melt thickened oils in your eyelid glands.",
         ["Once a day", "Twice a day", "Before bed", "Other ______"]),
        ("Cleanse", "Lid hygiene", "Gently clean your lids and lash line <b>after heat</b> to clear oil, debris and bacteria.",
         ["Once a day", "Twice a day", "Spray", "Wipes", "Foam"]),
        ("Hydrate", "Lubricating drops", "Use preservative-free drops through the day. Use gels or ointments <b>only at bedtime</b> and never with contact lenses in.",
         ["2× a day", "4× a day", "As needed", "Gel at bedtime"]),
        ("Nourish", "Supplement", "Take an omega-3 supplement (re-esterified triglyceride form) <b>with a meal</b>. Results build over 2–3 months.",
         ["2 capsules daily", "2 capsules twice daily", "Other ______"]),
    ]
    cards = "".join(f"""<div class="card"><div class="step"><div class="num">{i+1}</div><div>
<div class="eyebrow">{s[0]}</div><h2 style="margin:2px 0 4px">{s[1]}</h2><p>{s[2]}</p>{cbs(s[3])}</div></div></div>"""
                    for i, s in enumerate(steps))
    prods = cbs(b["home_products"])
    rx = cbs(["Restasis", "Cequa", "Vevye", "Xiidra", "Miebo", "Xdemvy (6 weeks)", "Steroid drop ______", "Other ______"])
    return head(b, "At-Home Dry Eye Plan") + f"""<div class="page">{top(b, "Your personalized", "At-Home Dry Eye Plan")}
{fields("Patient", "Date", "Follow-up")}
<p style="font-size:10.2pt;margin-bottom:12px">Dry eye is a long-term condition, and what you do at home every day is what keeps in-office results lasting.
Follow the steps your doctor checked below, <b>in this order</b>.</p>
<div class="grid2">{cards}</div>
<div class="grid2" style="margin-top:12px">
<div class="card tint"><h3>Recommended products</h3><p class="small" style="margin:2px 0 0">Available in our office. Ask us which brand is right for you.</p>{prods}</div>
<div class="card tint"><h3>Prescription drops</h3><p class="small" style="margin:2px 0 0">One drop in each eye as directed. Wait 5 minutes between drops.</p>{rx}</div>
</div>
<div class="card dark" style="margin-top:12px"><h3 style="margin-bottom:6px">Everyday habits that help</h3>
<div class="grid3 small" style="color:var(--line)">
<div><b style="color:#fff">20-20-20 rule</b><br>Every 20 minutes of screen time, look 20 feet away for 20 seconds.</div>
<div><b style="color:#fff">Full blinks</b><br>Close gently and squeeze for 2 seconds, 10 times, a few times a day.</div>
<div><b style="color:#fff">Protect the air</b><br>Use a humidifier, point vents and fans away from your face, and drink plenty of water.</div>
</div></div>
<p class="small" style="margin-top:10px"><b style="color:var(--ink)">Remove contact lenses</b> before drops unless your doctor says otherwise. If you have pain, sudden vision change or a red, sticky eye, call us right away.</p>
{foot(b)}</div></body></html>"""

# ----------------------------------------------------------------------------
# 02 Intake: history questionnaire + SPEED
# ----------------------------------------------------------------------------
def intake(b):
    sym = ["Dryness", "Burning", "Itching", "Grittiness / sandy feeling", "Excessive watering", "Redness", "Light sensitivity",
           "Blurry vision that clears with blinking", "Eye fatigue", "Crusty or sticky lids", "Contact lens discomfort", "Stringy discharge"]
    med = ["Rosacea", "Thyroid condition", "Sjögren's, lupus or rheumatoid arthritis", "Diabetes", "Seasonal allergies",
           "Menopause / hormone therapy", "High blood pressure", "Skin cancer", "Cold sores (herpes simplex)",
           "Seizures triggered by light", "Pacemaker or implanted device", "Currently pregnant or nursing"]
    meds = ["Antihistamines / allergy pills", "Antidepressants / anti-anxiety", "Blood pressure medication", "Hormone therapy / birth control",
            "Accutane (isotretinoin), now or past 6 months", "Acne / antibiotic (doxycycline, minocycline)", "Retinol or retinoid creams",
            "Sleep medication", "Glaucoma drops"]
    eye = ["LASIK / PRK", "Cataract surgery", "Eyelid surgery / blepharoplasty", "Botox or filler near eyes",
           "Lash extensions or lash serum", "Wear contact lenses", "Wear eye makeup daily", "Sleep with a fan or CPAP"]
    tried = ["Artificial tears", "Warm compresses", "Lid wipes / sprays", "Omega-3", "Restasis / Cequa / Xiidra", "Punctal plugs",
             "IPL", "Radiofrequency", "Other ______"]
    goals = ["More comfortable eyes", "Wear contacts longer", "Less dependence on drops", "Clearer vision on screens",
             "Less facial redness", "Brighter, firmer lid skin", "Fewer fine lines around the eyes"]
    def cols(items, n=2):
        return f'<div class="cols{n}">' + "".join(f"<div><i class='cb'></i>{i}</div>" for i in items) + "</div>"
    yn = lambda q: f'<tr><td>{q}</td><td class="c"><i class="cb"></i></td><td class="c"><i class="cb"></i></td></tr>'
    p1 = f"""<div class="page">{top(b, "New patient", "Dry Eye History")}
{fields("Patient name", "Date of birth", "Today's date")}
<div class="sec"><h3>Symptoms</h3></div>
<p class="small">Check everything you experience. Circle the one that bothers you most.</p>{cols(sym, 3)}
<div class="grid2" style="margin-top:6px"><div><span class="small">How long have you had symptoms?</span>{cbs(["< 6 months", "6–12 months", "1–3 years", "3+ years"])}</div>
<div><span class="small">Symptoms are worse…</span>{cbs(["Morning", "Afternoon", "Evening", "On screens", "Outdoors / wind"])}</div></div>
<div class="sec"><h3>Medical history</h3></div>{cols(med, 3)}
<div class="sec"><h3>Medications</h3></div>{cols(meds, 3)}
<div class="fld" style="margin-top:6px">Other medications / supplements<span></span></div>
<div class="sec"><h3>Eye history</h3></div>{cols(eye, 4)}
<div class="sec"><h3>Habits</h3></div>
<table><tr><th></th><th class="c" style="width:40px">Yes</th><th class="c" style="width:40px">No</th><th style="padding-left:18px">How much?</th></tr>
<tr><td>Do you smoke or vape?</td><td class="c"><i class="cb"></i></td><td class="c"><i class="cb"></i></td><td style="padding-left:18px"><span class="blank"></span> per day</td></tr>
<tr><td>Do you drink alcohol?</td><td class="c"><i class="cb"></i></td><td class="c"><i class="cb"></i></td><td style="padding-left:18px"><span class="blank"></span> drinks per week</td></tr>
<tr><td>Do you use cannabis?</td><td class="c"><i class="cb"></i></td><td class="c"><i class="cb"></i></td><td style="padding-left:18px"><span class="blank"></span> per week</td></tr>
<tr><td>Screen time (computer, phone, tablet)</td><td></td><td></td><td style="padding-left:18px"><span class="blank"></span> hours per day</td></tr>
<tr><td>Water intake / sleep</td><td></td><td></td><td style="padding-left:18px"><span class="blank"></span> glasses · <span class="blank"></span> hours of sleep</td></tr></table>
{foot(b, "Please continue on the back.")}</div>"""
    env = ["Air conditioning / heating vents", "Fans or ceiling fans", "Dry or dusty workplace", "Driving long distances",
           "Frequent flying", "Outdoor work or sports", "Swimming pools / chlorine", "Wildfire smoke / allergens"]
    p2 = f"""<div class="page">{top(b, "New patient", "Dry Eye History")}
<div class="sec"><h3>Environment</h3></div>{cols(env, 2)}
<div class="sec"><h3>What have you tried?</h3></div>{cols(tried, 3)}
<div class="fld" style="margin-top:6px">What helped, and what didn't?<span></span></div>
<div class="sec"><h3>Your goals</h3></div><p class="small">Many of our dry eye treatments also improve the skin around the eyes. Check what matters to you.</p>{cols(goals, 2)}
<div class="sec"><h3>Anything else we should know?</h3></div><div class="lines"><div></div><div></div><div></div></div>
<div class="card tint" style="margin-top:14px"><div class="eyebrow">For office use</div>
<div class="fields" style="grid-template-columns:repeat(4,1fr);margin:8px 0 0">
<div class="fld">SPEED<span></span></div><div class="fld">TBUT OD/OS<span></span></div><div class="fld">Meibography<span></span></div><div class="fld">Osmolarity<span></span></div>
<div class="fld">Fitzpatrick<span></span></div><div class="fld">Demodex<span></span></div><div class="fld">MMP-9<span></span></div><div class="fld">Staining<span></span></div></div>
<div class="opts" style="margin-top:10px"><b>Diagnosis:</b><span><i class="cb"></i>Evaporative / MGD</span><span><i class="cb"></i>Aqueous deficient</span><span><i class="cb"></i>Mixed</span><span><i class="cb"></i>Blepharitis</span><span><i class="cb"></i>Demodex</span><span><i class="cb"></i>Ocular rosacea</span></div></div>
<div class="sig"><div>Patient signature</div><div>Date</div></div>
{foot(b)}</div>"""
    rows = [("Dryness, grittiness or scratchiness"), ("Soreness or irritation"), ("Burning or watering"), ("Eye fatigue")]
    t1 = "".join(f"<tr><td>{r}</td>" + "".join('<td class="c"><i class="cb"></i></td>' for _ in range(6)) + "</tr>" for r in rows)
    t2 = "".join(f"<tr><td>{r}</td>" + "".join(f'<td class="c">{n}</td>' for n in range(4)) + "</tr>" for r in rows)
    t3 = "".join(f"<tr><td>{r}</td>" + "".join(f'<td class="c">{n}</td>' for n in range(5)) + "</tr>" for r in rows)
    p3 = f"""<div class="page">{top(b, "Symptom score", "SPEED Questionnaire")}
{fields("Patient name", "Date of birth", "Date")}
<p>Standard Patient Evaluation of Eye Dryness. Answer each question by checking or circling the response that best describes you.</p>
<div class="sec"><h3>1 · When do you have these symptoms?</h3></div>
<table><tr><th></th><th class="c" colspan="2">At this visit</th><th class="c" colspan="2">Within past 72 hours</th><th class="c" colspan="2">Within past 3 months</th></tr>
<tr><th></th><th class="c">Yes</th><th class="c">No</th><th class="c">Yes</th><th class="c">No</th><th class="c">Yes</th><th class="c">No</th></tr>{t1}</table>
<div class="sec"><h3>2 · How often? (circle one)</h3></div>
<table><tr><th></th><th class="c">Never</th><th class="c">Sometimes</th><th class="c">Often</th><th class="c">Constant</th></tr>{t2}</table>
<div class="sec"><h3>3 · How severe? (circle one)</h3></div>
<table><tr><th></th><th class="c">No problems</th><th class="c">Tolerable</th><th class="c">Uncomfortable</th><th class="c">Bothersome</th><th class="c">Intolerable</th></tr>{t3}</table>
<div class="card tint small" style="margin-top:10px">
<b style="color:var(--ink)">Severity guide.</b> 0 = no problems · 1 = tolerable, not perfect but not uncomfortable · 2 = uncomfortable, irritating but doesn't interfere with my day ·
3 = bothersome, irritating and interferes with my day · 4 = intolerable, unable to do my daily tasks</div>
<div class="grid2" style="margin-top:12px"><div><span class="small">Do you use eye drops for lubrication?</span>{cbs(["Yes", "No"])}
<span class="small" style="display:block;margin-top:6px">If yes, how often?</span>{cbs(["1–2× day", "3–4× day", "5+× day"])}</div>
<div class="card" style="display:flex;align-items:center;justify-content:space-between"><div><div class="eyebrow">Office use</div><h2>Total SPEED score</h2>
<span class="small">Frequency + severity</span></div><div style="font-family:var(--hf);font-size:26pt"><span class="blank" style="min-width:50px"></span> / 28</div></div></div>
<p class="note" style="margin-top:8px">SPEED™ questionnaire developed by Korb et al. Reproduced for clinical use.</p>
{foot(b)}</div>"""
    return head(b, "Dry Eye Intake") + p1 + p2 + p3 + "</body></html>"

# ----------------------------------------------------------------------------
# 03 Tri-fold brochure (letter landscape)
# ----------------------------------------------------------------------------
BRO_CSS = """
.page.bro { padding: 0; flex-direction: row; }
.panel { width: 33.333%; height: 100%; padding: 0.42in 0.38in; display: flex; flex-direction: column; position: relative; }
.panel + .panel { border-left: 1px dashed transparent; }
.cover { background: var(--ink); color: var(--paper); justify-content: space-between; }
.cover .logo { height: 96px; }
.cover .art { flex: 1; margin: 18px -0.38in; background-size: cover; background-position: center; }
.cover h1 { color: var(--paper); font-size: 38pt; line-height: .98; }
.cover h1 em { color: var(--soft); }
.tx { display: flex; gap: 8px; margin-bottom: 9px; }
.tx .dot { flex: 0 0 8px; height: 8px; border-radius: 50%; background: var(--acc); margin-top: 6px; }
.tx b { font-family: var(--hf); font-size: 12.5pt; font-weight: 600; display: block; line-height: 1.1; margin-bottom: 1px; }
.chips { display: flex; flex-wrap: wrap; gap: 5px; margin: 6px 0 10px; }
.chips span { background: var(--tint); border-radius: 99px; padding: 3px 9px; font-size: 8pt; }
.journey { display: grid; gap: 8px; }
.journey > div { display: flex; gap: 10px; align-items: flex-start; }
.bro p { font-size: 10pt; } .bro .small { font-size: 8.8pt; line-height: 1.42; } .bro .chips span { font-size: 8.8pt; }
.bro ul.dots li { margin: 3px 0; } .bro h2 { font-size: 20pt; } .bro h3 { font-size: 14pt; margin-top: 4px; }
.tx { margin-bottom: 13px; } .tx b { font-size: 14pt; }
"""

def brochure(b):
    tx = "".join(f'<div class="tx"><i class="dot"></i><div><b>{n}</b><span class="small" style="color:var(--ink)">{d}</span></div></div>'
                 for k, n, d, s in b["treatments"])
    if b["cover_img"]:
        art = f'<div class="art" style="background-image:url({b["cover_img"]})"></div>'
    else:
        art = f'''<div class="art" style="background:radial-gradient(120% 90% at 50% 30%, var(--acc2) 0%, var(--acc) 45%, var(--ink) 100%);display:flex;align-items:center;justify-content:center;color:var(--sand)">
<div style="width:58%;opacity:.9">{LOTUS.replace('class="lotus"', 'style="width:100%"')}</div></div>'''
    locs = "".join(f'<div style="margin-bottom:8px"><b style="font-family:var(--hf);font-size:12.5pt">{n}</b><br><span class="small" style="color:var(--line)">{a}<br>{p}</span></div>' for n, a, p in b["locations"])
    docs = "<br>".join(b["doctors"])
    outside = f"""<div class="page bro">
<div class="panel"><div class="eyebrow">Is it dry eye?</div><h2 style="margin:4px 0 8px">You don't have to <em>just live with it.</em></h2>
<p>Dry eye affects millions of people and is one of the most common reasons patients visit us. If any of these sound familiar, it's time for a dry eye evaluation.</p>
<div class="chips">{''.join(f'<span>{s}</span>' for s in ["Burning", "Gritty, sandy feeling", "Redness", "Watery eyes", "Tired eyes", "Blurry vision on screens", "Contact lens discomfort", "Light sensitivity"])}</div>
<h3>Common causes</h3>
<ul class="dots small" style="color:var(--ink)"><li>Screens and less blinking</li><li>Hormones, menopause and aging</li><li>Medications such as antihistamines</li>
<li>Contact lenses, LASIK and eye makeup</li><li>Rosacea and Demodex mites</li><li>Dry climate, A/C and Santa Ana winds</li></ul>
<div class="card tint" style="margin-top:auto"><h3>Take the first step</h3><p class="small" style="color:var(--ink);margin:3px 0 0">Ask about our dry eye evaluation. We image your oil glands and tear film to find the cause, not just the symptoms.</p></div></div>
<div class="panel" style="background:var(--sand)"><div style="margin:auto 0;text-align:center">
<img src="{b['qr']}" style="width:1.25in;height:1.25in;border:8px solid #fff;border-radius:8px"><p class="small" style="margin-top:8px;color:var(--ink)">Scan to book your dry eye evaluation<br><b>{b['site']}</b></p></div>
<div class="card dark"><div class="eyebrow" style="color:var(--soft)">Visit us</div><div style="margin-top:6px">{locs}</div>
<div class="small" style="color:var(--line)">{docs}</div></div></div>
<div class="panel cover">{b['logo_light']}{art}<div><div class="eyebrow" style="color:var(--soft)">Dry Eye Care</div>
<h1>Comfort you can <em>see</em> and feel.</h1><p style="color:var(--line);margin-top:8px">{b['tagline']}</p></div></div></div>"""
    inside = f"""<div class="page bro">
<div class="panel"><div class="eyebrow">Understanding dry eye</div><h2 style="margin:4px 0 8px">What is <em>dry eye?</em></h2>
<p>Dry eye is a <b>chronic, progressive</b> condition. Your tears don't keep the front of your eye comfortable and protected, either because you don't make enough or because they evaporate too fast.</p>
<p>In most people the cause is <b>meibomian gland dysfunction (MGD)</b>. The tiny oil glands in your eyelids clog, so tears evaporate in seconds.</p>
<div class="card tint" style="margin:6px 0 10px"><h3>Why treat it early?</h3><p class="small" style="color:var(--ink);margin:3px 0 0">Untreated, inflammation can permanently shrink the oil glands and damage the surface of the eye. Consistent care protects your glands and your vision.</p></div>
<h3>Your dry eye evaluation</h3><ul class="dots small" style="color:var(--ink)"><li>Symptom questionnaire</li><li>Gland imaging (meibography)</li><li>Tear film and lid exam</li><li>A personalized treatment plan</li></ul></div>
<div class="panel" style="background:#fff"><div class="eyebrow">In-office treatments</div><h2 style="margin:4px 0 10px">How we <em>treat it</em></h2>{tx}
<div class="card tint" style="margin-top:auto"><h3>{b['consult'][0]}</h3><p class="small" style="color:var(--ink);margin:3px 0 0">{b['consult'][1]}</p></div></div>
<div class="panel"><div class="eyebrow">Your plan</div><h2 style="margin:4px 0 10px">What to <em>expect</em></h2>
<div class="journey">{''.join(f'<div><div class="num">{i+1}</div><div><b style="font-family:var(--hf);font-size:12.5pt">{t}</b><br><span class="small" style="color:var(--ink)">{d}</span></div></div>' for i, (t, d) in enumerate([
        ("Evaluate", "We find the type and cause of your dry eye."),
        ("Treat", "A series of in-office treatments that target the cause."),
        ("Maintain", "A simple daily home routine plus maintenance visits keep results lasting.")]))}</div>
<h3 style="margin-top:14px">At home</h3><ul class="dots small" style="color:var(--ink)"><li><b>Warm:</b> heated eye mask, 10–15 min</li><li><b>Cleanse:</b> lid & lash cleanser</li>
<li><b>Hydrate:</b> preservative-free drops</li><li><b>Nourish:</b> omega-3 supplement</li></ul>
<div class="card dark" style="margin-top:auto"><h3>Also at {b['short']}</h3><p class="small" style="color:var(--line);margin:3px 0 0">{b['extras']}</p></div></div></div>"""
    return head(b, "Dry Eye Brochure", "letter landscape", "11in", "8.5in", BRO_CSS) + outside + inside + "</body></html>"

# ----------------------------------------------------------------------------
# 04 Treatment plan + pricing
# ----------------------------------------------------------------------------
def treatment_plan(b):
    rows = "".join(f"""<tr><td><i class="cb"></i><b>{n}</b><br><span class="small">Typical: {s}</span></td>
<td><span class="blank" style="min-width:36px"></span> sessions</td><td>every <span class="blank" style="min-width:36px"></span> wks</td>
<td>OD <i class="cb"></i> OS <i class="cb"></i> Face <i class="cb"></i></td></tr>""" for k, n, d, s in b["treatments"])
    p1 = f"""<div class="page">{top(b, "Prescribed by your doctor", "Dry Eye Treatment Plan")}
{fields("Patient", "Doctor", "Date")}
<div class="grid2"><div class="card tint"><h3>Diagnosis</h3>{cbs(["Evaporative / MGD", "Aqueous deficient", "Mixed", "Blepharitis", "Demodex", "Ocular rosacea", "Contact lens related"])}</div>
<div class="card tint"><h3>Severity</h3>{cbs(["Mild", "Moderate", "Severe"])}<div class="fld" style="margin-top:10px">SPEED score<span></span></div></div></div>
<div class="sec"><h3>In-office treatments</h3></div>
<table><tr><th>Treatment</th><th>Series</th><th>Interval</th><th>Area</th></tr>{rows}</table>
<div class="sec"><h3>At-home therapy</h3></div>
{cbs(["Heated eye mask", "Lid & lash cleanser", "Tea tree wipes", "Preservative-free tears", "Overnight gel", "Omega-3", "Humidifier", "See At-Home Plan"])}
<div class="sec"><h3>Prescriptions</h3></div>
{cbs(["Restasis", "Cequa", "Vevye", "Xiidra", "Miebo", "Xdemvy", "Steroid ______", "Oral doxycycline", "Other ______"])}
<div class="grid2" style="margin-top:14px"><div class="card"><div class="eyebrow">Return to clinic</div><h2 style="margin-top:4px">In <span class="blank"></span> weeks / months</h2></div>
<div class="card"><div class="eyebrow">Estimated investment</div><h2 style="margin-top:4px">$ <span class="blank" style="min-width:110px"></span></h2><span class="small">See pricing on the back</span></div></div>
<div class="sig"><div>Patient signature</div><div>Date</div></div>
{foot(b)}</div>"""
    prows = "".join(f"<tr><td><b>{n}</b></td><td>$ <span class='blank'></span></td><td>$ <span class='blank'></span></td><td>$ <span class='blank'></span></td></tr>" for k, n, d, s in b["treatments"])
    ipl = tname(b, "ipl")
    mus = b["muscle"]
    bundles = [("Dry Eye Starter", f"Evaluation + 4 {ipl.split(' by ')[0]} sessions + home kit"),
               ("Lift & Glow", f"4 {ipl.split(' by ')[0]} + 4 {mus} sessions, our most complete result"),
               ("Maintenance Club", "A treatment every 6–12 months + ____% off home care")]
    if b["has_rf"]:
        bundles[1] = ("Lift & Glow", f"4 OptiLight + 4 TempSure Envi or {mus}, our most complete result")
    bcards = "".join(f'<div class="card {"dark" if i == 1 else ""}"><div class="eyebrow" style="{"color:var(--soft)" if i == 1 else ""}">Package</div><h2 style="margin:3px 0 4px">{n}</h2><p class="small" style="{"color:var(--line)" if i == 1 else ""}">{d}</p><h2 style="margin-top:6px">$ <span class="blank" style="min-width:80px;border-color:var(--soft)"></span></h2></div>' for i, (n, d) in enumerate(bundles))
    p2 = f"""<div class="page">{top(b, "Investing in your eyes", "Treatments & Packages")}
<p style="font-size:10.2pt">Dry eye is chronic, so treatment is a series followed by maintenance. Packages give you the best value and the best results.</p>
<table style="margin-top:8px"><tr><th>Treatment</th><th>Single session</th><th>Series package</th><th>Maintenance</th></tr>
<tr><td><b>Dry eye evaluation & gland imaging</b></td><td>$ <span class='blank'></span></td><td>n/a</td><td>n/a</td></tr>{prows}
<tr><td><b>At-home starter kit</b> (mask, cleanser, drops)</td><td>$ <span class='blank'></span></td><td>n/a</td><td>n/a</td></tr></table>
<div class="grid3" style="margin-top:16px">{bcards}</div>
<div class="card tint" style="margin-top:16px"><h3>Good to know</h3><ul class="dots small" style="color:var(--ink)">
<li>In-office dry eye treatments are usually not covered by insurance. Your evaluation may be.</li>
<li>HSA and FSA cards are accepted for most treatments.</li><li>Packages are paid at the first session and are non-transferable.</li>
<li>Results vary. Most patients notice a difference after 2–3 sessions.</li></ul></div>
{foot(b)}</div>"""
    return head(b, "Treatment Plan") + p1 + p2 + "</body></html>"

# ----------------------------------------------------------------------------
# 05 Aftercare rack card (4 x 9 in)
# ----------------------------------------------------------------------------
RACK_CSS = """.page.rack { padding: 0.3in 0.3in 0.24in; font-size: 9pt; line-height: 1.38; }
.rack .logo { height: 62px; } .rack .wordmark .wm1 { font-size: 15pt; } .rack .wordmark .lotus { width: 34px; height: 24px; }
.rack h1 { font-size: 25pt; margin: 12px 0 2px; } .rack h3 { font-size: 13pt; margin: 13px 0 3px; } .rack .small { font-size: 8.4pt; }
.rack ul.dots { margin: 2px 0; padding-left: 12px; } .rack ul.dots li { margin: 3px 0; }
.band { margin: 0 -0.28in; padding: 6px 0.28in; background: var(--acc); color: #fff; font-size: 7pt; letter-spacing: .16em; text-transform: uppercase; font-weight: 600; }
.rack .foot { font-size: 6.8pt; } .rack .foot .q { width: 36px; height: 36px; }"""

def rack(b):
    ipl = tname(b, "ipl")
    front = f"""<div class="page rack">{b['logo']}<h1>After your <em>IPL</em></h1><div class="small">{ipl} · eye & skin care</div>
<h3>What's normal</h3><ul class="dots"><li>Mild warmth, redness or puffiness for a few hours</li><li>Temporary blurry vision for up to an hour</li>
<li>Pigmented spots darken and look like coffee grounds, then flake off in 7–21 days. Don't pick them.</li><li>Dry eye symptoms may fluctuate between sessions</li></ul>
<h3>First 48 hours</h3><ul class="dots"><li>Avoid sun. Apply mineral SPF 30+ every 2 hours outdoors.</li><li>No saunas, hot tubs, hard workouts or hot showers on the face for 24 hrs</li>
<li>Skip makeup for 4–6 hrs and retinols, acids or scrubs for 1 week</li><li>Use a gentle cleanser and moisturizer only</li><li>Keep up your at-home plan: warm, cleanse, hydrate</li></ul>
<h3>Call us if</h3><ul class="dots"><li>You have blistering, oozing or worsening pain</li><li>Redness lasts more than 48 hours</li><li>Your vision changes</li></ul>
<div style="margin-top:auto"><div class="band">Next session in ____ weeks</div></div>{foot(b, f"Questions? <b>{b['phone_line']}</b>")}</div>"""
    if b["has_rf"]:
        back_title, back_sub = "After <em>RF & TriLift</em>", "TempSure Envi radiofrequency · TriLift muscle stimulation"
        back_items = """<h3>What's normal</h3><ul class="dots"><li>Warm, pink skin for 1–2 hours</li><li>A tight, lifted feeling. That's the collagen response.</li><li>Mild muscle soreness after TriLift, like after a workout</li></ul>
<h3>First 24 hours</h3><ul class="dots"><li>Drink plenty of water</li><li>Avoid saunas, hot yoga and intense heat</li><li>Gentle cleanser and moisturizer, with SPF in the morning</li><li>Makeup is fine the same day</li></ul>
<h3>Best results</h3><ul class="dots"><li>Complete the full series, about 1 week apart for TriLift and 2–4 weeks apart for RF</li><li>Collagen keeps building for up to 3 months</li><li>Maintenance every 3–6 months</li></ul>"""
    else:
        back_title, back_sub = "After <em>OptiLIFT</em>", "Muscle stimulation for lids & blink"
        back_items = """<h3>What's normal</h3><ul class="dots"><li>Slight warmth, tingling or pinkness that fades within an hour</li><li>Mild muscle soreness, like after a workout</li><li>A lighter, more open feeling around the eyes</li></ul>
<h3>First 24 hours</h3><ul class="dots"><li>Drink plenty of water</li><li>Makeup and normal skincare are fine the same day</li><li>Avoid facial massage or devices on the treated area</li></ul>
<h3>Best results</h3><ul class="dots"><li>Complete all 4 sessions, about 1 week apart</li><li>Pair with IPL for the full dry eye benefit</li><li>Maintenance every 3–6 months</li></ul>"""
    back = f"""<div class="page rack">{b['logo']}<h1>{back_title}</h1><div class="small">{back_sub}</div>{back_items}
<h3>Keep your eyes comfortable</h3><ul class="dots"><li>Warm mask 10–15 min, then lid cleanser</li><li>Preservative-free drops as directed</li><li>Omega-3 daily with a meal</li></ul>
<div style="margin-top:auto"><div class="band">Book your next visit · {b['site']}</div></div>{foot(b, f"Questions? <b>{b['phone_line']}</b>")}</div>"""
    return head(b, "Aftercare Rack Card", "4in 9in", "4in", "9in", RACK_CSS) + front + back + "</body></html>"

# ----------------------------------------------------------------------------
# 06 Treatment logs
# ----------------------------------------------------------------------------
FACE = """<svg viewBox="0 0 120 140" class="face"><g fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round">
<path d="M60 8c-26 0-40 20-40 48 0 30 16 62 40 74 24-12 40-44 40-74 0-28-14-48-40-48z"/>
<path d="M20 60c-6-1-8 4-7 10 1 7 4 12 9 12M100 60c6-1 8 4 7 10-1 7-4 12-9 12"/>
<path d="M33 60c5 5 15 5 20 0M67 60c5 5 15 5 20 0"/><path d="M33 52c6-4 14-4 20-1M67 51c6-3 14-3 20 1" stroke-width="2"/>
<path d="M60 64v22c-3 2-7 3-9 2M60 86c3 2 6 2 8 0"/><path d="M48 102c8 5 16 5 24 0"/></g></svg>"""
LOG_CSS = """.face { width: 92px; height: 108px; color: var(--acc2); }
.sess { border: 1px solid var(--line); border-radius: 12px; background: #fff; padding: 10px 12px; margin-bottom: 10px; display: grid; grid-template-columns: 1fr 210px; gap: 10px; }
.sess .faces { display: flex; gap: 6px; justify-content: center; align-items: center; }
.sess .fields { grid-template-columns: 1fr 1fr 1fr; margin: 0 0 6px; gap: 6px 12px; }
.kv { display: grid; grid-template-columns: 1fr 1fr; gap: 3px 12px; font-size: 8pt; }
.kv div { border-bottom: 1px solid var(--line); padding: 2px 0; } .kv b { color: var(--acc); font-weight: 600; font-size: 7pt; letter-spacing: .1em; text-transform: uppercase; }"""

def logs(b):
    def sess(title, kvs, n=4):
        kv = "".join(f"<div><b>{k}</b> {v}</div>" for k, v in kvs)
        block = f"""<div class="sess"><div><div class="fields"><div class="fld">Date<span></span></div><div class="fld">Session #<span></span></div><div class="fld">Provider<span></span></div></div>
<div class="kv">{kv}</div><div class="fld" style="margin-top:6px">Notes / reactions<span></span></div></div>
<div class="faces">{FACE}{FACE.replace('class="face"', 'class="face" style="transform:scaleX(-1)"')}</div></div>"""
        return block * n
    ipl = tname(b, "ipl")
    ipl_kv = [("Fitzpatrick", "I · II · III · IV · V"), ("Shield", "S · M · L · XL"), ("Filter / setting", ""), ("Fluence J/cm²", ""),
              ("Cheeks & nose pulses", ""), ("Upper lids (if used)", ""), ("Cooling gel", "Y · N"), ("Patient comfort 0–10", "")]
    pages = [f"""<div class="page">{top(b, ipl, "IPL Treatment Log")}{fields("Patient", "Date of birth", "Skin type")}
<div class="small" style="margin:-4px 0 10px">Mark treated areas on the face diagram. Record any test spot first.</div>{sess("IPL", ipl_kv)}{foot(b, "Keep in the patient chart.")}</div>"""]
    if b["has_rf"]:
        rf_kv = [("Handpiece", "Small · Medium · Large"), ("Target temp °C", ""), ("Time at temp (min)", ""), ("Total time (min)", ""),
                 ("Areas", "Upper · Lower lids · Periorbital"), ("Lid expression", "Y · N"), ("Gland quality after", ""), ("Patient comfort 0–10", "")]
        pages.append(f"""<div class="page">{top(b, "TempSure Envi", "RF Treatment Log")}{fields("Patient", "Date of birth", "Skin type")}
<div class="small" style="margin:-4px 0 10px">Keep the handpiece moving. Hold the target temperature for the recorded time per area.</div>{sess("RF", rf_kv)}{foot(b, "Keep in the patient chart.")}</div>""")
    ms_kv = [("Program", ""), ("Intensity L / R", ""), ("Areas", "Lower lids · Periorbital · Forehead"), ("Duration (min)", ""),
             ("RF combined", "Y · N"), ("Muscle response", "Good · Fair · Low"), ("Patient comfort 0–10", ""), ("Photo taken", "Y · N")]
    pages.append(f"""<div class="page">{top(b, "Muscle stimulation", b['muscle'] + " Treatment Log")}{fields("Patient", "Date of birth", "Series")}
<div class="small" style="margin:-4px 0 10px">Before/after photos at session 1 and the final session, same lighting and angle.</div>{sess("MS", ms_kv)}{foot(b, "Keep in the patient chart.")}</div>""")
    return head(b, "Treatment Logs", extra=LOG_CSS) + "".join(pages) + "</body></html>"

# ----------------------------------------------------------------------------
# 07 Consent package: pre-treatment checklist + timeline, IPL, RF, muscle stim
# ----------------------------------------------------------------------------
def consents(b):
    ipl = tname(b, "ipl")
    def yn(qs):
        return '<table><tr><th></th><th class="c" style="width:38px">Yes</th><th class="c" style="width:38px">No</th></tr>' + "".join(
            f'<tr><td>{q}</td><td class="c"><i class="cb"></i></td><td class="c"><i class="cb"></i></td></tr>' for q in qs) + "</table>"
    cl = ["Are you pregnant, trying to become pregnant or nursing?", "Have you taken Accutane (isotretinoin) in the last 6 months?",
          "Are you taking photosensitizing medication (doxycycline, minocycline, St. John's wort)?",
          "Do you have a recent sunburn, tan or spray tan (past 2–4 weeks)?", "Any active cold sore, rash or infection in the treatment area?",
          "History of skin cancer or suspicious lesions in the area?", "History of seizures triggered by light?",
          "Do you have a pacemaker, defibrillator or other implanted electronic device?", "Metal implants, fillers or threads in the face (list dates)?",
          "Eye or eyelid surgery in the last 6 months?", "History of keloids or abnormal scarring?", "Do you have tattoos or permanent makeup in the area?"]
    tl = [("4 weeks before", ["Avoid sun, tanning and self-tanner", "Tell us about any new medication"]),
          ("1 week before", ["Stop retinols, acids and exfoliants", "No waxing, peels or laser on the area"]),
          ("Day of", ["Arrive with a clean face, no makeup or lotion", "Remove contact lenses", "Bring sunglasses"]),
          ("After", ["SPF 30+ daily", "Follow the aftercare card", "Keep up your home routine"])]
    tlc = "".join(f'<div class="card {"dark" if i == 2 else "tint"}"><div class="eyebrow" style="{"color:var(--soft)" if i == 2 else ""}">{t}</div><ul class="dots small" style="color:{"var(--line)" if i == 2 else "var(--ink)"}">{"".join(f"<li>{x}</li>" for x in items)}</ul></div>' for i, (t, items) in enumerate(tl))
    p0 = f"""<div class="page">{top(b, "Before your treatment", "Pre-Treatment Checklist")}{fields("Patient", "Date of birth", "Treatment date")}
<div class="sec"><h3>Recommendations & timeline</h3></div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">{tlc}</div>
<div class="sec"><h3>Health screening</h3></div>{yn(cl)}
<div class="fld" style="margin-top:8px">If yes to any, please explain<span></span></div>
<div class="opts" style="margin-top:10px"><b>Office use · Cleared for:</b>{"".join(f'<span><i class="cb"></i>{n}</span>' for k, n, d, s in b["treatments"])}</div>
<div class="sig"><div>Patient signature</div><div>Date</div><div>Reviewed by (doctor)</div><div>Date</div></div>{foot(b)}</div>"""

    def consent(eyebrow, title, intro, risks, alts, extra=""):
        r = "".join(f"<li>{x}</li>" for x in risks)
        return f"""<div class="page" style="font-size:10.2pt;line-height:1.45">{top(b, eyebrow, title)}{fields("Patient", "Date of birth", "Date")}
<p>{intro}</p>
<div class="sec"><h3>Expected benefits</h3></div><p>Improvement in dry eye signs and symptoms. Results vary, a series of treatments is usually needed, and maintenance treatments are recommended. No specific result is guaranteed.</p>
<div class="sec"><h3>Possible risks & side effects</h3></div><ul class="dots">{r}</ul>
<div class="sec"><h3>Alternatives</h3></div><p>{alts}</p>{extra}
<div class="sec"><h3>I understand and agree that</h3></div><ul class="clean small" style="color:var(--ink)">
<li><i class="cb"></i>I have given a complete and honest medical history and will report any changes before each session.</li>
<li><i class="cb"></i>I have read the pre-treatment and aftercare instructions and will follow them.</li>
<li><i class="cb"></i>I have had the chance to ask questions, and they were answered to my satisfaction.</li>
<li><i class="cb"></i>I consent to before/after photos for my medical record. <span style="margin-left:8px"><i class="cb"></i>I also allow anonymous use for education/marketing.</span></li>
<li><i class="cb"></i>I understand this treatment is elective and may not be covered by insurance.</li></ul>
<div class="sig"><div>Patient signature</div><div>Date</div><div>Witness / provider</div><div>Date</div></div>
<p class="note" style="margin-top:8px">Template provided for {b['name']}. Review with your legal counsel and malpractice carrier before use.</p>{foot(b)}</div>"""

    pages = [p0, consent("Informed consent", "Intense Pulsed Light (IPL)",
        f"I authorize {b['name']} to perform {ipl} intense pulsed light treatment on the skin below the eyes and around the nose and cheeks (and the upper lids if indicated) to treat dry eye disease and meibomian gland dysfunction. IPL delivers filtered pulses of light while protective eye shields are worn.",
        ["Temporary redness, swelling, warmth or a sunburn-like feeling", "Darkening and flaking of pigmented spots (expected, 7–21 days)",
         "Blistering, crusting or, rarely, scarring", "Lightening or darkening of skin color (hypo/hyperpigmentation), usually temporary but possibly permanent",
         "Loss of eyebrow or facial hair in treated areas", "Eye injury if shields are removed during treatment", "Cold sore flare in those with a history"],
        "Warm compresses, lid hygiene, artificial tears, prescription eye drops, oral medication, and other in-office gland treatments.")]
    if b["has_rf"]:
        pages.append(consent("Informed consent", "Radiofrequency (TempSure Envi)",
            f"I authorize {b['name']} to perform TempSure Envi radiofrequency treatment of the eyelids and surrounding skin. RF energy gently heats the tissue to melt thickened gland oils, improve meibomian gland function, and stimulate collagen. Eye shields may be used, and the temperature is monitored throughout.",
            ["Warmth, redness or mild swelling for a few hours", "Temporary tingling or tenderness", "Rarely, a burn, blister or change in skin color",
             "Temporary blurred vision or eye irritation", "Not suitable with pacemakers, implanted electronic devices or metal in the area"],
            "Warm compresses, lid hygiene, artificial tears, prescription drops, IPL and other in-office gland treatments."))
    pages.append(consent("Informed consent", f"{b['muscle']} Muscle Stimulation",
        f"I authorize {b['name']} to perform {b['muscle']} treatment. Applicators deliver gentle electrical muscle stimulation to tone the muscles around the eyes, support a more complete blink, and improve the look of the lids and surrounding skin.",
        ["Tingling, warmth or muscle twitching during treatment", "Muscle soreness for 1–2 days", "Temporary redness under the applicator",
         "Rarely, skin irritation or a burn", "Not suitable with pacemakers, implanted electronic devices, metal implants in the face, pregnancy or epilepsy"],
        "Blink exercises, lid hygiene, artificial tears, prescription drops and other in-office dry eye treatments."))
    return head(b, "Consent Package") + "".join(pages) + "</body></html>"


DOCS = [("01-at-home-plan", home_plan), ("02-intake-and-speed", intake), ("03-trifold-brochure", brochure),
        ("04-treatment-plan-and-pricing", treatment_plan), ("05-aftercare-rack-card", rack),
        ("06-treatment-logs", logs), ("07-consent-package", consents)]


def render(html_path, pdf_path):
    subprocess.run([CHROME, "--headless=new", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer",
                    "--virtual-time-budget=15000", f"--print-to-pdf={pdf_path}", "file://" + html_path],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def main():
    only = sys.argv[1:]
    for slug, b in BRANDS.items():
        b["qr"] = qr(b["url"], b["c"]["ink"])
        out = os.path.join(ROOT, "out", slug)
        os.makedirs(os.path.join(out, "html"), exist_ok=True)
        os.makedirs(os.path.join(out, "preview"), exist_ok=True)
        for name, fn in DOCS:
            if only and not any(o in name for o in only):
                continue
            hp = os.path.join(out, "html", name + ".html")
            with open(hp, "w") as f:
                f.write(fn(b))
            pdf = os.path.join(out, name + ".pdf")
            render(hp, pdf)
            subprocess.run(["pdftoppm", "-png", "-r", "60", pdf, os.path.join(out, "preview", name)], check=True)
            print("built", slug, name)


if __name__ == "__main__":
    main()
