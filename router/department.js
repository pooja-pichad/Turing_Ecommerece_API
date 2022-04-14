const express=require("express")

const { department, get_by_id } = require("../controller/department")
const app=express()

//for departments

const router=require('express').Router()
router.get("/department",department)
router.get("/get_by_id/:department_id",get_by_id)



module.exports = router