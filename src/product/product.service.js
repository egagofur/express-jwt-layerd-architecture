//handle bisnis logic

const {
  findProduct,
  findProductById,
  insertProduct,
  deleteProduct,
  updateProduct,
} = require("./product.repository");

const getAllProducts = async () => {
  const products = await findProduct();

  return products;
};

const getProductById = async (id) => {
  const product = await findProductById(id);

  if (!product) {
    throw Error("product not found");
  }
  return product;
};

const createProduct = async (data) => {
  const product = insertProduct(data);
  return product;
};

const deleteProductById = async (id) => {
  await getProductById(id);
  await deleteProduct(id);
};

const editProductById = async (id, productData) => {
  await getProductById(parseInt(id));
  const product = await updateProduct(id, productData);
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
};
