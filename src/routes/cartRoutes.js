const express = require('express')
const router = express.Router()
const Cart = require('../models/cart')
const Product = require('../models/product')
const authMiddleware= require('../middlewares/authMiddleware')

//Get the cart information
router.get("/", authMiddleware, async(req, res) => {
    try {
        const userId= req.user.userId; //JWT
        console.log("User ID:", userId);
        let cart = await Cart.findOne({user:userId}).populate("items.product")
        if(!cart) {
            return res.json({});
        }
        res.json(cart.items)

    } catch(error) {
        console.error(error);
        res.status(500).json({message: "Server error"})

    }

})

//POST CREATE the cart information
router.post("/", authMiddleware, async(req, res) => {
    try {
        //user verification
        console.log("Request body:", req.body);
        const userId = req.user.userId;
        console.log("User ID:", userId);
        const {productId, quantity = 1} = req.body;

        if (!productId || typeof productId !== "string") {
        return res.status(400).json({ message: "Invalid productId" });
        }
        //cart verification
        let cart = await Cart.findOne({user:userId});
        if(!cart) {
            cart = new Cart({ user: userId, items: []});
        }
        //product verification
        const product= await Product.findById(productId);

        console.log("Product found:", product);
        if(!product) {
            return res.status(404).json({ message: "Product not found"});
        }
        const existingItem= cart.items.find((item) => 
            item.product.equals(productId)
        );
        if(existingItem) {
            existingItem.quantity += quantity;
        } else{
            cart.items.push({product: productId, quantity});
        }

        await cart.save();
        await cart.populate("items.product");
        return res.json(cart.items);
        //perform the action
    } catch(error) {
        console.error(error);
        res.status(500).json({message: "Server error"});
    }

});


//delete the cart information from UI
router.delete("/:productId", authMiddleware, async(req, res) => {
    try {

        const userId= req.user.userId;
        const {productId} = req.params;

        let cart= await Cart.findOne({user:userId})
        if(!cart) {
            return res.status(404).json({message: "cart not found"})
        }
        cart.items= cart.items.filter((item) => !item.product.equals(productId));
        await cart.save();
        await cart.populate("items.product");
        return res.json(cart.items);

    } catch(error) {
        console.error(error);
        res.status(500).json({message: "Server error"})
    }

})
module.exports = router

// const express = require('express')
// const router = express.Router()
// const Cart = require('../models/cart')
// const Product = require('../models/product')
// const authMiddleware= require('../middlewares/authMiddleware')

// //Get the cart information
// router.get("/", async(req, res) => {
//     try {
//         const userId= req.user.userId; //JWT
//         let cart = await Cart.findOne({user:userId}).populate("items.product")
//         if(!cart) {
//             return res.json({});
//         }
//         res.json(cart.items)

//     } catch(error) {
//         console.error(error);
//         res.status(500).json({message: "Server error"})

//     }

// })

// //POST CREATE the cart information
// router.post("/", authMiddleware, async(req, res) => {
//     try {
//         //user verification
//         const userId = req.user.userId;
//         const {productId, quantity = 1} = req.body;
//         //cart verification
//         let cart = await Cart.findOne({user:userId});
//         //product verification
//         const product= await Product.findById(productId);
//         if(!product) {
//             return res.status(404).json({ message: "Product not found"})
//         }
//         const existingItem= cartitems.find((item) => item.product.equals(productId))
//         if(existingItem) {
//             existingItem.quantity += quantity
//         } else{
//             cart.items.push({product: productId, quantity})
//         }

//         await cart.save()
//         await cart.populate("items.product");
//         return res.json(cart.items)
//         //perform the action
//     } catch(error) {
//         console.error(error);
//         res.status(500).json({message: "Server error"})
//     }

// })


// //delete the cart information from UI
// router.delete("/:productId", authMiddleware, async(req, res) => {
//     try {

//         const userId= req.user.userId;
//         const {productId} = req.params;

//         let cart= await Cart.findOne({user:userId})
//         if(!cart) {
//             return res.status(404).json({message: "cart not found"})
//         }
//         cart.items= cart.items.filter((item) => !item.product.equals(productId))
//         await cart.save()
//         await cart.populate("items.product")
//         return res.json(cart.items)

//     } catch(error) {
//         console.error(error);
//         res.status(500).json({message: "Server error"})
//     }

// })
// module.exports = router