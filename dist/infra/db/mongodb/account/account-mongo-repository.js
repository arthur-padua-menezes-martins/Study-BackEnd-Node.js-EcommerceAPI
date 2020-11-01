"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountMongoRepository = void 0;
const mongo_helper_1 = require("../helper/mongo-helper");
/**
* @implements {IAddAccountRepository}
*
* @method `add`
* insert the body sign-up request into the collection
* @returns
* new account
*/
class AccountMongoRepository {
    /**
    * @param {IAddAccountModel} accountData
    * sign-up body
    */
    async add(accountData) {
        const accountsCollection = await mongo_helper_1.mongoHelper.getCollection('accounts');
        const accountOptions = await accountsCollection.insertOne(accountData);
        const account = mongo_helper_1.mongoHelper.map_id(accountOptions.ops[0]);
        return await Promise.resolve(account);
    }
    async searchByEmail(email) {
        const accountsCollection = await mongo_helper_1.mongoHelper.getCollection('accounts');
        const account = await accountsCollection.findOne({ email });
        return await Promise.resolve(mongo_helper_1.mongoHelper.map_id(account));
    }
    async updateAccessToken(id, accessToken) {
        const accountsCollection = await mongo_helper_1.mongoHelper.getCollection('accounts');
        await accountsCollection.updateOne({ _id: id }, { $set: { accessToken } }, { upsert: true });
    }
}
exports.AccountMongoRepository = AccountMongoRepository;
//# sourceMappingURL=account-mongo-repository.js.map