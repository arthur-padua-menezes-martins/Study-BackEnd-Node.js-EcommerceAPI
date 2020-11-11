"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressRouteAdapter = void 0;
exports.expressRouteAdapter = (controller) => {
    return async (req, res) => {
        var _a;
        const httpRequest = {
            params: req.params || {},
            query: req.query || {},
            body: req.body || {}
        };
        const httpResponse = await controller.handle(httpRequest);
        const response = Object.assign({}, httpResponse);
        if (response.statusCode <= 200 || response.statusCode <= 299) {
            res.status(response.statusCode).json(httpResponse);
        }
        else {
            res.status(response.statusCode).json(Object.assign(Object.assign({}, response), { errorMessage: (_a = response.errorMessage) === null || _a === void 0 ? void 0 : _a.message, invalidFields: response.invalidFields }));
        }
    };
};
//# sourceMappingURL=express-route-adapter.js.map