import AuthService from "@services/AuthService";
// @ts-ignore
import ResponseTypeService from "@types/ResponseTypeService";
import { logger } from "@utils/logger";
import { Request, Response } from "express";

class AuthController {
    private AuthService: AuthService;

    constructor() {
        this.AuthService = new AuthService();
    }

    public login = (req: Request, res: Response) => {
        this.AuthService.login(req)
            .then((response: ResponseTypeService) => {
                res.status(response?.status).send(response?.message);
            })
            .catch((err) => {
                logger.error(err);
                res.status(500).send("Unexpected error");
            });
    };

    public registerNewUser = (req: Request, res: Response) => {
        this.AuthService.registerNewUser(req)
            .then((response: ResponseTypeService) => {
                res.status(response?.status).send(response);
            })
            .catch((err: any) => {
                logger.error(err);
                res.status(500).send("Unexpected error");
            });
    };
}

export default AuthController;
