<script>
const axios = require('axios');
//const userToken = JSON.parse(localStorage.getItem('userToken')) || null;
showMessages();

export default {
    name: 'AfficheMessages'  
}


//  Fonctions
function showMessages() {
    axios.get('http://localhost:8080/api/messages/', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(function(response) {
        const nbMessages = response.data.length;
        for (let i = 0; i < nbMessages; i++) {
            showMessage(response.data[i]);
        }
    })
    .catch(function (error) {
        console.log(error);
        alert(error);
    });
}

//Affichage des messages sur le mur
function showMessage(tableau){
    const nouvelleDiv = document.createElement("div");
    let elementMain = document.getElementById("messages");
    elementMain.appendChild(nouvelleDiv);
    nouvelleDiv.innerHTML="<div><p>Auteur: " + tableau.User.username + "</p><h2>" + tableau.title + "</h2><div><img src=\"" + tableau.image + "\" alt=\"" + tableau.image + "\"></div><div>" + tableau.content + "</div></div>";

    //nouvelleDiv.innerHTML= tableau.title;
}
</script>
