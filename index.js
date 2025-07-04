//Initialse the app
document.addEventListener('DOMContentLoaded', function() {

    
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
            date: "2 days ago",
            description: "Well-maintained calculus textbook with minimal highlighting.",
            condition: "Good",
            location: "Main Campus"
        },
        {
            id: 2,
            title: "Dell XPS 13 Laptop (2022)",
            price: 650.00,
            category: "electronics",
            image: "/api/placeholder/400/320",
            seller: "Jamie Smith",
            sellerAvatar: "/api/placeholder/50/50",
            date: "5 days ago",
            description: "Lightly used Dell XPS 13 with all original accessories.",
            condition: "Like New",
            location: "East Campus"
        },
        {
            id: 3,
            title: "IKEA Desk & Chair Set",
            price: 120.00,
            category: "furniture",
            image: "/api/placeholder/400/320",
            seller: "Casey Williams",
            sellerAvatar: "/api/placeholder/50/50",
            date: "1 week ago",
            description: "Desk and chair set from IKEA, perfect for dorm rooms.",
            condition: "Good",
            location: "West Campus"
        },
        {
            id: 4,
            title: "Biology Lab Coat (Size M)",
            price: 15.00,
            category: "clothing",
            image: "/api/placeholder/400/320",
            seller: "Taylor Brown",
            sellerAvatar: "/api/placeholder/50/50",
            date: "3 days ago",
            description: "Clean biology lab coat, size medium.",
            condition: "Good",
            location: "Science Building"
        },
        {
            id: 5,
            title: "Statistics Tutoring (1hr Session)",
            price: 25.00,
            category: "services",
            image: "/api/placeholder/400/320",
            seller: "Jordan Lee",
            sellerAvatar: "/api/placeholder/50/50",
            date: "Just now",
            description: "Professional statistics tutoring session.",
            condition: "N/A",
            location: "Library"
        },
        {
            id: 6,
            title: "Acoustic Guitar (Barely Used)",
            price: 180.00,
            category: "other",
            image: "/api/placeholder/400/320",
            seller: "Morgan Wilson",
            sellerAvatar: "/api/placeholder/50/50",
            date: "4 days ago",
            description: "Beautiful acoustic guitar in excellent condition.",
            condition: "Like New",
            location: "Music Hall"
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
    const messageBox = document.getElementById('message-box');
    const closeMessageBtn = document.querySelector('.close-message');
    const headerMessageBtn = document.getElementById('message-btn');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const messageContainer = document.getElementById('messages');
    const conversationList = document.getElementById('convo-list');
    const messageArea = document.getElementById('message-area')

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
                    <div class="product-price">£${product.price.toFixed(2)}</div>
                    <div class="product-seller">
                        <img src="${product.sellerAvatar}" alt="${product.seller}" class="seller-avatar">
                        <span>${product.seller} • ${product.date}</span>
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-primary message-btn" data-id="${product.id}">Message</button>
                        <button class="btn btn-primary purchase-btn" data-id="${product.id}">Purchase</button>
                        <button class="btn btn-outline add-to-basket-btn" data-id="${product.id}">Basket 🛒</button>
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
        document.querySelectorAll('.add-to-basket-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToBasket(productId);
            });
        });
        
        document.querySelectorAll('.purchase-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                window.open(`info/info.html?itemId=${productId}`, '_blank');
            });
        });

        // Update message buttons
        updateProductMessageButtons();
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
            product.category.toLowerCase().includes(searchTerm) ||
            product.seller.toLowerCase().includes(searchTerm)
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
                    <div class="product-price">£${product.price.toFixed(2)}</div>
                    <div class="product-seller">
                        <img src="${product.sellerAvatar}" alt="${product.seller}" class="seller-avatar">
                        <span>${product.seller} • ${product.date}</span>
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-primary message-btn" data-id="${product.id}">Message</button>
                        <button class="btn btn-primary purchase-btn" data-id="${product.id}">Purchase</button>
                        <button class="btn btn-outline add-to-basket-btn" data-id="${product.id}">Basket 🛒</button>
                    </div>
                </div>
            `;
            
            productsContainer.appendChild(productCard);
        });
        
        // Re-add event listeners
        addProductButtonListeners();
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
            
            /* Position the basket count relative to the basket link */
            nav.bar ul li a[href="basket/basket.html"] {
                position: relative;
            }
            
            .toast-message {
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
            date: "Just now",
            // Add description here
            description: document.getElementById('description').value || "No description provided.",
            condition: "New",
            location: "Campus"
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


    // Convo list data  
    const convo = [
        {id: 1, name: 'Alex Johnson', avatar: '/api/placeholder/50/50', productId: 1 },
        {id: 2, name: 'James Smith', avatar: '/api/placeholder/50/50', productId: 2},
        {id: 3, name: 'Oliver Halpin', avatar: '/api/placeholder/50/50', productId: 3}
    ];

    // Messages
    const sampleMessages = {
        1: [
            { sender: 'them', text: 'Is the computer still available?', time: '12:47 pm'},
            { sender: 'you', text: 'Yes it\'s available', time: '11:34 am'},
        ],

        2: [
            { sender: 'them', text: 'What is the battery life of the headphones', time: '15:10 pm'},
            { sender: 'you', text: 'The battery life is 60 hours', time: '9:50 am'},
        ],

        3: [
            { sender: 'them', text: 'When can I pick up the item', time: '17:30 pm'},
            { sender: 'you', text: 'I am available tomorrow?', time: '20:32 am'},
        ],
    };

    // Toggle the message box
    function toggleMessageBox() {
        messageBox.classList.toggle('active');

        // Transform property when toggling
        if (messageBox.classList.contains('active')) {
            messageBox.style.transform = 'translateY(0)';
        }else  {
            messageBox.style.transform = 'translateY(calc(100% + 20px))';
        }
    }

    // Close message box
    closeMessageBtn.addEventListener('click', function() {
        messageBox.classList.remove('active');
        messageBox.style.transform = 'translateY(calc(100% + 20px))';
    });

    // Open message boc from header button
    headerMessageBtn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMessageBox();
        loadConversation();
    });

    // Load the conversations
    function loadConversation() {
        conversationList.innerHTML = '';
        convo.forEach(conv => {
            const conversationEl = document.createElement('div');
            conversationEl.className = 'convo';
            conversationEl.setAttribute('data-id', conv.id);

            conversationEl.innerHTML = `
                <img src="${conv.avatar}" alt="${conv.name}" class="convo-avatar">
                <div class="convo-name">${conv.name}</div>
            `;
            conversationEl.addEventListener('click', function() {
                document.querySelectorAll('.convo').forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                loadMessages(conv.id);
            });

            conversationList.appendChild(conversationEl);
        });

        // Show default messages when no conversations
        if (convo.length === 0) {
            messageContainer.innerHTML = `
                <div class="no-convo-message">
                    No conversations. Start one by toastaging a seller.
                </div>`;
        }
    }

    //Load messages for a convo
    function loadMessages(conversationId) {
        const messageEl = document.getElementById('messages') || messageContainer;
        messageContainer.innerHTML = '';
        const messages = sampleMessages[conversationId] || [];

        messages.forEach(msg => {
            const messageEl = document.createElement('div');
            messageEl.className = `message-bubble ${msg.sender == 'you' ? 'sent' : 'received'}`;
            messageEl.innerHTML = `${msg.text} <div class="message-time">${msg.time}</div>`;
            messageContainer.appendChild(messageEl);
        });

        // Allow to input when convo is selected
        messageInput.disabled = false;
        sendBtn.disabled = false;
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

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

    //Update the message buttons to open the message box
    function updateProductMessageButtons() {
        document.querySelectorAll('.message-btn').forEach(btn => {
            const oldHandler = btn.getAttribute('data-handler-attached');
            if (oldHandler === 'true') return;

            btn.setAttribute('data-handler-attached', 'true');
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const product = products.find(p => p.id === productId);
                const seller = product ? product.seller : 'the seller';

                toggleMessageBox();
        

                // Find the convo with seller is exist
                const existingConvo = convo.find(c => c.productId === productId);
                if (existingConvo) {
                    const convoEl = document.querySelector(`.convo[data-id="${existingConvo.id}"]`);
                    if (convoEl) {
                        convoEl.click();
                    }
                }else {
                    //Find convo with seller if it exist
                    messageContainer.innerHTML = `
                        <div class="no-convo-message">
                            Start a conversation with ${seller} about this certain product
                        </div>`;
                    messageInput.disabled = false;
                    sendBtn.disabled = false;
                }
            });
        });
    }

    // Function to add product to basket - add this to your index.js file
    function addToBasket(productId) {
        productId = parseInt(productId);
        
        let basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];
        
        // Check if the product is already in the basket
        const existingItemIndex = basketItems.findIndex(item => item.id === productId);
        
        if (existingItemIndex !== -1) {
            // If already in basket, increase quantity
            basketItems[existingItemIndex].quantity += 1;
        } else {
            // Find the product in our products array
            const product = products.find(p => p.id === productId);
            
            if (product) {
                // Add new item to basket with quantity of 1
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
        
        // Save updated basket back to localStorage
        localStorage.setItem('basketItems', JSON.stringify(basketItems));
        
        // Update basket count indicator
        updateBasketCount();
        
        // Show confirmation message
        showToast('Its in your basket!');
    }

    // Update basket count in UI
    function updateBasketCount() {
        let basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];
        const totalItems = basketItems.reduce((total, item) => total + item.quantity, 0);
        
        const basketCountElement = document.querySelector('.basket-count');
        if (basketCountElement) {
            basketCountElement.textContent = totalItems;
            basketCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
        } else if (totalItems > 0) {
            const basketBtn = document.querySelector('a[href="basket/basket.html"]');
            if (basketBtn) {
                const countElement = document.createElement('span');
                countElement.className = 'basket-count';
                countElement.textContent = totalItems;
                basketBtn.appendChild(countElement);
            }
        }
    }

    // Show toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
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

    // Initialise
    addBasketStyles();
    displayProducts();
    loadConversation();
    updateProductMessageButtons();
    updateBasketCount();
});