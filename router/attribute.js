const express=require("express")
const app=express()
const router=require("express").Router()


const { attribute_id, attribute_by_id, join_attribut_attributeValue, attribute_by_product_id } = require("../controller/attributes")
router.get("/attribute_id",attribute_id)
router.get("/attributeget_by_id/:attribute_id",attribute_by_id)

//for join attribute_value to attribute

router.get("/attributevalue/:attribute_id",join_attribut_attributeValue)
//join attribute to product id
router.get('/attribute/inProduct/:product_id',attribute_by_product_id)


module.exports=router