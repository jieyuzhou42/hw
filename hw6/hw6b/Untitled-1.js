<div class="container">
<div class="cart-column modal" >
    <img class="cart-item-image" src="${item.img}" width="100" height="100">
    <span class="cart-item-title">${item.title}</span>
</div>
<div class="cart-column">
    <img class="cart-item-image" src="${item.img}" width="100" height="100">
    <div class="item-info" onclick="removeItemFromCart(${item.id})">X</div>
    <span class="cart-item-title">${item.title}</span>
</div>      
<span class="cart-column">${item.price}</span>
<div class="cart-column" id="myModal">
    <div class="btn minus" style="text-align: center;" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
    <div class="number">${item.numberOfUnits}</div>
    <div class="btn plus" style="text-align: center;" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
</div>
</div>