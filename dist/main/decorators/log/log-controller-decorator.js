"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LogControllerDecorator {
    constructor(controller, logErrorRepository) {
        this.controller = controller;
        this.logErrorRepository = logErrorRepository;
    }
    async handle(httpRequest) {
        var _a;
        const httpResponse = await this.controller.handle(httpRequest);
        if (httpResponse.statusCode === 500) {
            await this.logErrorRepository.logErrorStack((_a = httpResponse.errorMessage) === null || _a === void 0 ? void 0 : _a.stack);
        }
        return httpResponse;
    }
}
exports.LogControllerDecorator = LogControllerDecorator;
//# sourceMappingURL=log-controller-decorator.js.map