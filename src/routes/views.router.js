import { showProducts } from "../controllers/viewsController.js";
import { Router } from "express";

const viewsRouter = Router()

viewsRouter.get("/products", showProducts)

export default viewsRouter