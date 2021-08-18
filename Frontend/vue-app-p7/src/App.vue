<template>
	<div id="app" class="app">
		<header>
            <a href="/">Accueil</a>&nbsp;
            <a href="/" v-if="idUtilisateur != null" @click="afficheProfil">Profil</a>
        </header>
        <h2> Utilisteur n°{{ idUtilisateur }}</h2>
        <!-- Choix entre s'inscrire ou login seulement si l'on n'est pas connecté -->
        <section id="sectionAccueil" v-if="idUtilisateur === null">
            
            <h1>S'inscrire / Se connecter</h1>
            <form>
                <input type="radio" name="regLog" value="register" id="register" checked v-model="choix" /><label for="register">S'inscrire</label>
                <input type="radio" name="regLog" value="login" id="login" v-model="choix" /><label for="login">Se connecter</label>
            </form>

            <div class="formulaire" v-if="choix === 'register'">
                <form>
                    <fieldset>
                        <legend>S'inscrire</legend>
                        <label for="emailreg">Email :</label><input type="text" name="emailreg" id="emailreg" /><br>
                        <label for="username">Nom d'utilisateur :</label><input type="text" name="username" id="username" /><br>
                        <label for="passwordreg">Mot de passe :</label><input type="password" name="passwordreg" id="passwordreg" /><br>
                        <input type="submit" id="inscrire" @click="reg" value="S'inscrire">
                    </fieldset>
                </form>
            </div>

            <div class="formulaire" v-if="choix === 'login'">
                <form>
                    <fieldset>
                        <legend>Se connecter</legend>
                        <label for="email">Email :</label><input type="text" name="email" id="emaillog" /><br>
                        <label for="password">Mot de passe :</label><input type="password" name="password" id="passwordlog" /><br>
                        <input type="submit" id="connecter" @click="connexion" value="Se connecter">
                    </fieldset>
                </form>
            </div>
        </section>

        <!-- Si un utilisateur est connecté -->
        <section v-if="idUtilisateur != null">
            <p>Quelqu'un est connecté</p>
            <button class="logout" id="logout" @click="logout">Se déconnecter</button>
        </section>

        <footer>
            <p>{{ copyright }}</p>
        </footer>
	</div>
</template>

<script>
const axios = require('axios');

export default {
	el: "app",
	data() {
		return {
			firmName: "Groupomania",
			infoFirm: "tous droits réservés",
            choix: "register",
            idUtilisateur: JSON.parse(localStorage.getItem('userId'))
		}
	},
	computed: {
		copyright() {
			const currentYear = new Date().getFullYear()
			return `${this.firmName} ${currentYear} ${this.infoFirm}`
		}
	},
    methods: {
        reg(){
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
                //const userToken = response.data.token;
                //localStorage.setItem('userToken', JSON.stringify(userToken));
                localStorage.setItem('userId', JSON.stringify(userId));
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        connexion(){
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
                document.location.replace('http://localhost:8081/');
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });
        },
        logout(){
            localStorage.clear();
            document.location.replace('http://localhost:8081/');
        },
        afficheProfil(){
        
        }
    }

}
</script>

<style lang="scss">
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
form{
    width:600px;
    margin: auto;
}
fieldset{
    margin:50px 0 50px 0;
    
}
</style>