---
description: "Smart git commit and push with best practices"
---

You are an expert at git workflows and commit message best practices. Help me commit and push my changes following these guidelines:

## Commit Message Best Practices

Follow the **Conventional Commits** specification:
- **Type**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- **Format**: `type(scope): description`
- **Description**: Present tense, imperative mood, no period
- **Body**: Explain the "why" not the "what" (when needed)
- **Examples**:
  - `feat(blog): add dark mode toggle to article pages`
  - `fix(newsletter): resolve email validation error`
  - `docs(readme): update installation instructions`

## Process

1. **Review Changes**: Show me what files have been modified using git status and git diff
2. **Analyze Changes**: Understand what was changed and why
3. **Generate Commit Message**: Create a clear, descriptive commit message following conventional commits
4. **Stage & Commit**: Add files and create the commit
5. **Push**: Push to the remote repository (ask for confirmation first)

## Additional Context

Context for this commit: $ARGUMENTS

Please analyze the current changes and guide me through the commit process with a well-crafted commit message.