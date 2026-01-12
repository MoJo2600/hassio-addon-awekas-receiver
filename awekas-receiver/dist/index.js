"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = __importDefault(require("./services"));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Configure environment
        services_1.default.Environment.configureEnv();
        // Initialize and validate InfluxDB connection
        services_1.default.Log.logInfo("Validating InfluxDB configuration...");
        yield services_1.default.Influx.initialize();
        // Start HTTP server
        const server = services_1.default.HTTP.initHTTP();
        // Setup signal handlers
        services_1.default.Signal.addListeners(server);
        // Graceful shutdown handler
        const shutdown = (signal) => __awaiter(void 0, void 0, void 0, function* () {
            services_1.default.Log.logInfo(`Received ${signal}, shutting down gracefully...`);
            try {
                yield services_1.default.Influx.close();
                server.close(() => {
                    services_1.default.Log.logInfo("Server closed");
                    process.exit(0);
                });
            }
            catch (error) {
                services_1.default.Log.logError(`Error during shutdown: ${error.message}`);
                process.exit(1);
            }
        });
        process.on("SIGTERM", () => shutdown("SIGTERM"));
        process.on("SIGINT", () => shutdown("SIGINT"));
    }
    catch (error) {
        services_1.default.Log.logError("Failed to start addon:");
        services_1.default.Log.logError(error.message);
        process.exit(1);
    }
});
startServer();
