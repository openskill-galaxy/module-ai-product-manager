import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";

// 项目站点 module-ai-product-manager，部署在子路径 /module-ai-product-manager/，base 必须设置
export default defineConfig({
  base: "/module-ai-product-manager/",
  plugins: [react as unknown as PluginOption],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
