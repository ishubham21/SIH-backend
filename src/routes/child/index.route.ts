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
  };
}

export default ChildRoute;
