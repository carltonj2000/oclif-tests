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

## Debug

```bash
node --inspect-brk ./bin/run init # did not work with vscodium
DEBUG=* yarn cli2
DEBUG=cli2* yarn cli2
```

```javascript title="Use debug instead of console.log"
var debug = require("debug")("cli2:init");
```

## Testing

```bash
yarn add jest
yarn add -D @oclif/test
yarn add jest-diff
yarn add -D @types/jest ts-jest
# setup jest.config.js and write tests and run with cmd below
yarn jest # or yarn jest --watch
```

### Config Preferences Order

- env vars
- flags
- configs
- stored settings
