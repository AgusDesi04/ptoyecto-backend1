import { Router } from "express";
import { getProductsPaginated, findProductById, addProduct, updateProduct, deleteProduct } from "../controllers/productsController.js";



const productsRouter = Router()


productsRouter.get("/", getProductsPaginated);

productsRouter.get("/:pid", findProductById)


productsRouter.post("/", addProduct)

productsRouter.put("/:pid", updateProduct);


productsRouter.delete("/:id", deleteProduct)

export default productsRouter