export type Gender = "Male" | "Female" | "Other";
export type AgeGroup = "Toddler" | "Tween" | "Teen";

export interface ChildInterface {
  id: string;
  name: string;
  gender: Gender;
  coins: number;
  ageGroup: AgeGroup;
  parentId: string;

  assignedCognitiveOnChild?: any;
  completedCognitiveOnChild?: any;

  assignedYogaOnChild?: any;
  completedYogaOnChild?: any;

  availableCognitiveOnChild?: any;
  availableYogaOnChild?: any;
}
