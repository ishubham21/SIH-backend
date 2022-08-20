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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class YogaService {
    constructor() {
        this.getYogaById = (id) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.prisma.yoga
                    .findUnique({
                    where: {
                        id,
                    },
                })
                    .then((yoga) => {
                    if (!yoga)
                        return reject("Yoga with this id could not be found");
                    return resolve(yoga);
                })
                    .catch((error) => reject(error));
            });
        });
        this.prisma = new client_1.PrismaClient();
    }
}
exports.default = YogaService;
//# sourceMappingURL=index.service.js.map