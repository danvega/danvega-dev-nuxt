---
name: new-blog-post
description: |
  Write a new blog post for Dan Vega's site — creates the file in content/blog/ with correct frontmatter and a complete first draft in Dan's voice. Use whenever the user wants to start, draft, scaffold, or create a new post/article — including phrasings like "new blog post", "write a post about X", "start an article on Y", "draft something on Z", or when they hand over a topic, a URL, or research notes and want them turned into a post. Scope is creating a NEW post; optimizing an existing one is `seo-optimize`, and finding what to write about next is `seo-opportunities`.
---

# New Blog Post

Create the file, the frontmatter, and a complete first draft for a new post. Getting the frontmatter right matters more than it looks: it drives the URL, the tag pages, the RSS feed, and the SEO meta tags, and several fields fail silently rather than loudly when they're wrong. Getting the voice right matters more than any of it.

## Where the file goes

```
content/blog/YYYY/MM/DD/<slug>.md          the post
public/images/blog/YYYY/MM/DD/<file>       its images (create dir only if adding one)
```

Use today's date unless the user gives one. The directory date and the `date` field should agree.

**The filename must match the `slug` field.** Lookup tries `slug` first and falls back to matching the file path, so a mismatch produces a post that resolves inconsistently. Slugs are kebab-case, lowercase, no dates.

Pick the slug for search, not for cleverness — it's the canonical URL (`/blog/<slug>`) and it's permanent. If the post targets a keyword, the slug should contain it.

## Frontmatter

```yaml
---
title: "Post Title Here"
slug: post-title-here
description: "One sentence, roughly 155 characters."
author: "Dan Vega"
tags:
  - Spring Boot
  - Java
keywords:
  - primary keyword
  - secondary keyword
date: 2026-07-14T09:00:00.000Z
published: false
---
```

Optional: `cover`, `video`, `github`, `series`, `seriesOrder`, `seriesTitle`, `excerpt`, `featured`.

### tags — always a YAML list, always canonical

Two rules, both learned the hard way.

**Always a list, never a scalar.** `tags: courses` is valid YAML and parses as a *string*. The schema in `content.config.ts` says `z.array(z.string())` but does not reject a scalar, so it sails through — and code that iterates the tags then walks a string character by character. This actually shipped: the live tag page displayed chips named `c`, `o`, `u`, `r`, `s`, `e`. Even for a single tag, write it as a list.

**Use canonical spellings.** Read `app/utils/tags.ts` and use the exact values from `TAG_DISPLAY_NAMES` — don't guess or invent, and don't copy the list into your head from this file, because it changes. Variants like `spring boot`, `Spring boot`, `spring-ai`, and `vue3` get folded onto the canonical tag at render time, so an off-spelling isn't fatal — but it's silently wrong, and `TAG_ALIASES` only knows the variants someone already noticed.

Prefer existing tags to new ones. Anything under 3 posts is hidden from `/blog/tags` entirely (`TAG_MIN_POSTS`), so a bespoke one-off tag is invisible — it's only worth inventing a tag you intend to use again. Two to four tags is the norm.

### keywords

A YAML list of the terms the post should rank for, most important first. Mirror them in the title, an H2, and the opening paragraph — that's what `seo-optimize` will check later.

**A keyword starting with `@` must be quoted** (`- "@Transactional"`). Unquoted, `@` is a reserved YAML indicator and Nuxt Content fails to parse the post — it disappears from the site with no error. Spring annotations make this a live risk.

If you don't have real keyword data, say so rather than inventing plausible ones. `seo-opportunities` finds them from Search Console; `seo-optimize` researches them for a finished post.

### description

One sentence, **~155 characters**. It's the SEO meta description and the RSS feed text, so it gets truncated in the SERP if it runs long — there's a history of trimming 500-character descriptions back down. Write it as a promise to the reader, not a summary of the summary.

### cover

