// Tableau contenant les articles du panier
let cart = [];

// Identifiant de la prochaine commande
let nextOrderId = 1;

// Ajoute un article au panier
export function addArticle(article) {
    // Empêche l'ajout d'un produit épuisé
    if (article.stock <= 0) {
        alert("Ce produit est actuellement épuisé.")
        return;
    }
    // Recherche si l'article est déjà présent dans le panier
    const existingItem = cart.find(item => item.article.id === article.id)

    if(existingItem) {
        // Augemente la quantité de l'article existant
        increaseQuantity(article.id);
    } else {
        // Ajoute un nouvel article avec une quantité de 1
        cart.push({
            article : article,
            quantity : 1
        });
    }
    // Actualise l'affichage uniquement si le panier est ouvert
    if (!cartSection.hidden) {
        renderCart();
    }
}

// Supprime un article du panier
function deleteArticle(id) {
    // Conserve uniquement les articles dont l'identifiant est différent
    cart = cart.filter(item => item.article.id !== id)
}

// Calcule le montant total du panier
function calculateTotal() {
    let total = 0; 
    // Additionne les sous-totaux des articles du panier
    cart.forEach(item => {
        total += calculateSubtotal(item.article.id);
    });
    return total;
}

// Vide le panier
function reset() {
    cart = [];
}

// Crée une commande
function createOrder() {
    // Vérifie si le panier est vide
    if (cart.length === 0) {
        return null;
    }
    // Crée une commande à partir du panier
    const order = {
        id : nextOrderId++,
        items  : cart,
        total : calculateTotal()
    };
    // Vide le panier
    reset();
    // Retourne l'order créé
    return order;
}

// Augmente la quantité d'un article
function increaseQuantity(id) {
    // Recherche l'article dans le panier grâce à son identifiant
    const existingItem = cart.find(item => item.article.id === id);

    if (existingItem && existingItem.quantity < existingItem.article.stock) {
        existingItem.quantity++;
    } else {
        alert(`Stock insuffisant. Seulement ${existingItem.article.stock} article(s) disponible(s).`);
    }
}

// Diminue la quantité d'un article
function decreaseQuantity(id) {
    // Recherche l'article dans le panier grâce à son identifiant
    const existingItem = cart.find(item => item.article.id === id);

    if (existingItem ) {
        if(existingItem.quantity > 1) {
            existingItem.quantity--;
        }else {
            deleteArticle(id);
        }
    }
}

// Calcule le sous-total d'un article
function calculateSubtotal(id) {
    // Recherche l'article dans le panier grâce à son identifiant
    const existingItem = cart.find(item => item.article.id === id);
    if (existingItem) {
        return existingItem.quantity * existingItem.article.prix;
    }
    return 0;
}

// Récupère le bouton et la section du panier
const cartButton = document.querySelector("#cart-button");
const cartSection = document.querySelector("#cart-section");
// Affiche le panier au clic sur le bouton
cartButton.addEventListener("click", () => {
    renderCart();
    cartSection.hidden = false;
});

// Affiche le CONTENU DU PANIER
function renderCart() {
    // Récupère les éléments HTML nécessaires
    const cartItems = document.querySelector("#cart-items");
    const cartTotal = document.querySelector("#cart-total");

    // Vide l'affichage précédent du panier
    cartItems.innerHTML = "";

    // Parcourt les articles du panier
    for (const item of cart) {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        // Crée un élément pour le nom de l'article, puis l'ajoute dans la ligne du panier
        const articleName = document.createElement("p");
        articleName.textContent = item.article.nom;
        cartItem.appendChild(articleName);

        // Crée un élément pour le prix et la quantité de l'article, puis l'ajoute dans la ligne du panier
        const articlePriceQuantity = document.createElement("p");
        articlePriceQuantity.textContent = `${item.article.prix.toFixed(2)} x ${item.quantity} =  ${calculateSubtotal(item.article.id).toFixed(2)}`;
        cartItem.appendChild(articlePriceQuantity);

        // Crée le bouton pour diminuer la quantité, puis l'ajoute dans la ligne du panier
        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        cartItem.appendChild(decreaseButton);

        // Diminue la quantité au clic et actualise le panier
        decreaseButton.addEventListener("click", () => {
            decreaseQuantity(item.article.id);
            renderCart();
        });

        // Crée le bouton pour augmenter la quantité, puis l'ajoute dans la ligne du panier
        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        cartItem.appendChild(increaseButton);

        // Augmente la quantité au clic et actualise le panier
        increaseButton.addEventListener("click", () => {
            increaseQuantity(item.article.id);
            renderCart();
        });

        // Crée le bouton pour supprimer l'article du panier, puis l'ajoute dans la ligne du panier
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Suppr";
        cartItem.appendChild(deleteButton);

        // Supprime l'article au clic et actualise le panier
        deleteButton.addEventListener("click", () => {
            deleteArticle(item.article.id);
            renderCart();
        });

        // Ajoute la ligne dans le panier
        cartItems.appendChild(cartItem);
    }
    // Affiche le montant total du panier
    cartTotal.textContent = calculateTotal().toFixed(2);
}

// Récupère le bouton de FERMETURE PANIER
const closeCartButton = document.querySelector("#close-cart");

// Ferme le panier sans supprimer son contenu
closeCartButton.addEventListener("click", () => {
    cartSection.hidden = true;
});

// Récupère le bouton permettant de PASSER COMMANDE
const orderButton = document.querySelector("#order-button");

// Gère le clic sur le bouton de commande
orderButton.addEventListener("click", () => {

    // Vérifie que le panier contient au moins un article
    if (cart.length === 0) {
        alert("Votre panier est vide.");
        return;
    }

    // Demande confirmation à l'utilisateur
    const isConfirmed = window.confirm("Voulez-vous confirmer votre commande ?");

    // Arrête si l'utilisateur annule
    if (!isConfirmed) {
        return;
    }

    // Crée la commande et vide le panier
    const order = createOrder();
    // Actualise l'affichage du panier
    renderCart();

    // Affiche un message avec le numéro de commande
    alert(`Votre commande n°${order.id} a bien été validée.`);

});