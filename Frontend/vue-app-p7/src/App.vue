<template>
    <div id="app">    

        <router-view/>

        <footer>
            <img src=".\logos\icon.png" alt="petit logo Groupomania">
            <p>{{ copyright }}</p>
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
$primary: #FD2D01;
$second: #FDD7D7;
$anciennecouleurlien: #42b983;
$anciennecouleurfont: #2c3e50;

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    padding: 0;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
        color:$primary;
        }
    }
}

/*----------------------Mise en forme des formulaires------------------*/
.formulaire {
    width: 100%;
    margin: auto;
    margin-top: 60px;
    margin-bottom: 60px;
}
br{
    width:0;
}
@media screen and (max-width: 766px) {
    label {
        display: inline-block;
        width: 150px;
        text-align: right;
    }
    input, textarea {
        font: 1em;
        width: 150px;
        box-sizing: border-box;
        /* Pour harmoniser le look & feel des bordures des champs texte */
        border: 1px solid $second;
    }
    textarea {
        /* Pour aligner les champs texte multi‑ligne avec leur étiquette */
        vertical-align: top;
    
        /* Pour donner assez de place pour écrire du texte */
        height: 5em;
    }
}
@media screen and (min-width: 767px) and (max-width: 1200px) {
    label {
        display: inline-block;
        width: 250px;
        text-align: right;
    }
    input, textarea {
        font: 1em;
        width: 250px;
        box-sizing: border-box;
        /* Pour harmoniser le look & feel des bordures des champs texte */
        border: 1px solid $second;
    }
    textarea {
        /* Pour aligner les champs texte multi‑ligne avec leur étiquette */
        vertical-align: top;
    
        /* Pour donner assez de place pour écrire du texte */
        height: 5em;
    }
}
@media screen and (min-width: 1200px) {
    label {
        display: inline-block;
        width: 250px;
        text-align: right;
    }
    input, textarea {
        font: 1em;
        width: 350px;
        box-sizing: border-box;
        /* Pour harmoniser le look & feel des bordures des champs texte */
        border: 1px solid $second;
    }
    textarea {
        /* Pour aligner les champs texte multi‑ligne avec leur étiquette */
        vertical-align: top;
    
        /* Pour donner assez de place pour écrire du texte */
        height: 7em;
    }
}

button, .button {
    margin-top: 10px;
    background-color: $second;
    border: 2px solid $primary;
    border-radius: 15px;
    margin-bottom: 10px;
    padding: 5px 20px 5px 20px;
}

/*----------------------Danger suppression de profil------------------*/
.suppression{
        margin: auto;
        margin-top: 50px;
        width: 50%;
        border-radius: 20px 0 20px 20px;
        padding: 1%;
        background-color: $second;
    }
@media screen and (max-width: 766px) {
    .suppression{
        width: 80%;
    }
}

.commentcard .suppression{
    margin: auto;
    margin-bottom: 10px;
    border-radius: 20px 0 20px 20px;
    padding: 1%;
    background-color: $second
}
@media screen and (max-width: 766px) {
    .commentcard .suppression{
        width: 80%;
    }
}
@media screen and (min-width: 766px) {
    .commentcard .suppression{
        width: 50%;
    }
}


/*----------------------Mise en forme du footer------------------*/
footer{
    margin-top:40px;
}
footer img{
    height:80px;
    width: 80px;
    padding: 0;
    margin-bottom: 0px;
}

/*----------------------Mise en forme des messages------------------*/
.card{
    border: 2px solid $primary;
    border-radius: 20px 0 20px 0;
    margin: 5%;
}
.titrecard{
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 15px;
}
.titrecard p{
    font-style: italic;
}
.contentcard img{
    max-width: 90%;
}
.commentcard{
    border: 2px solid $second;
    border-radius: 20px 0 20px 0;
    margin: 3%;
}
.commentcard form{
    margin: 1%;
}
.commentincard{
    border: 1px solid $second;
    border-radius: 10px;
    margin: 1%;
}
.commentincard div{
    margin: 1%;
}

</style>
