import express from "express";
import { getCustomer } from "../controllers/customerController.js";
import * as customerController from "../controllers/customerController.js";


const router = express.Router();

router.get("/api/customers/:customerId", customerController.getCustomer);

export default router;
