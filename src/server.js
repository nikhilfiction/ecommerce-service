const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const productRoutes = require('./routes/productRoutes');
const homepageRoutes= require('./routes/homepageRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes= require("./routes/cartRoutes");
const cors= require('cors');
const cart = require("./models/cart");
require('dotenv').config();
const app= express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors())
connectDB()

const PORT= process.env.PORT || 3000
app.get("/", (req, res) => {
    res.send("E-commerce service backend is running....");
});
//products route
app.use("/api/products", productRoutes)
//home Route
app.use("/api/homepage", homepageRoutes)
//auth route
app.use("/api/auth", authRoutes)
//cart route
app.use("/api/cart", cartRoutes)
app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}.`);
}); 