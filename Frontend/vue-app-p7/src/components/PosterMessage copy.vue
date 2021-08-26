<template>
    <div class="createMsg">
        <form enctype="multipart/form-data">
            <fieldset>
                <legend>Poster un nouveau message</legend>
                <label for="title">Titre :</label><input type="text" name="title" v-model="title" required /><br>
                <label for="picture">Insérez une image :</label><input type="file" name="picture" id="picture" accept="image/*" /><br>
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
            content:"",
        }
    },
    methods: {
        createMsg() {
            // Récupération de l'image
            let img = document.getElementById('picture').files[0];
            // Création d'un formData obligatoire pour envoi de l'image
            var formData = new FormData();
            formData.append("img", img);
            formData.append("title", this.title);
            formData.append("content", this.content);
            alert(img + " " + this.title + " " + this.content);
            // Envoi des données sur l'url du serveur en POST en envoyant le formData contenant notre image
            axios('http://localhost:8080/api/messages/new/', {
                    method: 'post',
                    headers: {
                        //'Content-Type': 'application/json',
                        //'Content-Type' : 'image/png',
                        'Authorization': 'Bearer ' + userToken
                    },
                    data:   {
                        formData
                    }
                .then(function (response) {
                    console.log(response);
                    document.location.reload('http://localhost:8081/#/messages/');
                })
                .catch(function (error) {
                    console.log(error);
                    alert(error);
                })
            });
        }
    }
}
/*var formData = new FormData();
            alert (this.title + " " + this.content + " " + this.image + " " + this.image.filename);
            if (this.image !== null || "") {
                formData.append("image", this.image, this.image.filename);*/
                //data.append("title", this.title);
                //data.append("content", this.content);
            /*} else {
                formData.append("title", this.title);
                formData.append("content", this.content);
            }*/


            /*let donneeValide = true;
            var image;        
            const title = this.title;
            const content = this.content;
            if (this.image != "")
                image = this.image;
            else
                image = "";
            alert(image);
            if (title.length <= 2 || content.length <= 4) {
                donneeValide = false;
            }   
            if (donneeValide === true) {  */       
                /*axios('http://localhost:8080/api/messages/new/', {
                    method: 'post',
                    headers: {
                        //'Content-Type': 'application/json',
                        'Content-Type' : 'image/png',
                        'Authorization': 'Bearer ' + userToken
                    },
                    data:   {
                        data
                    }*/
                    /*data: {
                        title: title,
                        content: content,
                        image: image
                    }*/
                /*})
                .then(function (response) {
                    console.log(response);
                    document.location.reload('http://localhost:8081/#/messages/');
                })
                .catch(function (error) {
                    console.log(error);
                });*/

                /*envoi(){
            // Récupération de l'image
            let img = document.getElementById('picture').files[0]
            // Création d'un formData obligatoire pour envoi de l'image
                var formData = new FormData()
                formData.append('img', img)
                formData.append('alt_text', this.alt_text)
                // Envoi des données sur l'url du serveur (mettez la votre) en POST en envoyant le formData contenant notre image et notre texte
                axios.post('http://localhost:3000/upload_image', formData)
                .then((resp) => {
                    console.log(resp)
                })
                .catch((err) => {
                    console.log(err.response)
                })
            }
        },*/
</script>
