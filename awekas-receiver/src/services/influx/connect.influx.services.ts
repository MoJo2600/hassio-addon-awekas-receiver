import { InfluxDB, WriteApi } from "@influxdata/influxdb-client";

import * as Environment from "../environment";
import * as Log from "../log";

let writeApi: WriteApi | null = null;
let influxDB: InfluxDB | null = null;

/**
 * Initialize and validate InfluxDB connection on startup
 */
export const initialize = async (): Promise<void> => {
  const url = Environment.getEnvVar("INFLUX_URL");
  const token = Environment.getEnvVar("INFLUX_TOKEN");
  const org = Environment.getEnvVar("INFLUX_ORG");
  const bucket = Environment.getEnvVar("INFLUX_BUCKET");

  Log.logInfo("Initializing InfluxDB connection...");
  Log.logInfo(`  URL: ${url}`);
  Log.logInfo(`  Organization: ${org}`);
  Log.logInfo(`  Bucket: ${bucket}`);

  influxDB = new InfluxDB({ url, token });

  try {
    // Test connection by performing a simple query
    const queryApi = influxDB.getQueryApi(org);
    const fluxQuery = `buckets() |> filter(fn: (r) => r.name == "${bucket}") |> limit(n: 1)`;

    // Execute query to validate connection and bucket existence
    const rows: any[] = [];
    await new Promise((resolve, reject) => {
      queryApi.queryRows(fluxQuery, {
        next: (row: any, tableMeta: any) => {
          rows.push(tableMeta.toObject(row));
        },
        error: (error: Error) => reject(error),
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
  } catch (error: any) {
    Log.logError("✗ Failed to connect to InfluxDB:");
    Log.logError(`  Error: ${error.message}`);
    throw new Error(
      "InfluxDB connection validation failed. Please check your configuration.",
    );
  }
};

/**
 * Get the initialized WriteApi instance
 */
export const connect = (): WriteApi => {
  if (!writeApi) {
    throw new Error("InfluxDB not initialized. Call initialize() first.");
  }
  return writeApi;
};

/**
 * Close the InfluxDB connection gracefully
 */
export const close = async (): Promise<void> => {
  if (writeApi) {
    try {
      await writeApi.close();
      writeApi = null;
      influxDB = null;
      Log.logInfo("✓ InfluxDB connection closed");
    } catch (error: any) {
      Log.logError(`Error closing InfluxDB connection: ${error.message}`);
    }
  }
};
