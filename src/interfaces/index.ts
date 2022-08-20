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
  yogaId: string;
}

export interface Cogn {
  childId: string;
  taskId: string;
}

export * from "./child.interface";
export * from "./parent.interface";
