"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = __importDefault(require("../../controllers/child/index.controller"));
const index_controller_2 = __importDefault(require("../../controllers/parent/index.controller"));
class ParentRoute {
    constructor() {
        this.path = "/";
        this.initializeRoutes = () => {
            this.router.get(this.path, (req, res) => {
                res.status(201).json({
                    error: null,
                    data: {
                        server: "Parent Services Are Up",
                    },
                });
            });
            this.router.get(`${this.path}data`, (req, res) => {
                return res.status(403).json({
                    error: "Please pass in parent id - /parent/data/some-parent-id",
                    data: null,
                });
            });
            this.router.get(`${this.path}data/:id`, (req, res) => {
                this.parentController.getParentById(req, res);
            });
            this.router.post(`${this.path}add-child`, (req, res) => {
                this.parentController.addChild(req, res);
            });
            this.router.post(`${this.path}assign/cognitive`, (req, res) => {
                this.childController.assignCognitive(req, res);
            });
            this.router.post(`${this.path}assign/yoga`, (req, res) => {
                this.childController.assignYoga(req, res);
            });
        };
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
        this.parentController = new index_controller_2.default();
        this.childController = new index_controller_1.default();
    }
}
exports.default = ParentRoute;
//# sourceMappingURL=index.route.js.map