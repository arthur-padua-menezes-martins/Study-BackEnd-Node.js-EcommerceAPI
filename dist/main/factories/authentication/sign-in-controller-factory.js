"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sign_in_controller_1 = require("../../../presentation/controllers/sign-in/sign-in-controller");
const sign_in_controller_factory_validation_1 = require("./sign-in/sign-in-controller-factory-validation");
const sign_in_controller_factory_authentication_account_1 = require("./sign-in/sign-in-controller-factory-authentication-account");
const log_mongo_repository_1 = require("../../../infra/db/mongodb/log/log-mongo-repository");
const log_controller_decorator_1 = require("../../decorators/log/log-controller-decorator");
exports.makeSignInController = () => {
    const signInController = new sign_in_controller_1.SignInController(sign_in_controller_factory_validation_1.validation, sign_in_controller_factory_authentication_account_1.accountAuthentication);
    const logErrorRepository = new log_mongo_repository_1.LogMongoRepository();
    return new log_controller_decorator_1.LogControllerDecorator(signInController, logErrorRepository);
};
//# sourceMappingURL=sign-in-controller-factory.js.map