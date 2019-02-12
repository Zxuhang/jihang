<template>
    <div style="padding-top:50px;">
        <mt-header fixed title="金豆转增记录">
        <router-link to="/usercenter/jindouzz" slot="left"><mt-button icon="back"></mt-button></router-link>
        </mt-header>
        <p v-if="jdList.length == 0">无记录</p>
        <ul>
            <li v-for="(jd,index) in jdList" :key="index">
                <div>
                    <span v-text="jd.riqi"></span>
                </div>
                <div>
                    <div>获赠人:<span v-text="jd.trueName"></span></div>
                    <div>获赠ID:<span v-text="jd.beiZengsongId"></span></div>
                    <div>赠出数:<span v-text="parseInt(jd.dou)"></span></div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import store from '../../store/store'
import {mapState} from 'vuex'
export default {
    name:'axzzlist',
    data(){
        return {
            jdList:[]
        }
    },
    computed:mapState(['userData']),
    created(){
        var This = this;
        this.myRequest.post('/ucenter/send/dou/list ',{
             zengsongId:This.userData.userID,
        })
        .then(function (response) {
            if(response.data.message ==  'success'){
                This.jdList = response.data.data;
            }            
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
</script>
<style scoped>
ul{
    width:100%;
    
    text-align:left;
}
ul li{
    box-sizing: border-box;
    padding:5px 10px;
    border-bottom:1px solid #aaa;
}
ul li div:last-child{
    display:flex;
    display:-webkit-flex;
    justify-content:space-between;
    align-items: center;
    font-size:14px;
    color:#aaa;
}
ul li div:last-child span{
    font-size:16px;
    color:#666666;
}
</style>

