# GEU Admissions 2027–28 – static landing page

HTML + CSS, no build step, no server code. The only JavaScript is the EduLeap enquiry
widget and the small file that themes it (same design as the GEHU page, `D:\CP\gehuapply`).

```
index.html                  the page
assets/css/style.css        all styles (mobile-first; breakpoints 560 / 861 / 1100px)
assets/js/enquiry-theme.js  restyles the EduLeap widget to match the hero (presentation only)
assets/fonts/               Sora + Inter (woff2)
assets/brand/               logos, favicon
assets/img/<section>/       images, named <name>-<width>.webp (used via srcset)
```

## Cache busting
`index.html` loads `style.css?v=N` and `enquiry-theme.js?v=N`. Bump `N` whenever either file
changes, or returning visitors keep the old cached copy.

## Preview
Serve the folder over http (webfonts are blocked on `file://`), e.g.
`npx serve .` or `python -m http.server`. All paths are relative, so it works from any sub-folder.

## Sections
Hero · Rankings tapes · 01 About · 02 Why GEU · 03 Programmes · 04 Placements ·
05 Campus · 06 Admissions & scholarships · 07 FAQs · CTA · Footer

## Enquiry form (EduLeap CRM widget)
The right side of the hero (`<div class="hero__slot" id="apply">`) holds the EduLeap lead
widget (key `mbs2026`), loaded from `staff-crm.vsilabs.co`. Every "Apply" button and programme
link points to `#apply`. Submissions go straight from the widget to the EduLeap CRM; this site
stores nothing.

- **Fields, title, colour** are set in the CRM admin for the widget key. The live CRM config
  overrides the `data-*` attributes in `index.html`, so change fields there.
- **Look**: the widget renders in a Shadow DOM, so page CSS cannot style it.
  `assets/js/enquiry-theme.js` (a copy of the GEHU theme with GEU fact chips) injects a stylesheet
  into that shadow root: navy header band, white body, two fields per row, placeholders instead
  of labels, blue submit button. The gold offset slab behind the card is page CSS (`.hero__slot`).
  It never touches field names, validation or the request, so leads are unaffected. If EduLeap
  renames its classes (`.el-card`, `.el-input`, …) the form falls back to the vendor styling.

## Other behaviour without JavaScript
- Mobile menu: `#menu` URL target (`:target`); tapping a section link closes it.
- Programme tabs: radio buttons + `:has()`; departments are `<details>` accordions.
- FAQ: `<details name="faq">` (one open at a time).
- Reveal-on-scroll, mobile dock and side "Apply" tab: CSS scroll-driven animations
  (progressive enhancement; everything stays visible in browsers without support).

## Content sources (checked on geu.ac.in, 26 Nov 2026)
- **Placements** (geu.ac.in/placements): top offer still ₹61.99 L, Priyanshi Bhandoria, Batch 2025,
  Atlassian. Cards: Pradeep Rawat (Google, Batch 2026, ₹61.36 L), Shivam Aggarwal (DE Shaw,
  2026, ₹60.30 L), Suyash Gehlot (DE Shaw, 2025, ₹56.30 L), Kunal Kumar (Microsoft, 2026,
  ₹56.00 L). Companies come from the logo shown on each card.
- **Scholarships** (geu.ac.in/admissions/scholarship, /admissions/gecet, /lp/admissions2026):
  GECET 100% tuition waiver for 97.5–100 marks; 10% female candidates; 5% wards of defence
  personnel; "up to ₹100 Crores" from /lp/admissions2026. The old "70% merit-based" figure is no
  longer on the site and was removed.
- **NAAC A+ (2022), QS I-Gauge Diamond, 240+ patents granted**: geu.ac.in/about-us/awards-rankings
  and the homepage counter.

## Re-check before going live
- **NBA**: the page says 6 NBA-accredited programmes, as instructed by the client. geu.ac.in still
  says "Seven programs accredited by NBA as of Dec 2022"; get the official list.
- **NIRF**: the page shows NIRF 2025 (#48 University, #52 Engineering, #52 Management).
  NIRF 2026 ranks could not be verified (nirfindia.org blocks automated access, and geu.ac.in
  labels "#48" as 2025 in one place and 2026 in another).
- **Programme count**: the page lists 147 programmes in 21 departments (the programme tabs).
  The geu.ac.in homepage counter now reads "135+ programs" and "25+ departments".
- **Contact**: geu.ac.in lists toll-free 1800 890 6027 (also 1800 270 1280) and
  admissions@geu.ac.in; none is shown on this page yet.
