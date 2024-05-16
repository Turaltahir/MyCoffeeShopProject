let cartlist = JSON.parse(localStorage.getItem("cardList"));

const listElement = document.querySelector(".productStore");
if (cartlist) {
  cartlist.forEach((element) => {
    listElement.innerHTML += `
    <div class="table">
    <table>
        <tr>
          <th>Name of Product</th>
          <th> <span >Count</span></th>
          <th> <span>Price</span></th>
          <th><span>Amount</span></th>
        </tr>
        <tr>
          <td>${element.title}</td>
          <td>${element.count}</td>
          <td>${element.price} AZN</td>
          <td>${element.count * element.price} AZN</td>
        </tr>
       </table>
</div>
     `;
  });
} else {
}
