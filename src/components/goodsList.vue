<template>
    <div id="g_list"> 
        <div class="goods_" v-for="goods in gDatas" :key="goods.id">
            <router-link :to="{name:'gDetails',params:{gid:goods.id}}">
            <img :src="goods.goodsImg" :alt="goods.goodsName">
            <p v-text="goods.goodsName"></p>
            <span>￥<span v-text="goods.goodsPrice"></span></span>
            </router-link>
        </div>
       
    </div>
    
</template>

<script>
export default {
    name:"goodsList",
    props:{
        gDatas:Array,
    },
    // props:['gDatas'],
    data(){
        return {
           
        }
    }
}
</script>
<style scoped>
#g_list{
    width:100%;
    /* overflow:hidden; */
}
#g_list .goods_{
    width:50%;
    box-sizing:border-box;
    border-bottom:1px solid #dad7d7;
    font-size:14px;
    float:left;
    padding-left:1px;
    text-align:left;
    padding-top:5px;
    padding-bottom:5px;
}
#g_list .goods_:nth-child(2n+1){
    border-right:1px solid #dad7d7;
    padding-left:0;
}
#g_list .goods_ img{
    width:100%;
}
#g_list .goods_ p{
    height:40px;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
    padding:0 5px;
}
#g_list .goods_ span{
    display:inline-block;
    margin-left:5px;
    color:#e53330;
}

</style>


