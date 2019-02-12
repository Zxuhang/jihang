<template>
    <div>
        <mt-header fixed title="录单记录">
            <router-link to="/usercenter" slot="left"><mt-button icon="back"></mt-button></router-link>
        </mt-header>
        <div class="er-list">
            <!-- <div>
                <div>
                    <span>杨朋</span><span>(消费者)</span>
                    <div>ID:<span>123456</span></div>
                    <div>2018-12-12</div>
                </div>
                <div>
                    <div><span>5.00</span><button>待审核</button></div>
                    <div><button>删除</button></div>
                </div>
            </div> -->
            <p v-if="dataList.length == 0">暂无记录</p>
            <div v-if="userData.type =='商家'" v-for="d in dataList" :key="d.id">
                <div>
                   <span v-text="d.trueName"></span> <!-- <span>({{ d.userType }})</span> -->
                    <div>ID:<span v-text="d.userId"></span></div>
                    <div v-text="d.times"></div>
                </div>
                <div>
                    <div><span v-text="d.xsmoneys"></span><button v-if="d.xfSh == 0">待审核</button><button v-if="d.xfSh != 0">已审核</button></div>
                    <div><button @click="delEf(d.id)" v-if="d.xfSh == 0">删除</button></div>
                </div>
            </div>
            <div v-if="userData.type =='消费者'" v-for="d in dataList" :key="d.id">
                <div>
                   <span></span> <!-- <span>({{ d.userType }})</span> -->
                    <div>ID:<span v-text="d.sellerId"></span></div>
                    <div v-text="d.times"></div>
                </div>
                <div>
                    <div><span v-text="d.xsmoneys"></span><button v-if="d.xfSh == 0">待审核</button><button v-if="d.xfSh != 0">已审核</button></div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import store from '../../store/store'
import {mapState} from 'vuex'
export default {
    name:"erlist",
    data(){
        return{
            dataList:[]
        }
    },
    store,
    computed:mapState(['userData']),
    methods:{
        delEf(id){
            var This = this;
            var ydel = window.confirm('您确定要删除这条数据吗？');
            if(ydel){
                this.myRequest.post('/ucenter/seller/dele/ludan',{
                    id:id
                })
                .then(function(response){
                    if(response.data.message == 'success'){
                        Toast('删除成功');
                        This.getEr();
                        // This.$router.push('/usercenter/erlist');
                    }else{
                        console.log(response);
                    }
                })
                .catch(function(error){
                    Toast('网络错误');
                })
            }
        },
        getEr(){
            var This = this;
            this.myRequest.get('/ucenter/seller/ludan/list/'+This.userData.userID)
            .then(function (response) {
                if(response.data.message == 'success'){
                    This.dataList = response.data.data;
                    console.log(This.dataList)
                }
            })
            .catch(function (error) {
                Toast('网络错误！');
                console.log(error);
            });
        }
    },
    created(){
       this.getEr();
    }
}
</script>
<style scoped>
.er-list{
    padding-top:40px;
}
.er-list>div{
    width:100%;
    padding:5px 10px;
    box-sizing:border-box;
    border-bottom:1px solid #cdcdcd;
    color:#888888;
    font-size:14px;
    display:flex;    
    display:-webkit-flex;
    justify-content: space-between;
    text-align:left;
}
.er-list>div>div:first-child>div{
    margin-top:3px;
}
.er-list>div>div>span:first-child{
    font-size:16px;
    color:#000000;
}
.er-list>div>div:last-child{
    display:flex;
    display:-webkit-flex;
    flex-direction:column;
    justify-content: space-between;
    text-align:right;
    color:black;
}
.er-list>div>div:last-child button{
    padding:3px 5px;
    border:1px solid #cdcdcd;
    border-radius:3px;
    background:none;
    color:#555;
    margin-left:10px;
}
.er-list>div>div:last-child div:last-child button{
    color:red;
}
</style>


