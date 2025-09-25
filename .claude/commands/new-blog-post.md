---
allowed-tools: Bash(mkdir:*), Write, Edit, Glob
argument-hint: [title or description]
description: Create a new blog post structure with metadata and content suggestions
---

I'll create a new blog post structure with metadata and content suggestions based on: "$ARGUMENTS"

First, let me get today's date for the blog post structure:

```bash
YEAR=$(date +%Y)
MONTH=$(date +%m)
DAY=$(date +%d)
TODAY=$(date +%Y-%m-%dT09:00:00.000Z)
echo "Creating blog post structure for: $TODAY"
```

**Step 1: Create directory structure**
Creating directories for the new blog post:
- content/blog/$YEAR/$MONTH/$DAY/ (for the markdown file)
- public/images/blog/$YEAR/$MONTH/$DAY/ (for images)

**Step 2: Generate blog post metadata**
Based on your input, I'll create:
- URL-friendly slug from your title
- Appropriate tags and keywords
- Professional description
- Proper frontmatter structure

**Step 3: Create the blog post structure**
The blog post will include:
- Complete frontmatter with all required fields
- Published set to false (draft mode)
- Content suggestions and potential angles
- Structured outline with key topics to cover
- Recommendations for examples and resources

Let me create this structure for you now...

Now creating the necessary directories:

```bash
mkdir -p content/blog/$YEAR/$MONTH/$DAY
mkdir -p public/images/blog/$YEAR/$MONTH/$DAY
```

Now I'll generate the blog post structure with metadata and content suggestions based on: "$ARGUMENTS"

The blog post structure will be saved as a draft with content guidance to help you write the article.