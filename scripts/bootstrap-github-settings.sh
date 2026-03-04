#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <owner/repo>"
  exit 1
fi

REPO="$1"

labels=(
  "phase:specify|0052CC|Specification phase"
  "phase:plan|1D76DB|Planning phase"
  "phase:tasks|5319E7|Task slicing"
  "phase:implement|8250DF|Implementation phase"
  "type:feature|0E8A16|New feature"
  "type:bug|D73A4A|Bug fix"
  "type:refactor|FBCA04|Refactor"
  "type:chore|BFDADC|Maintenance"
  "status:blocked|B60205|Blocked work"
  "status:ready|0E8A16|Ready to execute"
  "priority:p0|B60205|Urgent"
  "priority:p1|D93F0B|High"
  "priority:p2|FBCA04|Normal"
)

for entry in "${labels[@]}"; do
  IFS='|' read -r name color desc <<< "$entry"
  gh label create "$name" --repo "$REPO" --color "$color" --description "$desc" --force >/dev/null
  echo "label: $name"
done

# Branch protection for main
# Requires admin rights on repo.
# Uses JSON input to avoid form-field schema issues in newer GitHub API validation.
gh api -X PUT "repos/$REPO/branches/main/protection" \
  -H "Accept: application/vnd.github+json" \
  --input - >/dev/null <<JSON
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["quality-gates"]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false,
    "required_approving_review_count": 1
  },
  "restrictions": null
}
JSON

echo "branch protection configured for $REPO"
