# @hookforge/core

<h1 align="center">@hookforge/core</h1>

<p align="center">
  Framework-independent, type-safe React Hooks for modern React applications.
</p>

<p align="center">
  <a href="https://github.com/zuxcode/hookforge">
    <img alt="Repository" src="https://img.shields.io/badge/repository-Hookforge-blue.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/@hookforge/core">
    <img alt="npm" src="https://img.shields.io/npm/v/@hookforge/core.svg?style=flat-square">
  </a>
  <a href="../../LICENSE">
    <img alt="License" src="https://img.shields.io/npm/l/@hookforge/core.svg?style=flat-square">
  </a>
</p>

## About

`@hookforge/core` is the framework-independent foundation of Hookforge.

It provides reusable, composable, and production-ready React Hooks without coupling the package to Next.js or another application framework.

Use `@hookforge/core` when you want Hookforge functionality in a React application regardless of the framework or build system.

## Installation

### pnpm

```bash
pnpm add @hookforge/core
```

### npm

```bash
npm install @hookforge/core
```

### yarn

```bash
yarn add @hookforge/core
```

## Usage

Import hooks directly from `@hookforge/core`:

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

`@hookforge/core` does **not** depend on Next.js.

This makes it suitable for applications using:

* React
* Vite
* Create React App
* Other React-based build systems
* Custom React applications

Framework-specific functionality belongs in dedicated Hookforge integration packages.

For Next.js applications, see [`@hookforge/nextjs`](../nextjs).

## Development

From the Hookforge repository root:

```bash
pnpm install
```

Build the package:

```bash
pnpm --filter @hookforge/core build
```

Run tests:

```bash
pnpm --filter @hookforge/core test
```

Run type checking:

```bash
pnpm --filter @hookforge/core lint:types
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

`@hookforge/core` is independently versioned and published to npm.

Changes to the core package can be released without requiring a release of other Hookforge packages.

## Contributing

See the repository-level [`CONTRIBUTING.md`](../../CONTRIBUTING.md) for contribution guidelines.

## License

MIT © 2026 Alfred Chigozie Nwanokwai
