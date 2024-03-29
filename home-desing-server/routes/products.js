const express = require("express");
const joi = require("joi");
const Product = require("../models/Product");
const auth = require("../middleware/auth")
const _=require("lodash");
const router = express.Router();

const productSchema = joi.object ({
    title: joi.string().required().min(2),
    subtitle: joi.string(),
    description: joi.string().required().min(2),
    option: joi.string(),
    category: joi.string().required().min(2),
    price: joi.number().required(),
    imageUrl: joi.string().required(),
    imageAlt: joi.string().required(),
})

// add product
router.post("/"  , auth , async(req,res) => {
    try {
        // 1. check if user is an admin
        if (!req.payload.isAdmin)
        return res.status(400).send("Access denied. User is not admin");

        // 2. joi validation
        const {error} = productSchema.validate(req.body)
        if (error) return res.status(400).send(error);

        // 3. check if product already exist
        let product = await Product.findOne({
            title: req.body.title,
            price: req.body.price,
            category: req.body.category,
        });

        if (product) return res.status(400).send("Product already exist");

        // 4. add product
        product = new Product(req.body);
        await product.save();

        // 5. return new product details
        res.status(201).send(product)
    } catch (error) {
        res.status(400).send(error);
    }
});

// get all
router.get("/" , async(req,res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products)
    } catch (error) {
        res.status(400).send(error)
    }
});

// Search products by title
router.get("/search", async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).send("Search query is required");
        }

        const products = await Product.find({
            title: { $regex: new RegExp(query, "i") }, // Case-insensitive search
        });

        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

// get product by id
router.get("/:idProduct", async (req, res) => {
    try {
        let product = await Product.findOne(
            {
                _id: req.params.idProduct
            }
        )
        res.status(200).send(product)
    } catch (error) {
        res.status(400).send((error))
    }
})



// get product by category
router.get("/by/:category", async (req, res) => {
    try {
        let products = await Product.find(
            {
                category: req.params.category
            }
        )
        res.status(200).send(products)
    } catch (error) {
        res.status(400).send((error))
    }
})



// get product details
router.get("/details/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).send(_.pick(product, [
            "_id",
            "title",
            "subtitle",
            "description",
            /*  "options", */
            "category",
            "price",
            "imageUrl",
            "imageAlt"
        ]))
    } catch (error) {
        res.status(400).send(error)
    }
})

// update product
router.put("/update/:id", auth, async (req, res) => {
    try {
        // 1. check if user is an admin
        if (!req.payload.isAdmin)
            return res.status(400).send("Access denied. User is not an admin");

        // 2. joi validation
        const { error } = productSchema.validate(req.body);
        if (error) return res.status(400).send(error)

        // 3. check if product already exist
        let product = await Product.findOneAndUpdate(
            {
                _id: req.params.id
            },
            req.body, { new: true }
        );
        if (!product) return res.status(400).send("Product already exists");

        // 4. updat product
        res.status(200).send(product)

    } catch (error) {
        res.status(400).send(error)
    }
});
        

// delete
router.delete("/:id" , auth , async(req,res) => {
    try {
        // 1. check if user is admin 
        if (!req.payload.isAdmin)
        return res.status(400).send("You do not have permission to delete")

        // 2. find and delete product
        let product = await Product.findByIdAndDelete({
            _id: req.params.id
        })
        if (!product) return res.status(404).send("No such product");
        res.status(200).send("product deleted");

    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;