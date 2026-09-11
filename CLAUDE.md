# Luna Law, PLLC — Website Project

## Project Overview
Static hand-written HTML website for Luna Law, PLLC — a South Florida divorce, family law, and criminal defense firm. No CMS, no build step, no framework. The site is maintained exclusively through AI planner/executor sessions; **this file is the single source of truth for how the site works.** Keep it current: every change plan must end with a documentation update step, and major decisions get a dated entry in ARCHITECTURE.md.

- **Live domain:** https://hlunalaw.com
- **Repo:** System2t/luna-law-website (GitHub)
- **Hosting:** Netlify — every push to `main` auto-deploys in ~30 seconds
- **Netlify staging URL:** https://musical-sawine-1735c5.netlify.app/

## DNS & Email — CRITICAL
DNS is hosted on **AWS Route 53**. The zone also contains **Microsoft 365 email records (MX, SPF/TXT, CNAME autodiscover, DKIM)** for @hlunalaw.com mail.
**NEVER modify, plan, or suggest changes to any DNS record other than the site's A/ALIAS/CNAME web records — and even those only with explicit owner approval. Breaking these records takes down the firm's email.**

## File Inventory
```
├── index.html          Homepage: hero, credentials, services, process, practice-area
│                       tabs, attorney bio + Super Lawyers badge, criminal defense,
│                       testimonials, CTA, Instagram, Yelp, contact info, footer.
│                       Contains LocalBusiness/Attorney JSON-LD.
├── about.html          About page: firm intro, team photo, team grid, why choose us,
│                       philosophy, credential badges, KidSide partnership, CTA, footer.
├── faq.html            Full FAQ page: accordion (#faq-acc) + FAQ JSON-LD schema.
├── privacy-terms.html  SMS privacy statement and terms of service.
├── thank-you.html      Post-contact thank-you page (not in sitemap).
├── 404.html            Custom 404 (Netlify serves automatically; not in sitemap).
├── _redirects          Netlify redirects — see Redirects Strategy below.
├── robots.txt          Allows all search + AI crawlers; points to sitemap.
├── sitemap.xml         4 URLs: /, /faq.html, /about.html, /privacy-terms.html.
├── llms.txt            Plain-text firm summary for AI/LLM discoverability.
├── css/styles.css      ALL shared CSS (nav, footer, sections, colors, typography).
├── js/scripts.js       ALL shared JS: mobile nav drawer, FAQ accordion (faq.html),
│                       practice-area tabs (NOTE: the tab panel copy lives in the
│                       `pdata` array in this file, not in HTML), scroll reveal,
│                       live ticker countdown (all pages).
└── assets/
    ├── logo.png                 White "LunaLaw, pllc." logo (nav + footer, all pages)
    ├── hernan-hero.jpg          Hernan hero cutout, index hero desktop (compressed JPEG 85%)
    ├── hernan-hero-mobile.jpg   Hernan hero cutout, index hero mobile variant (~860w, JPEG 85%)
    ├── hernan-portrait.jpeg     Hernan portrait, index attorney-bio section
    ├── hero.jpg                 Hero background photo
    ├── sig.png                  Hernan Luna signature watermark (used on all pages)
    ├── badge-family.png         Florida Bar Family Law Section badge
    ├── badge-criminal.png       Florida Bar Criminal Law Section badge
    ├── kidside-logo-02.svg      KidSide logo (about.html partnership section)
    ├── team.jpg                 Team photo used in og:/twitter: social meta tags
    ├── team-updated-v2.jpg      Current team photo shown on about.html (compressed JPEG 85%)
    └── team/                    Individual headshots (.jpg): hernan-luna, john-borgo,
                                 diego-montano, raul-uribe, rony-vasquez
```

## Design System
**Colors (CSS variables in styles.css):**
- `--void: #07080c` primary dark background · `--deep: #0b0d14` alternating section bg
- `--surface: #10131d` card/panel · `--lift: #161a27` hover
- `--gold: #b89144` primary accent · `--gold-lt: #d4ac62` lighter gold
- `--text: #c9c3b5` body · `--muted: #6b6660` secondary · `--white: #faf8f4` headings

**Typography:** Display headings `Libre Baskerville` (serif); body/UI `Outfit` (sans); quotes/taglines only `Cormorant Garamond` (italic). Breakpoints: 860px and 600px.

