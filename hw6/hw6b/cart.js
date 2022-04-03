const products = [
    {
      title:"Multivitamins",
      price:12,
      img: "1.png",
    },
    {
        title:"Protein Powder",
        price:3,
        img: "2.png",
    },
    {
        title:"Protein Shake",
        price:4,
        img:"3.png",
    },   
];

let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

/*the js code for the cart is I learned "from JavaScript Shopping Cart Tutorial for Beginners"
link: https://github.com/WebDevSimplified/Introduction-to-Web-Development/tree/master/Introduction%20to%20JavaScript/Lesson%201
I revised it to fit my html code and my layout*/
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
}

function removeCartItem(event){
    var buttonClicked= event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    for(let i=0; i<cart.length;i++){
        if (cart[i].title==title) {
        alert('This item is already added to the cart')
        return
        }
    }
    alert(cart instanceof Array);
    const item = products.find((product) => product.title === title);
    cart.push({
        ...item,
        numberOfUnits: 1,
        }); 
        console.log(3);
    updateCart();
}
    
        

function updateCart() {
    console.log(1);
    renderCartItems();
    //updateCartTotal();  
    // save cart to local storage
    localStorage.setItem("CART", JSON.stringify(cart));
    alert(cart instanceof Array);
  }

/*render cart*/
function renderCartItems() {
    console.log(2);
    var cartRow = document.createElement('div')
    cartRow.innerHTML = "";
    cart.forEach((item) => {
        console.log(3);
        cartRow.innerHTML +=  `
    <div class="cart-column modal" >
    <img class="cart-item-image" src="${item.img}" width="80" height="80">
    <span class="cart-item-title">${item.title}</span>
    </div>
        <div class="cart-item cart-column" >
            <img class="cart-item-image" src="${item.img}" width="80" height="80">
            <span class="cart-item-title">${item.title}</span>
        </div>
        <span class="cart-price cart-column">${item.price}</span>
        <div class="cart-quantity cart-column" id="myModal">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
    });
}



function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total

}

/*the framework of modal is from W3SCHOLLL*/
// Get the modal
var modal = document.getElementById("myModal");

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}