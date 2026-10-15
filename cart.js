// ==========================================
// 1. DONNÉES DU PANIER ET DES COMMANDES
// ==========================================

// Tableau contenant les articles du panier
let cart = [];

// Identifiant de la prochaine commande
let nextOrderId = 1;

// ==========================================
// 2. GESTION DES ARTICLES DU PANIER
// ==========================================

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

    // Actualise le compteur du panier
    updateCartCount();

    // Actualise l'affichage uniquement si le panier est ouvert
    if (!cartSection.hidden) {
        renderCart();
    }
}

// Supprime un article du panier
function deleteArticle(id) {
    // Conserve uniquement les articles dont l'identifiant est différent
    cart = cart.filter(item => item.article.id !== id)
    // Actualise le compteur du panier
    updateCartCount();
}

// Augmente la quantité d'un article
function increaseQuantity(id) {
    // Recherche l'article dans le panier grâce à son identifiant
    const existingItem = cart.find(item => item.article.id === id);

    // Arrête la fonction si l'article n'existe pas
    if (!existingItem) {
        return;
    }

    if (existingItem && existingItem.quantity < existingItem.article.stock) {
        existingItem.quantity++;
        // Actualise le compteur du panier
        updateCartCount();
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
            // Actualise le compteur du panier
            updateCartCount();
        }else {
            deleteArticle(id);
        }
    }
}

// Vide le panier
function reset() {
    cart = [];
    // Actualise le compteur après avoir vidé le panier
    updateCartCount();
}

// ==========================================
// 3. CALCULS DU PANIER
// ==========================================

// Calcule le sous-total d'un article
function calculateSubtotal(id) {
    // Recherche l'article dans le panier grâce à son identifiant
    const existingItem = cart.find(item => item.article.id === id);
    if (existingItem) {
        return existingItem.quantity * existingItem.article.prix;
    }
    return 0;
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

// Calcule le nombre total d'articles dans le panier
function calculateCartCount() {
    let count = 0;

    cart.forEach(item => {
        count += item.quantity;
    });

    return count;
}

// ==========================================
// 4. AFFICHAGE DU PANIER
// ==========================================

// Actualise le compteur du bouton Panier
function updateCartCount() {
    const cartCount = document.querySelector("#cart-count");
    cartCount.textContent = calculateCartCount();
}

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

        // Contient le nom et le prix de l'article
        const articleInfo = document.createElement("div");
        articleInfo.classList.add("article-info");

        // Crée un élément pour le nom de l'article
        const articleName = document.createElement("p");
        articleName.textContent = item.article.nom;

        // Crée un élément pour le prix et la quantité de l'article
        const articlePriceQuantity = document.createElement("p");
        articlePriceQuantity.textContent = `${item.article.prix.toFixed(2)} x ${item.quantity} =  ${calculateSubtotal(item.article.id).toFixed(2)}`;
        
        articleInfo.appendChild(articleName);
        articleInfo.appendChild(articlePriceQuantity);

        // Contient les boutons de gestion de l'article
        const articleActions = document.createElement("div");
        articleActions.classList.add("article-actions");

        // Crée le bouton pour diminuer la quantité, puis l'ajoute dans la ligne du panier
        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "-";
        articleActions.appendChild(decreaseButton);

        // Diminue la quantité au clic et actualise le panier
        decreaseButton.addEventListener("click", () => {
            decreaseQuantity(item.article.id);
            renderCart();
        });

        // Crée le bouton pour augmenter la quantité, puis l'ajoute dans la ligne du panier
        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        articleActions.appendChild(increaseButton);

        // Augmente la quantité au clic et actualise le panier
        increaseButton.addEventListener("click", () => {
            increaseQuantity(item.article.id);
            renderCart();
        });

        // Crée le bouton pour supprimer l'article du panier, puis l'ajoute dans la ligne du panier
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Suppr";
        articleActions.appendChild(deleteButton);

        // Supprime l'article au clic et actualise le panier
        deleteButton.addEventListener("click", () => {
            deleteArticle(item.article.id);
            renderCart();
        });

        // Regroupe les informations et les boutons dans la ligne du panier
        cartItem.appendChild(articleInfo);
        cartItem.appendChild(articleActions);
        
        // Ajoute la ligne dans le panier
        cartItems.appendChild(cartItem);
    }
    // Affiche le montant total du panier
    cartTotal.textContent = calculateTotal().toFixed(2);
}

// ==========================================
// 5. GESTION DES COMMANDES
// ==========================================

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

// ==========================================
// 6. ÉVÉNEMENTS UTILISATEUR
// ==========================================

// Récupère le bouton et la section du panier
const cartButton = document.querySelector(".panier_btn");
const cartSection = document.querySelector("#cart-section");
// Affiche le panier au clic sur le bouton
cartButton.addEventListener("click", () => {
    renderCart();
    cartSection.hidden = false;
});

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