<template>
    <div>
       <mt-header title="资料填写完成">
        <!-- <router-link to="/usercenter" slot="left"><mt-button icon="back"></mt-button></router-link> -->
       </mt-header>
        <div class="duigou">
            <div></div>
            <p>恭喜！你的资料已提交您的ID号为：<span v-text="userData.userID"></span></p>
        </div>
        <p class="sh-ts">
            你的注册资料将在3个工作日内审核，通过审核后您便可使用系统的全部功能。
        </p>
        <p class="mm-ts">请妥善保管好您的密码，并注意查收信息系统通过审核后第一时间发送给您短信通知。</p>
        <router-link class="btn" to="/">去首页</router-link>
    </div>
</template>
<script>
import store from '../store/store'
import {mapState} from 'vuex'
export default {
    name:'spinfoSuccess',
    store,
    computed:mapState(['userData'])
}
</script>
<style>
.duigou{
    width:55%;
    margin:20px auto;
    color:#ff5f28;
    font-family:'微软雅黑';
    overflow: hidden;
}
.duigou div{
    width:40px;
    height:40px;
    background:url(../../static/images/duigou.png) no-repeat;
    background-size:100%;
    float:left;
}
.duigou span{
    color:#f43205;
}
.sh-ts{
    text-align: left;
    padding:10px 8px;
}
.mm-ts{
    width:90%;
    margin:10px auto;
    color:#ff0006;
}
.btn{
    display:inline-block;
    border-radius:5px;
    width:100px;
    padding:10px 0;
    background:#ff5f28;
    color:#ffffff;
}
</style>

