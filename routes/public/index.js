const newProduct = () => {
    let title = document.getElementById("title");
    let price = document.getElementById("price");
    let thumbnail = document.getElementById("thumbnail");
    let product = {
        "titulo": title.value,
        "precio": price.value,
        "thumbnail": thumbnail.value
    };

    fetch('/api/products', {
        method: 'POST', 
        body: JSON.stringify(product),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {
            console.log('Success:', response);
            title.value = '';
            price.value = '';
            thumbnail.value = '';
         });
}