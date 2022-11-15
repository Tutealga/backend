const router = require('express').Router();

const products = [];
let counter = 0;

const productById = (id) => {
    return products.find(item => item.id === id);
}

const indexById = (id) => {
    return products.findIndex(item => item.id === id);
}

const checkId = (req, res, next) => {
    const { id } = req.params;

    if(!id){
        res.status(400).json({ error : 'Falta ingresar el id.'});
    } else if (isNaN(parseInt(id))) {
        res.status(400).json({ error : "El id ingresado no es un número."});
    }

    next();
}

const checkProduct = (req, res, next) => {
    const { title, price, thumbnail } = req.body;

    if(!title){
        res.status(400).json({ error : 'Falta ingresar el título del producto.'});
    }
    if(!price){
        res.status(400).json({ error : 'Falta ingresar el precio del producto.'});
    }
    if(!thumbnail){
        res.status(400).json({ error : 'Falta ingresar el thumbnail del producto.'});
    }

    next();
}

router.get('/', (req, res) => {
    if (products.length === 0) {
        res.status(200).json({ error : 'El listado de productos esta vacío.'});
    } else {
        res.status(200).json(productos);
    }
});

router.get('/:id', checkId, (req, res) => {
    const id = parseInt(req.params.id);
    if (id < 1 || id > counter) {
        res.status(400).json({ error : "No existe producto con el id indicado."});
    } else {
        const position = indexById(id);
        if (position !== -1) {
            console.log(productById(id), position);
            res.status(200).json(productById(id));
        } else {
            res.status(200).json({ error : "El producto no fue encontrado."});
        }
    }
});

router.post('/', checkProduct, (req, res) => {
    const { title, price, thumbnail } = req.body;
    counter += 1;
    const product = {
        "id": counter,
        "title": title,
        "price": price,
        "thumbnail": thumbnail
    };
    products.push(product);
    res.status(200).json(product);
});

router.put('/:id', checkId, checkProduct, (req, res) => {
    const id = parseInt(req.params.id);
    const { title, price, thumbnail } = req.body;

    position = indexById(id);

    if (position === -1) {
        res.status(200).json({ error : "El producto no fue encontrado."});
    } else {
        const product = products[position];
        const productUpd = 
        {   
            "id": product.id,
            "titulo": title,
            "precio": price,
            "thumbnail": thumbnail
        };
        products[position] = productUpd;
        res.status(200).json(productUpd);
    }
});

router.delete('/:id', checkId, (req, res) => {
    const id = parseInt(req.params.id);
    if (id < 1 || id > counter) {
        res.status(400).json({"error": "El id no pertenece a ningún producto existente."});
    } else {
        const position = indexById(id);
        if (position !== -1) {
            const product = productById(id);
            products.splice(position, 1);
            products.forEach(prod => {if (prod.id >= id) {prod.id -= 1;}});
            counter -= 1;
            res.status(200).json(product);
        } else {
            res.status(200).json({ error : "El producto no fue encontrado."});
        }
    }
});

module.exports = router;