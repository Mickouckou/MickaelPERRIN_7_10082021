<template>
    <div class="createMsg">
        <form enctype="multipart/form-data">
            <!--<fieldset>
                <legend>Poster un nouveau message</legend>-->
                <h2>Poster un nouveau message</h2>
                <label for="title">Titre :</label><input type="text" name="title" v-model="title" required /><br><br>
                <label for="image">Insérez une image :</label><input type="file" name="image" id="image" accept="image/*" /><br><br>
                <label for="content">Contenu du message :</label><textarea name="content" v-model="content" rows="10" cols="50" required /><br>
                <p><i>Tous les champs sont obligatoires pour poster</i></p>
                <input type="submit" class="button" @click.prevent="createMsg" value="Poster">
            <!--</fieldset>-->
        </form>
    </div>
</template>

<script>
const axios = require('axios');
const userToken = JSON.parse(localStorage.getItem('userToken')) || null;

export default {
    name: 'PosterMessage',
    data(){
        return{
            title:"",
            content:"",
            image:""
        }
    },
    methods: {
        createMsg(){
            // Récupération de l'image
            let img = document.getElementById('image').files[0];

            // Création d'un formData obligatoire pour envoi de l'image
            const data = new FormData();
            if (img != null || ""){
                data.append("image", img);
                data.append("title", this.title);
                data.append("content", this.content);
            } else {
                data.append("title", this.title);
                data.append("content", this.content);
            }
            
            axios('http://localhost:8080/api/images/', {
                method: 'post',
                headers: {
                    //'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },
                data: data
            })
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                document.location.reload('http://localhost:8081/#/messages/');
            })
            .catch(function (error) {
                console.log(error);
            });     
        }  
    }
}

</script>
