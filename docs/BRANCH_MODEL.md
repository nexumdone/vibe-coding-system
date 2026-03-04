# Branch + PR Model

## Branches
- `main` is protected
- Feature branches: `feat/<task-id>-<short-name>`
- Fix branches: `fix/<task-id>-<short-name>`

## Pull request requirements
- At least 1 approval
- Required status checks must pass
- No direct pushes to main

## Commit guidance
- Commit after each meaningful slice
- Reference task IDs in commit message when possible

## Merge policy
- Squash merge default
- Delete branch after merge

## Rollback
- Revert PR commit if regression discovered
