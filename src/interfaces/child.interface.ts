export type Gender = "Male" | "Female" | "Other";
export type AgeGroup = "Toddler" | "Preschool" | "Preteen" | "Teen";

export interface ChildRegister {
  parentId: string;
  name: string;
  gender: Gender;
  ageGroup: AgeGroup;
}
