import { Router } from "express";
import { findMutualMatches } from "../controllers/matches.controller";



const router = Router();

router.get("/:userId", findMutualMatches);


export default router;

