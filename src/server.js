// const express = require("express");
// const morgan = require("morgan");
// const connectDB = require("./config/db");
// const productRoutes = require('./routes/productRoutes');
// const homepageRoutes= require('./routes/homepageRoutes');
// const authRoutes = require('./routes/authRoutes');
// const cartRoutes= require("./routes/cartRoutes");
// const orderRoutes = require('./routes/orderRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');
// const cors= require('cors');
// const cart = require("./models/cart");
// require('dotenv').config();
// const app= express();
// app.use(morgan("dev"));
// app.use(express.json());
// app.use(cors())
// connectDB()

// const PORT= process.env.PORT || 3000
// app.get("/", (req, res) => {
//     res.send("E-commerce service backend is running....");
// });
// //products route
// app.use("/api/products", productRoutes)
// //home Route
// app.use("/api/homepage", homepageRoutes)
// //auth route
// app.use("/api/auth", authRoutes)
// //cart route
// app.use("/api/cart", cartRoutes)
// app.listen(PORT, () => {
//     console.log(`Server listening to port ${PORT}.`);
// }); 

// app.use('/api/orders', orderRoutes);
// app.use('/api/payment', paymentRoutes);

// require('dotenv').config();

// console.log('Stripe Key:', process.env.STRIPE_SECRET_KEY); // Add this line here to check key load

// const express = require("express");
// const morgan = require("morgan");
// const connectDB = require("./config/db");
// const productRoutes = require('./routes/productRoutes');
// const homepageRoutes= require('./routes/homepageRoutes');
// const authRoutes = require('./routes/authRoutes');
// const cartRoutes= require("./routes/cartRoutes");
// const orderRoutes = require('./routes/orderRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');
// const cors= require('cors');
// const cart = require("./models/cart");
// const Stripe = require('stripe');
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// const app= express();
// app.use(morgan("dev"));
// app.use(express.json());
// app.use(cors())
// connectDB()


// const PORT= process.env.PORT || 3000
// app.get("/", (req, res) => {
//     res.send("E-commerce service backend is running....");
// });
// //products route
// app.use("/api/products", productRoutes)
// //home Route
// app.use("/api/homepage", homepageRoutes)
// //auth route
// app.use("/api/auth", authRoutes)
// //cart route
// app.use("/api/cart", cartRoutes)

// app.use('/api/orders', orderRoutes);
// app.use('/api/payment', paymentRoutes);

// app.listen(PORT, () => {
//     console.log(`Server listening to port ${PORT}.`);
// }); 

require('dotenv').config();

console.log('Loaded environment variables:');
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY);


const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const productRoutes = require('./routes/productRoutes');
const homepageRoutes= require('./routes/homepageRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes= require("./routes/cartRoutes");
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const cors= require('cors');
const cart = require("./models/cart");
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app= express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors())
connectDB();

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

// order and payment route last
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);


app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}.`);
});
