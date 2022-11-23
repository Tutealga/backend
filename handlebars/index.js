const express = require("express");
const { engine } = require('express-handlebars');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/', require('./routes/products.js'));

app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`);
});

server.on('error', err => console.log(`error: ${err}`));