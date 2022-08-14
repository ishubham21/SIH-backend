import { PrismaClient } from "@prisma/client";

const cognitiveForToddlers1 = {
  name: "TODDLER1",
  description: "Bleh bleh bleh bleh",
  ageGroup: "Toddler",
  questions: JSON.stringify({
    "1": {
      prompt: "",
      options: {
        a: "",
        b: "",
        c: "",
        d: "",
      },
      answer: "",
    },
    "2": {
      prompt: "",
      options: {
        a: "",
        b: "",
        c: "",
        d: "",
      },
      answer: "",
    },
    "3": {
      prompt: "",
      options: {
        a: "",
        b: "",
        c: "",
        d: "",
      },
      answer: "",
    },
    "4": {
      prompt: "",
      options: {
        a: "",
        b: "",
        c: "",
        d: "",
      },
      answer: "",
    },
  }),
};

const cognitiveForTweens1 = {
  name: "TWEEN1",
  description: "Bleh bleh bleh bleh",
  ageGroup: "Toddler",
  questions: JSON.stringify({
    "1": {
      prompt: "",
      options: {
        a: "",
        b: "",
        c: "",
        d: "",
      },
      answer: "",
    },
    "2": {
      prompt: "",
      options: {
        a: "",
        b: "",
        c: "",
        d: "",
      },
      answer: "",
    },
    "3": {
      prompt: "",
      options: {
        a: "",
        b: "",
        c: "",
        d: "",
      },
      answer: "",
    },
    "4": {
      prompt: "",
      options: {
        a: "",
        b: "",
        c: "",
        d: "",
      },
      answer: "",
    },
  }),
};

const cognitiveForTeens1 = {
  name: "TEEN1",
  description: "Bleh bleh bleh bleh",
  ageGroup: "Toddler",
  questions: JSON.stringify({
    "1": {
      prompt: "",
      options: {
        a: "",
        b: "",
        c: "",
        d: "",
      },
      answer: "",
    },
    "2": {
      prompt: "",
      options: {
        a: "",
        b: "",
        c: "",
        d: "",
      },
      answer: "",
    },
    "3": {
      prompt: "",
      options: {
        a: "",
        b: "",
        c: "",
        d: "",
      },
      answer: "",
    },
    "4": {
      prompt: "",
      options: {
        a: "",
        b: "",
        c: "",
        d: "",
      },
      answer: "",
    },
  }),
};

const seedCongnitiveTasks = async (data: any) => {
  try {
    const prismaClient = new PrismaClient();
    //try adding tasks
    const cognitive = await prismaClient.cognitiveTask.create({
      data,
    });
    return cognitive;
  } catch (error) {
    //catch errors
    throw new Error("Tasks could not be seeded");
  }
};

//seeding for toddlers - module 1
seedCongnitiveTasks(cognitiveForToddlers1)
  .then((data) => {
    // eslint-disable-next-line no-console
    console.log("Seeded successfully", data);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log("Error seeding task data", err);
  });

//seeding for tweens - module 1
seedCongnitiveTasks(cognitiveForTweens1)
  .then((data) => {
    // eslint-disable-next-line no-console
    console.log("Seeded successfully", data);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log("Error seeding task data", err);
  });

//seeding for teens - module 1
seedCongnitiveTasks(cognitiveForTeens1)
  .then((data) => {
    // eslint-disable-next-line no-console
    console.log("Seeded successfully", data);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log("Error seeding task data", err);
  });
