export type Gender = "Male" | "Female" | "Other";
export type AgeGroup = "PreSchool" | "PreTeen" | "Teen";

export interface ChildRegister {
  parentId: string;
  name: string;
  gender: Gender;
  ageGroup: AgeGroup;
}
