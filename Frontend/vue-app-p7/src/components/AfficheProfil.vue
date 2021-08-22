<template>
    <div>
        <button class="button" @click.prevent="deleteUser">Supprimer le compte</button>
        <button class="button" @click.prevent="updateUser">Mettre à jour</button>
    </div>
</template>

<script>
const axios = require('axios');
//const userId = JSON.parse(localStorage.getItem('userId')) || null;
const userToken = JSON.parse(localStorage.getItem('userToken')) || null;
userProfile();

export default {
    name: 'AfficheProfil',
    methods: {
        updateUser(){
            alert("demande de Maj");
            updateOneUser();
        },
        deleteUser(){
            axios.delete('http://localhost:8080/api/users/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                }
            })
            .then(function () {
                alert("Compte supprimé");
                localStorage.clear();
                document.location.reload;
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });
        }
    }
}


//  Fonctions
function userProfile() {
    if (userToken === null){
        return status(400).json({ 'error': 'Mauvais token' });
    } else {
        axios.get('http://localhost:8080/api/users/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken
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
    let chaine = "<h1>" + username + " </h1><div><form><table><tr><td>";
    chaine += "<label for=\"email\">Email :</label><input type=\"text\" name=\"email\" id=\"email\" placeholder=\"" + email + "\" /><p id=\"emailPasConforme\"></p><br>"
    chaine += "<label for=\"username\">Nom d'utilisateur :</label><input type=\"text\" name=\"username\" id=\"username\" placeholder=\"" + username + "\" /><p id=\"usernamePasConforme\"></p><br>";
    chaine += "<p><i>La valeur ne sera pas mise à jour si vous ne touchez pas au champ</i></p></td><td>";
    chaine += "<img src=\"" + avatar + "\" alt=\"" + username + "\"><br>";
    //chaine += "<button class=\"button\" @click.prevent=\"updateUser\">Mettre à jour</button><br>";
    //chaine += "<button class=\"button\" @click.prevent=\"deleteUser\">Supprimer le compte</button>";
    chaine += "</td></tr></table></form></div>";
    nouvelleDiv.innerHTML= chaine;
}

function updateOneUser(){
    var email;
    var username;
    var avatar;
    axios.get('http://localhost:8080/api/users/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userToken
            }
        })
        .then(function (response) {
            const emailbdd = response.data.email;
            const usernamebdd = response.data.username;
            const avatarbdd = response.data.avatar;
            if (document.getElementById('email').value != "")
                email = document.getElementById('email').value;
            else
                email = emailbdd;
            if (document.getElementById('username').value != "")
                username = document.getElementById('username').value;
            else
                username = usernamebdd;
            /*if (document.getElementById('avatar').value != null)
                avatar = document.getElementById('avatar').value;
            else*/
                avatar = avatarbdd;
            alert (email + " : " + username + " : " + avatar);
            if (userToken === null){
                return status(400).json({ 'error': 'Mauvais token' });
            } else {
                axios('http://localhost:8080/api/users/', {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + userToken
                    },
                    data: {
                        email:email,
                        username:username,
                        avatar:avatar
                    },
                    
                })
                .then(function () {
                    alert("Maj faite");
                    document.location.replace('http://localhost:8081/#/profil');
                })
                .catch(function (error) {
                    console.log(error);
                    alert(error);
                });
            }
        })
        .catch(function (error) {
            console.log(error);
            alert(error);
        });
}
</script>
