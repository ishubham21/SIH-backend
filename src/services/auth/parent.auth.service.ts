import { PrismaClient } from "@prisma/client";
import { ParentLogin, ParentRegister } from "../../interfaces";

class ParentAuthService {
  private parent;

  constructor() {
    this.parent = new PrismaClient().parent;
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

  public register = async (data: ParentRegister): Promise<string> => {
    const { email } = data;

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
            //validate password

            //sign a JWT

            //send JWT as an response
          }
          return reject("Email is already registered");
        })
        .catch((err) => reject(err));
    });
  };
}

export default ParentAuthService;
