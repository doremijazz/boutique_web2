const reponse = await fetch("catalogue.json");
const data = await reponse.json();

const produits = data.produits;
const categories = data.categories

console.log(produits);
console.log(categories);