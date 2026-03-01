function showPage(pageId) {
  const pages = document.querySelectorAll('.page');

  pages.forEach(page => {
    page.classList.remove('active');
  });

  document.getElementById(pageId).classList.add('active');
}

// Show home page when site loads
document.addEventListener("DOMContentLoaded", function() {
  showPage('home');
  displayRecommendedGames();
});


const games = [
  {
    title: "Mythic Heroes",
    price: 29.99,
    rating: 4.5,
    category: "RPG",
    platform: "PC",
    description: "An epic AFK idle RPG adventure.",
    image: "images/home1.png",
    releaseDate: "2022-03-15",
    recommended: true
  },
  {
    title: "Time Princess",
    price: 19.99,
    rating: 4.2,
    category: "Adventure",
    platform: "Mobile",
    description: "Travel back to 17th century Netherlands.",
    image: "images/home2.png",
    releaseDate: "2021-07-10",
    recommended: true
  },
  {
    title: "Subway Surfers",
    price: 9.99,
    rating: 4.8,
    category: "Action",
    platform: "Mobile",
    description: "Endless runner full of excitement.",
    image: "images/home3.png",
    releaseDate: "2019-05-20",
    recommended: true
  },
  {
    title: "Cyber Strike",
    price: 49.99,
    rating: 4.6,
    category: "Action",
    platform: "Console",
    description: "Futuristic combat and survival missions.",
    image: "images/game4.jpg",
    releaseDate: "2023-01-12",
    recommended: true
  },
  {
    title: "Fantasy World",
    price: 39.99,
    rating: 4.3,
    category: "RPG",
    platform: "PC",
    description: "Explore magical lands and creatures.",
    image: "images/game5.jpg",
    releaseDate: "2020-11-02",
    recommended: false
  },
  {
    title: "Racing Fever",
    price: 24.99,
    rating: 4.1,
    category: "Racing",
    platform: "Console",
    description: "High-speed racing experience.",
    image: "images/game6.jpg",
    releaseDate: "2022-09-18",
    recommended: false
  },
  {
    title: "Battle Arena",
    price: 34.99,
    rating: 4.4,
    category: "Action",
    platform: "PC",
    description: "Multiplayer competitive battle arena.",
    image: "images/game7.jpg",
    releaseDate: "2021-06-30",
    recommended: false
  },
  {
    title: "Puzzle Master",
    price: 14.99,
    rating: 4.0,
    category: "Puzzle",
    platform: "Mobile",
    description: "Challenge your brain with puzzles.",
    image: "images/game8.jpg",
    releaseDate: "2018-04-12",
    recommended: false
  }
];


function displayRecommendedGames() {
  const heroContainer = document.getElementById("hero-container");

  const recommendedGames = games.filter(game => game.recommended);

  heroContainer.innerHTML = recommendedGames.map(game => `
    <div class="hero-game">
      <img src="${game.image}" alt="${game.title}">
      <h2>${game.title}</h2>
      <p>${game.description}</p>
      <p><strong>Price:</strong> $${game.price}</p>
      <p><strong>Rating:</strong> ⭐ ${game.rating}</p>
    </div>
  `).join("");
} 

let currentIndex = 0;

function initCarousel() {
  const recommended = games.filter(game => game.recommended);
  const carousel = document.getElementById("carousel");

  function renderSlide() {
    const game = recommended[currentIndex];
    carousel.innerHTML = `
      <img src="${game.image}" alt="${game.title}">
      <h2>${game.title}</h2>
      <p>${game.description}</p>
      <p>$${game.price}</p>
    `;
  }

  document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + recommended.length) % recommended.length;
    renderSlide();
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % recommended.length;
    renderSlide();
  });

  renderSlide();
}
document.getElementById("newsletterForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const emailInput = document.getElementById("email");
  const errorMessage = document.getElementById("error-message");

  if (emailInput.value.trim() === "") {
    errorMessage.textContent = "Email cannot be empty.";
    return;
  }

  if (!emailInput.value.includes("@")) {
    errorMessage.textContent = "Please enter a valid email address.";
    return;
  }

  errorMessage.style.color = "green";
  errorMessage.textContent = "Successfully subscribed!";
  emailInput.value = "";
});

