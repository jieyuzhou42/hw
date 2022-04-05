const products = [
    {
      id:0,
      title:"Multivitamins",
      price:12,
      img: "./img/1.png",
    },
    {
        id:1,
        title:"Protein Powder",
        price:3,
        img: "./img/2.png",
    },
    {
        id:2,
        title:"Protein Shake",
        price:4,
        img:"./img/3.png",
    },   
];

const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    if (cart.some((item) => item.title === title)){
      const item = products.find((product) => product.title === title);
      changeNumberOfUnits("plus", item.id);
    }else{
    const item = products.find((product) => product.title === title);
    cart.push({
        ...item,
        numberOfUnits: 1,
        }); 
    updateCart();}
}

function updateCart() {
    renderCartItems();
    updateCartTotal();  
    // save cart to local storage
    localStorage.setItem("CART", JSON.stringify(cart));
  }

/*render cart*/
function renderCartItems() {
    cartItemsEl.innerHTML = ""; // clear cart element
    for (i=0;i<cart.length;i++){
    var item=cart[i]
      cartItemsEl.innerHTML += `
      <div style="height:10px;"></div>
      <div class="container">
        <div class="container" style="width:50%; align-items:center;"> 
          <img src="${item.img}" style="height:100px; width:65px; object-fit: contain" >
          <span >${item.title}</span>
        </div> 
        <div style="width:15%; align-items:center;">            
          <span>$${item.price}</span>
        </div>
        <div style="width:20%;display: grid;grid-template-columns: 1fr 1fr 1fr;"> 
          <div class="btn minus" style="text-align:center;" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
          <div class="number">${item.numberOfUnits}</div>
          <div class="btn plus" style="text-align: center;" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
        </div> 
        <div style="width:5%;"></div>          
        <div class="btn-remove" onclick="removeItemFromCart(${item.id})">X</div>  
      </div>
        `;
    }  
  }
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}
function changeNumberOfUnits(action, id) {
    cart = cart.map((item) => {
      let numberOfUnits = item.numberOfUnits;
      if (item.id === id) {
        if (action === "minus" && numberOfUnits > 1) {
          numberOfUnits--;
        } else if (action === "plus") {
          numberOfUnits++;
        }
      } 
      return {
        ...item,
        numberOfUnits,
      };
    });
    updateCart();
}


function updateCartTotal() {
  let totalPrice = 0,
    totalItems = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalEl.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`;
  totalItemsInCartEl.innerHTML = totalItems;
}


/*the framework of modal is from W3SCHOLLL*/
// Get the modal
var modal = document.getElementById("myModal");
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}