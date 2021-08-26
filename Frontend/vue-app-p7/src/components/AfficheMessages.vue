<template>
    <div v-if="messages.length !== 0">
        <div v-for="message in messages" :key="message.id" class="card">
            <div class="titrecard">
                <h2>{{ message.title }}</h2><p>par {{ message.User.username }}</p>
            </div>
            
            <!-- Si lutilisateur connecté n'est pas l'auteur du message -> affichage basique -->
            <div class="contentcard"  v-if="message.UserId != userIdentifie">
                <!--<div v-if="message.image !== '' && message.image !== null && (message.image.split('.')[2] === 'png' || 'jpg')">
                    <img :src="message.image" alt="image">
                </div>-->
                <div>{{ message.content }}</div>
            </div>
            
            <!-- Si lutilisateur connecté est l'auteur du message -> modification possible -->
            <div class="contentcard" v-if="message.UserId === userIdentifie || userIsAdmin === true">
                <form>
                    <label for="modifytitle">Titre du message :</label><input type="text" name="modifytitle" v-model="message.title" id="modifytitle" /><br>
                    <label for="modifycontent">Contenu du message :</label><textarea name="modifycontent" id="modifycontent" v-model="message.content" rows="10" cols="50" /><br>
                    <p><i>La valeur ne sera pas mise à jour si vous ne touchez pas au champ</i></p>
                    <button class="button" @click.prevent="updateMsg(message.id, message.title, message.content)">Mettre à jour</button>
                </form>
            </div>
            <div v-if="message.UserId === userIdentifie">
                ---------------<button class="button" @click="deleteMsg(message.id)">Supprimer le message</button>---------------
            </div>
            
            <div class="commentcard">
                <div v-for="comment in comments .filter((comment) => { return comment.MessageId === message.id;})" :key="comment.id" class="commentincard">
                    <div>{{ comment.comment }}</div><p>par {{ comment.User.username }}</p>
                    <div v-if="comment.UserId === userIdentifie">
                        ---------------<button class="button" @click="deleteComment(message.id, comment.id)">Supprimer le commentaire</button>---------------
                    </div>
                </div>
                <form>
                    <label for="newcomment">Commentaire :</label><textarea name="newcomment" v-model="newcomment" rows="2" cols="50" /><br>
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
        updateMsg(id, title, content) {
            axios('http://localhost:8080/api/messages/'+id, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + userToken
                },
                data: {
                    title:title,
                    content:content
                },
            })
            .then(function(response) {
                console.log(response);
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
.card{
    border: 2px solid green;
    border-radius: 20px;
    margin: 5%;
}
.titrecard{
    display: flex;
    justify-content: center;
    align-items: flex-end;
}
.titrecard p{
    font-style: italic;
}
.commentcard{
    border: 1px solid lightgreen;
    border-radius: 15px;
    margin: 3%;
}
.commentincard{
    border: 1px solid lightseagreen;
    border-radius: 10px;
    margin: 1%;
}
</style>
