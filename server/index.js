require("dotenv").config();

const cors = require("cors");

const express = require("express");
const app = express();

// Routes
const UserRoutes = require("./routes/users");
const AuthRoutes = require("./routes/auth");

app.use(express.json());
app.use(cors());

app.use("/api", UserRoutes);
app.use("/api", AuthRoutes);

const connectDB = require("./db/connectDB");

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
