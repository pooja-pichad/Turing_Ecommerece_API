const express=require("express")
const auth = require("../authorization/auth")
const {  signup_customer, customersLogin, getCustomersById, verifyToken, customers_put, put_customer_address, put_credit_card } = require("../controller/customer")

const app=express()
const router=require('express').Router()

router.post("/customers",signup_customer)
router.post('/customersLogin',customersLogin)
router.get('/getbyid/:customer_id',getCustomersById)
router.put("/put_customer/:customer_id",verifyToken,customers_put)
router.put("/put_adress/:customer_id",verifyToken,put_customer_address)
// router.put('/put_credit/:credit_card',put_credit_card)
module.exports=router
