"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class MainRouter {
    constructor(path, controller) {
        this.router = (0, express_1.Router)();
        this.path = path;
        this.controller = controller;
    }
}
exports.default = MainRouter;
