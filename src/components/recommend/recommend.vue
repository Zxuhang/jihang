<template>
    <div>
        <mt-header title="我要推荐">
        <router-link to="/usercenter" slot="left"><mt-button icon="back"></mt-button></router-link>
        <router-link to="/usercenter/recommendl" slot="right">推荐记录</router-link>
        </mt-header>
         <qriously :value="initQCode" :size="138"/>
         <p>扫描二维码注册或保存二维码分享</p>
    </div>
</template>
<script>
import store from '../../store/store'
import {mapState} from 'vuex'
import Vue from 'vue'
import VueQriously from 'vue-qriously'
Vue.use( VueQriously);
export default {
    name:'recommend',
    data(){
        return{
            initQCode:''
        }
    },
    store,
    computed:mapState(['userData']),
    created(){
        this.initQCode = 'http://frontend.zuitaikj.com/signin.html#/Reg/'+this.userData.userID;
    }
}
</script>

