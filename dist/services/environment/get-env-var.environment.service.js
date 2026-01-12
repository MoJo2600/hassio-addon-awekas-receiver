"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVar = void 0;
const model_environment_services_1 = require("./model.environment.services");
const getEnvVar = (environmentVar) => (Object.keys(model_environment_services_1.defaults).some((key) => key === environmentVar) &&
    // Prevented with ⤴ that function
    // eslint-disable-next-line security/detect-object-injection
    process.env[environmentVar]) ||
    // eslint-disable-next-line security/detect-object-injection
    model_environment_services_1.defaults[environmentVar];
exports.getEnvVar = getEnvVar;
