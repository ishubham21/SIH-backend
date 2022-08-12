import ChildAuthService from "../../services/auth/child.auth.service";
import { Request, Response } from "express";
import { LoginBody } from "../../interfaces";
import Joi, { ValidationError } from "joi";

class ChildAuthController {
  private authService;

  constructor() {
    this.authService = new ChildAuthService();
  }

  //since we login using parentData
  private validateLoginData = (parentData: LoginBody) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(256).required(),
    });

    return schema.validate(parentData);
  };

  public login = async (req: Request, res: Response) => {
    const childLogin: LoginBody = req.body;
    const validationError: ValidationError | null | undefined =
      this.validateLoginData(childLogin).error;

    if (!validationError) {
      //call auth login service
      try {
        //thing that changes everything - returns Child[]
        const token: string = await this.authService.login(
          childLogin,
          true,
        );

        //success
        return res.status(201).json({
          error: null,
          data: {
            token,
          },
        });
      } catch (error) {
        //server error
        return res.status(403 | 501).json({
          error,
          data: null,
        });
      }
    } else {
      //body validation failed
      res.status(403).json({
        error: validationError.message,
        data: null,
      });
    }
  };

  //for the use by middleware
  public getChildData = async (req: Request, res: Response) => {
    try {
      //get it from the request - attach parent data in the reuqest using iddleware
      return res.status(201).json({
        error: null,
        data: res.locals.data,
      });
    } catch (error) {
      return res.status(504).json({
        error:
          "Some server error occured and child data can not be retrieved",
      });
    }
  };
}

export default ChildAuthController;
