import cors from "cors";
import express, { Application, Request } from "express";
import IRoute from "@interfaces/RouteInterface";
import errorMiddleware from "@middlewares/error.middleware";
import { logger } from "@utils/logger";

require("dotenv").config;
const env = process.env;

export default class App {
    public app: Application;
    public port: string | number;

    constructor(routes: IRoute[]) {
        this.app = express();
        this.port = env.PORT || 8080;

        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandler();
    }

    public listen = (): void => {
        this.app.listen(this.port, () => {
            logger.info(
                `[server]: Server is running @ http://localhost:${this.port}`
            );
        });
    };

    private initializeMiddlewares = (): void => {
        this.app.use(express.json());
        this.app.use(cors<Request>());
        this.app.use(express.urlencoded({ extended: true }));
    };

    private initializeRoutes = (routes: IRoute[]): void => {
        routes.forEach((route) => {
            this.app.use("", route.router);
        });
    };

    private initializeErrorHandler() {
        this.app.use(errorMiddleware);
    }
}
