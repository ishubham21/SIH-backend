import {
  assignedCognitiveOnChild,
  assignedYogaOnChild,
  availableCognitiveOnChild,
  Child,
  CognitiveTask,
  Prisma,
  PrismaClient,
  Yoga,
} from "@prisma/client";
import { ChildRegister } from "../../interfaces";
import ParentService from "../parent/index.service";

class ChildService {
  private prisma: any;
  private parentService;

  constructor() {
    this.parentService = new ParentService();
    this.prisma = new PrismaClient();
  }

  //assin task
  public assignCognitive = (
    childId: string,
    cognitiveTaskId: number,
  ) => {
    return new Promise<availableCognitiveOnChild>(
      (resolve, reject) => {
        this.prisma
          .$transaction([
            this.prisma.availableCognitiveOnChild.delete({
              where: {
                // eslint-disable-next-line camelcase
                childId_cognitiveTaskId: {
                  childId,
                  cognitiveTaskId,
                },
              },
            }),
            this.prisma.child.update({
              where: {
                id: childId,
              },
              data: {
                assignedCognitiveOnChild: {
                  create: {
                    cognitiveTaskId,
                  },
                },
              },
            }),
          ])
          .then((transation: any) => {
            const [availableCognitive] = transation;
            return resolve(availableCognitive);
          })
          .catch((error: any) => reject(error));
      },
    );
  };

  public assignYoga = async (childId: string, yogaId: number) => {
    return new Promise<assignedYogaOnChild>((resolve, reject) => {
      //doing a transaction to prevent faults
      this.prisma
        .$transaction([
          this.prisma.availableYogaOnChild.delete({
            where: {
              // eslint-disable-next-line camelcase
              childId_yogaId: {
                childId,
                yogaId,
              },
            },
          }),
          this.prisma.child.update({
            where: {
              id: childId,
            },
            data: {
              assignedYogaOnChild: {
                create: {
                  yogaId,
                },
              },
            },
          }),
        ])
        .then((value: any) => {
          //destructuring
          const [availableYoga] = value;
          return resolve(availableYoga);
        })
        .catch((error: any) => reject(error));
    });
  };

  //CONVERT THIS INTO A TRANSACTION
  public completeCognitive = (
    childId: string,
    cognitiveTaskId: number,
    score: number,
  ) => {
    //if completed, add coins and update
    return new Promise<assignedCognitiveOnChild>(
      (resolve, reject) => {
        this.prisma
          .$transaction([
            this.prisma.assignedCognitiveOnChild.delete({
              where: {
                // eslint-disable-next-line camelcase
                childId_cognitiveTaskId: {
                  childId,
                  cognitiveTaskId,
                },
              },
            }),
            this.prisma.child.update({
              where: {
                id: childId,
              },
              data: {
                coins: { increment: score },
                completedCognitiveOnChild: {
                  create: {
                    cognitiveTaskId,
                  },
                },
              },
            }),
          ])
          .then((value: any) => {
            const [assinedCognitive] = value;
            return resolve(assinedCognitive);
          })
          .catch((error: any) => {
            return reject(error);
          });
      },
    );
  };

  public completeYoga = (childId: string, yogaId: number) => {
    return new Promise<assignedYogaOnChild>((resolve, reject) => {
      this.prisma
        .$transaction([
          this.prisma.assignedYogaOnChild.delete({
            where: {
              // eslint-disable-next-line camelcase
              childId_yogaId: {
                childId,
                yogaId,
              },
            },
          }),
          this.prisma.child.update({
            where: {
              id: childId,
            },
            data: {
              coins: {
                increment: 10,
              },
              completedYogaOnChild: {
                create: {
                  yogaId,
                },
              },
            },
          }),
        ])
        .then((value: any) => {
          const [assignedYoga] = value;
          return resolve(assignedYoga);
        })
        .catch((error: any) => {
          return reject(error);
        });
    });
  };

  public getChildById = async (id: string): Promise<Child> => {
    return new Promise<Child>((resolve, reject) => {
      this.prisma.child
        .findUnique({
          where: {
            id,
          },
          include: {
            availableCognitiveOnChild: {
              include: {
                task: true,
              },
            },
            assignedCognitiveOnChild: {
              include: {
                task: true,
              },
            },
            completedCognitiveOnChild: {
              include: {
                task: true,
              },
            },
            availableYogaOnChild: {
              include: {
                yoga: true,
              },
            },
            assignedYogaOnChild: {
              include: {
                yoga: true,
              },
            },
            completedYogaOnChild: {
              include: {
                yoga: true,
              },
            },
          },
        })
        .then((data: any) => {
          if (!data) {
            return reject("Child with this id could not be found");
          }
          return resolve(data);
        })
        .catch((error: any) => {
          return reject(error);
        });
    });
  };

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
              const { id } = await this.prisma.child.create({
                data,
                //we can connect here too - directly creating values in availableCognitiveOnChild/Yoga - see many-to-many relationships
              });

              //do not perform this action for toddlers
              if (data.ageGroup === "Toddler") {
                return resolve(id);
              }

              //after creating child, we have to populate availableConitiveOnChild, availableYogaOnChild
              const tasks = await this.prisma.cognitiveTask.findMany({
                where: {
                  ageGroup: data.ageGroup,
                },
              });

              const yogas = await this.prisma.yoga.findMany({
                where: {
                  ageGroup: data.ageGroup,
                },
              });

              //tasks that are available for child's ageGroup
              const availableTasksId = tasks.map(
                (task: CognitiveTask) => task.id,
              );
              const createCognitive = availableTasksId.map(
                (id: string) => {
                  return { cognitiveTaskId: id };
                },
              );

              const availableYogaId = yogas.map(
                (yoga: Yoga) => yoga.id,
              );
              const createYoga = availableYogaId.map((id: string) => {
                return { yogaId: id };
              });

              //add tasks here - on availableCognitiveOnChild/Yoga
              const child = await this.prisma.child.update({
                where: {
                  id,
                },
                data: {
                  availableCognitiveOnChild: {
                    create: createCognitive,
                  },
                  availableYogaOnChild: {
                    create: createYoga,
                  },
                },
              });

              return resolve(child.id);
            } catch (error) {
              console.log(error);

              return reject({
                error,
                origin: "While trying to add child",
              });
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
