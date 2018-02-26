import { Router } from "express";
import authRouter from "./auth";
import { isLoggedIn, tokenMiddleware } from "../middleware/auth.mw"

let router = Router();

router.use("/auth", authRouter);

export default router;