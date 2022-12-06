const express = require('express');
const {
	addCart,
	deleteCart,
	getProducts,
	addProductToCart,
	deleteProduct
} = require('../controllers/cart.js');

const cartRouter = express.Router();

cartRouter.post('/', addCart);
cartRouter.delete('/:id', deleteCart);
cartRouter.get('/:id/productos', getProducts);
cartRouter.post('/:id/productos', addProductToCart);
cartRouter.delete('/:id/productos/:id_prod', deleteProduct);

module.exports = cartRouter;