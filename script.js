function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.classList.remove('active');
  });

  document.getElementById(pageId).classList.add('active');
 if (pageId === 'gamespage') {
  displayGamesInContainer(games);
}
if (pageId === 'cartpage') {
  displayCart();
}
if (pageId === 'wishlistpage') {
  displayWishlist();
}

}

document.addEventListener("DOMContentLoaded", function() {
  loadCart();
  updateCartBadge();

  loadWishlist();
  updateWishlistBadge();

  showPage('home');
  displayRecommendedGames();
  displayGamesInContainer(games);
});


const games = [
  {
    id: 1,
    title: "Mythic Heroes",
    price: 29.99,
    rating: 4.5,
    category: "RPG",
    platform: "PC",
    description: "An epic AFK idle RPG adventure.",
    image: "images/home1.png",
    releaseDate: "2022-03-15",
    recommended: true,
    screenshots: [
    "images/game1_1.jpg",
    "images/game1_2.jpeg",
    "images/game1_3.png",
    "images/game1_4.jpg"
  ]
  },
  {
    id: 2,
    title: "Time Princess",
    price: 19.99,
    rating: 4.2,
    category: "Adventure",
    platform: "Mobile",
    description: "Travel back to 17th century Netherlands.",
    image: "images/home2.png",
    releaseDate: "2021-07-10",
    recommended: true,
    screenshots: [
    "images/game2_1.jpeg",
    "images/game2_2.jpg",
    "images/game2_3.jpeg",
    "images/game2_4.jpg"
  ]
  },
  {
    id: 3,
    title: "Subway Surfers",
    price: 9.99,
    rating: 4.8,
    category: "Action",
    platform: "Mobile",
    description: "Endless runner full of excitement.",
    image: "images/home3.png",
    releaseDate: "2019-05-20",
    recommended: true, 
    screenshots: [
    "images/game3_1.jpeg",
    "images/game3_2.jpg",
    "images/game3_3.jpg",
    "images/game3_4.jpg"
  ]
  },
  {
    id: 4,
    title: "Cyber Strike",
    price: 49.99,
    rating: 4.6,
    category: "Action",
    platform: "Console",
    description: "Futuristic combat and survival missions.",
    image: "images/game4.jpg",
    releaseDate: "2023-01-12",
    recommended: true, 
    creenshots: [
    "images/game4_1.jpeg",
    "images/game4_2.jpg",
    "images/game4_3.jpeg",
    "images/game4_4.jpeg"
  ]
  },
  {
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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


var recommendedIndex = 0;
var recommendedGames = [];


function displayRecommendedGames() {
  recommendedGames = games.filter(function(g) { return g.recommended; });
  recommendedIndex = 0;
  renderHeroSlide();
}

function renderHeroSlide() {
  var heroContainer = document.getElementById("hero-container");
  if (!heroContainer) return;

  if (recommendedGames.length === 0) {
    heroContainer.innerHTML = "<p>No recommended games.</p>";
    return;
  }

  var game = recommendedGames[recommendedIndex];

  heroContainer.innerHTML =
    '<div class="hero-game" style="cursor:pointer" onclick="openGameDetail(' + game.id + ')">' +
      '<img src="' + game.image + '" alt="' + game.title + '">' +
      '<h2>' + game.title + '</h2>' +
      '<p>' + game.description + '</p>' +
      '<p><strong>Price:</strong> $' + game.price + '</p>' +
      '<p><strong>Rating:</strong> ' + game.rating + ' ★</p>' +
      '<button class="btn-details" onclick="openGameDetail(' + game.id + '); event.stopPropagation();">View Details</button>' +
    '</div>';
}

function nextHero() {
  if (recommendedGames.length === 0) return;
  recommendedIndex++;
  if (recommendedIndex >= recommendedGames.length) recommendedIndex = 0;
  renderHeroSlide();
}

function prevHero() {
  if (recommendedGames.length === 0) return;
  recommendedIndex--;
  if (recommendedIndex < 0) recommendedIndex = recommendedGames.length - 1;
  renderHeroSlide();
}

function openGameDetail(gameId) {
  // find game
  var game = null;
  for (var i = 0; i < games.length; i++) {
    if (games[i].id === gameId) {
      game = games[i];
      break;
    }
  }
  if (!game) return;

  // text
  document.getElementById("detail-title").textContent = game.title;
  document.getElementById("detail-description").textContent = game.description;
  document.getElementById("detail-category").textContent = game.category;
  document.getElementById("detail-platform").textContent = game.platform;
  document.getElementById("detail-release").textContent = game.releaseDate;
  document.getElementById("detail-rating").textContent = "★ " + game.rating;
  document.getElementById("detail-price").textContent = Number(game.price).toFixed(2);

  // main image
  var mainImg = document.getElementById("detail-main-image");
  mainImg.src = game.image;
  mainImg.alt = game.title;

  // thumbnails (4 distinct via filters)
  var thumbs = document.getElementById("detail-thumbnails");
  var thumbClasses = ["filt1", "filt2", "filt3", "filt4"];
  var thumbsHtml = "";
  for (var t = 0; t < 4; t++) {
    thumbsHtml +=
      '<div class="thumb ' + thumbClasses[t] + '" onclick="setDetailMainImage(\'' + game.image + '\', \'' + escapeQuotes(game.title) + '\')">' +
      '<img src="' + game.image + '" alt="thumbnail ' + (t + 1) + '">' +
      "</div>";
  }
  thumbs.innerHTML = thumbsHtml;

// screenshots (real images)
var shots = document.getElementById("detail-screenshots");
var shotsHtml = "";

if (game.screenshots && game.screenshots.length > 0) {
  for (var s = 0; s < game.screenshots.length; s++) {
    shotsHtml +=
      '<div class="screen">' +
      '<img src="' + game.screenshots[s] + '" alt="screenshot ' + (s + 1) + '">' +
      "</div>";
  }
} else {
  shotsHtml = "<p>No screenshots available.</p>";
}

shots.innerHTML = shotsHtml;

  // reviews 
  var reviews = document.getElementById("detail-reviews");
  var sample = [
    { name: "Alex", text: "Really fun gameplay loop and great pacing. Worth it!" },
    { name: "Sam", text: "Graphics look awesome and the controls feel smooth." },
    { name: "Jordan", text: "Solid game for the price. Would recommend to friends." }
  ];
  var reviewsHtml = "";
  for (var r = 0; r < sample.length; r++) {
    reviewsHtml +=
      '<div class="review">' +
      "<strong>" + sample[r].name + "</strong>" +
      "<p>" + sample[r].text + "</p>" +
      "</div>";
  }
  reviews.innerHTML = reviewsHtml;

  // wire buttons
  var cartBtn = document.getElementById("detail-add-cart-btn");
  var wishBtn = document.getElementById("detail-add-wish-btn");

  cartBtn.onclick = function() { addToCart(game.id); };
  wishBtn.onclick = function() { addToWishlist(game.id); };

  // navigate to detail page
  showPage("gamedetailpage");
}

function setDetailMainImage(src, title) {
  var mainImg = document.getElementById("detail-main-image");
  mainImg.src = src;
  mainImg.alt = title;
}

// helper to safely embed titles with quotes in onclick strings
function escapeQuotes(str) {
  return String(str).replace(/'/g, "\\'").replace(/"/g, '\\"');
}


document.getElementById("newsletterForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const emailInput = document.getElementById("email");
  const errorMessage = document.getElementById("formMessage");

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



// WISHLIST PAGE FUNCTIONS 
var wishlistItems = [];
function loadWishlist() {
  try {
    var saved = localStorage.getItem("gc_wishlist");
    if (saved) wishlistItems = JSON.parse(saved);
  } catch (e) {
    wishlistItems = [];
  }
}

function saveWishlist() {
  localStorage.setItem("gc_wishlist", JSON.stringify(wishlistItems));
}

function addToWishlist(gameId) {
    var gameToAdd = null;
    for (var i = 0; i < games.length; i++) {
        if (games[i].id === gameId) {
            gameToAdd = games[i];
            break;
        }
    }
    
    if (!gameToAdd) return;
    var alreadyInWishlist = false;
    for (var i = 0; i < wishlistItems.length; i++) {
        if (wishlistItems[i].id === gameId) {
            alreadyInWishlist = true;
            break;
        }
    }
    
    if (!alreadyInWishlist) {
        var newIndex = wishlistItems.length;
        wishlistItems[newIndex] = {
            id: gameToAdd.id,
            title: gameToAdd.title,
            price: gameToAdd.price,
            image: gameToAdd.image
        };
      
        saveWishlist();
        updateWishlistBadge();
        displayWishlist();
        alert(gameToAdd.title + ' added to wishlist!');
    } else {
        alert('This game is already added to your wishlist.');
    }
}

function displayWishlist() {
    var container = document.getElementById('wishlist-container');
    if (!container) return;
    
    if (wishlistItems.length === 0) {
        container.innerHTML = '<div class="empty-message">Your wishlist is empty. Browse games to add items!</div>';
        return;
    }
    
    var html = '';
    for (var i = 0; i < wishlistItems.length; i++) {
        var item = wishlistItems[i];
        html = html + '<div class="wishlist-item">';
        html = html + '<img src="' + item.image + '" alt="' + item.title + '">';
        html = html + '<div class="info">';
        html = html + '<h3>' + item.title + '</h3>';
        html = html + '<p class="price">$' + item.price + '</p>';
        html = html + '</div>';
        html = html + '<div class="actions">';
        html = html + '<button class="move-to-cart" onclick="moveToCart(' + item.id + ')">Move to Cart</button>';
        html = html + '<button class="remove" onclick="removeFromWishlist(' + item.id + ')">Remove</button>';
        html = html + '</div>';
        html = html + '</div>';
    }
    
    container.innerHTML = html;
}

function removeFromWishlist(gameId) {
    var newWishlist = [];
    var newIndex = 0;
    
    for (var i = 0; i < wishlistItems.length; i++) {
        if (wishlistItems[i].id !== gameId) {
            newWishlist[newIndex] = wishlistItems[i];
            newIndex++;
        }
    }
    
    wishlistItems = newWishlist;
    saveWishlist();
    updateWishlistBadge();
    displayWishlist();
    alert('Item removed from wishlist!');
}


function updateWishlistBadge() {
    const badge = document.getElementById('wishlist-count');
    if (badge) {
        badge.innerHTML = wishlistItems.length;
    }
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
    addToCart(gameId);
        let newWishlist = [];
        for (let i = 0; i < wishlistItems.length; i++) {
            if (i !== itemIndex) {
                newWishlist.push(wishlistItems[i]);
            }
        }
        wishlistItems = newWishlist;
        saveWishlist();
        updateWishlistBadge();
        displayWishlist();
        alert(itemToMove.title + ' moved to cart!');
    }
}

/* CART */

var cartItems = []; // [{id, qty}]

function loadCart() {
  try {
    var saved = localStorage.getItem("gc_cart");
    if (saved) cartItems = JSON.parse(saved);
  } catch (e) {
    cartItems = [];
  }
}

function saveCart() {
  localStorage.setItem("gc_cart", JSON.stringify(cartItems));
}

function updateCartBadge() {
  var badge = document.getElementById("cart-count");
  if (!badge) return;

  var count = 0;
  for (var i = 0; i < cartItems.length; i++) {
    count += cartItems[i].qty;
  }
  badge.innerHTML = count;
}

function findGameById(gameId) {
  gameId = Number(gameId);
  for (var i = 0; i < games.length; i++) {
    if (Number(games[i].id) === gameId) return games[i];
  }
  return null;
}

function addToCart(gameId) {
  var game = findGameById(gameId);
  if (!game) return;

  var found = false;
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id === gameId) {
      cartItems[i].qty += 1;
      found = true;
      break;
    }
  }
  if (!found) {
    cartItems.push({ id: gameId, qty: 1 });
  }

  saveCart();
  updateCartBadge();
  displayCart();
  alert(game.title + " added to cart!");
}

