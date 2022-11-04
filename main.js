const fs = require('fs');

const Contenedor = require('./container.js');

const express = require('express');

const productsTable = (products) => {
    let productsTable = 
    `<table border="1" align="center" bordercolor="black" cellspacing="2">
        <caption style="padding: 20px; font-size:20px;"><B>Productos</B></caption>
        <tr bgcolor="grey" align="center">
            <th width=200>Titulo</th>
            <th width=200>Precio</th>
            <th width=200>Img</th>
        </tr>`

    products.forEach(product => {
        productsTable = productsTable +
        `<tr align="center">
            <th width=200>${product.title}</td>
            <th width=200>${product.price}</td>
            <th width=200><img src="${product.thumbnail}" alt="${product.title}" width="200" height="200"/></td>
        </tr>`
    });

    productsTable = productsTable + `</table>`

    return productsTable;
}

const productTable = (product) => {
    const productTable = 
    `<table border="1" align="center" bordercolor="black" cellspacing="2">
        <caption style="padding: 20px; font-size:20px;"><B>Producto Random</B></caption>
        <tr bgcolor="grey" align="center">
            <th width=200>Titulo</th>
            <th width=200>Precio</th>
            <th width=200>Img</th>
        </tr>
        <tr align="center">
            <th width=200>${product.title}</td>
            <th width=200>${product.price}</td>
            <th width=200><img src="${product.thumbnail}" alt="${product.title}" width="200" height="200"/></td>
        </tr>
    </table>`
    return productTable;
}

const container = new Contenedor('./products.txt');

const app = express();

app.get('/', (req,res) => {
    res.send(`
    <h1>Bienvenido al Contenedor de Productos.</h1>
    <button><a href="/productos">Productos</a></button>
    <button><a href="/productoRandom">Producto random</a></button>
    `);
});

app.get('/productos', async (req,res) => {
    const products = await container.getAll();
    let prodTable = productsTable(products);
    res.send('<button><a href="/">Volver</a></button>' + prodTable);
});

app.get('/productoRandom', async (req,res) => {
    const product = await container.getAll();
    const randomNumber = Math.floor(Math.random() * product.length);
    const prodTable = productTable(product[randomNumber]);
    res.send('<button><a href="/">Volver</a></button>' + prodTable);
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`);
});
server.on('error', err => console.log(`error: ${err}`));