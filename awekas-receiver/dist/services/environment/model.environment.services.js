"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaults = void 0;
exports.defaults = {
    PORT: 3000,
    NODE_ENV: "development",
    INFLUX_URL: "http://localhost:8086",
    INFLUX_TOKEN: "",
    INFLUX_ORG: "",
    INFLUX_BUCKET: "test",
    RATE_LIMIT_MAX_REQUESTS: 100,
    RATE_LIMIT_WINDOW_MINUTES: 1,
    RATE_LIMIT_DELAY_SECONDS: 2,
    HASH_SALT: "awekas",
    ENABLED_USERS: "TORRE01",
};
