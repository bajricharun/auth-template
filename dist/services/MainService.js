"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const jwt = __importStar(require("jsonwebtoken"));
// import { MessageBird } from "messagebird";
require("dotenv").config();
class MainService {
    // public messagebird: MessageBird;
    // private messagebirdApi: string;
    constructor() {
        this.createJwtToken = (phoneNumber) => {
            return jwt.sign({
                phoneNumber: phoneNumber,
            }, this.env.JWT_SECRET_KEY, { expiresIn: "48h" });
        };
        this.createOAuthToken = () => {
            const min = 100000, max = 999999;
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
        this.checkIfExists = (value, schema, findBy) => __awaiter(this, void 0, void 0, function* () {
            const findClause = {};
            findClause[findBy] = value;
            // @ts-ignore
            const schematicRow = yield this.prisma[schema].findUnique({
                where: findClause,
            });
            if (schematicRow) {
                return true;
            }
            return false;
        });
        this.findUnique = (value, schema, findBy) => __awaiter(this, void 0, void 0, function* () {
            const findClause = {};
            findClause[findBy] = value;
            // @ts-ignore
            const schematicRow = yield this.prisma[schema].findUnique({
                where: findClause,
            });
            if (schematicRow) {
                return schematicRow;
            }
        });
        this.prisma = new client_1.PrismaClient();
        this.env = process.env;
        // this.messagebirdApi =
        //     this.env === "dev" || this.env === "test"
        //         ? this.env.MESSAGEBIRD_API_TEST
        //         : this.env.MESSAGEBIRD_LIVE_API;
        // this.messagebird = require("messagebird")(this.messagebirdApi);
    }
}
exports.default = MainService;
