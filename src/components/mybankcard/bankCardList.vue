<template>
    <div>
        <mt-header fixed title="选择银行卡">
            <router-link to="/usercenter/buyback" slot="left"><mt-button icon="back"></mt-button></router-link>
            <router-link to="/usercenter/addbc" slot="right">添加</router-link>
        </mt-header>

        <div class="bclist">
            
            <div v-for="(item,index) in bcList" :key="item.id" @click="sel_bank(index)">
                <!-- 建设银行 -->
                <i v-if="item.bank == '建设银行'" class="iconfont icon-jiansheyinxing"></i>
                <!-- 农业银行 -->
                <i v-if="item.bank == '农业银行'" class="iconfont icon-nongyeyinxing"></i>
                <!-- 工商银行 -->
                <i v-if="item.bank == '工商银行'" class="iconfont icon-changyonglogo04"></i>
                <!-- 邮政银行 -->
                <i v-if="item.bank == '邮政银行'" class="iconfont icon-youzhen1193431easyiconnet"></i>
                <!-- 中国银行 -->
                <i v-if="item.bank == '中国银行'" class="iconfont icon-zhongguoyinhangbank1193437easyiconnet"></i>
                <div>
                    <p><span v-text="item.bank"></span> <span v-text="item.payBank"></span><span v-if="item.isDefault == 1">(已选)</span></p>
                    <p v-text="item.cardNo"></p>
                </div>
                <button class="btn-del" @click="delbank(item.id)">删除</button>                
            </div>
            
            <!-- <div>
                <img src="static/images/tx.png" alt="">
                <div>
                    <p>中国建设银行</p>
                    <p>123456</p>
                </div>
                <i class="iconfont icon-nongyeyinxing"></i>                
            </div> -->
                <button class="btn" v-if="bcList.length > 1" @click="submitSel">确认选择</button>
                <span v-if="bcList.length == 0">没有银行卡去<router-link to="/usercenter/addbc">添加银行卡</router-link></span>
        </div>
    </div>
</template>
<script>
import store from '../../store/store'
import {mapState} from 'vuex'
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    name:"bcList",
    data(){
        return {
            bcList:[],
            selected:'',
        }
    },
    computed:mapState(['userData']),
    methods:{        
        delbank(id){
            var This = this;
            MessageBox.confirm('确定要删除此银行卡信息?').then(action => {
                Indicator.open({
                text: '提交中...',
                spinnerType: 'fading-circle'
                });
                This.myRequest.post('/ucenter/deletebcard',{
                    userId:This.userData.userID,
                    id:id
                })
                .then(function (response) {
                    if(response.data.message ==  'success'){
                        Indicator.close();
                        This.myRequest.post('/ucenter/bankcardlist',{
                            userId:This.userData.userID
                        })
                        .then(function (response) {
                            if(response.data.message ==  'success'){
                                This.bcList = response.data.data;
                                This.bcList.forEach((item,i)=>{
                                    if(item.isDefault == '1'){
                                        This.selected = item.id;
                                    }
                                })
                            }            
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    }            
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }).catch(function(e){

            });
            
        },
        sel_bank(i){
            this.bcList.forEach((item,i)=>{
                item.isDefault = 0;
            });
            this.bcList[i].isDefault = 1;
            this.selected = this.bcList[i].id;
        },
        submitSel(){
            var This = this;
            Indicator.open({
            text: '提交中...',
            spinnerType: 'fading-circle'
            });
            this.myRequest.post('/ucenter/defaultbankcard',{
                userId:This.userData.userID,
                id:This.selected
            })
            .then(function (response) {
                if(response.data.message ==  'success'){
                    Indicator.close();
                    Toast('修改默认成功');
                }            
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    },
    created(){
        var This = this;
        this.myRequest.post('/ucenter/bankcardlist',{
            userId:This.userData.userID
        })
        .then(function (response) {
            if(response.data.message ==  'success'){
                This.bcList = response.data.data;
                This.bcList.forEach((item,i)=>{
                    if(item.isDefault == '1'){
                        This.selected = item.id;
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
<style>
.icon-jiansheyinxing{
    color:#132d92;
}
.icon-nongyeyinxing{
    color:green;
}
.icon-changyonglogo04{
    color:red;
}
.icon-youzhen1193431easyiconnet{
    color:green;
}
.icon-zhongguoyinhangbank1193437easyiconnet{
    color:red;
}
.bclist {
    width:100%;
    box-sizing:border-box;
    padding:10px;
    padding-top:40px;
    overflow: hidden;
}
.bclist>div{
    display:flex;
    display:-webkit-flex;
    align-items:center;
    border-bottom:1px solid #afafafaf;
    margin:0 -10px;
    padding:5px 10px;
}
.bclist div i{
    display:block;
    /* width:50px;
    height:50px; */
    font-size:35px;
 }
 .bclist>div>div{
     flex:1 1;

 }
 /* .bclist div i{
  margin-right:5px;
 } */
 .bclist>div>div p span:last-child{
     color:red;
 }
 .bclist>div>div p span:nth-child(2){
     font-size:12px;
     color:#666666;
 }
 .bclist>div>div p{
    height:25px;
    line-height:25px;
    text-align:left;
 }
 .btn-del{
     background:#ff5f28;
    color:#ffffff;
    padding:2px;
    border-radius: 3px;
    border:0;
 }
 .btn{
    display:block;
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

