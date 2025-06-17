import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test:{
    globals: true, // Habilita o uso de APIs globais como `describe`, `it`, `expect`
    environment: "jsdom", // Define o ambiente de teste como JSDOM (para testes de componentes React)
    setupFiles: ['./src/setupTests/Setup.ts'], // Arquivo de configuração para o ambiente de teste (opcional)
    css: true, // Habilita o processamento de CSS em testes
  },
});
