const string = (string) => console.log(string);

class Contenedor {
    constructor(archive){
        this.archive = archive;
        this.counter = 0;
    }

    increaseCounter = () => {
        this.counter += 1;
    }

    decreaseCounter = () => {
        this.counter -= 1;
    }

    setCounter = (number) => {
        this.counter = number;
    }

    async save (object) {
       if (this.counter === 0) {
            try{
                this.increaseCounter();
                object = {id: this.counter, ...object};
                await fs.promises.writeFile(this.archive , JSON.stringify([object])); 
                return this.counter;
            } catch(err) {
                console.log(`Ha ocurrido un error: ${err.message}`);
            }
       } else {
            try{
                this.increaseCounter();
                object = {id: this.counter, ...object};
                const fileDate = JSON.parse(await fs.promises.readFile(this.archive , 'utf-8'));
                fileDate.push(object);
                await fs.promises.writeFile(this.archive , JSON.stringify(fileDate));
                return this.counter;
            } catch(err) {
                console.log(`Ha ocurrido un error: ${err.message}`);
            }
       }
       return -1;
    }

    async getById(id){
        if (id >= this.counter){
            return null;
        } else {
            try{
                const fileDate = JSON.parse(await fs.promises.readFile(this.archive , 'utf-8'));
                return fileDate[id];
            } catch(err) {
                console.log(`Ha ocurrido un error: ${err.message}`);
            }
        }
        return null;
    }

    async getAll(){
        try{
            const fileDate = JSON.parse(await fs.promises.readFile(this.archive , 'utf-8'));
            return fileDate;
        } catch(err) {
            console.log(`Ha ocurrido un error: ${err.message}`);
        }
    }

    async deleteById (id){
        if (id >= this.counter){
            console.log(`El producto con el id ${id} no existe.`);
        } else {
            try{
                const fileDate = JSON.parse(await fs.promises.readFile(this.archive , 'utf-8'));
                const fileDateEdited = fileDate.splice(id,1);
                await fs.promises.writeFile(this.archive , JSON.stringify(fileDateEdited));
                this.decreaseCounter();
                console.log(`Se ha eliminado correctamente el producto con el id ${id}.`);
            } catch(err) {
                console.log(`Ha ocurrido un error: ${err.message}`);
            }
        }
    }

    async deleteAll(){
        try{
            if(this.counter !== 0){
                await fs.promises.writeFile(this.archive , JSON.stringify([]));
                this.setCounter(0);
                string("Productos eliminados correctamente.");
            } else {
                string("Se encuentra vacio el listado de productos.");
            }
            
        } catch(err) {
            console.log(`Ha ocurrido un error: ${err.message}`);
        }   
    }

}

//Módulo fs:
const fs = require('fs');

//Contenedor:
const container = new Contenedor('./products.txt');

//Productos:
const product1 = {
    title: 'Orquidea',
    price: 1000,
    thumbnail: "https://www.cuerpomente.com/medio/2021/11/17/maceta-con-orquidea-en-un-alfeizar_9512f96a_1200x1200.jpg"
}
const product2 = {
    title: 'Jazmin',
    price: 900,
    thumbnail: "https://verdecora.es/blog/wp-content/uploads/2016/03/cultivo-jazmin.jpg.webp"
}
const product3 = {
    title: 'Tulipan',
    price: 1500,
    thumbnail: "https://images.hola.com/imagenes/decoracion/20211013197604/cultivar-tulipanes-plantas-interior-exterior-il/1-6-255/cultivar-tulipanes-02a-a.jpg"
}

//Prueba
const main = async () => {

const n = "\n";

const saveProduct = (id) => id !== -1 && console.log("El producto ha sido guardado correctamente con el siguiente id: ", id);

const errorMessage = (err) => console.log(`Error: ${err}`);
  

const getProductById = (res) => {
         res === null
         ?
         string("No se encontró el producto en el array.")
         :
         console.log(`El producto encontrado es el siguiente: \n- id: ${res.id}\n- title: ${res.title}\n- price: ${res.price}\n- thumbnail: ${res.thumbnail}`);    
}

    string("Guardar producto 1:");
    await container.save(product1)
    .then(id =>{
        saveProduct(id);
    })
    .catch(err => {
        errorMessage(err);
    });

    string(n);
    string("Guardar producto 2:");
    await container.save(product2)
    .then(id =>{
        saveProduct(id);
    })
    .catch(err => {
        errorMessage(err);
    });

    string(n);
    string("Guardar producto 3:");
    await container.save(product3)
    .then(id =>{
        saveProduct(id);
    })
    .catch(err => {
        errorMessage(err);
    });
    
string(`
=======================
OBTENER PRODUCTO POR ID
=======================
`);
    await container.getById(0)
    .then(res => {
        getProductById(res);
    })
    .catch(err => {
        errorMessage(err);
    });

    string(n);
    await container.getById(2)
    .then(res => {
        getProductById(res);
    })
    .catch(err => {
        errorMessage(err);
    });

    string(n);
    await container.getById(4)
    .then(res => {
        getProductById(res);
    })
    .catch(err => {
        errorMessage(err);
    });

string(`
========================================
OBTENER EL LISTADO COMPLETO DE PRODUCTOS
========================================
`);
    await container.getAll()
        .then(res => { 
            res.forEach(res => {
                console.log(`El producto n° ${res.id}: \n- id: ${res.id}\n- title: ${res.title}\n- price: ${res.price}\n- thumbnail: ${res.thumbnail}\n`);
            });
        })
        .catch(err => {
            errorMessage(err)
        });

string(`
========================
ELIMINAR PRODUCTO POR ID
========================
`);
    await container.deleteById(1);
    string(n);
    await container.deleteById(5);

string(`
==================
ELIMINAR PRODUCTOS
==================
`);
    await container.deleteAll();
    string(n);
    await container.deleteAll();
}

main();