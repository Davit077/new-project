// fetch("https://67c03334b9d02a9f2248b967.mockapi.io/mock-api/card")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("response is not ok");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     const toyContainer = document.getElementById("product-list");
//     data.forEach((toy) => {
//       const toyCard = document.createElement("div");
//       toyCard.classList.add("toy-card");

//       toyCard.innerHTML = `
//         <img src="${toy.img}" alt="${toy.name}">
//         <h2>${toy.name} </h2>
//         <p>Price: $${toy.price} </p>
//         `;
//       toyContainer.appendChild(toyCard);
//     });
//   })
//   .catch((error) => {
//     console.error("შეცდომა", error);
//   });

// fetch("https://67c03334b9d02a9f2248b967.mockapi.io/mock-api/card-hover")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Response is not ok");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     const toyContainer = document.getElementById("hov");
//     data.forEach((toy) => {
//       const toyCard = document.createElement("div");
//       toyCard.classList.add("card-hover");
//       toyCard.innerHTML = `
//         <div class="photo">
//         <img id="hov" src="${toy.img}" alt="${toy.name}">
//         </div>
//         <h2>${toy.name}</h2>
//         <p>Price: $${toy.price}</p>
//         `;
//       toyContainer.appendChild(toyCard);
//     });
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error);
//   });
// // Fetch data from the mock API
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
    // Display products
    data.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "toy-card"; // Apply class "toy-card"
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
        popupDescription.textContent =
          product.description || "No description available";
        popup.style.display = "block";
        overlay.style.display = "block";
      });
      productList.appendChild(productCard);
    });
    // Close popup
    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
      overlay.style.display = "none";
    });
    // Add to cart
    addToCartBtn.addEventListener("click", () => {
      alert(`Added ${selectedProduct.name} to cart`);
      popup.style.display = "none";
      overlay.style.display = "none";
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
