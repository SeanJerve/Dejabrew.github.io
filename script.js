let order = {};
let totalPrice = 0;

window.onload = () => showSection('all');

function showSection(category) {
    let items = document.querySelectorAll('.menu-item');
    items.forEach(item => {
        if (item.getAttribute('data-category') === category || category === 'all') {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function increaseQuantity(itemName, itemPrice) {
    const quantityElement = document.getElementById(`quantity-${itemName.replace(' ', '')}`);
    let quantity = parseInt(quantityElement.textContent) || 0;
    quantity++;
    quantityElement.textContent = quantity;

    if (order[itemName]) {
        order[itemName].quantity++;
        order[itemName].price += itemPrice;
    } else {
        order[itemName] = { quantity: 1, price: itemPrice };
    }

    updateOrderForm();
}

function decreaseQuantity(itemName, itemPrice) {
    const quantityElement = document.getElementById(`quantity-${itemName.replace(' ', '')}`);
    let quantity = parseInt(quantityElement.textContent) || 0;

    if (quantity > 0) {
        quantity--;
        quantityElement.textContent = quantity;

        if (order[itemName]) {
            order[itemName].quantity--;
            order[itemName].price -= itemPrice;

            if (order[itemName].quantity === 0) {
                delete order[itemName];
            }
        }

        updateOrderForm();
    }
}

function updateOrderForm() {
    const orderDetails = document.getElementById('order-details');
    orderDetails.innerHTML = '';
    totalPrice = 0; // Reset totalPrice for calculation

    for (let item in order) {
        if (order[item].quantity > 0) {
            const { quantity, price } = order[item];
            totalPrice += price; // Update totalPrice

            const orderItem = `
                <div class="order-details">
                    <div class="order-name"><p>${item}</p></div>
                    <div class="order-quantity"><p>${quantity} pc.</p></div>
                    <div class="order-price"><p><strong>₱ ${price.toFixed(2)}</strong></p></div>
                </div>
            `;
            orderDetails.innerHTML += orderItem;
        }
    }

    document.getElementById('total-price').innerText = `₱ ${totalPrice.toFixed(2)}`;
}



function searchMenuItems() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(item => {
        const itemName = item.querySelector("h2").textContent.toLowerCase();
        // Show the item if the query matches the name
        if (itemName.includes(query)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}



document.querySelectorAll('.category-tile p').forEach((categoryTitle) => {
    categoryTitle.addEventListener('click', () => {
        document.querySelectorAll('.category-tile p').forEach((title) => {
            title.classList.remove('active');
        });
        
        categoryTitle.classList.add('active');
        
        document.querySelectorAll('.menu-section').forEach((section) => {
            section.classList.remove('active');
        });
        
        const sectionId = categoryTitle.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
    });
});



document.querySelector(".btn-order").addEventListener("click", function() {
    const modal = document.getElementById("thankYouModal");
    const receiptDetails = document.getElementById('receipt-details');

    receiptDetails.innerHTML = '';

    let totalPayment = 0;

    for (let item in order) {
        if (order[item].quantity > 0) {
            const { quantity, price } = order[item];
            totalPayment += price;

            const receiptItem = `
                <div class="receipt-item">
                    <p>${item}</p>
                    <p>Quantity: ${quantity} pc.</p>
                    <p>Price: ₱${price.toFixed(2)}</p>
                </div>
            `;
            receiptDetails.innerHTML += receiptItem;
        }
    }

    modal.classList.add("show");

    resetOrderForm();

    setTimeout(function() {
        modal.classList.remove("show");
    }, 5000);
});

function resetOrderForm() {
    order = {};
    
    const quantities = document.querySelectorAll('.quantity');
    quantities.forEach(quantity => {
        quantity.textContent = '0';
    });

    document.getElementById('order-details').innerHTML = '';
    document.getElementById('total-price').innerText = '₱0.00';
}








