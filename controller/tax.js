const knex=require("../model/db")

const get_tax=(req,res)=>{
    knex("*").from('tax')
    .then((data)=>{
        res.json({
            succes:true,
            status:201,
            message:"all data by product_id",
            data:data
        })
    }).catch((err)=>{
        console.log(err)
        res.json({
            succes:false,
            status:406,
            message:"wait somthing is worng"
        })
    })
}


const tax_get_by_id=(req,res)=>{
    knex.select("*").from('tax').where("tax_id","=",req.params.tax_id)
    .then((data)=>{
        res.json({
            success:true,
            status:200,
            message:"data get by id successfully",
            data:data
        })
    })
    .catch((err)=>{
        console.log(err)
        res.json({
            message:"error"
        })
    })
}


module.exports={get_tax,tax_get_by_id}