const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/', require('./routes/products.js'));

app.set('views', './views');
app.set('view engine', 'ejs');

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`);
});

server.on('error', err => console.log(`error: ${err}`));