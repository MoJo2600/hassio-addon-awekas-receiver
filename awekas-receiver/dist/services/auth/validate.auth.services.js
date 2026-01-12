"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuth = void 0;
const generate_auth_services_1 = require("./generate.auth.services");
const validateAuth = (user, password) => (0, generate_auth_services_1.generateAuth)(user) === password;
exports.validateAuth = validateAuth;