document.getElementById("newsletterForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const emailInput = document.getElementById("email");
  const message = document.getElementById("formMessage");

  const email = emailInput.value.trim();

  // Clear previous classes
  message.classList.remove("success", "error");

  // Empty check
  if (email === "") {
    message.textContent = "Email cannot be empty.";
    message.classList.add("error");
    return;
  }

  // Proper email format check (professional way)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    message.textContent = "Please enter a valid email address.";
    message.classList.add("error");
    return;
  }

  // Success
  message.textContent = "Successfully subscribed!";
  message.classList.add("success");

  emailInput.value = "";

  // Remove message after 3 seconds
  setTimeout(() => {
    message.textContent = "";
  }, 3000);
});

function removeFromWishlist(gameId) {
    let newWishlist = [];
    for (let i = 0; i < wishlistItems.length; i++) {
        if (wishlistItems[i].id !== gameId) {
            newWishlist.push(wishlistItems[i]);
        }
    }
    wishlistItems = newWishlist;
    
    updateWishlistBadge();
    displayWishlist();
    alert('Item removed from wishlist!');
}

function moveToCart(gameId) {
    let itemToMove = null;
    let itemIndex = -1;
    
    for (let i = 0; i < wishlistItems.length; i++) {
        if (wishlistItems[i].id === gameId) {
            itemToMove = wishlistItems[i];
            itemIndex = i;
            break;
        }
    }
    
    if (itemToMove) {
        let newWishlist = [];
        for (let i = 0; i < wishlistItems.length; i++) {
            if (i !== itemIndex) {
                newWishlist.push(wishlistItems[i]);
            }
        }
        wishlistItems = newWishlist;
        
        updateWishlistBadge();
        displayWishlist();
        alert(itemToMove.title + ' moved to cart!');
    }
}


function updateWishlistBadge() {
    const badge = document.getElementById('wishlist-count');
    if (badge) {
        badge.innerHTML = wishlistItems.length;
    }
}

