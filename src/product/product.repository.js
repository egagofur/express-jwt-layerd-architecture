//kominikasi dengan database
//ganti ganti orm/ raw query gak menganggu service

const prisma = require("../db");

const findProduct = async () => {
  const products = await prisma.product.findMany();

  return products;
};

const findProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  return product;
};

const insertProduct = async (productData) => {
  const product = await prisma.product.create({
    data: {
      name: productData.name,
      description: productData.description,
      image: productData.image,
    },
  });
  return product;
};

const deleteProduct = async (id) => {
  await prisma.product.delete({
    where: {
      id,
    },
  });
};

const updateProduct = async (id, productData) => {
  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name: productData.name,
      description: productData.description,
      image: productData.image,
    },
  });
  return product;
};

module.exports = {
  findProduct,
  findProductById,
  insertProduct,
  deleteProduct,
  updateProduct,
};
