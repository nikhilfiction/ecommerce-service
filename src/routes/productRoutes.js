const express= require('express')
const router= express.Router()
const Product= require('../models/product')

//get the list of products - supports search, category/price filters, sorting and pagination
//e.g. GET /api/products?search=shirt&category=Men&minPrice=100&maxPrice=1000&sort=price_asc&page=1&limit=12
router.get("/", async(req, res)=> {
    try {
        const {
            search,
            category,
            minPrice,
            maxPrice,
            sort,
            page = 1,
            limit = 12
        } = req.query;

        const filter = {};

        if (search) {
            // case-insensitive match on title or description
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ];
        }

        if (category) {
            filter.category = category;
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const sortOptions = {
            price_asc: { price: 1 },
            price_desc: { price: -1 },
            newest: { createdAt: -1 },
        };
        const sortBy = sortOptions[sort] || { createdAt: -1 };

        const pageNum = Math.max(Number(page) || 1, 1);
        const limitNum = Math.min(Math.max(Number(limit) || 12, 1), 100);
        const skip = (pageNum - 1) * limitNum;

        const [products, totalItems] = await Promise.all([
            Product.find(filter).sort(sortBy).skip(skip).limit(limitNum),
            Product.countDocuments(filter)
        ]);

        res.status(200).json({
            products,
            page: pageNum,
            totalPages: Math.max(Math.ceil(totalItems / limitNum), 1),
            totalItems
        });

    } catch(error){
        console.log(error)
        res.status(500).json({message: "Server error"})
    }

})

//get the distinct list of categories, used to populate the filter dropdown
router.get("/categories", async(req, res) => {
    try {
        const categories = await Product.distinct("category", { category: { $ne: null, $ne: "" } });
        res.status(200).json(categories);
    } catch(error) {
        console.log(error)
        res.status(500).json({message: "Server error"})
    }
})

//creating a product
router.post("/", async(req, res)=> {

    try{
        const newProduct= new Product(req.body)
        const savedProduct= await newProduct.save();
        res.status(201).json(savedProduct);

    } catch(error){
        console.log(error)
        res.status(500).json({message: "Server error"})
    }

})

// Delete a product by its MongoDB _id
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if(deletedProduct) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
