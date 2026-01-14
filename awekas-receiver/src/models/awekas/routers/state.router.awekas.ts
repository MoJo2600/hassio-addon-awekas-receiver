import { Request, Response } from "express";

import Services from "../../../services";

export const getCurrentState = async (
  _req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const state = Services.State.getLatestMeasurement();

    if (!state) {
      return res.status(404).json({
        error: "No measurements received yet",
      });
    }

    return res.status(200).json({
      station: state.sensorId,
      timestamp: state.timestamp.toISOString(),
      measurements: state.measurement,
    });
  } catch (err: any) {
    Services.Log.logError("Error retrieving state", err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
