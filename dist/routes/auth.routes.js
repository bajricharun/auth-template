"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_routes_1 = __importDefault(require("./index.routes"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const express_validator_1 = require("express-validator");
const validator_middleware_1 = __importDefault(require("../middlewares/validator.middleware"));
class AuthRoute extends index_routes_1.default {
    constructor() {
        super("/api/auth", new AuthController_1.default());
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, (0, express_validator_1.body)("email")
            .exists()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email not valid"), (0, express_validator_1.check)("password").isLength({ min: 6 }), (0, express_validator_1.check)("phone_number").isNumeric(), validator_middleware_1.default, this.controller.registerNewUser);
        this.router.post(`${this.path}/login`);
    }
}
exports.default = AuthRoute;
