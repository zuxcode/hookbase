# hookforge-nextjs

<h1 align="center">hookforge-nextjs</h1>

<p align="center">
  Type-safe React Hooks and adapters for Next.js applications.
</p>

<p align="center">
  <a href="https://github.com/zuxcode/hookforge">
    <img alt="Repository" src="https://img.shields.io/badge/repository-Hookforge-blue.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/hookforge-nextjs">
    <img alt="npm" src="https://img.shields.io/npm/v/hookforge-nextjs.svg?style=flat-square">
  </a>
  <a href="../../LICENSE">
    <img alt="License" src="https://img.shields.io/npm/l/hookforge-nextjs.svg?style=flat-square">
  </a>
</p>

## About

`hookforge-nextjs` provides Next.js-specific hooks and adapters for Hookforge.

It is designed to integrate Hookforge with Next.js APIs while keeping the framework-independent functionality in [`hookforge-core`](../core).

The package is intended for applications using modern Next.js and React.

## Installation

Install both the Next.js integration and its core dependency:

### pnpm

```bash
pnpm add hookforge-nextjs
```

### npm

```bash
npm install hookforge-nextjs
```

### yarn

```bash
yarn add hookforge-nextjs
```

## Usage

Next.js-specific hooks can be imported from `hookforge-nextjs`.

For example:

```tsx
"use client";

import { useNextActiveLink } from "hookforge-nextjs";

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

import { useNextActiveLink } from "hookforge-nextjs";

export function Navigation() {
  const { isActive } = useNextActiveLink();

  // ...
}
```

## API

### `useNextActiveLink`

Provides active-link behavior using the current Next.js pathname.

```tsx
"use client";

import { useNextActiveLink } from "hookforge-nextjs";

const { isActive } = useNextActiveLink();
```

Use it with:

```tsx
<a href="/dashboard" {...isActive("/dashboard")}>
  Dashboard
</a>
```

### Exact matching

Nested routes can be matched by default:

```tsx
isActive("/dashboard");
```

For exact matching:

```tsx
isActive("/dashboard", {
  exact: true,
});
```

## Relationship with `hookforge-core`

The package architecture separates framework-independent logic from Next.js-specific APIs.

```text
hookforge-nextjs
        │
        ▼
hookforge-core
```

`hookforge-nextjs` may depend on `hookforge-core`.

`hookforge-core` does not depend on `hookforge-nextjs` or Next.js.

This allows the core package to remain usable outside Next.js while providing a dedicated integration for Next.js applications.

## Development

From the Hookforge repository root:

```bash
pnpm install
```

Build the package:

```bash
pnpm --filter hookforge-nextjs build
```

Run tests:

```bash
pnpm --filter hookforge-nextjs test
```

Run type checking:

```bash
pnpm --filter hookforge-nextjs lint:types
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

`hookforge-nextjs` is independently versioned and published to npm.

A change to `hookforge-nextjs` does not require a new `hookforge-core` release unless the core package itself has changed.

## Contributing

See the repository-level [`CONTRIBUTING.md`](../../CONTRIBUTING.md) for contribution guidelines.

## License

MIT © 2026 Alfred Chigozie Nwanokwai
