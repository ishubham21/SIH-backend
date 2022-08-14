import { PrismaClient } from "@prisma/client";

class ParentService {
  private parent;

  constructor() {
    this.parent = new PrismaClient().parent;
  }

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
