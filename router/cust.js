const express=require("express")
const auth = require("../authorization/auth")
const { customers_signup, customers_login, put_customers, updateAddress } = require("../controller/custo")
// const {  } = require("../controller/customer")

const router=require('express').Router()
router.post("/customers_signup",customers_signup)
router.post("/customers_login",customers_login)

router.put("/put_customers/:customer_id",put_customers)
router.put("/upadte_adreess/:customer_id",updateAddress)


module.exports=router

