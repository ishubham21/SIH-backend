import { PrismaClient } from "@prisma/client";
import { ChildRegister } from "../../interfaces";
import ParentService from "../parent/index.service";

class ChildService {
  private child;
  private parentService;

  constructor() {
    this.parentService = new ParentService();

    this.child = new PrismaClient().child;
  }

  //add child
  public addChild = async (data: ChildRegister): Promise<string> => {
    const { parentId } = data;

    return new Promise<string>((resolve, reject) => {
      this.parentService
        .findParentById(parentId)
        .then(async (foundParent: boolean) => {
          if (!foundParent) {
            return reject("Parent ID is incorrect");
          } else {
            //add child only if parent is found else the child would be lost in the DB
            try {
              const { id } = await this.child.create({
                data,
              });
              return resolve(id);
            } catch (error) {
              return reject(error);
            }
          }
        })
        .catch((err) => {
          return reject(err);
        });
    });
  };
}

export default ChildService;
