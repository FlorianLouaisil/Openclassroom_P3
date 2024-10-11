fetch('http://localhost:5678/api/works')
  .then((response) => response.json())
  .then((data) => {
    collection = data

    if (sessionStorage.getItem("token") !== null) {
      console.log("connecté")
      RecupererCatégorie();
      document.querySelector(".lien").addEventListener("click", openModal);
      genererCollection(collection);
     }

     else{
       console.log("pas connecté")
       //Suppression lien vers modale
       document.getElementById("masquer").style.display = "none"; 
       genererCollection(collection);
       BoutonFiltres()
     }
})



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


//Modale
function openModal() {
  if (sessionStorage.getItem("token") !== null) {
    modal = document.querySelector(".modal");
    modal.style.display = "flex";
    document.querySelector("#AjouterPhoto").style.display = "none";
    document.querySelector("#Gallery").style.display = "flex";
    ModaleVue1(collection);
    modalStep = 0;
    modal.addEventListener("click", closeModal);
    document.addEventListener("click", BoutonSupp);
    document.addEventListener("click", ModaleVue2);
  }
}

function closeModal(event) {
  if (
    event.target === document.querySelector(".modal") ||
    event.target === document.getElementsByClassName("fa-xmark")[modalStep]
  ) {
    document.querySelector(".modal").style.display = "none";
    document.removeEventListener("click", closeModal);
    document.removeEventListener("click", BoutonSupp);
    modalStep = null;
  }
}



//Modale vue1
function ModaleVue1(collection) {
  const ContenuModale = document.querySelector(".ContenuModale");
  ContenuModale.innerHTML = "";

  collection.forEach((i) => {

    const figure = document.createElement("figure");
    figure.className = "figure";

    const imageCollection = document.createElement("img");
    imageCollection.src = i.imageUrl;

    const corbeille = document.createElement("i");
    corbeille.id = i.id;
    corbeille.classList.add("fa-solid", "fa-trash-can");

    ContenuModale.appendChild(figure);
    figure.append(imageCollection,  corbeille);
  });
}


function BoutonSupp (event) {
  event.preventDefault();
  if (event.target.matches(".fa-trash-can")) {
    SuppElement(event.target.id);
  }
}

//Supprimer un élement de la collection
function SuppElement(i) {

  let token = sessionStorage.getItem("token");
  fetch("http://localhost:5678/api/works/" + i, {
    
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },

  }).then((response) => {

    if (response.ok) {
      collection = collection.filter((work) => work.id != i);
      ModaleVue1(collection);
      genererCollection(collection);
     
    } 
  });
}



//Modale vue 2
function ModaleVue2(event){
  if(event.target === document.querySelector("#BtnAjouterPhoto")){
    //Chargement image explorateur fichier
    InputImage = document.querySelector("#photo");
    InputImage.onchange = picturePreview;

    //Pour ne pas affiché les 2 modales
    document.querySelector("#AjouterPhoto").style.display = "flex";
    document.querySelector("#Gallery").style.display = "none";
    document.querySelector("#labelPhoto").style.display = "flex";
    document.querySelector("#picturePreview").style.display = "none";

    document.removeEventListener("click", BoutonSupp );
    document.removeEventListener("click", ModaleVue2);
    document.addEventListener("click", closeModal);
    document.querySelector(".modalHeader .fa-arrow-left").addEventListener("click", openModal);
    document.addEventListener("click", BoutonEnvoyer);

    selectionCategorie();
  }
}

//Affiché l'image choisi
function picturePreview(){
  const [file] = InputImage.files;
  if (file) {
    document.querySelector("#picturePreviewImg").src = URL.createObjectURL(file);
    document.querySelector("#picturePreview").style.display = "flex";
    document.querySelector("#labelPhoto").style.display = "none";
  }
}


function RecupererCatégorie() {
  
  let listeCategories = new Set();

  collection.forEach((work) => {
    listeCategories.add(JSON.stringify(work.category));
  });
  const TableauCatégorie = [...listeCategories];
  categories = TableauCatégorie.map((s) => JSON.parse(s));
}
//Choix de la catégorie de l'élements
function selectionCategorie() {

  document.querySelector("#selectionCategorie").innerHTML = "";

  option = document.createElement("option");
  document.querySelector("#selectionCategorie").appendChild(option);

  categories.forEach((categorie) => {
    option = document.createElement("option");
    option.value = categorie.name;
    option.innerText = categorie.name;
    option.id = categorie.id;
    document.querySelector("#selectionCategorie").appendChild(option);
  });
};


//Bouton envoyer nouveau contenu
function BoutonEnvoyer(event) {
  if (event.target === document.querySelector("#valider")) {
    event.preventDefault();
    EnvoyerElement();
   }
}

//Envoyer nouveau contenu
function EnvoyerElement() {

  let token = sessionStorage.getItem("token");
  const select = document.getElementById("selectionCategorie");
  const title = document.getElementById("title").value;
  const categoryName = select.options[select.selectedIndex].innerText;
  const categoryId = select.options[select.selectedIndex].id;
  const image = document.getElementById("photo").files[0];
  //FormData
  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);
  formData.append("category", categoryId);
  Envoyer(token, formData, title, categoryName);
   
}





//Mettre a jour la collection dynamiquement
function UpdateCollection(data, categoryName) {
  newWork = {};
  newWork.title = data.title;
  newWork.id = data.id;
  newWork.category = {"id" : data.categoryId, "name" : categoryName};
  newWork.imageUrl = data.imageUrl;
  collection.push(newWork);
}


function Envoyer(token, formData,categoryName) {
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
     authorization: `Bearer ${token}`,
     },
    body: formData,
    
   })
     .then((response) => {
        return response.json();
      })

     .then ((data) => {
      UpdateCollection(data, categoryName);
      genererCollection(collection);
      document.querySelector(".modal").style.display = "none";
      document.removeEventListener("click", closeModal);
      //Renvoie sur la modale 1
      openModal()
  
     })
    
}

