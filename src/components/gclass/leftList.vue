<template>
    <div class="leftNav">
        <ul>
            <li v-for="(n,i) in dgc" :key="n.id" :class="{'active':i==0}" @click="active(i)" ref="tit">
               <router-link :to="{name:'c1',params:{id:n.id}}" >
                 <span v-text="n.typeName"></span>
               </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:"leftList",
    props:{
        dgc:Array
    },
    data(){
        return {
            isAct:'0',
        }
    },
    methods:{
        active:function(t){
            this.$refs.tit[this.isAct].className = '';
            this.$refs.tit[t].className = 'active';
            this.isAct = t;
        }
    }
}
</script>
<style scoped>
.leftNav{
    width:100px;
    height:100%;
    background:#f7f7f7;
}
ul{
    width:100%;
    height:100%;
    overflow-y:auto;
}
ul li{
    width:100%;
    -webkit-box-sizing:border-box;
    box-sizing:border-box;
    padding-left:3px;
    padding-top:8px;
    padding-bottom:8px;
}
ul li a{
    display:block;
    width:100%;
    /* margin:10px 0; */
    color:#8f8f8f;
}
ul .active{
    border-left:3px solid #ff5f28;
    padding-left:0;
}
</style>


