// Aller chercher l'Id du produit dans l'URl
const id = new URL(document.location).searchParams.get("id");

// Requète à l'API pour récupérer les  infos du produit correspondant
fetch("http://localhost:3000/api/products/"+id).then(function(res) {
    if (res.ok) {
      return res.json();
    }
    
  })
  .then( function(product) { 
    //Ajout de l'HTML et des éléments du produit
    document.querySelector(".item").innerHTML +=
    `
    <article>
            <div class="item__img">
            
            
               <img src="${product.imageUrl}" alt="${product.altTxt}"> 
            </div>
            <div class="item__content">

              <div class="item__content__titlePrice">
                <h1 id="title">${product.name}</h1>
                <p>Prix : <span id="price"> ${product.price} </span>€</p>
              </div>

              <div class="item__content__description">
                <p class="item__content__description__title">Description :</p>
                <p id="description">${product.description} </p>
              </div>

              <div class="item__content__settings">
                <div class="item__content__settings__color">
                  <label for="color-select">Choisir une couleur :</label>
                  <select name="color-select" id="colors">
                      <option value="">--SVP, choisissez une couleur --</option>
                    </select>
                </div>

                <div class="item__content__settings__quantity">
                  <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                  <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                </div>
              </div>

              <div class="item__content__addButton">
                <button id="addToCart">Ajouter au panier</button>
              </div>

            </div>
          </article>`
          for (let i=0 ; i < product.colors.length; i++){
            document.querySelector("select").innerHTML += 
            `<option value="${product.colors[i]}">${product.colors[i]}</option>`
        }
         //-----------------------------
          // Entrée des données dans le Local Storage
          //---------------------------------
          class Product {
            constructor(id, color, quantity) {
              this.id = id;
              this.color = color;
              this.quantity = quantity;
            }
          }
          // Fonction pour sauvegarder le panier (passage en JSON pour pouvoir stocker plusieurs valeurs)
          function saveBasket(basket){
          localStorage.setItem("basket",JSON.stringify(basket))
      
        }
      
        // Fonction pour récupérer les données du panier (récupération du langage JSON)
        function getBasket(){
          let basket =  localStorage.getItem("basket");
          if(basket == null){
            return [];
          }else{
            return JSON.parse(basket);
          }
        }
      
      // Fonctio, d'ajout d'un élément au panier
        function addBasket(product){
          let basket = getBasket();
          let foundProduct = basket.find(p => (p.id == product.id)&&(p.color == product.color))
          if (foundProduct != undefined){
            foundProduct.quantity = parseFloat(foundProduct.quantity) + parseFloat(document.getElementById("quantity").value);
          }else {
            product.quantity = document.getElementById("quantity").value;
            basket.push(product);
          }
          saveBasket(basket); 
      
        }
        //Ajout d'un élément au panier
        const submit = document.getElementById("addToCart");
        submit.addEventListener("click", () =>{
      if ((document.getElementById("colors").value != "") && (document.getElementById("quantity").value != "0")){
        
        
        
        let color = document.getElementById('colors').value;
        let quantity = document.getElementById('quantity').value;
        addBasket(new Product(id, color, quantity));
        //addBasket([id,color,quantity]);
        alert("Votre commande a été ajoutée au panier");
        window.location.reload();


        
       }else{
        alert("Veuillez remplir tout les champs");
       }})
        
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
  