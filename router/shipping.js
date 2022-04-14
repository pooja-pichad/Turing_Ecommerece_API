const { get_shipping, shipping_get_by_id } = require("../controller/shiiping")

const router=require("express").Router()


router.get("/shipping",get_shipping)
router.get("/shipping/:shipping_region_id",shipping_get_by_id)
module.exports=router