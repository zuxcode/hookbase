# Hookbase
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<h1 align="center">Hookbase</h1>

<p align="center">
  A modern, type-safe React Hooks library for React and Next.js.
</p>

<p align="center">
  <a href="https://github.com/zuxcode/Hookbase/blob/master/LICENSE">
    <img alt="License" src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square">
  </a>
  <a href="https://github.com/zuxcode/Hookbase/actions">
    <img alt="CI" src="https://github.com/zuxcode/Hookbase/actions/workflows/ci.yml/badge.svg">
  </a>
  <a href="https://www.npmjs.com/search?q=Hookbase">
    <img alt="npm" src="https://img.shields.io/badge/npm-Hookbase-red.svg?style=flat-square">
  </a>
  <a href="https://github.com/zuxcode/Hookbase/pulls">
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-green.svg?style=flat-square">
  </a>
</p>

## About

**Hookbase** is a TypeScript-first monorepo for reusable, composable, and production-ready React Hooks.

The project is designed around a framework-independent core with dedicated framework integrations.

The core hooks remain independent of Next.js and other frameworks, while framework-specific functionality lives in separate packages.

## Packages

Hookbase is organized into independently buildable, testable, and publishable packages.

| Package                                  | Description                               |
| ---------------------------------------- | ----------------------------------------- |
| [`Hookbase-core`](./packages/core)     | Framework-independent React Hooks         |
| [`Hookbase-nextjs`](./packages/nextjs) | Next.js-specific React Hooks and adapters |

### `Hookbase-core`

The core package contains reusable React Hooks that do not depend on Next.js.

```bash
pnpm add Hookbase-core
```

Use it when building React applications that need framework-independent hooks.

See [`packages/core/README.md`](./packages/core/README.md) for the complete API and usage documentation.

### `Hookbase-nextjs`

The Next.js package contains hooks and adapters that integrate Hookbase with Next.js APIs.

```bash
pnpm add Hookbase-nextjs
```

It may depend on `Hookbase-core`, but the core package never depends on Next.js.

See [`packages/nextjs/README.md`](./packages/nextjs/README.md) for the complete API and usage documentation.

## Architecture

Hookbase follows a layered package architecture:

```text
┌──────────────────────────────┐
│       Hookbase-nextjs      │
│                              │
│ Next.js-specific hooks and   │
│ framework integrations       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│        Hookbase-core       │
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
pnpm add Hookbase-core
```

### Next.js

```bash
pnpm add Hookbase-nextjs
```

## Usage

Core hooks can be imported from `Hookbase-core`:

```tsx
import { useActiveLink } from "Hookbase-core";

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

Next.js-specific functionality can be imported from `Hookbase-nextjs`:

```tsx
"use client";

import { useNextActiveLink } from "Hookbase-nextjs";

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

Hookbase uses a pnpm workspace to manage multiple packages from a single repository.

```text
Hookbase/
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
git clone https://github.com/zuxcode/Hookbase.git
cd Hookbase
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
pnpm --filter Hookbase-core build
```

```bash
pnpm --filter Hookbase-nextjs build
```

### Test an individual package

```bash
pnpm --filter Hookbase-core test
```

```bash
pnpm --filter Hookbase-nextjs test
```

## Package Development

Because packages are independently publishable, package-specific commands can be executed through pnpm filters.

For example:

```bash
pnpm --filter Hookbase-core build
pnpm --filter Hookbase-core test
```

or:

```bash
pnpm --filter Hookbase-nextjs build
pnpm --filter Hookbase-nextjs test
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

Hookbase uses [Ultracite](https://www.ultracite.dev/) for code quality and formatting.

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

Hookbase uses Jest and React Testing Library for testing React Hooks.

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
pnpm --filter Hookbase-core test
```

```bash
pnpm --filter Hookbase-nextjs test
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

Hookbase packages are released independently.

A change to `Hookbase-core` does not require a new release of `Hookbase-nextjs`, unless the Next.js package is also affected.

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

Hookbase is released under the MIT License.

Copyright © 2026 Alfred Chigozie Nwanokwai.

See [`LICENSE`](./LICENSE) for details.

## Author

Created and maintained by **Alfred Chigozie Nwanokwai**.

* GitHub: https://github.com/zuxcode
* Repository: https://github.com/zuxcode/Hookbase

## Contributors 

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/zuxcode"><img src="https://avatars.githubusercontent.com/u/91379753?v=4?s=100" width="100px;" alt="Alfred Chigozie Nwanokwai"/><br /><sub><b>Alfred Chigozie Nwanokwai</b></sub></a><br /><a href="https://github.com/zuxcode/Hookbase/commits?author=zuxcode" title="Code">💻</a> <a href="#ideas-zuxcode" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-zuxcode" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-zuxcode" title="Maintenance">🚧</a> <a href="https://github.com/zuxcode/Hookbase/commits?author=zuxcode" title="Documentation">📖</a> <a href="#design-zuxcode" title="Design">🎨</a> <a href="#projectManagement-zuxcode" title="Project Management">📆</a> <a href="https://github.com/zuxcode/Hookbase/commits?author=zuxcode" title="Tests">⚠️</a></td>
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