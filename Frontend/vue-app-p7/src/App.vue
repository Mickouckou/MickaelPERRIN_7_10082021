<template>
    <div id="app">    

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
            idUtilisateur: JSON.parse(localStorage.getItem('userId')),
            isAdmin: JSON.parse(localStorage.getItem('isAdmin'))
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

form{
    width:800px;
    margin: auto;
}
</style>
