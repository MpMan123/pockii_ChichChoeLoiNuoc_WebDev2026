import { Router } from "express";
import { createAccount, getAllAccounts } from "../controller/account.controller.js";

const accountRouter = Router();

accountRouter.get("/accounts", getAllAccounts);
accountRouter.post("/accounts", createAccount);

export default accountRouter;