// import { PrismaClient } from "@prisma/client";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// // const func = async () => {
// //   const tasks = await prisma.cognitiveTask.findMany({
// //     where: {
// //       ageGroup: "PreSchool",
// //     },
// //   });

// //   const availableTasksId = tasks.map((task) => task.id);
// //   const createArr = availableTasksId.map((id) => {
// //     return { cognitiveTaskId: id };
// //   });

// //   console.log(createArr);

// //   console.log(availableTasksId);

// // const child = await prisma.child.update({
// //   where: {
// //     // ... provide filter here
// //     id: "d6c2caf8-8027-4adb-9393-ec81dcf26ed8",
// //   },
// //   data: {
// //     // ... provide data here
// //     availableCognitiveOnChild: {
// //       create: createArr
// //     },
// //   },
// // });

// //   const child = await prisma.child.findMany({
// //     where: {
// //       id: "d6c2caf8-8027-4adb-9393-ec81dcf26ed8",
// //     },
// //     include: {
// //       availableCognitiveOnChild: {
// //         include: {
// //           task: true,
// //         },
// //       },
// //     },
// //   });

// //   console.log(child[0].availableCognitiveOnChild);
// // };

// // func();

// const presschool1 = [
//   {
//     questionText: "A,_,C",
//     answerOptions: [
//       { answerText: "C", isCorrect: false },
//       { answerText: "B", isCorrect: true },
//       { answerText: "D", isCorrect: false },
//       { answerText: "E", isCorrect: false },
//     ],
//   },
//   {
//     questionText: "Q can also be written as",
//     answerOptions: [
//       { answerText: "p", isCorrect: false },
//       { answerText: "q", isCorrect: true },
//       { answerText: "o", isCorrect: false },
//       { answerText: "a", isCorrect: false },
//     ],
//   },
//   {
//     questionText: "How many days are in a week?",
//     answerOptions: [
//       { answerText: "7", isCorrect: true },
//       { answerText: "2", isCorrect: false },
//       { answerText: "10", isCorrect: false },
//       { answerText: "5", isCorrect: false },
//     ],
//   },
//   {
//     questionText: "What comes after E?",
//     answerOptions: [
//       { answerText: "H", isCorrect: false },
//       { answerText: "G", isCorrect: false },
//       { answerText: "D", isCorrect: false },
//       { answerText: "F", isCorrect: true },
//     ],
//   },
// ];
// //[{"questionText":"A,_,C","answerOptions":[{"answerText":"C","isCorrect":false},{"answerText":"B","isCorrect":true},{"answerText":"D","isCorrect":false},{"answerText":"E","isCorrect":false}]},{"questionText":"Q can also be written as","answerOptions":[{"answerText":"p","isCorrect":false},{"answerText":"q","isCorrect":true},{"answerText":"o","isCorrect":false},{"answerText":"a","isCorrect":false}]},{"questionText":"How many days are in a week?","answerOptions":[{"answerText":"7","isCorrect":true},{"answerText":"2","isCorrect":false},{"answerText":"10","isCorrect":false},{"answerText":"5","isCorrect":false}]},{"questionText":"What comes after E?","answerOptions":[{"answerText":"H","isCorrect":false},{"answerText":"G","isCorrect":false},{"answerText":"D","isCorrect":false},{"answerText":"F","isCorrect":true}]}]

