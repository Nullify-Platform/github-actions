# Clean up repository action

Uses [Stale Branches](https://github.com/marketplace/actions/stale-branches) and [Close Stale Issues](https://github.com/actions/stale) to remove stale branches, PRs and issues. 

Note: Issues must be enabled in each repository that uses this Action.

## Usage

To use (runs once a week):
```yaml
---
name: 'Clean up repository'
on:
  workflow_dispatch:
  schedule:
    - cron: '0 0 * * 0' # weekly
permissions:
  issues: write
  contents: write
  pull-requests: write
jobs:
  clean-up-repo:
    name: Clean branches, issues and PRs
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Clean Repo
        uses: nullify-platform/github-actions/actions/clean-up-repo@main
        with:
          token: ${{ github.token }}
          days-before-pr-stale: 60
          days-before-pr-close: 14
          days-before-branch-stale: 60
          days-before-branch-delete: 74 # 2 weeks after stale
          days-before-issue-close: -1 # Never close issues
```
