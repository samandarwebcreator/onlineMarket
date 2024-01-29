const inp = document.getElementById("mailInput");
const password = document.getElementById("passwordInput");
const btn = document.getElementById("btn");
const errorMessage = document.querySelector(".error__message");
let profileImage = document.getElementById("profileImage");
const selectAdmin = document.getElementById("selectAdmin");

const uid = new Date().getTime().toString().slice(-5, -1);
let image = "https://picsum.photos/id/1/200/300";

function getLocalStorage() {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return [];
  }
}

function addLocalStorage(id, username, watchword, image) {
  let item = { id, username, watchword, image };

  let newArray = getLocalStorage();
  newArray.push(item);
  localStorage.setItem("user", JSON.stringify(newArray));
}

errorMessage.style.display = "none";

btn.addEventListener("click", (e) => {
  e.preventDefault();

  if (inp.value === "" && password.value === "") {
    console.log("error");
    errorMessage.style.display = "block";
  } else {
    addLocalStorage(uid, inp.value, password.value, profileImage.value);
    return (location.href = "http://127.0.0.1:5500/identifyUser.html");
  }
});
