# hookbase-nextjs

<h1 align="center">hookbase-nextjs</h1>

<p align="center">
  Type-safe React Hooks and adapters for Next.js applications.
</p>

<p align="center">
  <a href="https://github.com/zuxcode/hookbase">
    <img alt="Repository" src="https://img.shields.io/badge/repository-hookbase-blue.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/hookbase-nextjs">
    <img alt="npm" src="https://img.shields.io/npm/v/hookbase-nextjs.svg?style=flat-square">
  </a>
  <a href="../../LICENSE">
    <img alt="License" src="https://img.shields.io/npm/l/hookbase-nextjs.svg?style=flat-square">
  </a>
</p>

## About

`hookbase-nextjs` provides Next.js-specific hooks and adapters for hookbase.

It is designed to integrate hookbase with Next.js APIs while keeping the framework-independent functionality in [`hookbase-core`](../core).

The package is intended for applications using modern Next.js and React.

## Installation

Install both the Next.js integration and its core dependency:

### pnpm

```bash
pnpm add hookbase-nextjs
```

### npm

```bash
npm install hookbase-nextjs
```

### yarn

```bash
yarn add hookbase-nextjs
```

## Usage

Next.js-specific hooks can be imported from `hookbase-nextjs`.

For example:

```tsx
"use client";

import { useNextActiveLink } from "hookbase-nextjs";

export function Navigation() {
  const { getActiveLinkProps } = useNextActiveLink();

  return (
    <nav>
      <a href="/dashboard" {...getActiveLinkProps("/dashboard")}>
        Dashboard
      </a>

      <a href="/settings" {...getActiveLinkProps("/settings")}>
        Settings
      </a>
    </nav>
  );
}
```

## Client Components

Hooks that use Next.js client-side APIs must be used from a Client Component.

Add:

```tsx
"use client";
```

to the component when required.

For example:

```tsx
"use client";

import { useNextActiveLink } from "hookbase-nextjs";

export function Navigation() {
  const { getActiveLinkProps } = useNextActiveLink();

  // ...
}
```

## API

### `useNextActiveLink`

Provides active-link behavior using the current Next.js pathname.

```tsx
"use client";

import { useNextActiveLink } from "hookbase-nextjs";

const { getActiveLinkProps } = useNextActiveLink();
```

Use it with:

```tsx
<a href="/dashboard" {...getActiveLinkProps("/dashboard")}>
  Dashboard
</a>
```

### Exact matching

Nested routes can be matched by default:

```tsx
getActiveLinkProps("/dashboard");
```

For exact matching:

```tsx
getActiveLinkProps("/dashboard", {
  exact: true,
});
```

## Relationship with `hookbase-core`

The package architecture separates framework-independent logic from Next.js-specific APIs.

```text
hookbase-nextjs
        │
        ▼
hookbase-core
```

`hookbase-nextjs` may depend on `hookbase-core`.

`hookbase-core` does not depend on `hookbase-nextjs` or Next.js.

This allows the core package to remain usable outside Next.js while providing a dedicated integration for Next.js applications.

## Development

From the hookbase repository root:

```bash
pnpm install
```

Build the package:

```bash
pnpm --filter hookbase-nextjs build
```

Run tests:

```bash
pnpm --filter hookbase-nextjs test
```

Run type checking:

```bash
pnpm --filter hookbase-nextjs lint:types
```

## Package Structure

```text
packages/nextjs/
├── src/
├── tests/
├── package.json
├── tsconfig.json
└── README.md
```

## Publishing

`hookbase-nextjs` is independently versioned and published to npm.

A change to `hookbase-nextjs` does not require a new `hookbase-core` release unless the core package itself has changed.

## Contributing

See the repository-level [`CONTRIBUTING.md`](../../CONTRIBUTING.md) for contribution guidelines.

## License

MIT © 2026 Alfred Chigozie Nwanokwai