## Firm Details
- **Firm:** Luna Law, PLLC · **Phone:** 1-800-868-5862 · **Email:** info@hlunalaw.com
- **Address:** 8950 SW 74th Ct, Suite 2201 PMB A56, Miami, FL 33156
- **Hours:** Mon – Sun: 9am – 5pm · **Languages:** English, Spanish
- **Instagram:** @hlunalaw · **Yelp:** https://www.yelp.com/biz/lunalaw-miami

## Team
1. Hernan M. Luna, Esq. — Founding Attorney
2. John J. Borgo, Esq. — Associate Attorney
3. Diego Montano — Legal Team Member
4. Raul Uribe — Legal Assistant
5. Rony Vasquez — Billing & Intake Specialist

Note: John J. Borgo is not currently shown on about.html (his headshot exists at assets/team/john-borgo.jpg). Confirm with firm leadership whether to add him or remove him from this roster.

## External Integrations (IDs/URLs — do not change without approval)
| Service | Detail |
|---|---|
| Netlify | Hosts site; GitHub `main` auto-deploy; serves `_redirects` and `404.html` |
| AWS Route 53 | DNS incl. Microsoft 365 email records — see DNS & Email section (NEVER touch) |
| Calendly | Booking: https://calendly.com/hernanlunalaw — this replaced the old contact form |
| LawPay | Payments: https://secure.lawpay.com/pages/luna/operating |
| Google Analytics 4 | ID `G-KQM1N2SDG9`, gtag snippet in `<head>` of ALL pages |
| GA custom events | `book_consultation_click` (Calendly links), `make_payment_click` (LawPay links), `phone_call_click` (tel: links), `watch_live_click` (YouTube live banner) — inline `onclick="gtag('event', ...)"` handlers |
| Google Search Console | Property for hlunalaw.com; monitors indexing/404-deindexing of old spam URLs |
| Super Lawyers | Paid badge embed in index.html (external CSS+JS from superlawyers.com + profile link) — keep intact |
| KidSide | Community partner section on about.html; links to https://kidsidemiami.org/ |

**GA event rule:** every Calendly, LawPay, and tel: link on every page carries its inline `onclick` gtag handler. When editing, moving, or adding any such link, the matching handler MUST be preserved/added.

## Redirects & 404 Strategy
The previous WordPress site on this domain was **hacked** and generated thousands of spam URLs. Strategy (in `_redirects`):
- Legitimate old URLs (blog, about-us, contact, practice-areas, family-law, criminal-defense, the DWI article) 301 to the closest current page.
- **Intentionally NO catch-all redirect** — every unlisted URL returns the custom 404 so spam URLs die and deindex naturally. Do not add a catch-all.

## SEO / Discoverability Maintenance
- `sitemap.xml`: contains only the 4 indexable pages. Adding a page = add a `<url>` entry with `lastmod`. Update `lastmod` on substantive content changes. thank-you.html and 404.html stay out.
- `robots.txt`: allows all crawlers including AI bots (deliberate). Leave permissive.
- `llms.txt`: keep firm facts (phone, hours, practice areas, pages) in sync with site content.
- JSON-LD: index.html has LocalBusiness/Attorney schema; faq.html has FAQPage schema — update the FAQ schema whenever FAQ content changes.

## How to Make Common Changes
**Edit page text:** edit the HTML in place. If it's a practice-area tab description, edit the `pdata` array in `js/scripts.js` instead. If firm facts changed (phone/hours/address), also update: footer on ALL 6 pages, JSON-LD in index.html, llms.txt, and privacy-terms.html where referenced.

**Edit a FAQ:** edit both the accordion markup in faq.html AND the FAQPage JSON-LD in faq.html so they match. Bump faq.html `lastmod` in sitemap.xml.

**Swap an image:** compress first (JPEG quality 82–85 for photos; PNG only when transparency is required; no spaces in filenames), place in `assets/`, update every referencing page, keep descriptive `alt` text, then delete the old file if truly unused (grep all HTML+CSS first).

**Add a page:** copy structure of an existing page (about.html is the cleanest template) → link `css/styles.css` + `js/scripts.js` → include the GA gtag head snippet → add to desktop nav (`.nav-links`) AND mobile drawer on ALL existing pages → add to sitemap.xml → consider llms.txt → commit.

**Add/remove a nav item:** update `.nav-links` and the mobile drawer in all 6 HTML files (index, about, faq, privacy-terms, thank-you, 404). Calendly/LawPay/tel links get their GA onclick handlers.

