import { existsSync, mkdirSync } from "fs";
import { join } from "path";

import winston from "winston";
require("dotenv").config;

const env = process.env;

const dir: string = join(__dirname, env.LOG_DIR || "./logs");

// check directory for logs, if it does not exist we need to
// create new dir
if (!existsSync(dir)) {
    mkdirSync(dir);
}

// lets declare levels for warnings
// and colors for warnings
const levels = {
    error: 4,
    warn: 3,
    info: 2,
    http: 1,
    debug: 0,
};

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
};

// check is environment in development mode
const level = () => {
    const isEnvironmentDev = env.ENV === "development";

    return isEnvironmentDev ? "debug" : "warn";
};

winston.addColors(colors);

const format = winston.format.combine(
    // timestamp is dd-mm-yyyy hh:mm:ss:ms
    winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss:ms" }),
    // force usage of colors
    winston.format.colorize({ all: true }),
    // format our logs
    winston.format.printf(
        (info) => `${info.timestamp} [${info.level}]: ${info.message}`
    )
);

const transports = [
    new winston.transports.Console({
        format,
    }),

    new winston.transports.File({
        dirname: dir,
        filename: "error.log",
        level: "error",
        format: format,
    }),

    new winston.transports.File({
        dirname: dir,
        filename: "logs.log",
        format: format,
    }),
];

const logger = winston.createLogger({
    level: level(),
    levels,
    transports,
});

const stream = {
    write: (msg: string) => {
        logger.info(msg.substring(0, msg.lastIndexOf("\n")));
    },
};

export { logger, stream };
