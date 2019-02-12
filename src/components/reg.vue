<template>
    <div ref="zhmm">
        <mt-header title="用户注册">
        <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
        <mt-button slot="right">帮助</mt-button>
        </mt-header>
        <div class="logo"><img src="static/images/logo1.png" alt=""></div>
        <ul class="inputs">
            <li>
                <span class="bg1"><i class="iconfont icon-ziyuanjk1"></i></span><input type="text" placeholder="推荐人ID" v-model="tId" @blur="getRdata" />
            </li>
            <li>
                <span class="bg1"><i class="iconfont icon-ziyuanjk1"></i></span>推荐人:<span v-text="tName"></span>
            </li>
            <li>
                <span class="bg2"><i class="iconfont icon-shouji"></i></span>推荐人手机号:<span v-text="tPhone"></span>
            </li>
            <li>
                <span class="bg3"><i class="iconfont icon-17"></i></span>您的注册身份：<span v-text="identity"></span>
            </li>
            <li>
                <span class="bg2"><i class="iconfont icon-shouji"></i></span><input type="text" placeholder="请输入手机号"  v-model="phone"/>
            </li>            
            <li>
                <span class="bg4"><i class="iconfont icon-shoujiyanzheng"></i></span><input type="text" placeholder="手机验证信息" v-model="yzm"/>
                <svcode :iphone="phone"></svcode>
            </li>
            <li>
                <span class="bg5"><i class="iconfont icon-mima"></i></span>登录密码:<span v-text="randomPass"></span>
            </li>
            <li>
                <span class="bg3"><i class="iconfont icon-mimaqueren"></i></span><input type="password" placeholder="请填写上面随机生成的登录码" v-model="password"/>
            </li>
            <li class="xieyi">
                <label><input type="checkbox" v-model="xieyi">我已阅读并同意</label><mt-button style="width:auto;background:none !important;border:0 !important;" @click.native="popupVisible3 = true" size="large">《注册协议》</mt-button>
            </li>
            <li>
                <button @click="rsubmit">立即注册</button>
            </li>
            
        </ul>
        <mt-popup v-model="popupVisible3" position="right" class="mint-popup-3" :modal="false">
            <h3>《注册协议》</h3>
            <p>
            </p>
            <mt-button @click.native="popupVisible3 = false" size="large" type="primary">确认</mt-button>
        </mt-popup>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
