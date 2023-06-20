import { NextFunction, Request, Response } from "express";
import { logger } from "@utils/logger";
import { validationResult } from "express-validator";

const validatorMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logger.http(`validating >> ${req.path}`);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.http(`validation failed`);
            logger.http(errors.array());

            return res.status(400).json({
                success: false,
                message: errors.array(),
            });
        }

        logger.http(`validated >> ${req.path}`);
        next();
    } catch (error: any) {
        logger.error(error.message);
        return res.status(500).json({
            success: false,
            message: "Error in validation, check logs.",
        });
    }
};

export default validatorMiddleware;
