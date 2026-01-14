import { Awekas, AwekasQuery } from "../awekas.model";
import { toSI } from "./convert-si.domain.awekas";

const parseNumber = (value: any): number => {
  const num = +value;
  if (isNaN(num)) {
    throw new Error(`Invalid numeric value: ${value}`);
  }
  return num;
};

export const mapRequestToModel = (request: AwekasQuery): Awekas => {
  if (!request) {
    throw new Error("Request object is required");
  }
  return toSI({
    barometer: parseNumber(request.baromin),
    temperature: parseNumber(request.tempf),
    dewPoint: parseNumber(request.dewptf),
    humidity: parseNumber(request.humidity),
    windSpeed: parseNumber(request.windspeedmph),
    windGust: parseNumber(request.windgustmph),
    windDirection: parseNumber(request.winddir),
    rain: parseNumber(request.rainin),
    dailyRain: parseNumber(request.dailyrainin),
    solarRadiation: parseNumber(request.solarradiation),
    uv: parseNumber(request.UV),
    indoorTemperature: parseNumber(request.indoortempf),
    indoorHumidity: parseNumber(request.indoorhumidity),
  });
};
