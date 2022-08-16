import { Child, PrismaClient } from "@prisma/client";
import { ChildRegister } from "../../interfaces";
import ParentService from "../parent/index.service";

class ChildService {
  private prisma;
  private parentService;

  constructor() {
    this.parentService = new ParentService();

    this.prisma = new PrismaClient();
  }

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

              //add tasks here - on availableCognitiveOnChild

              // const child = await this.prisma.child.update({
              //   where: {
              //     id,
              //   },
              //   data: {
              //     // ... provide data here
              //     availableCognitiveOnChild: {
              //       create: createCognitive,
              //     },
              //     availableYogaOnChild: {
              //       create: createYoga,
              //     },
              //   },
              // });

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
