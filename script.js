// Récupération de la collection de l'API
const reponse = await fetch('http://localhost:5678/api/works');
const collection = await reponse.json();

function genererCollection(collection){
    for (let i = 0; i < collection.length; i++) {

        const article = collection[i];
        const sectionFiches = document.querySelector(".gallery");

        // Création des balises figure
        const pieceElement = document.createElement("figure");

        // Création des balises IMG
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        
        // Création des balises figcaption pour afficher de le titre
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = article.title;

        //Affichage
        sectionFiches.appendChild(pieceElement);
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
    }
 }
genererCollection(collection);

//Affiché les boutons//
function BoutonFiltres(){
    for (let t = 0; t < 4; t++) {
        const container = document.getElementById('filtres');
        const button = document.createElement('button');
        button.className = "bouton"+t;
        //Liste contenant le texte des boutons
        const texteBouton =["Tous","Objets","Appartements","Hotel & restaurants"]
        button.innerHTML = texteBouton[t];
        container.appendChild(button);
    }   
}
BoutonFiltres();


//Bouton Tous//
const boutonTous = document.querySelector(".bouton0");
boutonTous.addEventListener("click", function () {
    const collectionComplete = collection.filter(function (collection) {
        return collection;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererCollection(collectionComplete);
    console.log(collectionComplete);
});

//Bouton Objets//
const boutonObjets = document.querySelector(".bouton1");
boutonObjets.addEventListener("click", function () {
    const collectionComplete = collection.filter(function (collection) {
        return collection.category.name === "Objets";
    });
    document.querySelector(".gallery").innerHTML = "";
    genererCollection(collectionComplete);
});

//Bouton Appartements//
const boutonAppartements = document.querySelector(".bouton2");
boutonAppartements.addEventListener("click", function () {
    const collectionComplete = collection.filter(function (collection) {
        return collection.category.name === "Appartements";
    });
    document.querySelector(".gallery").innerHTML = "";
    genererCollection(collectionComplete);
});

//Bouton Hotel//
const boutonHotel = document.querySelector(".bouton3");
boutonHotel.addEventListener("click", function () {
    const collectionComplete = collection.filter(function (collection) {
        return collection.category.name === "Hotels & restaurants";
    });
    document.querySelector(".gallery").innerHTML = "";
    genererCollection(collectionComplete);
});