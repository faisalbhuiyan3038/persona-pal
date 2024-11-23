import { PrismaClient } from "@prisma/client";

//to fix prisma not available as global object
declare global {
  var prisma: PrismaClient | undefined;
};

//to fix next hot reloading causing issues with prisma init
const prismadb = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') global.prisma = prismadb;

export default prismadb;
