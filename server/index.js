require("dotenv").config();

const cors = require("cors");

const express = require("express");
const app = express();

// Connect DB
const connectDB = require("./db/connectDB");

// // Middleware
const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("./middleware/verifyToken");

// Routes
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

start();
