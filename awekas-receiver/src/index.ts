import Services from "./services";

const startServer = async () => {
  try {
    // Configure environment
    Services.Environment.configureEnv();

    // Validate required configuration before starting services
    Services.Environment.validateConfig();

    // Initialize and validate InfluxDB connection
    Services.Log.logInfo("Validating InfluxDB configuration...");
    await Services.Influx.initialize();

    // Start HTTP server
    const server = Services.HTTP.initHTTP();

    // Setup signal handlers
    Services.Signal.addListeners(server);

    // Graceful shutdown handler
    const shutdown = async (signal: string) => {
      Services.Log.logInfo(`Received ${signal}, shutting down gracefully...`);
      try {
        await Services.Influx.close();
        server.close(() => {
          Services.Log.logInfo("Server closed");
          process.exit(0);
        });
      } catch (error: any) {
        Services.Log.logError(`Error during shutdown: ${error.message}`);
        process.exit(1);
      }
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));

    // Handle uncaught exceptions
    process.on("uncaughtException", (error: Error) => {
      Services.Log.logError("=".repeat(60));
      Services.Log.logError("UNCAUGHT EXCEPTION");
      Services.Log.logError("=".repeat(60));
      Services.Log.logError(error.message);
      Services.Log.logError(error.stack || "");
      Services.Log.logError(
        "The addon has crashed. Watchdog will restart the container.",
      );
      Services.Log.logError("=".repeat(60));
      process.exit(1);
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (reason: any) => {
      Services.Log.logError("=".repeat(60));
      Services.Log.logError("UNHANDLED PROMISE REJECTION");
      Services.Log.logError("=".repeat(60));
      Services.Log.logError(
        typeof reason === "string" ? reason : JSON.stringify(reason),
      );
      Services.Log.logError(
        "The addon has crashed. Watchdog will restart the container.",
      );
      Services.Log.logError("=".repeat(60));
      process.exit(1);
    });
  } catch (error: any) {
    Services.Log.logError("=".repeat(60));
    Services.Log.logError("FATAL ERROR: Failed to start addon");
    Services.Log.logError("=".repeat(60));
    Services.Log.logError(error.message);
    Services.Log.logError("");
    Services.Log.logError(
      "Please check your add-on configuration (InfluxDB credentials, users, salts) and try again.",
    );
    Services.Log.logError(
      "The addon has stopped. Fix the configuration and restart.",
    );
    Services.Log.logError("=".repeat(60));

    // Exit with error code - addon will show as "stopped" in HA
    process.exit(1);
  }
};

startServer();
