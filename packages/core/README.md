# Hookbase-core

<h1 align="center">Hookbase-core</h1>

<p align="center">
  Framework-independent, type-safe React Hooks for modern React applications.
</p>

<p align="center">
  <a href="https://github.com/zuxcode/Hookbase">
    <img alt="Repository" src="https://img.shields.io/badge/repository-Hookbase-blue.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/Hookbase-core">
    <img alt="npm" src="https://img.shields.io/npm/v/Hookbase-core.svg?style=flat-square">
  </a>
  <a href="../../LICENSE">
    <img alt="License" src="https://img.shields.io/npm/l/Hookbase-core.svg?style=flat-square">
  </a>
</p>

## About

`Hookbase-core` is the framework-independent foundation of Hookbase.

It provides reusable, composable, and production-ready React Hooks without coupling the package to Next.js or another application framework.

Use `Hookbase-core` when you want Hookbase functionality in a React application regardless of the framework or build system.

## Installation

### pnpm

```bash
pnpm add Hookbase-core
```

### npm

```bash
npm install Hookbase-core
```

### yarn

```bash
yarn add Hookbase-core
```

## Usage

Import hooks directly from `Hookbase-core`:

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

## API

### `useActiveLink`

Determines whether a navigation link corresponds to the current pathname.

```tsx
const { isActive } = useActiveLink({
  pathname: "/dashboard/settings",
});
```

Use it with:

```tsx
<a href="/dashboard" {...isActive("/dashboard")}>
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
isActive("/dashboard");
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
isActive("/dashboard", {
  exact: true,
});
```

## Framework Independence

`Hookbase-core` does **not** depend on Next.js.

This makes it suitable for applications using:

* React
* Vite
* Create React App
* Other React-based build systems
* Custom React applications

Framework-specific functionality belongs in dedicated Hookbase integration packages.

For Next.js applications, see [`Hookbase-nextjs`](../nextjs).

## Development

From the Hookbase repository root:

```bash
pnpm install
```

Build the package:

```bash
pnpm --filter Hookbase-core build
```

Run tests:

```bash
pnpm --filter Hookbase-core test
```

Run type checking:

```bash
pnpm --filter Hookbase-core lint:types
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

`Hookbase-core` is independently versioned and published to npm.

Changes to the core package can be released without requiring a release of other Hookbase packages.

## Contributing

See the repository-level [`CONTRIBUTING.md`](../../CONTRIBUTING.md) for contribution guidelines.

## License

MIT © 2026 Alfred Chigozie Nwanokwai
