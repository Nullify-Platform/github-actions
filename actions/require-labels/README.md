# Require Labels

[Require Labels](https://github.com/marketplace/actions/require-labels)

This action allows you to fail the build if/unless a certain combination of labels are applied to a pull request. 

Our microservices use PR labels for Semantic Versioning. See [github-actions/release-version](https://github.com/Nullify-Platform/github-actions/tree/main/actions/release-version) for an explanation.

## Usage

```yaml
# Require labels to be added to a PR before merging
# This is configured as a branch protection setting
name: CI Require Labels
on:
  pull_request:
    types: [opened, labeled, unlabeled, synchronize]
  merge_group:
run-name: CI Require Labels by @${{ github.actor }} ${{ github.sha }}
permissions:
  pull-requests: read
jobs:
  require-labels:
    if: ${{ github.event_name == 'pull_request' }}
    runs-on: ubuntu-latest
    outputs:
      status: ${{ steps.require-labels.outputs.status }}
    steps:
      - name: Require Labels
        id: require-labels
        uses: nullify-platform/github-actions/actions/require-labels@main
```
