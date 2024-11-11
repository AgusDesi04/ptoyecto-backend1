import { Router } from "express";
import { addProductInCart, deleteAllProductsFromCart, deleteProductFromCart, getCartsPopulated, updateProductsFromCart, updateQuantProductInCart } from "../controllers/cartsController.js";


const cartsRouter = Router()



cartsRouter.get('/:cid', getCartsPopulated)

cartsRouter.post("/:cid/products/:pid", addProductInCart)

cartsRouter.delete("/:cid/products/:pid", deleteProductFromCart)

cartsRouter.put("/:cid/products/:pid", updateQuantProductInCart)

cartsRouter.delete("/:cid", deleteAllProductsFromCart)

cartsRouter.put("/:cid", updateProductsFromCart);


export default cartsRouter

