/** biome-ignore-all lint/correctness/noUndeclaredVariables: <Global> */
const packages = ["core", "nextjs"];

/**
 * 1. Publish to NPM
 */
await Bun.$`bunx changeset publish`;

/**
 * 2. Prepare and publish each package to JSR
 */
const publishPackage = async (pkg: string) => {
  const packagePath = `packages/${pkg}/package.json`;
  const pkgJson = await Bun.file(packagePath).json();

  /**
   * Run prepack (if exists)
   */
  if (pkgJson.scripts?.prepack) {
    await Bun.$`bun run prepack`.cwd(`packages/${pkg}`);
  }

  /**
   * Publish to JSR
   */
  await Bun.$`bunx jsr publish --allow-dirty`.cwd(`packages/${pkg}`);
};

await Promise.all(packages.map(publishPackage));

export {};
