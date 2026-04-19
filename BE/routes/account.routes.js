import { Router } from "express";
import { createAccount, getAllAccounts, fetchPortfolio } from "../controller/account.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const accountRouter = Router();

accountRouter.get("/accounts", verifyToken, getAllAccounts);
accountRouter.post("/accounts", verifyToken, createAccount);
accountRouter.get("/portfolio", verifyToken, fetchPortfolio);

export default accountRouter;