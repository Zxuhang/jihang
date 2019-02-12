<template>
    <div>
        <mt-header fixed title="我的爱心">
        <router-link to="/usercenter" slot="left"><mt-button icon="back"></mt-button></router-link>
        </mt-header>
        <mt-button icon="more" slot="right"></mt-button>
        <div class="jd-record">
            <div class="number">
                <h4>爱心总计</h4>
                <h3 v-text="aixinN"></h3>
            </div>
            <div class="null" v-if="!aixinN">
                <h1><i class="iconfont icon-wujilu"></i></h1>
                <h3>暂无记录</h3>
            </div>
            <div class="record-list">
                
                <!-- <div>
                    <div>
                        2018-12-12 18:00
                    </div>
                    <div>
                        <i class="iconfont icon-xinaixin"></i> + <span>1</span>
                    </div>
                </div> -->
                
                <div v-for="aixin in aixinL" :key="aixin.riqi">
                    <div v-text="aixin.riqi">
                    </div>
                    <div>
                        当日：<span v-text="parseInt(aixin.dayNumber)"></span>
                    </div>
                    <div v-if="parseInt(aixin.aixin) > 0">
                        <i class="iconfont icon-xinaixin"></i><span v-text="'+'+parseInt(aixin.aixin)"></span>
                    </div>
                    <div v-if="parseInt(aixin.aixin) <= 0">
                        <i class="iconfont icon-xinaixin"></i><span v-text="parseInt(aixin.aixin)"></span>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import store from '../../store/store'
import {mapState} from 'vuex'
export default {
    name:'axRecord',
    store,
    data(){
        return{
            aixinN:'',
            aixinL:[]
        }
    },
    computed:mapState(['userData']),
    created(){
        var This = this;
        this.myRequest.post('/ucenter/aixin',{
            userId:This.userData.userID
        })
        .then((response)=>{
            if(response.data.message == 'success'){
                This.aixinN = parseInt(response.data.data.account.aixin_yes);
                This.aixinL = response.data.data.aixinmx;
            }
            console.log(response)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}
</script>
<style scoped>

.number{
    color:#444444;
    padding:20px 0;
}
.null{
    color:#999999;
    border-top:1px solid #dcdcdc;
    box-sizing:border-box;
    margin:0 -5px;
}
.null i{
    font-size:40px;
}
.record-list{
    border-top:1px solid #dcdcdc;
    width:100%;
    box-sizing:border-box;
    -webkit-box-sizing:border-box;
    margin:0 -5px;
    color:#888;
}
.record-list>div{
    display:flex;
    display:-webkit-flex;
    padding:10px;
    box-sizing: border-box;
    border-bottom:1px solid #dcdcdc;
    justify-content:space-between;
    align-items: center;
    font-size:13px;
}
.record-list>div>div:nth-child(3){
    width:100px;
    display:flex;
    display:-webkit-flex;
    justify-content:space-between;
    align-items: center;
}
.record-list>div>div:nth-child(3) i{
    color:red;margin-right:5px;
}
.record-list>div>div:last-child div:first-child i{
    color:#e6e6e6;
    margin-right:5px;
}
.record-list>div>div:last-child div:last-child i{
    color:#fedd00;margin-right:5px;
}
</style>


