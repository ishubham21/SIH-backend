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
const client_1 = require("@prisma/client");
const index_service_1 = __importDefault(require("../parent/index.service"));
class ChildService {
    constructor() {
        this.assignCognitive = (childId, cognitiveTaskId) => {
            return new Promise((resolve, reject) => {
                this.prisma
                    .$transaction([
                    this.prisma.availableCognitiveOnChild.delete({
                        where: {
                            childId_cognitiveTaskId: {
                                childId,
                                cognitiveTaskId,
                            },
                        },
                    }),
                    this.prisma.child.update({
                        where: {
                            id: childId,
                        },
                        data: {
                            assignedCognitiveOnChild: {
                                create: {
                                    cognitiveTaskId,
                                },
                            },
                        },
                    }),
                ])
                    .then((transation) => {
                    const [availableCognitive] = transation;
                    return resolve(availableCognitive);
                })
                    .catch((error) => reject(error));
            });
        };
        this.assignYoga = (childId, yogaId) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.prisma
                    .$transaction([
                    this.prisma.availableYogaOnChild.delete({
                        where: {
                            childId_yogaId: {
                                childId,
                                yogaId,
                            },
                        },
                    }),
                    this.prisma.child.update({
                        where: {
                            id: childId,
                        },
                        data: {
                            assignedYogaOnChild: {
                                create: {
                                    yogaId,
                                },
                            },
                        },
                    }),
                ])
                    .then((value) => {
                    const [availableYoga] = value;
                    return resolve(availableYoga);
                })
                    .catch((error) => reject(error));
            });
        });
        this.completeCognitive = (childId, cognitiveTaskId, score) => {
            return new Promise((resolve, reject) => {
                this.prisma
                    .$transaction([
                    this.prisma.assignedCognitiveOnChild.delete({
                        where: {
                            childId_cognitiveTaskId: {
                                childId,
                                cognitiveTaskId,
                            },
                        },
                    }),
                    this.prisma.child.update({
                        where: {
                            id: childId,
                        },
                        data: {
                            coins: { increment: score },
                            completedCognitiveOnChild: {
                                create: {
                                    cognitiveTaskId,
                                },
                            },
                        },
                    }),
                ])
                    .then((value) => {
                    const [assinedCognitive] = value;
                    return resolve(assinedCognitive);
                })
                    .catch((error) => {
                    return reject(error);
                });
            });
        };
        this.completeYoga = (childId, yogaId) => {
            return new Promise((resolve, reject) => {
                this.prisma
                    .$transaction([
                    this.prisma.assignedYogaOnChild.delete({
                        where: {
                            childId_yogaId: {
                                childId,
                                yogaId,
                            },
                        },
                    }),
                    this.prisma.child.update({
                        where: {
                            id: childId,
                        },
                        data: {
                            coins: {
                                increment: 10,
                            },
                            completedYogaOnChild: {
                                create: {
                                    yogaId,
                                },
                            },
                        },
                    }),
                ])
                    .then((value) => {
                    const [assignedYoga] = value;
                    return resolve(assignedYoga);
                })
                    .catch((error) => {
                    return reject(error);
                });
            });
        };
        this.getChildById = (id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.prisma.child
                    .findUnique({
                    where: {
                        id,
                    },
                    include: {
                        availableCognitiveOnChild: {
                            include: {
                                task: true,
                            },
                        },
                        assignedCognitiveOnChild: {
                            include: {
                                task: true,
                            },
                        },
                        completedCognitiveOnChild: {
                            include: {
                                task: true,
                            },
                        },
                        availableYogaOnChild: {
                            include: {
                                yoga: true,
                            },
                        },
                        assignedYogaOnChild: {
                            include: {
                                yoga: true,
                            },
                        },
                        completedYogaOnChild: {
                            include: {
                                yoga: true,
                            },
                        },
                    },
                })
                    .then((data) => {
                    if (!data) {
                        return reject("Child with this id could not be found");
                    }
                    return resolve(data);
                })
                    .catch((error) => {
                    return reject(error);
                });
            });
        });
        this.addChild = (data) => __awaiter(this, void 0, void 0, function* () {
            const { parentId } = data;
            return new Promise((resolve, reject) => {
                this.parentService
                    .findParentById(parentId)
                    .then((foundParent) => __awaiter(this, void 0, void 0, function* () {
                    if (!foundParent) {
                        return reject("Parent ID is incorrect");
                    }
                    else {
                        try {
                            const { id } = yield this.prisma.child.create({
                                data,
                            });
                            if (data.ageGroup === "Toddler") {
                                return resolve(id);
                            }
                            const tasks = yield this.prisma.cognitiveTask.findMany({
                                where: {
                                    ageGroup: data.ageGroup,
                                },
                            });
                            const yogas = yield this.prisma.yoga.findMany({
                                where: {
                                    ageGroup: data.ageGroup,
                                },
                            });
                            const availableTasksId = tasks.map((task) => task.id);
                            const createCognitive = availableTasksId.map((id) => {
                                return { cognitiveTaskId: id };
                            });
                            const availableYogaId = yogas.map((yoga) => yoga.id);
                            const createYoga = availableYogaId.map((id) => {
                                return { yogaId: id };
                            });
                            const child = yield this.prisma.child.update({
                                where: {
                                    id,
                                },
                                data: {
                                    availableCognitiveOnChild: {
                                        create: createCognitive,
                                    },
                                    availableYogaOnChild: {
                                        create: createYoga,
                                    },
                                },
                            });
                            return resolve(child.id);
                        }
                        catch (error) {
                            console.log(error);
                            return reject({
                                error,
                                origin: "While trying to add child",
                            });
                        }
                    }
                }))
                    .catch((err) => {
                    return reject(err);
                });
            });
        });
        this.parentService = new index_service_1.default();
        this.prisma = new client_1.PrismaClient();
    }
}
exports.default = ChildService;
//# sourceMappingURL=index.service.js.map