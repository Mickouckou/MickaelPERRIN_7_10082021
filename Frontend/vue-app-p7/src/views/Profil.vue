<template>
    <div class="profil">
        <h1>L'utilisateur n°{{ idUtilisateur }} est connecté</h1>
        <button class="logout" id="logout" @click="logout">Se déconnecter</button>
    </div>
</template>

<script>
//const axios = require('axios');
export default {
	data() {
		return {
            idUtilisateur: JSON.parse(localStorage.getItem('userId')) || null
		}
	},
    methods: {
        logout(){
            localStorage.clear();
            document.location.replace('http://localhost:8081/');
        }
    }
}
</script>