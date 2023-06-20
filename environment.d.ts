import { Secret } from "jsonwebtoken";
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT?: number;
            DATABASE_URL: string;
            SALT_ROUNDS: string;
            JWT_SECRET_KEY: Secret;
            MESSAGEBIRD_API_TEST: string;
            MESSAGEBIRD_LIVE_API: string;
            ENV: string;
            LOG_DIR: string;
        }
    }
}

export {};
