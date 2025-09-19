const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();
const app= express();
app.use(morgan("dev"));
app.use(express.json());
connectDB()

const PORT= process.env.PORT || 3000
app.get("/", (req, res) => {
    res.send("E-commerce service backend is running....");
});
//products route
app.use("/api/products", productRoutes)
app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}.`);
}); 