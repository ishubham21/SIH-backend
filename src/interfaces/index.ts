import { Child, CognitiveTask } from "@prisma/client";
import { AgeGroup } from "./child.interface";

export interface LoginBody {
  email: string;
  password: string;
}

export interface CognitiveRequest {
  childId: string;
  cognitiveTaskId: number;
}

export interface YogaRequest {
  childId: string;
  yogaId: number;
}

export interface CompleteCognitiveRequest {
  childId: string;
  taskId: number;
  score: number;
  totalQuestions: number;
  correctQuestions: number;
  child?: Child;
  task?: CognitiveTask;
}

export interface ChildScores {
  childId: string;
  score: number;
  cognitiveTaskId: number;
  ageGroup: AgeGroup;
  percentile?: number;
  child?: Child;
  taskName: string;
}

export * from "./child.interface";
export * from "./parent.interface";
