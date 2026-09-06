# Hookforge
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<h1 align="center">Hookforge</h1>

<p align="center">
  A modern, type-safe React Hooks library for React and Next.js.
</p>

<p align="center">
  <a href="https://github.com/zuxcode/hookforge/blob/master/LICENSE">
    <img alt="License" src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square">
  </a>
  <a href="https://github.com/zuxcode/hookforge/actions">
    <img alt="CI" src="https://github.com/zuxcode/hookforge/actions/workflows/ci.yml/badge.svg">
  </a>
  <a href="https://www.npmjs.com/search?q=hookforge">
    <img alt="npm" src="https://img.shields.io/badge/npm-Hookforge-red.svg?style=flat-square">
  </a>
  <a href="https://github.com/zuxcode/hookforge/pulls">
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-green.svg?style=flat-square">
  </a>
</p>

## About

**Hookforge** is a TypeScript-first monorepo for reusable, composable, and production-ready React Hooks.

The project is designed around a framework-independent core with dedicated framework integrations.

The core hooks remain independent of Next.js and other frameworks, while framework-specific functionality lives in separate packages.

## Packages

Hookforge is organized into independently buildable, testable, and publishable packages.

| Package                                  | Description                               |
| ---------------------------------------- | ----------------------------------------- |
| [`@hookforge/core`](./packages/core)     | Framework-independent React Hooks         |
| [`@hookforge/nextjs`](./packages/nextjs) | Next.js-specific React Hooks and adapters |

### `@hookforge/core`

The core package contains reusable React Hooks that do not depend on Next.js.

```bash
pnpm add @hookforge/core
```

Use it when building React applications that need framework-independent hooks.

See [`packages/core/README.md`](./packages/core/README.md) for the complete API and usage documentation.

### `@hookforge/nextjs`

The Next.js package contains hooks and adapters that integrate Hookforge with Next.js APIs.

```bash
pnpm add @hookforge/nextjs
```

It may depend on `@hookforge/core`, but the core package never depends on Next.js.

See [`packages/nextjs/README.md`](./packages/nextjs/README.md) for the complete API and usage documentation.

## Architecture

Hookforge follows a layered package architecture:

```text
┌──────────────────────────────┐
│       @hookforge/nextjs      │
│                              │
│ Next.js-specific hooks and   │
│ framework integrations       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        @hookforge/core       │
│                              │
│ Framework-independent React  │
│ Hooks and utilities          │
└──────────────────────────────┘
```

This keeps the core package lightweight and framework-independent while allowing framework integrations to evolve independently.

## Goals

* 🪝 Reusable React Hooks
* ⚡ Modern React support
* 🔷 TypeScript-first APIs
* 🧩 Framework-friendly architecture
* ▲ Next.js integration
* 📦 Independently publishable packages
* 🧪 Tested and type-safe
* 🛠️ Modern development tooling
* 📚 Clear package-level documentation

## Installation

Install only the package you need.

### React

```bash
pnpm add @hookforge/core
```

### Next.js

```bash
pnpm add @hookforge/nextjs
```

## Usage

Core hooks can be imported from `@hookforge/core`:

```tsx
import { useActiveLink } from "@hookforge/core";

function Navigation() {
  const { isActive } = useActiveLink({
    pathname: "/dashboard/settings",
  });

  return (
    <nav>
      <a href="/dashboard" {...isActive("/dashboard")}>
        Dashboard
      </a>

      <a href="/dashboard/settings" {...isActive("/dashboard/settings")}>
        Settings
      </a>
    </nav>
  );
}
```

Next.js-specific functionality can be imported from `@hookforge/nextjs`:

```tsx
"use client";

import { useNextActiveLink } from "@hookforge/nextjs";

export function Navigation() {
  const { isActive } = useNextActiveLink();

  return (
    <nav>
      <a href="/dashboard" {...isActive("/dashboard")}>
        Dashboard
      </a>

      <a href="/settings" {...isActive("/settings")}>
        Settings
      </a>
    </nav>
  );
}
```

## Monorepo

Hookforge uses a pnpm workspace to manage multiple packages from a single repository.

