# Determine Release Version Action

Follows SemVer rules to determine the next GitHub release version for a service.

## Rules

- Include the `major` label on a PR for a **MAJOR** version update (when you make incompatible API changes)
- Include the `minor` label on a PR for a **MINOR** version update (when you add functionality in a backwards compatible manner)
- Include the `patch` label on a PR for a **PATCH** version update (when you make bug fixes or perform chores)
- Pull requests without these labels will not trigger a version bump (when you make other changes e.g. docs, dependencies, tests, CI)

If a new release version is not required, the output will be `undefined`, otherwise it will be a SemVer string e.g. 1.2.3

## Usage

To use:
```yaml
name: Determine release
on:
  push:
    branches:
      - main
jobs:
  determine-releases:
    name: Determine release
    runs-on: ubuntu-latest
    steps:
      - id: release-version
        uses: nullify-platform/github-actions/actions/release-version@main
      - run: echo "release version is ${{ steps.release-version.outputs.result }}"
```

## Development

For local development, open `test.mjs` and insert a GitHub PAT.
Then run `node test.mjs`.
