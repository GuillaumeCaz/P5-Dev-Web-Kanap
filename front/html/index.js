  

  fetch("http://localhost:3000/api/products").then(function(res) {
    if (res.ok) {
      return res.json();
    }
    
  })
  .then( function(value) {
    console.table(value);
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
    const lien = document.querySelector("article");
    lien.addEventListener('click', () =>{
      console.log(lien);
      let params = new URL(document.location).searchParams;
      let id =params.get("id");
    console.log(id);
    })
    
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
  