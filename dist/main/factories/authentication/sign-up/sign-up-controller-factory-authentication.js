"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_account_authentication_1 = require("../../../../data/usecases/account/authentication/db-account-authentication");
const read_account_mongo_repository_1 = require("../../../../infra/db/mongodb/account/read/read-account-mongo-repository");
const update_account_mongo_repository_1 = require("../../../../infra/db/mongodb/account/update/update-account-mongo-repository");
const bcrypt_adapter_1 = require("../../../../infra/criptography/adapter/bcrypt/bcrypt-adapter");
const jwt_adapter_1 = require("../../../../infra/criptography/adapter/jwt/jwt-adapter");
const env_1 = __importDefault(require("../../../config/env"));
const accountRepositoryRead = new read_account_mongo_repository_1.AccountMongoRepositoryRead();
const accountRepositoryUpdate = new update_account_mongo_repository_1.AccountMongoRepositoryUpdate();
const bcryptAdapter = new bcrypt_adapter_1.BcryptAdapter(12);
const jwtAdapter = new jwt_adapter_1.JwtAdapter(env_1.default.jwtSecret);
exports.authentication = new db_account_authentication_1.DatabaseAuthenticationController(accountRepositoryRead, bcryptAdapter, jwtAdapter, accountRepositoryUpdate);
//# sourceMappingURL=sign-up-controller-factory-authentication.js.map