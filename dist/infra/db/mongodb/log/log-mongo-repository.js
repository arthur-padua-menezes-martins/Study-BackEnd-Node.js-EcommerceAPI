"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogMongoRepository = void 0;
const mongo_helper_1 = require("../helper/mongo-helper");
class LogMongoRepository {
    async logError(stack) {
        if (stack) {
            const errorsCollection = await mongo_helper_1.mongoHelper.getCollection('errors');
            await errorsCollection.insertOne({
                stack,
                date: new Date()
            });
        }
    }
}
exports.LogMongoRepository = LogMongoRepository;
//# sourceMappingURL=log-mongo-repository.js.map