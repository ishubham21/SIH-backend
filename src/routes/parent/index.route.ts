import { Router, Request, Response } from "express";
import ChildController from "../../controllers/child/index.controller";
import ParentController from "../../controllers/parent/index.controller";

class ParentRoute {
  public path = "/";
  private parentController;
  private childController;
  public router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();

    this.parentController = new ParentController();
    this.childController = new ChildController();
  }

  private initializeRoutes = () => {
    this.router.get(this.path, (req: Request, res: Response) => {
      res.status(201).json({
        error: null,
        data: {
          server: "Parent Services Are Up",
        },
      });
    });

    this.router.post(
      `${this.path}add-child`,
      (req: Request, res: Response) => {
        this.parentController.addChild(req, res);
      },
    );

    this.router.post(
      `${this.path}assign/cognitive`,
      (req: Request, res: Response) => {
        this.childController.assignCognitive(req, res);
      },
    );

    this.router.post(
      `${this.path}assign/yoga`,
      (req: Request, res: Response) => {
        this.childController.assignYoga(req, res);
      },
    );
  };
}

export default ParentRoute;
