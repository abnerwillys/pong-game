import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    coverage: {
      reportsDirectory: "./coverage",
      reporter: ["text", "html"],
      all: true,
      include: ["src/**/*.{ts,tsx}"], // 👈 ensure it's included here
      exclude: ["**/*.test.ts", "**/*.test.tsx", "node_modules/**"],
    },
  },
});