// const preschool2 = [
//   {
//     questionText: "5,_,7",
//     answerOptions: [
//       { answerText: "6", isCorrect: true },
//       { answerText: "7", isCorrect: false },
//       { answerText: "8", isCorrect: false },
//       { answerText: "9", isCorrect: false },
//     ],
//   },
//   {
//     questionText: "What comes after 46?",
//     answerOptions: [
//       { answerText: "41", isCorrect: false },
//       { answerText: "47", isCorrect: true },
//       { answerText: "56", isCorrect: false },
//       { answerText: "20", isCorrect: false },
//     ],
//   },
//   {
//     questionText: "How many months are in an year?",
//     answerOptions: [
//       { answerText: "20", isCorrect: false },
//       { answerText: "6", isCorrect: false },
//       { answerText: "12", isCorrect: true },
//       { answerText: "10", isCorrect: false },
//     ],
//   },
//   {
//     questionText: "What color is an apple?",
//     answerOptions: [
//       { answerText: "Red", isCorrect: true },
//       { answerText: "Blue", isCorrect: false },
//       { answerText: "Green", isCorrect: false },
//       { answerText: "Pink", isCorrect: false },
//     ],
//   },
// ];
// //[{"questionText":"5,_,7","answerOptions":[{"answerText":"6","isCorrect":true},{"answerText":"7","isCorrect":false},{"answerText":"8","isCorrect":false},{"answerText":"9","isCorrect":false}]},{"questionText":"What comes after 46?","answerOptions":[{"answerText":"41","isCorrect":false},{"answerText":"47","isCorrect":true},{"answerText":"56","isCorrect":false},{"answerText":"20","isCorrect":false}]},{"questionText":"How many months are in an year?","answerOptions":[{"answerText":"20","isCorrect":false},{"answerText":"6","isCorrect":false},{"answerText":"12","isCorrect":true},{"answerText":"10","isCorrect":false}]},{"questionText":"What color is an apple?","answerOptions":[{"answerText":"Red","isCorrect":true},{"answerText":"Blue","isCorrect":false},{"answerText":"Green","isCorrect":false},{"answerText":"Pink","isCorrect":false}]}]

// const preteen1 = [
//   {
//     questionText: "How many colors in a rainbow?",
//     answerOptions: [
//       { answerText: "7", isCorrect: true },
//       { answerText: "12", isCorrect: false },
//       { answerText: "6", isCorrect: false },
//       { answerText: "9", isCorrect: false },
//     ],
//   },
//   {
//     questionText: "How many minutes in an hour?",
//     answerOptions: [
//       { answerText: "40", isCorrect: false },
//       { answerText: "60", isCorrect: true },
//       { answerText: "50", isCorrect: false },
//       { answerText: "100", isCorrect: false },
//     ],
//   },
//   {
//     questionText: "15+50?",
//     answerOptions: [
//       { answerText: "100", isCorrect: false },
//       { answerText: "45", isCorrect: false },
//       { answerText: "65", isCorrect: true },
//       { answerText: "10", isCorrect: false },
//     ],
//   },
//   {
//     questionText: "Lion: Den :: Horse: ??",
//     answerOptions: [
//       { answerText: "Stable", isCorrect: true },
//       { answerText: "Kennel", isCorrect: false },
//       { answerText: "Nest", isCorrect: false },
//       { answerText: "Water", isCorrect: false },
//     ],
//   },
// ];
// //[{"questionText":"How many colors in a rainbow?","answerOptions":[{"answerText":"7","isCorrect":true},{"answerText":"12","isCorrect":false},{"answerText":"6","isCorrect":false},{"answerText":"9","isCorrect":false}]},{"questionText":"How many minutes in an hour?","answerOptions":[{"answerText":"40","isCorrect":false},{"answerText":"60","isCorrect":true},{"answerText":"50","isCorrect":false},{"answerText":"100","isCorrect":false}]},{"questionText":"15+50?","answerOptions":[{"answerText":"100","isCorrect":false},{"answerText":"45","isCorrect":false},{"answerText":"65","isCorrect":true},{"answerText":"10","isCorrect":false}]},{"questionText":"Lion: Den :: Horse: ??","answerOptions":[{"answerText":"Stable","isCorrect":true},{"answerText":"Kennel","isCorrect":false},{"answerText":"Nest","isCorrect":false},{"answerText":"Water","isCorrect":false}]}]

