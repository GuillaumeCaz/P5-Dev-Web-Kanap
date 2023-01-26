// Récupération du panier

let basket = JSON.parse(localStorage.getItem("basket"));
//Panier vide 
if (basket == null){
  document.querySelector("h1").textContent += " est vide";
}
// Fetch de type Get pour récupérer les informations de l'API
fetch("http://localhost:3000/api/products/").then(function(res) {
    if (res.ok) {
      return res.json();
    }
    
  })
  .then( function(product) {
    //Met a jour le total
    getTotal(product);
    //Affichage des elements du panier
    
    
    if (basket.length != 0 ){
    for (let i=0 ; i < basket.length; i++){
            //Recherche des correspondances entre le panier et les elements de l'API
            let foundId = product.find(product=> (product._id == basket[i].id));
            //Ajout des éléments du panier
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
    }else{
      //le panier est  vide 
      document.querySelector("h1").textContent += " est vide";
  }
  
  //Modification des inputs de quantité dans le panier
  const inputs = document.querySelectorAll('.itemQuantity');
  //Fonction pour modifier la quantité de l'élément dans le panier
  function updateBasketItem(id, color, newQuantity) {
    let item = basket.find(item => (item.id == id) && (item.color == color));
    if (item) {
      item.quantity = newQuantity;
    }
    localStorage.setItem("basket", JSON.stringify(basket));
    getTotal(product);
  }
  //Modification des valeurs des inputs et appel de la fonction pour modifier la quantité dans le panier
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
  //Fonction pour supprimer un element du panier
  function deleteBasketItem(id, color) {
    let itemIndex = basket.findIndex(item => (item.id == id) && (item.color == color));
    if (itemIndex != -1) {
      basket.splice(itemIndex, 1);
    }

    localStorage.setItem("basket", JSON.stringify(basket));
    //Mise a jour du total
    getTotal(product);
    }
    //Suppression du produit et de sa ligne dans le panier 
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

  
 // Fonction pour mettre a jour les totaux
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
  }
  
  //-------------------------------------------------
  // Envoie et traitement des données du formulaire
  //-------------------------------------------------
  
  const clientForm = document.querySelector(".cart__order__form");
  //Soumission du formulaire
  clientForm.addEventListener('submit', function(e) {
  e.preventDefault();
  // Définition des variables Regex pour les tests
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const adressRegex = /^[0-9]/;
  const nameRegex = /^[^\d]+$/;
  // Récupération des chaines de caractères correspondantes aux inputs
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const address = document.getElementById('address').value;
  const city = document.getElementById('city').value;
  const email = document.getElementById('email').value;
  // Tests Regex
  if (!emailRegex.test(email)) {
    document.querySelector("#emailErrorMsg").textContent = "Veuillez renseigner une adresse mail valide";
  }else {
    document.querySelector("#emailErrorMsg").textContent = "";
  }
  if (!adressRegex.test(address)) {
    document.querySelector("#addressErrorMsg").textContent = "Veuillez renseigner une adresse valide";
  }else {
    document.querySelector("#addressErrorMsg").textContent = "";
  }
  if (!nameRegex.test(firstName)) {
    document.querySelector("#firstNameErrorMsg").textContent = "Veuillez renseigner un prénom valide";
  }else {
    document.querySelector("#firstNameErrorMsg").textContent = "";
  }
  if (!nameRegex.test(lastName)) {
    document.querySelector("#lastNameErrorMsg").textContent = "Veuillez renseigner un nom valide";
  }else {
    document.querySelector("#lastNameErrorMsg").textContent = "";
  }
  if (!nameRegex.test(lastName) || !emailRegex.test(email) || !adressRegex.test(address) || !nameRegex.test(firstName)){
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
  // Ajout des Id du panier au CartIds
  for (let i=0; i < basket.length; i++ ){
    cartIds.push(basket[i].id);
  }  
  // Requète POST pour envoyer les données à l'API 
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
    alert("Contact enregistré!");
    console.log(data);
    //Lien vers la page confirmation avec l'ajout de l'id de commande
    window.location.href = `confirmation.html?orderId=${data.orderId}`;
  })
  
});