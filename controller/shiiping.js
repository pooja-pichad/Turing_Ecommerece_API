const knex=require('../model/db')

const get_shipping=(req,res)=>{
    knex.select("*").from('shipping')
    .then((data)=>{
        res.json({
            data:data
        })
    }).catch((err)=>{
        res.json({
            data:err
        })
    })
}

const shipping_get_by_id=(req,res)=>{
    knex.select("*").from('shipping').where('shipping_region_id',req.params.shipping_region_id)
    .then((shippingdata)=>{
        res.json({
            data:shippingdata,
            message:"get shipping data by id"
        })
    }).catch((err)=>{
        res.json({
            message:"error"
        })
    })
}

module.exports={get_shipping,shipping_get_by_id}