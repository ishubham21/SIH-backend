import { Parent, PrismaClient } from "@prisma/client";
import { ParentLogin, ParentRegister } from "../../interfaces";
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
    return new Promise<boolean>((resolve) => {
      this.parent
        .findUnique({
          where: {
            email,
          },
        })
        //if user is present, resolve to true + set parentData
        //if user is not present, resolve to false + parentData = null
        .then((data) => {
          data ? resolve(true) : resolve(false);
        })
        .catch((err) => {
          throw err;
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

  public login = async (data: ParentLogin) => {
    const { email } = data;

    return new Promise<string>((resolve, reject) => {
      this.isParentPresent(email)
        .then(async (foundParent: boolean) => {
          if (foundParent) {
            //get parent data
            const parentData: Parent = (await this.parent.findUnique({
              where: {
                email,
              },
              include: {
                children: true,
              },
            })) as Parent;

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
                const { password, ...parentDataToBeSigned } =
                  parentData;
                const token = await this.jwtService.signAccessToken(
                  parentDataToBeSigned,
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
