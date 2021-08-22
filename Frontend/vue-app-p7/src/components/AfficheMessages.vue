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
    let chaine ="<div class=\"card\"><div class=\"titrecard\"><h2>" + tableau.title + "</h2><p>par " + tableau.User.username + "</p></div>"
    chaine += "<div class=\"contentcard\">";
    if (tableau.image != null)
        chaine += "<div><img src=\"" + tableau.image + "\" alt=\"" + tableau.image + "\"></div>";
    chaine += "<div>" + tableau.content + "</div></div>";
    chaine += "<div class=\"commentcard\" id=\"commentcard\">";
    chaine += "</div></div>";
    nouvelleDiv.innerHTML=chaine;

    //nouvelleDiv.innerHTML= tableau.title;
}
</script>

<style lang="scss">
.card{
    border: 2px solid grey;
    border-radius: 20px;
    margin: 5%;
}
.titrecard{
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
.titrecard p{
    font-style: italic;
}
.commentcard{
    border: 1px solid lightgrey;
    border-radius: 15px;
    margin: 3%;
}
</style>
