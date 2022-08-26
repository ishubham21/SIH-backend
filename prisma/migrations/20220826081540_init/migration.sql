-- CreateEnum
CREATE TYPE "AgeGroup" AS ENUM ('Toddler', 'Preschool', 'Preteen', 'Teen');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Other');

-- CreateTable
CREATE TABLE "Parent" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Child" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "gender" "Gender" NOT NULL,
    "coins" INTEGER NOT NULL DEFAULT 0,
    "ageGroup" "AgeGroup" NOT NULL,
    "parentId" TEXT NOT NULL,

    CONSTRAINT "Child_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CognitiveTask" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "description" TEXT,
    "questions" JSONB NOT NULL,
    "ageGroup" "AgeGroup" NOT NULL,

    CONSTRAINT "CognitiveTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Yoga" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "description" TEXT,
    "modelLink" TEXT NOT NULL,
    "youtubeLink" TEXT NOT NULL,
    "ageGroup" "AgeGroup" NOT NULL,

    CONSTRAINT "Yoga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Games" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT,
    "ageGroup" "AgeGroup" NOT NULL,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignedCognitiveOnChild" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "childId" TEXT NOT NULL,
    "cognitiveTaskId" INTEGER NOT NULL,

    CONSTRAINT "assignedCognitiveOnChild_pkey" PRIMARY KEY ("childId","cognitiveTaskId")
);

-- CreateTable
CREATE TABLE "completedCognitiveOnChild" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" INTEGER NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "correctQuestions" INTEGER NOT NULL,
    "childId" TEXT NOT NULL,
    "cognitiveTaskId" INTEGER NOT NULL,

    CONSTRAINT "completedCognitiveOnChild_pkey" PRIMARY KEY ("childId","cognitiveTaskId")
);

-- CreateTable
CREATE TABLE "availableCognitiveOnChild" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "childId" TEXT NOT NULL,
    "cognitiveTaskId" INTEGER NOT NULL,

    CONSTRAINT "availableCognitiveOnChild_pkey" PRIMARY KEY ("childId","cognitiveTaskId")
);

-- CreateTable
CREATE TABLE "assignedYogaOnChild" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "childId" TEXT NOT NULL,
    "yogaId" INTEGER NOT NULL,

    CONSTRAINT "assignedYogaOnChild_pkey" PRIMARY KEY ("childId","yogaId")
);

-- CreateTable
CREATE TABLE "completedYogaOnChild" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "childId" TEXT NOT NULL,
    "yogaId" INTEGER NOT NULL,

    CONSTRAINT "completedYogaOnChild_pkey" PRIMARY KEY ("childId","yogaId")
);

-- CreateTable
CREATE TABLE "availableYogaOnChild" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "childId" TEXT NOT NULL,
    "yogaId" INTEGER NOT NULL,

    CONSTRAINT "availableYogaOnChild_pkey" PRIMARY KEY ("childId","yogaId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Parent_email_key" ON "Parent"("email");

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignedCognitiveOnChild" ADD CONSTRAINT "assignedCognitiveOnChild_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignedCognitiveOnChild" ADD CONSTRAINT "assignedCognitiveOnChild_cognitiveTaskId_fkey" FOREIGN KEY ("cognitiveTaskId") REFERENCES "CognitiveTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completedCognitiveOnChild" ADD CONSTRAINT "completedCognitiveOnChild_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completedCognitiveOnChild" ADD CONSTRAINT "completedCognitiveOnChild_cognitiveTaskId_fkey" FOREIGN KEY ("cognitiveTaskId") REFERENCES "CognitiveTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "availableCognitiveOnChild" ADD CONSTRAINT "availableCognitiveOnChild_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "availableCognitiveOnChild" ADD CONSTRAINT "availableCognitiveOnChild_cognitiveTaskId_fkey" FOREIGN KEY ("cognitiveTaskId") REFERENCES "CognitiveTask"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignedYogaOnChild" ADD CONSTRAINT "assignedYogaOnChild_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignedYogaOnChild" ADD CONSTRAINT "assignedYogaOnChild_yogaId_fkey" FOREIGN KEY ("yogaId") REFERENCES "Yoga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completedYogaOnChild" ADD CONSTRAINT "completedYogaOnChild_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "completedYogaOnChild" ADD CONSTRAINT "completedYogaOnChild_yogaId_fkey" FOREIGN KEY ("yogaId") REFERENCES "Yoga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "availableYogaOnChild" ADD CONSTRAINT "availableYogaOnChild_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Child"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "availableYogaOnChild" ADD CONSTRAINT "availableYogaOnChild_yogaId_fkey" FOREIGN KEY ("yogaId") REFERENCES "Yoga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
