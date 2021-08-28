<template>
    <header>
        <div id="nav">
            <router-link to="/">Se connecter</router-link> &nbsp;
            <router-link to="/register">S'inscrire</router-link>
        </div>
        <img src="..\logos\icon-above-font2.png" alt ="logo Groupomania">
    </header>
</template>

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