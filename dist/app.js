"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const parent_auth_route_1 = __importDefault(require("./routes/auth/parent.auth.route"));
const child_auth_route_1 = __importDefault(require("./routes/auth/child.auth.route"));
const Sentry = __importStar(require("@sentry/node"));
const Tracing = __importStar(require("@sentry/tracing"));
const index_route_1 = __importDefault(require("./routes/parent/index.route"));
const index_route_2 = __importDefault(require("./routes/child/index.route"));
class App {
    constructor() {
        this.getServer = () => this.app;
        this.initializeMiddlewares = () => {
            this.app.use((0, cors_1.default)());
            this.app.use(express_1.default.json());
            this.initializeRouteMiddlewares();
            this.initalizeSentryMiddlewares();
        };
        this.initializeRouteMiddlewares = () => {
            this.app.use("/auth/parent", this.parentAuthRoute.router);
            this.app.use("/auth/child", this.childAuthRoute.router);
            this.app.use("/parent", this.parentRoute.router);
            this.app.use("/child", this.childRoute.router);
        };
        this.initializeSentryService = () => {
            Sentry.init({
                dsn: "https://019243f1bca54654a924abdfd214fd68@o1331436.ingest.sentry.io/6645714",
                integrations: [
                    new Sentry.Integrations.Http({ tracing: true }),
                    new Tracing.Integrations.Express({ app: this.app }),
                ],
                tracesSampleRate: 1.0,
            });
        };
        this.initalizeSentryMiddlewares = () => {
            this.app.use(Sentry.Handlers.requestHandler());
            this.app.use(Sentry.Handlers.tracingHandler());
            this.app.use(Sentry.Handlers.errorHandler({
                shouldHandleError(error) {
                    if (error.status === 404 || error.status === 500) {
                        return true;
                    }
                    return false;
                },
            }));
        };
        this.app = (0, express_1.default)();
        this.env = config_1.NODE_ENV || "development";
        this.port = config_1.PORT || 4000;
        this.parentAuthRoute = new parent_auth_route_1.default();
        this.childAuthRoute = new child_auth_route_1.default();
        this.parentRoute = new index_route_1.default();
        this.childRoute = new index_route_2.default();
        this.initializeMiddlewares();
        this.initializeSentryService();
        this.app.get("/", (req, res) => {
            res.status(200).json({
                error: null,
                data: {
                    server: "Base-Healthy",
                },
            });
        });
        this.app.get("/debug-sentry", () => {
            throw new Error("Sentry Fine");
        });
        this.app.all("*", (req, res) => {
            res.status(404).json({
                error: "Request route not present - 404",
                data: null,
            });
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is up on the port: ${this.port}`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map