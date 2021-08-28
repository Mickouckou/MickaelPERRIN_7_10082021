<template>
    <div class="messages" id="messages">
        <HeaderSecond />

        <PosterMessage />

        <AfficheMessages />
    </div>
</template>

<script>
import HeaderSecond from '@/components/HeaderSecond.vue'
import AfficheMessages from '@/components/AfficheMessages.vue';
import PosterMessage from '@/components/PosterMessage.vue';
//const axios = require('axios');

export default {
    name: 'Messages',
    components: {
        HeaderSecond,
        PosterMessage,
        AfficheMessages
    }/*,
    methods: {
        logout(){
            localStorage.clear();
            document.location.replace('http://localhost:8081/');
        }
    }*/
}

</script>