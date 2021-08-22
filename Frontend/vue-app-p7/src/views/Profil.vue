<template>
    <div class="profil" id="profil">
        <header>
            <div id="nav">
                <router-link to="/profil">Profil</router-link> &nbsp;
                <router-link to="/messages">Messages</router-link>
            </div>
            <button class="button" id="logout" @click="logout">Se déconnecter</button>
        </header>
        
        <!-- Code généré par le JavaScript -->
        <AfficheProfil />
    </div>
</template>

<script>
import AfficheProfil from '@/components/AfficheProfil.vue'

export default {
    name: 'Profil',
    components: {
        AfficheProfil
    },
    methods: {
        logout(){
            localStorage.clear();
            document.location.replace('http://localhost:8081/');
        }
    }
}

</script>