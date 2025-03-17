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
      // alert(`Added ${selectedProduct.name} to cart`);
      // popup.style.display = "none";
      // overlay.style.display = "none";
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

  function increaseQuantity() {
    let input = document.getElementById("quantity");
    input.value = parseInt(input.value) + 1;
}
function decreaseQuantity() {
    let input = document.getElementById("quantity");
    if (input.value > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

function addToCart() {
  let quantity = document.getElementById("quantity").value;
  alert("Added " + quantity + " item(s) to your cart!");
}
function buyNow() {
  alert("Proceeding to checkout...");
}
let basketCount = 0;
function addToBasket() {
    basketCount++;
    document.getElementById('basket-count').textContent = basketCount;
}