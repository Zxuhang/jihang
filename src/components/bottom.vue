<template>  
    <div class="menu">
      <router-link v-for="(item,index) in menuDef" :to="'/'+item.to" :class="{'menu-active':item.isAct}" :key="item.title">
        <div @click="menuchanged(index)">
          <p><i :class="item.icon"></i></p>
          {{item.title}}
        </div>        
      </router-link>
      <!-- <router-link to="/" :class="{'menu-active':isActive1}">
        <p><i class="iconfont icon-shouye1"></i></p>
        首页
      </router-link>
      <router-link to="/gclass" :class="{'menu-active':isActive2}">
        <p><i class="iconfont icon-yongtu"></i></p>
        商品分类
      </router-link>
      <router-link to="/gclass" :class="{'menu-active':isActive3}">
        <p><i class="iconfont icon-icon-test"></i></p>
        商家
      </router-link>
      <router-link to="/cart" :class="{'menu-active':isActive4}">
        <p><i class="iconfont icon-caigou-xianxing"></i></p>
        购物车
      </router-link>
      <router-link to="/usercenter" :class="{'menu-active':isActive5}">
        <p><i class="iconfont icon-wode"></i></p>
        会员中心
      </router-link> -->
    </div>
</template>
<script>
export default {
    name:'bottomNav',
    data(){
        return {
             mActive:0,
             menu:[
                {to:'',isAct:false,icon:'iconfont icon-shouye1',title:'首页'},
                {to:'gclass',isAct:false,icon:'iconfont icon-yongtu',title:'商品分类'},
                {to:'seller',isAct:false,icon:'iconfont icon-shangjia',title:'商家'},
                {to:'cart',isAct:false,icon:'iconfont icon-gouwuche',title:'购物车'},
                {to:'usercenter',isAct:false,icon:'iconfont icon-wode',title:'会员中心'},
            ],
        }
    },
    methods:{
        menuchanged:function(index){
        this.menu[this.mActive].isAct = false;
        this.menu[index].isAct = true;
        this.mActive = index;
        }
    },
    computed:{
        menuDef:function(){
        var This = this;
        var rName = This.$route.name;
        if(rName == 'Home'){
            rName = '';
        }
        this.menu.forEach(function(item,index){
            if(rName == item.to){
            This.menu[index].isAct = true;
            This.mActive = index;
            }
        });
        return this.menu;
        
        }
    },
}
</script>
<style scoped>

/*底部菜单*/
.menu-active{
  color:#ff5f28 !important;
}
.menu{
  width:100%;
  position:absolute;
  left:0;
  bottom:0;
  z-index:101;
  padding:3px 0;
  font-size:14px;
  overflow:hidden;
  background:#f5f0f0;
}
.menu i{
  font-size:17px;
}
.menu a{
  text-decoration:none;
  color:#797979;
  display:block;
  float:left;
  width:20%;
}
</style>

