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

    //ajout de l'image 
    const article = document.querySelector(".item");
    const img = article.querySelector(".item__img img");
    img.src = product.imageUrl;
    img.alt = product.altTxt;

    //ajout titre et prix
    const title = article.querySelector("#title");
    title.innerText = product.name;
    const price = article.querySelector("#price");
    price.innerText = product.price;

    //ajout description
    const description = article.querySelector("#description");
    description.innerText = product.description;

    // ajout des couleurs
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
        this.quantity = parseFloat(quantity);
      }
    }
    //Fonction Sauvegarde du panier
    function saveBasket(basket) {
      localStorage.setItem("basket", JSON.stringify(basket))
    }
    //Récupération du panier
    function getBasket() {
      let basket = localStorage.getItem("basket");
      if (basket == null) {
        return [];
      } else {
        return JSON.parse(basket);
      }
    }
    //Fonction d'ajout au panier
    function addBasket(product) {
      let basket = getBasket();
      let foundProduct = basket.find(p => (p.id == product.id) && (p.color == product.color))
      if (foundProduct != undefined) {
        if ((foundProduct.quantity + document.getElementById("quantity").value) < 100) {
          foundProduct.quantity = foundProduct.quantity + parseFloat(document.getElementById("quantity").value);
          alert("Votre commande a été ajoutée au panier");
        } else {
          alert("Vous ne pouvez pas commander plus de 100 produits identiques");
          return;
        }
      } else {
        product.quantity = parseFloat(document.getElementById("quantity").value);
        basket.push(product);
        alert("Votre commande a été ajoutée au panier");
      }
    
      saveBasket(basket);
    }
    
    const submit = document.getElementById("addToCart");
    submit.addEventListener("click", () => {
      if ((document.getElementById("colors").value != "") && (document.getElementById("quantity").value != "0") && (document.getElementById("quantity").value != "")) {
    
        let color = document.getElementById('colors').value;
        let quantity = document.getElementById('quantity').value;
        if (quantity > 100) {
          alert("La quantité ne peut pas dépasser 100");
          return;
        }
        addBasket(new Product(id, color, quantity));
        window.location.reload();
      } else {
        alert("Veuillez remplir tout les champs");
      }
    })
        
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
  