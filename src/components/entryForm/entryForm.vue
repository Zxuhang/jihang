<template>
    <div>
        <mt-header fixed title="录单">
            <router-link to="/usercenter" slot="left"><mt-button icon="back"></mt-button></router-link>
        </mt-header>
        
        <div class="inputs">
            <form id="eForm"></form>
            <mt-cell title="消费者ID"><input placeholder="请输入消费者ID" class="my-input" type="text" v-model="xfId" @blur="getXf"></mt-cell> 
            <mt-field label="消费者姓名" disabled placeholder="消费者昵称" type="text" v-model="xfName"></mt-field>   
            <mt-field label="金额"  placeholder="请输入金额" type="number" v-model="price" @input="compute"></mt-field>   
            <mt-field label="比例" disabled  type="text" v-model="scale"></mt-field>   
            <mt-field label="让利" disabled placeholder="让利金额" type="number" v-model="sPrice"></mt-field>  
            <mt-field label="消费凭证" v-if="price >= xfpzIs"> <label class="xfpz"><img :src="xfpz"><input type="file" form="eForm" @change="fileChange()"  accept="image/*" ref="pImg"></label></mt-field> 
            
        </div>
        <p class="fisrt-p">注：1.商家让利打款时，请备注商家ID号，消费日期。</p>
        <p> 2.让利款金额请精确到分(例：123.45)。</p>
        <p> 3.消费额满{{xfpzIs}}元以上，请上传消费凭证(例：发票、收款凭证、收据、银行流水、合同等均可)。</p>
        <p> 4.商家当日录单，次日打让利款(可单日合并)，不可多日合并打让利款，应单日分开。</p>
        <p> 开户名：冼竟文 </p>
        <p> 开户行，建设银行佛山南海罗村支行 </p>
        <p> 卡号：6217 0031 1002 4117 879 </p>
        <button class="btn" @click="submit_ef">提交</button>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import store from '../../store/store'
import {mapState} from 'vuex'
export default {
    name:'entryForm',
    store,
    data(){
        return {
            xfId:'',
            xfName:'',
            xfType:'',
            xfpzIs:0,//"录单达到多少销售额要求消费凭证"
            price:'',
            xfpz:'static/images/img.png',
            scale:'',
            zidirdxse:0,
            sPrice:''
        }
    },
    computed:mapState(['userData','system']),
    created(){
        this.xfpzIs = parseFloat(this.system.xfpz_money_xianzhi[0]);
        this.scale = 100/parseFloat(this.system.sale_beishu[0])+'%';
        this.zidirdxse = this.system.min_ludan_money[0];//"最低录单销售额"
    },
    methods:{
        fileChange(){
            var This = this;
            Indicator.open({
            text: '上传中...',
            spinnerType: 'fading-circle'
            });
            var fImg = this.$refs.pImg.files[0];
            if(fImg){
                if(fImg.size > 4194304){
                    Toast('上传的图片不能大于4M');
                    return false;
                }
            }
            
            var fd = new FormData();
            fd.append('upfile',fImg);
            fd.append('userid',this.userData.userID);
            this.myRequest.post('/upload/xiaofipingzheng',fd,{timeout: 20000,headers: {'Content-Type': 'multipart/form-data'}})
            .then(function (response) {
                Indicator.close();
                if(response.data.message == 'success'){
                    Toast(response.data.tit);
                    This.xfpz = response.data.data;
                }
                
                console.log(response.data)
            })
            .catch(function (error) {
                Indicator.close();
                Toast('网络错误！');
                console.log(error);
            });
        },
        getObjectURL(file) {
                var url = null;
                if (window.createObjectURL != undefined) {
                    url = window.createObjectURL(file)
                } else if (window.URL != undefined) {
                    url = window.URL.createObjectURL(file)
                } else if (window.webkitURL != undefined) {
                    url = window.webkitURL.createObjectURL(file)
                }
                return url
        },
        compute(){
            this.sPrice = this.price/parseFloat(this.system.sale_beishu[0]);//营业额倍数
            this.sPrice = this.sPrice.toFixed(2)
        },
        getXf(){
            var This = this;
            if(this.xfId == ''){
                Toast('请输入正确的消费者ID');
                return false
            }
            this.myRequest.post('/ucenter/reg/selectTop', {
                id: This.xfId
            })
            .then(function (response) {
                if(response.data.message == 'success'){
                    This.xfName = response.data.data.name;
                    This.xfType = response.data.data.type;
                }else{
                    Toast(response.data.tit);
                }
                console.log(response)
            })
            .catch(function (error) {
                Toast('网络错误！');
                console.log(error);
            });
        },
        submit_ef(){
            var This = this;
            var parameter;
            var config;
            var fd = new FormData();
            if(this.xfId == '' || this.xfId.length != 7){
                Toast('请输入正确的消费者ID');
                return false
            }
            if(parseInt(this.price) > 1000000){
                Toast('入单金额不能超过1000000');
                return false
            }
            if(this.price == ''){
                Toast('请输入金额');
                return false
            }
            if(parseFloat(this.price) < parseFloat(this.zidirdxse)){
                Toast('录单金额不能小于'+this.zidirdxse);
                return false
            }
            if(this.xfType != '消费者'){
                Toast('录单对象必须是消费者');
                return false
            }
            if(parseFloat(this.price) >= this.xfpzIs){
                if(!this.$refs.pImg.files[0]){
                    Toast('请上传消费凭证');
                    return false;
                }
            }
            
            parameter = {
                sellerId: this.userData.userID,
                userId:this.xfId,
                src_money:this.sPrice,
                xsmoneys:this.price,
                xfpz:this.xfpz
            }
            this.myRequest.post('/ucenter/seller/ludan', parameter)
            .then(function (response) {
                if(response.data.message == 'success'){
                    Toast('入单成功')
                    This.$router.push('/usercenter');
                }else{
                    Toast(response.data.tit)
                }
                console.log(response)
            })
            .catch(function (error) {
                Toast('网络错误！');
                console.log(error);
            });
        },
    }
}

</script>
<style scoped>
.inputs{
    padding-top:40px;
}
.my-input{
    width:250px;
    border:0;
    font-size:14px;
}
p{
    padding:5px 10px;
    width:80%;
    margin:0 auto;
    font-size:14px;
    text-align:left;
}
.fisrt-p{
    text-indent:0;
}
.xfpz img{
    width:100px;
    height:60px;
    margin:5px 0;
}
.xfpz input{
    display:none;
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

