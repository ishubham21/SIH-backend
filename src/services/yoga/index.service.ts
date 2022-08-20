import { PrismaClient, Yoga } from "@prisma/client";

class YogaService {
  private prisma: any;

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
        .then((yoga: Yoga) => {
          if (!yoga)
            return reject("Yoga with this id could not be found");
          return resolve(yoga);
        })
        .catch((error: any) => reject(error));
    });
  };
}

export default YogaService;
