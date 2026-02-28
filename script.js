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
  
   

