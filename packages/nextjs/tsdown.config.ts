import { defineConfig } from "tsdown";

export default defineConfig({
  dts: true,
  entry: ["src/hooks/**/*.ts"],
  platform: "neutral",
  unbundle: true,
});
