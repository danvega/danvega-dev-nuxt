---
title: "Using PDF Embeds in Blog Posts"
description: "Learn how to embed PDF documents directly in your blog posts"
date: 2025-02-26
published: true
author:
  name: Dan Vega
  url: https://danvega.dev
  avatarId: "dan-vega-150"
---

# PDF Embedding in Blog Posts

This is an example of how to embed a PDF document directly in your blog posts using the new `PdfEmbed` component.

## Basic Usage

To embed a PDF, use the following syntax in your markdown:

```markdown
:PdfEmbed{src="https://example.com/path/to/your-document.pdf"}
```

Here's a live example with a sample PDF from the Mozilla Developer Network:

:PdfEmbed{src="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf" title="TraceMonkey PDF Example"}

## Customizing the Embed

You can customize the height and width of the PDF viewer:

```markdown
:PdfEmbed{src="https://example.com/path/to/your-document.pdf" height="600px" width="80%"}
```

## Adding a Custom Title

For better accessibility, add a descriptive title:

```markdown
:PdfEmbed{src="https://example.com/path/to/your-document.pdf" title="My Conference Slides"}
```

## Best Practices

1. Use web-optimized PDFs to ensure fast loading
2. Keep file sizes reasonable (under 5MB if possible)
3. Always provide a descriptive title for screen readers
4. Consider also providing a direct download link below the embed