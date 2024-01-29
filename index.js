let headerSelect = document.getElementById("header__select");
let stockSections = [
  document.querySelector(".stock__card-wrapper"),
  document.querySelector(".stock__secondCard-wrapper"),
  document.querySelector(".stock__thirdCard-wrapper"),
];
let selectStockBox = document.querySelector(".select__stock-box");

const menu = [
  {
    id: 1,
    title: "Блинчики",
    category: ["Акции"],
    price: 44.5,
    img: "./assets/images/biscuit-image.jpg",
    desc: "Г/Ц Блинчики с мясом вес, <br/> Россия",
  },
  {
    id: 2,
    title: "Молоко",
    category: ["Акции", "Новинки", "Покупали раньше"],
    price: 44.5,
    img: "./assets/images/milk-imag.jpg",
    desc: "Молоко ПРОСТОКВАШИНО паст. питьевое цельное отборное...",
  },
  {
    id: 3,
    title: "Колбаса",
    category: ["Акции", "Новинки"],
    price: 44.5,
    img: "./assets/images/sausage-image.jpg",
    desc: "Колбаса сырокопченая МЯСНАЯ ИСТОРИЯ Сальчичон и Тоскан...",
  },
  {
    id: 4,
    title: "Сосиски",
    category: ["Акции", "Новинки", "Покупали раньше"],
    price: 20.99,
    img: "./assets/images/saus-image.jpg",
    desc: "Сосиски вареные МЯСНАЯ ИСТОРИЯ Молочные и С сыро...",
  },
  {
    id: 5,
    title: "Худший",
    category: ["Новинки", "Покупали раньше"],
    price: 599.99,
    img: "./assets/images/sliced-sausage.png",
    desc: "Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»",
  },
  {
    id: 6,
    title: "Комбайн",
    category: ["Покупали раньше"],
    price: 77.99,
    img: "./assets/images/sliced-sausage.jpg",
    desc: "Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»",
  },
];

function getNewLocalStorage() {
  if (localStorage.getItem("products")) {
    return JSON.parse(localStorage.getItem("products"));
  } else {
    return [];
  }
}

function addNewLocalStorage(id, title, category, price, img, desc) {
  let item = { id, title, category, price, img, desc };
  let allProducts = getNewLocalStorage();

  const existingItem = allProducts.find((product) => product.id === id);

  if (!existingItem) {
    allProducts.push(item);
    localStorage.setItem("products", JSON.stringify(allProducts));
  }
}

window.addEventListener("DOMContentLoaded", () => {
  menu.forEach((item) => {
    addNewLocalStorage(
      item.id,
      item.title,
      item.category,
      item.price,
      item.img,
      item.desc
    );
  });
});

