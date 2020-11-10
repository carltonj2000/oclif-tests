# Building Custom CLIs

The code in this repository is based on the
[Build Custom Command Line Interface (CLI) Tooling with oclif and TypeScript](https://egghead.io/courses/build-custom-command-line-interface-cli-tooling-with-oclif-and-typescript)
course.

## Yarn Workspace

- `packages` contains directories with your packages
- `package.json` contains
  `{ "private": true, "workspaces": ["packages/*"] }`
- in the root directory run `yarn`
- now all `packages/*` directories are runnable `yarn <pkg-name>`
- updated code in `packages/*` is automatically run via `yarn <pkg-name>`

## Global Install

yarn [un]link --global

## NPM Publish

- npm login
- npm publish --access public

## Oclif

npx oclif single `<cli-name />`
