import Joi, { ValidationError } from "joi";
import { ChildRegister } from "../../interfaces";
import ParentService from "../../services/parent/index.service";
import { Request, Response } from "express";
import ChildService from "../../services/child/index.service";

class ParentController {
  private parentService;
  private childService;

  constructor() {
    this.parentService = new ParentService();
    this.childService = new ChildService();
  }

  private validateChildData = (childData: ChildRegister) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(256).required(),
      ageGroup: Joi.string()
        .valid("PreSchool", "PreTeen", "Teen")
        .required(),
      gender: Joi.string()
        .valid("Male", "Female", "Other")
        .required(),
      parentId: Joi.string().required(),
    });

    return schema.validate(childData);
  };

  public addChild = async (req: Request, res: Response) => {
    const childRegister: ChildRegister = req.body;
    const validationError: ValidationError | null | undefined =
      this.validateChildData(childRegister).error;

    if (!validationError) {
      try {
        const childId = await this.childService.addChild(
          childRegister,
        );

        return res.status(201).json({
          error: null,
          data: {
            childId,
          },
        });
      } catch (error) {
        return res.status(501).json({
          error: error,
          data: null,
        });
      }
    } else {
      return res.status(403).json({
        error: validationError.message,
        data: null,
      });
    }
  };
}

export default ParentController;
