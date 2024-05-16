document.addEventListener("scroll", () => {
  const navBar = document.querySelector("nav");
  if (window.scrollY > 0) {
    navBar.classList.add("scroll");
  } else {
    navBar.classList.remove("scroll");
  }
});
let products =
  "https://662fe35943b6a7dce3111756.mockapi.io/blog/api/1/products";

const coffeeProductsElem = document.querySelector("#coffeeProducts");
const pagElem = document.querySelector(".pag");
const face = document.querySelector(".face");
const inistigram = document.querySelector(".ins");
const telegram = document.querySelector(".telegram");
const itBrains = document.querySelector(".itBrains");
const kontaktHome = document.querySelector(".kontaktHome");
const irshadElectroniks = document.querySelector(".irshad");
const searchInput = document.querySelector(".searchInput");
const productCountElement = document.querySelector(".productCount");
const textArea = document.querySelector(".formElement");
const countCharacter = document.querySelector(".countCharacter");


let globalFilteredList = [];
let globalData = [];
let cardList = [];

//web site product add
let localCartList = JSON.parse(localStorage.getItem("cardList"));
if (localCartList) {
  cardList = [...localCartList];
  productCountElement.innerText = cardList.length;
}

fetch(products)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => {
      globalData.push(item);
    });
    pagBtnCreate();
    showPosts();
  });

function pagBtnCreate(list = globalData) {
  pagElem.innerHTML = "";
  let count = list.length / 14;
  if (count > 1) {
    for (let index = 1; index <= count; index++) {
      pagElem.innerHTML += `<button onclick="getPagination(${index})">${index}</button> `;
    }
  } else {
    pagElem.innerHTML += `<button onclick="getPagination(1)">1</button>`;
  }
}

function showPosts(list = globalData, start = 0, end = 14) {
  coffeeProductsElem.innerHTML = "";
  if (list.length) {
    list.forEach((item, index) => {
      if (index >= start && index < end) {
        coffeeProductsElem.innerHTML += `
         <div class="coffeeProduct" data-aos="flip-left"   data-aos-duration="2000"
  data-aos-easing="ease-in-out"
  data-aos-mirror="true">
  <img src="${item.image}"/>
  <h3>${item.title}</h3>
  <p>${item.description}</p>
  <div class="price">
      <span>${item.price} AZN</span>
     
      <button onclick="addToCard(${item.id})">Add to card</button>
  </div>
</div>
      `;
      }
    });
  } else {
    coffeeProductsElem.innerHTML = "<h1>PRODUCT NOT FOUND</h1>";
  }
}

function getPagination(index) {
  let x = (index - 1) * 14;
  let y = index * 14;
  showPosts(globalData, x, y);
}

searchInput.addEventListener("keyup", (e) => {
  let val = e.target.value.trim().toLowerCase();

  globalFilteredList = globalData.filter((item) => {
    let title = item.title.toLowerCase();
    // let description = item.description.toLowerCase();
     return title.includes(val);
    // || description.includes(val);
  });

  showPosts(globalFilteredList);
  pagBtnCreate(globalFilteredList);
  console.log(globalFilteredList);
});

function addToCard(id) {
  let cardProduct = cardList.find((item) => item.id == id);
  if (cardProduct) {
    cardProduct.count++;
  } else {
    const foundProducts = globalData.find((item) => item.id == id);
    let newProducts = structuredClone(foundProducts);
    newProducts.count = 1;
    cardList.push(newProducts);
    productCountElement.innerText = cardList.length;
  }

  localStorage.setItem("cardList", JSON.stringify(cardList));

  console.log(products, cardList);
}

//End web site product add

//Reklam function//
itBrains.addEventListener("click", function () {
  window.open("https://itbrains.edu.az/Programming/FrontEnd", "_blank");
});

kontaktHome.addEventListener("click", function () {
  window.open("https://kontakt.az/", "_blank");
});

irshadElectroniks.addEventListener("click", function () {
  window.open("https://irshad.az/", "_blank");
});

//-------------End Reklam function----------------//

//social icon function//
face.addEventListener("click", function (event) {
  window.open(
    "https://www.facebook.com/profile.php?id=61558675480558",
    "_blank"
  );
});

inistigram.addEventListener("click", function (event) {
  window.open("https://www.instagram.com/mycoffeeshop2/", "_blank");
});

telegram.addEventListener("click", function (event) {
  window.open("https://t.me/Telegram", "_blank");
});

//End social icon function //


//Message Character Limit//
 textArea.addEventListener("input", function (event) {
  const target = event.target;
  const maxLenght =event.target.getAttribute("data-max-character");
  const currentlenght = target.value.length;

if (currentlenght>maxLenght) {
  event.target.value=value.substr(0,maxLenght);
}
  countCharacter.innerHTML = `${currentlenght}/${maxLenght}`;
 });

 //End Message Character LImit//
