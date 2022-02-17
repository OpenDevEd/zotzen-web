import { Router } from "express";
import auth from "./auth.routes";
import output from "./output.routes";
import user from "./user.routes";

const routes = Router();

routes.use("/auth", auth);
routes.use("/output", output);
routes.use("/user", user);

export default routes;
