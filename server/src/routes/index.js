import { Router } from "express";
import authRouter from "./auth";
import usersRouter from "./users";
import { isLoggedIn, tokenMiddleware } from "../middleware/auth.mw"

let router = Router();

router.use("/auth", authRouter);

router.use("/users", usersRouter);

export default router;