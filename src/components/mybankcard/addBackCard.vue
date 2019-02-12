<template>
    <div id="addbank">
        <mt-header title="添加银行卡">
            <router-link to="/usercenter/bclist" slot="left"><mt-button icon="back"></mt-button></router-link>
        </mt-header>
        <div class="inputs">
            <mt-cell title="开户人姓名">
                <input type="text" v-model="khName">
            </mt-cell>
            <mt-cell title="卡号">
                <input type="text" v-model="cardNo">
            </mt-cell>
            <mt-cell title="卡类型">
                <select class="banklist" v-model="bank">
                    <option>建设银行</option>
                    <option>农业银行</option>
                    <option>中国银行</option>
                    <option>邮政银行</option>
                    <option>工商银行</option>
                </select>
            </mt-cell>
            <mt-cell title="开户行地址">
                <span class="citylist">
                    <select v-model="sel_pro" @change="selCity(sel_pro)">
                        <option>省</option>
                        <option v-for="pro in province" :key="pro.area_id" :value="pro" v-text="pro.area_name"></option>
                    </select>
                    <select v-model="sel_city" @change="selArea(sel_city)">
                        <option>市</option>
                        <option v-for="cit in city" :key="cit.area_id" :value="cit" v-text="cit.area_name"></option>
                    </select>
                    <select v-model="sel_area">
                        <option>区、县</option>
                        <option v-for="are in area" :key="are.area_id" :value="are" v-text="are.area_name"></option>
                    </select>
                </span>
               
            </mt-cell>
            <mt-cell title="支行名称">
                <input type="text" v-model="payBank">
            </mt-cell>
            
        </div>
        <button class="btn" @click="addBank">添加</button>
    </div>
</template>
<script>
import store from '../../store/store'
import {mapState} from 'vuex'
import { Toast } from 'mint-ui';
export default {
    name:'addBackCard',
    data(){
        return {
            khName:'',
            cardNo:'',
            bank:'',
            payBank:'',
            province:[],
            sel_pro:{},
            city:[],
            sel_city:{},
            area:[],
            sel_area:{},
        }
    },
    computed:mapState(['userData']),
    methods:{
        addBank(){
            var This = this;
            if(this.khName == ''){
                Toast('请输入开户人姓名');
                return false;
            }
            if(this.cardNo == ''){
                Toast('请输入银行卡号');
                return false;
            }
            if(this.bank == ''){
                Toast('选择银行卡名称');
                return false;
            }
           if(this.sel_pro.area_name == undefined || this.sel_pro.area_name == ''){
                Toast('请选择省')
                return false;
            }
            if(this.sel_city.area_name == undefined || this.sel_city.area_name == ''){
                Toast('请选择市')
                return false;
            }
            if(this.sel_area.area_name == undefined || this.sel_area.area_name == ''){
                Toast('请选择区')
                return false;
            }
            if(this.payBank == ''){
                Toast('请输入开户行支行名称')
                return false;
            }
            var parameter = {
                userId:This.userData.userID,
                cardType:'银行卡账户',
                cardNo:This.cardNo,
                bankName:This.khName,
                bank:This.bank,
                payBank:This.payBank,
                province:this.sel_pro.area_name,
                city:this.sel_city.area_name,
                area:this.sel_area.area_name

            }
            this.myRequest.post('/ucenter/addbc',parameter)
            .then((response)=>{
                if(response.data.message == 'success'){
                    Toast('添加成功');
                    This.khName='';
                    This.cardNo='';
                    This.bank='';
                    This.payBank='';
                    This.sel_pro={};
                    This.sel_city={};
                    This.sel_area={};
                }
                console.log(response)
            })
            .catch((error)=>{
                console.log(error)
            })
        },
        selCity(obj){//获取市名
            var This = this;
            this.city = [];
            this.area = [];
            this.myRequest.get('/areas?city='+obj.area_id)
            .then((response)=>{
                This.city = response.data.data.city;
            })
            .catch((error)=>{
                console.log(error)
            })
        },
        selArea(obj){//获取区县            
            var This = this;            
            this.myRequest.get('/areas?area='+obj.area_id)
            .then((response)=>{
                This.area = response.data.data.area;
            })
            .catch((error)=>{
                console.log(error)
            })
        },
    },
    // beforeRouteLeave(to,from,next){
    //     next('/usercenter/bclist');
    // },
    created(){
        var This = this;
        this.myRequest.get('/areas')//获取省份
        .then((response)=>{
            This.province = response.data.data.provice;
        })
        .catch((error)=>{
            console.log(error)
        });
    }
}
</script>
<style>
#addbank .inputs input,.inputs .banklist{
    width:250px;
    border:0;
}
#addbank .citylist select{
    width:80px;
}
#addbank .inputs .yzm{
    width:150px;
}
#addbank .inputs .yzm+button{
    width:100px;
    border:0;
    padding:10px 0;
    color:#ffffff;
    border-radius:5px;
    background:#ff5f28;
}
#addbank .btn{
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

