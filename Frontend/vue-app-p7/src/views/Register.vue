<template>
    <div class="register">        
        <header>
            <div id="nav">
                <router-link to="/">Se connecter</router-link> &nbsp;
                <router-link to="/register">S'inscrire</router-link>
            </div>
        </header>

        <h1>S'inscrire</h1>
    
        <div class="formulaire">
            <form>
                <fieldset>
                    <legend>S'inscrire</legend>
                    <label for="email">Email :</label><input type="email" name="email" v-model="email" required /><p id="emailPasConforme"></p><br>
                    <label for="username">Nom d'utilisateur :</label><input type="text" name="username" v-model="username" required /><p id="usernamePasConforme"></p><br>
                    <label for="password">Mot de passe :</label><input type="password" name="password" v-model="password" required/><p id="passwordPasConforme"></p><br>
                    <p><i>Tous les champs sont obligatoires pour s'inscrire</i></p>
                    <input type="submit" @click.prevent="registerUser" value="S'inscrire">
                </fieldset>
            </form>
        </div>
    </div>
</template>

<script>
const axios = require('axios');
export default {
    data(){
        return{
            email:"",
            password: "",
            username: ""
        }
    },
    methods: {
        registerUser(){
            let donneeValide = true;         
            const email = this.email;
            const password = this.password;
            const username = this.username;  
            if (validation("emailPasConforme", /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, email, "Veuillez renseigner votre email et respecter le format requis") === false) {
                donneeValide = false;
            }
            if (validation("passwordPasConforme", /^(?=.*\d).{4,12}$/, password, "Le mot de passe doit comprendre entre 4 et 12 caractères avec au moins un chiffre") === false) {
                donneeValide = false;     
            }    
            if (validation("usernamePasConforme", /^[A-Za-z' -]{4,15}$/, username, "Le nom d'utilisateur doit contenir entre 4 et 15 caractères sans accent ni caractères spéciaux") === false) {
                donneeValide = false;
            }    
            if (donneeValide === true) {         
                axios.post('http://localhost:8080/api/users/register/', {
                    email: email,
                    username: username,
                    password: password
                })
                .then(function (response) {
                    const userId = response.data.userId;
                    const userToken = response.data.token;
                    localStorage.setItem('userId', JSON.stringify(userId));
                    localStorage.setItem('userToken', JSON.stringify(userToken));
                    document.location.replace('http://localhost:8081/#/messages');
                })
                .catch(function (error) {
                    console.log(error);
                });         
            }   
        }
    }
}

//  Fonctions
function validation(idValeur, regex, contenuValeur, message){
    let valeurMessage = document.getElementById(idValeur);
    //On teste si la donnée est vide ou si le regex est respecté
    if (contenuValeur === "" || regex.test(contenuValeur) === false) {
        valeurMessage.innerHTML = message;
        return false;
    //Si la donnée est remplie et respecte le regex    
    } else {
        valeurMessage.innerHTML = "ok";
    }
}
</script>

<style lang="scss">
form{
    width:600px;
    margin: auto;
}
fieldset{
    margin:50px 0 50px 0;
    
}
</style>