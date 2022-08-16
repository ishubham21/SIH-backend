import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const func = async () => {
  const tasks = await prisma.cognitiveTask.findMany({
    where: {
      ageGroup: "PreSchool",
    },
  });

  const availableTasksId = tasks.map((task) => task.id);
  const createArr = availableTasksId.map((id) => {
    return { cognitiveTaskId: id };
  });

  console.log(createArr);

  console.log(availableTasksId);

  // const child = await prisma.child.update({
  //   where: {
  //     // ... provide filter here
  //     id: "d6c2caf8-8027-4adb-9393-ec81dcf26ed8",
  //   },
  //   data: {
  //     // ... provide data here
  //     availableCognitiveOnChild: {
  //       create: createArr
  //     },
  //   },
  // });

  const child = await prisma.child.findMany({
    where: {
      id: "d6c2caf8-8027-4adb-9393-ec81dcf26ed8",
    },
    include: {
      availableCognitiveOnChild: {
        include: {
          task: true,
        },
      },
    },
  });

  console.log(child[0].availableCognitiveOnChild);
};

func();

const questions = [
  {
    questionText: 'What comes after 4?',
    answerOptions: [
      { answerText: '4', isCorrect: false },
      { answerText: '5', isCorrect: true },
      { answerText: '6', isCorrect: false },
      { answerText: '7', isCorrect: false },
    ],
  },
  {
    questionText: 'What comes before 8?',
    answerOptions: [
      { answerText: '9', isCorrect: false },
      { answerText: '7', isCorrect: true },
      { answerText: '10', isCorrect: false },
      { answerText: '6', isCorrect: false },
    ],
  },
  {
    questionText: 'What color is Apple?',
    answerOptions: [
      { answerText: 'Red', isCorrect: true },
      { answerText: 'Blue', isCorrect: false },
      { answerText: 'Green', isCorrect: false },
      { answerText: 'Pink', isCorrect: false },
    ],
  },
  {
    questionText: 'What comes after D?',
    answerOptions: [
      { answerText: 'H', isCorrect: false },
      { answerText: 'G', isCorrect: false },
      { answerText: 'F', isCorrect: false },
      { answerText: 'E', isCorrect: true },
    ],
  },
];

