import { Router, Request, Response } from "express";
import ChildController from "../../controllers/child/index.controller";

class ChildRoute {
  private path = "/";
  private childController;
  public router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();

    this.childController = new ChildController();
  }

  private initializeRoutes = () => {
    this.router.get(`${this.path}`, (req: Request, res: Response) => {
      res.status(200).json({
        error: null,
        data: "Child - Healthy",
      });
    });

    this.router.get(
      `${this.path}data/:id`,
      (req: Request, res: Response) => {
        this.childController.getChildById(req, res);
      },
    );

    this.router.post(
      `${this.path}complete/cognitive`,
      (req: Request, res: Response) => {
        this.childController.completeCognitive(req, res);
      },
    );

    this.router.post(
      `${this.path}complete/yoga`,
      (req: Request, res: Response) => {
        this.childController.completeYoga(req, res);
      },
    );

    this.router.get(
      `${this.path}stats/:id`,
      (req: Request, res: Response) => {
        this.childController.getStatsForChild(req, res);
      },
    );
  };
}

export default ChildRoute;
