  // Fetch d'API en méthode GET pour récupérer les données des éléments

  fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
    
  })
  .then( function(value) {
    // affichage des éléments dynamique 
    for (let i=0 ; i < value.length; i++){
        let objet = value[i];
        document.getElementById('items').innerHTML += 
        `
      <a href="product.html?id=${objet._id}" >
        <article class="${i}">
          <img src="${objet.imageUrl}" alt="${objet.altTxt}">
          <h3 class="productName">${objet.name}</h3>
          <p class="productDescription">${objet.description}</p>
        </article>
      </a>`
    }
    
    
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
  