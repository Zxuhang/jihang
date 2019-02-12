<template>
    <div style="padding-top:50px;">
        <mt-header fixed title="爱心转增记录">
        <router-link to="/usercenter/aixinzz" slot="left"><mt-button icon="back"></mt-button></router-link>
        </mt-header>
        <p v-if="axList.length == 0">无记录</p>
        <ul>
            <li v-for="(ax,index) in axList" :key="index">
                <div>
                    <span v-text="ax.riqi"></span>
                </div>
                <div>
                    <div>获赠人:<span v-text="ax.trueName"></span></div>
                    <div>获赠ID:<span v-text="ax.beiZengsongId"></span></div>
                    <div>赠出数:<span v-text="parseInt(ax.aixin)"></span></div>
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
            axList:[]
        }
    },
    computed:mapState(['userData']),
    created(){
        var This = this;
        this.myRequest.post('/ucenter/seller/atobList ',{
             zengsongId:This.userData.userID,
        })
        .then(function (response) {
            if(response.data.message ==  'success'){
                This.axList = response.data.data;
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

