const knex=require('../model/db')
const jwt=require('jsonwebtoken')
const cookie=require('cookie-parser')
const bodyParser = require("body-parser")
const express=require("express")
const auth=require("../authorization/auth")
var app = express();
app.use(express.json());
app.use(bodyParser.json());


const customers_signup = (req, res) => {
    const user = req.body;
        knex("customer").insert({
                name:user.name,
                email: user.email,
                password: user.password
            })
            .then((result) => {
                console.log(result)
                res.send({ sucess: "signup sucessfully" })
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                    res.status(400).send({ error: err })
                }
            })
}


const customers_login = (req, res) => {
    const user = req.body;
    knex.from("customer").select("*").where("email", user.email)
        .then((data) => {
            if (data.length !== 0) {
                var email = req.body.email;
                var password = req.body.password;
                var log_token = jwt.sign({ email, password }, "customer", {
                    expiresIn: "2h"
                });
                res.send({
                    data,
                    access_token:log_token
                });
            } else {
                res.status(400).json({
                    message: "failed"
                });
            }
        })
}


// const put_customers=(req,res)=>{
//     user=req.data
//     console.log(user)
//     knex.from("customer").where({"customer_id","=",}).update(
//         {
//             "name":req.body.name,
//             "email":req.body.email,
//             "password":req.body.password
//             ,"day_phone":req.body.day_phone
//             ,"eve_phone":req.body.eve_phone
//             ,"mob_phone":req.body.mob_phone
//         })
//         .then((result)=>{
//             res.send("data updated")
//         })
//         .catch((err)=>{
//             res.send(err)
//         })
   

// }

const put_customers=(req,res)=>{
    knex('customer').where("customer_id","=",req.params.customer_id).update({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        day_phone:req.body.day_phone,
        eve_phone:req.body.eve_phone,
        mob_phone:req.body.mob_phone

    })
    // knex.select('*').from('customer')
    .then((updatedData)=>{
        knex.select('*').from('customer').where('customer_id',updatedData)
            .then((updateCustomer)=>{
                console.log(updateCustomer)
                res.json({
                    succes:true,
                    status:200,
                    message:'Your are updated succesfully',
                    updated_data:updateCustomer
                })

            }).catch((err)=>{
                res.send({message:'Auth error'})
            })
        
    }).catch((err)=>{
        console.log(err)
        res.json({
            succes:false,
            status:400,
            message:'Updated Faild '
        })

    })
    
}

const updateAddress=(req,res)=>{
    knex.from('customer').where('customer_id',req.params.customer_id).update({
        address_1:req.body.address_1,
        address_2:req.body.address_2,
        city:req.body.city,
        region:req.body.region,
        postal_code:req.body.postal_code,
        country:req.body.country,
        shipping_region_id:req.body.shipping_region_id
    }).then((data)=>{
        knex.select('*').from('customer').where('customer_id',data)
            .then((update)=>{
                if(update.length===0){
                    res.json({message:'User not exit'})
                }else{
                    res.json({
                        succes:true,
                        status:200,
                        message:'Address Updated Succesfully!',
                        Updated_Address:update
                    })
                    
                }
                
            }).catch((err)=>{
                console.log(err)
                res.json({
                    succes:false,
                    status:400,
                    message:'Something Went Wrong'
                })

    }).catch((err)=>{
        res.status(406).json({
            message:'User not exit!'
        })
    })
       
})


}




module.exports={customers_signup,customers_login,put_customers,updateAddress}