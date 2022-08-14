import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
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
    const jwtPayload: JwtPayload = await jwtService.verifyAccessToken(
      token,
    );

    //attaching decoded jwt payload with the response
    //returns Parent || Child[]
    res.locals.data = jwtPayload.payload;
    next();
  } catch (error) {
    return res.status(501).json({
      error,
      data: null,
    });
  }
};

export default parentAuthMiddleware;
