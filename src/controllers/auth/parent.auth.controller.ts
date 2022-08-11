import ParentAuthService from "../../services/auth/parent.auth.service";
import { NextFunction, Request, Response } from "express";
import { ParentInterface } from "../../interfaces";
import Joi, { ValidationResult, ValidationError } from "joi";
import Bcrypt from "bcryptjs";

class ParentAuthController {
  private authService;

  constructor() {
    this.authService = new ParentAuthService();
  }

  private validateParent = (
    parentData: ParentInterface,
  ): ValidationResult => {
    const schema = Joi.object({
      name: Joi.string().min(1).max(256).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(256).required(),
    });

    return schema.validate(parentData);
  };

  private encryptPassword = (password: string) => {
    return Bcrypt.hashSync(password, 10);
  };

  public register = async (req: Request, res: Response) => {
    //validate input here and sanitize it
    const parentData: ParentInterface = req.body;
    const validationError: ValidationError | undefined =
      this.validateParent(parentData).error;

    if (!validationError) {
      try {
        parentData.password = this.encryptPassword(
          parentData.password,
        );
        const parentID: string = await this.authService.register(
          parentData,
        );

        return res.status(201).json({
          error: null,
          data: {
            parentID,
          },
        });
      } catch (error) {
        return res.json({
          error,
          data: null,
        });
      }
    } else {
      res.status(403).json({
        error: validationError,
        data: null,
      });
    }
  };
}

export default ParentAuthController;
