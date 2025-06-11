// vite.config.ts

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',

    coverage: {
      provider: 'v8', // Define o provedor de coverage. 'v8' é rápido e recomendado.
      reporter: ['text', 'html'], // Gera o relatório no terminal e em uma página HTML
      all: true, // Inclui todos os arquivos no relatório, mesmo os não testados (para vermos o que falta)

      // Define quais arquivos devem ser incluídos no relatório
      include: ['src/**/*.{ts,tsx}'],

      // Define quais arquivos e pastas devem ser IGNORADOS pelo relatório
      exclude: [
        'coverage/**', // Ignora a própria pasta de coverage
        'dist/**',
        'vite.config.ts', // Ignora arquivos de configuração
        
        // --- ARQUIVOS DA APLICAÇÃO A SEREM IGNORADOS ---
        'src/main.tsx', // Ignora o ponto de entrada da aplicação
        'src/vite-env.d.ts',
        'src/styles/**', // Ignora a pasta de estilos globais
        'src/types/**', // Ignora a pasta de definições de tipos
        'src/mocks/**', // Ignora a pasta de mocks
        
        // --- PADRÕES DE ARQUIVOS A SEREM IGNORADOS ---
        'src/**/styles.ts', // Ignora qualquer arquivo chamado styles.ts
        'src/**/styled.ts', // Ignora qualquer arquivo chamado styled.ts
        'src/**/*.test.{ts,tsx}', // Ignora todos os arquivos de teste
      ],
    },
  },
});