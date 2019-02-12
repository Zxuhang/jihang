<template>
    <div>
        <mt-header title="我的回购">
        <router-link to="/usercenter" slot="left"><mt-button icon="back"></mt-button></router-link>
        <router-link to="/usercenter/bblist" slot="right">回购记录</router-link>
        </mt-header>
        
        <router-link to="/usercenter/bclist" class="bank" v-if="def_bankc.cardNo">
            <i class="iconfont icon-yinhangqia1"></i>
            <div>
                <p>银行卡信息</p>
                <div>
                    <div>
                    <span v-text="def_bankc.cardNo"></span>
                    <span v-text="def_bankc.bank">建设银行</span>
                    </div>
                    <i class="iconfont icon-tiaozhuanqianwangyoujiantouxiangyouxiayibuxianxing"></i>
                </div>
                <span v-text="def_bankc.bankName"></span>
            </div>
        </router-link>
        <router-link to="/usercenter/addbc" v-if="!def_bankc.cardNo">
            添加银行卡
        </router-link>
        <div class="inputs">
            <mt-cell title="回购类型">
                <div class="sy-dou">普通金豆积分</div>
            </mt-cell>
            <mt-cell title="剩余金豆积分">
                <div class="sy-dou" v-text="parseFloat(userData.dou_yes)"></div>
            </mt-cell>
            <mt-cell title="回购金豆数：">
                <input type="number" placeholder="回购数必须是100的整数倍" v-model="dou">
            </mt-cell>
            <!-- <mt-field label="手机号" placeholder="请输入用户手机号" v-model="phone" ></mt-field> -->
            <mt-field label="验证码" placeholder="请输入验证码" v-model="code"><sv-code :iphone="phone" :type="stype"></sv-code></mt-field>
            <mt-cell title="二级密码：">
                <input type="password" v-model="password">
            </mt-cell>
        </div>
        <p class="tishi">提示：您的回购会扣除{{ parseFloat(system.dou_tixian_fee_bili) * 100}}%手续费和{{ parseFloat(system.dou_tixian_tax_bili) * 100 }}%的税金</p>
        <button class="btn" @click="submit_bb">确定</button>
    </div>
</template>
<script>
import svCode from '../svCode'
import store from '../../store/store'
import {mapState} from 'vuex'
import { Toast } from 'mint-ui';
export default {
    name:'buyBack',
    store,
    data(){
        return {
            def_bankc:{},
            dou:'',
            phone:'',
            stype:'tixian',
            code:'',
            password:''
        }
    },
    components:{
        svCode
    },
    methods:{
        submit_bb(){
            var This = this;
            if(this.dou % 100 != 0 || this.dou < 200){
                Toast('提现数必须是100的整数倍且不能小于200');
                return false;
            }
            if(this.dou == ''){
                Toast('请输入提现豆数');
                return false;
            }
            if(this.phone == ''){
                Toast('请输入手机号');
                return false;
            }
            if(this.code == ''){
                Toast('请输入短信验证码');
                return false;
            }
            if(this.password == ''){
                Toast('请输入二级密码');
                return false;
            }
            this.myRequest.post('/ucenter/huigou',{
                userId:This.userData.userID,
                userType:This.userData.type,
                bankCardId:This.def_bankc.id,
                pass:This.password,
                phone:This.phone,
                code:This.code,
                dou:This.dou
            })
            .then(function (response) {
                if(response.data.message ==  'success'){
                    Toast(response.data.tit);
                    This.code = '';
                    This.phone = '';
                    This.dou = '';
                    This.password = '';
                    //获取用户数据
                    store.commit('getU',This.myRequest);
                }else{
                    Toast(response.data.tit);
                }    
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
    computed:mapState(['userData','system']),
    created(){
        this.phone = this.userData.phone;
        var This = this;
        this.myRequest.post('/ucenter/bankcardlist',{
            userId:This.userData.userID
        })
        .then(function (response) {
            if(response.data.message ==  'success'){
                response.data.data.forEach((item,i)=>{
                    if(item.isDefault == 1){
                        This.def_bankc = item;
                    }
                })
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

.bank{
    width:100%;
    box-sizing:border-box;
    padding:8px 10px;
    border-bottom:1px solid #aaa;
    display:flex;
    display:-webkit-flex;
    /* justify-content:space-between; */
    align-items: center;
    color:#666666;
}
.tishi{
    padding:10px 0;
    color:rgb(250, 92, 92);
}
.sy-dou{
    width:250px;
}
.bank>i{
    font-size:35px;
}
.bank>div{
    flex:1;
    text-align: left;
    margin-left:5px;
}
.bank>div>p{
    color:#ff5f28;
}
.bank>div>div{
    display:flex;
    display:-webkit-flex;
    justify-content:space-between;
    margin-top:5px;
}
.bank>div>div>div>span:first-child{
    font-size:16px;
    color:black;
}
.bank>div>div>div>span:last-child{
    font-size:12px;
}
.inputs {
    margin-top:10px;
    border-top:1px solid #aaa;
}
.inputs input,.inputs select{
    width:250px;
    border:0;
}
.inputs .yzm{
    width:150px;
}
.inputs .yzm+button{
    width:100px;
    border:0;
    padding:10px 0;
    color:#ffffff;
    border-radius:5px;
    background:#ff5f28;
}
.btn{
    width:95%;
    padding:10px 0;
    margin:10px auto;
    border:0;
    background:#ff5f28;
    color:#ffffff;
    border-radius: 5px;
    font-size:16px;
}
</style>


