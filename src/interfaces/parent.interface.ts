export interface ParentInterface {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: any;
  updatedAt?: any;
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
