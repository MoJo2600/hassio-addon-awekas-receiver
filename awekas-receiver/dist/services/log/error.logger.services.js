"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = void 0;
const logError = (msg, parameter) => {
    parameter !== undefined
        ? console.log(`ERROR: ${Date().toLocaleLowerCase()}`, msg, parameter)
        : console.log(`ERROR: ${Date().toLocaleLowerCase()}`, msg);
};
exports.logError = logError;
