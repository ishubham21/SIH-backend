import { Request, Response, Router } from "express";
import ChildAuthController from "../../controllers/auth/child.auth.controller";
import childAuthMiddleware from "../../middlewares/auth/child.auth.middleware";

class ChildAuthRoute {
  public path = "/";
  public router;
  private authController;

  constructor() {
    this.router = Router();
    this.initialzeRoute();

    this.authController = new ChildAuthController();
  }

  private initialzeRoute = () => {
    this.router.get(this.path, (req: Request, res: Response) => {
      res.status(201).json({
        error: null,
        data: {
          server: "Healthy Children Auth Service",
        },
      });
    });

    //only login is available in children
    this.router.post(
      `${this.path}login`,
      (req: Request, res: Response) => {
        this.authController.login(req, res);
      },
    );

    //getParentData route with middleware
    this.router.get(
      `${this.path}dashboard`,
      childAuthMiddleware,
      (req: Request, res: Response) => {
        this.authController.getChildData(req, res);
      },
    );
  };
}

export default ChildAuthRoute;
