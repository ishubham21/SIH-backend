import Joi, { ValidationError } from "joi";
import {
  ChildRegister,
  ParentWithoutPassword,
} from "../../interfaces";
import ParentService from "../../services/parent/index.service";
import { Request, Response } from "express";
import ChildService from "../../services/child/index.service";
import { Parent } from "@prisma/client";

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
        .valid("Toddler", "Preschool", "Preteen", "Teen")
        .required(),
      gender: Joi.string()
        .valid("Male", "Female", "Other")
        .required(),
      parentId: Joi.string().required(),
    });

    return schema.validate(childData);
  };

  public getParentById = async (req: Request, res: Response) => {
    const id = req.params["id"];

    if (!id) {
      return res.status(403).json({
        error: "Please pass in parent id - /parent/data/:id",
        data: null,
      });
    }

    try {
      const parent: ParentWithoutPassword =
        await this.parentService.getParentById(id);
      return res.status(200).json({
        error: null,
        data: {
          ...parent,
        },
      });
    } catch (error) {
      res.status(400).json({
        error,
        data: null,
      });
    }
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
        return res.status(500).json({
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
