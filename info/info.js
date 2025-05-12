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
    const toastageBox = document.getElementById('toastage-box');
    const closeMessageBtn = document.querySelector('.close-toastage');
    const headerMessageBtn = document.getElementById('toastage-btn');
    const toastageInput = document.getElementById('toastage-input');
    const sendBtn = document.getElementById('send-btn');
    const toastageContainer = document.getElementById('toastages');

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
        productDetails.innerHTML = '<div class="not-found">Product not found. <a href="../index.html">Return to homepage</a></div>';
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
        const purchaseBtn = document.getElementById('purchase-now-btn');
        if (purchaseBtn) {
            purchaseBtn.addEventListener('click', function() {
                const productId = parseInt(urlParams.get('itemId'));
                purchaseNow(productId);
            });
        }

        const addToBasketBtn = document.getElementById('add-to-basket-btn');
        if (addToBasket) {
            addToBasketBtn.addEventListener('click', function() {
                const productId = parseInt(urlParams.get('itemId'));
                addToBasket(productId);
            });
        }

        
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                window.open(`info.html?itemId=${productId}`);
            });
        });
    }

    // Function to add products to the basket 
    function addToBasket(productId) {
        let basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];

        // Check if the product is already in the basket
        const existingItemIndex = basketItems.findIndex(item => item.id === productId);

        if (existingItemIndex !== -1) {
            basketItems[existingItemIndex].quantity += 1;
        } else {
            const product = products.find(p => p.id === productId);
            if (product) {
                basketItems.push({
                     id: product.id,
                     title: product.title,
                     price: product.price,
                     image: product.image,
                     seller: product.seller,
                     quantity: 1
                });
            }
        }

        // Save updated basket to local storage
        localStorage.setItem('basketItems', JSON.stringify(basketItems));

        updateBasketCount();

        // Show confirmation toastage
        showToast('Product added to basket!');
    }

    // Function to purchase product now
    function purchaseNow(productId) {
        addToBasket(productId);

        // Set timeout before moving to checkout 
        setTimeout(() => {
            window.location.href = '../checkout/checkout.html';
        }, 100);
    }

    // Update basket count
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

    // Show toastage notification
    function showToast(toastage) {
        const toast = document.createElement('div');
        toast.className = 'toast-toastage';
        toast.textContent = toastage;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = 'var(--primary)';
        toast.style.color = 'white';
        toast.style.padding = '10px 20px';
        toast.style.borderRadius = '4px';
        toast.style.zIndex = '1000';
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 3000);
    }
    // Add basket styles
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
            
            .bar ul li a[href="../basket/basket.html"] {
                position: relative;
            }
            
            .toast-toastage {
                animation: fadeInOut 3s;
            }
            
            @keyframes fadeInOut {
                0% { opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
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
                        <div class="similar-product-price">£${product.price.toFixed(2)}</div>
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
            window.location.href = `../index.html?search=${searchInput.value}`;
        });

        searchInput.addEventListener('click', function(e) {
            if (e.key === 'Enter')  {
                window.location.href = `../index.html?search=${searchInput.value}`;
            }
        });
    }
    addBasketStyles();
    updateBasketCount();
});