function removeFromCart(gameId) {
  var newCart = [];
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id !== gameId) newCart.push(cartItems[i]);
  }
  cartItems = newCart;

  saveCart();
  updateCartBadge();
  displayCart();
}

function changeQty(gameId, delta) {
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].id === gameId) {
      cartItems[i].qty += delta;
      if (cartItems[i].qty <= 0) {
        removeFromCart(gameId);
        return;
      }
      break;
    }
  }

  saveCart();
  updateCartBadge();
  displayCart();
}

function money(n) {
  return "$" + Number(n).toFixed(2);
}

function calcTotals() {
  var subtotal = 0;

  for (var i = 0; i < cartItems.length; i++) {
    var game = findGameById(cartItems[i].id);
    if (game) subtotal += game.price * cartItems[i].qty;
  }

  var tax = subtotal * 0.13;
  var total = subtotal + tax;

  return { subtotal: subtotal, tax: tax, total: total };
}

function displayCart() {
  var container = document.getElementById("cart-container");
  if (!container) return;

  if (cartItems.length === 0) {
    container.innerHTML = '<div class="empty-message">Your cart is empty.</div>';

    var totals0 = calcTotals();
    var subEl0 = document.getElementById("cart-subtotal");
    var taxEl0 = document.getElementById("cart-tax");
    var totEl0 = document.getElementById("cart-total");
    if (subEl0) subEl0.innerHTML = money(totals0.subtotal);
    if (taxEl0) taxEl0.innerHTML = money(totals0.tax);
    if (totEl0) totEl0.innerHTML = money(totals0.total);

    var checkoutTotal0 = document.getElementById("checkout-total-display");
    if (checkoutTotal0) checkoutTotal0.innerHTML = money(totals0.total);
    return;
  }

  var html = "";
  for (var i = 0; i < cartItems.length; i++) {
    var it = cartItems[i];
    var game = findGameById(it.id);
    if (!game) continue;

    html += '<div class="cart-item">';
    html += '  <img src="' + game.image + '" alt="' + game.title + '">';
    html += '  <div>';
    html += '    <h3 style="color:#fff; margin-bottom:0.3rem;">' + game.title + "</h3>";
    html += '    <div style="color:#d0d4e0;">' + money(game.price) + " each</div>";
    html += '    <div style="color:#ff9f1c; font-weight:700; margin-top:0.4rem;">Item Total: ' + money(game.price * it.qty) + "</div>";
    html += "  </div>";
    html += '  <div>';
    html += '    <div class="qty-controls">';
    html += '      <button onclick="changeQty(' + game.id + ', -1)">−</button>';
    html += '      <span style="min-width:24px; text-align:center; display:inline-block; color:#fff;">' + it.qty + "</span>";
    html += '      <button onclick="changeQty(' + game.id + ', 1)">+</button>';
    html += "    </div>";
    html += '    <button class="remove" style="margin-top:0.8rem;" onclick="removeFromCart(' + game.id + ')">Remove</button>';
    html += "  </div>";
    html += "</div>";
  }

  container.innerHTML = html;

  var totals = calcTotals();
  var subEl = document.getElementById("cart-subtotal");
  var taxEl = document.getElementById("cart-tax");
  var totEl = document.getElementById("cart-total");
  if (subEl) subEl.innerHTML = money(totals.subtotal);
  if (taxEl) taxEl.innerHTML = money(totals.tax);
  if (totEl) totEl.innerHTML = money(totals.total);

  // also keep checkout total updated
  var checkoutTotal = document.getElementById("checkout-total-display");
  if (checkoutTotal) checkoutTotal.innerHTML = money(totals.total);
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
            html = html + '<img src="' + game.image + '" alt="' + game.title + '" style="cursor:pointer" onclick="openGameDetail(' + game.id + ')">';            html = html + '<div class="game-info">';
            html = html + '<h3 style="cursor:pointer" onclick="openGameDetail(' + game.id + ')">' + game.title + '</h3>';
            html = html + '<p class="rating">Rating: ' + game.rating + ' ★</p>';
            html = html + '<p class="category">' + game.category + ' | ' + game.platform + '</p>';
            html = html + '<p class="price">$' + game.price + '</p>';
            html = html + '<div class="actions">';
            html = html + '<button class="btn-cart" onclick="addToCart(' + Number(game.id) + ')">Add to Cart</button>';
            html = html + '<button class="btn-wish" onclick="addToWishlist(' + Number(game.id) + ')">Add to Wishlist</button>';
            html = html + '<button class="view-btn" onclick="openGameDetail(' + game.id + ')">View Details</button>';
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
        messageError.innerHTML = 'Message cannot be empty.';
        isValid = false;
    }

    if (isValid) {
        alert('Message sent successfully!');
        nameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
    }
    
    return false;}

  // CHECKOUT PAGE FUNCTIONS
