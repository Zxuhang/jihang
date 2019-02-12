<template>
    <div>
    <div class="view">
        <mt-header fixed title="个人中心">
        <router-link to="/" slot="left"><mt-button icon="back"></mt-button></router-link>
        <span slot="right" @click="sign_out">退出登录</span>
        </mt-header>
        <div class="per-center">
            <div class="pc-top">
                <div class="pc-top-img">
                    <div class="u-sign"><span v-text="userData.type"></span></div>
                    <img src="static/images/tx.png" alt="">                    
                </div>
                <div class="name-id">
                    <span class="ni-name" v-text="userData.trueName"></span><span class="ni-id">ID:{{ userData.userID }}</span>
                </div>
                <p v-text="userData.province"></p>
            </div>
            <div class="pc-bottom">
                <div>
                    
                    <i class="iconfont icon-aixin1"></i><router-link to="/usercenter/axrecord">爱心数量</router-link>
                    <div>{{userData.aixin_yes | toInt}}</div>
                    
                </div>
                <div>
                    <i class="iconfont icon-zuowu-lvdou"></i><router-link to="/usercenter/jdrecord">金豆数量</router-link>
                    <div v-text="parseFloat(userData.dou_yes)"></div>
                </div>
                <div>
                    <i class="iconfont icon-jiangli"></i>上个奖励日
                    <div v-text="upRiqi"></div>
                </div>
            </div>
        </div>
        <ul class="fun-list">
            <li>
                <router-link to="/usercenter/message">
                    <i class="iconfont icon-pinglun"></i>
                    <span>我的消息<div class="myMessage" v-if="noticeList > 0" v-text="noticeList"></div></span>
                </router-link>
                
            </li>
            <li>
                <router-link :to="info">
                    <i class="iconfont icon-ziliaoguanli"></i>
                    <span>我的资料</span>
                </router-link>
            </li>
            <li v-if="userData.type != '消费者'">
                <router-link to="/">
                    <i class="iconfont icon-wode"></i>
                    <span>营业额</span>
                </router-link>
            </li>
        </ul>
        <router-view></router-view>
        <ul class="fun-list">
            <li>
                <router-link to="/usercenter/buyback">
                    <i class="iconfont icon-huigou1"></i>
                    <span>我的回购</span>
                </router-link>
            </li>
            <li v-if="userData.type == '商家'">
                <router-link to="/usercenter/eform">
                    <i class="iconfont icon-muludan"></i>
                    <span>录单页</span>
                </router-link>
            </li>
            <li v-if="userData.type == '商家' || userData.type == '消费者'">
                <router-link to="/usercenter/erlist">
                    <i class="iconfont icon-222"></i>
                    <span>录单记录</span>
                </router-link>
            </li>
            <li>
                <router-link to="/usercenter/recommend">
                    <i class="iconfont icon-woyaozhijuantubiao"></i>
                    <span>我要推荐</span>
                </router-link>
            </li>
            <li>
                <router-link to="/usercenter/aixinzz">
                    <i class="iconfont icon-zhuanzeng"></i>
                    <span>爱心转赠</span>
                </router-link>
            </li>
            <li>
                <router-link to="/usercenter/jindouzz">
                    <i class="iconfont icon-zhuanzeng1"></i>
                    <span>金豆转赠</span>
                </router-link>
            </li>
        </ul>        
       
    </div> 
    <bottomNav></bottomNav>
    </div>
