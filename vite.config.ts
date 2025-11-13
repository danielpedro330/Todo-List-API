import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
        projects: [
            {
                test : {
                    include: ['src/http/controllers/**/*.spec.ts'],
                    environment: 'node', 
                }
            }
        ]
    },
});