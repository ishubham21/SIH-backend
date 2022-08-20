import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const func = async () => {
  const yoga = await prisma.yoga.findMany({});
  console.log(yoga);
};

func();
