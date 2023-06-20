"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthService_1 = __importDefault(require("../services/AuthService"));
const logger_1 = require("../utils/logger");
class AuthController {
    constructor() {
        this.login = (req, res) => {
            this.AuthService.login(req)
                .then((response) => {
                res.status(response === null || response === void 0 ? void 0 : response.status).send(response === null || response === void 0 ? void 0 : response.message);
            })
                .catch((err) => {
                logger_1.logger.error(err);
                res.status(500).send("Unexpected error");
            });
        };
        this.registerNewUser = (req, res) => {
            this.AuthService.registerNewUser(req)
                .then((response) => {
                res.status(response === null || response === void 0 ? void 0 : response.status).send(response.message);
            })
                .catch((err) => {
                logger_1.logger.error(err);
                res.status(500).send("Unexpected error");
            });
        };
        this.AuthService = new AuthService_1.default();
    }
}
exports.default = AuthController;
