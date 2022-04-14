const knex=require("../model/db")
const express=require("express")
const { query } = require("express");
const bodyParser=require('body-parser');
const { JSONCookie } = require("cookie-parser");
const jwt=require("jsonwebtoken")
var app = express();
app.use(express.json());
app.use(bodyParser.json());


//get all data of product
const product=(req,res)=>{
    knex.select("*").from("product")
    .then((result)=>{
        console.log(result)
        if(req.query.page==undefined){
            req.query.page
        }
        if(req.query.limit==undefined){
            req.query.limit=20
        }
        knex('product').count('product_id')
        .then((count)=>{
            knex.select("*").from('product').offset((req.query.page-1)*req.query.limit).limit(req.query.limit)
            .then((data)=>{
                for(i in data){
                    if (req.query.description_length != undefined) {
                        data[i]["description"] = data[i]["description"].slice(0, data[i]["description"].length - (data[i]["description"].length - req.query.description_length))
                    } else {
                        data[i]["description"] = data[i]["description"]
                    }
                }
                res.send({
                    count: count[0]['count(`product_id`)'],
                    rows: data
                })
            })
            .catch((err) => {
                res.send(err)
            })
    })
})
.catch((err) => {
res.send(err)
})
}

 



// Search Product


const searchProduct= (req, res) => {
    var query = []
    var result2 = []
    knex.select("*").from("product").
    then((result) => {

            if (req.query.page == undefined) {
                req.query.page = 1
            }
            if (req.query.limit == undefined) {
                req.query.limit = 0                                                        //OFset is use for the set the limit  in program
            }
            knex.select("*").from("product").offset((req.query.page - 1) * req.query.limit).limit(req.query.limit).
            then((data) => {
                    if (req.query.query_string != undefined) {
                        for (i in data) {
                            if (req.query.query_string.includes(data[i]["description"]) == true) {
                                query.push(data[i])
                            } else {
                                query.push(data[i])
                            }
                        }
                        for (j in query) {
                            if (req.query.description_length != undefined) {
                                query[j]["description"] = query[j]["description"].slice(0, query[j]["description"].length - (query[j]["description"].length - req.query.description_length)) + ".."
                                result2.push(query[j])
                            } else {
                                query[j]["description"] = query[j]["description"]
                                result2.push(query[j])
                            }

                        }
                        res.send({count:req.query.limit,
                                row:result2})
                    } else {
                        res.send("query is not there")
                    }
                })
                .catch((err) => {
                    res.send(err)
                })
        })
        .catch((err) => {
            res.send(err)
        })
}


//get data by product_id

const products_by_product_id = (req, res) => {
    knex.select('*').from('product').where('product_id', req.params.product_id)
        .then((get_productById) => {
            res.json({
                sussce: true,
                status: 201,
                message: 'Get Product By Product Id ',
                product: get_productById
            })
        }).catch((err) => {
            console.log(err)
            res.json({
                succes: false,
                status: 405,
                message: 'error something is wrong',
            })

        })
}


//get data of product by category id we have to join two column caterory id and product id
const product_category_id=(req,res)=>{
    var desc=req.description_length;
    knex.select("product.product_id",'product.name','product.description','product.discounted_price','product.thumbnail').from('product')
    .join('product_category',function(){
        this.on('product.product_id','product_category.product_id')
    }).where('product_category.category_id',req.params.category_id).limit(req.query.limit).offset((req.query.page-1)*req.query.limit)
    .then((data)=>{
        for (i in data){
            if(req.query.description_length !=undefined){
                data[i]['description'] = data[i]['description'].slice(0,data[i]['description'].length -(data[i]['description'].length -req.query.description_length))
                                            //slice() method returns the selected element(s) in an array, as a new array object
            }else{
                data[i]['description'] =data[i]['description']
            }
        }
        res.send({
            count:18,
            rows:data

        })
    })
}


//get data of product with using department id
const product_departmentId = (req, res) => {
    knex.select("product.product_id", "product.name", "product.description", "product.price", "product.discounted_price", "product.thumbnail").from("product").join("product_category", "product_category.product_id", "=", "product.product_id").
    join("category", "category.category_id", "=", "product_category.category_id")
        .where("department_id", req.params.department_id).limit(req.query.limit).offset((req.query.page - 1) * req.query.limit)
        .then((data) => {
            for (i in data) {
                if (req.query.description_length != undefined) {
                    data[i]["description"] = data[i]["description"].slice(0, data[i]["description"].length - (data[i]["description"].length - req.query.description_length))
                } else {
                    data[i]["description"] = data[i]["description"]
                }
            }
            res.send({
                count: 16,
                rows: data
            })
        })
}


//get data by product_id
const productDetails_byId = (req, res) => {
    knex.select('product_id', 'name', 'description', 'price', 'discounted_price', 'image', 'image_2').from('product')
        .where('product_id', req.params.product_id)
        .then((detali) => {
            res.json({
                sussce: true,
                status: 201,
                message: 'Product Detalis ',
                detali: detali
            })

        }).catch((err) => {
            console.log(err)
            res.json({
                succes: false,
                status: 400,
                message: 'error something is wrong',
            })

        })
}





//get location data by product id
const getLocations_join_ByproductId = (req, res) => {
    knex.select("*").from("product_category").where({ product_id: req.params.product_id }).
    then((result) => {
            knex.select("*").from("category").where({ category_id: result[0]["category_id"] }).
            then((data) => {
                    knex.select("*").from("department").where({ department_id: data[0]["department_id"] }).
                    then((data2) => {
                            data[0]["department_name"] = data2[0]["name"]
                            data[0]["department_id"] = data2[0]["department_id"]
                            delete data[0]["description"]
                            res.send(data)
                        })
                        .catch((err) => {
                            res.send(err)
                        })
                })
                .catch((err) => {
                    res.send(err)
                })
        })
        .catch((err) => {
            res.send(err);
        });
};


//post a post review 
const products_post_review = (req, res) => {
    
    if (!req.body.product_id || !req.body.review || !req.body.rating) {
        res.json({
            status: 400,
            message: 'Failed '
        })
    } else {
        const giveReview = {
            customer_id:req.body.customer_id,
            product_id: req.body.product_id,
            review: req.body.review,
            rating: req.body.rating,
            created_on: new Date()
        }
        knex('review').insert(giveReview)
            .then((data) => {
                knex.select('*').from('review').where('review_id', data)
                    .then(() => {
                        res.send("post success")
                        res.status(200)
                    }).catch(() => {
                        res.json({
                            succes: false,
                            message: 'Productid Not Exits'
                        })
                    })
            })
                    
    }

}

//get review
const products_by_review = (req, res) => {
    knexcon("review").select('*').
    join("customer", "customer.customer_id", "=", "review.customer_id").
    where({ product_id: req.params.product_id }).
    then((result) => {
            res.send(result);
        })
        .catch((err) => {
            res.send(err);
        });
}




module.exports={product,
    products_by_product_id,
    searchProduct,
    product_category_id,
    product_departmentId,
    productDetails_byId,
    getLocations_join_ByproductId,
    products_post_review,
    products_by_review}