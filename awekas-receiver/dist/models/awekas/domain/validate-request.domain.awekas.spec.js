"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_request_domain_awekas_1 = require("./validate-request.domain.awekas");
const correctRequest = {
    ID: "test",
    PASSWORD: "test",
    action: "updateraww",
    realtime: "1",
    rtfreq: "5",
    dateutc: "now",
    baromin: "29.74",
    tempf: "63.8",
    dewptf: "50.5",
    humidity: "52",
    windspeedmph: "2.2",
    windgustmph: "2.2",
    winddir: "324",
    rainin: "1",
    dailyrainin: "2",
    solarradiation: "212.98",
    UV: "1",
    indoortempf: "69.4",
    indoorhumidity: "62",
};
describe("validateRequest validates an Awekas request", () => {
    it("Should be valid if request is ok", () => {
        expect((0, validate_request_domain_awekas_1.validateRequest)(correctRequest)).toBeTruthy();
    });
    it("Should return false if any of requirements is not correct", () => {
        expect((0, validate_request_domain_awekas_1.validateRequest)(Object.assign(Object.assign({}, correctRequest), { ID: undefined }))).toBeFalsy();
        expect((0, validate_request_domain_awekas_1.validateRequest)(Object.assign(Object.assign({}, correctRequest), { ID: "" }))).toBeFalsy();
        expect((0, validate_request_domain_awekas_1.validateRequest)(Object.assign(Object.assign({}, correctRequest), { PASSWORD: undefined }))).toBeFalsy();
        expect((0, validate_request_domain_awekas_1.validateRequest)(Object.assign(Object.assign({}, correctRequest), { PASSWORD: "" }))).toBeFalsy();
        expect((0, validate_request_domain_awekas_1.validateRequest)(Object.assign(Object.assign({}, correctRequest), { action: undefined }))).toBeFalsy();
        expect((0, validate_request_domain_awekas_1.validateRequest)(Object.assign(Object.assign({}, correctRequest), { action: "test" }))).toBeFalsy();
        expect((0, validate_request_domain_awekas_1.validateRequest)(Object.assign(Object.assign({}, correctRequest), { realtime: undefined }))).toBeFalsy();
        expect((0, validate_request_domain_awekas_1.validateRequest)(Object.assign(Object.assign({}, correctRequest), { realtime: "other" }))).toBeFalsy();
        expect((0, validate_request_domain_awekas_1.validateRequest)(Object.assign(Object.assign({}, correctRequest), { dateutc: undefined }))).toBeFalsy();
        expect((0, validate_request_domain_awekas_1.validateRequest)(Object.assign(Object.assign({}, correctRequest), { dateutc: "other" }))).toBeFalsy();
    });
    it("Should not fail if null or undefined", () => {
        expect((0, validate_request_domain_awekas_1.validateRequest)(null)).toBeFalsy();
        expect((0, validate_request_domain_awekas_1.validateRequest)(undefined)).toBeFalsy();
    });
});
