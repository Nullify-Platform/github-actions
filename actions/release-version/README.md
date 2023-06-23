# Determine Release Version Action

Follows SemVer rules to determine the next GitHub release version for a service.

## Rules

- Include the `major` label on a PR for a **MAJOR** version update (when you make incompatible API changes)
- Include the `minor` label on a PR for a **MINOR** version update (when you add functionality in a backwards compatible manner)
- Include the `patch` label on a PR for a **PATCH** version update (when you make bug fixes or perform chores)
- Pull requests without these labels will not trigger a version bump (when you make other changes e.g. docs, dependencies, tests, CI)

If a new release version is not required, the output will be `undefined`, otherwise it will be a SemVer string e.g. `1.2.3`

## Usage

To use:
```yaml
name: Release
on:
  push:
    branches:
      - main
jobs:
  get-version:
    name: Version
    runs-on: ubuntu-latest
    outputs:
      version: ${{ steps.get-version.outputs.result }}
    steps:
      - id: get-version
        uses: nullify-platform/github-actions/actions/release-version@main
      - run: |
          echo "release version is ${{ steps.get-version.outputs.result }}"
          echo "previous version is ${{ steps.get-version.outputs.previous_version }}"
          echo "latest version is ${{ steps.get-version.outputs.latest_version }}"
          echo "short sha is ${{ steps.get-version.outputs.short_sha }}"
```

## Outputs

| **Output**         | **Description**                                                   |
|--------------------|-------------------------------------------------------------------|
| `result`           | Retrieve the next SemVer release version, based on PR label rules |
| `previous_version` | Retrieve the previous tag version                                 |
| `latest_version`   | Retrieve the latest (current) tag version                         |
| `short_sha`        | Retrieve the short SHA                                            |

## Development

For local development, open `test.mjs` and insert a GitHub PAT.
Then run `node test.mjs`.
