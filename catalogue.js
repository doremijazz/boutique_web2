const reponse = await fetch("catalogue.json");
const data = await reponse.json();

const produits = data.produits;
const categories = data.categories

console.log(produits);
console.log(categories);

function displayProducts(products){
    for (let i = 0; i < products.length; i++) {
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
        // Création d’une balise dédiée à une pièce automobile
        const productElement = document.createElement("article");

        // On ajoute tous les attributs du produit
        const imageElement = document.createElement("img");
        imageElement.src = products[i].image;

        const nomElement = document.createElement("h2");
        nomElement.innerText = products[i].nom;

        const priceElement = document.createElement("p");
        priceElement.innerText = ${products[i].prix} €;

        const disponibilityElement = document.createElement("p");
        disponibilityElement = products[i].disponibilite ? "En stock" : "Epuisé";

        // AJout du bouton pour ajouter au panier

        // Clic sur la fiche produit
        productElement.addEventListener("click", () => {
            displayDetailsProduct(products[i]);
        });

        //Rattachement de nos balises au DOM
        sectionFiches.appendChild(productElement);
        
        //Ajout des éléments au DOM pour l'exercice
        productElement.appendChild(imageElement);
        productElement.appendChild(nomElement);
        productElement.appendChild(priceElement);
        productElement.appendChild(disponibilityElement);
    }

}

function displayDetailsProduct(product){
    // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
        // Création d’une balise dédiée à une pièce automobile
        const productElement = document.createElement("article");

        // On ajoute tous les attributs du produit
        const imageElement = document.createElement("img");
        imageElement.src = product.image;

        const nomElement = document.createElement("h2");
        nomElement.innerText = product.nom;

        const priceElement = document.createElement("p");
        priceElement.innerText = ${product.prix} €;

        const quantityElement = document.createElement("p");
        quantityElement.innerText = product.stock;

        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = product.description;

        //Rattachement de nos balises au DOM
        sectionFiches.appendChild(productElement);
        
        //Ajout des éléments au DOM pour l'exercice
        productElement.appendChild(imageElement);
        productElement.appendChild(nomElement);
        productElement.appendChild(priceElement);
        productElement.appendChild(quantityElement);
        productElement.appendChild(descriptionElement);
}

const boutonTrierCroissant = document.querySelector(".btn-trier-croissant");

boutonTrierCroissant.addEventListener("click", function (){
    const productsOrdonnees = Array.from(produits);
    productsOrdonnees.sort(function (a,b){
        return a.prix - b.prix;
    });
    document.querySelector(.fiches).innerHTML = "";
    displayProducts(productsOrdonnees);
});