import { Child, Parent, PrismaClient } from "@prisma/client";
import {
  ParentLogin,
  ParentRegister,
  ParentWithChildren,
  ParentWithoutPassword,
} from "../../interfaces";
import { compare, hash } from "bcrypt";
import JWTService from "../jwt.service";
import { genSalt } from "bcryptjs";

class ParentAuthService {
  protected parent;
  protected jwtService;

  constructor() {
    this.parent = new PrismaClient().parent;
    this.jwtService = new JWTService();
  }

  protected isParentPresent = async (
    email: string,
  ): Promise<boolean> => {
    //11:11 WE WILL WIN SIH 2022
    return new Promise<boolean>((resolve) => {
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
          throw err;
        });
    });
  };

  protected encryptPassword = async (password: string) => {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  };

  protected comparePassword = (
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
            const { id } = await this.parent.create({
              data,
            });
            return resolve(id);
          }
          return reject("Email is already registered");
        })
        .catch((err) => reject(err));
    });
  };

  public login = async (
    data: ParentLogin,
    isChildLogin?: boolean,
  ) => {
    const { email } = data;

    return new Promise<string>((resolve, reject) => {
      this.isParentPresent(email)
        .then(async (foundParent: boolean) => {
          if (foundParent) {
            //get parent data
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
              try {
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
              } catch (err) {
                //jwt errors
                reject(err);
              }
            } else {
              return reject("Password is not valid");
            }
          }
          return reject("Email can not be found");
        })
        .catch((err) => reject(err));
    });
  };
}

export default ParentAuthService;