window.addEventListener("DOMContentLoaded", function () {
  function generateCardHTML(item) {
    return `
      <div class="stock__card-wrapper" data-id="${item.id}">
        <div id="stock__card-box">
          <div id="stock__imageCard-box">
            <button class="like__button">
              <img class="like__image" src="./assets/icons/heart.svg" alt="like button" />
            </button>
            <img src="${
              item.img
            }" alt="${item.title}" style="width: 100%; height: 100%;">
            ${
              item.category.includes("Акции")
                ? '<p id="stock__card-discount">-50%</p>'
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
                ${Array(2)
                  .fill(
                    '<img src="./assets/icons/yellow-star.svg" alt="star" width="16" height="16" />'
                  )
                  .join("")}
                ${Array(3)
                  .fill(
                    '<img src="./assets/icons/grey-star.svg" alt="star" width="16" height="16" />'
                  )
                  .join("")}
              </div>
              <button class="stock__basket-btn" id="stock__basket-btn">В корзину</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function displayStockSection(sectionIndex, categoryFilter) {
    let mappedArray = getNewLocalStorage("products");
    const displayCards = mappedArray
      .filter((item) => item.category.includes(categoryFilter))
      .map(generateCardHTML)
      .join("");

    stockSections[sectionIndex].innerHTML = displayCards;
  }

  ["Акции", "Новинки", "Покупали раньше"].forEach((category, index) =>
    displayStockSection(index, category)
  );
});

selectStockBox.style.display = "none";

headerSelect.addEventListener("change", function () {
  const selectedCategory = headerSelect.value;
  selectStockBox.style.display = selectedCategory ? "block" : "none";
  if (selectedCategory) {
    const displaySelected = menu
      .filter((item) => item.title === selectedCategory)
      .map(generateCardHTML)
      .join("");
    selectStockBox.innerHTML = displaySelected;
  }
});

// Search input
let srchInp = document.getElementById("srchInp");
let srchBtn = document.getElementById("srchBtn");

srchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const searchTerm = srchInp.value;
  selectStockBox.style.display = searchTerm ? "block" : "none";
  if (searchTerm) {
    const displaySearchResults = menu
      .filter((item) => item.title === searchTerm)
      .map(generateCardHTML)
      .join("");
    selectStockBox.innerHTML = displaySearchResults;
  }
});

// Username codes...
let userName = document.querySelector(".header__user-name");

function getLocalStorage() {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];
}

let avatarName = getLocalStorage()[0].username;

userName.innerHTML = avatarName;

let userBtn = document.getElementById("header__user-btn");
let userWrapper = document.getElementById("header__user-wrapper");

let userSettings = ["Редактировать", "Настройки", "Помощь", "Выйти"];

let userSelectState = false;

userBtn.addEventListener("click", function () {
  userSelectState = !userSelectState;

  if (userSelectState) {
    userBtn.classList.add("active");
    if (userWrapper.innerHTML.trim() === "") {
      userWrapper.innerHTML = userSettings
        .map((setting) => `<a>${setting}</a>`)
        .join("");
    } else {
      userWrapper.style.display = "flex";
    }
  } else {
    userBtn.classList.remove("active");
    userWrapper.style.display = "none";
  }
});

function getLikesStorage() {
  if (localStorage.getItem("likes")) {
    return JSON.parse(localStorage.getItem("likes"));
  } else {
    return [];
  }
}

document.addEventListener("click", (event) => {
  const target = event.target;
  const likedCard = target.closest(".stock__card-wrapper");
  const likeButton = target.closest(".like__button");

  if (likeButton) {
    const itemId = likedCard.getAttribute("data-id");

    const likedItem = menu.find((item) => item.id == itemId);
    let likes = getLikesStorage();

    if (likedItem) {
      if (!likes.some((item) => item.id == likedItem.id)) {
        likes.push(likedItem);
        localStorage.setItem("likes", JSON.stringify(likes));
      }
    }
  }
});

function getBasketStorage() {
  if (localStorage.getItem("basket")) {
    return JSON.parse(localStorage.getItem("basket"));
  } else {
    return [];
  }
}

document.addEventListener("click", (event) => {
  const target = event.target;
  const basketCard = target.closest(".stock__card-wrapper");

  if (target.classList.contains("stock__basket-btn")) {
    const itemId = basketCard.getAttribute("data-id");
    console.log("Clicked basket button for item with ID:", itemId);

    const basketItem = menu.find((item) => item.id == itemId);
    let basket = getBasketStorage();
    console.log("Corresponding item in menu array:", basketItem);

    if (basketItem) {
      console.log("Current items in basket:", basket);

      if (!basket.some((item) => item.id == basketItem.id)) {
        basket.push(basketItem);
        localStorage.setItem("basket", JSON.stringify(basket));
        console.log("Updated items in basket:", basket);

        // Additional logic if needed
        // displayBasketProducts();
      }
    }
  }
});

let favouritesButton = document.getElementById("favourites__button");
favouritesButton.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/favourites.html";
});

let basketButton = document.getElementById("basket__button");
basketButton.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/basket.html";
});

let productButton = document.getElementById("products__button");

productButton.addEventListener("click", () => {
  location.href = "http://127.0.0.1:5500/allProducts.html";
});
