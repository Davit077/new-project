fetch("https://67c03334b9d02a9f2248b967.mockapi.io/mock-api/card")
  .then((response) => {
    if (!response.ok) {
      throw new Error("response is not ok");
    }
    return response.json();
  })
  .then((data) => {
    const toyContainer = document.getElementById("product-list");
    data.forEach((toy) => {
      const toyCard = document.createElement("div");
      toyCard.classList.add("toy-card");

      toyCard.innerHTML = `
        <img src="${toy.img}" alt="${toy.name}">
        <h2>${toy.name} </h2>
        <p>Price: $${toy.price} </p>
        `;
      toyContainer.appendChild(toyCard);
    });
  })
  .catch((error) => {
    console.error("შეცდომა", error);
  });

fetch("https://67c03334b9d02a9f2248b967.mockapi.io/mock-api/card-hover")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Response is not ok");
    }
    return response.json();
  })
  .then((data) => {
    const toyContainer = document.getElementById("hov");
    data.forEach((toy) => {
      const toyCard = document.createElement("div");
      toyCard.classList.add("card-hover");
      toyCard.innerHTML = `
        <div class="photo">
        <img id="hov" src="${toy.img}" alt="${toy.name}">
        </div>
        <h2>${toy.name}</h2>
        <p>Price: $${toy.price}</p>
        `;
      toyContainer.appendChild(toyCard);
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
