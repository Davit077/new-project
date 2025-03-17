fetch("https://67c03334b9d02a9f2248b967.mockapi.io/mock-api/card") 
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    const productList = document.getElementById("product-list");
    const popup = document.getElementById("popup");
    const popupImg = document.getElementById("popup-img");
    const popupName = document.getElementById("popup-name");
    const popupPrice = document.getElementById("popup-price");
    const popupDescription = document.getElementById("popup-description");
    const closeBtn = document.getElementById("closeBtn");
    const addToCartBtn = document.getElementById("addToCart");
    const overlay = document.getElementById("overlay");
    let selectedProduct = null;
     data.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "toy-card"; 
      productCard.innerHTML = `
<img src="${product.img}" alt="${product.name}" style="width:100%;">
<h2>${product.name}</h2>
<p>Price: $${product.price}</p>
                   `;
      productCard.addEventListener("click", () => {
        selectedProduct = product;
        popupImg.src = product.img;
        popupName.textContent = product.name;
        popupPrice.textContent = `Price: $${product.price}`;
        popup.style.display = "block"; 
        overlay.style.display = "block";
      });
      productList.appendChild(productCard);
    });
     closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
      overlay.style.display = "none";
     });
    addToCartBtn.addEventListener("click", () => {
    }); 
    addToCartBtn.addEventListener("click", () => {
      if (!selectedProduct) return;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let existingItem = cart.find(item => item.id === selectedProduct.id);

      if (existingItem) {
          existingItem.quantity += quantity;
      } else {
          cart.push({ ...selectedProduct, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartUI();
      document.getElementById("cart-sidebar").classList.add("open"); // kalatis gaxsna
      popup.style.display = "none"; // Popup'u gauqmeba
  });

  updateCartUI();
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  }); 
document.querySelector(".fa-bag-shopping").addEventListener("click", () => {
  document.getElementById("cart-sidebar").classList.add("open");
});

document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart-sidebar").classList.remove("open");
});

function updateCartUI() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
 
 
  cartItems.innerHTML = "";

  if (cart.length === 0) {
      // kalata tu carielia es vanaxot
      cartItems.innerHTML = "<li> your cart is empty</li>";
      cartCount.textContent = "0";
  } else {
     
      cart.forEach(item => {
          const li = document.createElement("li");
          li.innerHTML = `
              <img src="${item.img}" width="50">
              <span>${item.name}</span>
              <strong>${item.price} </strong>
              <button class="delete-btn" onclick="removeFromCart(${item.id})">
                  <i class="fa-solid fa-trash"></i>
              </button>
          `;
          cartItems.appendChild(li);
      });
      cartCount.textContent = cart.length;
  }
}
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id != id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

updateCartUI();