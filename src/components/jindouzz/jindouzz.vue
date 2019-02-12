<template>
    <div>
        <mt-header title="金豆转赠">
        <router-link to="/usercenter" slot="left"><mt-button icon="back"></mt-button></router-link>
        <router-link to="/jindouzz/jdzzlist" slot="right">转赠记录</router-link>
        </mt-header>
        <p class="tishi">温馨提示：只有同类别账户可以相互转赠。</p>
        <p class="tishi">例如：商家只能转赠商家，消费者只能转赠消费者。</p>
        <div class="inputs">
            <mt-cell title="可用金豆">
                <div class="sy-dou" v-text="parseFloat(userData.dou_yes)"></div>
            </mt-cell>
            <mt-cell title="转赠金豆数：">
                <input type="number" placeholder="请输入金豆数" v-model="jindou">
            </mt-cell>
            <mt-cell title="获赠人ID：">
                <input type="text" placeholder="请输入获赠人ID" v-model="hzId">
            </mt-cell>
            <mt-field label="验证码" placeholder="请输入验证码" v-model="code"><sv-code :iphone="userData.phone" :type="stype"></sv-code></mt-field>
            <mt-cell title="二级密码：">
                <input type="password" v-model="password">
            </mt-cell>
        </div>
        <button class="btn" @click="submit_bb">确定</button>
    </div>
</template>
<script>
import svCode from '../svCode'
import store from '../../store/store'
import {mapState} from 'vuex'
import { Toast } from 'mint-ui';
export default {
    name:'jindouzz',
    store,
    data(){
        return {
            def_bankc:{},
            jindou:'',
            hzId:'',
            stype:'jindouzhuanzeng',
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
            if(parseInt(this.jindou) > parseFloat(this.userData.dou_yes)){
                Toast('金豆数不足，请重新输入');
                return false;
            }
            if(this.jindou == ''){
                Toast('请输入转赠金豆数');
                return false;
            }
            if(this.hzId == ''){
                Toast('请输入获赠人ID');
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
            this.myRequest.post('/ucenter/send/dou',{
                zhuanchuId:This.userData.userID,//赠送人
                zhuanruId:This.hzId,//获赠人
                dou:This.jindou,
                password:This.password,
                phone:This.userData.phone,
                code:This.code
            })
            .then(function (response) {
                if(response.data.message ==  'success'){
                    Toast(response.data.tit);
                    This.hzId = '';
                    This.code = '';
                    This.jindou = '';
                    This.password = '';
                    This.getUdata();
                }else{
                    Toast(response.data.tit);
                }    
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        getUdata(){            
            //获取用户数据
            store.commit('getU',this.myRequest);
        }
    },
    computed:mapState(['userData']),
}
</script>
<style scoped>

.tishi{
    padding:5px 10px;
    font-size:14px;
}
.sy-dou{
    width:250px;
}
.inputs {
    margin-top:10px;
    /* border-top:1px solid #aaa; */
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