A **bare filename** (`cover: ralph-loop.jpg`), resolved against `public/images/blog/YYYY/MM/DD/`. It's optional — **omit it entirely rather than pointing at an image that doesn't exist yet**, and tell the user what to drop in and where.

### published

`published: false` for a draft — unpublished posts are excluded from every query. Note that `published: true` with a past date means the post is **live immediately**; the date field alone does not schedule it.

## Write the full draft

Write the complete post — intro, every section, conclusion. Dan edits rather than writes from blank. The bar is a draft he can ship after a pass, not an outline he has to fill in.

This only works if it sounds like him. Generic-AI-blog voice is the failure mode, and it's worse than no draft, because the uncanny-valley version has to be un-written before it can be rewritten.

**Before drafting, read two or three recent posts in `content/blog/` on a related topic.** The patterns below are the shape of his voice, but reading actual posts is how you catch the current rhythm — and how you find the ones you should link to.

### How Dan's posts sound

Traits you can see in any recent post:

- **Open with a question or a claim that shouldn't be true.** *"Did you know that in Java, you can change the value of a `private final` field using reflection?"* — then immediately validate the reader's surprise: *"That feels like it shouldn't be possible, and the Java team agrees."*
- **Short sentences carry the emphasis.** *"It's a bash script. That's it."* A three-word sentence after a long one is his main rhetorical move. Use it sparingly and it lands.
- **Say what the post will cover, in the intro.** *"In this post I'll explain what the Ralph Loop is, when you should reach for it, and how I used it to build a complete vending machine CLI application in Java."*
- **First person, from real experience.** *"I just got back from JavaOne..."*, *"Most of my day looks like this."* He's a practitioner reporting back, not a narrator. Don't invent experiences he didn't have — if a claim needs a story he hasn't told you, leave a comment asking for it rather than fabricating one.
- **Second person for the reader.** "you", "your code", "when you run this".
- **Say when NOT to use the thing.** *"it's worth being clear about when this technique is the right tool, because it usually isn't."* This is the most distinctive thing about his writing and the reason people trust him. A post that only sells is off-voice.
- **Teach the beginner without condescending.** *"If you're new to Java, the `final` keyword on a field means..."* — one clause, then move on.
- **Credit sources inline** with real links, and quote people directly when their phrasing is good.
- **Headings are plain and descriptive** — "The Context Window Problem", "How the Ralph Loop Works". Not clever, not questions, not listicle bait.
- **Build from one concrete working example** end to end, rather than sprinkling disconnected snippets.

Avoid: "In today's fast-paced world", "Let's dive in", "It's important to note that", breathless adjectives, and paragraphs that restate the heading. If a sentence would survive being deleted, delete it.

### Structure

Java and Spring code blocks with real, runnable code — not pseudocode or `// ...` handwaving. Fence with the right language for syntax highlighting.

If a working repo exists, link it near the top:

```
::GitHubRepo{url="https://github.com/danvega/repo-name"}
Follow along with the complete working example.
::
```

That's the house component (used in 37 posts). `::tip` and `::warning` exist but are rare — don't reach for them by default.

Link to Dan's own related posts where they're genuinely relevant. You found them while reading for voice; use them.

### Facts

Verify anything the post rests on — a date, a version number, a statistic, a support timeline — against its primary source before writing it, and link that source in the prose. A wrong fact in a draft becomes a wrong fact in a published post, and his credibility is the entire product.

Where you need something only Dan has — an anecdote, an opinion, a benchmark he ran — leave an HTML comment (`<!-- Dan: did you actually hit this? -->`) rather than inventing it. A comment is cheap to answer; a fabricated experience is expensive to catch.

Then tell him plainly which parts you were confident about and which need his eyes.

## After

Mention, don't do:

- **RSS**: if the post is `published: true` and among the 50 most recent published posts, `server/api/feed/data.ts` needs regenerating via `node scripts/generate-rss-data.js`, or the feed silently serves stale text. Drafts and older posts don't need it. (`npm run dev` also regenerates it on startup.)
- **seo-optimize**: the natural next step once the prose exists.
