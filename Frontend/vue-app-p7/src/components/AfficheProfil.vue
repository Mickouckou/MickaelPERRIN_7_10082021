<script>
const axios = require('axios');
const userToken = JSON.parse(localStorage.getItem('userToken')) || null;
userProfile();

export default {
    name: 'AfficheProfil'  
}


//  Fonctions
function userProfile() {
    if (userToken === null){
        return status(400).json({ 'error': 'Mauvais token' });
    } else {
        axios.get('http://localhost:8080/api/users/', {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + userToken
            }
        })
        .then(function (response) {
            const email = response.data.email;
            const username = response.data.username;
            const avatar = response.data.avatar;
            showProfile(email,username, avatar);
        })
        .catch(function (error) {
            console.log(error);
            alert(error);
        });
    }
}

function showProfile(email,username, avatar){
    const nouvelleDiv = document.createElement("div");
    let elementMain = document.getElementById("profil");
    elementMain.appendChild(nouvelleDiv);
    //nouvelleDiv.classList.add("col-12", "col-md-6", "col-lg-4", "mt-3");
    nouvelleDiv.innerHTML="<h1>" + username + " est connecté</h1><div><img src=\"" + avatar + "\" alt=\"" + username + "\"><div><h5>" + username + "</h5><p>" + email + "</p></div></div>";
}
</script>
