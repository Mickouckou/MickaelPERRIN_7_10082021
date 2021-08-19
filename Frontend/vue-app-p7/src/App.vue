<template>
    <div id="app">    
        <header>
            <div id="nav">
                <router-link to="/" v-if="idUtilisateur === null">Se connecter</router-link> |
                <router-link to="/register" v-if="idUtilisateur === null">S'inscrire</router-link> |
                <router-link to="/profil" v-if="idUtilisateur != null">Profil</router-link> |
                <router-link to="/home" v-if="idUtilisateur != null">Accueil</router-link>
            </div>
        </header>

        <router-view/>

        <footer>
            <p>{{ copyright }}</p>
            <p>{{ idUtilisateur }}</p>
        </footer>
    </div>
</template>

<script>
export default {
	el: "app",
	data() {
		return {
			firmName: "Groupomania",
			infoFirm: "tous droits réservés",
            idUtilisateur: JSON.parse(localStorage.getItem('userId')) || null
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
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
        color: #42b983;
        }
    }
}
</style>
