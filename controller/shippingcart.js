const knex=require("../model/db")
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require('crypto');//  crypto:-This is used for security purpose like user authentication where storing 
                                    //the password in Database in the encrypted form
var app = express();
app.use(express.json());
app.use(bodyParser.json());

const shpping_uniqueId = (req, res) => {     //this is for unqie id
    const generateUuid = () => {
        return [4, 2, 2, 2, 6]
            .map(group => crypto.randomBytes(group).toString('hex'))
            .join('-');
    };
    cart_id = generateUuid();
    res.send({ cart_id: cart_id });
};

const shoppingcart_add = (req, res) => {
    const addProductCar = {
        cart_id: req.body.cart_id,
        product_id: req.body.product_id,
        attributes: req.body.attributes,
        quantity: 1,
        added_on: new Date()    //creates a new Date object that you can modify or 
                                    //initialize with a different date 
    }
    console.log(addProductCar);
    knex('shopping_cart').insert(addProductCar)
        .join('product', 'shopping_cart.product_id', 'product.product_id')
        .then((addCartProduct) => {
            knex.select('*').from('shopping_cart').where('item_id', addCartProduct)
                .then((postData) => {
                    res.json({
                        succes: true,
                        message: 'Add a Product in the cart succesfully!',
                        AddCart: postData
                    })
                }).catch((err) => {
                    res.send({
                        error: err
                    })
                })

        }).catch((err) => {
            console.log(err)
            res.json({
                error: 'addCard failed'
            })
        })


}
//get all shopping data

const get_shopping = (req, res) => {
    knex('shopping_cart')
        .select('*')
        .then((data) => {
            res.json({
                message: 'Products in shopping cart',
                data: data
            })
        }).catch((err) => {
            console.log(err)
            res.json({
                error: 'Inavlid cart id'
            })
        })
}

//get shopping by cart id 
const get_shoppingBycart_id = (req, res) => {
    knex.select("*").from("shopping_cart").join("product", function() {
            this.on("product.product_id", "shopping_cart.product_id")
        }).where("cart_id", req.params.cart_id)
        .then((resp) => {
            if (resp.length > 0) {
                resp[0]["subtotal"] = resp[0].quantity * resp[0].price
                res.send([{
                    "item_id": resp[0].item_id,
                    "product_id": resp[0].product_id,
                    "attributes": resp[0].attributes,
                    "quantity": resp[0].quantity,
                    "name": resp[0].name,
                    "price": resp[0].price,
                    "image": resp[0].image,
                    "subtotal": resp[0].subtotal
                }])
            } else {
                res.send([{
                    "code": "USR_02",
                    "message": "The field example is empty.",
                    "field": "example",
                    "status": "500"
                }])
            }
        })
}

//update the shopping cart by item id
const updateCartByItem = (req, res) => {
    knex('shopping_cart').where('item_id', req.params.item_id).update({
            quantity: req.body.quantity
        })
        .then((data) => {
            knex.select('*').from('shopping_cart').where('item_id', req.params.item_id)
                .then((quantity) => {
                    if (quantity.length === 0) {
                        res.send({
                            message: 'You dont have item'
                        })
                    } else {
                        res.json({
                            succes: true,
                            message: 'Update the cart by item',
                            UpdateCart_byItem: quantity
                        })
                    }
                }).catch((err) => {
                    res.json({
                        message: 'Update the cart by item failed'
                    })
                })
        }).catch((err) => {
            res.json({
                message: 'Not Found Item Id'
            })
        })

}

//delete the data by item id
const Empty_cart = (req, res) => {
    knex.delete('*').from('shopping_cart').where('cart_id', '=', req.params.cart_id)
        .then((data) => {
            console.log('data',
                data)
            knex.select('*').from('shopping_cart').where('item_id', data)
                .then((EmptyCart) => {
                    console.log(EmptyCart)
                    res.json({
                        Empty_cart: `Deleted sueccesfully`,

                    })

                }).catch((err) => {
                    res.json({
                        message: 'Invaild Cart Id'
                    })
                })
        }).catch((err) => {
            res.json({
                error: err
            })
        })

}
//move to cart with item id
const shoppingcart_move = (req, res) => {
    knex.select("*").from("shopping_cart").where({ item_id: req.params.item_id }).
    then((result) => {
            knex("move_cart").insert([{
                    item_id: result[0]["item_id"],
                    cart_id: result[0]["cart_id"],
                    product_id: result[0]["product_id"],
                    attributes: result[0]["attributes"],
                    quantity: result[0]["quantity"],
                    buy_now: result[0]["buy_now"]
                }])
                .then(() => {
                    knexcon.select("*").from("shopping_cart").where({ item_id: req.params.item_id }).
                    del().
                    then((data) => {
                        res.send("No data");
                    });
                })
                .catch((err) => {
                    res.send(err);
                });
        })
        .catch((err) => {
            res.send(err);
        });
};
//give to total amount in shopping cart
const shoppingcart_totalAmount= (req, res) => {
    knex('shopping_cart')
        .join('product', 'shopping_cart.product_id', 'product.product_id')
        .select('*').where('cart_id', req.params.cart_id)
        .then((data) => {
            sum = 0
            for (i of data) {
                sum += i.price * i.quantity
            }
            res.send({
                Total_Amount: sum
            })

        }).catch((err) => {
            console.log(err)
        })

}
//delete the product using item id
const remove_product_IntheCart = (req, res) => {
    knex.delete('*').from('shopping_cart').where('item_id', '=', req.params.item_id)
        .then((data) => {
            knex.select('*').from('shopping_cart').where('item_id', data)
                .then((deleteProduct) => {
                    console.log(deleteProduct);
                    res.json({
                        del_product: 'Product Deteled By Item Id Succesfully',
                    })

                }).catch((err) => {
                    res.json({
                        message: err
                    })
                })
        }).catch((err) => {
            res.json({
                message: err
            })
        })
}


module.exports={ shpping_uniqueId,
    shoppingcart_add,
    get_shopping,
    get_shoppingBycart_id,
    updateCartByItem,
    Empty_cart,
    shoppingcart_move,
shoppingcart_totalAmount,
remove_product_IntheCart}