## Nav Items (must match across ALL 6 pages)
- Home → `index.html` · Services → `index.html#services` · Practice Areas → `index.html#practice`
- About Luna Law → `about.html` · FAQ → `faq.html`
- Schedule a Consultation → Calendly (new tab, GA event)
- Make Payment → LawPay (new tab, gold text, GA event)
- Book Consultation (CTA button) → Calendly (new tab, GA event)

## Live Ticker Banner
A fixed gold "breaking news" ticker sits directly below the nav on all 6 pages (index, about, faq, privacy-terms, thank-you, 404), scrolling right-to-left continuously. It links to https://www.youtube.com/@UnoNextLatino (new tab, GA event `watch_live_click`) and shows a live countdown to the next Thursday 12:00 PM America/New_York (EST/EDT handled automatically). During Thursday 12:00–12:59 PM ET it switches to a red LIVE NOW state. Styles live in the `LIVE TICKER BANNER` block at the end of `css/styles.css`; countdown/live-state logic lives in the `Live ticker countdown` block at the end of `js/scripts.js`. **Editing rule:** any new page must include the ticker markup (right after `</header>`, before `<main>`) — the site-wide `body{padding-top:102px}` (98px at ≤600px) reserves space for the fixed nav (68px) + ticker (34px / 30px mobile) and depends on every page having it.

## Rules for AI Edits
- NEVER push without approval. After committing, STOP, print the End-of-Task Report, and wait. Only run `git push origin main` after the owner replies with approval (e.g. "push", "deploy", "go live"). Pushing deploys the live site.
- End every task with the End-of-Task Report (see section below).
- NEVER use emojis anywhere on the site.
- NEVER use heavy/impact/blocky fonts — headings are Libre Baskerville only.
- NEVER add placeholder content — all copy must be real and approved.
- Use the CSS color variables; no hardcoded hex outside styles.css.
- Images live in `assets/`; never base64-embed.
- Preserve all GA `onclick` gtag handlers when touching links (see GA event rule).
- Never remove the Super Lawyers embed assets or alter its script/CSS URLs.
- Never add a catch-all redirect to `_redirects`.
- Always test mobile responsiveness — breakpoints at 860px and 600px.
- Every change plan ends with updating this file (and ARCHITECTURE.md for decisions).
- All images below the fold get loading="lazy" decoding="async" and explicit width/height attributes; the index hero image keeps fetchpriority="high" and its preload links. Google Fonts loads via the non-blocking media="print" onload pattern — preserve it when editing <head>.

## End-of-Task Report (required)
Every executor task ends with a local commit (no push), then this report, then WAITING for the owner's go-ahead:

1. **What was changed** — plain-language list of every change, file by file.
2. **Why it was changed** — the reason for each change, in terms the firm owner understands.
3. **What to test after it's live** — specific pages/elements on https://hlunalaw.com to check once deployed (which URLs to open, what should look/behave correctly, on desktop and mobile).

Then say: "Reply 'push' to deploy." When the owner approves, run `git push origin main` and confirm the deploy (~30 seconds to go live).

## Future CMS Direction
Leadership eventually wants a lite CMS: non-technical firm leadership logging in to edit designated content and file change tickets to the site manager. Approach is **under evaluation** (see ARCHITECTURE.md open decisions). Until then, keep this content/structure split clean so the editable content stays extractable:

**Leadership-editable-someday (content):** FAQ questions/answers (faq.html markup + its JSON-LD), team member names/titles/bios (about.html), business hours and phone (footer on all pages + JSON-LD + llms.txt), testimonials (index.html), announcement-style copy, practice-area tab text (`pdata` in scripts.js — a candidate to move back into data if a CMS lands).

**Structural (AI/site-manager only):** page layout and sections, nav, styles.css, scripts.js behaviors, GA snippets and event handlers, _redirects, robots/sitemap/llms.txt plumbing, JSON-LD structure, integration embeds (Super Lawyers, Calendly/LawPay URLs), DNS.

When making changes, avoid entangling the editable content above with structural markup more than it already is.

## Deployment
AI sessions commit to `main` locally, print the End-of-Task Report, and hold. On the owner's approval they run `git push origin main` → Netlify auto-deploys (~30s) → owner verifies on https://hlunalaw.com using the report's test checklist. DNS already points to Netlify; the old staging URL still works but is not shared publicly.
