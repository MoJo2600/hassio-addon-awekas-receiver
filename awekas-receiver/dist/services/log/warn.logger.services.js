"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logWarn = void 0;
const logWarn = (msg, parameter) => {
    parameter !== undefined
        ? console.log(`WARN: ${Date().toLocaleLowerCase()}`, msg, parameter)
        : console.log(`WARN: ${Date().toLocaleLowerCase()}`, msg);
};
exports.logWarn = logWarn;
