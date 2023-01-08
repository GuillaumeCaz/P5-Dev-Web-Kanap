let basket = JSON.parse(localStorage.getItem("basket"));

fetch("http://localhost:3000/api/products/").then(function(res) {
    if (res.ok) {
      return res.json();
    }
    
  })
  .then( function(product) {
    
    for (let i=0 ; i < basket.length; i++){
            
            let foundId = product.find(product=> (product._id == basket[i].id));
            document.getElementById("panier_vide").innerHTML +=
            `<article class="cart__item" data-id="${basket[i].id}" data-color="${basket[i].color}">
            <div class="cart__item__img">
              <img src="${foundId.imageUrl}" alt="${foundId.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${foundId.name}</h2>
                <p>${basket[i].color}</p>
                <p>${foundId.price} €</p>
              </div>
              <section class="cart">
            <section id="cart__items">
              
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" data-item-id="${basket[i].id}" data-item-color="${basket[i].color}" name="itemQuantity${i}" min="1" max="100" value="${basket[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
  }
  const inputs = document.querySelectorAll('.itemQuantity');
  function updateBasketItem(id, color, newQuantity) {
    let item = basket.find(item => (item.id == id) && (item.color == color));
    if (item) {
      item.quantity = newQuantity;
    }
    localStorage.setItem("basket", JSON.stringify(basket));
  }
  
  inputs.forEach(input => {
    input.addEventListener("change", function(event) {
      let element = input.closest("article");
      let id = element.getAttribute('data-id');
      let color= element.getAttribute('data-color');
      let quantity = input.value;
      updateBasketItem(id, color, quantity);
    });
  });
  const deletebuttons = document.querySelectorAll('.cart__item__content__settings__delete');
  function deleteBasketItem(id, color) {
    let itemIndex = basket.findIndex(item => (item.id == id) && (item.color == color));
    if (itemIndex != -1) {
      basket.splice(itemIndex, 1);

    }
    localStorage.setItem("basket", JSON.stringify(basket));
    }
    deletebuttons.forEach(div => {
      div.addEventListener("click", function(event) {
        let element = div.closest("article");
        let id = element.getAttribute('data-id');
        let color= element.getAttribute('data-color');
        deleteBasketItem(id, color);
      });
    });
  let totalQuantity = 0;
  let totalPrice = 0;
    for (let i=0; i < basket.length; i++ ){
      let foundId = product.find(product=> (product._id == basket[i].id));
      totalQuantity += parseInt(basket[i].quantity);
      totalPrice += parseInt(basket[i].quantity) * foundId.price;
    }
  let quantity = document.getElementById('totalQuantity');
  quantity.innerHTML = totalQuantity;
  let price = document.getElementById('totalPrice');
  price.innerHTML = totalPrice;
  })
  .catch(function(err) {
    // Une erreur est survenue
  })