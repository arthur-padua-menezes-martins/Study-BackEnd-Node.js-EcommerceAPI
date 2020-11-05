"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_route_adapter_1 = require("../../adapters/express/express-route-adapter");
const sign_up_controller_factory_1 = require("../../factories/user/sign-up-controller-factory");
const sign_in_controller_factory_1 = require("../../factories/user/sign-in-controller-factory");
exports.default = (router) => {
    router
        .post('/sign-up', express_route_adapter_1.expressRouteAdapter(sign_up_controller_factory_1.makeSignUpController())).get('/sign-up', express_route_adapter_1.expressRouteAdapter(sign_up_controller_factory_1.makeSignUpController()));
    router.post('/sign-in', express_route_adapter_1.expressRouteAdapter(sign_in_controller_factory_1.makeSignInController()));
};
//# sourceMappingURL=login.js.map