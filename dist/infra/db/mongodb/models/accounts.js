"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
const accountsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        index: true,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        required: true,
        type: String
    },
    cpf: {
        required: true,
        type: String
    },
    address: {
        cep: {
            required: true,
            type: String
        },
        street: {
            required: true,
            type: String
        },
        number: {
            required: true,
            type: String
        },
        city: {
            required: true,
            type: String
        },
        state: {
            required: true,
            type: String
        }
    },
    accessToken: {
        type: String
    }
}, { timestamps: true });
accountsSchema.plugin(mongoose_paginate_1.default);
module.exports = mongoose_1.default.model('accounts', accountsSchema);
//# sourceMappingURL=accounts.js.map