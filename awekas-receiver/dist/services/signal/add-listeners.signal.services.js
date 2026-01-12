"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addListeners = void 0;
const handle_termination_signal_services_1 = require("./handle-termination.signal.services");
const addListeners = (server) => {
    process.on("SIGTERM", (0, handle_termination_signal_services_1.handleSignal)(server));
    process.on("SIGINT", (0, handle_termination_signal_services_1.handleSignal)(server));
    process.on("SIGHUP", (0, handle_termination_signal_services_1.handleSignal)(server));
};
exports.addListeners = addListeners;
