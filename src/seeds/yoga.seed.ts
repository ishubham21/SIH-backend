import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedYoga = async () => {
  await prisma.yoga.createMany({
    data: [
      {
        name: "Yoga-1",
        youtubeLink: "https://random.com",
        description: "Yoga",
        ageGroup: "Preschool",
        modelLink: "https://random.com",
      },
      {
        name: "Yoga-2",
        youtubeLink: "https://random.com",
        description: "Yoga",
        ageGroup: "Preteen",
        modelLink: "https://random.com",
      },
      {
        name: "Yoga-3",
        youtubeLink: "https://random.com",
        description: "Yoga",
        ageGroup: "Teen",
        modelLink: "https://random.com",
      },
    ],
  });
};

seedYoga().then(() => {
  console.log(`Added`);
});
