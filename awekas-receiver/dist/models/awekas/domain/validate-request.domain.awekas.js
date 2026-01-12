"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (request) => !!request &&
    !!request.ID &&
    request.ID.length > 0 &&
    !!request.PASSWORD &&
    request.PASSWORD.length > 0 &&
    !!request.action &&
    request.action === "updateraww" &&
    !!request.realtime &&
    request.realtime === "1" &&
    !!request.dateutc &&
    request.dateutc === "now";
exports.validateRequest = validateRequest;
