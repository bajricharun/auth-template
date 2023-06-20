import { Router } from "express";
import IRoute from "@interfaces/RouteInterface";

export default class MainRouter implements IRoute {
    public path: string;
    public router: Router = Router();
    public controller: any;

    constructor(path: string, controller: any) {
        this.path = path;
        this.controller = controller;
    }
}
