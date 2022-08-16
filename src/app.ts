import express, { Application } from "express";
import cors from "cors";
import { NODE_ENV, PORT } from "./config";
import ParentAuthRoute from "./routes/auth/parent.auth.route";
import ChildAuthRoute from "./routes/auth/child.auth.route";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import ParentRoute from "./routes/parent/index.route";
import ChildRoute from "./routes/child/index.route";

class App {
  /**
   * Variables
   */
  public app: Application;
  public env: string;
  public port: string | number;
  public parentAuthRoute;
  public childAuthRoute;
  public parentRoute;
  public childRoute;

  constructor() {
    /**
     * Instantiating the server using the configurations
     */
    this.app = express();
    this.env = NODE_ENV || "development";
    this.port = PORT || 4000;
    this.parentAuthRoute = new ParentAuthRoute();
    this.childAuthRoute = new ChildAuthRoute();
    this.parentRoute = new ParentRoute();
    this.childRoute = new ChildRoute();

    /**
     * Up all the middlewares
     */
    this.initializeMiddlewares();

    /**
     * Initialize sentry to capture server errors
     */
    this.initializeSentryService();

    this.app.get("/", (req, res) => {
      res.status(200).json({
        error: null,
        data: {
          server: "Base-Healthy",
        },
      });
    });

    /**
     * Route to test the sentry health
     */
    this.app.get("/debug-sentry", () => {
      throw new Error("Sentry Fine");
    });

    //route not present case
    this.app.all("*", (req, res) => {
      res.status(404).json({
        error: "Request route not present - 404",
        data: null,
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

    /**
     * Route middlewares are up
     */
    this.initializeRouteMiddlewares();

    /**
     * Sentry middlewares are up
     */
    this.initalizeSentryMiddlewares();
  };

  private initializeRouteMiddlewares = () => {
    //route middlewares

    //parent auth
    this.app.use("/auth/parent", this.parentAuthRoute.router);
    //child auth
    this.app.use("/auth/child", this.childAuthRoute.router);

    //parent route
    this.app.use("/parent", this.parentRoute.router);

    this.app.use("/child", this.childRoute.router);
  };

  private initializeSentryService = () => {
    Sentry.init({
      dsn: "https://019243f1bca54654a924abdfd214fd68@o1331436.ingest.sentry.io/6645714",
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app: this.app }),
      ],

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
    });
  };

  private initalizeSentryMiddlewares = () => {
    //sentry middlewares
    this.app.use(Sentry.Handlers.requestHandler());
    // TracingHandler creates a trace for every incoming request
    this.app.use(Sentry.Handlers.tracingHandler());

    // The error handler must be before any other error middleware and after all controllers
    this.app.use(
      Sentry.Handlers.errorHandler({
        shouldHandleError(error) {
          // Capture all 404 and 500 errors
          if (error.status === 404 || error.status === 500) {
            return true;
          }
          return false;
        },
      }),
    );
  };
}

export default App;
