const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/api', require('./routes/products.js'));

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`);
});

server.on('error', err => console.log(`error: ${err}`));