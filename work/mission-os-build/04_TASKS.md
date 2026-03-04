# Tasks — MISSION OS MVP Slice 1

## Milestone
Deliver first bounded MISSION OS vertical slice

## Task list (small, testable slices)

- T-001: [ ] Implement OS scaffold command
  - Scope: create `mission-os-scaffold` CLI utility + structure creation
  - Files allowed: `scripts/mission-os-scaffold.mjs`, `test/*`
  - Acceptance tests:
    - scaffold creates required folders
    - metadata file exists with required fields

- T-002: [ ] Implement boundary-check command
  - Scope: validate safe vs unsafe paths for selected OS root
  - Files allowed: `scripts/mission-os-boundary-check.mjs`, `test/*`
  - Acceptance tests:
    - safe path passes
    - traversal/out-of-root path fails with clear reason

- T-003: [ ] Implement status command
  - Scope: output concise status summary for selected OS
  - Files allowed: `scripts/mission-os-status.mjs`, `test/*`
  - Acceptance tests:
    - reports os_id, root_path, status, structure health

- T-004: [ ] Integrate scripts into package + docs
  - Scope: add npm script entries and quick usage notes
  - Files allowed: `package.json`, `README.md`, `work/mission-os-build/*`
  - Acceptance tests:
    - lint/test/build pass

## Parallel groups
- Group A: T-001 + T-003
- Group B: T-002

## Iteration log pointers
- Active branch: `build/mission-os-kickoff`
- Current step: specification + plan approved, implementation pending

## Done definition
- All AC items in spec pass
- CI quality gates pass
- Changes remain within slice-1 scope