import svcode from './svCode'
export default {
    name:'reg',
    data(){
        return{
            tId:'',
            tName:'',
            tPhone:'',
            phone:'',
            identity:'您的身份',
            yzm:'',
            rpassword:'',
            password:'',
            xieyi:true,
            popupVisible3:false
        }
    },
    components:{
        svcode
    },
    computed:{
        randomPass:function(){
            this.rpassword = String(parseInt(Math.random() * 999999));
            if(this.rpassword.length != 6){
                this.rpassword = '139879'
            }
            return this.rpassword;
        }
    },
    methods:{
        getRdata(){//获取推荐人信息
            var tid = this.tId;
            var This = this;
            if(tid == '' || tid == null){
                return false;
            }
            this.myRequest.post('/ucenter/reg/selectTop', {
                id: tid
            })
            .then(function (response) {
                var resData = response.data;
                if(resData.code == '404'){
                    Toast(resData.tit);
                    return false;
                }
                This.tName = resData.data.name;
                This.tPhone = resData.data.phone;
                This.identity = resData.data.zhuCeRenType;
            })
            .catch(function (error) {
                Toast('网络错误！');
                console.log(error);
            });
            
        },
        rsubmit(){//提交数据
        console.log(this.tId)
            if(this.tId == '' || this.tId == null){
                Toast('请输入推荐人id');
                return false;
            }
            if(this.tName == '' || this.tName == null){
                Toast('请输入正确的推荐人id');
                return false;
            }
            if(this.phone == '' || this.phone == null){
                Toast('请输入11位手机号');
                return false;
            }
            if(this.yzm == '' || this.yzm == null){
                Toast('请输入验证码');
                return false;
            }
            if(this.rpassword != this.password){
                Toast('密码输入错误，请重新输入');
                return false;
            }
            if(!this.xieyi){
                Toast('请同意协议');
                return false;
            }
            Indicator.open({
            text: '提交中...',
            spinnerType: 'fading-circle'
            });
            var parameters = {
                phone:this.phone,
                type:this.identity,
                password:this.password,
                code:this.yzm,
                tuijianId:this.tId
            }
            var fs = this.fszm;
            this.myRequest.post('/ucenter/reg', parameters)
            .then(function (response) {
                Indicator.close();
                var res = response.data;
                if(res.message == 'success'){
                    fs();//发送账号密码
                    MessageBox('您已注册成功','账号密码已通过短信发送到您的手机请注意查收。').then(action=>{
                        window.location.href = 'signin.html'
                    });
                }else if(res.message == 'error'){
                    MessageBox('注册失败',res.tit);
                }                
                console.log(response);
            })
            .catch(function (error) {
                Indicator.close();
                console.log(error);
            });
        },
        openConfirm(){
            MessageBox.confirm('协消费者议协消费者议协消费者议协消费者议协消费者议协消费者议','消费者协议').then(() => {
                this.xieyi = true;
            }).catch(()=>{
                this.xieyi = false;
            });
        },
        fszm(){
            var This = this;
            this.myRequest.post('/ucenter/reg/send', {
                phone: This.phone,
                type:'getpass'
            })
            .then(function (response) {
                var sjs = document.createElement('script');
                sjs.src = response.data.data;
                This.$refs.zhmm.appendChild(sjs);
                console.log(response);
            })
            .catch(function (error) {
                Toast('网络错误');
                console.log(error);
            });
        }
    },
    created(){
        if(this.$route.params.id){
            this.tId = this.$route.params.id;
            this.getRdata();
        }
    }
}
</script>
<style scoped>
.mint-header{
    background:#ff5f28;
}
.logo{
    width:100%;
    box-sizing: border-box;
    padding:10px;
}
.logo img{
    width:100%;
}
.my-icon{
    display:inline-block;
}
.inputs li{
    width:100%;
    padding:10px 0;
    /* border-top:1px solid #f0f0f0; */
    border-bottom:1px solid #f0f0f0;
    display:flex;
    display:-webkit-flex;
    align-items:center;
    font-size:14px;
}
.inputs .bg1{
    background:#33a1f1;
}
.inputs .bg2{
    background:#f38ab9;
}
.inputs .bg3{
    background:#ad59a6;
}
.inputs .bg4{
    background:#ef9c74;
}
.inputs .bg5{
    background:#f5b54e;
}
.inputs li span:first-child{    
    border-radius:100%;
    margin:0 15px 0 10px;
    color:#ffffff;
    text-align:center;
    line-height:35px;
    font-size:16px;
    /* width:35px; */
    height:35px;
    flex:0 0 35px;
}
.inputs li input:not([type="checkbox"]){
    /* width:320px; */
    flex:1 1 320px;
    border:0;
    min-width:100px;
}
.inputs .xieyi{
    align-items:center;
}
.inputs .xieyi input{
    margin:0 10px;
}
.inputs li:last-child{
    justify-content:center;    
}
.inputs li:last-child button{
    width:85%;
    padding:8px 0;
    border:0;
    border-radius:5px;
    color:#ffffff;    
    background:#ff5100;
}
/* popup */
.mint-popup-3 {
    width: 100%;
    height: 100%;
    background-color: #fff;
    overflow-y:auto;
}
.mint-popup-3 p{
    text-indent: 20px;
    padding:8px;
    text-align: left;
}
.mint-popup-3 .mint-button {
    width: 90%;
    margin:10px auto;
    background:#ff5100;
}
</style>

