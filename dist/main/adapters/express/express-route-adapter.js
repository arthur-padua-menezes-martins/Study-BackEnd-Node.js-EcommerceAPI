"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressRouteAdapter = void 0;
exports.expressRouteAdapter = (controller) => {
    return async (req, res) => {
        var _a;
        const httpRequest = {
            params: req.params,
            query: req.query,
            body: req.body
        };
        const httpResponse = await controller.handle(httpRequest);
        const httpResponseAssign = Object.assign({}, {
            json: {
                statusCode: httpResponse.statusCode,
                body: httpResponse.body,
                successMessage: httpResponse.successMessage,
                errorMessage: httpResponse.errorMessage
            }
        });
        if (httpResponseAssign.json.statusCode === 200) {
            res.status(httpResponseAssign.json.statusCode).json(httpResponseAssign.json);
        }
        else {
            res.status(httpResponseAssign.json.statusCode).json(Object.assign(Object.assign({}, httpResponseAssign.json), { errorMessage: (_a = httpResponseAssign.json.errorMessage) === null || _a === void 0 ? void 0 : _a.message }));
        }
    };
};
//# sourceMappingURL=express-route-adapter.js.map