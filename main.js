const fs = require('fs');

const Contenedor = require('./container.js');

const express = require('express');

const productsTable = (products) => {
    let productsTable = ``;
  
 products.forEach(product => {
   productsTable = productsTable + 
        `<div style="max-width: 200px; border-radius: .25rem; border:1px solid black">
  <img style="width: 200px; height: 200px; border-top-right-radius:.25rem; border-top-left-radius:.25rem" src="${product.thumbnail}" alt="${product.title}">
  <div style="padding:1rem; text-align:center">
    <h3>${product.title}</h3>
    <p>$${product.price}</p>
  </div>
</div>`
    });

    return productsTable;
}

const productTable = (product) => {
    const productTable = 
    `<div style="max-width: 200px; border-radius: .25rem; border:1px solid black">
  <img style="width: 200px; height: 200px; border-top-right-radius:.25rem; border-top-left-radius:.25rem" src="${product.thumbnail}" alt="${product.title}">
  <div style="padding:1rem; text-align:center">
    <h3>${product.title}</h3>
    <p>$${product.price}</p>
  </div>
</div>`
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
    res.send('<button><a href="/">Volver</a></button>' + `<div style="display:flex; gap:1rem"> ${prodTable} </div>`);
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
