const cart_items = document.querySelector('#cart .cart-items');
const parentContainer = document.getElementById('main-body');
const ordersContainer = document.getElementById('orders');

window.addEventListener('load', async () => {
    if (window.location.href.includes('store.html')) {
        let res = await axios.get('http://localhost:3000/products?page=1')
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
                                <button class="shop-item-button" type='button' id="${product.id}">ADD TO CART</button>
                            </div>
                            </div>`
                    grid.innerHTML += prodHtml;
                })
                displayCart();
                showPagination(res.data);
    }
    if (window.location.href.includes('orders.html')) {
        const ordersContainer = document.getElementById('orders');
        ordersContainer.innerHTML = '';
        axios.get('http://localhost:3000/orders')
            .then((res) => {
                let orders = res.data;
                orders.forEach(order => {
                    ordersContainer.innerHTML += `<div id='order${order.id}' class='order-container'>
                                                  <span>Order ${order.id}</span>
                                                  <button class='details-button' id='${order.id}'>Details</button>
                                                  </div>`
                })
            })
    }
});

parentContainer.addEventListener('click', (e) => {
    if (e.target.className == 'shop-item-button') {
        axios.post('http://localhost:3000/cart', { productId: e.target.id })
            .then(() => {
                addCartItem(e);
            });
    }
    if (e.target.className == 'cart-btn-bottom' || e.target.className == 'cart-bottom' || e.target.className == 'cart-holder') {
        document.querySelector('#cart').style = "display:block;"
    }

    if (e.target.className == 'cancel') {
        document.querySelector('#cart').style = "display:none;"
    }

    if (e.target.className == 'page') {
        // e.target.parentNode
        let currentPage = document.querySelector('#curr-page').innerText;
        if (e.target.id == 'next') {
            let next = parseInt(currentPage) + 1;
            axios.get(`http://localhost:3000/products?page=${next}`)
                .then((res) => {
                    const products = res.data.products;
                    const grid = document.getElementById('grid');
                    grid.innerHTML = '';
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
                                <button class="shop-item-button" type='button' id="${product.id}">ADD TO CART</button>
                            </div>
                            </div>`
                        grid.innerHTML += prodHtml;
                    })
                    showPagination(res.data);
                })

        }
        console.log(`Page ${e.target.id} selected`);
        if (e.target.id == 'prev') {
            let prev = parseInt(currentPage) - 1;
            axios.get(`http://localhost:3000/products?page=${prev}`)
                .then((res) => {
                    const products = res.data.products;
                    const grid = document.getElementById('grid');
                    grid.innerHTML = '';
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
                                <button class="shop-item-button" type='button' id="${product.id}">ADD TO CART</button>
                            </div>
                            </div>`
                        grid.innerHTML += prodHtml;
                    })
                    showPagination(res.data);
                })

        }

    }

    if (e.target.className == 'purchase-btn') {
        axios.post(`http://localhost:3000/order`)
            .then(res => {
                console.log(e.target.parentNode);
                const notification = document.createElement('div');
                notification.classList.add('notification');
                notification.innerHTML = `<h4>Your Order is Placed Sucessfully with Order ID : <span>${res.data.orderID}</span><h4>`;
                e.target.parentNode.appendChild(notification);
                setTimeout(() => {
                    notification.remove();
                }, 10000)
                displayCart();
            })
    }

    if (e.target.innerText == 'REMOVE'){
        let prodId = e.target.parentNode.parentNode.id;
        axios.delete(`http://localhost:3000/cart?productId=${prodId}`)
        .then(res=>{
            displayCart()

        })
        .catch(err=>{console.log(err)})
    }
});

function addCartItem(e) {
    displayCart();
    document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText) + 1
    sendNotification(name);
}

function sendNotification(name) {
    const container = document.getElementById('notification');
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = `<h4>Your Product : <span>${name}</span> is added to the cart<h4>`;
    container.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 2500)
}

function displayCart() {
    axios.get('http://localhost:3000/cart')
        .then((res) => {
            let items = res.data.products;
            let total_items = 0;
            cart_items.innerHTML = '';
            items.forEach(item => {
                const id = item.id;
                const name = item.title;
                const img_src = item.imageUrl;
                const price = item.price;
                const cart_item = document.createElement('div');
                total_items = total_items + item.cartItem.quantity;
                cart_item.classList.add('cart-row');
                cart_item.setAttribute('id', `${id}`);
                cart_item.innerHTML = `
                <span class='cart-item cart-column'>
                <img class='cart-img' src="${img_src}" alt="">
                <span>${name}</span>
                </span>
                <span class='cart-price cart-column'>${price}</span>
                <span class='cart-quantity cart-column'>${item.cartItem.quantity}
                <button>REMOVE</button>
                </span>`
                cart_items.appendChild(cart_item);
            })
            document.querySelector('#total-value').innerText = res.data.totalCost;
            document.querySelector('.cart-number').innerText = total_items;
        })
        .catch((err)=>console.log(err));
}

function showPagination(data) {
    let pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    if (data.hasPrev) {
        pagination.innerHTML = '<button class="page" id="prev">prev</button>';
    }
    pagination.innerHTML += `<span id="curr-page"> ${data.currPage} </span>`
    if (data.hasNext) {
        pagination.innerHTML += '<button class="page" id="next">next</button>';
    }
}
if (window.location.href.includes('orders.html')){
ordersContainer.addEventListener('click', (e) => {
    console.log(e.target.id);
    const orderDetails = document.getElementById('order-details');
    orderDetails.style = "display:none;";
    orderDetails.innerHTML = '';
    let orderHtml = `<h2>Order ${e.target.id} Details</h2>`
    axios.get(`http://localhost:3000/orderDetails?orderId=${e.target.id}`)
    .then(response=>{
        let products = response.data.products;
        products.forEach((product)=>{
         orderHtml += `<div class="cart-row">
         <span class='cart-item cart-column'>
         <img class='cart-img' src="${product.imageUrl}" alt="">
         <span>${product.title}</span>
         </span>
         <span class='cart-price cart-column'>${product.price}</span>
         <span class='cart-quantity cart-column'>
         <span class='cart-price'>${product.orderItem.quantity}</span>
         </span>
        </div>`   
        })
        orderDetails.innerHTML = orderHtml;
        orderDetails.innerHTML += `<div class='total-cost'><span>Total</span><span class='value'>$${response.data.totalCost}</span></div>`
        orderDetails.style = "display:block;";
    }) 
})
}