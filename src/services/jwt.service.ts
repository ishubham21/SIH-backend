import jsonwebtoken, { JsonWebTokenError } from "jsonwebtoken";
import { JWT_ACCESS_TOKEN_SECRET } from "./../config";
import { ParentInterface, ChildInterface } from "../interfaces";

class JWT {
  private jwtSecret: string;

  constructor() {
    this.jwtSecret = JWT_ACCESS_TOKEN_SECRET as string;
  }

  public signAccessToken = (
    payload: ParentInterface | ChildInterface,
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
  ): Promise<
    ParentInterface | ChildInterface | JsonWebTokenError
  > => {
    return new Promise<
      ParentInterface | ChildInterface | JsonWebTokenError
    >((resolve, reject) => {
      jsonwebtoken.verify(token, this.jwtSecret, (err, payload) => {
        if (err) {
          return reject(err as JsonWebTokenError);
        }

        resolve(payload as ParentInterface | ChildInterface);
      });
    });
  };
}

export default JWT;
