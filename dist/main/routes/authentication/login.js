"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_route_adapter_1 = require("../../adapters/express/express-route-adapter");
const sign_up_controller_factory_1 = require("../../factories/authentication/sign-up-controller-factory");
const sign_in_controller_factory_1 = require("../../factories/authentication/sign-in-controller-factory");
exports.default = (router) => {
    router.post('/signup', express_route_adapter_1.expressRouteAdapter(sign_up_controller_factory_1.makeSignUpController()));
    router.post('/signin', express_route_adapter_1.expressRouteAdapter(sign_in_controller_factory_1.makeSignInController()));
};