```text
hookforge/
├── packages/
│   ├── core/
│   │   ├── src/
│   │   ├── tests/
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── nextjs/
│       ├── src/
│       ├── tests/
│       ├── package.json
│       └── README.md
│
├── .github/
│   └── workflows/
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

Each package owns its:

* Source code
* Tests
* Build configuration
* Package metadata
* Type declarations
* README documentation
* Release lifecycle

Packages can therefore be built, tested, versioned, published, and deployed independently.

## Development

Clone the repository:

```bash
git clone https://github.com/zuxcode/hookforge.git
cd hookforge
```

Install dependencies:

```bash
pnpm install
```

### Type checking

```bash
pnpm lint:types
```

### Tests

```bash
pnpm test
```

Run tests in watch mode:

```bash
pnpm test:watch
```

Run tests with coverage:

```bash
pnpm test:coverage
```

### Code quality

Run Ultracite checks:

```bash
pnpm check
```

Automatically fix formatting and lint issues:

```bash
pnpm fix
```

### Build

Build all packages:

```bash
pnpm build
```

Build an individual package:

```bash
pnpm --filter @hookforge/core build
```

```bash
pnpm --filter @hookforge/nextjs build
```

### Test an individual package

```bash
pnpm --filter @hookforge/core test
```

```bash
pnpm --filter @hookforge/nextjs test
```

## Package Development

Because packages are independently publishable, package-specific commands can be executed through pnpm filters.

For example:

```bash
pnpm --filter @hookforge/core build
pnpm --filter @hookforge/core test
```

or:

```bash
pnpm --filter @hookforge/nextjs build
pnpm --filter @hookforge/nextjs test
```

This allows CI and release workflows to operate on individual packages without requiring every package to be deployed together.

## Build

Each package is responsible for producing its own distributable output.

A package build may contain:

```text
dist/
├── index.js
├── index.mjs
├── index.d.ts
└── *.map
```

The exact output format is defined by the individual package.

See the package README for package-specific build information.

## Code Quality

Hookforge uses [Ultracite](https://www.ultracite.dev/) for code quality and formatting.

Run:

```bash
pnpm check
```

Automatically fix issues:

```bash
pnpm fix
```

Git hooks are managed using Lefthook.

## Testing

Hookforge uses Jest and React Testing Library for testing React Hooks.

Run the complete test suite:

```bash
pnpm test
```

Generate coverage:

```bash
pnpm test:coverage
```

Individual packages can also be tested independently:

```bash
pnpm --filter @hookforge/core test
```

```bash
pnpm --filter @hookforge/nextjs test
```

## Contributing

Contributions, issues, feature requests, and pull requests are welcome.

Before submitting a pull request, make sure the relevant checks pass:

```bash
pnpm lint:types
pnpm check
pnpm test
pnpm build
```

For package-specific changes, also verify the affected package independently.

Please read [`CONTRIBUTING.md`](./CONTRIBUTING.md) for contribution guidelines.

## Releases

Hookforge packages are released independently.

A change to `@hookforge/core` does not require a new release of `@hookforge/nextjs`, unless the Next.js package is also affected.

Releases use [Semantic Release](https://semantic-release.gitbook.io/semantic-release/) and conventional commits.

Create a conventional commit with:

```bash
pnpm cz
```

Examples:

```bash
feat(core): add useDebounce hook
fix(core): correct active link matching
feat(nextjs): add useNextActiveLink
fix(nextjs): update router integration
docs(core): update hook documentation
test(core): add active link tests
refactor(nextjs): simplify router adapter
```

The package scope should identify the package affected by the change.

## Publishing

Each package is published independently to npm.

The release pipeline determines which packages have changed and publishes the corresponding package versions.

Packages should not be coupled to a single root-level npm release.

For package-specific publishing configuration, see the package's `package.json` and release configuration.

## License

Hookforge is released under the MIT License.

Copyright © 2026 Alfred Chigozie Nwanokwai.

See [`LICENSE`](./LICENSE) for details.

## Author

Created and maintained by **Alfred Chigozie Nwanokwai**.

* GitHub: https://github.com/zuxcode
* Repository: https://github.com/zuxcode/hookforge

## Contributors 

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/zuxcode"><img src="https://avatars.githubusercontent.com/u/91379753?v=4?s=100" width="100px;" alt="Alfred Nwanokwai"/><br /><sub><b>Alfred Nwanokwai</b></sub></a><br /><a href="https://github.com/zuxcode/hookforge/commits?author=zuxcode" title="Code">💻</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!