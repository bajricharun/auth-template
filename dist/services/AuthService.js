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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MainService_1 = __importDefault(require("./MainService"));
const logger_1 = require("../utils/logger");
const bcrypt = __importStar(require("bcrypt"));
class AuthService extends MainService_1.default {
    constructor() {
        super();
        this.login = (req) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const now = new Date();
                if (!(yield this.checkIfExists(email, "user", "email"))) {
                    logger_1.logger.warn(`User does not exist. ${email}`);
                    return {
                        status: 406,
                        success: false,
                        payload: "",
                        message: "User does not exist",
                    };
                }
                const user = yield this.findUnique(email, "user", "email");
                const isPassOk = yield bcrypt.compare(password, user.password);
                if (!isPassOk) {
                    return {
                        success: false,
                        status: 403,
                        payload: "",
                        message: "Wrong password.",
                    };
                }
                const jwtToken = this.createJwtToken(email);
                return {
                    success: true,
                    payload: { user: user, jwt_token: jwtToken },
                    status: 200,
                    message: "Logged in.",
                };
            }
            catch (err) {
                logger_1.logger.error(err);
                return {
                    success: false,
                    status: 500,
                    payload: "",
                    message: "Failed in logging in. Unexpected error.",
                    error: err.message,
                };
            }
        });
        this.registerNewUser = (req) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, phone_number, password, user_name, user_last_name, address, } = req.body;
                const now = new Date();
                if ((yield this.checkIfExists(email, "user", "email")) ||
                    (yield this.checkIfExists(phone_number, "user", "phone_number"))) {
                    logger_1.logger.warn(`Could not register new user ${email}, ${phone_number}`);
                    return {
                        success: false,
                        payload: "",
                        status: 406,
                        message: "User exists",
                    };
                }
                const hashedPass = yield bcrypt.hash(password, parseInt(this.env.SALT_ROUNDS));
                const parsedData = {
                    email,
                    phone_number,
                    password: hashedPass,
                    user_name,
                    user_last_name,
                    address: address ? address : undefined,
                    jwt_token: this.createJwtToken(phone_number),
                    created_on: now,
                    jwt_token_last_refresh: now,
                    o_auth_token: this.createOAuthToken(),
                    o_auth_verified: false,
                    o_auth_last_refresh: null,
                    last_update: now,
                };
                const user = yield this.prisma.user.create({ data: parsedData });
                logger_1.logger.info(`Registered new user. ${user.user_id}`);
                return {
                    success: true,
                    payload: user,
                    status: 200,
                    message: "Registered new user successfully.",
                };
            }
            catch (error) {
                logger_1.logger.error(error.message);
                return {
                    success: false,
                    status: 500,
                    message: "Failed in registering new user.",
                    error: error,
                };
            }
        });
    }
}
exports.default = AuthService;