// const preteen2 = [
//   {
//     questionText: "How many days in a leap year?",
//     answerOptions: [
//       { answerText: "366", isCorrect: true },
//       { answerText: "365", isCorrect: false },
//       { answerText: "340", isCorrect: false },
//       { answerText: "367", isCorrect: false },
//     ],
//   },
//   {
//     questionText: "30-15=?",
//     answerOptions: [
//       { answerText: "45", isCorrect: false },
//       { answerText: "15", isCorrect: true },
//       { answerText: "30", isCorrect: false },
//       { answerText: "0", isCorrect: false },
//     ],
//   },
//   {
//     questionText: "Pack: Wolves :: School: ?",
//     answerOptions: [
//       { answerText: "Dogs", isCorrect: false },
//       { answerText: "Cats", isCorrect: false },
//       { answerText: "Fishes", isCorrect: true },
//       { answerText: "Plants", isCorrect: false },
//     ],
//   },
//   {
//     questionText: 'What deos "Rectile" mean?',
//     answerOptions: [
//       { answerText: "Very painful", isCorrect: true },
//       { answerText: "Repeat from memory", isCorrect: false },
//       { answerText: "Playing football", isCorrect: false },
//       { answerText: "Eating snacks", isCorrect: false },
//     ],
//   },
// ];
// //[{"questionText":"How many days in a leap year?","answerOptions":[{"answerText":"366","isCorrect":true},{"answerText":"365","isCorrect":false},{"answerText":"340","isCorrect":false},{"answerText":"367","isCorrect":false}]},{"questionText":"30-15=?","answerOptions":[{"answerText":"45","isCorrect":false},{"answerText":"15","isCorrect":true},{"answerText":"30","isCorrect":false},{"answerText":"0","isCorrect":false}]},{"questionText":"Pack: Wolves :: School: ?","answerOptions":[{"answerText":"Dogs","isCorrect":false},{"answerText":"Cats","isCorrect":false},{"answerText":"Fishes","isCorrect":true},{"answerText":"Plants","isCorrect":false}]},{"questionText":"What deos \\"Rectile\\" mean?","answerOptions":[{"answerText":"Very painful","isCorrect":true},{"answerText":"Repeat from memory","isCorrect":false},{"answerText":"Playing football","isCorrect":false},{"answerText":"Eating snacks","isCorrect":false}]}]

// const teen1 = [
//   {
//     questionText: "What does I stands for in a vibgyor?",
//     answerOptions: [
//       { answerText: "Indigo", isCorrect: true },
//       { answerText: "Ice", isCorrect: false },
//       { answerText: "Ivory", isCorrect: false },
//       { answerText: "Ink", isCorrect: false },
//     ],
//   },
//   {
//     questionText:
//       "There are 60 minutes in 1 hour? How many minutes in 5 hours?",
//     answerOptions: [
//       { answerText: "100", isCorrect: false },
//       { answerText: "300", isCorrect: true },
//       { answerText: "600", isCorrect: false },
//       { answerText: "500", isCorrect: false },
//     ],
//   },
//   {
//     questionText: "Roman number XC stand for?",
//     answerOptions: [
//       { answerText: "110", isCorrect: false },
//       { answerText: "100", isCorrect: false },
//       { answerText: "90", isCorrect: true },
//       { answerText: "80", isCorrect: false },
//     ],
//   },
//   {
//     questionText:
//       "A boy walks in north direction, then turns right. What direction is he facing?",
//     answerOptions: [
//       { answerText: "East", isCorrect: true },
//       { answerText: "North", isCorrect: false },
//       { answerText: "South", isCorrect: false },
//       { answerText: "West", isCorrect: false },
//     ],
//   },
// ];
// //[{"questionText":"What does I stands for in a vibgyor?","answerOptions":[{"answerText":"Indigo","isCorrect":true},{"answerText":"Ice","isCorrect":false},{"answerText":"Ivory","isCorrect":false},{"answerText":"Ink","isCorrect":false}]},{"questionText":"There are 60 minutes in 1 hour? How many minutes in 5 hours?","answerOptions":[{"answerText":"100","isCorrect":false},{"answerText":"300","isCorrect":true},{"answerText":"600","isCorrect":false},{"answerText":"500","isCorrect":false}]},{"questionText":"Roman number XC stand for?","answerOptions":[{"answerText":"110","isCorrect":false},{"answerText":"100","isCorrect":false},{"answerText":"90","isCorrect":true},{"answerText":"80","isCorrect":false}]},{"questionText":"A boy walks in north direction, then turns right. What direction is he facing?","answerOptions":[{"answerText":"East","isCorrect":true},{"answerText":"North","isCorrect":false},{"answerText":"South","isCorrect":false},{"answerText":"West","isCorrect":false}]}]

