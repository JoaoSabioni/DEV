import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    // O '!' garante ao TS que a variável existe no ambiente (Foto 22)
    url: process.env.DATABASE_URL!,
  },
});