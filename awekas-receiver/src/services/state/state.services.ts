import { Awekas } from "../../models/awekas/awekas.model";

interface StationState {
  sensorId: string;
  measurement: Awekas;
  timestamp: Date;
}

let latestState: StationState | null = null;

export const setLatestMeasurement = (
  sensorId: string,
  measurement: Awekas,
): void => {
  latestState = {
    sensorId,
    measurement,
    timestamp: new Date(),
  };
};

export const getLatestMeasurement = (): StationState | null => latestState;
