<template>
    <div>
        <div class="my-search">
            <mt-search fixed placeholder="寻找宝贝"></mt-search>
        </div>
        
        <div class="gclass">
            <left-list :dgc="dClass"></left-list>
            <rightCon :gc="myclass"></rightCon>
        </div>
        <bottomNav></bottomNav>
    </div>
</template>
<script>
import bottomNav from '../bottom'
import leftList from './leftList'
import rightCon from './rightCon'
export default {
    name:'gclass',
    data(){
        return{
            dClass:[],
            myclass:'{}'
        }
    },
    components:{
        bottomNav,leftList,rightCon
    },
    created(){
        var This = this;
        this.myRequest.get('/shop/classify/get/list')
        .then(function (response) {
            This.dClass = response.data;
            This.myclass = JSON.stringify(This.dClass[0]);
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    beforeRouteUpdate (to, from, next){
        var obj = {};
        obj = this.dClass.find(function(item){
            return item.id == to.params.id
        })
        // obj.id = to.params.id;
        console.log(obj)
        this.myclass = JSON.stringify(obj);
        next();
    }
}
</script>
<style scoped>
.gclass{
    width:100%;
    height:100vh;
    box-sizing:border-box;
    padding:55px 0;
    display:flex;
    display:-webkit-flex;
}
.my-search{
    position:absolute;
    left:0;
    top:0;
    right:0;
    height:48px;
    overflow: hidden;
    z-index: 9999;
}
.mint-searchbar-inner{
    height:20px !important;
    text-align:center !important;
}
.mint-searchbar-core{
  text-align:center !important;
}
.mint-searchbar-inner i{
  order:2;
  font-size:14px !important;
  color:#6b5860 !important;
}
.mint-searchbar{
    padding:5px !important;
    margin:5px !important;
    border-radius:3px !important;
    text-align:center !important;
    background:none !important;
}
.mint-search{
    height:48px !important;
    background:#ff5f28 !important;
}
</style>


