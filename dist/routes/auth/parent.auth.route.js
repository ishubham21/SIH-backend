"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parent_auth_controller_1 = __importDefault(require("../../controllers/auth/parent.auth.controller"));
const parent_auth_middleware_1 = __importDefault(require("../../middlewares/auth/parent.auth.middleware"));
class ParentAuthRoute {
    constructor() {
        this.path = "/";
        this.intializeRoutes = () => {
            this.router.get(this.path, (req, res) => {
                res.status(201).json({
                    error: null,
                    data: {
                        server: "Healthy Parent Auth Service",
                    },
                });
            });
            this.router.post(`${this.path}register`, (req, res) => {
                this.authController.register(req, res);
            });
            this.router.post(`${this.path}login`, (req, res) => {
                this.authController.login(req, res);
            });
            this.router.get(`${this.path}dashboard`, parent_auth_middleware_1.default, (req, res) => {
                this.authController.getParentData(req, res);
            });
        };
        this.router = (0, express_1.Router)();
        this.intializeRoutes();
        this.authController = new parent_auth_controller_1.default();
    }
}
exports.default = ParentAuthRoute;
//# sourceMappingURL=parent.auth.route.js.map