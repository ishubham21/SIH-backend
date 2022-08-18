import { PrismaClient, Yoga } from "@prisma/client";

class YogaService {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public getYogaById = async (id: number) => {
    return new Promise<Yoga>((resolve, reject) => {
      this.prisma.yoga
        .findUnique({
          where: {
            id,
          },
        })
        .then((task) => {
          if (!task)
            return reject("Yoga with this id could not be found");
          return resolve(task);
        })
        .catch((error) => reject(error));
    });
  };
}

export default YogaService;
