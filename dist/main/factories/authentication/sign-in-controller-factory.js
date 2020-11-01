"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignInController = void 0;
const sign_in_controller_1 = require("../../../presentation/controllers/sign-in/sign-in-controller");
const sign_in_controller_factory_authentication_1 = require("./sign-in/sign-in-controller-factory-authentication");
const sign_in_controller_factory_validation_1 = require("./sign-in/sign-in-controller-factory-validation");
const log_mongo_repository_1 = require("../../../infra/db/mongodb/log/log-mongo-repository");
const log_controller_decorator_1 = require("../../decorators/log/log-controller-decorator");
exports.makeSignInController = () => {
    const signInController = new sign_in_controller_1.SignInController(sign_in_controller_factory_authentication_1.authentication, sign_in_controller_factory_validation_1.validation);
    const logErrorRepository = new log_mongo_repository_1.LogMongoRepository();
    return new log_controller_decorator_1.LogControllerDecorator(signInController, logErrorRepository);
};
//# sourceMappingURL=sign-in-controller-factory.js.map