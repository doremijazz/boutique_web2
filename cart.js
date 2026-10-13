// Tableau contenant les articles du panier
let cart = [];

// Ajoute un article au panier
function addArticle(article) {
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
        })
    }
}

// Supprime un article du panier
function deleteArticle(id) {

}

// Calcule le montant total du panier
function calculateTotal() {

}

// Vide le panier
function reset() {

}

// Crée une commande
function createOrder() {

}

// Augmente la quantité d'un article
function increaseQuantity(id) {

}

// Diminue la quantité d'un article
function decreaseQuantity(id) {

}

// Calcule le sous-total d'un article
function calculateSubtotal(id) {

}

// Affiche le contenu du panier
function renderCart() {

}