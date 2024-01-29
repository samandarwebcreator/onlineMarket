window.addEventListener("DOMContentLoaded", () => {
  let allProducts = JSON.parse(localStorage.getItem("products")) || [];

  let likesHTML = allProducts
    .map(
      (item) => `
      <div id="stock__card-wrapper" class="favourites__wrapper" data-id="${
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
    `
    )
    .join("");

  let theBox = document.querySelector(".allProducts__main-box");
  theBox.innerHTML = likesHTML;
});
