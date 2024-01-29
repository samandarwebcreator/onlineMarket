document.addEventListener("DOMContentLoaded", function () {
  // let addedProducts = document.getElementById("addedProducts");
  let productbtn = document.getElementById("productbtn");
  let titleAdd = document.getElementById("titleAdd");
  let priceAdd = document.getElementById("priceAdd");
  let descAdd = document.getElementById("descAdd");
  let imageAdd = document.getElementById("imageAdd");
  let selectOption = document.getElementById("category__select");

  productbtn.addEventListener("click", function (event) {
    event.preventDefault();
    const uidOfProducts = new Date().getTime().toString().slice(-3, -1);

    // Read the image file
    const imageFile = imageAdd.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const newObj = {
        id: uidOfProducts,
        title: titleAdd.value,
        category: [selectOption.value],
        price: priceAdd.value,
        img: e.target.result,
        desc: descAdd.value,
        discount: "-50%",
      };

      const productsArray = getNewLocalStorage();
      productsArray.push(newObj);

      localStorage.setItem("products", JSON.stringify(productsArray));

      displayProducts();

      titleAdd.value = "";
      priceAdd.value = "";
      descAdd.value = "";
      imageAdd.value = "";
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
  });

  function getNewLocalStorage() {
    if (localStorage.getItem("products")) {
      return JSON.parse(localStorage.getItem("products"));
    } else {
      return [];
    }
  }
  function displayProducts() {
    const addedProducts = document.getElementById("addedProducts");

    if (!addedProducts) {
      console.error("Element with ID 'addedProducts' not found.");
      return;
    }

    const productsArray = getNewLocalStorage();

    addedProducts.innerHTML = productsArray
      .map((item) => {
        if (!item || typeof item !== "object") {
          return "";
        }

        return `
          <div id="stock__card-wrapper" class="stock__card-wrapper" data-id="${
            item.id
          }">
            <div id="stock__card-box">
              <div id="stock__imageCard-box">
                <button id="stock__like-btn">
                  <img src="./assets/icons/heart.svg" alt="like button" />
                </button>
                <img src="${item.img}" alt="${encodeURIComponent(
          item.title
        )}" style="width: 100%; height: 100%;">
                ${
                  item.discount
                    ? `<p id="stock__card-discount">${item.discount}</p>`
                    : ""
                }
              </div>
              <div id="stock__cardContext">
                <div>
                  <h3 id="stock__price-title" class="new__price-title">
                    ${item.price} ₽
                  </h3>
                  <p id="stock__card-description">
                    ${item.desc}
                  </p>
                  <div id="stock__stars-box">
                    <img src="./assets/icons/yellow-star.svg" alt="star" width="16" height="16" />
                    <img src="./assets/icons/yellow-star.svg" alt="star" width="16" height="16" />
                    <img src="./assets/icons/grey-star.svg" alt="star" width="16" height="16" />
                    <img src="./assets/icons/grey-star.svg" alt="star" width="16" height="16" />
                    <img src="./assets/icons/grey-star.svg" alt="star" width="16" height="16" />
                  </div>
                  <button id="stock__basket-btn">В корзину</button>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  displayProducts();
});
