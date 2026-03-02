import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error"], // Apenas erros para manter os logs limpos e otimizados
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;