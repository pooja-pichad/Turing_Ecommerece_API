const express=require('express')
const { product, products_by_product_id, searchProduct, product_category_id, product_departmentId, productDetails_byId, getLocations_join_ByproductId, products_post_review, products_by_review } = require('../controller/product')
const router=express.Router()

const auth=require("../authorization/auth")
router.get('/product',product)
router.get('/product/:product_id',products_by_product_id)
router.get('/products/search',searchProduct)
router.get('/products/inCategory/:category_id',product_category_id)
router.get("/products/inDepartment/:department_id",product_departmentId)
router.get('/products/details/:product_id', productDetails_byId)
router.get('/products/locations/:product_id', getLocations_join_ByproductId)
router.post('/products/:product_id/reviews', products_post_review)
router.get('/products/:product_id/reviews',  products_by_review)




module.exports=router