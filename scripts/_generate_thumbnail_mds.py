#!/usr/bin/env python3
"""One-shot writer: produces THUMBNAIL.md for every blog post (skips one
already created). Curated per-slug scene plans, rotating skin tone and
background tone for diversity across the series.

Run once:
  python3 scripts/_generate_thumbnail_mds.py
"""
import json
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
BLOG = REPO / "content" / "blog"
PROMPTS_DIR = REPO / "data" / "thumbnails"

# ---------------- rotation pools (apply by index across the series) ----------
SKIN_POOL = ["warm-brown", "olive", "deep-brown", "fair"]
BG_POOL = ["dusty-mauve", "dusty-rose", "icy-mint", "pale-sage", "cream", "lavender-mist"]

# ---------------- per-slug curated scene plan ---------------------------------
# Fields used:
#   title       (read from CONTENT.md frontmatter at write time)
#   subject     "woman" | "couple" | "clinician_patient" | "mother_baby" | "male"
#   setting     short label
#   action      one-sentence verb-led description of the scene
#   tops        clothing description
#   decor       list of line-art decor items
#   bubbles     list of icon names (0-3)
#   notes       optional extra phrase (e.g. "subtle pregnancy bump")
#
# Skin + bg rotate by ordered index (not per-scene), to spread diversity.
SCENES = {
    "3-months-before-ttc": {
        "subject": "woman", "setting": "kitchen counter morning",
        "action": "a calm hopeful woman standing at a light kitchen counter holding a small vitamin bottle in one hand and a paper monthly planner in the other, looking down at the planner with quiet focus as she counts the weeks ahead, a glass of water and a small plate of fruit beside her on the counter",
        "tops": "soft-peach short-sleeve top and sage-green wide-leg trousers",
        "decor": "a line-art trailing houseplant on the left, a line-art kitchen window with simple curtain folds, a line-art wall shelf with simple jars, a line-art small wall calendar with a grid",
        "bubbles": ["calendar", "pill"],
    },
    "bbt-accuracy-ttc": {
        "subject": "woman", "setting": "bedroom at dawn",
        "action": "sitting up in bed at dawn, holding a digital basal body thermometer to her mouth with one hand and a small bedside notebook in her other hand, soft early-morning light filtering through the window",
        "tops": "loose cream sleep tee and dusty-lavender pyjama trousers",
        "decor": "a line-art bedside lamp on the right, a line-art alarm clock on the bedside table, a line-art window frame with simple curtain folds, a line-art tabletop plant",
        "bubbles": ["thermometer", "moon"],
    },
    "can-you-get-pregnant-with-pcos": {
        "subject": "clinician_patient", "setting": "doctor's office desk",
        "action": "a woman OB-GYN in scrubs sitting at a desk across from a woman patient, explaining a simple ovary diagram on a paper chart, both leaning in with calm focus",
        "tops": "clinician in sage-green scrubs, patient in soft-peach jumper",
        "decor": "a line-art desk lamp, a line-art tall houseplant in the corner, a line-art wall frame, a line-art window outline",
        "bubbles": [],
    },
    "did-i-cause-gestational-diabetes": {
        "subject": "woman", "setting": "living room sofa",
        "action": "a pregnant woman sitting on a sofa with her hand resting gently on a subtle pregnancy bump, looking thoughtful while reading a printed lab result page on her lap, a cup of tea on the side table",
        "tops": "loose cream maternity top and dusty-lavender soft trousers",
        "decor": "a line-art floor lamp behind the sofa, a line-art houseplant on the left, a line-art picture frame on the wall",
        "bubbles": [],
        "notes": "subtle pregnancy bump, not exaggerated",
    },
    "first-ivf-cycle-prep": {
        "subject": "couple", "setting": "kitchen counter",
        "action": "a couple standing at a kitchen counter together, the woman writing on a wall calendar pinned to the wall while the partner organises a small tray of vitamin bottles and a folded patient-information leaflet",
        "tops": "woman in soft-peach jumper, partner in sage-green sweatshirt",
        "decor": "a line-art kitchen wall shelf with simple jars, a line-art window above the counter, a line-art trailing plant on the right",
        "bubbles": ["calendar", "pill"],
    },
    "folic-acid-before-ttc": {
        "subject": "woman", "setting": "kitchen breakfast counter",
        "action": "a woman standing at a sunlit kitchen counter pouring a single folic acid tablet from a small bottle into the palm of her hand, a glass of water and a small bowl of leafy greens beside her",
        "tops": "soft-peach short-sleeve top and warm-cream linen trousers",
        "decor": "a line-art trailing houseplant on the left, a line-art kitchen window with curtain folds, a line-art wall shelf with simple jars",
        "bubbles": ["pill", "leaf"],
    },
    "gd-after-ivf": {
        "subject": "woman", "setting": "clinic waiting area",
        "action": "a pregnant woman sitting in a calm clinic waiting area, hand resting on a subtle pregnancy bump, reading a folded leaflet titled (no readable text) with quiet attention, a soft tote bag on the seat beside her",
        "tops": "loose dusty-coral maternity tunic and warm-cream trousers",
        "decor": "a line-art waiting-room chair beside her, a line-art houseplant, a line-art reception-desk corner outline, a line-art wall sign frame",
        "bubbles": [],
        "notes": "subtle pregnancy bump",
    },
    "gd-bedtime-snacks": {
        "subject": "woman", "setting": "kitchen at night",
        "action": "a pregnant woman in soft loungewear standing at a quiet kitchen counter at night, plating a small bedtime snack of cheese cubes, wholegrain crackers and a few apple slices on a small round plate, a glass of milk beside her",
        "tops": "loose pale-sage cardigan over a cream maternity tee and dusty-lavender soft trousers",
        "decor": "a line-art kitchen window showing a crescent moon, a line-art pendant lamp above the counter, a line-art shelf with jars",
        "bubbles": ["moon"],
        "notes": "subtle pregnancy bump",
    },
    "gd-insulin-vs-metformin": {
        "subject": "clinician_patient", "setting": "consulting room",
        "action": "a woman OB-GYN holding a small insulin pen in one hand and a single tablet blister pack in the other, gesturing toward a seated pregnant patient who looks attentive and calm",
        "tops": "clinician in sage-green scrubs, patient in soft-peach maternity top and warm-cream trousers",
        "decor": "a line-art desk between them, a line-art wall frame, a line-art houseplant in the corner",
        "bubbles": [],
        "notes": "subtle pregnancy bump on patient",
    },
    "gd-long-term-baby-effects": {
        "subject": "mother_baby", "setting": "living room armchair",
        "action": "a mother seated in a soft armchair holding her wrapped baby with both hands, looking down at the baby's face with quiet, tender focus, soft warm light from a side window",
        "tops": "loose cream cardigan over a soft-peach tee and dusty-lavender trousers",
        "decor": "a line-art floor lamp, a line-art window with curtain folds, a line-art trailing plant, a line-art picture frame on the wall",
        "bubbles": [],
    },
    "gestational-diabetes-diet-plan": {
        "subject": "woman", "setting": "kitchen table",
        "action": "a pregnant woman sitting at a kitchen table eating from a balanced plate divided into wholegrains, lean protein and a generous portion of leafy vegetables, holding a fork mid-action and a glass of water beside the plate",
        "tops": "soft-peach maternity top and warm-cream trousers",
        "decor": "a line-art kitchen window, a line-art hanging plant, a line-art wall shelf with simple jars",
        "bubbles": ["leaf"],
        "notes": "subtle pregnancy bump",
    },
    "gestational-diabetes-test-when": {
        "subject": "woman", "setting": "clinic lab area",
        "action": "a pregnant woman sitting in a calm clinic phlebotomy chair holding a small clear glucose-drink bottle with both hands, looking at it with quiet attention, a folded paper appointment slip on her lap",
        "tops": "soft-peach maternity tunic and dusty-lavender trousers",
        "decor": "a line-art phlebotomy chair outline behind her, a line-art wall poster frame, a line-art houseplant",
        "bubbles": ["clock"],
        "notes": "subtle pregnancy bump (silhouette only); fully and clearly clothed in an opaque sage-green long-sleeve maternity jumper over a cream tee plus dusty-lavender wide-leg trousers — NO bare torso, NO visible chest skin; no needle in skin",
    },
    "how-long-does-it-take-to-get-pregnant": {
        "subject": "woman", "setting": "desk at home",
        "action": "a woman sitting at a tidy home desk looking thoughtfully at a paper monthly calendar marked with small circles, a pen poised in her hand, a cup of tea beside her",
        "tops": "muted-coral jumper and dusty-lavender wide-leg trousers",
        "decor": "a line-art desk lamp, a line-art tall houseplant, a line-art shelf above the desk with simple jars and a frame",
        "bubbles": ["calendar", "clock"],
    },
    "how-often-have-sex-to-conceive": {
        "subject": "couple", "setting": "kitchen at home",
        "action": "a couple sharing a quiet warm moment in a sunny kitchen, the woman leaning slightly against the counter holding a mug, the partner beside her with his arm around her shoulder, both smiling softly",
        "tops": "woman in soft-peach jumper, partner in sage-green sweater",
        "decor": "a line-art kitchen window, a line-art trailing plant, a line-art wall shelf",
        "bubbles": [],
        "notes": "fully clothed, dignified, affectionate not romantic-cliché",
    },
    "how-to-get-pregnant-fast": {
        "subject": "woman", "setting": "bedroom with calendar wall",
        "action": "a woman standing beside a wall calendar marking small dots across a row of dates with a coloured pen, a fertility tracking app open on her phone in her other hand showing a simple graph",
        "tops": "soft-peach short-sleeve top and sage-green trousers",
        "decor": "a line-art wall calendar grid, a line-art picture frame, a line-art houseplant in the corner, a line-art window",
        "bubbles": ["calendar", "heart"],
    },
    "how-to-know-if-you-have-pcos": {
        "subject": "clinician_patient", "setting": "consulting room desk",
        "action": "a woman OB-GYN at a desk holding up a paper diagnostic checklist toward a seated woman patient, pointing to a row of three simple criteria boxes",
        "tops": "clinician in sage-green scrubs, patient in muted-coral jumper",
        "decor": "a line-art desk lamp, a line-art window, a line-art houseplant, a line-art wall frame",
        "bubbles": [],
    },
    "how-to-use-fertile-window-calculator": {
        "subject": "woman", "setting": "sofa with laptop",
        "action": "a woman curled comfortably on a sofa with a laptop open on her lap, looking at a simple calendar interface on the screen with a row of highlighted day-squares, a small notepad and pen beside her",
        "tops": "loose muted-coral jumper and warm-cream soft trousers",
        "decor": "a line-art floor lamp, a line-art houseplant, a line-art wall art frame above the sofa",
        "bubbles": ["calendar"],
    },
    "inositol-vs-metformin-pcos": {
        "subject": "woman", "setting": "kitchen counter",
        "action": "a woman standing at a kitchen counter holding a small inositol sachet in one hand and a single tablet blister pack in the other, looking down at them with quiet consideration, a glass of water and a small bowl of berries on the counter",
        "tops": "soft-peach jumper and sage-green trousers",
        "decor": "a line-art trailing plant on the right, a line-art kitchen window, a line-art wall shelf",
        "bubbles": ["pill"],
    },
    "iui-vs-ivf": {
        "subject": "couple", "setting": "kitchen table reviewing leaflets",
        "action": "a couple sitting at a kitchen table together, two folded patient-information leaflets spread between them, the woman tracing a row on one leaflet with her fingertip while the partner watches attentively",
        "tops": "woman in muted-coral jumper, partner in cream sweatshirt",
        "decor": "a line-art kitchen window, a line-art hanging pendant lamp above the table, a line-art houseplant",
        "bubbles": [],
    },
    "ivf-cost-uk": {
        "subject": "couple", "setting": "home desk reviewing paperwork",
        "action": "a couple sitting side by side at a home desk, a printed clinic invoice and a small notebook open between them, the woman pointing at a row on the invoice while the partner holds a calculator",
        "tops": "woman in sage-green jumper, partner in dusty-lavender sweatshirt",
        "decor": "a line-art desk lamp, a line-art window with curtain folds, a line-art tall houseplant",
        "bubbles": [],
    },
    "ivf-cost-us": {
        "subject": "couple", "setting": "home desk with laptop",
        "action": "a couple sitting at a home desk together, a laptop open between them showing a simple insurance summary table on the screen, the partner holding a printed statement while the woman makes notes in a small notebook",
        "tops": "woman in muted-coral jumper, partner in warm-cream sweater",
        "decor": "a line-art desk lamp, a line-art shelf with simple frames, a line-art houseplant",
        "bubbles": [],
    },
    "ivf-emotional-support": {
        "subject": "couple", "setting": "sofa together",
        "action": "a couple sitting close together on a sofa, the partner with an arm around the woman, both holding the same mug of tea between them, the woman leaning her head gently against his shoulder with a calm, quiet expression",
        "tops": "woman in dusty-lavender cardigan, partner in sage-green sweater",
        "decor": "a line-art floor lamp on the right, a line-art trailing plant, a line-art wall art frame above the sofa",
        "bubbles": [],
    },
    "ivf-success-rates-by-age": {
        "subject": "woman", "setting": "home desk reviewing a chart",
        "action": "a woman seated at a home desk studying a printed bar-chart page on the desk, holding a pen poised above a small notebook, a cup of tea beside the chart",
        "tops": "soft-peach jumper and warm-cream trousers",
        "decor": "a line-art desk lamp, a line-art shelf with frames, a line-art window with curtain folds",
        "bubbles": [],
    },
    "ivf-with-pcos-success": {
        "subject": "clinician_patient", "setting": "consulting room desk",
        "action": "a woman OB-GYN at a desk holding a simple printed bar-chart, gesturing toward a seated woman patient who watches with quiet hope, a small folder on the desk between them",
        "tops": "clinician in sage-green scrubs, patient in muted-coral jumper and warm-cream trousers",
        "decor": "a line-art desk lamp, a line-art window, a line-art houseplant",
        "bubbles": [],
    },
    "lean-pcos-fertility": {
        "subject": "woman", "setting": "kitchen counter with a meal",
        "action": "a slim woman standing at a kitchen counter plating a small balanced lunch of grilled fish, quinoa and leafy greens, a glass of water beside the plate",
        "tops": "soft-peach jumper and sage-green trousers",
        "decor": "a line-art trailing plant on the right, a line-art window, a line-art shelf with jars",
        "bubbles": ["leaf"],
    },
    "letrozole-vs-clomid-pcos": {
        "subject": "clinician_patient", "setting": "consulting room",
        "action": "a woman OB-GYN holding two small tablet blister packs side by side, gesturing as she compares them, with a seated woman patient watching attentively",
        "tops": "clinician in sage-green scrubs, patient in soft-peach jumper",
        "decor": "a line-art desk corner, a line-art houseplant, a line-art wall frame",
        "bubbles": ["pill"],
    },
    "male-fertility-pre-conception": {
        "subject": "male", "setting": "kitchen at home",
        "action": "a man standing at a kitchen counter pouring a single tablet from a small supplement bottle into his palm, a glass of water and a small bowl of nuts and seeds beside him",
        "tops": "sage-green short-sleeve shirt and dusty-lavender trousers",
        "decor": "a line-art kitchen window, a line-art trailing plant, a line-art wall shelf",
        "bubbles": ["pill", "leaf"],
    },
    "nhs-fertility-testing": {
        "subject": "clinician_patient", "setting": "NHS-style GP consulting room",
        "action": "a woman GP at a desk handing a printed referral form across the desk toward a seated woman patient, both leaning slightly forward in calm conversation",
        "tops": "clinician in sage-green scrubs, patient in muted-coral jumper",
        "decor": "a line-art desk lamp, a line-art window, a line-art wall poster frame",
        "bubbles": [],
    },
    "ovulation-induction-what-to-expect": {
        "subject": "clinician_patient", "setting": "consulting room",
        "action": "a woman OB-GYN at a desk drawing a small simple cycle-tracking timeline on a paper page for a seated woman patient, the patient watching with attentive calm",
        "tops": "clinician in sage-green scrubs, patient in soft-peach jumper",
        "decor": "a line-art desk lamp, a line-art houseplant, a line-art window",
        "bubbles": [],
    },
    "pcos-and-gd-link": {
        "subject": "woman", "setting": "kitchen counter with notebook",
        "action": "a woman standing at a kitchen counter with an open notebook in front of her, hand-drawing a simple two-circle linking diagram with a pen, a glass of water beside the notebook",
        "tops": "muted-coral jumper and warm-cream trousers",
        "decor": "a line-art trailing plant, a line-art window, a line-art wall shelf",
        "bubbles": [],
    },
    "pcos-cycle-tracking-ovulation": {
        "subject": "woman", "setting": "sofa with phone",
        "action": "a woman sitting cross-legged on a sofa, holding a phone showing a simple cycle-tracking app with a row of date-circles and a small graph, a paper notebook open beside her on the cushion",
        "tops": "loose soft-peach jumper and sage-green trousers",
        "decor": "a line-art floor lamp, a line-art trailing plant, a line-art wall art frame",
        "bubbles": ["calendar", "droplet"],
    },
    "pcos-diet-to-conceive": {
        "subject": "woman", "setting": "kitchen table",
        "action": "a woman sitting at a kitchen table with a balanced plate divided into wholegrains, lean protein and leafy greens, holding a fork mid-action and a glass of water beside the plate",
        "tops": "sage-green top and warm-cream trousers",
        "decor": "a line-art kitchen window, a line-art hanging plant, a line-art wall shelf with jars",
        "bubbles": ["leaf"],
    },
    "pcos-fertility-treatment-options": {
        "subject": "clinician_patient", "setting": "consulting room with a ladder diagram",
        "action": "a woman OB-GYN at a desk pointing at a paper page showing a simple stepped-ladder diagram of treatment options, a seated woman patient leaning in to look at it",
        "tops": "clinician in sage-green scrubs, patient in dusty-lavender jumper",
        "decor": "a line-art desk lamp, a line-art houseplant, a line-art wall frame",
        "bubbles": [],
    },
    "pcos-insulin-resistance-fertility": {
        "subject": "woman", "setting": "kitchen counter with a glucometer",
        "action": "a woman standing at a kitchen counter holding a small home glucometer in one hand and a single tablet blister pack in the other, looking at them with calm focus, a glass of water and a small bowl of berries on the counter",
        "tops": "muted-coral jumper and dusty-lavender trousers",
        "decor": "a line-art trailing plant, a line-art kitchen window, a line-art wall shelf",
        "bubbles": ["droplet"],
    },
    "pcos-pregnancy-success": {
        "subject": "mother_baby", "setting": "soft living room",
        "action": "a mother sitting in a comfortable armchair holding her wrapped baby on her chest, looking down at the baby with quiet contentment, soft warm light from a side window",
        "tops": "soft-peach cardigan over a cream tee and warm-cream trousers",
        "decor": "a line-art floor lamp, a line-art window with curtain folds, a line-art trailing plant, a line-art picture frame",
        "bubbles": [],
    },
    "pcos-ttc-tips": {
        "subject": "woman", "setting": "kitchen counter planning",
        "action": "a woman standing at a kitchen counter with a paper monthly planner open in front of her, marking small dots across a row of dates with a pen, a small bottle of supplements and a glass of water beside the planner",
        "tops": "sage-green jumper and warm-cream trousers",
        "decor": "a line-art trailing plant, a line-art kitchen window, a line-art wall shelf",
        "bubbles": ["calendar", "pill"],
    },
    "pmos-vs-pcos-difference": {
        "subject": "clinician_patient", "setting": "consulting room",
        "action": "a woman OB-GYN at a desk holding up a paper page showing two simple labelled circle-diagrams side by side, gesturing as she explains the comparison to a seated woman patient",
        "tops": "clinician in sage-green scrubs, patient in muted-coral jumper",
        "decor": "a line-art desk lamp, a line-art window, a line-art houseplant",
        "bubbles": [],
    },
    "pre-conception-health-checklist": {
        "subject": "woman", "setting": "home desk with a checklist",
        "action": "a woman sitting at a home desk ticking items on a printed checklist with a pen, a small bottle of supplements, a glass of water and a wall calendar visible above the desk",
        "tops": "soft-peach jumper and sage-green trousers",
        "decor": "a line-art wall calendar grid, a line-art desk lamp, a line-art houseplant",
        "bubbles": ["checkmark", "pill"],
    },
    "pre-pregnancy-bloods-uk": {
        "subject": "clinician_patient", "setting": "NHS GP consulting room",
        "action": "a woman GP at a desk handing a printed blood-test request form across to a seated woman patient, both calm and attentive",
        "tops": "clinician in sage-green scrubs, patient in cream jumper",
        "decor": "a line-art desk lamp, a line-art window, a line-art wall poster frame",
        "bubbles": ["droplet"],
    },
    "pre-pregnancy-bloods-us": {
        "subject": "clinician_patient", "setting": "US clinic consulting room",
        "action": "a woman clinician at a desk holding a printed lab-test checklist, pointing at a row on it for a seated woman patient who is taking notes in a small notebook",
        "tops": "clinician in sage-green scrubs, patient in muted-coral jumper",
        "decor": "a line-art desk lamp, a line-art window, a line-art houseplant",
        "bubbles": ["droplet", "checkmark"],
    },
    "preconception-health-checklist": {
        "subject": "couple", "setting": "kitchen counter planning",
        "action": "a couple at a kitchen counter together, the woman ticking items on a printed checklist with a pen while the partner organises a small tray of vitamin bottles and a glass of water beside the checklist",
        "tops": "woman in soft-peach top, partner in sage-green sweatshirt",
        "decor": "a line-art kitchen window, a line-art trailing plant, a line-art wall shelf",
        "bubbles": ["checkmark", "pill"],
    },
    "signs-of-ovulation-ttc": {
        "subject": "woman", "setting": "bathroom counter morning",
        "action": "a woman standing at a bright bathroom counter holding a small ovulation-test strip in one hand and looking at it with calm focus, a small glass of water beside the sink",
        "tops": "loose cream tee and dusty-lavender soft trousers",
        "decor": "a line-art bathroom mirror, a line-art shelf with small bottles, a line-art trailing plant",
        "bubbles": ["droplet", "calendar"],
    },
    "sperm-analysis-partner-test": {
        "subject": "clinician_patient", "setting": "consulting room",
        "action": "a woman clinician at a desk holding a printed sperm-analysis report page, gesturing toward a seated male patient who watches attentively with quiet focus",
        "tops": "clinician in sage-green scrubs, male patient in dusty-lavender shirt",
        "decor": "a line-art desk lamp, a line-art houseplant, a line-art wall frame",
        "bubbles": [],
        "notes": "primary subject is a man with the clinician; no explicit imagery",
    },
    "stopping-birth-control-conceive": {
        "subject": "woman", "setting": "bedroom with a calendar",
        "action": "a woman sitting on the edge of her bed holding a contraceptive pill pack in one hand and looking thoughtfully at a small wall calendar with a row of marked dates",
        "tops": "loose muted-coral jumper and sage-green soft trousers",
        "decor": "a line-art bedside lamp, a line-art wall calendar grid, a line-art trailing plant, a line-art picture frame",
        "bubbles": ["calendar", "pill"],
    },
    "trying-to-conceive-tips-first-6-months": {
        "subject": "couple", "setting": "kitchen morning",
        "action": "a couple sharing a calm sunny breakfast at a kitchen counter, the woman holding a mug while the partner pours from a small jug, both relaxed and engaged in quiet conversation",
        "tops": "woman in soft-peach jumper, partner in cream sweater",
        "decor": "a line-art kitchen window, a line-art trailing plant, a line-art wall shelf with simple jars",
        "bubbles": [],
    },
    "ttc-6-months-no-pregnancy": {
        "subject": "couple", "setting": "sofa quiet conversation",
        "action": "a couple sitting together on a sofa, the partner holding the woman's hand gently between them as they talk with quiet, supportive expressions, a folded letter resting on the cushion between them",
        "tops": "woman in dusty-lavender jumper, partner in sage-green sweater",
        "decor": "a line-art floor lamp, a line-art trailing plant, a line-art wall art frame above the sofa",
        "bubbles": [],
    },
    "ttc-after-35": {
        "subject": "woman", "setting": "home desk with chart",
        "action": "a woman in her late thirties sitting at a tidy home desk studying a printed line-chart on the desk, holding a pen poised above a small notebook, a cup of tea beside the chart",
        "tops": "muted-coral jumper and warm-cream trousers",
        "decor": "a line-art desk lamp, a line-art shelf with frames, a line-art houseplant",
        "bubbles": ["clock"],
    },
    "understanding-pcos-guide-ttc": {
        "subject": "clinician_patient", "setting": "consulting room",
        "action": "a woman OB-GYN at a desk drawing a small simple ovary diagram on a paper page, explaining it to a seated woman patient who watches with attentive calm, a small folder open between them",
        "tops": "clinician in sage-green scrubs, patient in soft-peach jumper",
        "decor": "a line-art desk lamp, a line-art window, a line-art houseplant",
        "bubbles": [],
    },
    "unexplained-infertility-next-steps": {
        "subject": "couple", "setting": "home desk reviewing a plan",
        "action": "a couple sitting side by side at a home desk, a printed stepped-plan page open between them, the woman tracing a row with her fingertip while the partner holds a small notebook",
        "tops": "woman in cream jumper, partner in dusty-lavender sweatshirt",
        "decor": "a line-art desk lamp, a line-art window with curtain folds, a line-art houseplant",
        "bubbles": [],
    },
    "us-fertility-testing-what-to-ask": {
        "subject": "clinician_patient", "setting": "US clinic consulting room",
        "action": "a woman patient sitting across from a woman clinician at a desk, holding up a small folded notebook of questions and reading from it, the clinician listening attentively",
        "tops": "patient in muted-coral jumper, clinician in sage-green scrubs",
        "decor": "a line-art desk lamp, a line-art window, a line-art wall poster frame",
        "bubbles": [],
    },
    "weight-and-pre-conception-fertility": {
        "subject": "woman", "setting": "kitchen counter with a meal",
        "action": "a woman standing at a kitchen counter plating a balanced meal of wholegrains, lean protein and leafy greens, a glass of water and a small bowl of berries beside the plate",
        "tops": "soft-peach jumper and sage-green trousers",
        "decor": "a line-art kitchen window, a line-art trailing plant, a line-art wall shelf with jars",
        "bubbles": ["leaf"],
    },
    "when-to-consider-ivf-after-ttc": {
        "subject": "couple", "setting": "home desk decision-making",
        "action": "a couple sitting together at a home desk, a printed decision-flowchart page open between them, the partner pointing at a branch on the chart while the woman watches and considers",
        "tops": "woman in dusty-lavender jumper, partner in sage-green sweater",
        "decor": "a line-art desk lamp, a line-art window, a line-art houseplant",
        "bubbles": [],
    },
    "when-to-see-fertility-specialist": {
        "subject": "woman", "setting": "home desk with a calendar",
        "action": "a woman sitting at a tidy home desk circling a date on a paper monthly calendar with a coloured pen, a phone beside her showing a simple appointment booking screen",
        "tops": "soft-peach jumper and warm-cream trousers",
        "decor": "a line-art desk lamp, a line-art shelf with frames, a line-art houseplant",
        "bubbles": ["calendar", "clock"],
    },
}


