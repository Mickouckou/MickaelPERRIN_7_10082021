<template>
    <div class="login">
        <h1>Se connecter</h1>

        <div class="formulaire">    
            <form>
                <fieldset>
                    <legend>Se connecter</legend>
                    <label for="emaillog">Email :</label><input type="text" name="emaillog" id="emaillog" /><br>
                    <label for="passwordlog">Mot de passe :</label><input type="password" name="passwordlog" id="passwordlog" /><br>
                    <input type="submit" @click="userLogin" value="Se connecter">
                </fieldset>
            </form>
        </div>
    </div>
</template>

<script>
const axios = require('axios');
export default {
    methods: {
        userLogin(){
            const email = document.getElementById('emaillog').value;
            const password = document.getElementById('passwordlog').value;
            axios.post('http://localhost:8080/api/users/login/', {
                email: email,
                password: password
            })
            .then(function (response) {
                const userId = response.data.userId;
                const userToken = response.data.token;
                localStorage.setItem('userToken', JSON.stringify(userToken));
                localStorage.setItem('userId', JSON.stringify(userId));
                document.location.replace('http://localhost:8081/#/profil');
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
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