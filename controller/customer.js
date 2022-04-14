const knex=require('../model/db')
const jwt=require('jsonwebtoken')
const cookie=require('cookie-parser')
const bodyParser = require("body-parser")
const express=require("express")
const auth=require("../authorization/auth")
var app = express();
app.use(express.json());
app.use(bodyParser.json());



const signup_customer=(req,res)=>{
    if(!req.body.name || !req.body.email || !req.body.password){
        res.json({
            succes:false,
            status:406,
            message:'Failed All filed Required'
        })
    }else{
            const users={
                name:req.body.name,
                email:req.body.email,
                password:req.body.password}
                knex('customer').insert(users)
                .then((data)=>{
                    console.log(data)
                    knex.select('*').from('customer').where('customer_id ',data)
                    .then((insertdata)=>{
                        res.json({
                            succes:true,
                            status:200,
                            message:'You are register sussesfully',
                            users:insertdata})
                    }).catch((err)=>{
                        res.send({
                            error: 'Invalid details!'})
                    })
                            
                }).catch((err)=>{
                    console.log(err)
                    res.json({
                        succes:false,
                        status:400,
                        message:'Email id already exits',
                        err:err
                    })
                })
            }
}


const customersLogin=(req,res)=>{
    if(!req.body.email || !req.body.password){
        res.status(401).json({
            succes: false,
            message: 'Failed Required Both Fild'})
    }else{
        knex.select('*').from('customer').where('email','=',req.body.email,'password','=',req.body.password)
        .then((data)=>{
            if(data.length<1){
                res.status(400).json({
                    message:'Email Faild'
                })
            }else{
                var token = jwt.sign({customer_id: data[0].customer_id}, 'Key', {expiresIn: '6h'})
                console.log(token)
                res.cookie("jwt",token)
                res.json({
                    succes:true,
                    status:200,
                    message:'You are login sussesfully',
                    users:data,
                    token:token})
            }      
    
        }).catch((err)=>{
            res.json({
                succes:false,
                status:400,
                message:'Auth error',
            })
    
        })

    }
   
}



// Get users details by customers id

const getCustomersById=(req,res)=>{
    knex.select('*').from('customer').where('customer_id',req.params.customer_id)
    .then((getdata)=>{
        console.log(getdata)
        res.json({
            succes:true,
            status:200,
            message:'Customer Details by customer id',
            users:getdata,
            })

    }).catch((err)=>{
        console.log(err)
        res.json({
            succes:false,
            status:400,
            message:'Invalid Id'
        })
    })
}

const customers_put=(req,res)=>{
    user=req.userdata
    console.log(user)
    knex.from("customer").where({email:user.email}).update(
        {
            "name":req.body.name,
            "email":req.body.email,
            "password":req.body.password
            ,"day_phone":req.body.day_phone
            ,"eve_phone":req.body.eve_phone
            ,"mob_phone":req.body.mob_phone
        })
        .then((result)=>{
            res.send("data updated")
        })
        .catch((err)=>{
            res.send(err)
        })
   

}

const put_customer_address=(req,res)=>{
    add_token=req.userdata
    console.log(add_token)
    knex.from("customer").where({email:add_token.email}).update(
        {
            "address_1":req.body.address_1,
            "address_2":req.body.address_2,
            "city":req.body.city,
            "region ":req.body.region ,
            "postal_code":req.body.postal_code,
            "country":req.body.country,
            "shipping_region_id":req.body.shipping_region_id
        })
        .then((result)=>{
            res.send("data update")
        })
        .catch((err)=>{
            res.send(err)
        })
    
}




const verifyToken=(req,res,next)=>{
    // console.log(req.cookies.jwt)
    try{
        var token=req.cookies.jwt
        console.log(token)
        var decode =jwt.verify(token,'Key')
        req.userdata=decode
        console.log(decode)
        next()
    }catch(err){
        console.log(err)
        res.send ({message:'invalid token'})
    }
}







module.exports={signup_customer,
    customersLogin,
    getCustomersById,
    verifyToken,
    customers_put,
put_customer_address,

}