def subject_phrase(subject):
    return {
        "woman": "a woman",
        "couple": "a woman and her male partner",
        "clinician_patient": "a woman clinician and a seated woman patient",
        "mother_baby": "a mother holding her wrapped baby",
        "male": "a man",
    }.get(subject, "a woman")


def hair_color(skin):
    return "deep cool brown to black" if skin in ("warm-brown", "deep-brown", "olive") else "warm medium brown"


def build_prompt(title, skin, bg, scene):
    tops = scene["tops"]
    decor = scene["decor"]
    bubbles = scene.get("bubbles", [])
    notes = scene.get("notes", "")
    subj = subject_phrase(scene["subject"])
    hair = hair_color(skin)

    bubble_block = ""
    if bubbles:
        names = ", ".join(bubbles)
        bubble_block = (
            f"\nAround the subject, {len(bubbles)} small line-art circle{'s' if len(bubbles)>1 else ''} float "
            f"at about shoulder height; each contains one simple outline-only icon ({names}) "
            "in the same soft mauve-brown line tone.\n"
        )

    notes_line = f" Additional note: {notes}." if notes else ""

    return f"""A flat editorial vector illustration for a UK women's-health blog post titled "{title}".

Scene: {scene["action"]}.

Composition: {subj} anchored in the lower-left to centre of the frame, fully visible from head to mid-thigh or full body, with breathing room from all canvas edges, especially the bottom-right corner which must stay completely empty negative space (no characters, no decor, no marks of any kind). Skin tone {skin}, hair {hair} (medium length, loose or low bun). Clothing: {tops}. Five-finger anatomy, symmetric face, gentle calm expression — no exaggerated emotion.{notes_line}

Background: an unbroken flat field of {bg} covering the entire canvas edge to edge.

Background decor (line-art outlines only, not filled): {decor}.
{bubble_block}
Mood: calm, contemplative, dignified, evidence-led. Hand-drawn organic shapes with gentle curves. Single soft light direction. Aspect ratio 16:9 landscape, 1200x630."""


