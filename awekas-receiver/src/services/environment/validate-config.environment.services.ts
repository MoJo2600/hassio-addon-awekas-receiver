import { EnvironmentVars } from "./model.environment.services";

const requiredEnvVars: Array<keyof EnvironmentVars> = [
  "INFLUX_URL",
  "INFLUX_TOKEN",
  "INFLUX_ORG",
  "INFLUX_BUCKET",
  "HASH_SALT",
  "ENABLED_USERS",
];

export const validateConfig = () => {
  const missingOrEmpty = requiredEnvVars.filter((envVar) => {
    const value = process.env[envVar];
    return value === undefined || `${value}`.trim().length === 0;
  });

  if (missingOrEmpty.length > 0) {
    const missingList = missingOrEmpty.join(", ");
    throw new Error(
      `Missing required configuration values: ${missingList}. Set them in the add-on configuration and restart the add-on.`,
    );
  }
};
