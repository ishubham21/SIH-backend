"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = __importDefault(require("../../controllers/child/index.controller"));
class ChildRoute {
    constructor() {
        this.path = "/";
        this.initializeRoutes = () => {
            this.router.get(`${this.path}`, (req, res) => {
                res.status(200).json({
                    error: null,
                    data: "Child - Healthy",
                });
            });
            this.router.get(`${this.path}data/:id`, (req, res) => {
                this.childController.getChildById(req, res);
            });
            this.router.post(`${this.path}complete/cognitive`, (req, res) => {
                this.childController.completeCognitive(req, res);
            });
            this.router.post(`${this.path}complete/yoga`, (req, res) => {
                this.childController.completeYoga(req, res);
            });
        };
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
        this.childController = new index_controller_1.default();
    }
}
exports.default = ChildRoute;
//# sourceMappingURL=index.route.js.map