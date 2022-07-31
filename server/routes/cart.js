const router = require("express").Router();
const {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllCart,
} = require("../controllers/cart");
const {
  verifyToken,
  verifyTokenAndAuthentication,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

router.route("/", verifyTokenAndAdmin).get(getAllCart).post(createCart);
router
  .route("/:id", verifyTokenAndAuthentication)
  .get(getUserCart)
  .put(updateCart)
  .delete(deleteCart);

module.exports = router;
