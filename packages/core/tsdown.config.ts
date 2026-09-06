import { defineConfig } from "tsdown";

export default defineConfig({
  dts: true,
  entry: ["src/**/*.ts", "src/**/*.tsx"],
  platform: "neutral",
  unbundle: true,
});
