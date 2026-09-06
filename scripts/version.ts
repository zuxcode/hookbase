/**
 * Sync package versions to JSR after running Changesets.
 */
/** biome-ignore-all lint/correctness/noUndeclaredVariables: <Global bun> */

const packages = ["core", "nextjs"];

/**
 * 1. Apply Changesets and bump package versions.
 */
await Bun.$`bunx changeset version`;

/**
 * 2. Sync the JSR versions with package.json.
 */

await Promise.all(
  packages.map(async (pkg) => {
    const packagePath = `packages/${pkg}/package.json`;
    const jsrPath = `packages/${pkg}/jsr.json`;

    const [pkgJson, jsrJson] = await Promise.all([
      Bun.file(packagePath).json(),
      Bun.file(jsrPath).json(),
    ]);

    jsrJson.version = pkgJson.version;

    await Bun.write(jsrPath, JSON.stringify(jsrJson, null, 2));
  })
);

export {};
