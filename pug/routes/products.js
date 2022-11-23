const router = require('express').Router();

const products = [];

router.get('/', (req,res) => res.render('form'));

router.get('/productos', (req, res) => res.render('products', { products }));

router.post('/productos', (req, res) => {
    const { title, price, thumbnail } = req.body;
    const product = {
        "title": title,
        "price": price,
        "thumbnail": thumbnail
    };
    products.push(product);
    res.render('form');
});

module.exports = router;