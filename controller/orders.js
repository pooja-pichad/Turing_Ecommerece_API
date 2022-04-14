const knex=require("../model/db")

// create an order
const orders=(req,res)=>{
    knex.select('*').from('shopping_cart')
    .where('cart_id',req.body.cart_id)
    .join("product",function(){
        this.on('shopping_cart.product_id','product.product_id')
    })
    .then((data)=>{
        console.log(data)
        const order={
            total_amount:data[0].quantity*data[0].price,
            created_on:new Date(),
            customer_id:req.userdata.customer_id,
            shipping_id:req.body.shipping_id,
            tax_id:req.body.tax_id
        }
        res.send({message:"post"})
        console.log(order)
        knex('orders').insert(order)
        .then((insertdata)=>{
                // console.log(insertdata)
                knex('shopping_cart').where('cart_id',req.body.cart_id).del()
                    .then(()=>{
                        res.send({"order_id":insertdata[0]})

                        }).catch((err)=>{
                            res.send({message:"insertdata is not deleted"})   
                        })

        }).catch((err)=>{
            res.send(err)   
            })
        
        }).catch((err)=>{
            res.send(err)
        })
    
    }


const orders_By_Id = (req, res) => {
        token = req.userdata
        knex.select("*").from("customer").where({ customer_id: token.customer_id }).
        then((data) => {
                knexcon.select("*").from("order_detail").where({ order_id: req.params.order_id }).
                then((data) => {
                        res.send(data);
                    })
                    .catch((err) => {
                        res.send(err);
                    });
            })
            .catch((err) => {
                res.send(err);
            });
    };
    
    
    
const inCustomer = (req, res) => {
        token = req.userdata
        knex('orders')
            .join('customer', 'orders.customer_id', 'customer.customer_id')
            .select('orders.order_id', 'orders.total_amount', 'orders.created_on', 'orders.shipped_on', 'orders.status', 'customer.name').where('customer.customer_id', '=', token.customer_id)
            .then((getByCustomer) => {
                res.send(
                    getByCustomer
                )
            }).catch((err) => {
                res.json({
                    message: 'data not found'
                })
            })
    
    }
    
    
const  orders_shortDetail_id = (req, res) => {
        knex.select("*")
            .from("orders")
            .join("order_detail", function() {
                this.on("orders.order_id", "order_detail.order_id")
            })
            .where("orders.order_id", req.params.order_id)
            .then((resp) => {
                res.send({
                    "order_id": resp[0].order_id,
                    "total_amount": resp[0].total_amount,
                    "created_on": resp[0].created_on,
                    "shipped_on": resp[0].shipped_on,
                    "status": resp[0].status,
                    "name": resp[0].product_name
                })
            })
    }
module.exports={orders,orders_By_Id,inCustomer,orders_shortDetail_id}