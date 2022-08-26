import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedYoga = async () => {
  await prisma.yoga.createMany({
    data: [
      {
        name: "Downward Dog Pose",
        youtubeLink:
          "https://www.youtube-nocookie.com/embed/lZL7oh2lOgE",
        description:
          "Downward Dog Pose or Downward-facing Dog Pose, also called Adho Mukha Shvanasana, is an inversion asana, often practised as part of a flowing sequence of poses, especially Surya Namaskar, the Salute to the Sun. The asana is commonly used in modern yoga as exercise.",
        ageGroup: "Preschool",
        modelLink:
          "https://teachablemachine.withgoogle.com/models/ljpcXxTz1/",
      },
      {
        name: "Butterfly Pose",
        youtubeLink:
          "https://www.youtube-nocookie.com/embed/hRcvSEtoecg?start=16",
        description:
          "Butterfly Pose is suitable for all levels, so it’s a useful addition to most yoga routines. Because the posture improves flexibility and reduces tension",
        ageGroup: "Preteen",
        modelLink:
          "https://teachablemachine.withgoogle.com/models/wRVL7Bj4u/",
      },
      {
        name: "Cobra Pose",
        youtubeLink:
          "https://www.youtube-nocookie.com/embed/-HgeZztTSec",
        description: "This is Cobra yoga pose",
        ageGroup: "Teen",
        modelLink:
          "https://teachablemachine.withgoogle.com/models/yKMXeNB9V/",
      },
    ],
  });
};

seedYoga().then(() => {
  console.log(`Added`);
});
