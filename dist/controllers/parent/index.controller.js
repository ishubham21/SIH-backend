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
const joi_1 = __importDefault(require("joi"));
const index_service_1 = __importDefault(require("../../services/parent/index.service"));
const index_service_2 = __importDefault(require("../../services/child/index.service"));
class ParentController {
    constructor() {
        this.validateChildData = (childData) => {
            const schema = joi_1.default.object({
                name: joi_1.default.string().min(3).max(256).required(),
                ageGroup: joi_1.default.string()
                    .valid("Toddler", "Preschool", "Preteen", "Teen")
                    .required(),
                gender: joi_1.default.string()
                    .valid("Male", "Female", "Other")
                    .required(),
                parentId: joi_1.default.string().required(),
            });
            return schema.validate(childData);
        };
        this.getParentById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params["id"];
            if (!id) {
                return res.status(403).json({
                    error: "Please pass in parent id - /parent/data/:id",
                    data: null,
                });
            }
            try {
                const parent = yield this.parentService.getParentById(id);
                return res.status(200).json({
                    error: null,
                    data: Object.assign({}, parent),
                });
            }
            catch (error) {
                res.status(400).json({
                    error,
                    data: null,
                });
            }
        });
        this.addChild = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const childRegister = req.body;
            const validationError = this.validateChildData(childRegister).error;
            if (!validationError) {
                try {
                    const childId = yield this.childService.addChild(childRegister);
                    return res.status(201).json({
                        error: null,
                        data: {
                            childId,
                        },
                    });
                }
                catch (error) {
                    return res.status(500).json({
                        error: error,
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
        this.parentService = new index_service_1.default();
        this.childService = new index_service_2.default();
    }
}
exports.default = ParentController;
//# sourceMappingURL=index.controller.js.map