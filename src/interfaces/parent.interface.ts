import { Parent } from "@prisma/client";
import { Request } from "express";

export interface ParentInterface {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: any;
  updatedAt?: any;
  children?: any;
}

export interface ParentWithoutPassword {
  id?: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  children?: any;
}

export interface ParentRegister {
  name: string;
  email: string;
  password: string;
}

export interface ParentLogin {
  email: string;
  password: string;
}

export interface RequestWithParent extends Request {
  parentData: Parent;
}
