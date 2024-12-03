import winston from "winston";

// Define your custom format
const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create the logger
const logger = winston.createLogger({
  level: "info", // Default log level
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp
    customFormat
  ),
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: "app.log" }), // Log to a file
  ],
});

export default logger;
