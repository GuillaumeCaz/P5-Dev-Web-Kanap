const orderId = new URL(document.location).searchParams.get("orderId");
const span = document.getElementById("orderId");
span.innerHTML = orderId;
