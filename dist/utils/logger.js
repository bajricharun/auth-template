"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stream = exports.logger = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const winston_1 = __importDefault(require("winston"));
require("dotenv").config;
const env = process.env;
const dir = (0, path_1.join)(__dirname, env.LOG_DIR || "./logs");
// check directory for logs, if it does not exist we need to
// create new dir
if (!(0, fs_1.existsSync)(dir)) {
    (0, fs_1.mkdirSync)(dir);
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
winston_1.default.addColors(colors);
const format = winston_1.default.format.combine(
// timestamp is dd-mm-yyyy hh:mm:ss:ms
winston_1.default.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss:ms" }), 
// force usage of colors
winston_1.default.format.colorize({ all: true }), 
// format our logs
winston_1.default.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`));
const transports = [
    new winston_1.default.transports.Console({
        format,
    }),
    new winston_1.default.transports.File({
        dirname: dir,
        filename: "error.log",
        level: "error",
        format: format,
    }),
    new winston_1.default.transports.File({
        dirname: dir,
        filename: "logs.log",
        format: format,
    }),
];
const logger = winston_1.default.createLogger({
    level: level(),
    levels,
    transports,
});
exports.logger = logger;
const stream = {
    write: (msg) => {
        logger.info(msg.substring(0, msg.lastIndexOf("\n")));
    },
};
exports.stream = stream;
