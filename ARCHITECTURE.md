# ARCHITECTURE.md — Luna Law Website Decision Log

Dated record of major technical decisions. Append new entries at the top of the Decisions section; never rewrite history. Format: date, decision, reason.

## Open Decisions

### CMS approach — under evaluation
Leadership wants a lite CMS: firm leadership logging in to edit designated content (FAQ answers, team bios, hours, announcements) and create change tickets for the site manager. Options under evaluation: ticket-only workflow, git-based CMS (Decap/Pages CMS) on the existing GitHub→Netlify pipeline, or a custom lite CMS. Security posture is a first-class concern given the previous WordPress site on this domain was compromised. No implementation is planned until the approach is decided. CLAUDE.md's "Future CMS Direction" section defines which content must stay cleanly separable.

## Decisions

### 2026-09-11 — YouTube live-stream ticker banner
**Decision:** Site-wide fixed news-ticker banner below the nav promoting the weekly Thursday 12 PM ET YouTube live stream (Uno Next Latino channel), with live countdown, LIVE NOW state during the noon hour, brand-gold styling (not literal yellow), GA event watch_live_click.
**Reason:** The attorney appears weekly on a local channel's YouTube live stream; a persistent but subtle broadcast-style ticker converts site visitors into stream viewers. Gold over taxi-yellow keeps the firm's premium look; countdown targets America/New_York so EST/EDT are always correct.

### 2026-09-11 — PageSpeed optimization pass (LCP, fonts, lazy-loading, ARIA)
**Decision:** Preload + fetchpriority on the index hero with an 860px mobile variant; Google Fonts made non-blocking with preconnect to fonts.gstatic.com; all below-fold images lazy-loaded with explicit dimensions; practice-areas tablist <li> elements marked role="presentation".
**Reason:** PageSpeed Insights (2026-09-11) scored mobile performance 63 with LCP 13.5s driven by the unprioritized oversized hero, ~1,350ms of render-blocking font CSS, and accessibility 80–83 from a malformed tablist ARIA tree. These are structural fixes with no visual change. Deliberately NOT addressed: third-party unused JS (GA + Super Lawyers, protected integrations) and the muted-text contrast flag (brand color change requiring owner/leadership approval).

### 2026-09-11 — Owner-approved deploys with end-of-task reports
**Decision:** Executor sessions commit locally, then stop and print a report (what changed, why, what to test once live) and wait. The executor pushes only after the owner approves in chat; the push triggers the Netlify deploy.
**Reason:** Pushing to `main` deploys to the live site in ~30 seconds with no other gate. Holding for approval gives the owner a review checkpoint before anything reaches clients, without requiring the owner to run git commands.

### 2026-09-11 — Documentation as system of record
**Decision:** CLAUDE.md rewritten as the single authoritative project document; this decision log created.
**Reason:** The site has no CMS and is maintained solely via AI planner/executor sessions with a human site manager copying plans between them. Stale docs directly cause wrong edits, so every change plan must end with a docs update.

### 2026-09 — Image compression standards
**Decision:** Photos are JPEG at quality 82–85; PNG only where transparency is required (logos, cutouts, badges); no spaces in filenames.
**Reason:** Keep page weight low on a Netlify static site without a build pipeline to do it automatically. (Known outstanding: assets/hernan-hero.png ~1.8MB and assets/team-updated-v2.png ~2.3MB exceed the standard.)

### 2026-08 — Spam-URL 404 strategy for the old hacked WordPress site
**Decision:** `_redirects` 301s only a whitelist of legitimate old WordPress URLs to current pages; everything else intentionally 404s via custom 404.html. No catch-all redirect.
**Reason:** The previous WordPress site on hlunalaw.com was hacked and had thousands of indexed spam URLs. Redirecting everything would pass spam traffic/equity to real pages; letting unlisted URLs 404 makes Google deindex them naturally, monitored in Search Console.

### 2026-08 — Google Analytics 4 with inline conversion events
**Decision:** GA4 (G-KQM1N2SDG9) on all pages, with inline onclick gtag events on every conversion link: book_consultation_click, make_payment_click, phone_call_click.
**Reason:** The site's conversions are outbound (Calendly, LawPay, phone), invisible to pageview-only analytics. Inline handlers need no extra JS wiring and survive as long as editors preserve them (rule recorded in CLAUDE.md).

### 2026-07 — Contact form removed in favor of Calendly + phone
**Decision:** The Netlify contact form was removed. Booking runs through Calendly (calendly.com/hernanlunalaw); urgent contact via 1-800-868-5862.
**Reason:** Calendly books consultations directly into the attorney's calendar, eliminates form-spam and the notification-routing step, and gives a better conversion path than "we'll call you back." thank-you.html is retained.

### 2026-06 — Shared css/js/assets refactor
**Decision:** All CSS in css/styles.css, all behavior in js/scripts.js, all media in assets/ — no per-page styles/scripts beyond inline style attributes.
**Reason:** With multiple pages sharing nav, footer, and design system, one shared file per concern keeps pages consistent and makes AI edits predictable (one place to change a color or behavior).

### 2026-05 — Static hand-written HTML over CMS/framework
**Decision:** Rebuild as plain static HTML/CSS/JS on Netlify, replacing WordPress. No CMS, no build step, no framework.
**Reason:** The WordPress site was hacked — the largest risk to a small firm site is a server-side attack surface with plugins and a database. Static files have essentially zero attack surface, cost nothing on Netlify, deploy in seconds from GitHub, and a ~6-page brochure site with AI-driven maintenance doesn't need templating.
