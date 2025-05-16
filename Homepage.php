<?php 
include('PHP/sessionManager.php');
if (!isLoggedIn()) {
    // add page redirect here
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CampusTrade</title>
    <link rel="stylesheet" href="css/index.css">
</head>
<body>
    <header>
        <div class="header-container">
            <div class="logo">
                <span>🎓</span>
                <span>CampusTrade</span>
            </div>
            <div class="search-bar">
                <input type="text" placeholder="Search for textbooks, electronics, furniture...">
                <button>🔍</button>
            </div>
            <nav class="bar">
                <ul>
                    <li><a href="sell" id="sell-btn">Sell</a></li>
                    <li><a href="messages" id="message-btn">Messages</a></li>
                    <li class="dropdown">
                        <a href="#" id="account-btn">Account</a>
                        <div class="drop-content">
                            <a href="html/login.html">Login</a>
                            <a href="html/signup.html">Signup</a>
                        </div>    
                    </li>
                    <li><a href="html/basket.html">Basket 🛒</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <main class="container">
        <div class="categories">
            <div class="category active" data-category="all">All</div>
            <div class="category" data-category="textbooks">Textbooks</div>
            <div class="category" data-category="electronics">Electronics</div>
            <div class="category" data-category="furniture">Furniture</div>
            <div class="category" data-category="clothing">Clothing</div>
            <div class="category" data-category="services">Services</div>
            <div class="category" data-category="other">Other</div>
        </div>
        
        <div class="products" id="products-container">
            <!-- Products will be loaded dynamically -->
        </div>

    </main>
    
    <!-- Sell Item Modal -->
    <div id="sell-modal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Sell Your Item</h2>
            <form id="product-form" class="product-form">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" id="title" required>
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" rows="4" required></textarea>
                </div>
                <div class="form-group">
                    <label for="price">Price (£)</label>
                    <input type="number" id="price" min="0" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="category">Category</label>
                    <select id="category" required>
                        <option value="textbooks">Textbooks</option>
                        <option value="electronics">Electronics</option>
                        <option value="furniture">Furniture</option>
                        <option value="clothing">Clothing</option>
                        <option value="services">Services</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="image">Image URL</label>
                    <input type="text" id="image" placeholder="Paste an image URL here">
                </div>
                <div class="form-actions">
                    <button type="button" class="btn btn-outline" id="cancel-btn">Cancel</button>
                    <button type="submit" class="btn btn-primary">Post Item</button>
                </div>
            </form>
        </div>
    </div>
    <!--Message box-->
    <div id="message-box" class="message-box">
        <div class="message-header">
            <h3>Messages</h3>
            <span class="close-message">&times;</span>
        </div>
        <div class="message-content">
            <div class="convo-list" id="convo-list">
                <!--Convo message will he listed here-->
            </div>
            <div class="message-area" id="message-area">
                <div class="messages" id="messages">
                    <!--Messages will be here-->
                    <div class="no-convo-message">Select conversation or product to message</div>
                </div>
                <div class="message-input-container">
                    <input type="text" id="message-input" placeholder="Type message" disabled>
                    <button id="send-btn" disabled>Send</button>
                </div>
            </div>
        </div>

    </div>
    <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>CampusTrade</h3>
                        <p>Buy and sell items within your university.</p>
                    </div>
                    <div class="footer-section">
                        <h3>Quick links</h3>
                        <ul>
                            <li><a href="../Homepage.php">Home</a></li>
                            <li><a href="#">About us</a></li>
                            <li><a href="../contact.html">Contact</a></li>
                            <li><a href="#">Terms and services</a></li>
                        </ul>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2025 CampusTrade. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    
    <script src="javascript/index.js"></script>
</body>
</html>