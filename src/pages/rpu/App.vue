<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
        
  </div>
</template>

<script>

export default {
  name: 'App',
  beforeCreate(){
    // document.querySelector('#app').style.height = window.innerHeight + 'px';
    // console.log(document.querySelector('#app').style.height)
  }
}
</script>

<style>
*{
  /* 滚动条不流畅 */
  -webkit-overflow-scrolling:touch;    /* 用于 ios5+ */  
}
/* 表单控件得到焦点隐藏边框 */
:focus {
    outline: -webkit-focus-ring-color auto 0px;
}
html,body,p,ul,li,h4{
  margin:0;
  padding:0;
  list-style:none;
}
a{
  text-decoration:none;
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
/* header */
.mint-header{
    background:#ff5f28 !important;
}
</style>
