# Requests for Next Session

This is the checklist to continue optimizing `ivanrene.com` for hiring + managed outsourcing conversion.

## 1) Analytics setup (required)

Choose one primary provider:

- PostHog (recommended for events + funnels + session replay)
- Plausible (simple and privacy-friendly)

Optional companion:

- Cloudflare Web Analytics

What to share:

- `POSTHOG_KEY` (if using PostHog)
- analytics project URL / workspace
- allowed domain list includes `ivanrene.com`

## 2) Lead capture backend (required)

Recommended stack:

- Cloudflare Worker for API endpoint
- Resend (or SendGrid) for email delivery

What to share:

- `RESEND_API_KEY` (or provider equivalent)
- destination inbox (e.g. `ivanrene10@gmail.com`)
- verified sender email (e.g. `hello@ivanrene.com`)

## 3) Conversion tracking events (required)

We will instrument these events:

- `cta_hire_click`
- `cta_outsourcing_click`
- `form_submit_success`
- `case_study_click`
- `outbound_project_click`

## 4) Business inputs for better copy (required)

Please send:

- target average ticket size
- ideal client profile (startup / SMB / enterprise)
- priority offer (employment vs outsourcing vs fractional CTO)
- 3 measurable outcomes/case results (can be approximate)
- target countries/regions

## 5) Optional but high impact

- Calendly or Cal.com link
- LinkedIn Insight Tag ID
- 2 client testimonials

## 6) Access/tooling

Useful to have:

- Cloudflare MCP access (recommended)
- confirmation we can purge cache when needed

With this information, next iteration will include:

- production lead form with validation
- event instrumentation and funnel tracking
- conversion-focused CTA and copy tuning by audience
- dashboard-ready event naming for weekly optimization
