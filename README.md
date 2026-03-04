# Vibe Coding System (Reusable)

A GitHub-first starter system for running coding projects through a spec-driven, agent-orchestrated workflow.

## Core flow
1. Concept Intake
2. Specification
3. Technical Plan
4. Task Slices
5. Implement in bounded loops with quality gates

## Repo structure
- `.github/` issue templates, PR template, quality-gate workflow
- `docs/` operational contracts (agent roles, branch model)
- `templates/` reusable concept/spec/plan/tasks/mistakes templates

## Quality baseline
- Scope lock per task
- Small testable slices
- Lint/test/build checks in CI (when scripts exist)
- Security and authorization sanity checks before merge

## Default labels
- phase:specify, phase:plan, phase:tasks, phase:implement
- type:feature, type:bug, type:refactor, type:chore
- status:blocked, status:ready, priority:p0, priority:p1, priority:p2

## Notes
- Keep source-of-truth code here in GitHub.
- Keep control-plane docs/governance in Nexum workspace.
