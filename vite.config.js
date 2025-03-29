import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Existiert bereits
      "@c": path.resolve(__dirname, "./src/Components"),
      "@ui": path.resolve(__dirname, "src/Components/ui"), // Hier den Alias für @ui hinzufügen
    },
  },
});
