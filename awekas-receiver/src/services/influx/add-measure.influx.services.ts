import { Awekas } from "../../models";
import { connect } from "./connect.influx.services";
import { mapAwekasToPoint } from "./map-awekas-to-point.influx.services";
import { writeMeasure } from "./write-measure.influx.services";

export const addMeasure =
  (measure: Awekas.Awekas) =>
  (sensorId: string): Promise<void> => {
    const writeApi = connect();
    writeMeasure(writeApi)(mapAwekasToPoint(sensorId)(measure));
    // Flush pending batches but don't close the connection
    // Connection stays open for the lifetime of the app
    return writeApi.flush();
  };
