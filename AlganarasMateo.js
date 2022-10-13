class Usuario {
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }

    getFullName = () => {
       return `Nombre completo: ${this.nombre} ${this.apellido}`
    }

    addMascota = (mascota) => {
        this.mascotas.push(mascota);
    }

    countMascotas = () => {
        return this.mascotas.length
    }

    addBook = (libro) => {
        this.libros.push(libro);
    }

    getBookNames = () =>{
        const nombres = [];
        this.libros.forEach(libro => nombres.push(libro.nombre));
        return nombres;
    }

}

const addBook = () => {
    let nombre, autor;
    nombre = prompt("Ingrese el nombre del libro:");
    autor = prompt("Ingrese el autor del libro:");
    usuario.addBook({nombre: nombre, autor: autor});
}

const getBooks = () => {
    alert(`Los libros del usuario son: ${usuario.getBookNames().join(", ")}`);
}

const addMascota = () => {
    let nombre;
    nombre = prompt("Ingrese el nombre de la mascota:");
    usuario.addMascota(nombre);
}

const countMascotas = () => {
    alert(`La cantidad de mascotas es: ${usuario.countMascotas()}`);
}

let nombre, apellido, opcion;

nombre = prompt("Ingrese su nombre:");
apellido = prompt("Ingrese su apellido:");

let usuario = new Usuario(nombre, apellido);

const options = () => { 
 opcion = prompt(`${usuario.getFullName()}\n\n¿Que quiere hacer?\n\n1) Agregar un libro \n2) Obtener libros del usuario\n3) Agregar una mascota\n4) Ver cantidad de mascotas\n5) Finalizar`);
}

while(opcion !== '5'){
    options();
    while(opcion !== '1' & opcion !== '2' & opcion !== '3' & opcion !== '4' & opcion !== '5') {
     options();
    }

    if(opcion == 1){
       addBook();
    }

    if(opcion == 2){
        getBooks();        
    }

    if(opcion == 3){
        addMascota();
    }

    if(opcion == 4){
        countMascotas();
    }
}