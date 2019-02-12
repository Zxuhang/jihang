<template>
    <div>
        <mt-header fixed title="我的金豆">
        <router-link to="/usercenter" slot="left"><mt-button icon="back"></mt-button></router-link>
        </mt-header>
        <mt-button icon="more" slot="right"></mt-button>
        <div class="jd-record">
            <mt-navbar v-model="selected">
            <mt-tab-item id="1">奖励消费积分</mt-tab-item>
            <mt-tab-item id="2">推荐金豆积分</mt-tab-item>
            <mt-tab-item id="3">获赠金豆积分</mt-tab-item>
            </mt-navbar>

            <!-- tab-container -->
            <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <div class="number">
                    <h4>累计奖励消费积分</h4>
                    <h3 v-text="jindouN"></h3>
                </div>
                <div class="null" v-if="jindouL.length == 0">
                    <h1><i class="iconfont icon-wujilu"></i></h1>
                    <h3>暂无记录</h3>
                </div>
                <div class="record-list">
                    
                    <div v-for="jd in jindouL" :key="jd.riqi">
                        <div v-text="jd.riqi">
                        </div>
                        <div v-if="parseInt(jd.aixin_yes) > 0">
                            <i class="iconfont icon-xinaixin"></i> + <span v-text="parseInt(jd.aixin_yes)"></span>
                        </div>
                        <div v-if="parseInt(jd.aixin_yes) <= 0">
                            <i class="iconfont icon-xinaixin"></i> <span v-text="parseInt(jd.aixin_yes)"></span>
                        </div>
                        <div>
                            <!-- <div><i class="iconfont icon-jindouyindou01"></i> + 0.0</div> -->
                            <div><i class="iconfont icon-douzi1"></i> + <span v-text="parseFloat(jd.dou)"></span></div>
                        </div>
                    </div>
                    <!-- <div>
                        <div>
                            2018-12-12 18:00
                        </div>
                        <div>
                            <i class="iconfont icon-xinaixin"></i> + <span>1</span>
                        </div>
                        <div>
                            <div><i class="iconfont icon-jindouyindou01"></i> + 0.0</div>
                            <div><i class="iconfont icon-douzi1"></i> + <span>0.1</span></div>
                        </div>
                    </div> -->
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div class="number">
                    <h4>推荐金豆积分</h4>
                    <h3 v-text="tjjindouN"></h3>
                </div>
                <div class="null" v-if="tjjindouL.length == 0">
                    <h1><i class="iconfont icon-wujilu"></i></h1>
                    <h3>暂无记录</h3>
                </div>
                <div class="record-list">                   
                    <div v-for="tj in tjjindouL" :key="tj.riqi">
                        <div v-text="tj.riqi">
                        </div>
                        
                        <div>
                            <!-- <div><i class="iconfont icon-jindouyindou01"></i> + 0.0</div> -->
                            <div><i class="iconfont icon-douzi1"></i> + <span v-text="parseFloat(tj.dou)"></span></div>
                        </div>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <div class="number">
                    <h4>获赠金豆积分</h4>
                    <h3 v-text="zsjindouN"></h3>
                </div>
                <div class="null" v-if="zsjindouL.length == 0">
                    <h1><i class="iconfont icon-wujilu"></i></h1>
                    <h3>暂无记录</h3>
                </div>
                <div class="record-list">
                   <div v-for="zs in zsjindouL" :key="zs.riqi">
                        <div v-text="zs.riqi">
                        </div>
                        
                        <div>
                            <!-- <div><i class="iconfont icon-jindouyindou01"></i> + 0.0</div> -->
                            <div><i class="iconfont icon-douzi1"></i> + <span v-text="parseFloat(zs.dou)"></span></div>
                        </div>
                    </div>
                </div>
            </mt-tab-container-item>
            </mt-tab-container>
        </div>
        
    </div>
</template>
<script>
import store from '../../store/store'
import {mapState} from 'vuex'
export default {
    name:'jdRecord',
    store,
    data(){
        return{
            selected:'1',
            jindouN:0,
            jindouL:[],
            tjjindouN:0,
            tjjindouL:[],
            zsjindouN:0,
            zsjindouL:[]
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
                This.jindouN = parseInt(response.data.data.account.dou_yes);//奖励消费积分                
                This.tjjindouN = parseInt(response.data.data.tjawardmx.sum);//推荐消费积分
                This.zsjindouN = parseInt(response.data.data.zengsongmx.sum);//获赠消费积分
                This.jindouL = response.data.data.jianglixiaofeiList;
                This.tjjindouL = response.data.data.tjawardmx.mx;
                This.zsjindouL = response.data.data.zengsongmx.mx;
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
/* 选项卡 */
.mint-navbar .mint-tab-item{
    /* border-left:1px solid #dcdcdc; */
    color:#777777;
    padding:10px 0;
    border-bottom-width:2px;
}
#app .mint-navbar .mint-tab-item.is-selected{
    border-color:#ffffff;
    color:#ff5f28;
    border-bottom-color:#ff5f28;
}
.mint-tab-container-item{
    padding:10px 5px;
    box-sizing:border-box;
}
#app .mint-navbar .mint-tab-item:nth-child(2) .mint-tab-item-label{
    border-left:1px solid #b6b6b6 !important;
    border-right:1px solid #b6b6b6
}
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
    /* width:100%; */
    box-sizing:border-box;
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
.record-list>div>div:nth-child(2) i{
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


