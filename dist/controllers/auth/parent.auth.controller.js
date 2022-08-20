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
const parent_auth_service_1 = __importDefault(require("../../services/auth/parent.auth.service"));
const joi_1 = __importDefault(require("joi"));
class ParentAuthController {
    constructor() {
        this.validateRegistrationData = (parentData) => {
            const schema = joi_1.default.object({
                name: joi_1.default.string().min(3).max(256).required(),
                email: joi_1.default.string().email().required(),
                password: joi_1.default.string().min(6).max(256).required(),
            });
            return schema.validate(parentData);
        };
        this.validateLoginData = (parentData) => {
            const schema = joi_1.default.object({
                email: joi_1.default.string().email().required(),
                password: joi_1.default.string().min(6).max(256).required(),
            });
            return schema.validate(parentData);
        };
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const parentRegister = req.body;
            const validationError = this.validateRegistrationData(parentRegister).error;
            if (!validationError) {
                try {
                    const parentId = yield this.authService.register(parentRegister);
                    return res.status(201).json({
                        error: null,
                        data: {
                            parentId,
                        },
                    });
                }
                catch (error) {
                    return res.status(501).json({
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
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const parentLogin = req.body;
            const validationError = this.validateLoginData(parentLogin).error;
            if (!validationError) {
                try {
                    const token = yield this.authService.login(parentLogin);
                    return res.status(201).json({
                        error: null,
                        data: {
                            token,
                        },
                    });
                }
                catch (error) {
                    return res.status(403 | 501).json({
                        error,
                        data: null,
                    });
                }
            }
            else {
                res.status(403).json({
                    error: validationError.message,
                    data: null,
                });
            }
        });
        this.getParentData = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(201).json({
                    error: null,
                    data: res.locals.data,
                });
            }
            catch (error) {
                return res.status(504).json({
                    error: "Some server error occured and parent data can not be retrieved",
                });
            }
        });
        this.authService = new parent_auth_service_1.default();
    }
}
exports.default = ParentAuthController;
//# sourceMappingURL=parent.auth.controller.js.map