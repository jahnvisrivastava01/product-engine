
let productInventory = []; 
let shoppingCart = [];


const productGrid = document.getElementById("productGrid");
const cartItemsContainer = document.getElementById("cartItems");
const totalPriceDisplay = document.getElementById("totalPrice");
const loadButton = document.getElementById("loadBtn");
const filterButton = document.getElementById("filterBtn");
const clearCartButton = document.getElementById("clearCartBtn");


loadButton.addEventListener("click", async () => {
    
    productGrid.innerHTML = `<p class="status-text" style="color: #eab308;">📡 Fetching marketplace catalog values...</p>`;
    try {
        const response = await fetch("https://api.restful-api.dev/objects");
        const data = await response.json();

        productInventory = [
            { id: 101, title: "Mechanical Keyboard", price: 1200 },
            { id: 102, title: "Ergonomic Wired Mouse", price: 450 },
            { id: 103, title: "UltraWide Monitor 4K", price: 15000 },
            { id: 104, title: "USB-C Interface Hub", price: 350 }
        ];
        renderProducts(productInventory);
    } catch (error) {
        productGrid.innerHTML = `<p class="status-text" style="color: #b91c1c;">❌ Network Fail: ${error.message}</p>`;
    }
});


function renderProducts(productsArray) {
    
    const productHTML = productsArray.map(item => `
        <div class="product-card">
            <div>
                <h4>${item.title}</h4>
                <p>₹${item.price}</p>
            </div>
            <button onclick="addToCart(${item.id})">➕ Add to Cart</button>
        </div>
    `);
    productGrid.innerHTML = productHTML.join('');
}


filterButton.addEventListener("click", () => {
    const premiumItems = productInventory.filter(item => item.price > 500);
    renderProducts(premiumItems);
});

function addToCart(productId) {
    const selectedItem = productInventory.find(item => item.id === productId);
    if (selectedItem) {
        shoppingCart.push(selectedItem);
        localStorage.setItem("localCartSnapshot", JSON.stringify(shoppingCart));
        updateCartUI();
    }
}


function updateCartUI() {
    const cartHTML = shoppingCart.map(item => `
        <div class="cart-item">
            <span>${item.title}</span>
            <strong>₹${item.price}</strong>
        </div>
    `);
    cartItemsContainer.innerHTML = cartHTML.join("");

    let total = 0;
    for (let item of shoppingCart) {
        total += item.price;
    }
    totalPriceDisplay.textContent = `₹${total}`;
}


clearCartButton.addEventListener("click", () => {
    localStorage.removeItem("localCartSnapshot");
    shoppingCart = [];
    updateCartUI();
});

window.addEventListener("DOMContentLoaded", () => {
    const savedDataString = localStorage.getItem("localCartSnapshot");
    if (savedDataString) {
        shoppingCart = JSON.parse(savedDataString);
        updateCartUI();
    }
});