"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoHelper = void 0;
const mongodb_1 = require("mongodb");
/**
* @method `connect`
* connect to the database
* @method `isConnected`
* checks if the connection has been established
* @method `disconnect`
* disconnect to the database
* @method `getCollection`
* get a specific collection
* @method `map_id`
* adapts from _id to id
*/
exports.mongoHelper = {
    client: null,
    url: '',
    /**
    * @param url
    * database connection url
    * @this `this.url`
    * references database connection url
    * @this `this.client`
    * references a MongoClient connect
    */
    async connect(url) {
        this.url = url;
        this.client = await mongodb_1.MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    },
    async isConnected() {
        return this.client !== null;
    },
    async disconnect() {
        await this.client.close();
    },
    async getCollection(name) {
        if (!(await this.isConnected())) {
            await this.connect(this.url);
        }
        return await Promise.resolve(this.client.db().collection(name));
    },
    map_id(resultOf) {
        const _a = resultOf || { _id: null }, { _id } = _a, result = __rest(_a, ["_id"]);
        return _id && result && Object.assign({}, result, { id: _id });
    }
};
//# sourceMappingURL=mongo-helper.js.map