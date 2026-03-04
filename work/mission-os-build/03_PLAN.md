# Technical Plan — MISSION OS MVP Slice 1

## Architecture choice
- Option selected: local Node CLI utilities under `scripts/` with markdown/json outputs.
- Why: fastest path, testable in current repo, easy to evolve into full service/UI later.

## Components
1. `scripts/mission-os-scaffold.mjs`
   - create `os/<OS_ID>/` structure
   - write `os/<OS_ID>/os-meta.json`
2. `scripts/mission-os-boundary-check.mjs`
   - validate requested path operations remain inside selected OS root
3. `scripts/mission-os-status.mjs`
   - summarize scaffold existence + boundary check state

## Data model (initial)
- `os-meta.json`
  - `os_id`
  - `created_at`
  - `status` (Draft|Active)
  - `root_path`

## Directory target (slice 1)
- `work/mission-os-build/os/<OS_ID>/`
  - `memory/`
  - `projects/`
  - `ops/`
  - `logs/`
  - `os-meta.json`

## Security and boundary model
- Normalize/resolve all candidate paths before validation.
- Hard reject if resolved path is outside selected OS root.
- No write operation allowed if boundary check fails.

## Test strategy
- Unit tests:
  - OS id normalization
  - boundary pass/fail logic
- Integration tests:
  - scaffold creates expected files/folders
  - status reports expected fields

## CI strategy
- Use existing `quality-gates` workflow.
- Ensure commands are covered under npm scripts/tests.

## Rollout
- Implement on `build/mission-os-kickoff`.
- Validate locally + CI.
- Prepare single review PR to `main` for slice-1 checkpoint.
