"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMeasurement = void 0;
const services_1 = __importDefault(require("../../../services"));
const addMeasurement = (measurement) => (sensorId) => services_1.default.Influx.addMeasure(measurement)(sensorId).then(() => true);
exports.addMeasurement = addMeasurement;
