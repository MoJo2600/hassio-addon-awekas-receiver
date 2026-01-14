import Services from "../../../services";
import { Awekas } from "../awekas.model";

export const addMeasurement =
  (measurement: Awekas) =>
  (sensorId: string): Promise<boolean> =>
    Services.Influx.addMeasure(measurement)(sensorId).then(() => {
      // Store latest measurement for Home Assistant access
      Services.State.setLatestMeasurement(sensorId, measurement);
      return true;
    });
