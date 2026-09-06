/** biome-ignore-all lint/correctness/noUndeclaredVariables: <Global> */
const packages = ["core", "nextjs"];

const commitHash = (await Bun.$`git rev-parse --short HEAD`.text()).trim();

const publishPackage = async (pkg: string) => {
  const packagePath = `packages/${pkg}/package.json`;
  const jsrPath = `packages/${pkg}/jsr.json`;

  const [pkgJson, jsrJson] = await Promise.all([
    Bun.file(packagePath).json(),
    Bun.file(jsrPath).json(),
  ]);

  const oldVersion = pkgJson.version;

  const [major, minor, patch] = oldVersion.split(".").map(Number);

  const newVersion = `${major}.${minor}.${patch + 1}-canary.${commitHash}`;

  pkgJson.version = newVersion;
  jsrJson.version = newVersion;

  const content = `${JSON.stringify(pkgJson, null, "\t")}\n`;

  const newContent = content.replace(
    new RegExp(`"@hookbase/\\*": "${oldVersion}"`, "g"),
    `"@hookbase/*": "${newVersion}"`
  );

  await Promise.all([
    Bun.write(packagePath, newContent),
    Bun.write(jsrPath, `${JSON.stringify(jsrJson, null, 2)}\n`),
  ]);

  /**
   * Run prepack (if exists)
   */
  if (pkgJson.scripts?.prepack) {
    await Bun.$`bun run prepack`.cwd(`packages/${pkg}`);
  }

  /**
   * Publish to NPM
   */
  await Bun.$`npm publish --access public --tag canary`.cwd(`packages/${pkg}`);

  /**
   * Publish to JSR
   */
  await Bun.$`bunx jsr publish --allow-dirty`.cwd(`packages/${pkg}`);
};

await Promise.all(packages.map(publishPackage));

export {};
