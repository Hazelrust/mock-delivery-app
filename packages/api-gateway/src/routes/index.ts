import { Router } from "express";
import restuarantRoutes from './restaurantRoutes'

const router = Router()

router.use("/restaurants", restuarantRoutes)

export default router