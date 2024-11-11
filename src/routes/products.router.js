import { Router } from "express";
import ProductsManager from "../daos/productsManager.js";
import { getProductsPaginated, findProductById, addProduct, updateProduct, deleteProduct } from "../controllers/productsController.js";



const productsRouter = Router()

ProductsManager.path = "./src/data/products.json"

productsRouter.get("/", getProductsPaginated);

productsRouter.get("/:pid", findProductById)


productsRouter.post("/", addProduct)

productsRouter.put("/:pid", updateProduct);


productsRouter.delete("/:id", deleteProduct)

export default productsRouter