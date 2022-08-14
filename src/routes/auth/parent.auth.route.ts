import { Request, Response, Router } from "express";
import ParentAuthController from "../../controllers/auth/parent.auth.controller";
import parentAuthMiddleware from "../../middlewares/auth/parent.auth.middleware";

class ParentAuthRoute {
  public path = "/";
  public router;
  private authController;

  constructor() {
    this.router = Router();
    this.intializeRoutes();

    this.authController = new ParentAuthController();
  }

  private intializeRoutes = () => {
    this.router.get(this.path, (req: Request, res: Response) => {
      res.status(201).json({
        error: null,
        data: {
          server: "Healthy Parent Auth Service",
        },
      });
    });

    this.router.post(
      `${this.path}register`,
      (req: Request, res: Response) => {
        this.authController.register(req, res);
      },
    );

    this.router.post(
      `${this.path}login`,
      (req: Request, res: Response) => {
        this.authController.login(req, res);
      },
    );

    //getParentData route with middleware
    this.router.get(
      `${this.path}dashboard`,
      parentAuthMiddleware,
      (req: Request, res: Response) => {
        this.authController.getParentData(req, res);
      },
    );
  };
}

export default ParentAuthRoute;
