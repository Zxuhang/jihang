import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    userData:{},
    system:{},
}

const mutations = {
    getU(state,myRequest){
        // if(!localStorage.getItem('userId')){
        //     alert('您没有登录，去登陆吧');
        //     location.href = '/signin.html';
        //     return false;
        // }
        //获取用户数据
        myRequest.post('/ucenter/index',{
            id:localStorage.getItem('userId')
        })
        .then((response)=>{
            state.userData = response.data.data;
            state.system = response.data.system;
            console.log('Store----',response.data.data,response.data.system)
        })
        .catch((err)=>{
            console.log(err);
        });
    },
    delData(state,d){
        state.userData = d;
        state.system = d;
    }
}

export default new Vuex.Store({
    state,mutations
})