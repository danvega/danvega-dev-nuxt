---
name: seo-optimize
description: |
  SEO keyword research and optimization for an existing blog post on Dan Vega's site. Use when the user wants to: (1) find keywords for a finished blog post, (2) optimize a post for search engines, (3) research what developers search for on a topic, (4) improve or add the `keywords` frontmatter, or when they mention "SEO", "keywords", "optimize for search", or "make this rank better". Works on posts in content/blog/. Research is web-search based (no paid APIs). Scope is optimizing a post that already exists — not writing new posts (use new-blog-post for that).
---

# SEO Optimize

Optimize an existing technical blog post in `content/blog/` for search visibility while keeping Dan's natural, developer-friendly voice. Readability and accuracy always beat keyword density.

## Inputs

The user points you at a post — a path, a slug, or "the latest post." If ambiguous, list recent candidates and confirm before editing. Never optimize a post you haven't been pointed at.

## Workflow

### Phase 1 — Analyze the post

1. Read the full post and its frontmatter.
2. Identify: core topic, subtopics, target audience level (beginner / intermediate / advanced), and the primary technology/version (e.g. "Spring AI 2.0", "Nuxt 3").
3. Note keywords already present naturally in the prose and headings.
4. Note the current `title`, `description`, and `keywords` (if any) — you're improving these, not replacing the post's substance.

### Phase 2 — Keyword research (web search)

Run web searches to see how developers actually search for this. Adapt the tech name to the post:

- `[topic] [technology] tutorial` — how developers phrase it
- `[topic] example` — common search pattern
- `[topic] site:stackoverflow.com` — real questions developers ask
- `[topic] site:baeldung.com OR site:spring.io OR site:vega.dev` — competitor / reference content
- `[technology] [version] [feature]` — version-specific intent (developers search "java 21 virtual threads", not "java threads")

**Always check the official terminology.** For any framework/library feature, find what the vendor's own docs and announcement blog call it, and make sure that exact phrase is a keyword and appears in the post. The vendor's name for a feature is almost always the top search term — a post can describe a feature perfectly and still miss the phrase people actually Google. (Example: a "tool search" post that never said Spring's official term "dynamic tool discovery.")

If a `site:` search returns nothing (common for brand-new features), don't stall — lean on the general and official-docs searches instead.

From the results, produce a keyword report and **show it to the user before editing anything**:

```
## Keyword Research: [post title]

**Primary keywords (2–3)** — high-intent, specific:
- [keyword] — [why it matters / search intent]

**Secondary keywords (5–8)** — related terms and variations:
- [list]

**Questions developers ask** (candidates for H2s / a FAQ):
- [question]
```

Prefer exact technical terms and version numbers over vague phrases. One primary keyword is the post's focus; everything else supports it.

### Phase 3 — Optimize

Apply in this order, editing the post file in place:

- **Title** — include the primary keyword naturally, keep it under ~60 characters, no clickbait. Developers want accuracy, not hype.
- **`description`** (frontmatter) — 150–160 characters, primary keyword included, compelling and honest. This is the meta description.
- **Opening paragraph** — primary keyword within the first ~100 words, naturally.
- **Headers (H2/H3)** — weave in secondary keywords where it reads naturally; keep them descriptive (never generic like "Introduction"); front-load important terms. Add sections that answer the "questions developers ask" when they're a genuine gap.
- **Body** — integrate keywords only where natural. Keep code examples searchable: realistic class/method/annotation names, import statements (these get indexed).
- **`keywords`** (frontmatter) — see format below.

### Phase 4 — Report

Give the user:
1. The keyword report (Phase 2).
2. A short bulleted summary of every change made (title before/after, description before/after, headers touched, new sections, keywords added).
3. The updated frontmatter block.

Then let them review. Do not commit or publish.

## Frontmatter format (match this repo exactly)

Posts use a YAML **list** for keywords (not a comma string) and these fields. Only touch `title`, `description`, and `keywords` unless the user asks for more — leave `slug`, `date`, `cover`, `video`/`youtube`, `tags`, `author`, `published` alone.

```yaml
---
title: "Spring AI Tool Search: Stop Wasting Tokens on Tools You Don't Need"
slug: spring-ai-tool-search
description: "150–160 char meta description with the primary keyword, honest and compelling."
author: "Dan Vega"
tags:
  - Spring AI
  - Spring Boot
keywords:
  - primary keyword (most specific)
  - secondary keyword
  - technology name + version
  - related concept
  - problem this solves
date: 2026-07-09T09:00:00.000Z
published: true
cover: spring-ai-tool-search.jpg
video: https://www.youtube.com/embed/VG00DildlvY
---
```

Keep `keywords` to **5–8 entries** — more is not better. Lead with the most specific. `tags` are broad site categories (e.g. "Spring AI", "Java", "AI") and are curated by Dan — suggest tag changes, don't make them silently.

**Quote any keyword starting with `@`.** `@` is a YAML reserved indicator and can't start a plain scalar, so an unquoted entry makes Nuxt Content fail to parse the whole post:

```yaml
keywords:
  - "@Component vs @Bean"      # required
  - @Component vs @Bean        # breaks the build
```

This bites constantly on Spring posts, where the annotation *is* the high-value exact-match term (`@Bean`, `@CrossOrigin`, `@Value`). After editing frontmatter, parse it with the repo's own `js-yaml` to confirm — run from the project root so it resolves.

## Developer-blog keyword patterns

Developers search differently than general audiences — match their phrasing:

- **Exact terms**: "spring boot @value annotation", not "how to configure spring"
- **Version-specific**: "java 21 virtual threads", "Nuxt 3 useAsyncData"
- **Problem-solving**: `[tech] [error message]`, `fix [tech] [problem]`, `[tech] vs [alternative]`
- **Integration**: `[tech A] with [tech B]`, `spring boot [library] example`
- **Tutorial intent**: `[tech] tutorial`, `[tech] example`, `getting started with [tech]`

Title formulas that work: "How to [Action] with [Technology]", "[Technology] [Topic]: A Practical Guide", "[Technology] [Feature] Tutorial", "[Technology] [Pattern] Example".

## Quality rules

- Readability beats keyword density — every time.
- Never add a keyword that reads unnaturally, and never keyword-stuff (developers notice and bounce).
- Preserve Dan's voice and technical accuracy. Developer trust > search rankings.
- One primary keyword focus per post.
- Don't invent version numbers or claims to hit a keyword — accuracy first.
- Show the keyword report before editing; summarize every change after.
