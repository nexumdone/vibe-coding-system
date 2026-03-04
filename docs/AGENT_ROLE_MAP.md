# Agent Role Map

## Orchestrator (Nexum main)
- Runs concept intake and challenge protocol
- Approves phase transitions
- Enforces WIP and anti-clutter rules

## Planner Agent
- Produces technical plan options and tradeoff analysis
- Recommends primary + fallback approach

## Builder Agent
- Implements one scoped task slice at a time
- Must obey file/behavior scope lock

## Verifier Agent
- Runs lint/test/build and reports pass/fail evidence
- Blocks merge when acceptance checks fail

## Security/Performance Reviewer
- Checks authz/input validation/secret handling
- Flags performance anti-patterns and risky defaults

## Parallelism policy
- Planner/research can run in parallel
- Builder + verifier pipeline per task slice
- Security/perf review at milestone and pre-merge gates
