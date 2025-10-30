import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import env from 'dotenv'
env.config();

const PORT = Number(process.env.PORT) || 2000; // Define 2000 como valor padrão caso não esteja no .env

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',  // Permite o acesso via rede local
    port: PORT,        // Usando a porta definida no arquivo .env ou 2000 por padrão
  }
})
