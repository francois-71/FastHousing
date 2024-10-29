import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

prisma.$connect().catch((e) => {
  console.error(e);
  process.exit(1);
});

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
