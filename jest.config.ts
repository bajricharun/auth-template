import type { Config } from "@jest/types";
// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
    moduleNameMapper: {
        "@controllers/(.*)": "<rootDir>/controllers/$1",
        "@services/(.*)": "<rootDir>/services/$1",
        "@routes/(.*)": "<rootDir>/routes/$1",
        "@middlewares/(.*)": "<rootDir>/middlewares/$1",
        "@types/(.*)": "<rootDir>/types/$1",
        "@interfaces/(.*)": "<rootDir>/interfaces/$1",
        "@utils/(.*)": "<rootDir>/utils/$1",
    },
};
export default config;
