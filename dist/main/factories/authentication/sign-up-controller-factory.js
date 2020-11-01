"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignUpController = void 0;
const sign_up_controller_1 = require("../../../presentation/controllers/sign-up/sign-up-controller");
const sign_up_controller_factory_add_account_1 = require("./sign-up/sign-up-controller-factory-add-account");
const sign_up_controller_factory_validation_1 = require("./sign-up/sign-up-controller-factory-validation");
const log_mongo_repository_1 = require("../../../infra/db/mongodb/log/log-mongo-repository");
const log_controller_decorator_1 = require("../../decorators/log/log-controller-decorator");
exports.makeSignUpController = () => {
    const signUpController = new sign_up_controller_1.SignUpController(sign_up_controller_factory_add_account_1.addAccount, sign_up_controller_factory_validation_1.validation);
    const logErrorRepository = new log_mongo_repository_1.LogMongoRepository();
    return new log_controller_decorator_1.LogControllerDecorator(signUpController, logErrorRepository);
};
//# sourceMappingURL=sign-up-controller-factory.js.map