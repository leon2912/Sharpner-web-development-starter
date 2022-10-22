const cart_items = document.querySelector('#cart .cart-items');
const parentContainer = document.getElementById('main-body');

window.addEventListener('load', () => {
    console.log('Document Loaded');
    axios.get('http://localhost:3000/products')
        .then((res) => {
            console.log(res.data.products);
            const products = res.data.products;
            const grid = document.getElementById('grid');
            products.forEach(product => {
                const prodHtml = `<div class="card" id="prod${product.id}">
                                <div class="card-title">
                                    <h4>${product.title}</h4>
                                </div>
                            <div class="image-container" id="imgs">
                                 <img src="${product.imageUrl}"
                             alt="" />
                            </div>
                            <div class="card-price">
                                <p>${product.price}$</p>
                                <button class="shop-item-button" type='button'>ADD TO CART</button>
                            </div>
                            </div>`
                grid.innerHTML += prodHtml;
            })
        });
});


parentContainer.addEventListener('click', (e) => {
    if (e.target.className == 'shop-item-button') {
        const id = e.target.parentNode.parentNode.id
        const name = document.querySelector(`#${id} h4`).innerText;
        const img_src = document.querySelector(`#${id} img`).src;
        const price = e.target.parentNode.firstElementChild.innerText;
        console.log(id, name, img_src, price);
        let total_cart_price = document.querySelector('#total-value').innerText;
        if (document.querySelector(`#in-cart-${id}`)) {
            alert('This item is already added to the cart');
            return
        }
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText) + 1
        const cart_item = document.createElement('div');
        cart_item.classList.add('cart-row');
        cart_item.setAttribute('id', `in-cart-${id}`);
        total_cart_price = parseFloat(total_cart_price) + parseFloat(price)
        total_cart_price = total_cart_price.toFixed(2)
        document.querySelector('#total-value').innerText = `${total_cart_price}`;
        cart_item.innerHTML = `
        <span class='cart-item cart-column'>
        <img class='cart-img' src="${img_src}" alt="">
            <span>${name}</span>
        </span>
        <span class='cart-price cart-column'>${price}</span>
        <span class='cart-quantity cart-column'>
        <input type="text" value="1">
        <button>REMOVE</button>
        </span>`
        cart_items.appendChild(cart_item)

        const container = document.getElementById('notification');
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.innerHTML = `<h4>Your Product : <span>${name}</span> is added to the cart<h4>`;
        container.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 2500)
    }
    if (e.target.className == 'cart-btn-bottom' || e.target.className == 'cart-bottom' || e.target.className == 'cart-holder') {
        document.querySelector('#cart').style = "display:block;"
    }
    if (e.target.className == 'cancel') {
        document.querySelector('#cart').style = "display:none;"
    }
    if (e.target.className == 'purchase-btn') {
        if (parseInt(document.querySelector('.cart-number').innerText) === 0) {
            alert('You have Nothing in Cart , Add some products to purchase !');
            return
        }
        alert('Thanks for the purchase')
        cart_items.innerHTML = ""
        document.querySelector('.cart-number').innerText = 0
        document.querySelector('#total-value').innerText = `0`;
    }

    if (e.target.innerText == 'REMOVE') {
        let total_cart_price = document.querySelector('#total-value').innerText;
        total_cart_price = parseFloat(total_cart_price).toFixed(2) - parseFloat(document.querySelector(`#${e.target.parentNode.parentNode.id} .cart-price`).innerText).toFixed(2);
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText) - 1
        document.querySelector('#total-value').innerText = `${total_cart_price.toFixed(2)}`
        e.target.parentNode.parentNode.remove()
    }
})