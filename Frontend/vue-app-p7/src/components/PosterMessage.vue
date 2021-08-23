<template>
    <div class="createMsg">
        <form>
            <fieldset>
                <legend>Poster un nouveau message</legend>
                <label for="title">Titre :</label><input type="text" name="title" v-model="title" required /><br>
                <label for="content">Contenu du message :</label><textarea name="content" v-model="content" rows="10" cols="50" required /><br>
                <p><i>Tous les champs sont obligatoires pour poster</i></p>
                <input type="submit" @click.prevent="createMsg" value="Poster">
            </fieldset>
        </form>
    </div>
</template>

<script>
const axios = require('axios');
const userToken = JSON.parse(localStorage.getItem('userToken')) || null;

export default {
    name: 'AfficheMessages',
    data(){
        return{
            title:"",
            content:""
        }
    },
    methods: {
        createMsg(){
            let donneeValide = true;         
            const title = this.title;
            const content = this.content; 
            if (title.length <= 2 || content.length <= 4) {
                donneeValide = false;
            }   
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
                    console.log(response);
                    document.location.reload('http://localhost:8081/#/messages/');
                })
                .catch(function (error) {
                    console.log(error);
                });         
            }
        }
    }
}

</script>
