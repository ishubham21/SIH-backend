import { Request, Response, NextFunction } from "express";
import { ParentWithoutPassword } from "../../interfaces";
import JWTService from "../../services/jwt.service";

const parentAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //header should be set as parent-token

  const token = req.header("parent-token");
  if (!token) {
    return res.status(403).json({
      error: "Parent JWT not found in the request headers",
      data: null,
    });
  }

  try {
    const jwtService = new JWTService();
    const parentData: ParentWithoutPassword =
      (await jwtService.verifyAccessToken(
        token,
      )) as ParentWithoutPassword;

    //attaching decoded parentData with the response
    res.locals.parentData = parentData;
    next();
  } catch (error) {
    return res.status(501).json({
      error,
      data: null,
    });
  }
};

export default parentAuthMiddleware;
