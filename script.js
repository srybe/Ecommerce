let iconCart = document.querySelector('.cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.cart span');

let listProducts = [];
let carts = [];

iconCart.addEventListener('click', () => {
        body.classList.toggle('showCart')
    }
)

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
    }
)

const addDataToHTML = () => {
    listProductHTML.innerHTML = ' ';
    if(listProducts.length > 0 ){
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add to Cart</button>
            `;
            listProductHTML.appendChild(newProduct);
        })
    }
}

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
})

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    }else if(positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    }else {
        carts[positionThisProductInCart].quantity += 1;
    }
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item'); // Wrap 'item' in quotes

            // Find the corresponding product information
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];

            // Use backticks (`) for the template literal
            newCart.innerHTML = `
                <div class="image">
                    <img src="${info.image}" alt="">
                </div>
                <div class="name">
                    ${info.name} <!-- Use ${info.name} to display the product name -->
                </div>
                <div class="totalPrice">
                    $${info.price * cart.quantity} <!-- Calculate total price -->
                </div>
                <div class="quantity">
                    <span class="minus">&lt;</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">&gt;</span>
                </div>
            `;

            listCartHTML.appendChild(newCart);
        });
    }
    
};

const initApp = () => {
    // will be getting data from json
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        addDataToHTML();
    })
    if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
        addCartToHTML();
    }
}
initApp();