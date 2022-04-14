const express=require("express")
const { get_tax, tax_get_by_id } = require("../controller/tax")
const router=require("express").Router()

router.get("/tax",get_tax)
router.get("/tax/:tax_id",tax_get_by_id)
module.exports=router