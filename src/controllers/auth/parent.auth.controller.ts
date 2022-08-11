import ParentAuthService from "../../services/auth/parent.auth.service";
import { Request, Response } from "express";
import { ParentRegister } from "../../interfaces";
import Joi, { ValidationResult, ValidationError } from "joi";
import Bcrypt from "bcryptjs";

class ParentAuthController {
  private authService;

  constructor() {
    this.authService = new ParentAuthService();
  }

  private validateParent = (
    parentData: ParentRegister,
  ): ValidationResult => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(256).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(256).required(),
    });

    return schema.validate(parentData);
  };

  private encryptPassword = (password: string) => {
    return Bcrypt.hashSync(password, 10);
  };

  // private decryptPassword = (password: string) => {
  //   return Bcrypt.compareSync
  // }

  public register = async (req: Request, res: Response) => {
    //validate input here and sanitize it
    const parentData: ParentRegister = req.body;
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
        //server error
        return res.status(501).json({
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
}

export default ParentAuthController;
