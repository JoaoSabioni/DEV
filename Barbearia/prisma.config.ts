import { defineConfig } from '@prisma/config';

export default defineConfig({
  // Foto 21: O schema tem de ser uma string direta
  schema: './prisma/schema.prisma',
  datasource: {
    // Foto 22: O '!' garante que a URL não é undefined
    url: process.env.DATABASE_URL!,
  },
});