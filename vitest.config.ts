import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],

  test: {
    globals: true,

    projects: [
      {
        test: {
          name: "unit",
          include: ['src/use-cases/**/*.spec.ts'],
          environment: 'node',
        },
      },
      {
        test: {
          name: "e2e",  
          include: ['src/http/controllers/**/*.spec.ts'],
          environment: 'node',
          testTimeout: 10000,
        },
      },
       defineConfig({
      test: {
        name: "all",
        include: ["src/**/*.spec.ts"],
        environment: "node",
      },
    }),
    ],
  },
})
