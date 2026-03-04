# Technical Plan — MISSION OS Vibe Pilot

## Architecture choice
- Chosen option: lightweight Node.js CLI utility + markdown artifacts in-repo.
- Why this option: zero external dependency, fast validation, easy CI integration.
- Rejected alternatives: Python scaffold (extra environment variance), shell-only logic (harder to test robustly).

## Stack + versions
- Runtime: Node 20+
- Tests: Node built-in test runner (`node --test`)
- CI: GitHub Actions

## Data model + boundaries
- Inputs: slug/title/output directory
- Outputs: deterministic markdown scaffold files in `work/<slug>/`
- Boundary: no network calls, no secrets, no external mutation

## Security model
- No credential handling.
- Slug normalization prevents unsafe path naming patterns.

## UI system
- N/A (docs + CLI pilot).

## Testing strategy
- Unit tests for slug normalization.
- Integration-style test for file generation.
- CI quality gates: lint/test/build scripts.

## Deployment strategy
- Merge to main via final PR when stable.
- Continue iteration on `build/first-successful-build` until review-ready.
