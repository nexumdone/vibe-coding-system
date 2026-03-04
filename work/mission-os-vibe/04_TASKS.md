# Tasks — MISSION OS Vibe Pilot

## Milestone
Pilot cycle completion (first successful build branch)

## Task list (small, testable slices)
- T-001: [x] Create scaffold command for concept/spec/plan/tasks workspace.
  - Scope: add CLI script and generation logic.
  - Files allowed to change: `scripts/start-vibe-cycle.mjs`
  - Acceptance tests: command creates expected file set.
  - Dependencies: none

- T-002: [x] Add automated tests for scaffold behavior.
  - Scope: slug normalization + file creation checks.
  - Files allowed to change: `test/start-vibe-cycle.test.mjs`
  - Acceptance tests: `npm test` pass.
  - Dependencies: T-001

- T-003: [x] Add CI-compatible project scripts and docs.
  - Scope: package scripts + quickstart usage + pilot docs.
  - Files allowed to change: `package.json`, `README.md`, `work/mission-os-vibe/*.md`
  - Acceptance tests: `npm run lint && npm test && npm run build` pass.
  - Dependencies: T-001, T-002

## Parallel groups
- Group A: T-001 + initial docs
- Group B: T-002 + validation

## Iteration log pointers
- Progress log: branch commits on `build/first-successful-build`
- Current blocker: none

## Done definition
- Tests pass
- Acceptance criteria met
- No unintended scope drift
