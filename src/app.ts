import express, { Application } from "express";
import cors from "cors";
import { NODE_ENV, SERVER_PORT } from "./config";
import ParentAuthController from "./controllers/auth/parent.auth.controller";

class App {
  /**
   * Variables
   */
  public app: Application;
  public env: string;
  public port: string | number;
  private parentAuthController;

  constructor() {
    /**
     * Instantiating the server using the configurations
     */
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = SERVER_PORT || 4000;

    this.parentAuthController = new ParentAuthController();

    this.initializeMiddlewares();
    this.app.get("/", (req, res) => {
      res.send("The API is up and running");
    });

    this.app.post("/", (req, res) => {
      this.parentAuthController.login(req, res);
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
