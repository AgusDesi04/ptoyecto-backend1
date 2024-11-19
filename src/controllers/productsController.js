import ProductsManager from "../daos/productsManager.js";

export const getProductsPaginated = async (req, res) => {

  let { page = 1, limit = 10, sort = null, filter = null } = req.query

  if (isNaN(Number(page)) || Number(page) < 1) {
    page = 1;
  }

  if (isNaN(Number(limit)) || Number(limit) < 1) {
    limit = 10;
  }

  try {

    const productsData = await ProductsManager.getProductsPaginate({
      page,
      limit,
      sort,
      filter
    });

    const { docs: products, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = productsData;

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({
      products,
      totalPages,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      currentPage: page,
      limit,
      sort,
      filter
    });
  } catch (error) {

    console.log(error);
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json(
      {
        error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
        detalle: `${error.message}`
      }
    )
  }
}

export const findProductById = async (req, res) => {
  let { pid } = req.params


  let product = await ProductsManager.getById(pid)

  if (!product) {
    res.setHeader("content-type", "aplication/json")
    return res.status(400).send(`El producto con el id: ${id} no se encuentra entre los productos registrados!`)
  }

  res.status(200).json({ product })
}

export const addProduct = async (req, res) => {
  let { title, description, code, price, status, stock, category } = req.body

  // VALIDACIONES

  const existingProduct = await ProductsManager.getProductByCode(code);
  if (existingProduct) {
    return res.status(400).json({ error: 'El código de producto ya existe.' });
  }

  if (!title || !description || !code || !price || !stock || !category) {
    res.setHeader("content-type", "aplication/json")
    return res.status(400).json({ error: "complete todas las propiedades!" })
  }

  if (!status) {
    status = true
  }


  // CARGA DEL NUEVO PRODUCTO

  try {
    let newProduct = await ProductsManager.addProducts({ title, description, code, price, status, stock, category })
    res.setHeader("content-type", "aplication/json")
    return res.status(200).json({ newProduct })

  } catch (error) {
    console.log(error)
    res.setHeader("content-type", "aplication/json")
    return res.status(500).json(
      {
        error: `error inesperado en el servidor!!`,
        detalle: `${error.message}`
      }
    )
  }

}

export const updateProduct = async (req, res) => {
  const { pid } = req.params;
  const productUpdates = req.body;


  try {
    const updatedProduct = await ProductsManager.updateProduct(pid, productUpdates);

    res.status(200).json({
      message: "Producto actualizado exitosamente",
      product: updatedProduct
    });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);

    res.status(500).json({
      message: "Error al actualizar el producto",
      error: error.message
    });
  }
}

export const deleteProduct = async (req, res) => {
  let { id } = req.params

  try {
    let resultado = await ProductsManager.deleteProducts(id)
    if (!resultado) {
      res.setHeader("content-type", "aplication/json")
      return res.status(500).json({ error: `error al eliminar!!` })
    } else {
      res.setHeader("content-type", "aplication/json")
      return res.status(200).json({ payload: "producto eliminado" })
    }



  } catch (error) {
    console.log(error);
    res.setHeader("content-type", "aplication/json")
    res.status(500).json({
      error: "Error inesperado en el servidor - Intente más tarde, o contacte a su administrador",
      detalle: error.message
    });
  }

}
