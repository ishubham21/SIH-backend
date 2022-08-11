import jsonwebtoken, { JsonWebTokenError } from "jsonwebtoken";
import { JWT_ACCESS_TOKEN_SECRET } from "./../config";
import { Child, Parent } from "@prisma/client";

class JWTService {
  private jwtSecret: string;

  constructor() {
    this.jwtSecret = JWT_ACCESS_TOKEN_SECRET as string;
  }

  public signAccessToken = (
    payload: Parent | Child,
  ): Promise<string | JsonWebTokenError> => {
    return new Promise<string | JsonWebTokenError>(
      (resolve, reject) => {
        jsonwebtoken.sign(
          { payload },
          this.jwtSecret,
          {},
          (err, token) => {
            if (err) {
              return reject(err as JsonWebTokenError);
            }

            resolve(token as string);
          },
        );
      },
    );
  };

  public verifyAccessToken = (
    token: string,
  ): Promise<Parent | Child | JsonWebTokenError> => {
    return new Promise<Parent | Child | JsonWebTokenError>(
      (resolve, reject) => {
        jsonwebtoken.verify(token, this.jwtSecret, (err, payload) => {
          if (err) {
            return reject(err as JsonWebTokenError);
          }

          resolve(payload as Parent | Child);
        });
      },
    );
  };
}

export default JWTService;
