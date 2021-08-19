<template>
    <div class="register">
        <h1>S'inscrire</h1>
    
        <div class="formulaire">
            <form>
                <fieldset>
                    <legend>S'inscrire</legend>
                    <label for="emailreg">Email :</label><input type="text" name="emailreg" id="emailreg" /><br>
                    <label for="username">Nom d'utilisateur :</label><input type="text" name="username" id="username" /><br>
                    <label for="passwordreg">Mot de passe :</label><input type="password" name="passwordreg" id="passwordreg" /><br>
                    <input type="submit" @click="registerUser" value="S'inscrire">
                </fieldset>
            </form>
        </div>
    </div>
</template>

<script>
const axios = require('axios');
export default {
    methods: {
        registerUser(){
            const email = document.getElementById('emailreg').value;
            const password = document.getElementById('passwordreg').value;
            const username = document.getElementById('username').value;
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
                document.location.replace('http://localhost:8081/#/profil');
            })
            .catch(function (error) {
                console.log(error);
            });
        }
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