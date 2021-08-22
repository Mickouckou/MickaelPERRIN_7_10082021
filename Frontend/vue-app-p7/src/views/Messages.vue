<template>
    <div class="messages" id="messages">
        <header>
            <div id="nav">
                <router-link to="/profil">Profil</router-link> &nbsp;
                <router-link to="/messages">Messages</router-link>
            </div>
            <button class="button" id="logout" @click="logout">Se déconnecter</button>
        </header>

        <div class="createMsg">
            <form>
                <fieldset>
                    <legend>Poster un nouveau message</legend>
                    <label for="title">Titre :</label><input type="text" name="title" id="title" required /><br>
                    <label for="content">Contenu du message :</label><textarea name="content" id="content" rows="10" cols="50" required /><br>
                    <p><i>Tous les champs sont obligatoires pour poster</i></p>
                    <input type="submit" @click.prevent="createMsg" value="Poster">
                </fieldset>
            </form>
        </div>

        <AfficheMessages />
    </div>
</template>

<script>
import AfficheMessages from '@/components/AfficheMessages.vue';
const axios = require('axios');
const userToken = JSON.parse(localStorage.getItem('userToken')) || null;

export default {
    name: 'Messages',
    components: {
        AfficheMessages
    },
    methods: {
        logout(){
            localStorage.clear();
            document.location.replace('http://localhost:8081/');
        },
        createMsg(){
            let donneeValide = true;         
            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value; 
            if (title.length <= 2 || content.length <= 4) {
                donneeValide = false;
            }
            alert(title + " " + content + " " + userToken);    
            if (donneeValide === true) {         
                axios('http://localhost:8080/api/messages/new/', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + userToken
                    },
                    data: {
                        title: title,
                        content: content
                    }
                })
                .then(function (response) {
                    alert(response);
                })
                .catch(function (error) {
                    console.log(error);
                });         
            }
        }
    }
}

</script>