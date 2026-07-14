---
name: seo-opportunities
description: |
  Find what to write or fix next on Dan Vega's blog, ranked by evidence from Google Search Console. Use when the user wants to: (1) find content opportunities or "what should I write about", (2) find keyword/traffic gaps, (3) find pages worth optimizing, (4) figure out where the traffic upside is, or when they mention "opportunities", "what to write", "content gap", "striking distance", "low CTR pages", or "where should I focus". This finds the work; `seo-optimize` does the work on a single post; `new-blog-post` scaffolds a new one.
---

# SEO Opportunities

Find the highest-value SEO work available, grounded in Dan's real Search Console data — not guesses. Output a ranked list of opportunities, each with evidence, then hand each one to `seo-optimize` (fix an existing post) or `new-blog-post` (write a new one).

## The core principle

**Never recommend from intuition.** Every opportunity must cite real numbers: impressions, CTR, position, or view counts. If you can't attach evidence, it's not an opportunity — it's a hunch. Say so.

## Data sources, in order of value

1. **Google Search Console** — by far the richest. Real impressions/CTR/position for queries Dan *already* ranks for. This is where nearly every real opportunity comes from.
2. **The repo** (`content/blog/`) — what already exists, for gap analysis.
3. **`dvaas` MCP** — `youtube-get-top-videos`, `youtube-search-videos-by-topic`, `blog-search-posts-by-keyword`. A high-view video with no companion blog post is proven demand, uncaptured.
4. **Web search** — validation only (competitors, official terminology, "People Also Ask"). Never the primary signal; it can't tell you what *Dan* ranks for.

No paid keyword APIs. We don't have search volume — we have something better: what Google *already shows Dan for*.

## Getting Search Console data

Dan is logged into GSC in Chrome. Use the `claude-in-chrome` tools. Property: `sc-domain:danvega.dev`.

**Skip the filter UI — build the URL directly.** This is the big time-saver:

```
# Top pages
https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Adanvega.dev&metrics=CLICKS%2CIMPRESSIONS%2CCTR%2CPOSITION&breakdown=page

# Top queries
...&breakdown=query

# Queries for ONE page  (the `page=*<slug>` substring filter is the key)
...&breakdown=query&page=*spring-boot-4-modularization

# Page indexing report
https://search.google.com/search-console/index?resource_id=sc-domain:danvega.dev
```

Operational gotchas learned the hard way:

- **`get_page_text` blows the 50K limit** on filtered GSC views. Use `computer` screenshots of the table instead, after `scroll`ing down to it.
- **Always re-sort by Impressions**, not the default Clicks. Sorting by clicks shows you the *winners* and hides the problem. On the MCP page, the top 10 by clicks were only ~4K of 68K impressions — the entire opportunity was in the tail.
- Default date range is 3 months; that's usually right.
- Rows-per-page is a custom widget, not a `<select>` — `form_input` fails on it. Click it, then click the value.

## Workflow

### Phase 1 — Pull the landscape

Get top pages by impressions. Note for each: impressions, CTR, position. Identify anything with **high impressions and CTR under ~2%**.

### Phase 2 — Classify each candidate

For each, pull its page-level queries (sorted by impressions) and classify:

| Type | Signature | Action |
|---|---|---|
| **CTR rescue** | Ranks fine (pos < 10) but CTR < 2% | `seo-optimize` the title/description. The traffic already exists. |
| **Striking distance** | Position ~5–20, real impressions | Small push → page one. Metadata + maybe content. |
| **Content gap** | A query cluster with big impressions and no dedicated post | `new-blog-post`. Highest ceiling. |
| **Consolidation** | Several thin posts splitting one cluster | One comprehensive post + 301 the rest. |
| **Trending capture** | New release/framework, rising, Dan has adjacent content | Move fast while it's hot. |
| **Phantom impressions** ⚠️ | Huge impressions, ~0% CTR, but the queries want something Dan can't be | **Leave it alone.** Not an opportunity. |

### Phase 3 — Verify before recommending

This is where recommendations earn trust:

