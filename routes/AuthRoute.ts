import IRoute from "@interfaces/RouteInterface";
import MainRouter from "@routes/IndexRoute";
import AuthController from "@controllers/AuthController";
import { body, check } from "express-validator";
import validatorMiddleware from "@middlewares/validator.middleware";
class AuthRoute extends MainRouter implements IRoute {
    constructor() {
        super("/api/auth", new AuthController());

        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}/register`,
            body("email")
                .exists()
                .withMessage("Email is required")
                .isEmail()
                .withMessage("Email not valid"),
            check("password").isLength({ min: 6 }),
            check("phone_number").isNumeric(),
            validatorMiddleware,
            this.controller.registerNewUser
        );
        this.router.post(`${this.path}/login`);
    }
}

export default AuthRoute;
