import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const seedTasks = async () => {
  await prisma.cognitiveTask.createMany({
    data: [
      {
        ageGroup: "Preschool",
        description: "Task 1 for preschool",
        name: "Preschool-1",
        questions: [
          {
            questionText: "A,_,C",
            difficultyIndex: 1,
            answerOptions: [
              { answerText: "C", isCorrect: false },
              { answerText: "B", isCorrect: true },
              { answerText: "D", isCorrect: false },
              { answerText: "E", isCorrect: false },
            ],
          },
          { 
            questionText: "Q can also be written as",
            difficultyIndex: 2,
            answerOptions: [
              { answerText: "p", isCorrect: false },
              { answerText: "q", isCorrect: true },
              { answerText: "o", isCorrect: false },
              { answerText: "a", isCorrect: false },
            ],
          },
          {
            questionText: "How many days are in a week?",
            difficultyIndex: 3,
            answerOptions: [
              { answerText: "7", isCorrect: true },
              { answerText: "2", isCorrect: false },
              { answerText: "10", isCorrect: false },
              { answerText: "5", isCorrect: false },
            ],
          },
          {
            questionText: "What comes after E?",
            difficultyIndex: 4,
            answerOptions: [
              { answerText: "H", isCorrect: false },
              { answerText: "G", isCorrect: false },
              { answerText: "D", isCorrect: false },
              { answerText: "F", isCorrect: true },
            ],
          },
        ],
      },
      {
        ageGroup: "Preschool",
        description: "Task 2 for preschool kids",
        name: "Preschool-2",
        questions: [
          {
            questionText: "5,_,7",
            difficultyIndex: 1,
            answerOptions: [
              { answerText: "6", isCorrect: true },
              { answerText: "7", isCorrect: false },
              { answerText: "8", isCorrect: false },
              { answerText: "9", isCorrect: false },
            ],
          },
          {
            questionText: "What comes after 46?",
            difficultyIndex: 2,
            answerOptions: [
              { answerText: "41", isCorrect: false },
              { answerText: "47", isCorrect: true },
              { answerText: "56", isCorrect: false },
              { answerText: "20", isCorrect: false },
            ],
          },
          {
            questionText: "How many months are in an year?",
            difficultyIndex: 3,
            answerOptions: [
              { answerText: "20", isCorrect: false },
              { answerText: "6", isCorrect: false },
              { answerText: "12", isCorrect: true },
              { answerText: "10", isCorrect: false },
            ],
          },
          {
            questionText: "What color is an apple?",
            difficultyIndex: 4,
            answerOptions: [
              { answerText: "Red", isCorrect: true },
              { answerText: "Blue", isCorrect: false },
              { answerText: "Green", isCorrect: false },
              { answerText: "Pink", isCorrect: false },
            ],
          },
        ],
      },
      {
        ageGroup: "Preteen",
        description: "Task 1 for preteen kids",
        name: "Preteen-1",
        questions: [
          {
            questionText: "A,_,C",
            difficultyIndex: 1,
            answerOptions: [
              { answerText: "C", isCorrect: false },
              { answerText: "B", isCorrect: true },
              { answerText: "D", isCorrect: false },
              { answerText: "E", isCorrect: false },
            ],
          },
          {
            questionText: "Q can also be written as",
            difficultyIndex: 2,
            answerOptions: [
              { answerText: "p", isCorrect: false },
              { answerText: "q", isCorrect: true },
              { answerText: "o", isCorrect: false },
              { answerText: "a", isCorrect: false },
            ],
          },
          {
            questionText: "How many days are in a week?",
            difficultyIndex: 3,
            answerOptions: [
              { answerText: "7", isCorrect: true },
              { answerText: "2", isCorrect: false },
              { answerText: "10", isCorrect: false },
              { answerText: "5", isCorrect: false },
            ],
          },
          {
            questionText: "What comes after E?",
            difficultyIndex: 4,
            answerOptions: [
              { answerText: "H", isCorrect: false },
              { answerText: "G", isCorrect: false },
              { answerText: "D", isCorrect: false },
              { answerText: "F", isCorrect: true },
            ],
          },
        ],
      },
      {
        ageGroup: "Preteen",
        description: "Task 2 for preteen kids",
        name: "Preteen-2",
        questions: [
          {
            questionText: "How many days in a leap year?",
            difficultyIndex: 1,
            answerOptions: [
              { answerText: "366", isCorrect: true },
              { answerText: "365", isCorrect: false },
              { answerText: "340", isCorrect: false },
              { answerText: "367", isCorrect: false },
            ],
          },
          {
            questionText: "30-15=?",
            difficultyIndex: 2,
            answerOptions: [
              { answerText: "45", isCorrect: false },
              { answerText: "15", isCorrect: true },
              { answerText: "30", isCorrect: false },
              { answerText: "0", isCorrect: false },
            ],
          },
          {
            questionText: "Pack: Wolves :: School: ?",
            difficultyIndex: 3,
            answerOptions: [
              { answerText: "Dogs", isCorrect: false },
              { answerText: "Cats", isCorrect: false },
              { answerText: "Fishes", isCorrect: true },
              { answerText: "Plants", isCorrect: false },
            ],
          },
          {
            questionText: 'What deos "Rectile" mean?',
            difficultyIndex: 4,
            answerOptions: [
              { answerText: "Very painful", isCorrect: true },
              { answerText: "Repeat from memory", isCorrect: false },
              { answerText: "Playing football", isCorrect: false },
              { answerText: "Eating snacks", isCorrect: false },
            ],
          },
        ],
      },
      {
        ageGroup: "Teen",
        description: "Task 1 for teen kids",
        name: "Teen-1",
        questions: [
          {
            questionText: "What does I stands for in a vibgyor?",
            difficultyIndex: 1,
            answerOptions: [
              { answerText: "Indigo", isCorrect: true },
              { answerText: "Ice", isCorrect: false },
              { answerText: "Ivory", isCorrect: false },
              { answerText: "Ink", isCorrect: false },
            ],
          },
          {
            questionText:
              "There are 60 minutes in 1 hour? How many minutes in 5 hours?",
              difficultyIndex: 2,
            answerOptions: [
              { answerText: "100", isCorrect: false },
              { answerText: "300", isCorrect: true },
              { answerText: "600", isCorrect: false },
              { answerText: "500", isCorrect: false },
            ],
          },
          {
            questionText: "Roman number XC stand for?",
            difficultyIndex: 3,
            answerOptions: [
              { answerText: "110", isCorrect: false },
              { answerText: "100", isCorrect: false },
              { answerText: "90", isCorrect: true },
              { answerText: "80", isCorrect: false },
            ],
          },
          {
            questionText:
              "A boy walks in north direction, then turns right. What direction is he facing?",
              difficultyIndex: 4,
            answerOptions: [
              { answerText: "East", isCorrect: true },
              { answerText: "North", isCorrect: false },
              { answerText: "South", isCorrect: false },
              { answerText: "West", isCorrect: false },
            ],
          },
        ],
      },
      {
        ageGroup: "Teen",
        description: "Task 2 for teen kids",
        name: "Teen-2",
        questions: [
          {
            questionText: "9 x 7 = ",
            difficultyIndex: 1,
            answerOptions: [
              { answerText: "63", isCorrect: true },
              { answerText: "54", isCorrect: false },
              { answerText: "45", isCorrect: false },
              { answerText: "90", isCorrect: false },
            ],
          },
          {
            questionText: "Which way is anti-clockwise?",
            difficultyIndex: 2,
            answerOptions: [
              { answerText: "Right", isCorrect: false },
              { answerText: "Left", isCorrect: true },
            ],
          },
          {
            questionText: "A figure with 8 sides is known as?",
            difficultyIndex: 3,
            answerOptions: [
              { answerText: "Square", isCorrect: false },
              { answerText: "Pentagon", isCorrect: false },
              { answerText: "Octagon", isCorrect: true },
              { answerText: "Hexagon", isCorrect: false },
            ],
          },
          {
            questionText: "Which plant is closest to sun?",
            difficultyIndex: 4,
            answerOptions: [
              { answerText: "Mercury", isCorrect: true },
              { answerText: "Earth", isCorrect: false },
              { answerText: "Venus", isCorrect: false },
              { answerText: "Saturn", isCorrect: false },
            ],
          },
        ],
      },
    ],
  });
};

seedTasks().then(() => {
  console.log("Added Tasks");
});
