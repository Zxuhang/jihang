<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>

  </div>
</template>

<script>
import store from '../../store/store'
export default {
  name: 'App',
  data(){
    return{
     
    }
  },
  store,
  created(){
    //获取用户数据
      store.commit('getU',this.myRequest);
  }

}
//去除alert和confirm 网址
window.alert = function(name){
    var iframe = document.createElement("IFRAME");
    iframe.style.display="none";
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
}
window.confirm = function (message) {
    var iframe = document.createElement("IFRAME");
    iframe.style.display = "none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    var alertFrame = window.frames[0];
    var result = alertFrame.window.confirm(message);
    iframe.parentNode.removeChild(iframe);
    return result;
}
</script>

<style>
*{
  /* 滚动条不流畅 */
  -webkit-overflow-scrolling:touch;    /* 用于 ios5+ */  
}
html,body,p,ul,li,h4{
  margin:0;
  padding:0;
  list-style:none;
}
a{
  text-decoration:none;
}
select{
  background:#ffffff;
}
#g_list a{
  color:#2c3e50;
}
.mint-cell-value input{
  font-size:16px !important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0 auto;
  width:100%;
  max-width:414px;
  /* padding-bottom:45px; */
  height:100vh;
  position:relative;
}
/* 视图 */
.view{
  /* height:400px; */
  position:absolute;
  top:0;
  bottom:50px;
  width:100%;
  z-index: 100;
  overflow-y:auto;
}
/* header */
.mint-header{
    background:#ff5f28 !important;
}

/* Up pull */
.mint-loadmore-bottom .mint-spinner-snake{
  margin:0 auto;
}
/*mint-ui search*/
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
/*mint-ui Swiper*/
.mySwiper .mint-swipe-indicator{
    width:20px;
    height:3px;
    border-radius:0;
}


</style>
