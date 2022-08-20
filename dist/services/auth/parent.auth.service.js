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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = require("bcrypt");
const jwt_service_1 = __importDefault(require("../jwt.service"));
const bcryptjs_1 = require("bcryptjs");
class ParentAuthService {
    constructor() {
        this.isParentPresent = (email) => {
            return new Promise((resolve, reject) => {
                this.parent
                    .findUnique({
                    where: {
                        email,
                    },
                })
                    .then((data) => {
                    data ? resolve(true) : resolve(false);
                })
                    .catch((err) => {
                    reject(Object.assign(Object.assign({}, err), { occurance: "This occured in parent.auth.service" }));
                });
            });
        };
        this.encryptPassword = (password) => __awaiter(this, void 0, void 0, function* () {
            const salt = yield (0, bcryptjs_1.genSalt)(10);
            const hashedPassword = yield (0, bcrypt_1.hash)(password, salt);
            return hashedPassword;
        });
        this.comparePassword = (userPassword, dbPassword) => {
            return (0, bcrypt_1.compare)(userPassword, dbPassword);
        };
        this.register = (data) => __awaiter(this, void 0, void 0, function* () {
            const { email } = data;
            data.password = yield this.encryptPassword(data.password);
            return new Promise((resolve, reject) => {
                this.isParentPresent(email)
                    .then((foundParent) => __awaiter(this, void 0, void 0, function* () {
                    if (!foundParent) {
                        try {
                            const { id } = yield this.parent.create({
                                data,
                            });
                            return resolve(id);
                        }
                        catch (error) {
                            return reject(error);
                        }
                    }
                    return reject("Email is already registered");
                }))
                    .catch((err) => reject(err));
            });
        });
        this.login = (data, isChildLogin) => __awaiter(this, void 0, void 0, function* () {
            const { email } = data;
            return new Promise((resolve, reject) => {
                this.isParentPresent(email)
                    .then((foundParent) => __awaiter(this, void 0, void 0, function* () {
                    if (foundParent) {
                        try {
                            const parentData = (yield this.parent.findUnique({
                                where: {
                                    email,
                                },
                                include: {
                                    children: true,
                                },
                            }));
                            if (yield this.comparePassword(data.password, parentData.password)) {
                                let { password, children } = parentData, parentDataToBeSigned = __rest(parentData, ["password", "children"]);
                                password = "";
                                if (isChildLogin) {
                                    if (children.length == 0) {
                                        return reject("No kids could be found");
                                    }
                                    children = children.filter((child) => child.ageGroup !== "Toddler");
                                    if (children.length == 0) {
                                        return reject("Toddlers are not allowed to access this application");
                                    }
                                }
                                const token = !isChildLogin
                                    ? yield this.jwtService.signAccessToken(Object.assign(Object.assign({}, parentDataToBeSigned), { children }))
                                    : yield this.jwtService.signAccessToken(children);
                                return resolve(token);
                            }
                            else {
                                return reject("Password is not valid");
                            }
                        }
                        catch (error) {
                            return reject(error);
                        }
                    }
                    return reject("Email can not be found");
                }))
                    .catch((err) => reject(err));
            });
        });
        this.parent = new client_1.PrismaClient().parent;
        this.jwtService = new jwt_service_1.default();
    }
}
exports.default = ParentAuthService;
//# sourceMappingURL=parent.auth.service.js.map