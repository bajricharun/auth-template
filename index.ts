import "./paths";
import AuthRoute from "@routes/AuthRoute";
import App from "./app";

const app = new App([new AuthRoute()]);

app.listen();
