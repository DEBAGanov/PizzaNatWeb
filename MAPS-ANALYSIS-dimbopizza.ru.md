# Maps Intelligence Analysis — ДИМБО Пицца (dimbopizza.ru)

**Date:** 2026-06-26
**Business:** ДИМБО Пицца — pizzeria, Волжск, Марий Эл, Россия
**Capability tier:** **Tier 0 (Free)** — DataForSEO MCP not detected.

> **Tier 0 means:** competitor discovery (Overpass/OSM), geocoding (Nominatim), static
> GBP checklist, NAP guidance, and schema generation are available.
> **NOT available:** geo-grid rank tracking (SoLV), live GBP profile audit, and review
> velocity/sentiment intelligence — these require the DataForSEO extension.

> **⚠️ Russia-market caveat (overrides the skill's default platform set):** In Волжск,
> the maps platforms that actually drive foot traffic and orders are **Yandex Maps (Яндекс
> Карты / Яндекс Бизнес) and 2GIS** — not Google/Bing/Apple Maps, which have marginal usage
> in Russia. This skill's APIs (Overpass/Nominatim/Bing) cannot read Yandex/2GIS listings, so
> those must be verified manually. Treat Yandex Business + 2GIS as your **#1 maps priority**,
> above everything Google-related below.

---

## 1. Maps Health Score: 34 / 100

| Dimension | Score | Notes |
|---|---|---|
| Geo accuracy | 0 / 20 | **Coordinates wrong by ~42 km** (point to another district) |
| OSM / open-data presence | 2 / 15 | Business **not listed** in OpenStreetMap |
| Yandex / 2GIS presence | ? / 20 | Not assessable at Tier 0 — verify manually (likely the real gap) |
| NAP completeness & consistency | 12 / 15 | NAP present in schema; phone single-source; no public email |
| Schema / structured data | 8 / 15 | Restaurant JSON-LD exists but carries the bad geo |
| Review intelligence | ? / 15 | Requires DataForSEO; no on-page review widget detected |

Score reflects assessable dimensions only; "?" rows are excluded from the normalized base.

---

## 2. NAP (Name / Address / Phone) — extracted from source

| Field | Value | Source |
|---|---|---|
| Name | **ДИМБО Пицца** | site title, schemaOrg.ts |
| Address | **ул. Шестакова, д. 1Б, Волжск, Республика Марий Эл, 425000** | schemaOrg.ts |
| Phone | **+7 (902) 105-34-34** | schemaOrg.ts |
| Price range | $$ | schemaOrg.ts |
| Email | — (not found) | — |
| Geo (claimed) | 56.1194, 47.8681 ❌ | index.html meta + schemaOrg.ts |
| Geo (correct) | **≈ 55.875, 48.344** ✅ | Nominatim geocode of the street |

---

## 3. 🔴 CRITICAL — Geo coordinate mismatch (~42 km off)

The coordinates hard-coded in **both** `index.html` (`<meta name="geo.position" content="56.1194;47.8681">`)
and `src/utils/schemaOrg.ts` (`geo.latitude/longitude`) do **not** point to the business.

| | Latitude | Longitude | Reverse-geocodes to |
|---|---|---|---|
| Claimed (in code) | 56.1194 | 47.8681 | **Кокшайское сельское поселение, Звениговский р-н** (~42 km NW) |
| Actual street (ул. Шестакова, Волжск) | ~55.875 | ~48.344 | Волжск, городской округ Волжск |

**Impact:** every map/geo consumer that reads your structured data (search engines, rich
results, any "find on map" feature, aggregators that scrape JSON-LD) is told the pizzeria sits
in a rural settlement 42 km away. For a delivery-radius local business this is the single most
damaging on-page signal possible. **Fix this first.**

**Files to change:**
- `index.html` → `geo.position` content to `55.875;48.344` (replace with surveyed lat/lng of д.1Б)
- `src/utils/schemaOrg.ts` → both `geo` blocks (Restaurant + LocalBusiness) → `latitude: 55.875, longitude: 48.344`

> Get the exact rooftop point from Yandex Maps (right-click → "Что здесь?") for ул. Шестакова 1Б
> rather than using the street-center estimate above.

---

## 4. Cross-platform presence

| Platform | Status | Notes |
|---|---|---|
| **OpenStreetMap** | ❌ **Not listed** | Nominatim search for "ДИМБО пицца Волжск" returns nothing; not in 6 km Overpass food set |
| **Yandex Maps / Бизнес** | ⚠️ Unknown (Tier 0) | **Highest-priority manual check** — dominant platform in RU |
| **2GIS** | ⚠️ Unknown (Tier 0) | Second-priority manual check; strong in regional RU cities |
| **Google Business Profile** | ⚠️ Unknown (Tier 0) | Low usage in RU but still feeds AI answers; `yandex-verification` present, no Google verification in `index.html` |
| **Bing Places** | ➖ Low relevance | Negligible RU traffic |
| **Apple Maps** | ➖ Low relevance | Negligible RU traffic; Apple Business Connect if desired |

**Action:** add ДИМБО Пицца to OpenStreetMap (free, feeds many downstream apps) and — critically —
claim/verify **Yandex Бизнес** and **2GIS** profiles.

---

## 5. Competitor landscape (Overpass / OSM, ~6 km radius of Волжск center)

18 named food POIs found; 4 pizza-related. (OSM under-represents RU businesses — treat as a floor, not a census.)

| Competitor | Type | Cuisine | Phone | Website |
|---|---|---|---|---|
| **Додо Пицца** | fast_food | pizza | +7 800 302-00-60 | dodopizza.ru |
| Модерниссимо | cafe | pizza | — | — |
| Шаурма-пицца | fast_food | pizza; shawarma | — | — |
| Pizza house | fast_food | — | — | — |

Your homepage positioning ("Вкуснее Додо, дешевле конкурентов") directly targets **Додо Пицца**,
the only competitor here with a claimed listing + national brand. Note: ДИМБО is the **only** one
of these with NO OSM presence — Додо is mapped, you are not. That asymmetry costs you in every
"pizza near me / пицца Волжск" map surface.

---

## 6. GBP / listing completeness checklist (Tier 0 static)

| Field | State | Note |
|---|---|---|
| Business name | ✅ | ДИМБО Пицца |
| Address | ✅ | present, but pin geo is wrong (§3) |
| Phone | ✅ | single number |
| Category | ✅ | Restaurant/Pizza (schema) |
| Hours | ✅ | openingHours defined in schema |
| Website | ✅ | dimbopizza.ru |
| Geo pin accuracy | ❌ | 42 km off |
| Photos | ❓ | Unknown (requires live GBP/Yandex data) |
| Reviews / rating | ❓ | No on-page widget; requires DataForSEO |
| Email | ❌ | none published |
| Google verification | ❌ | none in `index.html` (Yandex verification present) |

---

## 7. Schema recommendation — corrected Restaurant JSON-LD

Drop-in replacement (correct the geo to the surveyed rooftop point before shipping):

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "ДИМБО Пицца",
  "servesCuisine": "Пицца",
  "image": "https://dimbopizza.ru/og-image.jpg",
  "url": "https://dimbopizza.ru",
  "telephone": "+7-902-105-34-34",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ул. Шестакова, д. 1Б",
    "addressLocality": "Волжск",
    "addressRegion": "Республика Марий Эл",
    "postalCode": "425000",
    "addressCountry": "RU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 55.875,
    "longitude": 48.344
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "10:00",
      "closes": "22:00"
    }
  ],
  "sameAs": [
    "https://vk.com/<your-vk>",
    "https://t.me/<your-tg>",
    "https://yandex.ru/maps/org/<your-yandex-org-id>"
  ]
}
```

> Do **not** add self-authored `aggregateRating`/`review` markup — Google ignores first-party
> review markup. Surface ratings via your Yandex/2GIS listings instead.
> Adjust `opens`/`closes`/`dayOfWeek` to match the real `openingHours` array in `schemaOrg.ts`.

---

## 8. Top 10 prioritized actions

| # | Pri | Action |
|---|---|---|
| 1 | 🔴 Critical | Fix geo coordinates in `index.html` **and** both blocks of `src/utils/schemaOrg.ts` → ≈55.875, 48.344 (use surveyed rooftop point) |
| 2 | 🔴 Critical | Claim & verify **Yandex Бизнес** listing — the #1 maps platform for Волжск |
| 3 | 🔴 Critical | Claim & verify **2GIS** listing |
| 4 | 🟠 High | Add ДИМБО Пицца to **OpenStreetMap** (correct pin + amenity=fast_food, cuisine=pizza) |
| 5 | 🟠 High | Add `sameAs` links (VK, Telegram, Yandex org page) to schema for entity consolidation |
| 6 | 🟠 High | Add a published **email** + confirm a single canonical phone across all platforms |
| 7 | 🟡 Medium | Build a review pipeline on Yandex/2GIS (target a steady cadence, ~every 2–3 weeks) |
| 8 | 🟡 Medium | Embed a Yandex Maps map (correct pin) on the contact/footer of the site |
| 9 | 🟡 Medium | Add Google Business Profile + Google site verification (low RU weight, but feeds AI answers) |
| 10 | 🟢 Low | Add photos (storefront, interior, products) to every claimed listing |

---

## 9. Limitations disclaimer

- **Tier 0**: no geo-grid / Share-of-Local-Voice rank scan, no live GBP field audit, no review
  velocity/sentiment. Install the **DataForSEO extension** to unlock these (`/seo maps grid`,
  `/seo maps reviews`, `/seo maps gbp`).
- **Yandex Maps & 2GIS** (the platforms that matter most here) have **no public API** reachable
  by this skill — their listing status, reviews, and photos were **not** assessed and must be
  checked manually in Яндекс Бизнес and the 2GIS dashboard.
- OSM/Overpass under-represents Russian SMBs; the competitor table is a **lower bound**.
- Geo for ул. Шестакова 1Б is a **street-level estimate**; survey the exact rooftop point before shipping.

## 10. Cross-skill next steps
- Website on-page local signals → `/seo local https://dimbopizza.ru`
- Schema validation/fixes → `/seo schema https://dimbopizza.ru`
- AI-search visibility → `/seo geo https://dimbopizza.ru`
