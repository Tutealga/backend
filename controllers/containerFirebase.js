const admin = require('firebase-admin');
const serviceAccount = require('../db/backend-4d143-firebase-adminsdk-i2xuv-0d79b085c1.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const { getFirestore, doc, getDoc } = require('firebase-admin/firestore');

class Container {
	constructor() {
		this.db = getFirestore();
	}
	//Save an object
	save(obj) {
		try {
			return this.db.collection('products').add(obj);
		} catch (err) {
			console.log(err);
		}
	}
	//Get an object by ID
	getById(id) {
		try {
			const data = this.db.doc(`/products/${id}`).get();
			return data;
		} catch (err) {
			console.log(err);
		}
	}
	//Get all objects
	getAll() {
		try {
			return this.model.find();
		} catch (err) {
			console.log(err);
		}
	}
	//Delete one object
	deleteById(id) {
		try {
			return this.model.findByIdAndDelete(id);
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = Container;