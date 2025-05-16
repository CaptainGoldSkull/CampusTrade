document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const orderItemsContainer = document.getElementById('order-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const placeOrderBtn = document.getElementById('place-order-btn');
    
    // Load basket items from localStorage
    function loadOrderSummary() {
        let basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];
        
        console.log('Basket items:', basketItems); // Debug log
        
        if (basketItems.length === 0) {
            orderItemsContainer.innerHTML = `
                <div class="empty-order">
                    <p>Your basket is empty. Please add items before checkout.</p>
                    <a href="Homepage.php">Continue shopping</a>
                </div>
            `;
            placeOrderBtn.disabled = true;
            placeOrderBtn.style.opacity = '0.5';
            return;
        }
        
        // Create HTML for order items
        let orderItemsHTML = '';
        
        basketItems.forEach(item => {
            orderItemsHTML += `
                <div class="order-item">
                    <img src="${item.image}" alt="${item.title}" class="order-item-image">
                    <div class="order-item-details">
                        <div class="order-item-title">${item.title}</div>
                        <div class="order-item-price">
                            <span>${item.quantity} x £${item.price.toFixed(2)}</span>
                            <span>£${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        orderItemsContainer.innerHTML = orderItemsHTML;
        
        // Calculate and update totals
        const subtotal = calculateSubtotal(basketItems);
        subtotalElement.textContent = `£${subtotal.toFixed(2)}`;
        totalElement.textContent = `£${subtotal.toFixed(2)}`;
        
        // Enable place order button
        placeOrderBtn.disabled = false;
        placeOrderBtn.style.opacity = '1';
    }
    
    // Calculate subtotal
    function calculateSubtotal(items) {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    // Place order
    placeOrderBtn.addEventListener('click', function() {
        const shippingForm = document.getElementById('shipping-form');
        const paymentForm = document.getElementById('payment-form');
        
        // Basic form validation
        if (!shippingForm.checkValidity() || !paymentForm.checkValidity()) {
            alert('Please fill in all required fields correctly.');
            shippingForm.reportValidity();
            paymentForm.reportValidity();
            return;
        }
        
        // Process the order
        processOrder();
    });
    
    // Process order
    function processOrder() {
        // In a real application, you would submit the order to a server
        // The server will is being implemented. 
        
        // Create order confirmation details
        const orderDetails = {
            orderId: generateOrderId(),
            items: JSON.parse(localStorage.getItem('basketItems')) || [],
            total: calculateSubtotal(JSON.parse(localStorage.getItem('basketItems')) || []),
            date: new Date().toISOString(),
            shippingDetails: {
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                postcode: document.getElementById('postcode').value
            }
        };
        
        // Store order details for confirmation page
        localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
        
        // Clear basket
        localStorage.removeItem('basketItems');
        
        // Show success message and redirect
        alert(`Order placed successfully! Order ID: ${orderDetails.orderId}\nThank you for shopping with CampusTrade.`);
        
        // redirect to order confirmation page
        // For now, redirect to home page
        window.location.href = '../Homepage.php';
    }
    
    // Generate a random order ID
    function generateOrderId() {
        return 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    }
    
    // Update basket count in header
    function updateBasketCount() {
        let basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];
        const totalItems = basketItems.reduce((total, item) => total + item.quantity, 0);
        
        const basketCountElement = document.querySelector('.basket-count');
        if (basketCountElement) {
            basketCountElement.textContent = totalItems;
            basketCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
        } else if (totalItems > 0) {
            const basketBtn = document.querySelector('a[href="../basket/basket.html"]');
            if (basketBtn) {
                const countElement = document.createElement('span');
                countElement.className = 'basket-count';
                countElement.textContent = totalItems;
                basketBtn.appendChild(countElement);
            }
        }
    }
    
    // Add basket count styles
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
            
            /* Position the basket count relative to the basket link */
            .bar ul li a[href="../basket/basket.html"] {
                position: relative;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialise
    loadOrderSummary();
    addBasketStyles();
    updateBasketCount();

});