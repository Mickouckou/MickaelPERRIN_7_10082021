<template>
	<div id="app" class="app">
		<header>
            <a href="/">Accueil</a>&nbsp;
            <a href="/">Profil</a>
        </header>

        <main>
            <h1>S'inscrire / Se connecter</h1>
            <form>
                <input type="radio" name="regLog" value="register" id="register" v-model="choix" /><label for="register">S'inscrire</label>
                <input type="radio" name="regLog" value="login" id="login" v-model="choix" /><label for="login">Se connecter</label>
            </form>

            <!--<div>{{ choix }}</div>-->
            <div class="formulaire" v-if="choix === 'register'">
                <form action="http://localhost:8080/api/users/register" method="post">
                    <fieldset>
                        <legend>S'inscrire</legend>
                        <label for="email">Email :</label><input type="text" name="email" /><br>
                        <label for="username">Nom d'utilisateur :</label><input type="text" name="username" /><br>
                        <label for="password">Mot de passe :</label><input type="password" name="password" /><br>
                        <input type="submit" value="S'inscrire">
                    </fieldset>
                </form>
            </div>

            <div class="formulaire" v-if="choix === 'login'">
                <form action="http://localhost:8080/api/users/login" method="post">
                    <fieldset>
                        <legend>Se connecter</legend>
                        <label for="email">Email :</label><input type="text" name="email" /><br>
                        <label for="password">Mot de passe :</label><input type="password" name="password" /><br>
                        <input type="submit" value="Se connecter">
                    </fieldset>
                </form>
            </div>
            
            

        </main>

        <footer>
            <p>{{ copyright }}</p>
        </footer>
	</div>
</template>

<script>
export default {
	el: "App",
	data() {
		return {
			firmName: "Groupomania",
			infoFirm: "tous droits réservés",
            choix: "register"
		}
	},
	computed: {
		copyright() {
			const currentYear = new Date().getFullYear()
			return `${this.firmName} ${currentYear} ${this.infoFirm}`
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
    margin:50px, 0, 50px, 0;
}
fieldset{
    width:600px;
    margin: auto;
}
</style>