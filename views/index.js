const socket = io();

// Products form
const $formAddProduct = document.querySelector('#form-add-product');
const $listProducts = document.querySelector('#list-products');
const $nameInput = document.querySelector('#name-product');
const $priceInput = document.querySelector('#price-product');
const $imgInput = document.querySelector('#img-product');
const $tableProducts = document.querySelector('#table-products');

$formAddProduct.addEventListener('submit', e => {
	e.preventDefault();
	const product = {
		name: $nameInput.value,
		price: $priceInput.value,
		img: $imgInput.value
	};
	socket.emit('product', product);
	e.target.reset();
});

const renderProducts = products => {
	if (products.length > 0) $tableProducts.innerHTML = '';
	products.forEach(product => {
		$tableProducts.innerHTML += `
        <tr>
                                <th class="bg-light text-dark fs-4" style="width:200px">${product.name}</th>
                                <th class="bg-light text-dark fs-4" style="width:200px">${product.price}</th>
                                <th class="bg-light text-dark fs-4" style="width:200px"><img src="${product.img}" alt="${product.name}" style="width:100px; height:100px"/></th>   
                            </tr>`;
	});
};

// Chat form
const $chatForm = document.querySelector('#chat-form');
const $userEmail = document.querySelector('#user-email');
const $chatMessage = document.querySelector('#chat-message');
const $tableChat = document.querySelector('#table-chat');

$chatForm.addEventListener('submit', e => {
	e.preventDefault();
	if ($userEmail.value == '') return alert('Ingresa tu email');
	const message = {
		email: $userEmail.value,
		message: $chatMessage.value,
		date: new Date().toLocaleString()
	}
	socket.emit('message', message);
	e.target.reset();
});

const renderChat = messages => {
	if (messages.length > 0) {
		$tableChat.innerHTML = '';
		messages.forEach(message => {
			$tableChat.innerHTML += `
		<div>
			<b class="text-primary">${message.email}</b>
			[<span style="color: brown;">${message.date}</span>]
			: <i class="text-success">${message.message}</i>
		</div > `;
		})
		$chatMessage.focus();
	}
}

socket.on('products', products => {
	renderProducts(products);
});

socket.on('messages', messages => {
	renderChat(messages);
});
                           

