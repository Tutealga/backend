const fs = require('fs');

class Container {
	constructor(file) {
		this.file = file;
		this.objects = this.readData();
	}

	generateId() {
		try {
			if (this.objects.length === 0) return 1;
			return this.objects[this.objects.length - 1].id + 1;
		} catch (error) {
			console.log({ error: error.message });
		}
	}

	async save(object) {
		try {
			object.id = await this.generateId();
			object.timestamp = Date.now();
			this.objects.push(object);
			this.writeData();
			return object.id;
		} catch (err) {
			console.log(err);
		}
	}

	getById(id) {
		const object = this.objects.find(objetct => objetct.id === id);
		console.log({ object });
		return object ? object : null;
	}

	getAll() {
		try {
			return this.objects;
		} catch (error) {
			console.log({ error: error.message });
			return [];
		}
	}

	deleteById(id) {
		try {
			let index = this.objects.findIndex(object => object.id === id);
			if (index === -1) return index;
			this.objects.splice(index, 1);
			this.writeData();
		} catch (err) {
			console.log(err);
		}
	}

	async deleteAll() {
		try {
			this.objects = [];
			this.writeData();
		} catch (err) {
			console.log(err);
		}
	}

	update(id, data) {
		const objectToUpdate = this.getById(id);
		const index = this.objects.findIndex(
			object => object.id === objectToUpdate.id
		);
		this.objects[index] = { ...this.objects[index], ...data };
		this.writeData();
	}

	readData() {
		try {
			return JSON.parse(fs.readFileSync(this.file, 'utf-8'));
		} catch (error) {
			console.log({ error: error.message });
			if (error.message === 'Unexpected end of JSON input') return [];
		}
	}

	async writeData() {
		await fs.promises.writeFile(
			this.file,
			JSON.stringify(this.objects, null, 2)
		);
	}

	saveProduct(idCartSelected, idProduct) {
		try {
			const cartSelected = this.getById(idCartSelected);
			if (cartSelected == null) return;
			const productSelected = products.getById(idProduct);
			if (productSelected == null) return;
			cartSelected.products.push(productSelected);
			this.writeData();
			return 'Producto agregado!';
		} catch (err) {
			console.log(err);
		}
	}

	deleteProduct(idCartSelected, idProduct) {
		try {
			const cartSelected = this.getById(idCartSelected);
			if (cartSelected == null) return;
			const productToDelete = cartSelected.products.findIndex(product => product.id === idProduct);
			if (productToDelete == -1) return;
			cartSelected.products.splice(productToDelete, 1);
			this.writeData();
			return 'Producto eliminado!';
		} catch (error) {
			console.log(error);
		}
	}
}

const products = new Container('./data/products.json');

module.exports = { Container, products };