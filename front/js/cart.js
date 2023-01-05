const basket = JSON.parse(localStorage.getItem("basket"));

fetch("http://localhost:3000/api/products/").then(function(res) {
    if (res.ok) {
      return res.json();
    }
    
  })
  .then( function(product) {
    
    for (let i=0 ; i < basket.length; i++){
            let foundId = product.find(product=> (product._id == basket[i][0]));
            console.log(foundId)
            document.getElementById("panier_vide").innerHTML +=
            `<article class="cart__item" data-id="${basket[i][0]}" data-color="${basket[i][1]}">
            <div class="cart__item__img">
              <img src="${foundId.imageUrl}" alt="${foundId.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${foundId.name}</h2>
                <p>${basket[i][1]}</p>
                <p>${foundId.price} €</p>
              </div>
              <section class="cart">
            <section id="cart__items">
              
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket[i][2]}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
        }

  })
  .catch(function(err) {
    // Une erreur est survenue
  });
  