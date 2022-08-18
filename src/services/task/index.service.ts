import {
  assignedCognitiveOnChild,
  CognitiveTask,
  PrismaClient,
} from "@prisma/client";

class TaskService {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public getAssignedCognitiveTask = async (
    childId: string,
    cognitiveTaskId: number,
  ) => {
    return new Promise<assignedCognitiveOnChild>(
      (resolve, reject) => {
        this.prisma.assignedCognitiveOnChild
          .findUnique({
            where: {
              // eslint-disable-next-line camelcase
              childId_cognitiveTaskId: {
                childId,
                cognitiveTaskId,
              },
            },
          })
          .then((task) => {
            if (!task)
              return reject(
                "This task was not assigned, there's some request error",
              );

            return resolve(task);
          })
          .catch((error) => {
            return reject(error);
          });
      },
    );
  };

  public getCognitiveTaskById = async (id: number) => {
    return new Promise<CognitiveTask>((resolve, reject) => {
      this.prisma.cognitiveTask
        .findUnique({
          where: {
            id,
          },
        })
        .then((task) => {
          if (!task)
            return reject("Task with this id could not be found");
          return resolve(task);
        })
        .catch((error) => reject(error));
    });
  };
}

export default TaskService;
