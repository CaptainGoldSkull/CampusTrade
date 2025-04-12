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
    const messageBtn = document.getElementById('contact-seller-btn');

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
                        <button id="contact-seller-btn" class="btn btn-primary">Contact Seller</button>
                        <button id="purchase-now-btn" class="btn btn-primary">Purchase Now</button>
                        <button id="save-item-btn" class="btn btn-outline">♡ Save</button>
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

        // Add event listeners for the buttons 
        document.getElementById('contact-seller-btn').addEventListener('click', () => {
            alert(`Contact ${product.seller} at ${product.contactEmail}`);
        });

        document.getElementById('purchase-now-btn').addEventListener('click', () => {
            alert(`Your are buying now ${product.title} for £${product.price.toFixed(2)}`);
        });
        document.getElementById('save-item-btn').addEventListener('click', () => {
            this.textContent = this.textContent === '♡ Save' ? '♥ Saved' : '♡ Save';
        });
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

    
});