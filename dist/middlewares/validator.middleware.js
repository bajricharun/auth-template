"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
const express_validator_1 = require("express-validator");
const validatorMiddleware = (req, res, next) => {
    try {
        logger_1.logger.http(`validating >> ${req.path}`);
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            logger_1.logger.http(`validation failed`);
            logger_1.logger.http(errors.array());
            return res.status(400).json({
                success: false,
                message: errors.array(),
            });
        }
        logger_1.logger.http(`validated >> ${req.path}`);
        next();
    }
    catch (error) {
        logger_1.logger.error(error.message);
        return res.status(500).json({
            success: false,
            message: "Error in validation, check logs.",
        });
    }
};
exports.default = validatorMiddleware;
