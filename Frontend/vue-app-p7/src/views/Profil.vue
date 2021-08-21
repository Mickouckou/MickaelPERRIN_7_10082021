<template>
    <div class="profil" id="profil">
        <header>
            <div id="nav">
                <router-link to="/profil">Profil</router-link> &nbsp;
                <router-link to="/messages">Messages</router-link>
            </div>
        </header>
        
        <AfficheProfil />
        <!--<button class="button" id="profil" @click.prevent="userProfile">Afficher le profil</button>-->
        <!-- Code généré par le JavaScript -->
        <button class="button" id="logout" @click="logout">Se déconnecter</button>
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