// const teen2 = [
//   {
//     questionText: "9 x 7 = ",
//     answerOptions: [
//       { answerText: "63", isCorrect: true },
//       { answerText: "54", isCorrect: false },
//       { answerText: "45", isCorrect: false },
//       { answerText: "90", isCorrect: false },
//     ],
//   },
//   {
//     questionText: "Which way is anti-clockwise?",
//     answerOptions: [
//       { answerText: "Right", isCorrect: false },
//       { answerText: "Left", isCorrect: true },
//     ],
//   },
//   {
//     questionText: "A figure with 8 sides is known as?",
//     answerOptions: [
//       { answerText: "Square", isCorrect: false },
//       { answerText: "Pentagon", isCorrect: false },
//       { answerText: "Octagon", isCorrect: true },
//       { answerText: "Hexagon", isCorrect: false },
//     ],
//   },
//   {
//     questionText: "Which plant is closest to sun?",
//     answerOptions: [
//       { answerText: "Mercury", isCorrect: true },
//       { answerText: "Earth", isCorrect: false },
//       { answerText: "Venus", isCorrect: false },
//       { answerText: "Saturn", isCorrect: false },
//     ],
//   },
// ];
// //[{"questionText":"9 x 7 = ","answerOptions":[{"answerText":"63","isCorrect":true},{"answerText":"54","isCorrect":false},{"answerText":"45","isCorrect":false},{"answerText":"90","isCorrect":false}]},{"questionText":"Which way is anti-clockwise?","answerOptions":[{"answerText":"Right","isCorrect":false},{"answerText":"Left","isCorrect":true}]},{"questionText":"A figure with 8 sides is known as?","answerOptions":[{"answerText":"Square","isCorrect":false},{"answerText":"Pentagon","isCorrect":false},{"answerText":"Octagon","isCorrect":true},{"answerText":"Hexagon","isCorrect":false}]},{"questionText":"Which plant is closest to sun?","answerOptions":[{"answerText":"Mercury","isCorrect":true},{"answerText":"Earth","isCorrect":false},{"answerText":"Venus","isCorrect":false},{"answerText":"Saturn","isCorrect":false}]}]

const func = async () => {
  // const task = await prisma.availableCognitiveOnChild.findMany({
  //   where: {
  //     childId: "bb05dc9a-e908-496a-a05b-176c4bd6d016",
  //     cognitiveTaskId: 2
  //   }
  // });
  const [task, totalTasks] = await prisma.$transaction([
    // prisma.availableCognitiveOnChild.delete({
    //   where: {
    //     // eslint-disable-next-line camelcase
    //     childId_cognitiveTaskId: {childId: "bb05dc9a-e908-496a-a05b-176c4bd6d016", cognitiveTaskId: 2}
    //   }
    // }),
    prisma.assignedCognitiveOnChild.findMany({

    }),   
    prisma.child.update({
      where: {
        id: "a881e0da-0308-4cce-aea3-602b598f72bc"
      },
      data: {
        assignedCognitiveOnChild: {
          create: {
            cognitiveTaskId: 2
          }
        }
      }
    })
  ])
  console.log(task);
};

func().then(() => {
  //
});
