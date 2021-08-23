<template>
    <div v-if="messages.length !== 0">
        <div v-for="(message, id) in messages.slice()" v-bind:key="id" class="card">
            <div class="titrecard">
                <h2>{{ message.title }}</h2><p>par {{ message.User.username }}</p>
            </div>
            <div class="contentcard">
                <div>
                    <img v-if="message.image !== '' && message.image !== null && (message.image.split('.')[2] === 'png' || 'jpg')" :src="message.image" alt="image">
                </div>
                <div>{{ message.content }}</div>
            </div>
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
//const userToken = JSON.parse(localStorage.getItem('userToken')) || null;

export default {
    name: 'AfficheMessages',
    data(){
        return{
            messages:[]
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
