const express=require("express")
const { get__category, get_by_category_id, category_product_id, join_category_department } = require("../controller/categories")
const app=express()
const router=require('express').Router()


router.get("/category",get__category)
router.get("/category_id/:category_id",get_by_category_id)

// //for join the category and product id
router.get("/product_id/:product_id",category_product_id)

// //for join the category and department id
router.get("/category_department_id/:department_id",join_category_department)




module.exports=router