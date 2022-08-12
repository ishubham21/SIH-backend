import express, { Application } from "express";
import cors from "cors";
import { NODE_ENV, PORT } from "./config";
import ParentAuthRoute from "./routes/auth/parent.auth.route";

class App {
  /**
   * Variables
   */
  public app: Application;
  public env: string;
  public port: string | number;
  public parentAuthRoute = new ParentAuthRoute();

  constructor() {
    /**
     * Instantiating the server using the configurations
     */
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 4000;

    /**
     * Up the middlewares
     */
    this.initializeMiddlewares();
    this.app.use("/auth/parent", this.parentAuthRoute.router);

    this.app.get("/", (req, res) => {
      res.status(200).json({
        error: null,
        data: {
          server: "Base-Healthy",
        },
      });
    });
  }

  /**
   * expose the API server on the port provided by .env
   */
  public listen() {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is up on the port: ${this.port}`);
    });
  }

  /**
   *
   * @returns Express app configurations
   */
  public getServer = () => this.app;

  private initializeMiddlewares = () => {
    this.app.use(cors());
    this.app.use(express.json());
  };
}

export default App;
