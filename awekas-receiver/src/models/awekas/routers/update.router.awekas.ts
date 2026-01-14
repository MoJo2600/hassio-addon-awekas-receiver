import { RequestHandler } from "express";

import Services from "../../../services";
import { AwekasQuery } from "../awekas.model";
import * as Domain from "../domain";
import * as Handlers from "../handlers";

export const updateData: RequestHandler<{}, string, {}, AwekasQuery> = async (
  req,
  res,
) => {
  try {
    if (!Domain.validateRequest(req.query)) {
      Services.Log.logWarn("Bad request", { ip: req.ip, query: req.query });
      return res.status(400).send("Bad Request");
    }
    if (!Domain.validateUserPassword(req.query)) {
      Services.Log.logWarn("Unauthorized Request", {
        ip: req.ip,
        query: req.query,
      });
      return res.status(401).send("Unauthorized");
    }
    await Handlers.addMeasurement(Domain.mapRequestToModel(req.query))(
      req.query.ID,
    );
    return res.status(200).send("OK");
  } catch (err: any) {
    Services.Log.logError("Error while updating data", err);
    return res.status(500).send("Server Error");
  }
};
