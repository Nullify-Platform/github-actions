# Require Labels

[Require Labels](https://github.com/marketplace/actions/require-labels)

This action allows you to fail the build if/unless a certain combination of labels are applied to a pull request. 

Our microservices use PR labels for Semantic Versioning. See [github-actions/release-version](https://github.com/Nullify-Platform/github-actions/tree/main/actions/release-version) for an explanation.

## Usage

```yaml
name: Require Labels
on:
  pull_request:
    types: [opened, labeled, unlabeled, synchronize]
jobs:
  require-labels:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Require Labels
        id: require-labels
        uses: nullify-platform/github-actions/actions/require-labels@main
```
