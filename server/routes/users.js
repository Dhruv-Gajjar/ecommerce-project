const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUsers,
  updateUser,
  deleteUser,
  getSingleUsers,
  getUserStats,
} = require("../controllers/users");
const {
  verifyToken,
  verifyTokenAndAuthentication,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const User = require("../models/Users");

router.route("/").get(getAllUsers).post(createUsers);

router
  .route("/:id", verifyTokenAndAuthentication)
  .put(updateUser)
  .delete(deleteUser);

router.route("/find/:id", verifyTokenAndAdmin).get(getSingleUsers);

router.route("/stats", verifyTokenAndAdmin).get(getUserStats);

module.exports = router;
