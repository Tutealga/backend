const fs = require('fs');

const string = (string) => console.log(string);

class Contenedor {
    constructor(file){
        this.file = file;
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
                await fs.promises.writeFile(this.file , JSON.stringify([object])); 
                return this.counter;
            } catch(err) {
                console.log(`Ha ocurrido un error: ${err.message}`);
            }
       } else {
            try{
                this.increaseCounter();
                object = {id: this.counter, ...object};
                const fileData = JSON.parse(await fs.promises.readFile(this.file , 'utf-8'));
                fileData.push(object);
                await fs.promises.writeFile(this.file , JSON.stringify(fileData));
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
                const fileData = JSON.parse(await fs.promises.readFile(this.file , 'utf-8'));
                const product = fileData.find(products => {
                    return products.id === id;
                });
                return product;
            } catch(err) {
                console.log(`Ha ocurrido un error: ${err.message}`);
            }
        }
        return null;
    }

    async getAll(){
        try{
            const fileData = JSON.parse(await fs.promises.readFile(this.file , 'utf-8'));
            return fileData;
        } catch(err) {
            console.log(`Ha ocurrido un error: ${err.message}`);
        }
    }

    async deleteById (id){
        if (id >= this.counter){
            console.log(`El producto con el id ${id} no existe.`);
        } else {
            try{
                const fileData = JSON.parse(await fs.promises.readFile(this.file , 'utf-8'));
                const index = fileData.findIndex(product => product.id === id);
                fileData.splice(index,1);
                await fs.promises.writeFile(this.file , JSON.stringify(fileData));
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
                const fileData = JSON.parse(await fs.promises.readFile(this.file , 'utf-8'));
                const quantity = fileData.length;
                fileData.splice(0,quantity)
                this.setCounter(0);
                await fs.promises.writeFile(this.file , JSON.stringify(fileData));
                string("Productos eliminados correctamente.");
            } else {
                string("Se encuentra vacio el listado de productos.");
            }
            
        } catch(err) {
            console.log(`Ha ocurrido un error: ${err.message}`);
        }   
    }

}

module.exports = Contenedor;