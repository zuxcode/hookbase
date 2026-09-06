# hookbase-core

<h1 align="center">hookbase-core</h1>

<p align="center">
  Framework-independent, type-safe React Hooks for modern React applications.
</p>

<p align="center">
  <a href="https://github.com/zuxcode/hookbase">
    <img alt="Repository" src="https://img.shields.io/badge/repository-hookbase-blue.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/hookbase-core">
    <img alt="npm" src="https://img.shields.io/npm/v/hookbase-core.svg?style=flat-square">
  </a>
  <a href="../../LICENSE">
    <img alt="License" src="https://img.shields.io/npm/l/hookbase-core.svg?style=flat-square">
  </a>
</p>

## About

`hookbase-core` is the framework-independent foundation of hookbase.

It provides reusable, composable, and production-ready React Hooks without coupling the package to Next.js or another application framework.

Use `hookbase-core` when you want hookbase functionality in a React application regardless of the framework or build system.

## Installation

### pnpm

```bash
pnpm add hookbase-core
```

### npm

```bash
npm install hookbase-core
```

### yarn

```bash
yarn add hookbase-core
```

## Usage

Import hooks directly from `hookbase-core`:

```tsx
import { useActiveLink } from "hookbase-core";

function Navigation() {
  const { getActiveLinkProps } = useActiveLink({
    pathname: "/dashboard/settings",
  });

  return (
    <nav>
      <a href="/dashboard" {...getActiveLinkProps("/dashboard")}>
        Dashboard
      </a>

      <a href="/dashboard/settings" {...getActiveLinkProps("/dashboard/settings")}>
        Settings
      </a>
    </nav>
  );
}
```

## API

### `useActiveLink`

Determines whether a navigation link corresponds to the current pathname.

```tsx
const { getActiveLinkProps } = useActiveLink({
  pathname: "/dashboard/settings",
});
```

Use it with:

```tsx
<a href="/dashboard" {...getActiveLinkProps("/dashboard")}>
  Dashboard
</a>
```

An active link produces attributes such as:

```html
<a
  href="/dashboard"
  aria-current="page"
  data-active
>
  Dashboard
</a>
```

### Nested paths

By default, nested paths are considered active.

```tsx
getActiveLinkProps("/dashboard");
```

matches:

```text
/dashboard
/dashboard/settings
/dashboard/profile
```

### Exact matching

Use `exact` when only the specified pathname should match:

```tsx
getActiveLinkProps("/dashboard", {
  exact: true,
});
```

## Framework Independence

`hookbase-core` does **not** depend on Next.js.

This makes it suitable for applications using:

* React
* Vite
* Create React App
* Other React-based build systems
* Custom React applications

Framework-specific functionality belongs in dedicated hookbase integration packages.

For Next.js applications, see [`hookbase-nextjs`](../nextjs).

## Development

From the hookbase repository root:

```bash
pnpm install
```

Build the package:

```bash
pnpm --filter hookbase-core build
```

Run tests:

```bash
pnpm --filter hookbase-core test
```

Run type checking:

```bash
pnpm --filter hookbase-core lint:types
```

## Package Structure

```text
packages/core/
├── src/
├── tests/
├── package.json
├── tsconfig.json
└── README.md
```

## Publishing

`hookbase-core` is independently versioned and published to npm.

Changes to the core package can be released without requiring a release of other hookbase packages.

## Contributing

See the repository-level [`CONTRIBUTING.md`](../../CONTRIBUTING.md) for contribution guidelines.

## License

MIT © 2026 Alfred Chigozie Nwanokwai
