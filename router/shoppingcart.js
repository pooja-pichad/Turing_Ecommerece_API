const { shpping_uniqueId, shoppingcart_add, get_shopping, get_shoppingBycart_id, updateCartByItem, Empty_cart, shoppingcart_move, shoppingcart_totalAmount, remove_product_IntheCart } = require('../controller/shippingcart');

const router = require('express').Router()
// shopping_cart = require('../Controller/shopping_cart')


router.get('/shppingcart/genrateUniqueId', shpping_uniqueId);
router.post('/shoppingcart/add', shoppingcart_add);
router.get('/shoppingcart', get_shopping)
router.get('/shoppingcart/:cart_id',get_shoppingBycart_id)
router.put('/shoppingcart/update/:item_id',updateCartByItem)

router.delete('/shoppingcart/empty/:cart_id', Empty_cart)
router.get('/shoppingcart/moveToCart/:item_id', shoppingcart_move);
router.get('/shoppingcart/totalAmount/:cart_id', shoppingcart_totalAmount);

router.delete('/shoppingcart/removeProduct/:item_id', remove_product_IntheCart)





module.exports=router