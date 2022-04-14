const auth=require("../authorization/auth")

const express=require("express")
const {  orders, orders_By_Id, inCustomer, orders_shortDetail_id } = require("../controller/orders")
const { verifyToken } = require("../controller/customer")
const router=require("express").Router()


router.post('/orders', verifyToken,orders)
router.get('/orders/:order_id', verifyToken,orders_By_Id)
router.get('/orders/inCustomer/:order_id', verifyToken,inCustomer);
router.get('/orders/shortDetail/:order_id', verifyToken,orders_shortDetail_id);


module.exports=router
