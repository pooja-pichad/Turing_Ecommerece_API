const knex=require("../model/db")


// get all data category_id
const get__category=(req,res)=>{
    knex.select("*").from("category")
    .then((category)=>{
        console.log(category)
        res.send({category})

    }).catch((err)=>{
        console.log(err)
        res.send({err:err})
    })
}

//get data by category _id
const get_by_category_id=(req,res)=>{
    knex.select("*").from("category").where("category_id","=",req.params.category_id)
    .then((categoryid)=>{
        console.log(categoryid)
        res.send({categoryid})
    }).catch((err)=>{
        console.log(err)
        res.send({ERR:err})
    })
}


//join two column category id and product id
const category_product_id=(req,res)=>{
    knex("category").select('category.category_id',"category.department_id",'category.name')
    .join('product_category','category.category_id',"=",'product_category.category_id')
    .where('product_category.product_id',req.params.product_id)
    .then((data)=>{
        console.log(data)
        res.send(
            {succes: true,
                status: 200,
                message: 'categories datas',
                All_categories: data}
        )
    })
    .catch((err)=>{
        console.log(err)
        res.send(err)
    })
}


//join category id and department id
const join_category_department=(req,res)=>{
    knex("category").select('category.category_id','category.name','category.description','department.department_id')
    .join('department','category.category_id','=','department.department_id')
    .where('department.department_id',req.params.department_id)
    .then((data)=>{
        res.send({succes:true,
        satuts:200,
        message:"department data",
        All_categories:data})

    }).catch((err)=>{
        res.send({error:err})
    })
}





module.exports={get__category,
    get_by_category_id,
    category_product_id,
    join_category_department}




