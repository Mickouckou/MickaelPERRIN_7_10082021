<template>
    <div class="messages" id="messages">
        <header>
            <div id="nav">
                <router-link to="/profil">Profil</router-link> &nbsp;
                <router-link to="/messages">Messages</router-link>
            </div>
            <button class="button" id="logout" @click="logout">Se déconnecter</button>
        </header>

        <PosterMessage />

        <AfficheMessages />
    </div>
</template>

<script>
import AfficheMessages from '@/components/AfficheMessages.vue';
import PosterMessage from '@/components/PosterMessage.vue';
//const axios = require('axios');

export default {
    name: 'Messages',
    components: {
        PosterMessage,
        AfficheMessages
    },
    methods: {
        logout(){
            localStorage.clear();
            document.location.replace('http://localhost:8081/');
        }
    }
}

</script>