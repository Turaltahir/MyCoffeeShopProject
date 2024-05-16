let users = "https://662fe35943b6a7dce3111756.mockapi.io/blog/api/1/users";
let posts = "https://662fe35943b6a7dce3111756.mockapi.io/blog/api/1/products";

let loginFormElem = document.querySelector(".login form");
let blogFormElem = document.querySelector(".wrapper form");
const loginElem = document.querySelector(".login");
const wrapperElem = document.querySelector(".wrapper");
const welcomeElem = document.querySelector(".welcome");
const tBodyElem = document.querySelector(".table tbody");

loginFormElem.onsubmit = (e) => {
  e.preventDefault();
  fetch(
    `${users}?username=${e.target.username.value}&password=${e.target.password.value}`
  )
    .then((res) => {
      if (res.ok) {
        loginElem.style.display = "none";
        wrapperElem.style.display = "block";
        getBlogPosts();
        blogFormElem.addEventListener("submit", blogPostAdd);
      }
      return res.json();
    })
    .then((data) => {
      welcomeElem.innerHTML += " " + data[0].status;
    });
};

async function getBlogPosts() {
  try {
    let response = await fetch(posts);
    let data = await response.json();
    tBodyElem.innerHTML = "";
    data.forEach((post) => {
      tBodyElem.innerHTML += `
        <tr>
        <td>${post.id}</td>
        <td>${post.title}</td>
        <td>${post.description}</td>
       <td>${post.price} AZN</td>
      <td> <img src="${post.image}" alt=""></td>
       <td>${post.stock}</td>
        <td>
            <button class="btn-delete" onclick="deletePost(${post.id})">delete</button>
            <button class="btn-edit">edit</button>
        </td>
    </tr>
        `;
    });
  } catch (error) {
    console.log(error);
  }
}

function blogPostAdd(e) {
  e.preventDefault();
  fetch(posts, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: e.target.title.value,
      description: e.target.description.value,
      price: e.target.price.value,
      image: e.target.image.value,
      stock: e.target.stock.value,
    }),
  }).then((res) => {
    if (res.ok) {
      getBlogPosts();
    }
  });
}

function deletePost(id) {
  fetch(`${posts}/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      getBlogPosts();
    }
  });
}
