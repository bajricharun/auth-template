import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { logger } from "@utils/logger";

require("dotenv").config();
const config = process.env;

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.headers["authorization"];

    if (!token) {
        return res.status(403).send({
            success: false,
            payload: null,
            message: "A token is required for authentication.",
            error: "Token not found.",
        });
    }

    try {
        const verify = jwt.verify(token, config.JWT_SECRET_KEY);

        if (verify) {
            next();
        }
    } catch (error: any) {
        logger.error(`${req.method} ${req.path} Message >> ${error.message}`);
        res.status(401).send({
            success: false,
            payload: null,
            message: "Token verification failed",
            error:
                config.ENV === "development"
                    ? error.message
                    : "Check the logs.",
        });
    }
};

module.exports = verifyToken;
