# PinkPath: Breast Health Screening Companion

A privacy-conscious web app for Breast Cancer Awareness Month that helps people keep track of screening reminders, log symptoms privately, and prepare for doctor appointments.

**Stack:** React · Tailwind CSS · FastAPI · PostgreSQL
**Target:** Ship a live, working MVP by **October 31, 2026**
**Status:** Planning

---

## 1. Goals

- Build something genuinely useful that real people can use before the end of October.
- Make it portfolio-ready: live link, clean README, tests, accessibility, and a privacy decision log.
- Practice full-stack skills end to end: auth, relational data modeling, REST API design, responsive UI, deployment.

## 2. Non-goals (important)

- No diagnosis, no "risk percentage," no medical advice.
- No machine learning in this version.
- No claim of end-to-end privacy until it is actually true (see Future Work).

---

## 3. MVP Features

1. **Onboarding:** age, country, and a few optional questions. Produces an *informational* screening schedule with cited sources.
2. **Reminders:** monthly self-exam reminders and mammogram dates.
3. **Private journal:** symptom entries with date, notes, and optional body-location tag.
4. **Appointment prep:** a generated "questions to ask my doctor" list and a one-page printable summary.
5. **Learn page:** plain-language education with links to trusted sources.

---

## 4. Architecture Decision: Where does data live?

| | Option A (building now) | Option B (future) |
|---|---|---|
| Storage | Accounts and Postgres hold everything | Journal encrypted in the browser; server stores ciphertext only |
| Privacy claim | "We store the minimum and you can erase it" | "The server cannot read your journal" |
| Difficulty | Moderate | Higher (Web Crypto API, key derivation, recovery trade-offs) |

**Decision:** Build Option A first. Upgrade the journal to Option B once the Web Crypto concepts are learned.

**Option A privacy basics:** HTTPS everywhere, hashed passwords, minimal data collected, a "delete my account and all data" button, no third-party trackers.

---

## 5. Data Model (tables)

- **users:** id, email, password hash, created_at
- **profiles:** user_id, age or date of birth, country, optional risk-related answers
- **reminders:** id, user_id, type (self-exam or mammogram), next_due_date, repeat interval, active
- **journal_entries:** id, user_id, entry_date, notes, body_location (optional), created_at
- **guideline_rules:** id, country or region, organization, min_age, max_age, interval, notes, **source_url**, **last_reviewed**

Design note: keep screening guidelines as **data in `guideline_rules`**, not hardcoded logic. Each rule carries its citation, which makes the app auditable and easy to update.

## 6. API Outline (by resource)

- **Auth:** register, login, current user
- **Profile:** get, update
- **Reminders:** list, create, update, delete
- **Journal:** list, create, update, delete
- **Guidelines:** read-only lookup by country and age
- **Account:** delete account and all data

All user-owned resources must be scoped to the logged-in user.

---

## 7. Timeline

### Week 1 (Oct 15–22): Backend and data
- [ ] Project structure, config, and database connection
- [ ] Alembic migrations (add to requirements)
- [ ] Models and schemas for all tables
- [ ] JWT auth and a current-user dependency
- [ ] CRUD endpoints for profile, reminders, journal
- [ ] Seed `guideline_rules` with cited, verified data
- [ ] Pytest: auth flow, CRUD, and "user A can never read user B's data"

### Week 2 (Oct 22–29): Frontend
- [ ] Vite + React + Tailwind setup, routing, API client
- [ ] Auth pages and protected routes
- [ ] Onboarding flow
- [ ] Dashboard (next reminder, latest journal entry)
- [ ] Journal page (list, add, edit, delete)
- [ ] Appointment prep page with printable summary
- [ ] Learn page
- [ ] Mobile-first layout and accessibility pass (labels, focus, contrast, keyboard)

### Final days (Oct 29–31): Ship
- [ ] Deploy frontend (Vercel or Netlify) and API plus Postgres (Render, Railway, or Fly)
- [ ] README with screenshots, architecture diagram, and setup steps
- [ ] Privacy decision log
- [ ] 60-second demo video
- [ ] Lighthouse run and fixes
- [ ] 3–5 testers, with feedback recorded

---

## 8. Medical Content Guardrails

- Screening guidelines differ by country and organization (for example the USPSTF, the American Cancer Society, and the NHS). **Verify every rule at its original source before adding it.**
- Store each rule with its source URL and last-reviewed date.
- Show a "Not medical advice" notice wherever guidance appears.
- Always include: "See a clinician for any new lump or change."
- Never present a personal risk score.
- Consider having a clinician or a women's health organization review the content before launch.

## 9. Quality Checklist

- [ ] Automated tests for auth and data isolation
- [ ] Passwords hashed, secrets in environment variables, none committed
- [ ] CORS restricted to the real frontend origin
- [ ] Input validation on every endpoint
- [ ] Lighthouse accessibility score of 90 or higher
- [ ] Works on a small phone screen
- [ ] Account deletion actually removes the data

---

## 10. Future Work

- **Option B:** client-side encrypted journal (Web Crypto API), server stores ciphertext only
- Email or push notification reminders (background jobs)
- PWA and offline support
- Translations (Spanish, French, and others)
- Export my data (PDF or JSON)

## 11. Resume Talking Points

- Designed a relational schema and secured REST API with JWT auth and per-user data isolation
- Modeled medical guidelines as cited, auditable data instead of hardcoded logic
- Wrote a privacy decision log and made deliberate trade-offs about sensitive health data
- Built a mobile-first, accessible UI and tested it with real users
- Deployed to production with a live demo

## 12. Learning Resources to Look Up

- FastAPI docs: security (OAuth2 with JWT) and SQL databases
- SQLAlchemy 2.0 ORM quickstart
- Alembic tutorial
- React Router, React Query, React Hook Form
- WCAG basics and the Lighthouse accessibility audit
- Later: MDN Web Crypto API (SubtleCrypto)