<template>
    <div>
        <mt-header title="我的回购">
        <router-link to="/usercenter/buyback" slot="left"><mt-button icon="back"></mt-button></router-link>
        </mt-header>
        <mt-navbar v-model="selected">
        <mt-tab-item id="1">回购完成</mt-tab-item>
        <mt-tab-item id="2">回购申请中</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <p class="null" v-if="shjdList.length == 0">
                    无记录
                </p>
                <ul class="list">
                    <li v-for="(s,i) in shjdList" :key="i">
                        <div>普通金豆积分</div>
                        <div>实际到账<span v-text="parseFloat(s.dou)"></span></div>
                        <div v-text="s.riqi"></div>
                    </li>
                </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <p class="null" v-if="wsjdList.length == 0">
                    无记录
                </p>
                <ul class="list">
                    <li v-for="(s,i) in wsjdList" :key="i">
                        <div>普通金豆积分</div>
                        <div>实际到账<span v-text="parseFloat(s.dou)"></span></div>
                        <div v-text="s.riqi"></div>
                    </li>
                </ul>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
export default {
    name:'bblist',
    data(){
        return {
            selected:'1',
            shjdList:[],
            wsjdList:[]
        }
    },
    created(){
        var This = this;
        this.myRequest.post('/ucenter/huigoulist ',{
            userId:localStorage.getItem('userId')
        })
        .then((response)=>{
            This.shjdList = response.data.data.shenheguo;
            This.wsjdList = response.data.data.weishenheguo;
            console.log(response)
        })
        .catch((err)=>{
            console.log(err);
        });
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
.list{
    width:100%;
}
.icon-douzi1{
    color:#fedd00;margin-right:5px;
}
.list li{
    width:100%;
    border-bottom:1px solid #aaa;
    padding:10px 0;
    display:flex;
    display:-webkit-flex;
    justify-content:space-between;
    align-items: center;
}
.list li div:last-child{
    font-size:12px;
}
.list li span{
    color:green;
}
.null{
    margin-top:50px;
}
</style>


