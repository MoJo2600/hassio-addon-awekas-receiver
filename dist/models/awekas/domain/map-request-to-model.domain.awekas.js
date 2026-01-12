"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRequestToModel = void 0;
const convert_si_domain_awekas_1 = require("./convert-si.domain.awekas");
const mapRequestToModel = (request) => request &&
    (0, convert_si_domain_awekas_1.toSI)({
        barometer: +request.baromin,
        temperature: +request.tempf,
        dewPoint: +request.dewptf,
        humidity: +request.humidity,
        windSpeed: +request.windspeedmph,
        windGust: +request.windgustmph,
        windDirection: +request.winddir,
        rain: +request.rainin,
        dailyRain: +request.dailyrainin,
        solarRadiation: +request.solarradiation,
        uv: +request.UV,
        indoorTemperature: +request.indoortempf,
        indoorHumidity: +request.indoorhumidity,
    });
exports.mapRequestToModel = mapRequestToModel;
