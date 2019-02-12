<template>
    <div class="rightCon">   
        <div class="r-top">
            <img :src="g.typeImage" :alt="g.typeName">
        </div>
        <div class="r-list">
            <div v-for="item in g.son" :key="item.id">
                <img src="static/images/index_41.png" alt="">
                <p v-text="item.typeName"></p>
            </div>
            <!-- <div>
                <img src="static/images/index_41.png" alt="">
                <p>日常用品</p>
            </div> -->
        </div>
    </div>
</template>
<script>
export default {
    name:'rightCon',
    data(){
        return{
        }
    },
    props:{gc:String},
    computed:{
        g(){
            console.log(this.gc)
            return JSON.parse(this.gc);
        }
    }
    
}
</script>
<style scoped>
.rightCon{
    flex:1 1;
    height:100%;
    overflow-y:auto;
}
.r-top{
    width:100%;
    box-sizing: border-box;
    padding:5px;
}
.r-top img{
    width:100%;
}
.r-list{
    width:100%;
    overflow:hidden;
}
.r-list>div{
    float:left;
    width:50%;
    padding:5px;
    box-sizing:border-box;
    -webkit-box-sizing: border-box;
}
.r-list>div img{
    width:100%;
}
</style>


