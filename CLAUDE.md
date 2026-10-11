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
│                       tabs, attorney bio + Super Lawyers badge, Meet Luna Law video
│                       section, criminal defense,
│                       testimonials, FAQ accordion (#faq-acc, 6 questions, no schema),
│                       CTA, Instagram live feed (Elfsight), Yelp,
│                       contact info, contact form (Netlify), footer.
│                       Contains LocalBusiness/Attorney JSON-LD.
├── about.html          About page: firm intro, intro video, team photo, team grid (5-up, .team-grid class in styles.css), why choose us,
│                       philosophy, credential badges, KidSide partnership, CTA, footer.
├── faq.html            Full FAQ page: static long-form Q&A (30 questions as <h3> + answer
│                       under category headings; no accordion) + FAQPage JSON-LD schema
│                       (the only FAQ schema on the site).
├── privacy-terms.html  SMS privacy statement and terms of service.
├── insights/           Insights hub (index.html, served at /insights/) + one HTML file per
│                       article. Pages in this folder use ROOT-RELATIVE paths (/css/, /js/,
│                       /assets/, /about.html). Each article: BlogPosting + BreadcrumbList
│                       JSON-LD, short-answer box, .ig-lite reel facade, CTA, author box.
├── thank-you.html      Post-contact thank-you page (not in sitemap).
├── 404.html            Custom 404 (Netlify serves automatically; not in sitemap).
├── _redirects          Netlify redirects — see Redirects Strategy below.
├── robots.txt          Allows all search + AI crawlers; points to sitemap.
├── sitemap.xml         8 URLs: /, /faq.html, /about.html, /privacy-terms.html, /insights/
│                       + the 3 Insights articles.
├── llms.txt            Plain-text firm summary for AI/LLM discoverability.
├── css/styles.css      ALL shared CSS (nav, footer, sections, colors, typography).
├── js/scripts.js       ALL shared JS: mobile nav drawer, FAQ accordion (index.html),
│                       practice-area tabs (NOTE: the tab panel copy lives in the
│                       `pdata` array in this file, not in HTML), scroll reveal,
│                       live ticker countdown (all pages), click-to-play YouTube facade,
│                       click-to-load Instagram reel facade (Insights pages).
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
    ├── intro-video-poster.jpg   Intro video poster (1280x720 YouTube thumbnail) for the .yt-lite facade (index + about)
    ├── insights/                Reel cover posters for the .ig-lite facade: reel-<article-slug>.jpg
    │                            (640x1138 JPEG 82, cover frame from the firm's own Instagram reel)
    ├── team.jpg                 Team photo used in og:/twitter: social meta tags
    ├── team-portraits.jpg       Team portrait image shown on about.html (five framed headshots; compressed JPEG 85%)
    └── team/                    Individual headshots (.jpg): hernan-luna, john-borgo,
                                 diego-montano, raul-uribe, ricardo-preciado, rony-vasquez
```

## Design System
**Colors (CSS variables in styles.css):**
- `--void: #07080c` primary dark background · `--deep: #0b0d14` alternating section bg
- `--surface: #10131d` card/panel · `--lift: #161a27` hover
- `--gold: #b89144` primary accent · `--gold-lt: #d4ac62` lighter gold
- `--text: #c9c3b5` body · `--muted: #6b6660` secondary · `--white: #faf8f4` headings

**Typography:** Display headings `Libre Baskerville` (serif); body/UI `Outfit` (sans); quotes/taglines only `Cormorant Garamond` (italic). Breakpoints: 860px and 600px.

**Side gutters:** `.section` has no side padding above 860px; content gets its gutter from `.section-wrap` (max 1300px, padding clamp(28px,7vw,90px)). Two homepage sections do not use `.section-wrap` — `#criminal-defense` (inline-styled inner div) and `#contact-form` — so each has a dedicated gutter rule at the end of styles.css. Any new section must use `.section-wrap` or it will run to the screen edge on laptops.

## Firm Details
- **Firm:** Luna Law, PLLC · **Phone:** 1-800-868-5862 · **Email:** info@hlunalaw.com
- **Address:** 8950 SW 74th Ct, Suite 2201 PMB A56, Miami, FL 33156
- **Hours:** Mon – Sun: 9am – 5pm · **Languages:** English, Spanish
- **WhatsApp:** 786-541-0899 (used only on Insights CTAs for now)
- **Instagram:** @hlunalaw · **YouTube:** @LunaLawMiami · **Yelp:** https://www.yelp.com/biz/lunalaw-miami

## Team
1. Hernan M. Luna, Esq. — Founding Attorney
2. John J. Borgo, Esq. — Associate Attorney (not shown on about.html; headshot exists; confirm with leadership whether to add or remove)
3. Diego Montano — Director of Legal Operations
4. Raul Uribe — Senior Litigation Paralegal
5. Ricardo Preciado — Legal Assistant
6. Rony Vasquez — Billing & Intake Specialist

## External Integrations (IDs/URLs — do not change without approval)
| Service | Detail |
|---|---|
| Netlify | Hosts site; GitHub `main` auto-deploy; serves `_redirects` and `404.html` |
| AWS Route 53 | DNS incl. Microsoft 365 email records — see DNS & Email section (NEVER touch) |
| Calendly | Booking: https://calendly.com/hernanlunalaw — primary booking path; contact form re-added 2026-09 as a third option |
| LawPay | Payments: https://secure.lawpay.com/pages/luna/operating |
| Google Analytics 4 | ID `G-KQM1N2SDG9`, gtag snippet in `<head>` of ALL pages |
| GA custom events | `book_consultation_click` (Calendly links), `make_payment_click` (LawPay links), `phone_call_click` (tel: links), `watch_live_click` (YouTube live banner), `contact_form_submit` (form submit), `youtube_click` (YouTube links + intro video play), `instagram_click` (footer Instagram icon; also reel plays and reel links on Insights pages), `whatsapp_click` (WhatsApp CTA on Insights pages) — inline `onclick="gtag('event', ...)"` handlers |
| Google Search Console | Property for hlunalaw.com; monitors indexing/404-deindexing of old spam URLs |
| Super Lawyers | Paid badge embed in index.html (external CSS+JS from superlawyers.com + profile link) — keep intact |
| KidSide | Community partner section on about.html; links to https://kidsidemiami.org/ |
| Elfsight | Instagram Feed widget on index.html, app ID d1e60766-d52d-42a1-954a-1126a149d175 (firm-owned account; trial until leadership adds payment — trial shows an Elfsight badge). Script is injected on scroll by scripts.js, NOT placed in HTML. |
| Netlify Forms | Homepage form name="contact" (fields: name, phone, email, message, sms-consent; honeypot bot-field; action /thank-you.html). Detection must be enabled in Netlify → Site configuration → Forms; notification emails configured there (owner-side). Free tier: 100 submissions/month. |
| Instagram reels | Insights articles embed the paired reel via the .ig-lite click-to-load facade (data-reel-id); the instagram.com/reel/<id>/embed/ iframe is injected on click only. Before the click the facade shows a self-hosted cover image (.ig-lite-poster, assets/insights/) — never hotlink Instagram CDN image URLs (they are signed and expire). Always keep the visible "Open this reel on Instagram" link. |
| YouTube | Channel https://www.youtube.com/@LunaLawMiami; intro video ID h54zNLlksV0 embedded via click-to-play facade (.yt-lite) on index + about; youtube-nocookie.com iframe injected on click only. The Thursday live stream ticker stays on Uno Next Latino — different channel, do not conflate. |

**GA event rule:** every Calendly, LawPay, and tel: link on every page carries its inline `onclick` gtag handler. When editing, moving, or adding any such link, the matching handler MUST be preserved/added.

## Redirects & 404 Strategy
The previous WordPress site on this domain was **hacked** and generated thousands of spam URLs. Strategy (in `_redirects`):
- Legitimate old URLs (blog, about-us, contact, practice-areas, family-law, criminal-defense, the DWI article) 301 to the closest current page.
- /blog and /blog/ 301 to /insights/ (the Insights hub).
- **Intentionally NO catch-all redirect** — every unlisted URL returns the custom 404 so spam URLs die and deindex naturally. Do not add a catch-all.

## SEO / Discoverability Maintenance
- `sitemap.xml`: contains only the 8 indexable pages (4 root pages + the Insights hub and its 3 articles). Adding a page = add a `<url>` entry with `lastmod`. Update `lastmod` on substantive content changes. thank-you.html and 404.html stay out.
- `robots.txt`: allows all crawlers including AI bots (deliberate). Leave permissive.
- `llms.txt`: keep firm facts (phone, hours, practice areas, pages) in sync with site content.
- JSON-LD: index.html has LocalBusiness/Attorney schema; faq.html has FAQPage schema — update the FAQ schema whenever FAQ content changes. index.html and about.html carry VideoObject schema for the intro video (h54zNLlksV0, uploaded 2026-09-19, PT39S). If the featured video is ever swapped, update name/description/uploadDate/duration/thumbnailUrl in BOTH pages — never guess uploadDate; read it from the YouTube watch page ('uploadDate' in page source).

## How to Make Common Changes
**Edit page text:** edit the HTML in place. If it's a practice-area tab description, edit the `pdata` array in `js/scripts.js` instead. If firm facts changed (phone/hours/address), also update: footer on all pages (6 root pages + every page in insights/), JSON-LD in index.html, llms.txt, and privacy-terms.html where referenced.

**Edit a FAQ:** FAQ content lives in two places. (1) faq.html holds the full Q&A as static markup AND the FAQPage JSON-LD in its <head> — edit both so every visible question/answer matches its schema entry exactly (currently 30 and 30). (2) index.html holds a short 6-question accordion (#faq-acc) with no schema — if an edited question also appears there, update its answer so the two pages don't contradict each other. Bump `lastmod` in sitemap.xml for whichever page(s) changed.

**Swap an image:** compress first (JPEG quality 82–85 for photos; PNG only when transparency is required; no spaces in filenames), place in `assets/`, update every referencing page, keep descriptive `alt` text, then delete the old file if truly unused (grep all HTML+CSS first).

**Add an Insights article:** copy an existing insights/*.html → update title, description, canonical, og tags, both JSON-LD blocks (BlogPosting + BreadcrumbList), h1, short answer, body, takeaways, reel data-reel-id/title/link, reel cover poster (save the reel's cover as assets/insights/reel-<slug>.jpg at 640x1138, JPEG 82, and update the .ig-lite-poster img src/alt), Keep reading links → add a card at the TOP of the insights/index.html grid AND an entry at the top of its Blog JSON-LD blogPost array (hub is newest first) → add the URL to sitemap.xml and llms.txt → cross-link from the other articles' Keep reading lists where relevant. Reel ID = the code in the instagram.com/reel/<ID>/ URL. Copy must be approved by the firm owner before push.

**Add a page:** copy structure of an existing page (about.html is the cleanest template) → link `css/styles.css` + `js/scripts.js` → include the GA gtag head snippet → add to desktop nav (`.nav-links`) AND mobile drawer on ALL existing pages → add to sitemap.xml → consider llms.txt → commit.

**Add/remove a nav item:** update `.nav-links`, the mobile drawer, and the footer links in all pages (6 root pages: index, about, faq, privacy-terms, thank-you, 404 + every page in insights/, which use root-relative hrefs). Calendly/LawPay/tel links get their GA onclick handlers.

## Nav Items (must match across all pages: 6 root pages + every page in insights/)
- Home → `index.html` · Services → `index.html#services` · Practice Areas → `index.html#practice`
- About Luna Law → `about.html` · FAQ → `faq.html`
- Insights → `insights/` (root-relative `/insights/` on pages inside insights/)
- Schedule a Consultation → Calendly (new tab, GA event)
- Make Payment → LawPay (new tab, gold text, GA event)
- Book Consultation (CTA button) → Calendly (new tab, GA event)

Laptop tier (861–1536px): compact sizing via the NAV: NO-WRAP + COMPACT LAPTOP TIER block at the end of styles.css; links never wrap. Between 861–1200px the 'Schedule a Consultation' text link is hidden because the Book Consultation CTA goes to the same Calendly page (its `<li>` carries `class="nav-schedule"` on all pages for this — keep it). Between 861–1000px the link gap is 8px and letter-spacing .04em so 7 links + CTA fit at 861px. Above 1536px the full-size nav applies. Any new nav item must be tested at 1280 and 1366px.

## Live Ticker Banner
A fixed gold "breaking news" ticker sits directly below the nav on all pages (6 root pages: index, about, faq, privacy-terms, thank-you, 404 + every page in insights/), scrolling right-to-left continuously. It links to https://www.youtube.com/@UnoNextLatino (new tab, GA event `watch_live_click`) and shows a live countdown to the next Thursday 12:00 PM America/New_York (EST/EDT handled automatically). During Thursday 12:00–12:59 PM ET it switches to a red LIVE NOW state. Styles live in the `LIVE TICKER BANNER` block at the end of `css/styles.css`; countdown/live-state logic lives in the `Live ticker countdown` block at the end of `js/scripts.js`. **Editing rule:** any new page must include the ticker markup (right after `</header>`, before `<main>`) — the site-wide `body{padding-top:102px}` (98px at ≤600px) reserves space for the fixed nav (68px) + ticker (34px / 30px mobile) and depends on every page having it.

## Contact Form
Netlify handles submissions with no backend. Keep `data-netlify="true"`, `netlify-honeypot="bot-field"`, the hidden `form-name` input, and `name="contact"` — removing any breaks capture. The SMS consent checkbox exists because privacy-terms.html carries the SMS Privacy Statement; keep them in sync. Spam: honeypot + Netlify's built-in filtering; if spam rises, add `data-netlify-recaptcha="true"` + `<div data-netlify-recaptcha="true"></div>`. Layout quirk: the `#contact-form` section has no `.section-wrap` (`.contact-form-grid` and `#message-form` sit directly in it), so its side gutter above 860px comes from an `#contact-form` padding rule in the CONTACT MESSAGE FORM block of styles.css that mirrors `.section-wrap`'s `clamp(28px,7vw,90px)`.

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
- Third-party widget scripts (Elfsight) load on scroll via scripts.js — never add their <script> tags directly to the HTML.
- Video embeds use the .yt-lite click-to-play facade (data-video-id) — never place a raw YouTube <iframe> in HTML.
- Instagram reel embeds use the .ig-lite facade (data-reel-id) — never place a raw Instagram iframe or embed.js script in HTML.
- Pages inside subfolders (insights/) use root-relative paths and must be tested over HTTP, not file://.

## End-of-Task Report (required)
Every executor task ends with a local commit (no push), then this report, then WAITING for the owner's go-ahead:

1. **What was changed** — plain-language list of every change, file by file.
2. **Why it was changed** — the reason for each change, in terms the firm owner understands.
3. **What to test after it's live** — specific pages/elements on https://hlunalaw.com to check once deployed (which URLs to open, what should look/behave correctly, on desktop and mobile).

Then say: "Reply 'push' to deploy." When the owner approves, run `git push origin main` and confirm the deploy (~30 seconds to go live).

## Future CMS Direction
Leadership eventually wants a lite CMS: non-technical firm leadership logging in to edit designated content and file change tickets to the site manager. Approach is **under evaluation** (see ARCHITECTURE.md open decisions). Until then, keep this content/structure split clean so the editable content stays extractable:

**Leadership-editable-someday (content):** FAQ questions/answers (faq.html markup + its FAQPage JSON-LD, and the index.html #faq-acc accordion), team member names/titles/bios (about.html), business hours and phone (footer on all pages + JSON-LD + llms.txt), testimonials (index.html), announcement-style copy, practice-area tab text (`pdata` in scripts.js — a candidate to move back into data if a CMS lands), Insights article copy (insights/*.html body text, short answer, takeaways) and the hub cards.

**Structural (AI/site-manager only):** page layout and sections, nav, styles.css, scripts.js behaviors, GA snippets and event handlers, _redirects, robots/sitemap/llms.txt plumbing, JSON-LD structure, integration embeds (Super Lawyers, Calendly/LawPay URLs), DNS.

When making changes, avoid entangling the editable content above with structural markup more than it already is.

## Deployment
AI sessions commit to `main` locally, print the End-of-Task Report, and hold. On the owner's approval they run `git push origin main` → Netlify auto-deploys (~30s) → owner verifies on https://hlunalaw.com using the report's test checklist. DNS already points to Netlify; the old staging URL still works but is not shared publicly.
