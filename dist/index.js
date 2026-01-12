"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = __importDefault(require("./services"));
services_1.default.Environment.configureEnv();
const server = services_1.default.HTTP.initHTTP();
services_1.default.Signal.addListeners(server);
