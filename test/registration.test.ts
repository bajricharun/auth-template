import express, { Request } from "express";
import cors from "cors";
import AuthRoute from "@routes/AuthRoute";
import { logger } from "@utils/logger";
const supertest = require("supertest");

const app = express();
const routes = [new AuthRoute()];
app.use(express.json());
app.use(cors<Request>());
app.use(express.urlencoded({ extended: true }));

routes.forEach((route) => {
    app.use("", route.router);
});

app.listen(3000, () => {
    logger.info(`[server]: Server is running @ http://localhost:3000`);
});

const requestWithSupertest = supertest(app);
test("check ordinary registration", async () => {
    await requestWithSupertest
        .post("/api/auth/register")
        .send({
            email: "harunbajri211c@protonmail.com",
            phone_number: "38760316574222",
            password: "harun123",
            user_name: "Harun",
            user_last_name: "Bajric",
            address: {},
        })
        .expect(200)
        .then((response: any) => {
            expect(response._body.payload.user.user_name).toEqual("Harun");
            expect(response._body.payload.user.user_last_name).toEqual(
                "Bajric"
            );
            expect(response._body.payload.user.phone_number).toEqual(
                "38760316574222"
            );
            expect(response._body.payload.user.email).toEqual(
                "harunbajri211c@protonmail.com"
            );
        });
});

test("check if validation is in order", async () => {
    await requestWithSupertest
        .post("/api/auth/register")
        .send({
            email: "harunbajric",
            phone_number: "387603165742",
            password: "harun123",
            user_name: "Harun",
            user_last_name: "Bajric",
            address: {},
        })
        .expect(400)
        .then((response: any) => {
            expect(response._body.success).toEqual(false);
        });
});

test("check if you can register with existing data", async () => {
    await requestWithSupertest
        .post("/api/auth/register")
        .send({
            email: "harunbajric@protonmail.com",
            phone_number: "387603165742",
            password: "harun123",
            user_name: "Harun",
            user_last_name: "Bajric",
            address: {},
        })
        .expect(406)
        .then((response: any) => {
            expect(response._body.success).toEqual(false);
            expect(response._body.message).toEqual("User exists");
        });
});
