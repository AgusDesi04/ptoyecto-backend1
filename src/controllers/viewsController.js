import ProductsManager from "../daos/productsManager.js"


export const showProducts = async (req, res) => {
  try {
    const products = await ProductsManager.getProducts()
    res.status(200).render("home", {title: "Todos Los Productos", products: products})
  } catch (error) {
    res.status(error.code || 500).json({status: "error", message: error.message})
  }
}