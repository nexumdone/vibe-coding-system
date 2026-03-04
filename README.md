# Vibe Coding System (Reusable)

A GitHub-first starter system for running coding projects through a spec-driven, agent-orchestrated workflow.

## Core flow
1. Concept Intake
2. Brainstorm + Option Challenge (required)
3. Specification (explicit sign-off required)
4. Technical Plan
5. Task Slices
6. Implement in bounded loops with quality gates

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

## Quick start for first build mode
```bash
# scaffold a new concept->spec->plan->tasks workspace
node scripts/start-vibe-cycle.mjs mission-os-vibe --title "MISSION OS Vibe Pilot"

# run quality checks locally before pushing
npm run lint && npm test && npm run build
```

## MISSION OS Slice 1 commands
```bash
# create an OS scaffold
npm run mission:scaffold -- CONSTRUCTION --base work/mission-os-build/os --status Active

# verify candidate paths stay within OS root
npm run mission:boundary -- work/mission-os-build/os/CONSTRUCTION projects/PRJ-0001
npm run mission:boundary -- work/mission-os-build/os/CONSTRUCTION ../NEXUM/secrets

# get status summary
npm run mission:status -- CONSTRUCTION --base work/mission-os-build/os
```

## First draft UI
- Path: `ui/mission-os/index.html`
- Review guide: `docs/UI_FIRST_DRAFT_REVIEW_GUIDE.md`

## Notes
- Keep source-of-truth code here in GitHub.
- Keep control-plane docs/governance in Nexum workspace.
