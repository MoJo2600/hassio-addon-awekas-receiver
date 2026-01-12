"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
exports.default = (0, express_1.Router)().get("/*", (req, res) => {
    res.send({ apiVersion: "1.0", serverTime: new Date() });
});
