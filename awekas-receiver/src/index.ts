import Services from "./services";

const startServer = async () => {
  try {
    // Configure environment
    Services.Environment.configureEnv();

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
  } catch (error: any) {
    Services.Log.logError("========================================");
    Services.Log.logError("FATAL ERROR - Failed to start addon");
    Services.Log.logError("========================================");
    Services.Log.logError(error.message);
    Services.Log.logError("");
    Services.Log.logError("Please check your configuration and fix the errors above.");
    Services.Log.logError("The addon will not restart automatically.");
    Services.Log.logError("========================================");
    
    // Sleep forever to prevent restart loop
    await new Promise(() => {}); // Never resolves
  }
};

startServer();
