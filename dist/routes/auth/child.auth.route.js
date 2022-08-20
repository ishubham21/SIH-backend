"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const child_auth_controller_1 = __importDefault(require("../../controllers/auth/child.auth.controller"));
const child_auth_middleware_1 = __importDefault(require("../../middlewares/auth/child.auth.middleware"));
class ChildAuthRoute {
    constructor() {
        this.path = "/";
        this.initialzeRoute = () => {
            this.router.get(this.path, (req, res) => {
                res.status(201).json({
                    error: null,
                    data: {
                        server: "Healthy Children Auth Service",
                    },
                });
            });
            this.router.post(`${this.path}login`, (req, res) => {
                this.authController.login(req, res);
            });
            this.router.get(`${this.path}dashboard`, child_auth_middleware_1.default, (req, res) => {
                this.authController.getChildData(req, res);
            });
        };
        this.router = (0, express_1.Router)();
        this.initialzeRoute();
        this.authController = new child_auth_controller_1.default();
    }
}
exports.default = ChildAuthRoute;
//# sourceMappingURL=child.auth.route.js.map