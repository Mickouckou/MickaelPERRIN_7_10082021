<template>
    <div v-if="messages.length !== 0">
        <div v-for="message in messages" :key="message.id" class="card">
            <div class="titrecard">
                <h2>{{ message.title }}</h2><p>par {{ message.User.username }}</p>
            </div>

            <!-- Si l'utilisateur connecté n'est pas l'auteur du message -> affichage basique -->
            <div class="contentcard"  v-if="message.UserId != userIdentifie  && userIsAdmin != true">
                <div v-if="message.image !== '' && message.image !== null && (message.image.split('.')[2] === 'png' || 'jpg')">
                    <img :src="message.image" alt="image"><br><br>
                </div>
                <div>{{ message.content }}</div>
            </div>
            
            <!-- Si l'utilisateur connecté est l'auteur du message -> modification possible -->
            <div class="contentcard" v-if="message.UserId === userIdentifie || userIsAdmin === true">
                <form enctype="multipart/form-data">
                    <label for="modifytitle">Titre du message :</label><input type="text" name="modifytitle" v-model="message.title" id="modifytitle" /><br><br>
                    <img v-if="message.image !== '' && message.image !== null" :src="message.image" alt="image"><br><br>
                    <label for="image">Changer l'image :</label><input type="file" ref="image" @change="upload" /><br><br>
                    <label for="modifycontent">Contenu du message :</label><textarea name="modifycontent" id="modifycontent" v-model="message.content" rows="10" cols="50" /><br>
                    <p><i>La valeur ne sera pas mise à jour si vous ne touchez pas au champ</i></p>
                    <button class="button" @click.prevent="updateMsg(message.id, message.title, message.content)">Mettre à jour</button>
                </form>
            </div>
            <div v-if="message.UserId === userIdentifie" class="suppression">
                <button class="button" @click="deleteMsg(message.id)">Supprimer le message</button>
            </div>
            
            <div class="commentcard">
                <div v-for="comment in comments .filter((comment) => { return comment.MessageId === message.id;})" :key="comment.id" class="commentincard">
                    <!-- Si l'utilisateur connecté n'est pas l'auteur du commentaire -> affichage basique -->
                    <div v-if="comment.UserId != userIdentifie && userIsAdmin != true">{{ comment.comment }}</div><p v-if="comment.UserId != userIdentifie"><i>par {{ comment.User.username }}</i></p>
                    
                    <!-- Si l'utilisateur connecté est l'auteur du commentaire -> modification possible -->
                    <div v-if="comment.UserId === userIdentifie || userIsAdmin === true">
                        <form>
                            <label for="comment">Commentaire :</label><textarea name="comment" v-model="comment.comment" />
                            <button class="button" @click.prevent="updateComment(message.id, comment.id, comment.comment)">Modifier</button>
                        </form>
                    </div>

                    <div v-if="comment.UserId === userIdentifie" class="suppression">
                        <button class="button" @click="deleteComment(message.id, comment.id)">Supprimer le commentaire</button>
                    </div>
                </div>
                <form>
                    <label for="newcomment">Commentaire :</label><textarea name="newcomment" v-model="newcomment" /><br><br>
                    <button class="button" @click.prevent="createComment(message.id)">Commenter</button>
                </form>
            </div>
        </div>
    </div>
    <div v-else>
        <h1>Pas de poste actuellement</h1>
    </div>
    
</template>
    
<script>
const axios = require('axios');
const userToken = JSON.parse(localStorage.getItem('userToken')) || null;

export default {
    name: 'AfficheMessages',
    data(){
        return{
            messages:[],
            comments:[],
            image: [],
            userIdentifie: JSON.parse(localStorage.getItem('userId')) || null,
            userIsAdmin: JSON.parse(localStorage.getItem('isAdmin')) || null
        };
    },
    async created(){
        this.messages = [];
        this.comments = [];

        await axios
            .get('http://localhost:8080/api/messages/')
            .then(
                (response) => ((this.messages = response.data), console.log(response))
            )
            .catch((error) => console.log(error));

        await axios
            .get('http://localhost:8080/api/comments/')
            .then(
                (response) => ((this.comments = response.data), console.log(response))
            )
            .catch((error) => console.log(error));
    },
    methods:{
        upload() {
            this.image = this.$refs.image.files[0];
            console.log(this.image);
        },
        updateMsg(id, title, content) {
            // Récupération de l'image
            let img = this.image;

            // Création d'un formData obligatoire pour envoi de l'image
            const data = new FormData();
            if (this.image != null || ""){
                data.append("image", img);
                data.append("title", title);
                data.append("content", content);
            } else {
                data.append("title", title);
                data.append("content", content);
            }
            
            axios('http://localhost:8080/api/images/'+id, {
                method: 'put',
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
        },
        deleteMsg(id) {
            axios.delete('http://localhost:8080/api/messages/'+id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                }
            })
            .then(function () {
                document.location.reload('http://localhost:8081/#/messages/');
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        createComment(messageId) {         
            const comment = this.newcomment;      
            axios('http://localhost:8080/api/messages/' + messageId + '/newComment/', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },
                data: {
                    comment: comment,
                    MessageId: messageId
                }
            })
            .then(function (response) {
                console.log(response);
                document.location.reload('http://localhost:8081/#/messages/');
            })
            .catch(function (error) {
                console.log(error);
            });         
        },
        updateComment(messageId, commentId, comment){
            axios('http://localhost:8080/api/messages/' + messageId + '/comments/' + commentId, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },
                data:{
                    comment: comment
                }
            })
            .then(function () {
                document.location.reload('http://localhost:8081/#/messages/');
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        deleteComment(messageId, commentId) {
            axios.delete('http://localhost:8080/api/messages/' + messageId + '/comments/' + commentId, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                }
            })
            .then(function () {
                document.location.reload('http://localhost:8081/#/messages/');
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
}
</script>

<style lang="scss">

</style>
