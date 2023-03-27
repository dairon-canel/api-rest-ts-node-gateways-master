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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGateway = exports.findAndUpdateGateway = exports.queryGateway = exports.findGateway = exports.createGateway = void 0;
const gateway_model_1 = __importDefault(require("../models/gateway.model"));
function createGateway(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return gateway_model_1.default.create(input);
    });
}
exports.createGateway = createGateway;
function findGateway(query, options = { lean: true }) {
    return __awaiter(this, void 0, void 0, function* () {
        return gateway_model_1.default.findOne(query, {}, options);
    });
}
exports.findGateway = findGateway;
function queryGateway(query, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return gateway_model_1.default.find(query, {}, options);
    });
}
exports.queryGateway = queryGateway;
function findAndUpdateGateway(query, update, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return gateway_model_1.default.findOneAndUpdate(query, update, options);
    });
}
exports.findAndUpdateGateway = findAndUpdateGateway;
function deleteGateway(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return gateway_model_1.default.deleteOne(query);
    });
}
exports.deleteGateway = deleteGateway;
