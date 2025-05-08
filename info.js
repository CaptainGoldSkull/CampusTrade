// Initilaise the website
document.addEventListener('DOMContentLoaded', function(){

    // Sample product data
    let products = [
        {
            id: 1,
            title: "Calculus Textbook (9th Edition)",
            price: 45.00,
            category: "textbooks",
            image: "/api/placeholder/400/320",
            seller: "Alex Johnson",
            sellerAvatar: "/api/placeholder/50/50",
            date: "2 days ago"
        },
        {
            id: 2,
            title: "Dell XPS 13 Laptop (2022)",
            price: 650.00,
            category: "electronics",
            image: "/api/placeholder/400/320",
            seller: "Jamie Smith",
            sellerAvatar: "/api/placeholder/50/50",
            date: "5 days ago"
        },
        {
            id: 3,
            title: "IKEA Desk & Chair Set",
            price: 120.00,
            category: "furniture",
            image: "/api/placeholder/400/320",
            seller: "Casey Williams",
            sellerAvatar: "/api/placeholder/50/50",
            date: "1 week ago"
        },
        {
            id: 4,
            title: "Biology Lab Coat (Size M)",
            price: 15.00,
            category: "clothing",
            image: "/api/placeholder/400/320",
            seller: "Taylor Brown",
            sellerAvatar: "/api/placeholder/50/50",
            date: "3 days ago"
        },
        {
            id: 5,
            title: "Statistics Tutoring (1hr Session)",
            price: 25.00,
            category: "services",
            image: "/api/placeholder/400/320",
            seller: "Jordan Lee",
            sellerAvatar: "/api/placeholder/50/50",
            date: "Just now"
        },
        {
            id: 6,
            title: "Acoustic Guitar (Barely Used)",
            price: 180.00,
            category: "other",
            image: "/api/placeholder/400/320",
            seller: "Morgan Wilson",
            sellerAvatar: "/api/placeholder/50/50",
            date: "4 days ago"
        }
    ];

    // DOM elements 
    const productDetails = document.getElementById('product-details');
    const searchInput = document.querySelectorAll('.search-bar input');
    const searchButton = document.querySelectorAll('.search-bar button');
    const messageBox = document.getElementById('message-box');
    const closeMessageBtn = document.querySelector('.close-message');
    const headerMessageBtn = document.getElementById('message-btn');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const messageContainer = document.getElementById('messages');

    // Get product ID from URL 
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('itemId'));

    // Find the product ID
    const product = products.find(p => p.id === productId);

    // Display products details if found 
    if (product) {
        displayProductDetails(product);
        document.title = `${product.title} - CampusTrade`;
    } else {
        productDetails.innerHTML = '<div class="not-found">Product not found. <a href="index.html">Return to homepage</a></div>';
    }

    // Function to display product details
    function displayProductDetails(product) {
        productDetails.innerHTML = `
            <div class="product-info-container">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.title}" class="product-full-image">
                </div>
                <div class="product-info">
                    <h1 class="product-title">${product.title}</h1>
                    <div class="product-price">£${product.price.toFixed(2)}</div>
                    <div class="product-seller">
                        <img src="${product.sellerAvatar}" alt="${product.seller}" class="seller-avatar">
                        <span>${product.seller} • ${product.date}</span>
                    </div>
                    <div class="product-details-list">
                        <div class="detail-item">
                            <span class="detail-label">Category:</span>
                            <span class="detail-value">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Condition:</span>
                            <span class="detail-value">${product.condition}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Location:</span>
                            <span class="detail-value">${product.location}</span>
                        </div>
                    </div>
                    <div class="product-description">
                        <h3>Description</h3>
                        <p>${product.description}</p>
                    </div>
                    <div class="product-actions">
                        <button id="purchase-now-btn" class="btn btn-primary">Purchase Now</button>
                        <button id="add-to-basket-btn" class="btn btn-outline">Add to basket</button>
                    </div>
                </div>
            </div>
            <div class="similar-products">
                <h2>Similar Products</h2>
                <div class="similar-products-container">
                    ${getSimilarProducts(product)}
                </div>
            </div>
        `;
        addProductButtonListeners();
    }
    // Add event listeners for the buttons 
    function addProductButtonListeners() {
        document.getElementById('purchase-now-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                window.open(`basket.html?itemId=${productId}`);
            });
        });

        const addToBasket = document.getElementById('add-to-basket-btn');
        if (addToBasket) {
            addToBasket.addEventListener('click', function() {
                const urlParams = new URLSearchParams(window.location.search)
                const productId = urlParams.get('itemId');
                addToBasket(productId);
            });
        }
    }

    // Function to get the some product category
    function getSimilarProducts(currentProducts) {
        const similarProducts = products
            .filter(p => p.category === currentProducts.category && p.id !== currentProducts.id)
            .slice(0, 2) // Get 2 similar products
        
        if (similarProducts.length === 0) {
            return '<p>Error No similar products.</p>';
        }

        let html = '';
        similarProducts.forEach(product => {
            html += `
                <div class="similar-product-card">
                    <img src="${product.image}" alt="${product.title}" class="similar-product-image">
                    <div class="similar-product-details">
                        <div class="similar-product-title">${product.title}</div>
                        <div class="similar-product-price">${product.price.toFixed(2)}</div>
                        <button class="btn btn-small view-btn" data-id="${product.id}">View Item</button>
                    </div>
                </div>
            `;
        });

        return html;
    }
    // Search functionality
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            window.location.href = `index.html?search=${searchInput.value}`;
        });

        searchInput.addEventListener('click', function(e) {
            if (e.key === 'Enter')  {
                window.location.href = `index.html?search=${searchInput.value}`;
            }
        });
    }

    // Toggle the message box
    function toggleMessageBox() {
        messageBox.classList.toggle('active');

        if (messageBox.classList.contains('active')) {
            messageBox.style.transform = 'translateY(0)';
        } else {
            messageBox.style.transform = 'translateY(calc(100% + 20px))';
        }
    }

    // Close message box
    closeMessageBtn.addEventListener('click', function() {
        messageBox.classList.remove('active');
    });

    //Open message from header message button
    if (headerMessageBtn) {
        headerMessageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMessageBox();
        });
    }

    // contact seller button 
    setTimeout(() => {
        const contactSellerBtn = document.getElementById('contact-seller-btn');
        if (contactSellerBtn) {
            contactSellerBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log("Contact seller clicked");

                messageContainer.innerHTML = '';
                
                // Show message of who you are contacting
                if (product) {
                    const messageEl = document.createElement('div');
                    messageEl.className = 'no-convo-message';
                    messageEl.textContent = `Send a message to ${product.seller} about ${product.title}`;
                    messageContainer.appendChild(messageEl);
                }
                messageInput.disabled = false;
                sendBtn.disabled = false;
    
                toggleMessageBox();
                console.log("Message active")
            });
        }
    }, 100);

    // Send a message
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const text = messageInput.value.trim();
        if (text === '') return;

        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 || 12;
        const timeString = `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;

        const messageEl = document.createElement('div');
        messageEl.className = 'message-bubble-sent';
        messageEl.innerHTML = `${text} <div class="message-time"> ${timeString}</div>`;

        messageContainer.appendChild(messageEl);
        messageInput.value = '';
        messageContainer.scrollTop = messageContainer.scrollHeight;

        // Reply after delay
        setTimeout(() => {
            const replyEl = document.createElement('div');
            replyEl.className = 'message-bubble-received';
            replyEl.innerHTML = `Thank you for the message, I will get back as soon a possible. 
            <div class="message-time">${timeString}</div>`;

            messageContainer.appendChild(replyEl);
            messageContainer.scrollTop = messageContainer.scrollHeight;

        }, 1000);
    }

});