const id = new URL(document.location).searchParams.get("id");


fetch("http://localhost:3000/api/products/"+id).then(function(res) {
    if (res.ok) {
      return res.json();
    }
    
  })
  .then( function(product) { 
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
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
  