</template>
<script>
import bottomNav from '@/components/bottom'
import store from '../store/store'
import {mapState} from 'vuex'
import { MessageBox } from 'mint-ui';
export default {
    name:'usercenter',
    data(){
        return{
            // userData:{},
            info:'',
            upRiqi:'',
            noticeList:0
        }
    },
    store,
    components:{
        bottomNav
    },
    computed:mapState(['userData']),//vuex 获取用户资料
    created(){
        if(this.userData.isSh == 0){//是否已完善资料
            if(this.userData.trueName == "" || this.userData.trueName == null){
                MessageBox.confirm('去完善信息？','信息完善').then(() => {
                    if(this.userData.type == '商家'){
                    this.$router.push('/usercenter/seller_per_info/'+this.userData.userID);
                    }else{
                    this.$router.push('/usercenter/perdata/'+this.userData.userID);
                    }
                }).catch(()=>{
                    this.quit();
                });
            }else{
                MessageBox('请等待审核通过').then(() => {
                    this.quit();
                })
            }
           
            
        }else{
                this.info = '/usercenter/perdata/'+this.userData.userID;
                this.upRiqi = this.userData.riqis.split(' ')[0];
        }
        this.getMessage();
    },
    methods:{
        sign_out(){

        var sign_o = window.confirm('确定要退出登录?');
        if(sign_o){
            this.quit();
        }

        },
        quit(){
            store.commit('delData', {});
            localStorage.removeItem('userId');           
            localStorage.removeItem('signInTime');           
            window.location.href = '/signin.html';
        },
        getMessage(){
            this.myRequest.post('/ucenter/notification/sendmessage/list',{
                userId:localStorage.getItem('userId')
            })
            .then((response)=>{
                let arr;
                arr = response.data.data.list.filter(function(item){
                    return item.isRead == 0;
                });
                this.noticeList = arr.length;
                console.log(response)
            })
            .catch((err)=>{
                console.log(err);
            });
        }
    }
}
</script>
<style scoped>
.fun-list li a{
    color:#828282;
    width:100%;
    display:flex;
    display:-webkit-flex;
    align-items: center;
}
.view{
    background:#f1f1f1;
}
.per-center{
    width:100%;
    margin-top:40px;
    background: -webkit-linear-gradient(#ff5f28, #ca3300); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#ff5f28, #ca3300); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#ff5f28, #ca3300); /* Firefox 3.6 - 15 */
    background: linear-gradient(#ff5f28, #ca3300); /* 标准的语法 */
    color:#ffffff;
    overflow:hidden;
}
.pc-top{
    width:80%;
    margin:0 auto;
    padding:15px 0;
}
.pc-top-img{
    width:100px;
    /* height:60px; */
    margin:0 auto;   
    position:relative;
}
.pc-top-img img{
    width:60px;
    height:60px;
    border:1px solid #ffffff;
    border-radius:100%;
}
.pc-top-img .u-sign{
    position: absolute;
    width:100%;    
    text-align:center;
    margin-top:-8px;    
    font-size:12px;
}
.pc-top-img .u-sign span{
    display:inline-block;
    padding:0 3px;
    border-radius:3px;
    background:#ffffff;
    color:#ff5f28;
}
.name-id{
    padding:3px 0;
    overflow: hidden;
    text-align:center;
}
.name-id .ni-name{
    display:inline-block;
    margin-right:10px;
}
.name-id .ni-id{
    font-size:12px;
}
.pc-top p{
    font-size:14px;
}
.pc-bottom{
    width:100%;
    padding:6px 0; 
    font-size:14px;
    overflow:hidden;
    background:rgba(0,0,0,.5);
}
.pc-bottom a{
    color:#ffffff;
}
.pc-bottom>div{
    float:left;
    width:33.3%;
}
.pc-bottom>div>div{
    margin-top:5px;
}
.fun-list{
    width:100%;
    /* margin-top:8px; */
    padding:5px 10px 0;
    box-sizing: border-box;
}
.fun-list .myMessage{
    display:inline-block;
    margin-left:10px;
    font-size:12px;
    width:28px;
    height:20px;
    background:#f34741;
    color:#f1f1f1;
    text-align: center;
    line-height:20px;
    border-radius:20px;
}
.fun-list li{
    width:100%;
    box-sizing:border-box;
    padding:5px 15px;
    text-align: left;
    background:#ffffff;
    font-size:14px;
}
.fun-list li span{
    border-bottom:1px solid #cecfd0;
    padding:5px 0;
    margin-left:8px;
    flex:1 1;
}
.fun-list li:last-child span{
    border-bottom:0;
}
</style>


