"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class ParentService {
    constructor() {
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