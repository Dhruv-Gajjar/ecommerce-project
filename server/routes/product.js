const router = require("express").Router();
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
} = require("../controllers/product");

// router.route("/", verifyTokenAndAdmin).get(getAllProduct).post(createProduct);
// router
//   .route("/:id", verifyTokenAndAdmin)
//   .get(getSingleProduct)
//   .put(updateProduct)
//   .delete(deleteProduct);

router.get("/",getAllProduct)
router.post("/",createProduct)

router.get("/:id",getSingleProduct)
router.put("/:id",verifyTokenAndAdmin,updateProduct)
router.delete("/:id",verifyTokenAndAdmin,deleteProduct)


module.exports = router;
