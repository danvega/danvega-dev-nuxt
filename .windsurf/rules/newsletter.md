# Instructions for Converting Beehiiv Newsletter to Website Markdown

## Input Requirements
1. HTML content of the newsletter (provided by user)
2. Slug for the new markdown file (provided by user)
3. Publish date for the newsletter (provided by user)

## Process Overview
1. Parse the provided HTML content of the newsletter
2. Process content according to formatting rules below
3. Create directory structure based on the publish date
4. Write processed markdown to: `/Users/vega/dev/danvega/danvega-dev-nuxt/content/newsletter/{{YEAR}}/{{MONTH}}/{{DAY}}/{{slug}}.md`
5. Extract and save images to the public images directory

## Directory Structure
- Markdown file location: `/Users/vega/dev/danvega/danvega-dev-nuxt/content/newsletter/{{YEAR}}/{{MONTH}}/{{DAY}}/{{slug}}.md`
- Images location: `/Users/vega/dev/danvega/danvega-dev-nuxt/public/images/newsletter/{{YEAR}}/{{MONTH}}/{{DAY}}/`
- Format values as:
    - {{YEAR}} = 4-digit year (e.g., 2025)
    - {{MONTH}} = 2-digit month (e.g., 03)
    - {{DAY}} = 2-digit day (e.g., 31)
- File name will be the provided slug: `{{slug}}.md`

## YAML Header
```yaml
---
title: [Extract title from the provided HTML content]
slug: [Use the provided slug]
date: [Use the provided publish date in ISO format: YYYY-MM-DDTHH:mm:ss.sssZ]
---
```

## Content Processing
1. Media Embeds
    - YouTube Links: Convert all YouTube URLs to `:YouTube{id=VIDEO_ID}` format
        - Extract video ID from both full URLs and shortened youtu.be links
    - Twitter/X Links: Convert all Twitter/X URLs to `:TweetEmbed{id=TWEET_ID}` format
        - Extract tweet ID from Twitter/X URLs
2. Formatting
    - Remove Beehiiv-specific formatting/metadata
    - Maintain heading hierarchy (h2, h3)
    - Preserve emojis and special characters
    - Keep relative links as-is
    - Use consistent paragraph spacing (one blank line)
    - Remove double spaces
    - Format lists with proper indentation
3. Structure
    - Keep original section order
    - One line break between sections
    - Remove redundant text/formatting
    - Ensure logical heading hierarchy
4. Image Processing
    - Extract images from the provided HTML content
    - Save images to: `/Users/vega/dev/danvega/danvega-dev-nuxt/public/images/newsletter/{{YEAR}}/{{MONTH}}/{{DAY}}/`
    - Use relative paths in markdown that reference the public path: `![Alt text](/images/newsletter/{{YEAR}}/{{MONTH}}/{{DAY}}/image-filename.jpg)`
    - Maintain original image dimensions when possible
    - Optimize images for web if needed
    - Ensure image filenames are web-friendly (no spaces, lowercase)
    - Use descriptive filenames that relate to content

## Quality Control
1. Spelling
    - Run spell check on all content
    - Review technical terms accuracy
    - Check proper nouns capitalization
2. Grammar
    - Subject-verb agreement
    - Proper punctuation
    - Consistent capitalization
    - Clear sentence structure
    - Remove redundant words
3. Technical Verification
    - Validate YouTube ID extraction
    - Validate Twitter/X ID extraction
    - Check link formatting
    - Confirm heading structure
    - Verify code snippets (if any)
    - Confirm all images are properly referenced and exist in the directory

## Footer Format
```markdown
## UNTIL NEXT WEEK
I hope you enjoyed this newsletter installment, and I will talk to you in the next one. If you have any questions for me or topics you would like me to cover please feel free to reply to this email or reach out to me on Twitter (I'm not calling it X). 
Happy Coding,  
Dan Vega  
[https://www.danvega.dev](https://www.danvega.dev/)
```

## Final Checks
1. Content completeness
2. Format consistency
3. Link functionality
4. Image references and file existence
5. Code block formatting
6. Overall readability

I've made these key changes:
1. Added a specific section for Twitter/X links conversion using the `:TweetEmbed{id=TWEET_ID}` format
2. Updated the image directory path to `/Users/vega/dev/danvega/danvega-dev-nuxt/public/images/newsletter/{{YEAR}}/{{MONTH}}/{{DAY}}/`
3. Updated the image reference paths in markdown to use the public path: `/images/newsletter/{{YEAR}}/{{MONTH}}/{{DAY}}/image-filename.jpg`