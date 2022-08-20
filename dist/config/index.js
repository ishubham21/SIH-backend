"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_ACCESS_TOKEN_SECRET = exports.SHADOW_DATABASE_URL = exports.DATABASE_URL = exports.POSTGRESQL_PORT = exports.POSTGRESQL_PASSWORD = exports.POSTGRESQL_USER = exports.PORT = exports.NODE_ENV = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
_a = process.env, exports.NODE_ENV = _a.NODE_ENV, exports.PORT = _a.PORT, exports.POSTGRESQL_USER = _a.POSTGRESQL_USER, exports.POSTGRESQL_PASSWORD = _a.POSTGRESQL_PASSWORD, exports.POSTGRESQL_PORT = _a.POSTGRESQL_PORT, exports.DATABASE_URL = _a.DATABASE_URL, exports.SHADOW_DATABASE_URL = _a.SHADOW_DATABASE_URL, exports.JWT_ACCESS_TOKEN_SECRET = _a.JWT_ACCESS_TOKEN_SECRET;
//# sourceMappingURL=index.js.map