# Contributing to Hookforge

Thank you for contributing to Hookforge! Hookforge is a TypeScript-first monorepo for reusable, composable, production-ready React Hooks, with a framework-independent core and dedicated framework integrations.

## Repository architecture

Hookforge currently contains these workspaces:

| Package | Purpose | Publish status |
| --- | --- | --- |
| `@hookforge/core` | Framework-independent React Hooks | Publishable |
| `@hookforge/nextjs` | Next.js-specific React Hooks and adapters | Publishable |
| `@hookforge/typescript-config` | Shared TypeScript configuration | Private |

The dependency direction is intentional:

```text
@hookforge/nextjs
        │
        ▼
@hookforge/core
```

`@hookforge/core` must never depend on Next.js.

Each publishable package owns its source, tests, build configuration, metadata, declarations, README, and release lifecycle.

## Getting started

### Requirements

Use the Node.js and pnpm versions declared by the repository configuration.

Clone the repository:

```bash
git clone https://github.com/zuxcode/hookforge.git
cd hookforge
```

Install dependencies:

```bash
pnpm install
```

Verify the workspace:

```bash
pnpm list -r --depth -1
```

## Development commands

Run repository-wide checks before opening a pull request:

```bash
pnpm lint:types
pnpm check
pnpm test
pnpm build
```

Additional test commands:

```bash
pnpm test:watch
pnpm test:coverage
```

Automatically fix supported formatting/lint issues:

```bash
pnpm fix
```

Generate a conventional commit:

```bash
pnpm cz
```

## Working on a package

Use pnpm filters for focused development.

### Core

```bash
pnpm --filter @hookforge/core build
pnpm --filter @hookforge/core test
```

### Next.js

```bash
pnpm --filter @hookforge/nextjs build
pnpm --filter @hookforge/nextjs test
```

When changing a shared or cross-package API, run the complete repository checks as well.

## Adding a hook

Before implementing a substantial new hook, open a proposal so the API can be discussed.

A new hook should:

- Solve a clear, reusable problem.
- Follow React's Rules of Hooks.
- Have a small, predictable API.
- Be fully typed.
- Include meaningful tests.
- Include package-level documentation.
- Consider React Strict Mode where effects are involved.
- Consider SSR and hydration where browser APIs are involved.
- Avoid unnecessary dependencies.

### Choose the correct package

Put a hook in `@hookforge/core` when it is framework-independent.

Put a hook in `@hookforge/nextjs` when it directly depends on Next.js APIs or Next.js runtime behavior.

Do not introduce a Next.js dependency into `@hookforge/core`.

## SSR and Next.js compatibility

For browser-dependent hooks, explicitly consider:

- `window`, `document`, `localStorage`, `navigator`, and other browser globals.
- Server rendering where those globals do not exist.
- Hydration mismatches.
- Effect cleanup.
- React Strict Mode.
- Client Component boundaries.
- `"use client"` requirements for Next.js entry points.
- Router APIs and other Next.js-specific runtime behavior.

Do not access browser-only APIs at module evaluation time unless the package design explicitly guarantees a browser-only environment.

## Public APIs

A public hook must be exported through the package's public entry point.

Do not rely on internal implementation paths from consumers or other packages when a public export exists.

For public API changes:

1. Update the implementation.
2. Update exports.
3. Add/update tests.
4. Update the package README.
5. Verify TypeScript declarations/build output.
6. Consider whether the change is breaking.

## Tests

Hookforge uses Jest and React Testing Library.

Tests should cover the behavior that matters to users, including where applicable:

- Initial state.
- Rerenders.
- State transitions.
- Effects and cleanup.
- Event listeners/subscriptions.
- Edge cases.
- Error behavior.
- SSR/non-browser behavior.
- Strict Mode behavior.
- Type-level API expectations.

Run:

```bash
pnpm test
pnpm test:coverage
```

## Code quality

Hookforge uses Ultracite for code quality and formatting, with Lefthook managing Git hooks.

Run checks:

```bash
pnpm check
```

Fix supported issues:

```bash
pnpm fix
```

Type-check:

```bash
pnpm lint:types
```

Avoid unrelated formatting or refactoring in focused pull requests.

## Documentation

Every publishable package should keep its README aligned with its implementation.

For a new or changed hook, update the relevant package README with:

- Import path.
- Purpose.
- Basic usage.
- API/options.
- Return value.
- Important behavior and caveats.
- SSR/Next.js notes where applicable.

Keep examples TypeScript/TSX and copy-paste friendly.

## Branches

Create a focused branch from the repository's default branch.

Recommended prefixes:

```text
feat/
fix/
docs/
test/
refactor/
perf/
chore/
```

Examples:

```bash
git checkout -b feat/use-debounce
git checkout -b fix/core-active-link
git checkout -b feat/nextjs-router-state
```

## Commits

Hookforge uses Conventional Commits and package scopes.

Examples:

```text
feat(core): add useDebounce hook
fix(core): correct active link matching
feat(nextjs): add useNextActiveLink
fix(nextjs): update router integration
docs(core): update hook documentation
test(core): add active link tests
refactor(nextjs): simplify router adapter
chore: update dependencies
```

The scope should identify the affected package when practical:

- `core`
- `nextjs`

Use:

```bash
pnpm cz
```

for the repository's commit workflow.

## Pull requests

Keep PRs focused on one logical change.

Before submitting:

- [ ] `pnpm lint:types` passes.
- [ ] `pnpm check` passes.
- [ ] `pnpm test` passes.
- [ ] `pnpm build` passes.
- [ ] Affected package tests pass independently.
- [ ] Public API changes are documented.
- [ ] New hooks have tests.
- [ ] New hooks have package documentation.
- [ ] SSR/Next.js behavior was considered where relevant.
- [ ] No secrets or local configuration were committed.
- [ ] Breaking changes are clearly described.

If your PR changes only documentation or another area where a check is not applicable, explain that in the PR.

## Breaking changes

Clearly document:

- Existing API/behavior.
- New API/behavior.
- Migration steps.
- Reason for the change.

Do not silently change a public API.

## Releases

Hookforge packages are released independently using Semantic Release and Conventional Commits.

A change to `@hookforge/core` does not automatically require a release of `@hookforge/nextjs` unless the Next.js package is also affected.

Do not manually couple package versions or create a root-level release for all packages unless the release configuration requires it.

## Security

Do not report security vulnerabilities in public issues. See `SECURITY.md`.

## Code of Conduct

Participation in Hookforge is governed by `CODE_OF_CONDUCT.md`.

## Questions and proposals

Use GitHub Issues for actionable bugs and feature/hook proposals. When available, use Discussions for general questions and community conversation.

Thanks for helping build Hookforge!
