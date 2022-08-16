import ChildService from "../../services/child/index.service";
import { Request, Response } from "express";
import { Child } from "@prisma/client";

class ChildController {
  private childService;

  constructor() {
    this.childService = new ChildService();
  }

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
