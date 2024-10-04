///Récupération de la collection de l'API///
const reponse = await fetch('http://localhost:5678/api/works');
const collection = await reponse.json();

/// Variable///
let modal = null //fenêtre modale

///Fonctions///

//Affiche les images de la collection provenant de l'API
function genererCollection(collection){
    for (let i = 0; i < collection.length; i++) {
        const article = collection[i]
        const gallery = document.querySelector(".gallery")
        
        // Création des balises figure
        const figure = document.createElement("figure")

        // Création des balises IMG
        const imageCollection = document.createElement("img");
        imageCollection.src = article.imageUrl

        // Création des balises figcaption pour afficher de le titre des images
        const titleImage = document.createElement("figcaption")
        titleImage .innerText = article.title

        //Affichage des élements
        gallery.appendChild(figure)
        figure.appendChild(imageCollection)
        figure.appendChild(titleImage)
    }
}

//Création des boutons filtres
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


////////////////////////////////////////////////////////////////


//Fenêtre modale vue 1
function ModaleVue1(collection){
    // Titre
    const fenetre = document.querySelector(".title-modal");
    const titre = document.createElement("h3");
    titre.innerText = "Galerie photo";

    //Bouton du bas
    const divbouton = document.querySelector(".btn-modal");
    const bouton = document.createElement("button");
    bouton.className = "classbouton";
    bouton.innerHTML = "Ajouter une photo";

    //Affichage des élements
    fenetre.appendChild(titre);
    divbouton.appendChild(bouton);
    
    const AccesStepTwo = document.querySelector(".classbouton");
    AccesStepTwo.addEventListener("click", function () {
        ModaleVue2()
    });

    for (let i = 0; i < collection.length; i++) {
        const article = collection[i];
        const fenetre = document.querySelector("#btn-img");
        const btnimage = document.createElement("figure");

        // Création des balises IMG
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        
        // Bouton poubelle
        const btnpoubelle = document.createElement("button");
        btnpoubelle.className = "poubelle";

        // Image poubelle bouton
        const imgpoubelle = document.createElement("img");
        imgpoubelle.src = "assets/icons/poubelle.png";

        //Affichage des élements
        fenetre.appendChild(btnimage);
        btnpoubelle.appendChild(imgpoubelle);
        btnimage.appendChild(btnpoubelle);
        btnimage.appendChild(imageElement);
    }  
}

//Fenêtre modale vue 2
function ModaleVue2(){
    clear()
    // Titre
    const fenetre = document.querySelector(".title-modal");
    const titre = document.createElement("h3");
    titre.innerText = "Ajout photo";

    //Bouton du bas
    const divbouton = document.querySelector(".btn-modal");
    const bouton = document.createElement("button");
    bouton.className = "classbouton";
    bouton.innerHTML = "Valider";

    //Rectangle bleu
    const formulaire = document.querySelector(".formulaire");
    const rectangle = document.createElement("div");

    // Création image dans le rectangle bleu
    const imgformulaire = document.createElement("img");
    imgformulaire.src = "assets/icons/imgformulaire.png";

    // Création bouton 
    const Ajouterbouton = document.createElement("button");
    Ajouterbouton.className = "Ajouterbouton";
    Ajouterbouton.innerHTML = "+ Ajouter une photo";

    //texte indication
    const indicationformat= document.createElement("figcaption");
    indicationformat.innerHTML = "jpg, png : 4mo max";

    //Création formulaire 
    const contenantinput= document.createElement("form");
    const txttitre= document.createElement("p");
    txttitre.innerHTML = "Titre";

    //Nommer l'image
    const inputitre= document.createElement("input");
    const txtcategorie= document.createElement("p");
    txtcategorie.innerHTML = "Catégorie";

    //Selection catégorie
    const inpucategorie= document.createElement("select");

    //choix
    const choix1= document.createElement("option");
    choix1.innerHTML = "Objets";
    const choix2= document.createElement("option");
    choix2.innerHTML = "Appartements";
    const choix3= document.createElement("option");
    choix3.innerHTML = "Hotel & restaurants";

    //Affichage des élements
    fenetre.appendChild(titre);
    formulaire.appendChild(rectangle)
    rectangle.appendChild(imgformulaire)
    rectangle.appendChild(Ajouterbouton)
    rectangle.appendChild(indicationformat)

    //Formulaire
    formulaire.appendChild(contenantinput)
    contenantinput.appendChild(txttitre)
    contenantinput.appendChild(inputitre)
    contenantinput.appendChild(txtcategorie)

    //input catégorie
    contenantinput.appendChild(inpucategorie)
    inpucategorie.appendChild(choix1)
    inpucategorie.appendChild(choix2)
    inpucategorie.appendChild(choix3)
    
    //Bouton validé
    divbouton.appendChild(bouton);
}

//Supprimer le contenu de la vue 1 pour passer a la vue 2
function clear(){
    document.querySelector(".title-modal").innerHTML = "";
    document.querySelector(".btn-modal").innerHTML = "";
    document.querySelector("#btn-img").innerHTML = "";
}


////////////////////////////////////////////////////////////////

//Création de la fenêtre modale
const openModal = function (e){
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    modal.style.display = null
    modal.setAttribute('aria-hidden','false')
    modal.setAttribute('aria-modal','true')
    modal.addEventListener('click',closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function (e){
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden','true')
    modal.setAttribute('aria-modal','false')
    modal.removeEventListener('click',closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}
// Pour ne pas fermer la modale en cliquant sur la modale
const stopPropagation = function(e){
    e.stopPropagation()
}

////////////////////////////////////////////////////////////////


// Gestion fonction + bouton///
console.log(window.location.href)
//Si on est dans la page User.html
if (window.location.href === "http://127.0.0.1:5501/User.html"){

    genererCollection(collection);
    BoutonFiltres();

    //Bouton Tous//
    const boutonTous = document.querySelector(".bouton0");
    boutonTous.addEventListener("click", function () {
        const collectionComplete = collection.filter(function (collection) {
            return collection;
        });
        document.querySelector(".gallery").innerHTML = "";
        genererCollection(collectionComplete);
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

}
//Si on est dans la page Admin.html + Modale
else if(window.location.href === "http://127.0.0.1:5501/Admin.html"){

    genererCollection(collection);
    ModaleVue1(collection)

    document.querySelectorAll(".js-modal").forEach(a=>{
        a.addEventListener("click",openModal)
    })
    
    // Touche echap pour quitter la modale
    window.addEventListener('keydown',function(e){
        if(e.key === "Escape" || e.key === "Esc"){
            closeModal(e)
        }
    })
}