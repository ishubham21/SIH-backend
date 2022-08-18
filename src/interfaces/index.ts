export interface LoginBody {
  email: string;
  password: string;
}

export interface CognitiveRequest {
  childId: string;
  cognitiveTaskId: number;
}

export * from "./child.interface";
export * from "./parent.interface";
