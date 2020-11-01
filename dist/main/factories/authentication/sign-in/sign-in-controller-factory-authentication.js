"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const db_authentication_1 = require("../../../../data/usecases/authentication/db-authentication");
const account_mongo_repository_1 = require("../../../../infra/db/mongodb/account/account-mongo-repository");
const bcrypt_adapter_1 = require("../../../../infra/criptography/adapter/bcrypt/bcrypt-adapter");
const jwt_adapter_1 = require("../../../../infra/criptography/adapter/jwt/jwt-adapter");
const env_1 = __importDefault(require("../../../../main/config/env"));
const accountMongoRepository = new account_mongo_repository_1.AccountMongoRepository();
const bcryptAdapter = new bcrypt_adapter_1.BcryptAdapter(12);
const jwtAdapter = new jwt_adapter_1.JwtAdapter(env_1.default.jwtSecret);
exports.authentication = new db_authentication_1.DatabaseAuthenticationController(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository);
