"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var import_all_1 = require("./import-all");
var MongoRepositorySuper = /** @class */ (function () {
    function MongoRepositorySuper() {
    }
    MongoRepositorySuper.getCollection = function (collectionName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, import_all_1.MongoHelper.getCollection(collectionName)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongoRepositorySuper.searchById = function (collection, id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = collection).findOne;
                        _c = {};
                        return [4 /*yield*/, import_all_1.MongoHelper.createObjectId(id)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [(_c._id = _d.sent(),
                                _c)])];
                    case 2:
                        result = _d.sent();
                        return [2 /*return*/, import_all_1.MongoHelper.mapTheId(result)];
                }
            });
        });
    };
    MongoRepositorySuper.searchByOneField = function (collection, fields) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, _b, key, value, result;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _i = 0, _a = Object.entries(fields);
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        _b = _a[_i], key = _b[0], value = _b[1];
                        return [4 /*yield*/, collection.findOne((_c = {},
                                _c["personal." + key] = value,
                                _c))];
                    case 2:
                        result = _d.sent();
                        return [2 /*return*/, import_all_1.MongoHelper.mapTheId(result)];
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, null];
                }
            });
        });
    };
    MongoRepositorySuper.searchByManyFields = function (collection, fields) {
        return __awaiter(this, void 0, void 0, function () {
            var search, _i, _a, _b, key, value, result;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        search = {};
                        for (_i = 0, _a = Object.entries(fields); _i < _a.length; _i++) {
                            _b = _a[_i], key = _b[0], value = _b[1];
                            if (value) {
                                search = Object.assign({}, search, (_c = {}, _c["personal." + key] = value, _c));
                            }
                        }
                        return [4 /*yield*/, collection.findOne(search)];
                    case 1:
                        result = _d.sent();
                        return [2 /*return*/, import_all_1.MongoHelper.mapTheId(result)];
                }
            });
        });
    };
    MongoRepositorySuper.customSearchForOne = function (collection, search) {
        return __awaiter(this, void 0, void 0, function () {
            var result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = import_all_1.MongoHelper).mapTheId;
                        return [4 /*yield*/, collection.findOne(search)];
                    case 1:
                        result = _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    MongoRepositorySuper.customSearchForMany = function (collection, search) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                result = import_all_1.MongoHelper.mapTheId(collection.find(search));
                return [2 /*return*/, result];
            });
        });
    };
    MongoRepositorySuper.accessOps = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (content.ops.length === 1) {
                    return [2 /*return*/, import_all_1.MongoHelper.mapTheId(content.ops[0])];
                }
                return [2 /*return*/];
            });
        });
    };
    return MongoRepositorySuper;
}());
exports.MongoRepositorySuper = MongoRepositorySuper;
//# sourceMappingURL=super-mongo-repository.js.map