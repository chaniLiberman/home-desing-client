const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const joi = require("joi");
const _=require("lodash");
const router = express.Router();

const userJoiSchema = joi.object({
    firstName: joi.string().required().min(2) ,
    lastName: joi.string().required().min(2),
    phone: joi.string().required().min(9),
    password: joi.string().required().min(8),
    email: joi.string().required().email(),
    city: joi.string().required().min(2),
    street: joi.string().required().min(2),
    houseNumber: joi.number().required().min(2),
    isAdmin: joi.boolean().allow(''),
    favorites: joi.array()
})

// get user by user - id
router.get("/:userId" ,auth, async(req,res) => {
    try {
       const user = await User.findById(req.params.userId).populate('favorites')
       res.status(200).send(user) 
    } catch (error) {
       res.status(400).send(error) 
    }
});

// add product to array favorite
router.put("/:userId/:productId" , auth, async(req,res) => {
    try {
       const user = await User.findById(req.params.userId)
       const existingIdx = user.favorites.findIndex(product => product.toString() == req.params.productId)
       if(existingIdx === -1) {
          user.favorites = [...user.favorites, req.params.productId]
       } else {
          let products = [...user.favorites]
          products.splice(products.findIndex(x => x == req.params.productId), 1)
          user.favorites = products
       }
       let updatedUser = await user.save()
       updatedUser = await User.findById(req.params.userId).populate("favorites")
       res.status(200).send(updatedUser) 
    } catch (error) {
       res.status(400).send(error)
    }
 });

module.exports = router;