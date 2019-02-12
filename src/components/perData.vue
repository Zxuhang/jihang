<template>
    <div id="grzl">
        <mt-header title="个人资料">
        <router-link to="/usercenter" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
        <!-- <mt-button slot="right">帮助</mt-button> -->
        </mt-header>
        <div class="inputs">
            <mt-cell title="用户头像">
             <label>
                 <img class="u-img" src="static/images/tx.png">
                    <input type="file" ref="file" accept="image/*" @change="file_change">
             </label>
            </mt-cell>
            <mt-cell title="ID">
                <span v-text="ID"></span>
            </mt-cell>
            <mt-cell title="推荐人">
                <span v-text="tName"></span>
            </mt-cell>
            <mt-cell title="用户名">
                <span><input type="text" v-model="uName" placeholder="请输入用户名"></span>
            </mt-cell>
            <mt-cell title="电话">
                <span v-text="phone"></span>
            </mt-cell>
            <mt-cell title="性别" v-if="userData.isSh == '0'">
                <span><label>男：<input type="radio" name="sex" v-model="sex" value="1"></label><label>女：<input type="radio" name="sex" v-model="sex" value="0"></label></span>
            </mt-cell>
            <mt-cell title="性别" v-if="userData.isSh == '1'">
                <span v-text="sex"></span>
            </mt-cell>
            <mt-cell title="地址">
                <span v-if="userData.isSh == 1">
                    {{ sel_pro }}{{ sel_city }}{{ sel_area }}
                </span>
                <span v-if="userData.isSh == 0">
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
            <mt-cell title="证件类型">
                <span>
                    <select v-model="cardType">
                        <option>身份证</option>
                    </select>
                </span>
            </mt-cell>
            <mt-cell title="证件号">
                <span><input type="text" v-model="cardNo" placeholder="请输入证件号"></span>
            </mt-cell>
            <mt-cell title="邮箱">
                <span><input type="text" v-model="email" placeholder="请输入邮箱"></span>
            </mt-cell>            
            <mt-cell title="二级密码" v-if="userData.isSh == '0'">
                <span><input type="password" v-model="pass2" placeholder="请输入二级密码"></span>
            </mt-cell>            
            <mt-cell title="二级密码" v-if="userData.isSh == '0'">
                <span><input type="password" v-model="rpass2" placeholder="请再次输入二级密码"></span>
            </mt-cell>            
            <mt-cell title="密码" v-if="userData.isSh == '1'">
                <router-link :to="{name:'changePass',params:{id:userData.userID,phone:userData.phone}}">修改密码</router-link>
            </mt-cell>
            
        </div>
        <!-- <button class="btn" @click="submit" v-if="userData.isSh == '0'">保存</button> -->
        <button class="btn" @click="submit" v-if="userData.isSh == '0'">保存</button>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import store from '../store/store'
import {mapState} from 'vuex'
export default {
    name:'perData',
    store,
    data(){
        return{
            tId:'',
            tName:'',
            uName:'',
            sex:'1',
            province:[],
            sel_pro:{},
            city:[],
            sel_city:{},
            area:[],
            sel_area:{},
            ID:'',
            email:'',
            cardType:'',
            cardNo:'',
            phone:'',
            pass2:'',
            rpass2:''
            // IMG

        }
    },
    computed:mapState(['userData']),//vuex 获取用户资料
    created(){
        
        this.ID = this.userData.userID;
        this.phone = this.userData.phone;
        this.tId = this.userData.tuijianId;
        this.tName = this.userData.tuijianName;
        if(this.userData.IS_COMPLETE == 1){
            this.uName = this.userData.trueName
            this.sex = this.userData.sex == '1' ? '男':'女';
            this.sel_pro = this.userData.province
            this.sel_city = this.userData.city
            this.sel_area = this.userData.area
            this.cardType = this.userData.cardType
            this.cardNo = this.userData.cardNo
            this.email = this.userData.email
        }
        var This = this;
        this.myRequest.get('/areas')//获取省份
        .then((response)=>{
            This.province = response.data.data.provice;
        })
        .catch((error)=>{
            console.log(error)
        });
    },
    methods:{
        file_change(){
            var imgFile = this.$refs.file.files[0];
            var fd = new FormData();

            fd.append('imgF',imgFile);

            console.log(fd);
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
        submit(){
            if(this.uName == '' || this.uName == null){
                Toast('请输入用户名')
                return false;
            }
            if(this.sex == '' || this.sex == null){
                Toast('请选择性别')
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
            // if(this.email == '' || this.email == null){
            //     Toast('请输入邮箱')
            //     return false;
            // }
            if(this.cardNo == '' || this.cardNo == null){
                Toast('请输入证件号')
                return false;
            }
            if(this.rpass2 == ''){
                Toast('请输入二级密码')
                return false;
            }
            if(this.rpass2 != this.pass2){
                Toast('二级密码输入不一致')
                return false;
            }
            Indicator.open({
            text: '提交中...',
            spinnerType: 'fading-circle'
            });
            var parameter = {
                userId:this.ID,
                trueName:this.uName,
                sex:this.sex,
                province:this.sel_pro.area_name,
                city:this.sel_city.area_name,
                area:this.sel_area.area_name,
                cardType:this.cardType,
                cardNo:this.cardNo,
                email:this.email,
                pass2:this.pass2,
                rpass2:this.rpass2,
                sellerID:'',
                IMG:'',
                // payPass:''
            };
            console.log(parameter)
            this.myRequest.post('/ucenter/get/info/personal',parameter)
            .then((response)=>{
                Indicator.close();
                if(response.data.message == 'success'){
                    Toast('信息更新成功,请重新登录');
                    setTimeout(function(){
                        window.location.href="/signin.html";
                    },3000)
                }else{
                    Toast(response.data.tit)
                }
                
                console.log(response)
            })
            .catch((err)=>{
                Indicator.close();                    
                Toast('网络错误')
                console.log(err)
            });
        }
    }
}
</script>
<style >
#app #grzl .mint-cell-wrapper .mint-cell-title{
    text-align:left !important;
}
#grzl .mint-field-core{
    text-align:right;
}
#grzl .u-img{
    width:50px;
    height:50px;
    border-radius:50px;
    border:1px solid #ccc;
}
#grzl input[type='file']{
    display:none;
}
#grzl .mint-cell-text{
    display:inline-block !important;
    width:100px !important;
}
#grzl .mint-cell-value input[type='text'],#grzl .mint-cell-value input[type='password']{
    width:250px;
    border:0;
    text-align:right;
}
#grzl .mint-cell-value select{
    width:70px;
}
#grzl .btn{
    width:95%;
    box-sizing:border-box;
    margin:15px 0px;
    border:0;
    padding:10px 0;
    font-size:16px;
    background:#ff5f28;
    color:#ffffff;
}

</style>