NEGATIVE = """text, letters, words, glyphs, captions, labels, headlines, URLs, brand names, logos, rendered marks of any kind, photographic, 3D render, painterly, anime, Pixar style, clipart, isometric, plain white background, neon, saturated primaries, teal, aqua, cartoon-cute, sexualised, fetishised pregnancy imagery, melodrama, exaggerated emotion, crying with tears, blood, needles entering skin, surgical instruments, cropped face, cropped hands, cropped feet, fused fingers, extra fingers, floating subject, filled background decor blocks"""


def main():
    with open("/tmp/rumpa_slugs.json") as f:
        posts = json.load(f)

    written = 0
    skipped = 0
    missing_scene = []

    for idx, post in enumerate(posts):
        slug = post["slug"]
        title = post["title"]
        is_dir = post["is_dir"]

        scene = SCENES.get(slug)
        if scene is None:
            missing_scene.append(slug)
            continue

        skin = SKIN_POOL[idx % len(SKIN_POOL)]
        bg = BG_POOL[idx % len(BG_POOL)]

        prompt = build_prompt(title, skin, bg, scene)

        # Prompts live OUTSIDE content/blog (Nextra reads content/blog).
        PROMPTS_DIR.mkdir(parents=True, exist_ok=True)
        out = PROMPTS_DIR / f"{slug}.md"

        if out.exists():
            skipped += 1
            print(f"  KEEP  {slug} (already has THUMBNAIL.md)")
            continue

        # Build full file
        scene_summary = (
            f"# THUMBNAIL.md — {slug}\n\n"
            f"- **Post title:** {title}\n"
            f"- **Subject:** {scene['subject']}\n"
            f"- **Setting:** {scene['setting']}\n"
            f"- **Skin tone:** {skin}\n"
            f"- **Background tone:** {bg}\n"
            f"- **Notes:** {scene.get('notes','—')}\n\n"
            f"**Prompt:**\n\n{prompt}\n\n"
            f"**Negative prompt:**\n\n{NEGATIVE}\n"
        )
        out.write_text(scene_summary)
        written += 1
        print(f"  WROTE {out.relative_to(REPO)} (skin={skin} bg={bg})")

    print(f"\nDone. wrote={written} skipped={skipped} missing_scene={len(missing_scene)}")
    if missing_scene:
        print("Missing scene plan for:")
        for s in missing_scene:
            print(f"  - {s}")


if __name__ == "__main__":
    main()
