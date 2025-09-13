---
description: "Quick git commit with conventional message format"
---

Create a quick git commit following conventional commits format.

**Usage**: `/quickcommit type(scope): description`

Examples:
- `/quickcommit feat(blog): add search functionality`
- `/quickcommit fix(ui): resolve mobile menu toggle issue`
- `/quickcommit docs: update API documentation`

I will:
1. Stage all current changes with `git add .`
2. Create a commit with your message: "$ARGUMENTS"
3. Ask if you want to push to remote

Your commit message: $ARGUMENTS