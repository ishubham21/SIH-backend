import { Router, Request, Response } from "express";
import ParentController from "../../controllers/parent/index.controller";

class ParentRoute {
  public path = "/";
  private parentController;
  public router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();

    this.parentController = new ParentController();
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
  };
}

export default ParentRoute;
