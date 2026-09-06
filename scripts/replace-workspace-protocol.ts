/**
 * Hack to replace the workspace protocol with the actual version
 */
/** biome-ignore-all lint/correctness/noUndeclaredVariables: <Global> */
const corePkg = await Bun.file("../core/package.json").json();
const { version } = corePkg;

const workspacePkg = await Bun.file("package.json").json();
workspacePkg.dependencies["Hookbase-core"] = version;
await Bun.write("package.json", JSON.stringify(workspacePkg, null, 2));

export {};
