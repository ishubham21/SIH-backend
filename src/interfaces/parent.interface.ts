import { Child, Parent } from "@prisma/client";
import { Request } from "express";

export interface ParentInterface {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: any;
  updatedAt?: any;
  children?: Child[] | [];
}

export interface ParentWithoutPassword {
  id?: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  children?: Child[] | [];
}

export interface ParentRegister {
  name: string;
  email: string;
  password: string;
}

export interface RequestWithParent extends Request {
  parentData: Parent;
}

export interface ParentWithChildren extends Parent {
  children: Child[] | [];
}
