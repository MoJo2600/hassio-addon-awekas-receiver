import { Router } from "express";

import { defaultRouter } from "./default.router.awekas";
import { getCurrentState } from "./state.router.awekas";
import { updateData } from "./update.router.awekas";

export default Router()
  .get("/", defaultRouter)
  .get("/weatherstation/updateweatherstation.php", updateData)
  .get("/state", getCurrentState);
