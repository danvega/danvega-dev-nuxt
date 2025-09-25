---
allowed-tools: Bash(mkdir:*), Write, Edit, Glob
argument-hint: [title] [optional: MM/DD/YYYY]
description: Create a new blog post structure with metadata and content suggestions
---

I'll create a new blog post structure with metadata and content suggestions based on: "$ARGUMENTS"

First, let me parse the arguments and set up the date for the blog post structure:

```bash
# Parse arguments - first argument is title, optional second is date in MM/DD/YYYY format
# For slash commands, ARGUMENTS is a single string that may contain quoted parts
if [[ $ARGUMENTS =~ ^\"([^\"]+)\"[[:space:]]*\"?([0-9]{1,2}/[0-9]{1,2}/[0-9]{4})\"?$ ]]; then
    TITLE="${BASH_REMATCH[1]}"
    DATE_ARG="${BASH_REMATCH[2]}"
elif [[ $ARGUMENTS =~ ^\"([^\"]+)\"[[:space:]]*([0-9]{1,2}/[0-9]{1,2}/[0-9]{4})$ ]]; then
    TITLE="${BASH_REMATCH[1]}"
    DATE_ARG="${BASH_REMATCH[2]}"
elif [[ $ARGUMENTS =~ ^\"([^\"]+)\"$ ]]; then
    TITLE="${BASH_REMATCH[1]}"
    DATE_ARG=""
else
    # Fallback: treat the whole thing as title
    TITLE="$ARGUMENTS"
    DATE_ARG=""
fi

if [[ -n "$DATE_ARG" && "$DATE_ARG" =~ ^[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}$ ]]; then
    # Parse MM/DD/YYYY format
    IFS='/' read -r MONTH DAY YEAR <<< "$DATE_ARG"

    # Add leading zeros if needed (handle as integers to avoid octal issues)
    MONTH=$(printf "%02d" $((10#$MONTH)))
    DAY=$(printf "%02d" $((10#$DAY)))

    # Validate the date (macOS compatible)
    if date -j -f "%Y-%m-%d" "$YEAR-$MONTH-$DAY" >/dev/null 2>&1; then
        TODAY="$YEAR-$MONTH-${DAY}T09:00:00.000Z"
        echo "Creating blog post structure for: $TODAY (from provided date: $DATE_ARG)"
    else
        echo "Error: Invalid date '$DATE_ARG'. Please use MM/DD/YYYY format with a valid date."
        exit 1
    fi
else
    # Use today's date if no date provided or invalid format
    if [[ -n "$DATE_ARG" ]]; then
        echo "Warning: Invalid date format '$DATE_ARG'. Using today's date instead. Please use MM/DD/YYYY format."
    fi

    YEAR=$(date +%Y)
    MONTH=$(date +%m)
    DAY=$(date +%d)
    TODAY=$(date +%Y-%m-%dT09:00:00.000Z)
    echo "Creating blog post structure for: $TODAY (today's date)"
fi
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

Now I'll generate the blog post structure with metadata and content suggestions based on: "$TITLE"

The blog post structure will be saved as a draft with content guidance to help you write the article.