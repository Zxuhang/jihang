<template>
    <div>
        <mt-header title="登录"></mt-header>
        <div class="logo">
            <img src="static/images/logo.png" alt="">
           <p>吉杭电子科技</p> 
        </div>
        <div class="inputs">
            <div class="s-input">
                <label>
                    <select v-model="selected">
                        <option value="">请选择身份</option>
                        <option>金牌服务商</option>
                        <option>银牌服务商</option>
                        <option>商家</option>
                        <option>消费者</option>
                    </select>
                    <i></i>
                </label>
            </div>
            <div class="s-input">
                <label>
                   <input type="text" v-model="userID" placeholder="请输入账号">
                </label>
            </div>
            <div class="s-input">
                <label>
                   <input type="password" v-model="password" placeholder="请输入密码">
                </label>
            </div>
            <button @click="submit" @key.enter="submit">登录</button>
            <router-link to="/Reg">注册</router-link>
            <router-link to="/forgetpass">忘记密码</router-link>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';

export default {
    name:'signIn',
    data(){
        return {
            selected:'',
            userID:'',
            password:''
        }
    },
    methods:{
        submit:function(){
            if(this.selected == '' || this.selected == null){
                Toast('请选择身份');
                return false;
            }
            if(this.userID == '' || this.userID == null){
                Toast('请输入账号');
                return false;
            }
            if(this.password == '' || this.password == null){
                Toast('请输入密码');
                return false;
            }
            var parameters = {
                type:this.selected,
                userID:this.userID,
                password:this.password
            }
            this.myRequest.post('/ucenter/login', parameters)
            .then(function (response) {
                var res = response.data;
                if(res.message == 'success'){
                    var date = new Date();
                    localStorage.setItem('userId',parameters.userID);
                    localStorage.setItem('signInTime',date.getTime());
                    window.location.href = '/index.html';
                }else if(res.message == 'error'){
                    Toast(res.tit);
                }
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
    created(){        
        var date = new Date(); 
        if(localStorage.getItem('signInTime')){
            Indicator.open({
                text: '自动登录中...',
                spinnerType: 'fading-circle'
            });
            var day = parseInt(Math.abs(date.getTime() - parseInt(localStorage.getItem('signInTime'))) /1000/60/60/24);           
            if(day >= 7){
                Toast('登录状态已过期，请重新登录');
                Indicator.close();
                localStorage.removeItem('userId'); 
                localStorage.removeItem('signInTime');
            }else{            
                Indicator.close();
                window.location.href = '/index.html';
            }
        }
    }
}
</script>
<style scoped>
header{
    background:#ff5f28;
}
.logo{
    width:50%;
    margin:15px auto;
}
.logo img{
    width:80px;
    height:80px;
    /* border-radius:100%; */
}
.inputs{
    width:100%;
    box-sizing:border-box;
    padding:10px 15px;
}
.inputs .s-input{
    width:100%;
    box-sizing:border-box;
    padding:10px 5px;
    margin:10px 0;
    border-bottom:1px solid #ff5f28;
}
.inputs .s-input input,.inputs .s-input select{
    width:100%;
    height:30px;
    border:0;
}
.inputs button{
    width:100%;
    background:#ff5f28;
    border:0;
    color:#ffffff;
    padding:10px 0;
    margin:10px 0;
    font-size:16px;
    border-radius:37px;
}
.inputs a{
    color:#898989;
}
</style>


