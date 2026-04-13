# Luna Law, PLLC — Website Project

## Project Overview
Static website for Luna Law, PLLC — a South Florida divorce and family law firm.
Hosted on Netlify, connected to this GitHub repo (System2t/luna-law-website).
Every commit to `main` auto-deploys to: https://musical-sawine-1735c5.netlify.app/

## File Structure
```
luna-law-website/
├── index.html          ← Homepage
├── about.html          ← About page
├── css/
│   └── styles.css      ← ALL shared CSS (nav, footer, colors, typography)
├── js/
│   └── scripts.js      ← ALL shared JS (nav toggle, FAQ accordion, scroll reveal)
└── assets/
    ├── logo.png                    ← LunaLaw, pllc. white logo
    ├── portrait.png                ← Hernan Luna arms-crossed portrait (black bg removed)
    ├── hero.png                    ← Hero background photo
    ├── team.jpg                    ← Full team photo (5 members)
    ├── sig.png                     ← Hernan Luna signature watermark
    ├── badge-family.png            ← Florida Bar Family Law Section badge
    ├── badge-criminal.png          ← Florida Bar Criminal Law Section badge
    └── team/
        ├── hernan-luna.png         ← Hernan M. Luna headshot
        ├── john-borgo.png          ← John J. Borgo headshot
        ├── diego-montano.png       ← Diego Montano headshot
        ├── raul-uribe.png          ← Raul Uribe headshot
        └── rony-vasquez.png        ← Rony Vasquez headshot

## Design System
**Colors (CSS variables in styles.css):**
- `--void: #07080c` — primary dark background
- `--deep: #0b0d14` — section alternating background
- `--surface: #10131d` — card/panel background
- `--lift: #161a27` — hover states
- `--gold: #b89144` — primary accent
- `--gold-lt: #d4ac62` — lighter gold
- `--text: #c9c3b5` — body text
- `--muted: #6b6660` — secondary text
- `--white: #faf8f4` — headings/white

**Typography:**
- Display headings: `Libre Baskerville` (serif)
- Body/UI: `Outfit` (sans-serif)
- Quotes/taglines only: `Cormorant Garamond` (italic)

## Firm Details
- **Firm:** Luna Law, PLLC
- **Phone:** 1-800-868-5862
- **Email:** info@hlunalaw.com
- **Address:** 8950 SW 74th Ct, Suite 2201 PMB A56, Miami, FL 33156
- **Hours:** Mon – Sun: 9am – 5pm
- **Yelp:** https://www.yelp.com/biz/lunalaw-miami
- **Instagram:** @hlunalaw
- **LawPay:** https://secure.lawpay.com/pages/luna/operating
- **Domain (live):** hlunalaw.com (not yet pointed — staging only)

## Team Members
1. Hernan M. Luna, Esq. — Founding Attorney
2. John J. Borgo, Esq. — Associate Attorney
3. Diego Montano — Legal Team Member
4. Raul Uribe — Legal Assistant
5. Rony Vasquez — Billing & Intake Specialist

## Pages
- `index.html` — Homepage (hero, credentials, services, process, practice areas, attorney bio, testimonials, FAQ, CTA, Instagram, Yelp, contact form, footer)
- `about.html` — About page (firm intro, team photo, team members grid, why choose us, philosophy, credentials, CTA, footer)

## Adding New Pages
1. Copy the structure of `about.html` as a starting template
2. Link `css/styles.css` and `js/scripts.js` in the `<head>` and before `</body>`
3. Add the new page to the nav in ALL existing pages
4. Upload assets to the `assets/` folder
5. Commit and push — Netlify auto-deploys

## Nav Items (must be consistent across ALL pages)
- Services → `index.html#services`
- Practice Areas → `index.html#practice`
- About Luna Law → `about.html`
- FAQ → `index.html#faq`
- Contact → `index.html#contact-form`
- Make Payment → `https://secure.lawpay.com/pages/luna/operating` (external, new tab)
- Book Consultation (CTA button) → `index.html#contact-form`

## Rules for AI Edits
- NEVER use emojis anywhere on the site
- NEVER use heavy/impact/blocky fonts — headings are Libre Baskerville only
- NEVER add placeholder content — all copy must be real and approved
- Keep all section backgrounds using the CSS variables above (no hardcoded hex except in styles.css)
- All images reference `assets/` folder paths — do NOT base64 embed images
- Contact form uses `data-netlify="true"` — do not remove this attribute
- The `name="contact"` attribute on the form must stay for Netlify form capture
- Always update nav links in ALL pages when adding/removing nav items
- Always test mobile responsiveness — breakpoints at 860px and 600px

## Deployment
- Push to `main` branch → Netlify auto-deploys in ~30 seconds
- Staging URL: https://musical-sawine-1735c5.netlify.app/
- Production domain: hlunalaw.com (DNS not yet pointed)
- Form submissions: configure email notifications in Netlify → Site config → Forms

## Contact Form
- Form name: `contact`
- Fields: name, phone, email, message, sms-consent checkbox
- Netlify handles submissions — configure notification email in Netlify dashboard
- Thank you redirect: `/thank-you` (page not yet built)
