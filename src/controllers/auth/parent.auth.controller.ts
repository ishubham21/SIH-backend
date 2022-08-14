import ParentAuthService from "../../services/auth/parent.auth.service";
import { Request, Response } from "express";
import { LoginBody, ParentRegister } from "../../interfaces";
import Joi, { ValidationResult, ValidationError } from "joi";

class ParentAuthController {
  private authService;

  constructor() {
    this.authService = new ParentAuthService();
  }

  private validateRegistrationData = (
    parentData: ParentRegister,
  ): ValidationResult => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(256).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(256).required(),
    });

    return schema.validate(parentData);
  };

  private validateLoginData = (parentData: LoginBody) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(256).required(),
    });

    return schema.validate(parentData);
  };

  public register = async (req: Request, res: Response) => {
    //validate input here and sanitize it
    const parentRegister: ParentRegister = req.body;
    const validationError: ValidationError | null | undefined =
      this.validateRegistrationData(parentRegister).error;

    if (!validationError) {
      try {
        const parentId: string = await this.authService.register(
          parentRegister,
        );

        return res.status(201).json({
          error: null,
          data: {
            parentId,
          },
        });
      } catch (error) {
        //server error
        return res.status(501).json({
          error,
          data: null,
        });
      }
    } else {
      //body validation failed
      return res.status(403).json({
        error: validationError.message,
        data: null,
      });
    }
  };

  public login = async (req: Request, res: Response) => {
    const parentLogin: LoginBody = req.body;
    const validationError: ValidationError | null | undefined =
      this.validateLoginData(parentLogin).error;

    if (!validationError) {
      //call auth login service
      try {
        const token: string = await this.authService.login(
          parentLogin,
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

  public getParentData = async (req: Request, res: Response) => {
    try {
      //get it from the request - attach parent data in the reuqest using iddleware
      return res.status(201).json({
        error: null,
        data: res.locals.data,
      });
    } catch (error) {
      return res.status(504).json({
        error:
          "Some server error occured and parent data can not be retrieved",
      });
    }
  };
}

export default ParentAuthController;
