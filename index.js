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
const productsContainer = document.getElementById('products-container');
const categoryButtons = document.querySelectorAll('.category');
const sellBtn = document.getElementById('sell-btn');
const sellModal = document.getElementById('sell-modal');
const closeBtn = document.querySelector('.close');
const cancelBtn = document.getElementById('cancel-btn');
const productForm = document.getElementById('product-form');
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

// Display products
function displayProducts(category = 'all') {
    productsContainer.innerHTML = '';
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = '<p>No products found in this category.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-details">
                <div class="product-title">${product.title}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-seller">
                    <img src="${product.sellerAvatar}" alt="${product.seller}" class="seller-avatar">
                    <span>${product.seller} • ${product.date}</span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary message-btn" data-id="${product.id}">Message</button>
                    <button class="btn btn-outline favorite-btn" data-id="${product.id}">♡ Save</button>
                </div>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
    
    // Add event listeners to the message and favorite buttons
    addProductButtonListeners();
}

// Add event listeners to product buttons
function addProductButtonListeners() {
    document.querySelectorAll('.message-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Message functionality would open a chat with the seller!');
        });
    });
    
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            btn.textContent = btn.textContent === '♡ Save' ? '♥ Saved' : '♡ Save';
        });
    });
}

// Search functionality
function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        const activeCategory = document.querySelector('.category.active').dataset.category;
        displayProducts(activeCategory);
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    productsContainer.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = '<p>No products match your search.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-details">
                <div class="product-title">${product.title}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-seller">
                    <img src="${product.sellerAvatar}" alt="${product.seller}" class="seller-avatar">
                    <span>${product.seller} • ${product.date}</span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary message-btn" data-id="${product.id}">Message</button>
                    <button class="btn btn-outline favorite-btn" data-id="${product.id}">♡ Save</button>
                </div>
            </div>
        `;
        
        productsContainer.appendChild(productCard);
    });
    
    // Re-add event listeners
    addProductButtonListeners();
}

// Event Listeners
// Category filter
categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const category = this.dataset.category;
        displayProducts(category);
    });
});

// Modal functionality
sellBtn.addEventListener('click', function(e) {
    e.preventDefault();
    sellModal.style.display = 'block';
});

closeBtn.addEventListener('click', function() {
    sellModal.style.display = 'none';
});

cancelBtn.addEventListener('click', function() {
    sellModal.style.display = 'none';
});

window.addEventListener('click', function(e) {
    if (e.target === sellModal) {
        sellModal.style.display = 'none';
    }
});

// Form submission
productForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newProduct = {
        id: products.length + 1,
        title: document.getElementById('title').value,
        price: parseFloat(document.getElementById('price').value),
        category: document.getElementById('category').value,
        image: document.getElementById('image').value || "/api/placeholder/400/320",
        seller: "You",
        sellerAvatar: "/api/placeholder/50/50",
        date: "Just now"
    };
    
    products.unshift(newProduct);
    
    // Reset form and close modal
    productForm.reset();
    sellModal.style.display = 'none';
    
    // Re-display products with the active category
    const activeCategory = document.querySelector('.category.active').dataset.category;
    displayProducts(activeCategory);
    
    alert('Your item has been posted successfully!');
});

// Search events
searchButton.addEventListener('click', searchProducts);
searchInput.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        searchProducts();
    }
});

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Display all products on initial load
    displayProducts();
});