function validatePaymentForm(event) {
    event.preventDefault();
    
    var email = document.getElementById('checkout-email').value;
    var cardName = document.getElementById('card-name').value;
    var cardNumber = document.getElementById('card-number').value;
    var expiry = document.getElementById('expiry').value;
    var cvv = document.getElementById('cvv').value;
    
    var emailError = document.getElementById('checkout-email-error');
    var cardNameError = document.getElementById('cardname-error');
    var cardNumberError = document.getElementById('cardnumber-error');
    var expiryError = document.getElementById('expiry-error');
    var cvvError = document.getElementById('cvv-error');
    
    emailError.innerHTML = '';
    cardNameError.innerHTML = '';
    cardNumberError.innerHTML = '';
    expiryError.innerHTML = '';
    cvvError.innerHTML = '';
    
    var isValid = true;
    if (email === '') {
        emailError.innerHTML = 'Email is required.';
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
        if (cardName === '') {
        cardNameError.innerHTML = 'Name on card is required.';
        isValid = false;
    }
    if (cardNumber === '') {
        cardNumberError.innerHTML = 'Card number is required.';
        isValid = false;
    } else if (cardNumber.length !== 16) {
        cardNumberError.innerHTML = 'Card number must be 16 digits.';
        isValid = false;
    } else {
        for (var i = 0; i < cardNumber.length; i++) {
            var char = cardNumber.charAt(i);
            if (char < '0' || char > '9') {
                cardNumberError.innerHTML = 'Card number must contain only numbers.';
                isValid = false;
                break;
            }
        }
    }
    
    if (expiry === '') {
        expiryError.innerHTML = 'Expiry date is required.';
        isValid = false;
    } else if (expiry.length !== 5) {
        expiryError.innerHTML = 'Use MM/YY format (e.g., 12/25).';
        isValid = false;
    } else if (expiry.charAt(2) !== '/') {
        expiryError.innerHTML = 'Use MM/YY format (e.g., 12/25).';
        isValid = false;
    } else {
        var month = expiry.substring(0, 2);
        var year = expiry.substring(3, 5);
        var monthValid = true;
        var yearValid = true;
        
        for (var i = 0; i < month.length; i++) {
            if (month.charAt(i) < '0' || month.charAt(i) > '9') {
                monthValid = false;
                break;
            }
        }
        
        for (var i = 0; i < year.length; i++) {
            if (year.charAt(i) < '0' || year.charAt(i) > '9') {
                yearValid = false;
                break;
            }
        }
        
        if (!monthValid) {
            expiryError.innerHTML = 'Month must be numbers.';
            isValid = false;
        } else if (!yearValid) {
            expiryError.innerHTML = 'Year must be numbers.';
            isValid = false;
        } else {
            var monthNum = 0;
            for (var i = 0; i < month.length; i++) {
                monthNum = monthNum * 10 + (month.charCodeAt(i) - 48);
            }
            
            if (monthNum < 1 || monthNum > 12) {
                expiryError.innerHTML = 'Month must be between 01 and 12.';
                isValid = false;
            }
        }
    }
    if (cvv === '') {
        cvvError.innerHTML = 'CVV is required.';
        isValid = false;
    } else if (cvv.length !== 3 && cvv.length !== 4) {
        cvvError.innerHTML = 'CVV must be 3 or 4 digits.';
        isValid = false;
    } else {
        for (var i = 0; i < cvv.length; i++) {
            if (cvv.charAt(i) < '0' || cvv.charAt(i) > '9') {
                cvvError.innerHTML = 'CVV must contain only numbers.';
                isValid = false;
                break;
            }
        }
    }
    if (isValid) {
        processPayment();
    }
    
    return false;
}

function processPayment() {
  // Show loading spinner
  var spinner = document.getElementById('loading-spinner');
  if (spinner) spinner.className = 'loading-spinner';

  setTimeout(function() {
    if (spinner) spinner.className = 'loading-spinner hidden';

    // Build order number: ORD-YYYYMMDD-####
    var date = new Date();
    var yyyy = date.getFullYear();
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var dd = String(date.getDate()).padStart(2, '0');
    var rand4 = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    var orderNumber = 'ORD-' + yyyy + mm + dd + '-' + rand4;

    // Order date: DD/MM/YYYY
    var orderDate = dd + '/' + mm + '/' + yyyy;

    var email = document.getElementById('checkout-email').value;

    // totals from YOUR cart structure: [{id, qty}]
    var subtotal = calculateCartSubtotal();
    var tax = subtotal * 0.13;
    var total = subtotal + tax;

    // Fill receipt page
    renderReceipt(orderNumber, orderDate, email, subtotal, tax, total);

    // Clear cart after successful checkout
    clearCart();

    // Go to receipt page
    showPage('receiptpage');

    // Reset the form
    var form = document.getElementById('paymentForm');
    if (form) form.reset();

  }, 1500);
}

function calculateCartSubtotal() {
  var subtotal = 0;

  for (var i = 0; i < cartItems.length; i++) {
    var it = cartItems[i];
    var game = findGameById(it.id);
    if (game) subtotal += game.price * it.qty;
  }

  return subtotal;
}

function renderReceipt(orderNumber, orderDate, email, subtotal, tax, total) {
  document.getElementById('r-order-number').textContent = orderNumber;
  document.getElementById('r-order-date').textContent = orderDate;
  document.getElementById('r-email').textContent = email;

  var itemsContainer = document.getElementById('r-items');
  itemsContainer.innerHTML = '';

  // cartItems is: [{id, qty}]
  for (var i = 0; i < cartItems.length; i++) {
    var it = cartItems[i];
    var game = findGameById(it.id);
    if (!game) continue;

    var lineTotal = game.price * it.qty;

    var row = document.createElement('div');
    row.className = 'summary-row';
    row.innerHTML =
      '<span>' + game.title + ' × ' + it.qty + '</span>' +
      '<span>$' + lineTotal.toFixed(2) + '</span>';

    itemsContainer.appendChild(row);
  }

  document.getElementById('r-subtotal').textContent = '$' + subtotal.toFixed(2);
  document.getElementById('r-tax').textContent = '$' + tax.toFixed(2);
  document.getElementById('r-total').textContent = '$' + total.toFixed(2);
}

function clearCart() {
  cartItems = [];
  saveCart();
  updateCartBadge();
  displayCart();

  // keep checkout total updated too
  var checkoutTotal = document.getElementById("checkout-total-display");
  if (checkoutTotal) checkoutTotal.innerHTML = "$0.00";
}
