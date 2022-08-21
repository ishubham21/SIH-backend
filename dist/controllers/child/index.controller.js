"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_service_1 = __importDefault(require("../../services/child/index.service"));
const index_service_2 = __importDefault(require("../../services/task/index.service"));
const index_service_3 = __importDefault(require("../../services/yoga/index.service"));
const joi_1 = __importDefault(require("joi"));
class ChildController {
    constructor() {
        this.verifyCognitiveRequests = (requestBody) => {
            const schema = joi_1.default.object({
                childId: joi_1.default.string().required(),
                cognitiveTaskId: joi_1.default.required(),
            });
            return schema.validate(requestBody);
        };
        this.verifyCompleteCognitiveRequest = (requestBody) => {
            const schema = joi_1.default.object({
                childId: joi_1.default.string().required(),
                cognitiveTaskId: joi_1.default.required(),
                score: joi_1.default.required(),
            });
            return schema.validate(requestBody);
        };
        this.verifyYogaRequests = (requestBody) => {
            const schema = joi_1.default.object({
                childId: joi_1.default.string().required(),
                yogaId: joi_1.default.required(),
            });
            return schema.validate(requestBody);
        };
        this.assignYoga = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { childId, yogaId } = req.body;
            const validationError = this.verifyYogaRequests(req.body).error;
            if (!validationError) {
                try {
                    yield this.childService.getChildById(childId);
                    yield this.yogaService.getYogaById(yogaId);
                    const yoga = yield this.childService.assignYoga(childId, yogaId);
                    return res.status(200).json({
                        error: null,
                        data: {
                            yoga,
                            status: "Assignment successful",
                        },
                    });
                }
                catch (error) {
                    return res.status(400).json({
                        error,
                        data: null,
                    });
                }
            }
            else {
                return res.status(403).json({
                    error: validationError.message,
                    data: null,
                });
            }
        });
        this.assignCognitive = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { childId, cognitiveTaskId } = req.body;
            const validationError = this.verifyCognitiveRequests(req.body).error;
            if (!validationError) {
                try {
                    yield this.childService.getChildById(childId);
                    yield this.taskService.getCognitiveTaskById(cognitiveTaskId);
                    const task = yield this.childService.assignCognitive(childId, cognitiveTaskId);
                    return res.status(200).json({
                        error: null,
                        data: {
                            task,
                            status: "Assignment successful",
                        },
                    });
                }
                catch (error) {
                    return res.status(400).json({
                        error,
                        data: null,
                    });
                }
            }
            else {
                return res.status(403).json({
                    error: validationError.message,
                    data: null,
                });
            }
        });
        this.completeYoga = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { childId, yogaId } = req.body;
            const validationError = this.verifyYogaRequests(req.body).error;
            if (!validationError) {
                try {
                    yield this.childService.getChildById(childId);
                    yield this.yogaService.getYogaById(yogaId);
                    const yoga = this.childService.completeYoga(childId, yogaId);
                    return res.status(200).json({
                        error: null,
                        data: {
                            yoga,
                            status: "Completion successful",
                        },
                    });
                }
                catch (error) {
                    return res.status(400).json({
                        error,
                        data: null,
                    });
                }
            }
            else {
                return res.status(403).json({
                    error: validationError.message,
                    data: null,
                });
            }
        });
        this.completeCognitive = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { childId, cognitiveTaskId, score } = req.body;
            const validationError = this.verifyCompleteCognitiveRequest(req.body).error;
            if (!validationError) {
                try {
                    yield this.childService.getChildById(childId);
                    yield this.taskService.getCognitiveTaskById(cognitiveTaskId);
                    yield this.taskService.getAssignedCognitiveTask(childId, cognitiveTaskId);
                    const task = yield this.childService.completeCognitive(childId, cognitiveTaskId, score);
                    return res.status(200).json({
                        error: null,
                        data: {
                            task,
                            status: "Completion successful",
                        },
                    });
                }
                catch (error) {
                    return res.status(400).json({
                        error,
                        data: null,
                    });
                }
            }
            else {
                return res.status(403).json({
                    error: validationError.message,
                    data: null,
                });
            }
        });
        this.getChildById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params["id"];
            if (!id) {
                return res.status(403).json({
                    error: "Please pass in child id",
                    data: null,
                });
            }
            try {
                const child = yield this.childService.getChildById(id);
                return res.status(201).json({
                    error: null,
                    data: Object.assign({}, child),
                });
            }
            catch (error) {
                res.status(400).json({
                    error,
                    data: null,
                });
            }
        });
        this.childService = new index_service_1.default();
        this.taskService = new index_service_2.default();
        this.yogaService = new index_service_3.default();
    }
}
exports.default = ChildController;
//# sourceMappingURL=index.controller.js.map