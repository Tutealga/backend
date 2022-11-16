const newProduct = () => {
    let title = document.getElementById("title1");
    let price = document.getElementById("price1");
    let thumbnail = document.getElementById("thumbnail1");
    let product = {
        "title": title.value,
        "price": price.value,
        "thumbnail": thumbnail.value
    };

    fetch('/api/productos', {
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