"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMeasure = void 0;
const connect_influx_services_1 = require("./connect.influx.services");
const map_awekas_to_point_influx_services_1 = require("./map-awekas-to-point.influx.services");
const write_measure_influx_services_1 = require("./write-measure.influx.services");
const addMeasure = (measure) => (sensorId) => {
    const writeApi = (0, connect_influx_services_1.connect)();
    (0, write_measure_influx_services_1.writeMeasure)(writeApi)((0, map_awekas_to_point_influx_services_1.mapAwekasToPoint)(sensorId)(measure));
    return writeApi.close();
};
exports.addMeasure = addMeasure;
