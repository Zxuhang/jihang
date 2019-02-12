<template>
    <div>
       <mt-header fixed title="完善资料">
        <router-link to="/usercenter" slot="left"><mt-button icon="back"></mt-button></router-link>
       </mt-header>
       <div class="info-content">
           <div id="info_page1" :class="{'i-hide':ishide[0].is}">          
            <div>           
                <p class="tjr">推荐人：<span v-text="userData.tuijianId"></span></p>
                <p class="tjr">推荐人账号：<span v-text="userData.tuijianName"></span></p>
            <mt-field label="企业名称" v-model="qiyeName"></mt-field>
            <mt-field label="店铺名称" v-model="shopName"></mt-field>
            <mt-field label="企业所在地">
                <span >
                    <select v-model="sel_pro" @change="selCity(sel_pro)">
                        <option disabled>省</option>
                        <option v-for="pro in province" :key="pro.area_id" :value="pro" v-text="pro.area_name"></option>
                    </select>
                    <select v-model="sel_city" @change="selArea(sel_city)">
                        <option disabled>市</option>
                        <option v-for="cit in city" :key="cit.area_id" :value="cit" v-text="cit.area_name"></option>
                    </select>
                    <select v-model="sel_area">
                        <option disabled>区、县</option>
                        <option v-for="are in area" :key="are.area_id" :value="are" v-text="are.area_name"></option>
                    </select>
                </span>
            </mt-field>
            <mt-field label="行业" v-model="hangye"></mt-field>
            <a class="mint-cell mint-field"><div class="mint-cell-left"></div> <div class="mint-cell-wrapper"><div class="mint-cell-title">
                <span class="mint-cell-text">行业类别</span> 
                </div> <div class="mint-cell-value">
                <select v-model="hangyeType">
                    <option>小规模</option>
                    <option>一般纳税人</option>
                    <option>其他</option>
                </select>
            <span class="mint-field-state is-default"><i class="mintui mintui-field-default"></i></span> <div class="mint-field-other"></div></div> <!----></div> <div class="mint-cell-right"></div></a>
            <mt-field label="企业规模" v-model="qiyeGuimo"></mt-field>
            <mt-field label="企业电话" v-model="qiyePhone"></mt-field>
            <mt-field label="开始营业时间" type="time" v-model="openTime"></mt-field>
            <mt-field label="结束营业时间" type="time" v-model="closeTime"></mt-field>
            
            <mt-field label="主营业务" placeholder="必须和营业执照上的经营范保持一致" type="textarea" rows="4" v-model="bussness"></mt-field>
            <mt-field label="商家简介" placeholder="" type="textarea" rows="4" v-model="direction"></mt-field>
            </div>
            <button @click="pageNext(0)">下一步</button>
           </div>
           <div id="info_page2" :class="{'i-hide':ishide[1].is}">          
            <div>           
                <h3>税务信息</h3>
            <a class="mint-cell mint-field"><div class="mint-cell-left"></div> <div class="mint-cell-wrapper"><div class="mint-cell-title">
                <span class="mint-cell-text">纳税人类别</span> 
                </div> <div class="mint-cell-value">
                <select v-model="taxType">
                    <option selected>小规模纳税人</option>
                    <option>一般纳税人</option>
                </select>
            <span class="mint-field-state is-default"><i class="mintui mintui-field-default"></i></span> <div class="mint-field-other"></div></div> <!----></div> <div class="mint-cell-right"></div></a>
            <mt-field label="纳税人识别号" v-model="taxNo"></mt-field>
            <mt-field label="开户行" v-model="bank"></mt-field>
            <mt-field label="开户支行" v-model="payBank"></mt-field>
            <mt-field label="开户名" v-model="bankName"></mt-field>
            <mt-field label="银行账号" v-model="bankCardNo"></mt-field>
            <mt-field label="公司注册地址" placeholder="必须和营业执照上的住所一致" type="textarea" rows="4"  v-model="regeditAddress"></mt-field>
            </div>
            <button @click="pageUp(1)" class="btn1">上一步</button>
            <button @click="pageNext(1)" class="btn2">下一步</button>
           </div>
           <div id="info_page3" :class="{'i-hide':ishide[2].is}">          
            <div>           
                <h3>负责人信息</h3>
            <mt-field label="姓名" v-model="trueName"></mt-field>
            <mt-field label="岗位" v-model="job"></mt-field>
            <mt-field label="性别"><label> 男：<input type="radio" v-model="sex" value="1"></label> <label>女：<input type="radio" v-model="sex" value="0"></label></mt-field>
            <mt-field label="出生日期" type="date" v-model="birthday"></mt-field>
            <mt-field label="身份证号" v-model="cardNo"></mt-field>
            <mt-field label="邮箱" v-model="email"></mt-field>
            <mt-field label="二级密码" type="password" v-model="payPass"></mt-field>
            <mt-field label="确认密码密码" type="password" v-model="rePayPass"></mt-field>
            </div>
            <button @click="pageUp(2)" class="btn1">上一步</button>
            <button @click="pageNext(2)" class="btn2">下一步</button>
           </div>
           <div id="info_page4" :class="{'i-hide':ishide[3].is}">          
            <div>           
                <h3>证件资料</h3>
            <a class="mint-cell mint-field"><div class="mint-cell-left"></div> <div class="mint-cell-wrapper"><div class="mint-cell-title">
                <span class="mint-cell-text">执照类型</span> 
                </div> <div class="mint-cell-value">
                <select v-model="licenseType">
                    <option value="1">旧版营业执照</option>
                    <option value="0">新版营业执照</option>                    
                </select>
            <span class="mint-field-state is-default"><i class="mintui mintui-field-default"></i></span> <div class="mint-field-other"></div></div> <!----></div> <div class="mint-cell-right"></div></a>
            <form id="upImg"></form>
            <ul class="upImg">
                <li>
                    <span>营业执照</span>
                    <div>
                        <label>
                           <img :src="yyzz" alt="">
                           <input form="upImg" type="file" ref="yyzz" @change="upImg('yyzz','licenseImg')" accept="image/*"> 
                        </label>                        
                        <!-- <div>×</div> -->
                        <!-- <button>浏览</button> -->
                    </div>
                </li>
                <li>
                    <span>法人身份证</span>
                    <div>
                        <label>
                           <img :src="frsfz" alt="">
                           <input form="upImg" type="file" ref="frsfz" @change="upImg('frsfz','cardImgA')" accept="image/*"> 
                        </label> 
                        <!-- <div>×</div> -->
                        <!-- <button>浏览</button> -->
                    </div>
                </li>
                <!-- <li>
                    <span>捐赠承诺书(签字版)</span>
                    <div>
                        <label>
                           <img :src="jzcns" alt="" >
                           <input form="upImg" type="file" ref="jzcns" @change="upImg('jzcns','donorImg')" accept="image/*"> 
                        </label> 
                        <div>×</div>
                        <button>浏览</button>
                    </div>
                </li> -->
                <li>
                    <span>店面门头照</span>
                    <div>
                        <label>
                           <img :src="dmmtz" alt="">
                           <input form="upImg" type="file" ref="dmmtz" @change="upImg('dmmtz','shopImg')" accept="image/*"> 
                        </label> 
                        <!-- <div>×</div> -->
                        <!-- <button>浏览</button> -->
                    </div>
                </li>
            </ul>
            </div>
            <div class="tishi">
                <img src="static/images/tishi.png">
            </div>
            <button @click="pageUp(3)" class="btn1">上一步</button>
            <button @click="pageNext(3)" class="btn2">完成</button>
           </div>
       </div>
        
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import store from '../store/store'
import {mapState} from 'vuex'
export default {
    name:'spinfo',
    store,
    data(){
        return{
            ishide:[{is:false},{is:true},{is:true},{is:true}],
            //第一页
            province:[],
            sel_pro:{},
            city:[],
            sel_city:{},
            area:[],
            sel_area:{},
            qiyeName:'',
            shopName:'',
            // qiyeAddress:'',
            hangye:'',   
            hangyeType:'',
            qiyeGuimo:'',
            qiyePhone:'',
            openTime:'08:00',
            closeTime:'18:00',
            bussness:'',
            direction:'',
            //第二页
            taxType:'',
            taxNo:'',
            bank:'',
            payBank:'',
            bankName:'',
            bankCardNo:'',
            regeditAddress:'',
            //第三页
            trueName:'',
            job:'',
            sex:'',
            birthday:'',
            cardType:'身份证',
            cardNo:'',
            email:'',
            payPass:'',
            rePayPass:'',
            //第四页
            licenseType:'0',
            yyzz:'static/images/img.png',
            frsfz:'static/images/img.png',
            jzcns:'static/images/img.png',
            dmmtz:'static/images/img.png',
            }
    },
    computed:mapState(['userData']),//vuex 获取用户数据
    methods:{
        pageNext:function(n){
           var This = this;
           var parameter;
           
           if(n == 0){
                parameter = {
                    page:n+1,
                    userID:this.userData.userID,
                    qiyeName:this.qiyeName,
                    shopName:this.shopName,
                    qiyeAddress:this.sel_pro.area_name+this.sel_city.area_name+this.sel_area.area_name,
                    hangye:this.hangye,   
                    hangyeType:this.hangyeType,
                    qiyeGuimo:this.qiyeGuimo,
                    qiyePhone:this.qiyePhone,
                    openTime:this.openTime+'-'+this.closeTime,
                    bussness:this.bussness,
                    direction:this.direction,
                    province:this.sel_pro.area_name,
                    city:this.sel_city.area_name,
                    area:this.sel_area.area_name
                }
           }else if(n == 1){
               
                parameter = {
                    page:n+1,
                    userID:this.userData.userID,
                    taxType:this.taxType,
                    taxNo:this.taxNo,
                    bank:this.bank,
                    payBank:this.payBank,
                    bankName:this.bankName,
                    bankCardNo:this.bankCardNo,
                    regeditAddress:this.regeditAddress
                }
           }else if(n == 2){
               if(this.payPass == '' || this.rePayPass == ''){
                   Toast('密码不能为空');
                   return false;
               }
               if(this.payPass != this.rePayPass ){
                   Toast('两次密码不一致请重新输入')
                    return false;
                }
                parameter = {
                    page:n+1,
                    userID:this.userData.userID,
                    trueName:this.trueName,
                    job:this.job,
                    sex:this.sex,
                    birthday:this.birthday,
                    cardType:this.cardType,
                    cardNo:this.cardNo,
                    email:this.email,
                    payPass:this.payPass,
                    rePayPass:this.rePayPass
                }
           }else{
               parameter = {
                   page:n+1,
                   userID:this.userData.userID,
                   licenseType:this.licenseType
               }
                if(!this.$refs.yyzz.files[0]){
                    Toast('请上传营业执照片');
                    return false;
                }
                if(!this.$refs.frsfz.files[0]){
                    Toast('请上传法人身份证照片');
                    return false;
                }
                // if(!this.$refs.jzcns.files[0]){
                //     Toast('请上传捐赠承诺书照片');
                //     return false;
                // }
                if(!this.$refs.dmmtz.files[0]){
                    Toast('请上传店面门头照片');
                    return false;
                }
           }
           
           
           this.myRequest.post('/ucenter/get/info/seller',parameter)//提交
            .then((response)=>{
                if(response.data.message == 'success'){
                    if(n != 3){
                        This.ishide[n].is = true;
                        This.ishide[n+1].is = false;
                    }else{
                        store.commit('getU',This.myRequest);
                        This.$router.push('/usercenter/spinfoSuccess');
                    }
                    
                }else{
                    
                    Toast(response.data.tit)
                }
                
                console.log(response)
            })
            .catch((error)=>{
                console.log(error)
            });
        },
        upImg:function(str,n){//上传图片
            var This = this;
            var fImg = this.$refs[str].files[0];
            console.log(fImg)
            if(fImg.size > 4194304){
                Toast('上传的图片不能大于4M');
                return false;
            }
            var fd = new FormData();
            fd.append(str,fImg);
            fd.append('name',str);
            fd.append('ftype',n);
            fd.append('userid',this.userData.userID);
            let config = {
                timeout: 20000,
                headers: {'Content-Type': 'multipart/form-data'}
            }
            Indicator.open({
            text: '上传图片中...',
            spinnerType: 'fading-circle'
            });
            this.myRequest.post('/sellerUpload',fd,config)//提交
            .then((response)=>{
                Indicator.close();
                 if(response.data.message == 'success'){
                     This[str] = response.data.data;
                     Toast('上传成功')
                 }
                console.log(response)
            })
            .catch((error)=>{
                Toast('网络错误');
                Indicator.close();
                console.log(error)
            });

        },
        pageUp:function(n){
            this.ishide[n].is = true;
            this.ishide[n-1].is = false;
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
    // beforeCreate(){
    //     console.log(this.$route.params.gid)
    //     if(document.querySelector('.menu')){
    //         document.querySelector('.menu').style.display ='none';
    //     }
        
    // },
    // beforeRouteLeave (to, from, next) {
    //     // react to route changes...
    //     // don't forget to call next()\
    //     document.querySelector('.menu').style.display ='block';
    //     next();
    // }
}
</script>
<style scoped>
h3{
   margin:0 0 10px;
}
.mint-cell-value select{
    width:70px;
}
.info-content{
    width:100%;
    padding-top:50px;
}
.info-content button{
    width:40%;
    border:0;
    margin:10px 0;
    background:#ff5f28;
    color:#ffffff;
    border-radius:5px;
    padding:10px 0;
    font-size:16px;
    letter-spacing:3px;

}
.tjr{
    font-size:14px;
    text-align:left;
    padding-left:10px;
}
.info-content .btn1{
    margin-left:5%;
        float:left;
}
.info-content .btn2{
    margin-left:10%;
        float:left;
}
.i-hide{
    display:none;
}
.upImg{
    width:100%;
    overflow:hidden;
}
.upImg img{
    width:100%;
    height:100%;
}
.upImg input[type="file"]{
    display:none;
}
.upImg li{
    width:50%;
    float:left;
    padding:10px;
    box-sizing:border-box;
    text-align:left;
}
.upImg li span{
    font-size:14px;
}
.upImg li:nth-child(2n){
    float:right;
}
.upImg li>div{
    width:100px;
    height:120px;
    position:relative;
    border:1px solid #ddd;
    margin:0 auto;
    margin-top: 5px;
}
.upImg li>div>div{
    position:absolute;
    right:-10px;
    top:-10px;
    width:20px;
    height:20px;
    background:#cd2647;
    border-radius:100%;
    color:#ffffff;
    font-size:16px;
    text-align:center;
    line-height:20px;
    font-family: '宋体';
}
.upImg li>div button{
    width:100%;
    padding:3px 0;
    background:#ffffff;
    border:1px solid #ff5f28;
    color:#555;
        float:left;
}
.tishi{
    width:100%;
    padding:10px;
    box-sizing: border-box;
}
.tishi img{
    width:100%;
}
</style>

