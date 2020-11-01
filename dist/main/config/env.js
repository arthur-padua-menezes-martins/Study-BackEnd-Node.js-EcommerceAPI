"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    mongoUrl: (_a = process.env.MONGO_URL) !== null && _a !== void 0 ? _a : 'mongodb://localhost:27017/ecommerce-sertao-nerd',
    port: (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 5050,
    jwtSecret: (_c = process.env.PORT) !== null && _c !== void 0 ? _c : '7b205b22ff506a1f2fa12fea5da18c07'
};
