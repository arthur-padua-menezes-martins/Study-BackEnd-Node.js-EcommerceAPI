"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    api: (_a = process.env.API) !== null && _a !== void 0 ? _a : 'http://localhost:5050/api',
    mongoUrl: (_b = process.env.MONGO_URL) !== null && _b !== void 0 ? _b : 'mongodb://mongo:27017/ecommerce-sertao-nerd',
    mongoUrlLocalhost: 'mongodb://localhost:27017',
    port: (_c = process.env.PORT) !== null && _c !== void 0 ? _c : 5050,
    jwtSecret: (_d = process.env.PORT) !== null && _d !== void 0 ? _d : '7b205b22ff506a1f2fa12fea5da18c07',
    sendEmail: {
        from: 'suporte.sertaonerd@gmail.com',
        host: (_e = process.env.SEND_EMAIL_HOST) !== null && _e !== void 0 ? _e : 'smtp.gmail.com',
        port: (_f = process.env.SEND_EMAIL_PORT) !== null && _f !== void 0 ? _f : 465,
        secure: (_g = process.env.SEND_EMAIL_SECURE) !== null && _g !== void 0 ? _g : true,
        auth: {
            user: (_h = process.env.SEND_EMAIL_AUTH_USER) !== null && _h !== void 0 ? _h : 'arthur.software.developer@gmail.com',
            password: (_j = process.env.SEND_EMAIL_AUTH_PASS) !== null && _j !== void 0 ? _j : 'software123456789'
        }
    },
    collections: {
        accounts: 'accounts',
        surveys: 'surveys',
        log: {
            error: 'errorLog'
        }
    }
};
//# sourceMappingURL=env.js.map