<template>
    <div v-if="messages.length !== 0">
        <div v-for="(message, id) in messages.slice()" v-bind:key="id" class="card">
            <div class="titrecard">
                <h2>{{ message.title }}</h2><p>par {{ message.User.username }}</p>
            </div>
            
            <!-- Si lutilisateur connecté n'est pas l'auteur du message -> affichage basique -->
            <div class="contentcard" v-if="message.UserId != userIdentifie">
                <!--<div v-if="message.image !== '' && message.image !== null && (message.image.split('.')[2] === 'png' || 'jpg')">
                    <img :src="message.image" alt="image">
                </div>-->
                <div>{{ message.content }}</div>
            </div>
            
            <!-- Si lutilisateur connecté est l'auteur du message -> modification possible -->
            <div class="contentcard" v-if="message.UserId === userIdentifie">
                <form>
                    <label for="title">Titre du message :</label><input type="text" name="title" v-model="message.title" id="modifytitle" /><br>
                    <label for="content">Contenu du message :</label><textarea name="content" id="modifycontent" v-model="message.content" rows="10" cols="50" /><br>
                    <p><i>La valeur ne sera pas mise à jour si vous ne touchez pas au champ</i></p>
                    <button class="button" @click.prevent="updateMessage(message.id)">Mettre à jour</button>
                </form>
            </div>
            <diV v-if="message.UserId === userIdentifie">
                ---------------<button class="button" @click="deleteMsg(message.id)">Supprimer le message</button>---------------
            </diV>
            
            <div class="commentcard">
            
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
            userIdentifie: JSON.parse(localStorage.getItem('userId')) || null
        };
    },

    async created(){
        this.messages = [];

        await axios
            .get('http://localhost:8080/api/messages/')
            .then(
                (response) => ((this.messages = response.data), console.log(response))
            )
            .catch((error) => console.log(error));
    },
    methods:{
        updateMsg(id) {
            var titleup, contentup;
            axios.get('http://localhost:8080/api/messages/'+id, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + userToken
                    }
                })
            .then(function (response) {
                const titlebdd = response.data.title;
                const contentbdd = response.data.content;
                //const imagebdd = response.data.image;
                if (document.getElementById('modifytitle').value != "")
                    titleup = document.getElementById('modifytitle').value;
                else
                    titleup = titlebdd;
                if (document.getElementById('modifycontent').value != "")
                    contentup = document.getElementById('modifycontent').value;
                else
                    contentup = contentbdd;
                alert(titleup + " " + contentup);
                /*if (document.getElementById('avatar').value != null)
                    avatarup = this.avatar;
                else
                    avatarup = avatarbdd;*/
                if (userToken === null){
                    return status(400).json({ 'error': 'Mauvais token' });
                } else {
                    axios('http://localhost:8080/api/messages/'+id, {
                        method: 'put',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + userToken
                        },
                        data: {
                            title:titleup,
                            content:contentup
                        },
                    })
                    .then(
                        (response) => ((this.message = response.data), console.log(response))
                    )
                    .catch((error) => console.log(error)
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
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
        }
    }
}
</script>

<style lang="scss">
.card{
    border: 2px solid grey;
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
    border: 1px solid lightgrey;
    border-radius: 15px;
    margin: 3%;
}
</style>
