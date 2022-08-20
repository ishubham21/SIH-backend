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
const jwt_service_1 = __importDefault(require("../../services/jwt.service"));
const childAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header("child-token");
    if (!token) {
        return res.status(403).json({
            error: "Child JWT not found in the request headers",
            data: null,
        });
    }
    try {
        const jwtService = new jwt_service_1.default();
        const jwtPayload = yield jwtService.verifyAccessToken(token);
        res.locals.data = jwtPayload.payload;
        next();
    }
    catch (error) {
        return res.status(501).json({
            error,
            data: null,
        });
    }
});
exports.default = childAuthMiddleware;
//# sourceMappingURL=child.auth.middleware.js.map