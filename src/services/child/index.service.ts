import {
  assignedCognitiveOnChild,
  availableCognitiveOnChild,
  Child,
  CognitiveTask,
  PrismaClient,
} from "@prisma/client";
import { ChildRegister } from "../../interfaces";
import ParentService from "../parent/index.service";

class ChildService {
  private prisma;
  private parentService;

  constructor() {
    this.parentService = new ParentService();

    this.prisma = new PrismaClient();
  }

  //assin task
  public assignCognitive = (
    childId: string,
    cognitiveTaskId: number,
  ): Promise<availableCognitiveOnChild> => {
    return new Promise<availableCognitiveOnChild>(
      (resolve, reject) => {
        this.prisma.availableCognitiveOnChild
          .delete({
            where: {
              // eslint-disable-next-line camelcase
              childId_cognitiveTaskId: {
                childId,
                cognitiveTaskId,
              },
            },
          })
          .then(async (task) => {
            //if delete was successful, add this task to assignedTasks - this should be a transaction to be done in a single go or dropped
            try {
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
              });
              return resolve(task);
            } catch (error) {
              return reject("Error assigning the task");
            }
          })
          .catch((error) => {
            return reject(error);
          });
      },
    );
  };

  public assignYoga = () => {
    //
  };

  public completeCognitive = (
    childId: string,
    cognitiveTaskId: number,
  ): Promise<assignedCognitiveOnChild> => {
    //if completed, add coins and update
    return new Promise<assignedCognitiveOnChild>(
      (resolve, reject) => {
        this.prisma.assignedCognitiveOnChild
          .delete({
            where: {
              // eslint-disable-next-line camelcase
              childId_cognitiveTaskId: {
                childId,
                cognitiveTaskId,
              },
            },
          })
          .then(async (task) => {
            try {
              const child = (await this.prisma.child.findUnique({
                where: {
                  id: childId,
                },
              })) as Child; //never null, already ver

              this.prisma.child.update({
                where: {
                  id: childId,
                },
                data: {
                  coins: child.coins + 10,
                  completedCognitiveOnChild: {
                    create: {
                      cognitiveTaskId,
                    },
                  },
                },
              });
              return resolve(task);
            } catch (error) {
              return reject(
                "Not able to register the completion of task",
              );
            }
          })
          .catch((error) => {
            return reject(error);
          });
      },
    );
  };

  public completeYoga = () => {
    //
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
        .then((data) => {
          if (!data) {
            return reject("Child with this id could not be found");
          }
          return resolve(data);
        })
        .catch((error) => {
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
              const availableTasksId = tasks.map((task) => task.id);
              const createCognitive = availableTasksId.map((id) => {
                return { cognitiveTaskId: id };
              });

              const availableYogaId = yogas.map((yoga) => yoga.id);
              const createYoga = availableYogaId.map((id) => {
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
