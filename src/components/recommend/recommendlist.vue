<template>
    <div style="padding-top:50px;">
        <mt-header fixed title="推荐记录">
        <router-link to="/usercenter/recommend" slot="left"><mt-button icon="back"></mt-button></router-link>
        </mt-header>
        <ul>
            <li v-for="(r,index) in rList" :key="index">
                <div>
                    <div>注册人:<span v-text="r.trueName"></span></div>
                    <div v-text="r.regeditTime"></div>
                    <div>注册类型:<span v-text="r.type"></span></div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import store from '../../store/store'
import {mapState} from 'vuex'
export default {
    name:'recommendlist',
    data(){
        return{
            rList:[]
        }
    },
    computed:mapState(['userData']),
    created(){
        var This = this;
        this.myRequest.post('/ucenter/seller/tuijian/select',{
            tuijianId:This.userData.userID
        })
        .then(function (response) {
            if(response.data.message == 'success'){
                This.rList = response.data.data;
                console.log(response)
            }
        })
        .catch(function (error) {
            alert('网络错误！');
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

