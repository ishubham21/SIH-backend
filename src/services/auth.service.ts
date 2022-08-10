import JWT from "./jwt.service";
import { PrismaClient } from "@prisma/client";
import {} from "../config";

class AuthService {
  private jwtService;

  constructor() {
    //initialising a JWT service
    this.jwtService = new JWT();
  }

  static async register(data: any) {
    const { email } = data;
    console.log(data);
  }

  // static async register(data) {
  //   const { email } = data;
  //   data.password = bcrypt.hashSync(data.password, 8);
  //   let user = prisma.user.create({
  //     data,
  //   });
  //   data.accessToken = await jwt.signAccessToken(user);

  //   return data;
  // }
}

export default AuthService; 
