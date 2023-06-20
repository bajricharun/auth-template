"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
const errorMiddleware = (error, req, res, next) => {
    try {
        const status = error.status || 500;
        const message = error.message || "Unexpected error";
        logger_1.logger.error(`${req.method} ${req.path} >> CODE::${status} MESSAGE::${message}`);
        res.status(status).json({
            success: false,
            payload: null,
            message: "Unexpected error.",
            error: "Check the logs.",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.default = errorMiddleware;
