import path from "path";

import winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, "../../log/error.log"), level: "error" }),
    new winston.transports.Console(),
  ],
});

export { logger };
