---
allowed-tools: Bash(mkdir:*), Write, Edit, Glob
argument-hint: [title or description]
description: Create a new blog post with proper structure and metadata
---

I'll create a new blog post based on your title/description: "$ARGUMENTS"

First, let me get today's date for the blog post structure:

```bash
YEAR=$(date +%Y)
MONTH=$(date +%m)
DAY=$(date +%d)
TODAY=$(date +%Y-%m-%d)
echo "Creating blog post for: $TODAY"
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

**Step 3: Create the blog post file**
The blog post will include:
- Complete frontmatter with all required fields
- Published set to false (draft mode)
- Template structure for content
- Placeholder for cover image

Let me create this for you now...

Now creating the necessary directories:

```bash
mkdir -p content/blog/$YEAR/$MONTH/$DAY
mkdir -p public/images/blog/$YEAR/$MONTH/$DAY
```

Now I'll generate the blog post with proper metadata based on: "$ARGUMENTS"

The blog post will be saved as a draft so you can review and edit before publishing. I'll generate appropriate tags, keywords, and a professional description based on your title/topic.