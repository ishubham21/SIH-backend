import { Parent, PrismaClient } from "@prisma/client";
import { ParentWithoutPassword } from "../../interfaces";

class ParentService {
  private parent;

  constructor() {
    this.parent = new PrismaClient().parent;
  }

  public getParentById = (id: string) => {
    return new Promise<ParentWithoutPassword>((resolve, reject) => {
      this.parent
        .findUnique({
          where: {
            id,
          },
          include: {
            children: true,
          },
        })
        .then((parentData: Parent | null) => {
          if (!parentData) {
            return reject("No parent with this ID could be found");
          }
          // eslint-disable-next-line prefer-const
          let { password, ...parentWithoutPassword } = parentData;
          password = "";

          return resolve(parentWithoutPassword);
        })
        .catch(() => {
          return reject({
            errCode: 503,
            errMsg:
              "Internal server error occured while searching for specified parent",
          });
        });
    });
  };

  public findParentById = (id: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      this.parent
        .findUnique({
          where: {
            id,
          },
        })
        .then((data) => {
          data ? resolve(true) : resolve(false);
        })
        .catch((err) => {
          reject({
            ...err,
            occurance:
              "This occured during finding the respective parent",
          });
        });
    });
  };
}

export default ParentService;