- **Are the queries even winnable?** *Do this before calling anything a CTR rescue.* A big impression count at ~0% CTR is often **not** a broken page — it's Google showing Dan for searches he can never satisfy. Read the actual queries. If they contain "official docs", "documentation", a vendor's name, or are navigational (someone looking for spring.io, a download, a specific product), **no title or description will ever win that click**. Those impressions are phantom. Report them as such and move on.
  - Real example: `spring-boot-3-features` looked like the biggest opportunity on the site — 162K impressions, 0.1% CTR. Its top queries turned out to be ~1,000 variants of *"spring boot 3 system requirements java 17 **official docs**"*, all at literally 0%. Unwinnable. The queries it *could* win (`spring boot 3 features`) were already at position 1.7 / 7.5% CTR. Recommending it as a "CTR rescue" would have wasted real effort.
  - Corollary: **high impressions ≠ opportunity.** Impressions are what Google *shows*, not what anyone wants from Dan. Always sanity-check intent before sizing a prize.
- **Check the post actually covers the topic** before proposing a metadata change that claims it. Grep the body. (The modularization post ranked #3 for Flyway queries and genuinely had the answer in a migration table — surfacing it was honest. Had it not, claiming it would have been a lie.)
- **Check for existing posts** before proposing a "new" one — you may be looking at a consolidation, not a gap.
- **Check title/description length**. Titles > 60 chars truncate; descriptions should be 150–160. An empty or 500-char description is a bug, not a style choice — and it's common here.

### Phase 4 — Rank and report

Rank by **(impressions × realistic CTR gain) ÷ effort**. Metadata fixes on a 100K-impression page beat writing a new post for a 2K-impression query.

For each opportunity, report:

```
### <N>. <Title>  — <type>
- Evidence: <impressions> impr, <CTR>, position <N>  (+ the 2-3 queries that prove it)
- Diagnosis: <why it's underperforming, specifically>
- Action: seo-optimize | new-blog-post | consolidate
- Realistic upside: <honest estimate>
```

End with a recommended order and what you'd do first.

## Calibration — what real opportunities looked like

Useful reference points from this blog:

- **CTR rescue**: `spring-boot-crash-course` — 111K impressions, **0.3%** CTR, position 10, and an **entirely empty meta description**. Google was auto-generating snippets.
- **Content gap**: the "kill a process on a port" cluster — ~17K impressions across ~9 queries at **~0% CTR**, served only by a 9-year-old macOS-only post. Became a new comprehensive post.
- **Metadata/intent mismatch**: `spring-boot-4-modularization` ranked **position ~3 with 0% CTR** for Flyway queries because its title/description only mentioned the H2 console.
- **Truncation**: descriptions of 200–570 chars and titles over 70 are common here and silently destroy CTR.

- **Phantom impressions** (the trap): `spring-boot-3-features` — 162K impressions at 0.1%, which looked like the biggest prize on the site and was actually ~1,000 "official docs" queries at 0% CTR. Several other 0.1%-CTR pages (`spring-proxy-bean-methods` 90K, `escape-backtick-markdown` 48K, `spring-security-cors` 41K) have *healthy* titles and descriptions and are likely the same phenomenon.

Site-wide CTR is ~0.6% on ~3M impressions. That number is misleading on its own: a large share of those impressions are phantom (broad or official-docs intent Dan can't win). Real upside is in CTR on pages whose queries **match what Dan actually offers** — not in the raw impression count.

## Rules

- Evidence or it doesn't ship. Cite the numbers.
- **Be honest about ceilings.** Position ~10 is structurally low-CTR; metadata alone won't make it position 3. Say what a fix can and can't do.
- Don't recommend re-optimizing a page that's already performing (CTR > 4% at a good position) — leave winners alone.
- Prefer consolidation over adding a third post to a fragmented cluster.
- Ignore dated/news posts (conference recaps, "Happy New Year", release announcements). SEO effort belongs on evergreen and trending content.
- Report what you did **not** cover (rows you didn't page through, candidates you skipped) so the picture isn't falsely complete.
