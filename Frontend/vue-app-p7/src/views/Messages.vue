<template>
    <div class="messages" id="messages">
        <header>
            <div id="nav">
                <router-link to="/profil">Profil</router-link> &nbsp;
                <router-link to="/messages">Messages</router-link>
            </div>
            <button class="button" id="logout" @click="logout">Se déconnecter</button>
        </header>

        <AfficheMessages />
    </div>
</template>

<script>
import AfficheMessages from '@/components/AfficheMessages.vue'

export default {
    name: 'Messages',
    components: {
        AfficheMessages
    }
}

</script>