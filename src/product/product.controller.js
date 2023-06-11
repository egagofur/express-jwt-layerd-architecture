//layer req, res, dan validasi body
const express = require("express");

const {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
} = require("./product.service");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  const products = await getAllProducts();
  res.send(products);
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const products = await getProductById(productId);
    res.send(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const newProductData = req.body;
    const product = await createProduct(newProductData);
    res.status(201).send({ data: product, postMessage: "Succes post data" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:productId", verifyToken, async (req, res) => {
  const productId = req.params.productId;
  try {
    await deleteProductById(parseInt(productId));
    res.status(200).send({ message: "Succes Detele Product" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:productId", verifyToken, async (req, res) => {
  const productId = req.params.productId;
  const updateProductData = req.body;

  try {
    if (
      !(
        updateProductData.name &&
        updateProductData.description &&
        updateProductData.image
      )
    ) {
      res.status(400).send("data not valid");
    }

    const product = await editProductById(
      parseInt(productId),
      updateProductData
    );
    res.status(201).send({
      data: product,
      message: "Succes update your data",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/:productId", verifyToken, async (req, res) => {
  const productId = req.params.productId;
  const updateProductData = req.body;

  try {
    const product = await editProductById(
      parseInt(productId),
      updateProductData
    );
    res.status(201).send({
      data: product,
      message: "Succes update your data",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
