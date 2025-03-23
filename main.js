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
    let quantity = 1;

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
      if (!selectedProduct) return;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let existingItem = cart.find((item) => item.id === selectedProduct.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ ...selectedProduct, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartUI();
      document.getElementById("cart-sidebar").classList.add("open");
      popup.style.display = "none";
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

  const totalPriceElement = document.getElementById("total-price");

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<li>Your cart is empty</li>";

    cartCount.textContent = "0";

    totalPriceElement.textContent = "Total Price: $0.00";
  } else {
    let totalPrice = 0;

    cart.forEach((item) => {
      const li = document.createElement("li");

      const itemPrice = parseFloat(item.price.replace("$", "")) * item.quantity;

      totalPrice += itemPrice;

      li.innerHTML = `
<img src="${item.img}" width="50">
<span>${item.name}</span>
<strong>$${itemPrice.toFixed(2)}</strong>
<button class="delete-btn" data-id="${item.id}">
<i class="fa-solid fa-trash"></i>
</button>
<div class="cart-item-bottom">
<button class="decrease-btn" data-id="${item.id}">-</button>
<span class="item-quantity">${item.quantity}</span>
<button class="increase-btn" data-id="${item.id}">+</button>
</div>

      `;

      cartItems.appendChild(li);

      li.querySelector(".increase-btn").addEventListener("click", () => {
        increaseQuantity(item.id);
      });

      li.querySelector(".decrease-btn").addEventListener("click", () => {
        decreaseQuantity(item.id);
      });

      li.querySelector(".delete-btn").addEventListener("click", () => {
        removeFromCart(item.id);
      });
    });

    cartCount.textContent = cart.length;

    totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
  }
}

function increaseQuantity(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((item) => item.id === id);

  if (item) {
    item.quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  }
}

function decreaseQuantity(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((item) => item.id === id);

  if (item && item.quantity > 1) {
    item.quantity--;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  }
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

updateCartUI();

document
  .getElementById("payment-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const cardNumber = document.getElementById("card-number").value;
    const expiryDate = document.getElementById("expiry-date").value;
    const cvv = document.getElementById("cvv").value;
    const cardHolder = document.getElementById("card-holder").value;
    if (!cardNumber.match(/^\d{16}$/)) {
      alert("Please enter a valid 16-digit card number.");
      return;
    }
    if (!expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      alert("Please enter a valid expiration date in MM/YY format.");
      return;
    }
    if (!cvv.match(/^\d{3,4}$/)) {
      alert("Please enter a valid CVV (3 or 4 digits).");
      return;
    }
    if (cardHolder.trim() === "") {
      alert("Please enter the card holder's name.");
      return;
    }
    alert("Payment processing...");
  });

//post method

// document.getElementsByClassName('toy-card').addEventListener('click', () => {
//   let cart = JSON.parse(localStorage.getItem("cart"));
//   if (cart.length === 0) {
//       alert("Your cart is empty.");
//       return;
//   }
//   fetch("https://67c03334b9d02a9f22d8b967.mockapi.io/mock-apj/cart", {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(cart),
//   })
//   .then(response => response.json())
//   .then(data => {
//       console.log('Cart successfully posted to MockAPI:', data);
//       alert('Your cart has been successfully checked out!');
//       localStorage.removeItem("cart");
//       updateCartUI();
//   })
//   .catch(error => {
//       console.error('Error posting cart data:', error);
//       alert('There was an error checking out.');
//   });
// });

//delete method

// function deleteProductById(id) {
//   fetch(`https://67c033334b9d02a9f2248b967.mockapi.io/mock-api/card/${id}`, {
//       method: 'DELETE',
//   })
//   .then(response => {
//       if (response.ok) {
//           console.log(`Product with id ${id} has been deleted.`);
//       } else {
//           console.error(`Failed to delete product with id ${id}.`);
//       }
//   })
//   .catch(error => {
//       console.error(`Error deleting product with id ${id}.`, error);
//   });
// }

// deleteProductById(5);
// deleteProductById(6);
