import { NextFunction, Request, Response } from "express";
import HttpException from "@utils/exception";
import { logger } from "@utils/logger";

const errorMiddleware = (
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const status: number = error.status || 500;
        const message: string = error.message || "Unexpected error";

        logger.error(
            `${req.method} ${req.path} >> CODE::${status} MESSAGE::${message}`
        );

        res.status(status).json({
            success: false,
            payload: null,
            message: "Unexpected error.",
            error: "Check the logs.",
        });
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;
