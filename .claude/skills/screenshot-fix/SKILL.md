---
name: screenshot-fix
description: Use when the user refers to a screenshot filename in the
  error-screenshots/ folder along with a description of a fix to apply.
  Locates the code responsible for what's shown in that screenshot and
  applies the requested fix. Trigger on phrases like "fix this using
  error-screenshots/<name>", "see error-screenshots/<name>, change X",
  or any mention of a file inside error-screenshots/ paired with a
  description of desired behavior.
argument-hint: "[screenshot-filename] [fix description]"
arguments: filename fix
allowed-tools: Read, Grep, Glob, Edit, Bash
---

# Screenshot-driven fix (error-screenshots/)

The user keeps screenshots in the `error-screenshots/` folder at the project
root. Invoke with a filename and a fix description:

> /screenshot-fix login-button.png the button should be right-aligned, not centered

- `$filename` — the screenshot's name inside `error-screenshots/`
- `$fix` — what should change

If invoked without arguments (model auto-trigger from a natural-language
mention instead of explicit `/screenshot-fix`), extract the filename and fix
description from the user's message yourself.

## Steps

1. **Read the image.** Open `error-screenshots/$filename` with the Read
   tool. If `$filename` is empty, doesn't exist in the folder, or is
   ambiguous, list `error-screenshots/` and ask which one before proceeding.
2. **Restate the target.** In one line, describe what the screenshot shows
   and confirm it matches the requested fix ($fix), so we're aligned before
   editing.
3. **Locate the source.** Grep the codebase for the visible text, labels,
   class names, component names, or error strings shown in the image.
   Confirm the match — don't guess the file based on the description alone.
4. **Apply the minimal fix.** Change only what's needed to satisfy $fix.
   Don't refactor unrelated code or restyle elements not shown or mentioned.
5. **Report back.** State which file(s) and line(s) changed and why.
   If a relevant test or dev server exists, run it or say how to verify.

## Rules

- Never invent visual details not visible in the screenshot or stated in
  the description.
- If one screenshot could map to multiple components, ask rather than
  picking one.
- If the description conflicts with what the screenshot shows, flag the
  conflict instead of resolving it silently.
- Treat `error-screenshots/` as reference material, not something to edit,
  move, or delete.
