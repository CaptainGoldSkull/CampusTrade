document.addEventListener('DOMContentLoaded', function() {

    // Lets create the DOM elements
    const basketCount = document.getElementById('basket-content')

    // Load basket items from the localstorage
    function loadBasket() {
        let basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];

        if (basketItems.length === 0) {
            basketCount.innerHTML = `
                <div class="empty-basket">
                    <p>Your Basket is empty.</p>
                    <a href="../index.html" class="btn btn-primary">Continue shopping</a>
                </div>
                `;
            return;
        }

        let basketHTML = `
            <div class="basket-items">
                ${basketItems.map(item => `
                    <div class="basket-item" data-id="${item.id}">
                        <img src="${item.image}" alt="${item.title}" class="basket-item-image">
                        <div class="basket-item-details">
                            <div class="basket-item-title">${item.title}</div>
                            <div class="basket-item-seller">Seller: ${item.seller}</div>
                            <div class="basket-item-price">£${item.price.toFixed(2)}</div>
                            <div class="basket-item-controls">
                                <div class="basket-item-quantity">
                                    <button class="quantity-btn decrease-btn">-</button>
                                    <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                                    <button class="quantity-btn increase-btn">+</button>
                                </div>
                                <button class="remove-btn">Remove</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="basket-summary">
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>£${calculateSubtotal(basketItems).toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Shipping</span>
                    <span>£0.00</span>
                </div>
                <div class="summary-row total">
                    <span>Total</span>
                    <span>£${calculateSubtotal(basketItems).toFixed(2)}</span>
                </div>
                <button class="checkout-btn">Proceed to Checkout</button>
            </div>
        `;
        basketCount.innerHTML = basketHTML;

        addBasketEventListeners();
    }

    // Calculate sub total
    function calculateSubtotal(items) {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    function addBasketEventListeners() {
        //Increase quantity button
        document.querySelectorAll('.increase-btn').forEach(btn =>  {
            btn.addEventListener('click', function() {
                const item = this.closest('.basket-item');
                const id = parseInt(item.dataset.id);
                updateItemQuantity(id, 1);
            });
        });

        //Decrease quantity buttin 
        document.querySelectorAll('.decrease-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const item = this.closest('.basket-item');
                const id = parseInt(item.dataset.id);
                updateItemQuantity(id, -1);
            });
        });

        // Remove item button
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const item = this.closest('.basket-item');
                const id = parseInt(item.dataset.id);
                removeItem(id);
            });
        });

        //checkout button 
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                window.location.href = '../checkout/checkout.html';
            });
        }
    }
    // Update item quantity
    function updateItemQuantity(id, change) {
        let basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];
        
        const itemIndex = basketItems.findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            basketItems[itemIndex].quantity += change;
            
            // Remove item if quantity reaches 0
            if (basketItems[itemIndex].quantity <= 0) {
                basketItems.splice(itemIndex, 1);
            }
            
            localStorage.setItem('basketItems', JSON.stringify(basketItems));
            loadBasket();
            updateBasketCount();
        }
    }
    
    // Remove item from basket
    function removeItem(id) {
        let basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];
        
        const newBasketItems = basketItems.filter(item => item.id !== id);
        localStorage.setItem('basketItems', JSON.stringify(newBasketItems));
        
        loadBasket();
        updateBasketCount();
    }
    
    // Update basket item count in header
    function updateBasketCount() {
        let basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];
        const totalItems = basketItems.reduce((total, item) => total + item.quantity, 0);
        
        const basketCountElement = document.querySelector('.basket-count');
        if (basketCountElement) {
            basketCountElement.textContent = totalItems;
            basketCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
        } else if (totalItems > 0) {
            const basketBtn = document.querySelector('a[href="basket.html"]');
            if (basketBtn) {
                const countElement = document.createElement('span');
                countElement.className = 'basket-count';
                countElement.textContent = totalItems;
                basketBtn.appendChild(countElement);
            }
        }
    }

    function addBasketStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .basket-count {
                position: absolute;
                top: -8px;
                right: -8px;
                background-color: red;
                color: white;
                border-radius: 50%;
                width: 18px;
                height: 18px;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        
            .bar ul li a[href="basket.html"] {
                position: relative;
            }
        `;
        document.head.appendChild(style);
    }

    // Initialise basket
    addBasketStyles();
    loadBasket();
    updateBasketCount();
});
