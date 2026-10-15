import { addArticle } from "./cart.js";

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
        productElement.classList.add("article");

        // On ajoute tous les attributs du produit
        const imageElement = document.createElement("img");
        imageElement.src = products[i].image;

        const nomElement = document.createElement("h2");
        nomElement.innerText = products[i].nom;

        const priceElement = document.createElement("p");
        priceElement.innerText = `${products[i].prix} €`;

        const disponibilityElement = document.createElement("p");
        disponibilityElement.innerText =
            products[i].stock > 0 ? "En stock" : "Épuisé";

        // AJout du bouton pour ajouter au panier

        // Création du bouton pour ajouter un produit au panier
        const addButton = document.createElement("button");
        addButton.textContent = "Ajouter au panier";

        // Désactive le bouton si le produit est épuisé
        addButton.disabled = products[i].stock <= 0;

        // Ajoute le produit au panier lors du clic
        addButton.addEventListener("click", (event) => {
            // Empêche le clic de déclencher l'ouverture des détails du produit
            event.stopPropagation();

            addArticle(products[i]);
        });

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
        productElement.appendChild(addButton);
    }

}

displayProducts(produits);


function displayDetailsProduct(product) {

    // Création de la pop-up
    const productElement = document.createElement("div");
    productElement.classList.add("oneArticle");

    // Contenu de la pop-up
    const contentElement = document.createElement("article");
    contentElement.classList.add("detail-content");

    // Image
    const imageElement = document.createElement("img");
    imageElement.src = product.image;

    // Nom
    const nomElement = document.createElement("h2");
    nomElement.innerText = product.nom;

    // Prix
    const priceElement = document.createElement("p");
    priceElement.innerText = `${product.prix} €`;

    // Stock
    const quantityElement = document.createElement("p");
    quantityElement.innerText = `Stock : ${product.stock}`;

    // Description
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = product.description;

    // Bouton fermer
    const closeButton = document.createElement("button");
    closeButton.innerText = "×";
    closeButton.classList.add("close-detail");

    closeButton.addEventListener("click", () => {
        productElement.remove();
    });

    // Fermer en cliquant sur le fond
    productElement.addEventListener("click", (event) => {
        if (event.target === productElement) {
            productElement.remove();
        }
    });

    // Ajout des éléments
    contentElement.appendChild(closeButton);
    contentElement.appendChild(imageElement);
    contentElement.appendChild(nomElement);
    contentElement.appendChild(priceElement);
    contentElement.appendChild(quantityElement);
    contentElement.appendChild(descriptionElement);

    productElement.appendChild(contentElement);

    // Ajout de la pop-up à la page
    document.body.appendChild(productElement);
}


const boutonTrierCroissant = document.querySelector(".btn-trier-croissant");

boutonTrierCroissant.addEventListener("click", function (){
    const productsOrdonnees = Array.from(produits);
    productsOrdonnees.sort(function (a,b){
        return a.prix - b.prix;
    });
    document.querySelector(".fiches").innerHTML = "";
    displayProducts(productsOrdonnees);
});

const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant");

boutonTrierDecroissant.addEventListener("click", function (){
    const productsOrdonnees = Array.from(produits);
    productsOrdonnees.sort(function (a,b){
        return b.prix- a.prix ;
    });
    document.querySelector(".fiches").innerHTML = "";
    displayProducts(productsOrdonnees);
});

const boutonFiltrerInformatique = document.querySelector(".btn-informatique");

boutonFiltrerInformatique.addEventListener("click", function (){
    const productsFiltrer = produits.filter(function (product){
        return product.categorieId == 1;
    });
    document.querySelector(".fiches").innerHTML = "";
    displayProducts(productsFiltrer);
});

const boutonFiltrerVetement = document.querySelector(".btn-vetement");

boutonFiltrerVetement.addEventListener("click", function (){
    const productsFiltrer = produits.filter(function (product){
        return product.categorieId == 2;
    });
    document.querySelector(".fiches").innerHTML = "";
    displayProducts(productsFiltrer);
});

const boutonFiltrerMaison = document.querySelector(".btn-maison");

boutonFiltrerMaison.addEventListener("click", function (){
    const productsFiltrer = produits.filter(function (product){
        return product.categorieId == 3;
    });
    document.querySelector(".fiches").innerHTML = "";
    displayProducts(productsFiltrer);
});

const boutonFiltrerBeaute = document.querySelector(".btn-beauté");

boutonFiltrerBeaute.addEventListener("click", function (){
    const productsFiltrer = produits.filter(function (product){
        return product.categorieId == 4;
    });
    document.querySelector(".fiches").innerHTML = "";
    displayProducts(productsFiltrer);
});

const boutonFiltrerSport = document.querySelector(".btn-sport");

boutonFiltrerSport.addEventListener("click", function (){
    const productsFiltrer = produits.filter(function (product){
        return product.categorieId == 5;
    });
    document.querySelector(".fiches").innerHTML = "";
    displayProducts(productsFiltrer);
});