"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserPassword = void 0;
const services_1 = __importDefault(require("../../../services"));
const validateUserPassword = (request) => request && services_1.default.Auth.validateUserPassword(request.ID, request.PASSWORD);
exports.validateUserPassword = validateUserPassword;
