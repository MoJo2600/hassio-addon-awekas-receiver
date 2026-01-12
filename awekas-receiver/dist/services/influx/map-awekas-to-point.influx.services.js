"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAwekasToPoint = void 0;
const influxdb_client_1 = require("@influxdata/influxdb-client");
const mapAwekasToPoint = (sensorId) => (awekas) => Object.keys(awekas).map((key) => new influxdb_client_1.Point(key)
    .tag("station", sensorId)
    .floatField("value", awekas[key]));
exports.mapAwekasToPoint = mapAwekasToPoint;
