import { defineConfig } from "astro/config";

export default defineConfig({
  vite: {
    assetsInclude: ["**/*.svg"], // Asegura que Vite no intente procesarlos como módulos
    build: {
      rollupOptions: {
        external: ["**/*.svg"], // Evita que se compile como un módulo JS
      },
    },
  },
});
