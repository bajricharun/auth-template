import IMainService from "@interfaces/MainServiceInterface";
import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
// import { MessageBird } from "messagebird";

require("dotenv").config();

export default class MainService implements IMainService {
    public prisma: PrismaClient;
    public env: any;
    // public messagebird: MessageBird;
    // private messagebirdApi: string;

    constructor() {
        this.prisma = new PrismaClient();
        this.env = process.env;
        // this.messagebirdApi =
        //     this.env === "dev" || this.env === "test"
        //         ? this.env.MESSAGEBIRD_API_TEST
        //         : this.env.MESSAGEBIRD_LIVE_API;
        // this.messagebird = require("messagebird")(this.messagebirdApi);
    }

    public createJwtToken = (phoneNumber: string) => {
        return jwt.sign(
            {
                phoneNumber: phoneNumber,
            },
            this.env.JWT_SECRET_KEY as string,
            { expiresIn: "48h" }
        );
    };

    public createOAuthToken = (): string => {
        const min = 100000,
            max = 999999;

        const num = Math.floor(Math.random() * (max - min + 1)) + min;

        return `${num}`;
    };

    // public sendOAuthToken = (
    //     recipient: string,
    //     message: string
    // ): boolean | any => {
    //     this.messagebird.messages.create(
    //         {
    //             originator: "AUTH",
    //             recipients: [recipient],
    //             body: message,
    //         },
    //         (err: any, res: any) => {
    //             if (err) {
    //                 return { err };
    //             } else {
    //                 return true;
    //             }
    //         }
    //     );
    // };

    public checkIfExists = async (
        value: any,
        schema: any,
        findBy: any
    ): Promise<boolean> => {
        const findClause: any = {};

        findClause[findBy] = value;

        // @ts-ignore
        const schematicRow = await this.prisma[schema].findUnique({
            where: findClause,
        });

        if (schematicRow) {
            return true;
        }

        return false;
    };

    public findUnique = async (value: any, schema: any, findBy: any) => {
        const findClause: any = {};

        findClause[findBy] = value;

        // @ts-ignore
        const schematicRow = await this.prisma[schema].findUnique({
            where: findClause,
        });

        if (schematicRow) {
            return schematicRow;
        }
    };
}
