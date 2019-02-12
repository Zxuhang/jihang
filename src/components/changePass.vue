<template>
    <div>
        <mt-header title="密码修改">
        <router-link to="/usercenter" slot="left" v-if="$route.params.id" >
            <mt-button icon="back"></mt-button>
        </router-link>
        <router-link to="/" slot="left" v-if="!$route.params.id" >
            <mt-button icon="back"></mt-button>
        </router-link>
        <!-- <mt-button slot="right">帮助</mt-button> -->
        </mt-header>
        
        <p class="sel-p">
            <label>登录密码：<input type="radio" v-model="reType" value="0" name="pass"></label>
            <label>二级密码：<input type="radio" v-model="reType" value="1" name="pass"></label>
        </p>
        <div class="inputs">
            <mt-field label="用户ID" placeholder="请输入用户ID" v-model="userID" v-if="!$route.params.id" ></mt-field>
            <mt-field label="手机号" placeholder="请输入用户手机号" v-model="phone" v-if="!$route.params.id"></mt-field>
            <mt-field label="验证码" placeholder="请输入验证码" v-model="code"><sv-code :iphone="phone" :type="stype"></sv-code></mt-field>
            <mt-field label="新密码" placeholder="请输入新密码" type="password" v-model="password"></mt-field>
            <mt-field label="新密码" placeholder="请再次输入新密码" type="password" v-model="repassword"></mt-field>
        </div>
        <button class="btn" @click="submit">确定</button>
    </div>
</template>
<script>
var forget = {};
import svCode from './svCode'
import store from '../store/store'
// import {mapState} from 'vuex'
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    name:'changePass',
    data(){
        return {
            userID:'',
            reType:'0',
            phone:'',
            code:'',
            password:'',
            stype:'modifyPass',
            repassword:''

        }
    },
    // computed:mapState(['userData']),
    created(){
        if(this.$route.params.id){
            this.userID = this.$route.params.id;
            this.phone = this.$route.params.phone;
        }        
        
        // this.phone = this.userData.phone;
    },
    methods:{
        submit(){
            var This = this;
            if(this.phone == ''){
                Toast('请输入手机号')
                return false;
            }
            if(this.code == ''){
                Toast('请输入验证码')
                return false;
            }
            if(this.password == '' || this.repassword == ''){
                Toast('密码不能为空')
                return false;
            }
            if(this.password != this.repassword){
                Toast('两次密码输入不一致')
                return false;
            }
            this.myRequest.post('/ucenter/resetPassword', {
                userID:This.userID,
                reType:This.reType,
                phone:This.phone,
                code:This.code,
                password:This.password,
                repassword:This.repassword
            })
            .then(function (response) {
                if(response.data.message == 'success'){    
                    MessageBox.alert('修改成功，请重新登录').then(action => {
                        store.commit('delData', {});
                        localStorage.removeItem('userId');           
                        localStorage.removeItem('signInTime');           
                        window.location.href = '/signin.html';
                    });
                    
                }else{
                    Toast(response.data.tit)
                }
                console.log(response);
            })
            .catch(function (error) {
                Toast('修改失败')
                console.log(error);
            });
        }
    },
    components:{
        svCode
    }
}
</script>

<style scoped>
.sel-p{
    padding:10px;
}
.inputs{
    margin-top:5px;
}
.btn{
    width:95%;
    box-sizing:border-box;
    margin:15px 0px;
    border:0;
    padding:10px 0;
    font-size:16px;
    background:#ff5f28;
    color:#ffffff;
}
.inputs select{
    width:100%;
    flex:1;
}
</style>
