import { Router } from "express";
import { TestResult } from "src/controllers/test.controller";


const router = Router();

router.get("/", TestResult);


export default router;
