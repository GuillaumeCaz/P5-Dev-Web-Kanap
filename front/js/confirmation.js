//Aller chercher l'Id dans l'URL et l'afficher dans la case correspondante
const orderId = new URL(document.location).searchParams.get("orderId");
const span = document.getElementById("orderId");
span.innerHTML = orderId;
//vider le panier
localStorage.clear();
