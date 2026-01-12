"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.connect = exports.initialize = void 0;
const influxdb_client_1 = require("@influxdata/influxdb-client");
const Environment = __importStar(require("../environment"));
const Log = __importStar(require("../log"));
let writeApi = null;
let influxDB = null;
/**
 * Initialize and validate InfluxDB connection on startup
 */
const initialize = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = Environment.getEnvVar("INFLUX_URL");
    const token = Environment.getEnvVar("INFLUX_TOKEN");
    const org = Environment.getEnvVar("INFLUX_ORG");
    const bucket = Environment.getEnvVar("INFLUX_BUCKET");
    Log.logInfo("Initializing InfluxDB connection...");
    Log.logInfo(`  URL: ${url}`);
    Log.logInfo(`  Organization: ${org}`);
    Log.logInfo(`  Bucket: ${bucket}`);
    influxDB = new influxdb_client_1.InfluxDB({ url, token });
    try {
        // Test connection by performing a simple query
        const queryApi = influxDB.getQueryApi(org);
        const fluxQuery = `buckets() |> filter(fn: (r) => r.name == "${bucket}") |> limit(n: 1)`;
        // Execute query to validate connection and bucket existence
        const rows = [];
        yield new Promise((resolve, reject) => {
            queryApi.queryRows(fluxQuery, {
                next: (row, tableMeta) => {
                    rows.push(tableMeta.toObject(row));
                },
                error: (error) => reject(error),
                complete: () => resolve(rows),
            });
        });
        if (rows.length === 0) {
            throw new Error(`Bucket '${bucket}' not found in organization '${org}'`);
        }
        Log.logInfo("✓ InfluxDB connection validated");
        Log.logInfo(`✓ Bucket '${bucket}' exists`);
        // Create write API after validation
        writeApi = influxDB.getWriteApi(org, bucket);
        Log.logInfo("✓ Successfully initialized InfluxDB");
    }
    catch (error) {
        Log.logError("✗ Failed to connect to InfluxDB:");
        Log.logError(`  Error: ${error.message}`);
        throw new Error("InfluxDB connection validation failed. Please check your configuration.");
    }
});
exports.initialize = initialize;
/**
 * Get the initialized WriteApi instance
 */
const connect = () => {
    if (!writeApi) {
        throw new Error("InfluxDB not initialized. Call initialize() first.");
    }
    return writeApi;
};
exports.connect = connect;
/**
 * Close the InfluxDB connection gracefully
 */
const close = () => __awaiter(void 0, void 0, void 0, function* () {
    if (writeApi) {
        try {
            yield writeApi.close();
            writeApi = null;
            influxDB = null;
            Log.logInfo("✓ InfluxDB connection closed");
        }
        catch (error) {
            Log.logError(`Error closing InfluxDB connection: ${error.message}`);
        }
    }
});
exports.close = close;
