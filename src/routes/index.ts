import { Router } from "express";
import matchesRoutes from "./matches";

const router = Router();

router.use("/matches", matchesRoutes);
export default router;
