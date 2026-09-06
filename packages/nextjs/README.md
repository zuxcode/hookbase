# Hookbase-nextjs

<h1 align="center">Hookbase-nextjs</h1>

<p align="center">
  Type-safe React Hooks and adapters for Next.js applications.
</p>

<p align="center">
  <a href="https://github.com/zuxcode/Hookbase">
    <img alt="Repository" src="https://img.shields.io/badge/repository-Hookbase-blue.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/Hookbase-nextjs">
    <img alt="npm" src="https://img.shields.io/npm/v/Hookbase-nextjs.svg?style=flat-square">
  </a>
  <a href="../../LICENSE">
    <img alt="License" src="https://img.shields.io/npm/l/Hookbase-nextjs.svg?style=flat-square">
  </a>
</p>

## About

`Hookbase-nextjs` provides Next.js-specific hooks and adapters for Hookbase.

It is designed to integrate Hookbase with Next.js APIs while keeping the framework-independent functionality in [`Hookbase-core`](../core).

The package is intended for applications using modern Next.js and React.

## Installation

Install both the Next.js integration and its core dependency:

### pnpm

```bash
pnpm add Hookbase-nextjs
```

### npm

```bash
npm install Hookbase-nextjs
```

### yarn

```bash
yarn add Hookbase-nextjs
```

## Usage

Next.js-specific hooks can be imported from `Hookbase-nextjs`.

For example:

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

import { useNextActiveLink } from "Hookbase-nextjs";

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

import { useNextActiveLink } from "Hookbase-nextjs";

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

## Relationship with `Hookbase-core`

The package architecture separates framework-independent logic from Next.js-specific APIs.

```text
Hookbase-nextjs
        │
        ▼
Hookbase-core
```

`Hookbase-nextjs` may depend on `Hookbase-core`.

`Hookbase-core` does not depend on `Hookbase-nextjs` or Next.js.

This allows the core package to remain usable outside Next.js while providing a dedicated integration for Next.js applications.

## Development

From the Hookbase repository root:

```bash
pnpm install
```

Build the package:

```bash
pnpm --filter Hookbase-nextjs build
```

Run tests:

```bash
pnpm --filter Hookbase-nextjs test
```

Run type checking:

```bash
pnpm --filter Hookbase-nextjs lint:types
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

`Hookbase-nextjs` is independently versioned and published to npm.

A change to `Hookbase-nextjs` does not require a new `Hookbase-core` release unless the core package itself has changed.

## Contributing

See the repository-level [`CONTRIBUTING.md`](../../CONTRIBUTING.md) for contribution guidelines.

## License

MIT © 2026 Alfred Chigozie Nwanokwai
