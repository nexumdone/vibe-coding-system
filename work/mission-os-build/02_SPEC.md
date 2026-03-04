# Specification — MISSION OS MVP Slice 1

## Title
MISSION OS Slice 1: OS Scaffold + Boundary Check + Status View

## Non-technical summary
Build the first usable mini-version of MISSION OS that proves the core idea works: create an OS workspace safely, verify boundary rules, and show current status in one view.

## Objective (explicit)
Deliver one end-to-end slice that demonstrates isolation-first behavior and gives a visible operational status output.

## User journeys
1. John initializes a new OS profile (example: `CONSTRUCTION`).
2. System generates expected folder structure and metadata.
3. System runs boundary validation checks (no cross-OS path write allowed).
4. John opens a status summary showing OS id, structure health, and boundary check result.

## Functional requirements
- FR-001: CLI command to create OS scaffold with required directories.
- FR-002: Metadata file generation with `os_id`, `created_at`, `status`.
- FR-003: Boundary-check command validates that target paths stay inside OS root.
- FR-004: Status command prints a concise summary for one OS profile.

## Non-functional requirements
- Reliability: commands are deterministic and rerunnable.
- Safety: boundary checker must fail closed (reject unsafe paths).
- Performance: each command should complete in under 2 seconds for local filesystem operations.
- Usability: command output should include plain-language success/failure lines.

## Out of scope (for slice 1)
- Multi-user access control
- Cloud provider integration
- Event streaming backend
- Full dashboard UI

## Acceptance criteria
- AC-001: Running scaffold command creates required tree and metadata.
- AC-002: Boundary checker rejects unsafe path attempts and passes safe paths.
- AC-003: Status command outputs expected fields for created OS.
- AC-004: Lint/test/build checks pass in CI on build branch.

## Edge cases
- Empty or invalid OS id input.
- Existing OS id rerun behavior.
- Path traversal style input (e.g., `../NEXUM`).

## Open questions
- Should existing OS scaffolds be immutable by default or updateable with `--force`?
- Should status output be JSON-only, table-only, or both?
