"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeMeasure = void 0;
const writeMeasure = (writeApi) => (points) => writeApi.writePoints(points);
exports.writeMeasure = writeMeasure;
