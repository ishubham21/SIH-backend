import ChildService from "../../services/child/index.service";
import { Request, Response } from "express";
import { Child } from "@prisma/client";
import TaskService from "../../services/task/index.service";
import YogaService from "../../services/yoga/index.service";
import Joi, { ValidationError } from "joi";
import { CognitiveRequest } from "../../interfaces";

class ChildController {
  private childService;
  private yogaService;
  private taskService;

  constructor() {
    this.childService = new ChildService();
    this.taskService = new TaskService();
    this.yogaService = new YogaService();
  }

  private verifyCognitiveRequests = (
    requestBody: CognitiveRequest,
  ) => {
    const schema = Joi.object({
      childId: Joi.string().required(),
      cognitiveTaskId: Joi.required(),
    });

    return schema.validate(requestBody);
  };

  public assignCognitive = async (req: Request, res: Response) => {
    const { childId, cognitiveTaskId } = req.body;

    const validationError: ValidationError | null | undefined =
      this.verifyCognitiveRequests(req.body).error;

    if (!validationError) {
      try {
        await this.childService.getChildById(childId);
        await this.taskService.getCognitiveTaskById(cognitiveTaskId);

        const task = await this.childService.assignCognitive(
          childId,
          cognitiveTaskId,
        );

        return res.status(200).json({
          error: null,
          data: {
            task,
            status: "Assignment successful",
          },
        });
      } catch (error) {
        return res.status(400).json({
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

  public completeCognitive = async (req: Request, res: Response) => {
    const { childId, cognitiveTaskId } = req.body;

    const validationError: ValidationError | null | undefined =
      this.verifyCognitiveRequests(req.body).error;

    if (!validationError) {
      //search if child and task are present or not
      try {
        await this.childService.getChildById(childId);
        await this.taskService.getCognitiveTaskById(cognitiveTaskId);
        await this.taskService.getAssignedCognitiveTask(
          childId,
          cognitiveTaskId,
        );

        const task = await this.childService.completeCognitive(
          childId,
          cognitiveTaskId,
        );

        return res.status(200).json({
          error: null,
          data: {
            task,
            status: "Completion successful",
          },
        });
      } catch (error) {
        return res.status(400).json({
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

  public getChildById = async (req: Request, res: Response) => {
    //return child from here
    const id = req.params["id"];

    if (!id) {
      return res.status(403).json({
        error: "Please pass in child id",
      });
    }

    //get child by id
    try {
      const child: Child = await this.childService.getChildById(id);
      return res.status(201).json({
        error: null,
        data: {
          ...child,
        },
      });
    } catch (error) {
      //return error
      res.status(400).json({
        error,
        data: null,
      });
    }
  };
}

export default ChildController;
