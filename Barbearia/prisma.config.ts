import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    // A exclamação '!' garante ao TypeScript que a variável existe
    url: process.env.DATABASE_URL!,
  },
});