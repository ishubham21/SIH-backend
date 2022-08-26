import ChildService from "../../services/child/index.service";
import { Request, Response } from "express";
import { Child } from "@prisma/client";
import TaskService from "../../services/task/index.service";
import YogaService from "../../services/yoga/index.service";
import Joi, { ValidationError } from "joi";
import {
  CognitiveRequest,
  CompleteCognitiveRequest,
  YogaRequest,
} from "../../interfaces";

class ChildController {
  private childService;
  private yogaService;
  private taskService;

  constructor () {
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

  private verifyCompleteCognitiveRequest = (
    requestBody: CompleteCognitiveRequest,
  ) => {
    //78bb2bc1-011f-4774-bf63-6efbfdea5bc5
    const schema = Joi.object({
      childId: Joi.string().required(),
      cognitiveTaskId: Joi.required(),
      score: Joi.required(),
      totalQuestions: Joi.required(),
      correctQuestions: Joi.required(),
    });

    return schema.validate(requestBody);
  };

  private verifyYogaRequests = (requestBody: YogaRequest) => {
    const schema = Joi.object({
      childId: Joi.string().required(),
      yogaId: Joi.required(),
    });

    return schema.validate(requestBody);
  };

  public assignYoga = async (req: Request, res: Response) => {
    const { childId, yogaId } = req.body;

    const validationError:
      | ValidationError
      | null
      | undefined = this.verifyYogaRequests(req.body).error;

    if (!validationError) {
      try {
        await this.childService.getChildById(childId);
        await this.yogaService.getYogaById(yogaId);

        const yoga = await this.childService.assignYoga(
          childId,
          yogaId,
        );

        return res.status(200).json({
          error: null,
          data: {
            yoga,
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

  public assignCognitive = async (req: Request, res: Response) => {
    const { childId, cognitiveTaskId } = req.body;

    const validationError:
      | ValidationError
      | null
      | undefined = this.verifyCognitiveRequests(req.body).error;

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

  public completeYoga = async (req: Request, res: Response) => {
    const { childId, yogaId } = req.body;

    const validationError:
      | ValidationError
      | null
      | undefined = this.verifyYogaRequests(req.body).error;

    if (!validationError) {
      try {
        await this.childService.getChildById(childId);
        await this.yogaService.getYogaById(yogaId);

        const yoga = this.childService.completeYoga(childId, yogaId);

        return res.status(200).json({
          error: null,
          data: {
            yoga,
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

  public completeCognitive = async (req: Request, res: Response) => {
    const {
      childId,
      cognitiveTaskId,
      score,
      correctQuestions,
      totalQuestions,
    } = req.body;

    const validationError:
      | ValidationError
      | null
      | undefined = this.verifyCompleteCognitiveRequest(req.body)
      .error;

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
          score,
          correctQuestions,
          totalQuestions,
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
        data: null,
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

  public getStatsForChild = async (req: Request, res: Response) => {
    const id = req.params["id"];

    if (!id) {
      return res.status(403).json({
        error: "Please pass in a childId",
        data: null,
      });
    }

    try {
      await this.childService.getChildById(id);
      const tasks = await this.childService.getStatsForChild(id);
      // console.log(tasks);

      res.status(200).json({
        tasks,
      });
    } catch (error) {
      res.status(503).json({
        error,
      });
    }
  };
}

export default ChildController;
