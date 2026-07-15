---
name: post-cover
description: Generate a terminal-theme cover image for a blog post — renders an on-brand HTML template to PNG with headless Chrome. Use when the user wants a cover image, thumbnail, or og-image for a post, or when a finished post is missing its cover. Scope is the site's terminal-style covers (dark green, $-prompt, terminal window); photo/YouTube-style thumbnails with Dan's face are made outside this repo and are NOT this skill.
---

# Post Cover

Generate a cover image in the site's terminal design language: dark green background with a faint grid, a mono `$`-prompt eyebrow, a big bold headline with one accent word, optional status chips, and a terminal-window card. The reference for this style is `public/images/blog/2026/07/14/spring-boot-end-of-life.png`.

This is deliberately NOT AI image generation. The cover is HTML/CSS rendered to a PNG, so it is deterministic, always on-brand, and every text element is intentional.

## Files

```
scripts/cover/template.html    the annotated template — copy it, never edit it in place
scripts/cover/render.mjs       HTML → PNG via headless Chrome (no dependencies)
```

Output goes to `public/images/blog/YYYY/MM/DD/<slug>.png` (same date path as the post) and the post's frontmatter gets `cover: <slug>.png` (bare filename).

## Workflow

1. **Read the post.** Title, thesis, and the strongest concrete details. The cover content should be written from the post's actual argument, not generic filler.

2. **Copy `scripts/cover/template.html`** to the scratchpad and fill in the five marked sections:
   - **Eyebrow**: lowercase mono phrase. The post's subtitle or stakes ("why java is better positioned than you think", "oss support ended · june 2026").
   - **Headline**: short version of the title, not necessarily the full SEO title. Wrap ONE word in `<em>` for the green accent, or `<em class="warn">` for red when the post is a warning (EOL, breaking change, deprecation).
   - **Chips** (optional): 2–3 pill facts. Delete the div if the composition is better without them.
   - **Terminal title bar**: `~/dev — zsh` is the default; change only with a reason.
   - **Terminal body**: this is where the post's idea becomes a joke or a payoff. A fake command whose output makes the argument ("your existing team ✓ already hired"). 4–6 lines max, end with the green `.accent` line + `.cursor`. Alignment is `white-space: pre`, so count characters when building columns.

3. **Render**: `node scripts/cover/render.mjs <copy.html> public/images/blog/YYYY/MM/DD/<slug>.png`
   Default output is 5040x2836 (16:9 at 2x). Pass `WxH` and `scale` args to override.

4. **Verify by Reading the PNG.** Check: nothing clipped, columns aligned, headline fits on one or two lines, accent word is the right word. Fix the HTML and re-render until it's right. Long headlines: drop `h1` font-size from 148px toward 110px before allowing a third line.

5. **Show the user the rendered image location and wait for their reaction before iterating further on taste.** Dan has strong opinions about covers; one render + his feedback beats five speculative variants.

6. **Set frontmatter** `cover: <slug>.png` on the post once he approves (or immediately if he asked for the whole thing done).

## Style rules

- Terminal text is lowercase. Headline is Title Case. Eyebrow is lowercase.
- One accent color per cover: green for positive/announcement posts, red accents (`warn`, `.bad`) only when the post is a warning.
- The terminal body must be specific to the post. "loading..." or "hello world" filler is a failure; the reader should get the post's argument from the terminal alone.
- No em dashes in any cover text (same rule as prose). The `·` separator is the house alternative.
- Don't add logos. Spring leaf/Java Duke licensing is not worth it for a cover; the type does the work.

## Renderer notes

- Requires Chrome at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`.
- Fonts are system: SF Mono/Menlo for mono, Inter/system sans for headlines. Nothing to install.
- If a JPG is needed (rare): `sips -s format jpeg <png> --out <jpg>`.
