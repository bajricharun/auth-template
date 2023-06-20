import MainService from "@services/MainService";
// @ts-ignore
import ResponseTypeService from "@types/ResponseTypeService";
import { logger } from "@utils/logger";
import { Request } from "express";
import * as bcrypt from "bcrypt";

export default class AuthService extends MainService {
    constructor() {
        super();
    }

    public login = async (req: Request): Promise<ResponseTypeService> => {
        try {
            const { email, password } = req.body;

            const now = new Date();

            if (!(await this.checkIfExists(email, "user", "email"))) {
                logger.warn(`User does not exist. ${email}`);
                return {
                    status: 406,
                    success: false,
                    payload: "",
                    message: "User does not exist",
                };
            }

            const user = await this.findUnique(email, "user", "email");
            const isPassOk = await bcrypt.compare(password, user.password);

            if (!isPassOk) {
                return {
                    success: false,
                    status: 403,
                    payload: "",
                    message: "Wrong password.",
                };
            }

            return {
                success: true,
                payload: { user: user, jwt_token: this.createJwtToken(email) },
                status: 200,
                message: "Logged in.",
            };
        } catch (err: any) {
            logger.error(err);

            return {
                success: false,
                status: 500,
                payload: "",
                message: "Failed in logging in. Unexpected error.",
                error: err.message,
            };
        }
    };

    public registerNewUser = async (
        req: Request
    ): Promise<ResponseTypeService> => {
        try {
            const {
                email,
                phone_number,
                password,
                user_name,
                user_last_name,
                address,
            } = req.body;

            const now = new Date();

            if (
                (await this.checkIfExists(email, "user", "email")) ||
                (await this.checkIfExists(phone_number, "user", "phone_number"))
            ) {
                logger.warn(
                    `Could not register new user ${email}, ${phone_number}`
                );
                return {
                    success: false,
                    payload: "",
                    status: 406,
                    message: "User exists",
                };
            }

            const hashedPass = await bcrypt.hash(
                password,
                parseInt(this.env.SALT_ROUNDS as string)
            );

            const parsedData = {
                email,
                phone_number,
                password: hashedPass,
                user_name,
                user_last_name,
                address: address ? address : undefined,
                created_on: now,
                o_auth_token: this.createOAuthToken(),
                o_auth_verified: false,
                o_auth_last_refresh: null,
                last_update: now,
            };

            const user = await this.prisma.user.create({ data: parsedData });

            logger.info(`Registered new user. ${user.user_id}`);

            return {
                success: true,
                payload: {
                    user: user,
                    jwt_token: this.createJwtToken(phone_number),
                },
                status: 200,
                message: "Registered new user successfully.",
            };
        } catch (error: any) {
            logger.error(error.message);
            return {
                success: false,
                status: 500,
                message: "Failed in registering new user.",
                error: error,
            };
        }
    };
}
