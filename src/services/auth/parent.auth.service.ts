import { Child, PrismaClient } from "@prisma/client";
import {
  LoginBody,
  ParentRegister,
  ParentWithChildren,
  ParentWithoutPassword,
} from "../../interfaces";
import { compare, hash } from "bcrypt";
import JWTService from "../jwt.service";
import { genSalt } from "bcryptjs";

class ParentAuthService {
  private parent;
  private jwtService;

  constructor() {
    this.parent = new PrismaClient().parent;
    this.jwtService = new JWTService();
  }

  private isParentPresent = async (
    email: string,
  ): Promise<boolean> => {
    //11:11 WE WILL WIN SIH 2022
    return new Promise<boolean>((resolve, reject) => {
      this.parent
        .findUnique({
          where: {
            email,
          },
        })
        //if parent is present, resolve to true + set parentData
        //if parent is not present, resolve to false + parentData = null
        .then((data) => {
          data ? resolve(true) : resolve(false);
        })
        .catch((err) => {
          reject({
            ...err,
            occurance: "This occured in parent.auth.service",
          });
        });
    });
  };

  private encryptPassword = async (password: string) => {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  };

  private comparePassword = (
    userPassword: string,
    dbPassword: string,
  ) => {
    return compare(userPassword, dbPassword);
  };

  public register = async (data: ParentRegister): Promise<string> => {
    const { email } = data;
    data.password = await this.encryptPassword(data.password);

    return new Promise<string>((resolve, reject) => {
      this.isParentPresent(email)
        .then(async (foundParent: boolean) => {
          if (!foundParent) {
            try {
              const { id } = await this.parent.create({
                data,
              });
              return resolve(id);
            } catch (error) {
              return reject(error);
            }
          }
          return reject("Email is already registered");
        })
        .catch((err) => reject(err));
    });
  };

  //this is also getting used in the ChildAuthService
  public login = async (data: LoginBody, isChildLogin?: boolean) => {
    const { email } = data;

    return new Promise<string>((resolve, reject) => {
      this.isParentPresent(email)
        .then(async (foundParent: boolean) => {
          if (foundParent) {
            //get parent data
            try {
              const parentData: ParentWithChildren =
                (await this.parent.findUnique({
                  where: {
                    email,
                  },
                  include: {
                    children: true,
                  },
                })) as ParentWithChildren;

              //validate password
              if (
                await this.comparePassword(
                  data.password,
                  parentData.password,
                )
              ) {
                //sign a JWT of this parentData
                //removing password before signing the access token
                const {
                  password,
                  children,
                  ...parentDataToBeSigned
                } = parentData;

                const token = !isChildLogin
                  ? await this.jwtService.signAccessToken({
                      ...parentDataToBeSigned,
                      children,
                    } as ParentWithoutPassword)
                  : await this.jwtService.signAccessToken(
                      children as Child[],
                    );

                return resolve(token as string);
              } else {
                return reject("Password is not valid");
              }
            } catch (error) {
              return reject(error);
            }
          }
          return reject("Email can not be found");
        })
        .catch((err) => reject(err));
    });
  };
}

export default ParentAuthService;
