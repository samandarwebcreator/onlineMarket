document.addEventListener("DOMContentLoaded", function () {
  let identifyBtn = document.getElementById("identifyBtn");
  let identifySelect = document.getElementById("identify__select");

  if (identifyBtn && identifySelect) {
    identifyBtn.addEventListener("click", function (event) {
      event.preventDefault();
      if (identifySelect.value === "admin") {
        location.href = "http://127.0.0.1:5500/addProduct.html";
        updateLocalStorage("admin");
      } else if (identifySelect.value === "user") {
        location.href = "http://127.0.0.1:5500/index.html";
        updateLocalStorage("user");
      } else {
        alert("Kechirasiz, siz shaxsingizni tasdiqlashingiz lozim!");
      }
    });
  } else {
    // console.log("Identify button or select not found");
  }

  function getLocalStorage() {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user"));
    } else {
      return [];
    }
  }

  function updateLocalStorage(roll) {
    let existingData = getLocalStorage();
    let newData = { roll };
    existingData.push(newData);
    localStorage.setItem("user", JSON.stringify(existingData));
  }
});
