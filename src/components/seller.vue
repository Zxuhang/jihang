<template>
    <div>
        {{ msg }}
        <bottomNav></bottomNav>
    </div>
</template>
<script>
import bottomNav from './bottom'
export default {
    name:'seller',
    data(){
        return{
            msg:'这是商家'
        }
    },
    components:{
        bottomNav
    }
}
</script>

