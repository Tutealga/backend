const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const productsRouter = require('./routes/products.js');
const cartRouter = require('./routes/cart.js');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/api/productos', productsRouter);
app.use('/api/carrito', cartRouter);

app.use('*', (req, res) => {
	const path = req.params;
	const method = req.method;
	res.send({
		error: -2,
		description: `ruta '${path[0]}' método '${method}' no implementada`
	});
});

const server = app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
server.on('error', err => console.log(err));