function processPayment(event) {
    event.preventDefault();
    
    const email = document.getElementById('checkout-email').value;
    const cardName = document.getElementById('card-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    
    if (!email || !cardName || !cardNumber || !expiry || !cvv) {
        alert('Please fill in all fields');
        return false;
    }
    
    if (cardNumber.length !== 16) {
        alert('Card number must be 16 digits');
        return false;
    }
  
    const spinner = document.getElementById('loading-spinner');
    spinner.style.display = 'block';

    setTimeout(function() {
        spinner.style.display = 'none';
        
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        let randomNum = '';
        for (let i = 0; i < 4; i++) {
            randomNum = randomNum + Math.floor(Math.random() * 10);
        }
        
        const orderNumber = 'ORD-' + year + month + day + '-' + randomNum;
        
        alert('Order placed! Order Number: ' + orderNumber);
        
        document.getElementById('paymentForm').reset();
        showPage('games-page');
    }, 2000);
    
    return false;
}
function removeFromWishlist(gameId) {
    let newWishlist = [];
    for (let i = 0; i < wishlistItems.length; i++) {
        if (wishlistItems[i].id !== gameId) {
            newWishlist.push(wishlistItems[i]);
        }
    }
    wishlistItems = newWishlist;
    
    updateWishlistBadge();
    displayWishlist();
    alert('Item removed from wishlist!');
}

function moveToCart(gameId) {
    let itemToMove = null;
    let itemIndex = -1;
    
    for (let i = 0; i < wishlistItems.length; i++) {
        if (wishlistItems[i].id === gameId) {
            itemToMove = wishlistItems[i];
            itemIndex = i;
            break;
        }
    }
    
    if (itemToMove) {
        let newWishlist = [];
        for (let i = 0; i < wishlistItems.length; i++) {
            if (i !== itemIndex) {
                newWishlist.push(wishlistItems[i]);
            }
        }
        wishlistItems = newWishlist;
        
        updateWishlistBadge();
        displayWishlist();
        alert(itemToMove.title + ' moved to cart!');
    }
}


function updateWishlistBadge() {
    const badge = document.getElementById('wishlist-count');
    if (badge) {
        badge.innerHTML = wishlistItems.length;
    }
}

function processPayment(event) {
    event.preventDefault();
    
    const email = document.getElementById('checkout-email').value;
    const cardName = document.getElementById('card-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    
    if (!email || !cardName || !cardNumber || !expiry || !cvv) {
        alert('Please fill in all fields');
        return false;
    }
    
    if (cardNumber.length !== 16) {
        alert('Card number must be 16 digits');
        return false;
    }
  
    const spinner = document.getElementById('loading-spinner');
    spinner.style.display = 'block';

    setTimeout(function() {
        spinner.style.display = 'none';
        
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        let randomNum = '';
        for (let i = 0; i < 4; i++) {
            randomNum = randomNum + Math.floor(Math.random() * 10);
        }
        
        const orderNumber = 'ORD-' + year + month + day + '-' + randomNum;
        
        alert('Order placed! Order Number: ' + orderNumber);
        
        document.getElementById('paymentForm').reset();
        showPage('games-page');
    }, 2000);
    
    return false;
}

function removeFromWishlist(gameId) {
    let newWishlist = [];
    for (let i = 0; i < wishlistItems.length; i++) {
        if (wishlistItems[i].id !== gameId) {
            newWishlist.push(wishlistItems[i]);
        }
    }
    wishlistItems = newWishlist;
    
    updateWishlistBadge();
    displayWishlist();
    alert('Item removed from wishlist!');
}
function moveToCart(gameId) {
    let itemToMove = null;
    let itemIndex = -1;
    
    for (let i = 0; i < wishlistItems.length; i++) {
        if (wishlistItems[i].id === gameId) {
            itemToMove = wishlistItems[i];
            itemIndex = i;
            break;
        }
    }
  if (itemToMove) {
        let newWishlist = [];
        for (let i = 0; i < wishlistItems.length; i++) {
            if (i !== itemIndex) {
                newWishlist.push(wishlistItems[i]);
            }
        }
        wishlistItems = newWishlist;
        
        updateWishlistBadge();
        displayWishlist();
        alert(itemToMove.title + ' moved to cart!');
    }
}

function updateWishlistBadge() {
    const badge = document.getElementById('wishlist-count');
    if (badge) {
        badge.innerHTML = wishlistItems.length;
    }
}
function processPayment(event) {
    event.preventDefault();
    
    const email = document.getElementById('checkout-email').value;
    const cardName = document.getElementById('card-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    
    if (!email || !cardName || !cardNumber || !expiry || !cvv) {
        alert('Please fill in all fields');
        return false;
    }
 if (cardNumber.length !== 16) {
        alert('Card number must be 16 digits');
        return false;
    }
const spinner = document.getElementById('loading-spinner');
    spinner.style.display = 'block';

    setTimeout(function() {
        spinner.style.display = 'none';
        
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        let randomNum = '';
        for (let i = 0; i < 4; i++) {
            randomNum = randomNum + Math.floor(Math.random() * 10);
        }
        
        const orderNumber = 'ORD-' + year + month + day + '-' + randomNum;
        
        alert('Order placed! Order Number: ' + orderNumber);
        
        document.getElementById('paymentForm').reset();
        showPage('games-page');
    }, 2000);
    
    return false;
}
// GAMES PAGE FUNCTIONS 

function applyFiltersAndSort() {
    var categoryFilter = document.getElementById('category-filter');
    var platformFilter = document.getElementById('platform-filter');
    var priceFilter = document.getElementById('price-filter');
    var sortSelect = document.getElementById('sort-select');
    var searchInput = document.getElementById('search-input');
    
    var category = 'all';
    var platform = 'all';
    var maxPrice = '';
    var sortBy = 'default';
    var searchTerm = '';
    
    if (categoryFilter) {
        category = categoryFilter.value;
    }
    if (platformFilter) {
        platform = platformFilter.value;
    }
    if (priceFilter) {
        maxPrice = priceFilter.value;
    }
    if (sortSelect) {
        sortBy = sortSelect.value;
    }
    if (searchInput) {
        searchTerm = searchInput.value;
        var lowerSearch = '';
        for (var s = 0; s < searchTerm.length; s++) {
            var char = searchTerm.charAt(s);
            if (char >= 'A' && char <= 'Z') {
                lowerSearch = lowerSearch + String.fromCharCode(char.charCodeAt(0) + 32);
            } else {
                lowerSearch = lowerSearch + char;
            }
        }
        searchTerm = lowerSearch;
    }
    var filteredGames = [];
    for (var i = 0; i < games.length; i++) {
        filteredGames[filteredGames.length] = games[i];
    }
    if (category !== 'all') {
        var tempGames = [];
        for (var i = 0; i < filteredGames.length; i++) {
            if (filteredGames[i].category === category) {
                tempGames[tempGames.length] = filteredGames[i];
            }
        }
        filteredGames = tempGames;
    }
    if (platform !== 'all') {
        var tempGames = [];
        for (var i = 0; i < filteredGames.length; i++) {
            if (filteredGames[i].platform === platform) {
                tempGames[tempGames.length] = filteredGames[i];
            }
        }
        filteredGames = tempGames;
    }
    if (maxPrice !== '') {
        var price = 0;
        // Convert string to number
        for (var p = 0; p < maxPrice.length; p++) {
            var digit = maxPrice.charAt(p);
            if (digit >= '0' && digit <= '9') {
                price = price * 10 + (digit.charCodeAt(0) - 48);
            } else if (digit === '.') {
                price = price + 0.01; 
            }
        }
        
        var tempGames = [];
        for (var i = 0; i < filteredGames.length; i++) {
            if (filteredGames[i].price <= price) {
                tempGames[tempGames.length] = filteredGames[i];
            }
        }
        filteredGames = tempGames;
    }
    if (searchTerm !== '') {
        var tempGames = [];
        for (var i = 0; i < filteredGames.length; i++) {
            var title = filteredGames[i].title;
            var lowerTitle = '';
            for (var t = 0; t < title.length; t++) {
                var char = title.charAt(t);
                if (char >= 'A' && char <= 'Z') {
                    lowerTitle = lowerTitle + String.fromCharCode(char.charCodeAt(0) + 32);
                } else {
                    lowerTitle = lowerTitle + char;
                }
            }
            var desc = filteredGames[i].description;
            var lowerDesc = '';
            for (var d = 0; d < desc.length; d++) {
                var char = desc.charAt(d);
                if (char >= 'A' && char <= 'Z') {
                    lowerDesc = lowerDesc + String.fromCharCode(char.charCodeAt(0) + 32);
                } else {
                    lowerDesc = lowerDesc + char;
                }
            }
            var titleFound = false;
            var descFound = false;
            if (lowerTitle.length >= searchTerm.length) {
                for (var t = 0; t <= lowerTitle.length - searchTerm.length; t++) {
                    var match = true;
                    for (var s = 0; s < searchTerm.length; s++) {
                        if (lowerTitle.charAt(t + s) !== searchTerm.charAt(s)) {
                            match = false;
                            break;
                        }
                    }
                    if (match) {
                        titleFound = true;
                        break;
                    }
                }
            }
            if (lowerDesc.length >= searchTerm.length) {
                for (var d = 0; d <= lowerDesc.length - searchTerm.length; d++) {
                    var match = true;
                    for (var s = 0; s < searchTerm.length; s++) {
                        if (lowerDesc.charAt(d + s) !== searchTerm.charAt(s)) {
                            match = false;
                            break;
                        }
                    }
                    if (match) {
                        descFound = true;
                        break;
                    }
                }
            }
            
            if (titleFound || descFound) {
                tempGames[tempGames.length] = filteredGames[i];
            }
        }
        filteredGames = tempGames;
    }
    if (sortBy === 'price-asc') {
        for (var i = 0; i < filteredGames.length - 1; i++) {
            for (var j = 0; j < filteredGames.length - i - 1; j++) {
                if (filteredGames[j].price > filteredGames[j + 1].price) {
                    var temp = filteredGames[j];
                    filteredGames[j] = filteredGames[j + 1];
                    filteredGames[j + 1] = temp;
                }
            }
        }
    } else if (sortBy === 'price-desc') {
        for (var i = 0; i < filteredGames.length - 1; i++) {
            for (var j = 0; j < filteredGames.length - i - 1; j++) {
                if (filteredGames[j].price < filteredGames[j + 1].price) {
                    var temp = filteredGames[j];
                    filteredGames[j] = filteredGames[j + 1];
                    filteredGames[j + 1] = temp;
                }
            }
        }
    } else if (sortBy === 'rating-desc') {
        for (var i = 0; i < filteredGames.length - 1; i++) {
            for (var j = 0; j < filteredGames.length - i - 1; j++) {
                if (filteredGames[j].rating < filteredGames[j + 1].rating) {
                    var temp = filteredGames[j];
                    filteredGames[j] = filteredGames[j + 1];
                    filteredGames[j + 1] = temp;
                }
            }
        }
    } else if (sortBy === 'name-asc') {
        for (var i = 0; i < filteredGames.length - 1; i++) {
            for (var j = 0; j < filteredGames.length - i - 1; j++) {
                if (filteredGames[j].title > filteredGames[j + 1].title) {
                    var temp = filteredGames[j];
                    filteredGames[j] = filteredGames[j + 1];
                    filteredGames[j + 1] = temp;
                }
            }
        }
    }
    displayGamesInContainer(filteredGames);
}

function displayGamesInContainer(gamesToShow) {
    var container = document.getElementById('games-container');
    if (!container) return;
    
    var html = '';
    
    if (gamesToShow.length === 0) {
        html = '<p class="no-results">No games match your filters.</p>';
    } else {
        for (var i = 0; i < gamesToShow.length; i++) {
            var game = gamesToShow[i];
            html = html + '<div class="game-card">';
            html = html + '<img src="' + game.image + '" alt="' + game.title + '">';
            html = html + '<div class="game-info">';
            html = html + '<h3>' + game.title + '</h3>';
            html = html + '<p class="rating">Rating: ' + game.rating + ' ★</p>';
            html = html + '<p class="category">' + game.category + ' | ' + game.platform + '</p>';
            html = html + '<p class="price">$' + game.price + '</p>';
            html = html + '<div class="actions">';
            html = html + '<button class="btn-cart" onclick="addToCart(' + game.id + ')">Add to Cart</button>';
            html = html + '<button class="btn-wish" onclick="addToWishlist(' + game.id + ')">Add to Wishlist</button>';
            html = html + '</div>';
            html = html + '</div>';
            html = html + '</div>';
        }
    }
    
    container.innerHTML = html;
}
function setView(viewType) {
    var container = document.getElementById('games-container');
    var gridBtn = document.getElementById('grid-view-btn');
    var listBtn = document.getElementById('list-view-btn');
    
    if (viewType === 'grid') {
        container.className = 'games-container';
        gridBtn.className = 'view-btn active-view';
        listBtn.className = 'view-btn';
    } else {
        container.className = 'games-container list-view';
        listBtn.className = 'view-btn active-view';
        gridBtn.className = 'view-btn';
    }
}
// ABOUT PAGE FUNCTIONS
function validateContactForm(event) {
    if (event) {
        event.preventDefault();
    }
    var nameInput = document.getElementById('contact-name');
    var emailInput = document.getElementById('contact-email');
    var messageInput = document.getElementById('contact-message');
    
    var name = nameInput.value;
    var email = emailInput.value;
    var message = messageInput.value;
    
    var nameError = document.getElementById('name-error');
    var emailError = document.getElementById('email-error');
    var messageError = document.getElementById('message-error');
    
    nameError.innerHTML = '';
    emailError.innerHTML = '';
    messageError.innerHTML = '';
    
    var isValid = true;
    
    if (name === '') {
        nameError.innerHTML = 'Name cannot be empty.';
        isValid = false;
    }
    
    if (email === '') {
        emailError.innerHTML = 'Email cannot be empty.';
        isValid = false;
    } else {
        var hasAtSymbol = false;
        for (var i = 0; i < email.length; i++) {
            if (email.charAt(i) === '@') {
                hasAtSymbol = true;
                break;
            }
        }
        if (!hasAtSymbol) {
            emailError.innerHTML = 'Email must contain @ symbol.';
            isValid = false;
        }
    }
    if (message === '') {
        messageError.innerHTML = 'Please enter Email.';
        isValid = false;
    }

    if (isValid) {
        alert('Message sent successfully!');
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
    }
    
    return false;

  
   

