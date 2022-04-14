const knex=require("../model/db")


//get attributeid all data
const attribute_id=(req,res)=>{
    knex.select("*").from("attribute")
    .then((data)=>{
        res.send({
            success:true,
            status:200,
            all_data:data

        })
    }).catch((err)=>{
        res.send({request:falied,
               status:300,
            data:"data not found" })
    })

}

//data get by id
const  attribute_by_id=(req,res)=>{
    knex.select("*").from("attribute").where("attribute_id","=",req.params.attribute_id)
    .then((data)=>{
        res.send({success:true,
                status:200,
            id_data:data})
    }).catch((err)=>{
        res.send({
            error:err,
            data:"some problems are there"
        })
    })
}


//join two column attribute_value and atrribute id
const join_attribut_attributeValue=(req,res)=>{
    knex('attribute_value')
    .select('attribute_value.attribute_value_id','attribute_value.value')
    .join('attribute','attribute_value.attribute_value_id','=','attribute.attribute_id')
    .where('attribute.attribute_id',req.params.attribute_id)
    .then((attvalue)=>{
        res.json({
            data:attvalue
        })
    }).catch((err)=>{
        res.send({message:"error data not found"})
    })
}


// find attribute by product_id
const attribute_by_product_id = (req,res)=>{
    knex('attribute')
    .select('attribute.name','product_attribute.attribute_value_id','attribute_value.value')
    .join("attribute_value", "attribute.attribute_id", "=", "attribute_value.attribute_id")
    .join("product_attribute", "attribute_value.attribute_value_id", "=", "product_attribute.attribute_value_id")
    .where('product_attribute.product_id',req.params.product_id)
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.send(err)
    })
}






module.exports={attribute_id,
    attribute_by_id,
    join_attribut_attributeValue,
    attribute_by_product_id}