"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAccount = void 0;
const db_add_account_1 = require("../../../../data/usecases/add-account/db-add-account");
const bcrypt_adapter_1 = require("../../../../infra/criptography/adapter/bcrypt/bcrypt-adapter");
const account_mongo_repository_1 = require("../../../../infra/db/mongodb/account/account-mongo-repository");
const encrypter = new bcrypt_adapter_1.BcryptAdapter(12);
const addAccountRepository = new account_mongo_repository_1.AccountMongoRepository();
exports.addAccount = new db_add_account_1.DatabaseAddAccountController(encrypter, addAccountRepository);
//# sourceMappingURL=sign-up-controller-factory-add-account.js.map