export type Gender = "Male" | "Female" | "Other";
export type AgeGroup = "Toddler" | "Tween" | "Teen";

export interface ChildRegister {
  parentId: string;
  name: string;
  gender: Gender;
  ageGroup: AgeGroup;
}
