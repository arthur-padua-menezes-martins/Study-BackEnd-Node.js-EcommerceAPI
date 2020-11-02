"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAccount = void 0;
const db_write_add_account_1 = require("../../../../data/usecases/account/write/add-account/db-write-add-account");
const bcrypt_adapter_1 = require("../../../../infra/criptography/adapter/bcrypt/bcrypt-adapter");
const account_mongo_repository_write_1 = require("../../../../infra/db/mongodb/account/write/account-mongo-repository-write");
const encrypter = new bcrypt_adapter_1.BcryptAdapter(12);
const accountRepositoryWrite = new account_mongo_repository_write_1.AccountMongoRepositoryWrite();
exports.addAccount = new db_write_add_account_1.DatabaseAddAccountController(encrypter, accountRepositoryWrite);
//# sourceMappingURL=sign-up-controller-factory-add-account.js.map