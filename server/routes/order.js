const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthentication,
} = require("../middleware/verifyToken");
const {
  createOrder,
  updateOrder,
  deleteOrder,
  getAllOrder,
  getUserOrder,
  getMonthlyIncome,
} = require("../controllers/order");

router.post("/", verifyToken, createOrder);
router.put("/:id", verifyTokenAndAdmin, updateOrder);
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);
router.get("/find/:userId", verifyTokenAndAuthentication, getUserOrder);
router.get("/", verifyTokenAndAdmin, getAllOrder);
router.get("/income", verifyTokenAndAdmin, getMonthlyIncome);

module.exports = router;
