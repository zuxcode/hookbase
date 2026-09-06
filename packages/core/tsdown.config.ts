import { defineConfig } from "tsdown";

export default defineConfig({
  dts: true,
  entry: [
    "src/index.ts",
    "src/presets-arktype.ts",
    "src/presets-zod.ts",
    "src/presets-valibot.ts",
  ],
  platform: "neutral",
  unbundle: true,
});
