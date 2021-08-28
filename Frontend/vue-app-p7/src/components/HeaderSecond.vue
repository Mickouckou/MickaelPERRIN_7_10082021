<template>
    <header>
            <div id="nav">
                <router-link to="/profil">Profil</router-link> &nbsp;
                <router-link to="/messages">Messages</router-link>
            </div>
            <img src="..\logos\icon-above-font2.png" alt ="logo Groupomania"><br>
            <button class="button" id="logout" @click="logout">Se déconnecter</button>
        </header>
</template>

<script>
export default {
    methods: {
        logout(){
            localStorage.clear();
            document.location.replace('http://localhost:8081/');
        }
    }
}
</script>

<style lang="scss">

@media screen and (max-width: 766px) {
    header img{
        width: 50%;
    }
}
@media screen and (min-width: 767px) and (max-width: 1200px) {
    header img{
        width: 35%;
    }
}
@media screen and (min-width: 1200px) {
    header img{
        width: 25%;
    }
}

header{
    margin-bottom: 50px;
}

</style>