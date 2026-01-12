"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitMiddleware = void 0;
const express_slow_down_1 = __importDefault(require("express-slow-down"));
const Environment = __importStar(require("../../environment"));
const rateLimitMiddleware = (parameters) => {
    const delaySeconds = (parameters === null || parameters === void 0 ? void 0 : parameters.rateLimitDelaySeconds) ||
        Environment.getEnvVar("RATE_LIMIT_DELAY_SECONDS");
    return (0, express_slow_down_1.default)({
        windowMs: ((parameters === null || parameters === void 0 ? void 0 : parameters.rateLimitWindowMinutes) ||
            Environment.getEnvVar("RATE_LIMIT_WINDOW_MINUTES")) *
            60 *
            1000,
        delayAfter: (parameters === null || parameters === void 0 ? void 0 : parameters.rateLimitMaxRequests) ||
            Environment.getEnvVar("RATE_LIMIT_MAX_REQUESTS"),
        delayMs: (used, req) => { var _a, _b; return (used - ((_b = (_a = req.slowDown) === null || _a === void 0 ? void 0 : _a.limit) !== null && _b !== void 0 ? _b : 0)) * delaySeconds * 1000; },
    });
};
exports.rateLimitMiddleware = rateLimitMiddleware;
