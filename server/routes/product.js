const router = require("express").Router();
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
} = require("../controllers/product");

router.route("/", verifyTokenAndAdmin).get(getAllProduct).post(createProduct);
router
  .route("/:id", verifyTokenAndAdmin)
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
