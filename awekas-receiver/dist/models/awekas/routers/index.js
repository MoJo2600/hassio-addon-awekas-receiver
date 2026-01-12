"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const default_router_awekas_1 = require("./default.router.awekas");
const update_router_awekas_1 = require("./update.router.awekas");
exports.default = (0, express_1.Router)()
    .get("/", default_router_awekas_1.defaultRouter)
    .get("/weatherstation/updateweatherstation.php", update_router_awekas_1.updateData);
