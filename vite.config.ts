import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { NodePackageImporter } from "sass-embedded";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        importers: [new NodePackageImporter()],
      },
    },
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
