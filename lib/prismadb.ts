import { PrismaClient } from "@prisma/client";

//to fix prisma not available as global object
declare global {
  let prisma: PrismaClient | undefined;
};

//to fix next hot reloading causing issues with prisma init
const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismadb;

export default prismadb;
