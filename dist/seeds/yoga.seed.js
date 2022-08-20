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
const prisma = new client_1.PrismaClient();
const seedYoga = () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.yoga.createMany({
        data: [
            {
                name: "Yoga-1",
                youtubeLink: "https://random.com",
                description: "Yoga",
                ageGroup: "Preschool",
                modelLink: "https://random.com",
            },
            {
                name: "Yoga-2",
                youtubeLink: "https://random.com",
                description: "Yoga",
                ageGroup: "Preteen",
                modelLink: "https://random.com",
            },
            {
                name: "Yoga-3",
                youtubeLink: "https://random.com",
                description: "Yoga",
                ageGroup: "Teen",
                modelLink: "https://random.com",
            },
        ],
    });
});
seedYoga().then(() => {
    console.log(`Added`);
});
//# sourceMappingURL=yoga.seed.js.map