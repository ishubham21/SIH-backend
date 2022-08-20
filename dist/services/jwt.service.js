"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./../config");
class JWTService {
    constructor() {
        this.signAccessToken = (payload) => {
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.sign({ payload }, this.jwtSecret, {}, (err, token) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(token);
                });
            });
        };
        this.verifyAccessToken = (token) => {
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(token, this.jwtSecret, (err, payload) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(payload);
                });
            });
        };
        this.jwtSecret = config_1.JWT_ACCESS_TOKEN_SECRET;
    }
}
exports.default = JWTService;
//# sourceMappingURL=jwt.service.js.map