// "sophie.bluel@test.tld"
// "S0phie" 

document.addEventListener("submit", (event) => {
  event.preventDefault();

  fetch('http://localhost:5678/api/users/login', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      "email": document.getElementById("email").value,
      "password": document.getElementById("motdepasse").value
    }),

  })
  
  .then((response) => {
    if (response.status !== 200) {
      alert("Email ou mot de passe erronés");

    } else {
      response.json().then((data) => {
        sessionStorage.setItem("token", data.token); 
        window.location.replace("index.html");
      });
    }
  });
});
