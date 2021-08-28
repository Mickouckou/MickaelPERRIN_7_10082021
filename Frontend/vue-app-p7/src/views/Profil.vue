<template>
    <div class="profil" id="profil">
        <HeaderSecond />
        
        <AfficheProfil />
    </div>
</template>

<script>
import HeaderSecond from '@/components/HeaderSecond.vue'
import AfficheProfil from '@/components/AfficheProfil.vue'

export default {
    name: 'Profil',
    components: {
        HeaderSecond,
        AfficheProfil
    }
}

</script>