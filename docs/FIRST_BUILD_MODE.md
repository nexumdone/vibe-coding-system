# First Build Mode (No-Approval Loop)

## Plain-English purpose
Let agents build and test continuously without waiting for your approval on every small change.

## How it works
1. Agents work on a `build/...` branch (for example: `build/first-successful-build`).
2. Every push to that branch runs quality checks automatically.
3. Agents keep iterating there until the build is stable and improved.
4. Then create **one final PR** to `main` for your review and comments.

## Why this helps
- No repeated review interruptions while work is still in progress.
- You review once at the right time: when it is ready.
- Keeps history organized and test-backed.

## Current guardrails
- `main` still requires PR-based merge flow.
- Required review approvals temporarily set to `0` for this first-build phase.
- Required quality check remains active (`quality-gates`).

## After first successful build
Recommended next step:
- Set required review approvals back to `1` for normal operations.
