<template>
<!-- 短信验证码按钮 -->
    <div ref="status">
        <button class="yzm-btn" ref="btn" v-bind:disabled="btnDis" @click="getYzm">获取验证码</button>
        <!-- <script :src="send"></script> -->
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    name:'svCoode',
    props:{
        iphone:String,
        type:String
    },
    data(){
        return{
            btnDis:false,
            send:''
        }
    },
    methods:{
        getYzm(){//获取手机验证码
            
            var This = this;
            // var t = 60;
            // var btn = this.$refs.btn;
            
            if(this.iphone == '' || this.iphone == null){
                Toast('请输入手机号')
                return false;
            }
            if(this.iphone.length != 11){
                Toast('请输入11位手机号');
                return false;
            }
                        
            this.myRequest.post('/ucenter/reg/send', {
                phone: This.iphone,
                type:This.type
            })
            .then(function (response) {
                This.send = response.data.data;
                window.myfun = This.myfun;
                var sjs = document.createElement('script');
                sjs.src = This.send+'&callback=myfun';
                This.$refs.status.appendChild(sjs);
                console.log(response);
            })
            .catch(function (error) {
                Toast('网络错误');
                console.log(error);
            });
           
        },
        myfun(obj){
            if(obj.status != '发送成功'){
                return false;
            }
            Toast('发送成功');
            var This = this;
            var t = 60;
            var btn = this.$refs.btn;
            This.btnDis = true;
            var time = setInterval(function(){
                t--;
                btn.innerHTML = t + "s后重试";                
                if(t == 0){
                    clearInterval(time);
                    This.btnDis = false;
                    btn.innerHTML = "获取验证码";
                }
            },1000);
        }
       
    },

}
</script>
<style scoped>
.yzm-btn{
    width:100px;
    color:#ffffff;    
    background:#ff5000;
    border:0;
    padding:5px 0;
    border-radius:3px;
    margin-right:10px;
}
button:disabled{
    background:#ebb7a5;
}
</style>

