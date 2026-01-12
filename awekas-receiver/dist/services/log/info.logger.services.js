"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInfo = void 0;
const logInfo = (msg, parameter) => {
    parameter !== undefined
        ? console.log(`INFO: ${Date().toLocaleLowerCase()}`, msg, parameter)
        : console.log(`INFO: ${Date().toLocaleLowerCase()}`, msg);
};
exports.logInfo = logInfo;
