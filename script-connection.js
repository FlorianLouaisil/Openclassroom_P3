// Vérification login
// "sophie.bluel@test.tld"
// "S0phie"
// Variable
let username
let password

function request(){
    const rep = fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"email": username, "password": password})
    });

    rep.then(async(response)=>{
  
        const contenu = await response.json();
        // Mot de passe incorrecte
        if(JSON.stringify(contenu) === '{"error":{}}'){
            console.log("Mot de passe incorrecte");
        }
    
        // Identifiant incorrect
        else if(JSON.stringify(contenu) ==='{"message":"user not found"}'){
            console.log("Identifiant incorrect");
        }
        // Correct
        else{
            console.log("Correct");
            window.location.href = "index.html"
        }
    })
    
}


// Bouton "se connecter"
document.getElementById("Submit").onclick = function(){
    username = document.getElementById("email").value;
    password = document.getElementById("motdepasse").value;
    request();
}

