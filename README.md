# GEU Admissions 2027–28 – static landing page

Pure HTML + CSS. No JavaScript, no build step, no server code.

```
index.html              the page
assets/css/style.css    all styles (mobile-first; breakpoints 560 / 861 / 1100px)
assets/fonts/           Sora + Inter (woff2)
assets/brand/           logos, favicon
assets/img/<section>/   images, named <name>-<width>.webp (used via srcset)
```

## Preview
Serve the folder over http (webfonts are blocked on `file://`), e.g.
`npx serve .` or any Apache/Nginx static host. All paths are relative, so it works from any sub-folder.

## Sections
Hero · Rankings tapes · 01 About · 02 Why GEU · 03 Programmes · 04 Placements ·
05 Campus · 06 Admissions & scholarships · 07 FAQs · CTA · Footer

## Adding the visit/enquiry form later
There is no form on the page yet. In `index.html`, search for `VISIT FORM SLOT`: the empty
`<div class="hero__slot" id="apply">` sits at the bottom of the hero. Put the form there.
Every "Apply" button and every programme link already points to `#apply`; until the form is
added they scroll to the bottom of the hero. On desktop the hero is currently one column; if the
form should sit beside the text, move the slot inside `.hero__grid` and give that grid a second column.

## How things work without JavaScript
- Mobile menu: `#menu` URL target (`:target`); tapping a section link closes it.
- Programme tabs: radio buttons + `:has()`; departments are `<details>` accordions.
- FAQ: `<details name="faq">` (one open at a time).
- Reveal-on-scroll, mobile dock and side "Apply" tab: CSS scroll-driven animations
  (progressive enhancement; everything stays visible in browsers without support).

## Content to re-check before going live
- Scholarship figures (70% / 10% / 5%, GECET ₹100 Cr, up to 100% waiver) come from the 2026
  `/lp/admissions2026` page; confirm the 2027–28 policy.
- No phone number or email was available in the source projects, so none is shown.
