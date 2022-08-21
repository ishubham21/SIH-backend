"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class ParentService {
    constructor() {
        this.getParentById = (id) => {
            return new Promise((resolve, reject) => {
                this.parent
                    .findUnique({
                    where: {
                        id,
                    },
                    include: {
                        children: {
                            include: {
                                assignedCognitiveOnChild: {
                                    include: {
                                        task: true,
                                    },
                                },
                                assignedYogaOnChild: {
                                    include: {
                                        yoga: true,
                                    },
                                },
                                availableCognitiveOnChild: {
                                    include: {
                                        task: true,
                                    },
                                },
                                availableYogaOnChild: {
                                    include: {
                                        yoga: true,
                                    },
                                },
                                completedCognitiveOnChild: {
                                    include: {
                                        task: true,
                                    },
                                },
                                completedYogaOnChild: {
                                    include: {
                                        yoga: true,
                                    },
                                },
                            },
                        },
                    },
                })
                    .then((parentData) => {
                    if (!parentData) {
                        return reject("No parent with this ID could be found");
                    }
                    let { password } = parentData, parentWithoutPassword = __rest(parentData, ["password"]);
                    password = "";
                    return resolve(parentWithoutPassword);
                })
                    .catch(() => {
                    return reject({
                        errCode: 503,
                        errMsg: "Internal server error occured while searching for specified parent",
                    });
                });
            });
        };
        this.findParentById = (id) => {
            return new Promise((resolve, reject) => {
                this.parent
                    .findUnique({
                    where: {
                        id,
                    },
                })
                    .then((data) => {
                    data ? resolve(true) : resolve(false);
                })
                    .catch((err) => {
                    reject(Object.assign(Object.assign({}, err), { occurance: "This occured during finding the respective parent" }));
                });
            });
        };
        this.parent = new client_1.PrismaClient().parent;
    }
}
exports.default = ParentService;
//# sourceMappingURL=index.service.js.map