let basket = JSON.parse(localStorage.getItem("basket"));

fetch("http://localhost:3000/api/products/").then(function(res) {
    if (res.ok) {
      return res.json();
    }
    
  })
  .then( function(product) {
    getTotal(product);
    //Affichage des elements du panier

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
                      <input type="number" class="itemQuantity" name="itemQuantity${i}" min="1" max="100" value="${basket[i].quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
  }
  // Totaux
  
  
  //Modification des inputs de quantité dans le panier
  const inputs = document.querySelectorAll('.itemQuantity');
  function updateBasketItem(id, color, newQuantity) {
    let item = basket.find(item => (item.id == id) && (item.color == color));
    if (item) {
      item.quantity = newQuantity;
    }
    localStorage.setItem("basket", JSON.stringify(basket));
    getTotal(product);
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
  //Suppression des elements du panier
  const deletebuttons = document.querySelectorAll('.cart__item__content__settings__delete');
  function deleteBasketItem(id, color) {
    let itemIndex = basket.findIndex(item => (item.id == id) && (item.color == color));
    if (itemIndex != -1) {
      basket.splice(itemIndex, 1);

    }
    localStorage.setItem("basket", JSON.stringify(basket));
    getTotal(product);
    }
    deletebuttons.forEach(div => {
      div.addEventListener("click", function(event) {
        let element = div.closest("article");
        let id = element.getAttribute('data-id');
        let color= element.getAttribute('data-color');
        deleteBasketItem(id, color);
        element.remove();
      });
    });
    

  })
  .catch(function(err) {
    // Une erreur est survenue
  })

  
 
  function getTotal (product){
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
    console.log("price",price);
  }
  
  //-------------------------------------------------
  // Envoie et traitement des données du formulaire
  //-------------------------------------------------
  
  const clientForm = document.querySelector(".cart__order__form");
  clientForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const adressRegex = /^[0-9]/;
  
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const address = document.getElementById('address').value;
  const city = document.getElementById('city').value;
  const email = document.getElementById('email').value;
  
  if (!emailRegex.test(email)) {
    alert("Veuillez renseigner une adresse mail valide");
    return;
  }
  if (!adressRegex.test(address)) {
    alert("Veuillez renseigner une adresse valide");
    return;
  }

  const form = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email
  };
  const cartIds = [];
  for (let i=0; i < basket.length; i++ ){
    cartIds.push(basket[i].id);
  }  
  
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      contact: form,
      products: cartIds
    })
  })
  .then(response => {
    if (response.ok) {
      return response.json();
  }
  })
  .then(data => {
    console.log(data);
    alert("Contact enregistré!");
    window.location.href = `confirmation.html?orderId=${data.orderId}`;
  })
  
});