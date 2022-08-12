import jsonwebtoken, {
  JsonWebTokenError,
  JwtPayload,
} from "jsonwebtoken";
import { JWT_ACCESS_TOKEN_SECRET } from "./../config";
import { Child } from "@prisma/client";
import { ParentWithoutPassword } from "../interfaces";

class JWTService {
  private jwtSecret: string;

  constructor() {
    this.jwtSecret = JWT_ACCESS_TOKEN_SECRET as string;
  }

  public signAccessToken = (
    payload: ParentWithoutPassword | Child[] | [],
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

  public verifyAccessToken = (token: string): Promise<JwtPayload> => {
    return new Promise<JwtPayload>((resolve, reject) => {
      jsonwebtoken.verify(token, this.jwtSecret, (err, payload) => {
        if (err) {
          return reject(err as JsonWebTokenError);
        }

        resolve(payload as JwtPayload);
      });
    });
  };
}

export default JWTService;
