import { defineConfig } from 'vite';

// Dev: every .html under the project root is served (e.g. /sandbox/render.html).
// Build: the game (index.html) and the booth second screen (hall.html) ship;
// sandboxes are dev-only tools.
export default defineConfig({
  base: './',
  server: { host: 'localhost', port: 5173 },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 4000,
    rolldownOptions: {
      input: { main: 'index.html', hall: 'hall.html' },
    },
  },
});
