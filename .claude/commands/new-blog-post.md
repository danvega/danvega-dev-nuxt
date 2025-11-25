---
allowed-tools: Bash(mkdir:*), Write, Edit, Glob
argument-hint: [title] [optional: MM/DD/YYYY]
description: Create a new blog post file with front matter metadata
---

I'll create a new blog post file with front matter for: "$ARGUMENTS"

First, let me parse the arguments and set up the date:
```bash
# Parse arguments - first argument is title, optional second is date in MM/DD/YYYY format
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
    TITLE="$ARGUMENTS"
    DATE_ARG=""
fi

if [[ -n "$DATE_ARG" && "$DATE_ARG" =~ ^[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}$ ]]; then
    IFS='/' read -r MONTH DAY YEAR <<< "$DATE_ARG"
    MONTH=$(printf "%02d" $((10#$MONTH)))
    DAY=$(printf "%02d" $((10#$DAY)))
    
    if date -j -f "%Y-%m-%d" "$YEAR-$MONTH-$DAY" >/dev/null 2>&1; then
        TODAY="$YEAR-$MONTH-${DAY}T09:00:00.000Z"
        echo "Date: $TODAY"
    else
        echo "Error: Invalid date '$DATE_ARG'. Use MM/DD/YYYY format."
        exit 1
    fi
else
    if [[ -n "$DATE_ARG" ]]; then
        echo "Warning: Invalid date format. Using today's date."
    fi
    YEAR=$(date +%Y)
    MONTH=$(date +%m)
    DAY=$(date +%d)
    TODAY=$(date +%Y-%m-%dT09:00:00.000Z)
fi

echo "Title: $TITLE"
echo "Path: content/blog/$YEAR/$MONTH/$DAY/"
```

Creating the directories:
```bash
mkdir -p content/blog/$YEAR/$MONTH/$DAY
mkdir -p public/images/blog/$YEAR/$MONTH/$DAY
```

Now I'll generate the front matter for: "$TITLE"

The front matter will include:
- URL-friendly slug derived from the title
- Appropriate tags based on the topic
- A brief description/summary
- Author, date, and image paths
- `published: false` (draft mode)

The file will be created at `content/blog/YYYY/MM/DD/slug.md` with just the front matter - ready for you to add content.