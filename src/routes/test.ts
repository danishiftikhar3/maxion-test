import { Router } from "express";
import { TestResult } from "../controllers/test.controller";


const router = Router();

router.get("/", TestResult);


export default router;
