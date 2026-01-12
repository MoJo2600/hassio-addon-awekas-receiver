import { Handler } from "express";
import SlowDown from "express-slow-down";

import * as Environment from "../../environment";

interface RateLimitParamaters {
  rateLimitWindowMinutes?: number;
  rateLimitMaxRequests?: number;
  rateLimitDelaySeconds?: number;
}

export const rateLimitMiddleware = (
  parameters?: RateLimitParamaters,
): Handler => {
  const delaySeconds =
    parameters?.rateLimitDelaySeconds ||
    Environment.getEnvVar("RATE_LIMIT_DELAY_SECONDS");
  
  return SlowDown({
    windowMs:
      (parameters?.rateLimitWindowMinutes ||
        Environment.getEnvVar("RATE_LIMIT_WINDOW_MINUTES")) *
      60 *
      1000,
    delayAfter:
      parameters?.rateLimitMaxRequests ||
      Environment.getEnvVar("RATE_LIMIT_MAX_REQUESTS"),
    delayMs: (used, req) => (used - (req.slowDown?.limit ?? 0)) * delaySeconds * 1000,
  });
};
