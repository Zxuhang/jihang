<template>
    <div>
        <mt-header fixed title="商品详情">
        <router-link to="/" slot="left">
            <mt-button icon="back"></mt-button>
        </router-link>
        </mt-header>
        <div class="mygSwiper">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="(gImg,i) in gdata.goodsImg" :key="i">
                    <img :src="gImg.image" alt="gImg">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div class="content">
            <div class="price-gm">
                <p v-text="gdata.goodsName"></p>
                <ul class="gmfs">
                    <li>
                        <label><input type="radio" name="gmfs">现价：<span class="xjia">￥<label v-text="gdata.goodsPrice"></label></span><del>￥<span v-text="gdata.goodsOldPrice"></span></del></label>
                    </li>
                    <li>
                        <label><input type="radio" name="gmfs"><span v-text="gdata.goodsDouPrice"></span>金豆积分</label><span v-text="gdata.goodsDouPrice">0</span>
                    </li>
                    <li>
                        <!-- <label><input type="radio" name="gmfs"><span>爱心购买</span></label> -->
                    </li>
                </ul>
                <div class="btn-xl">
                    <div>
                        <button>-</button><span>1</span><button>+</button>
                    </div>
                    <div>
                        <p>库存：<span v-text="gdata.count"></span></p>
                        <p>已售：<span v-text="gdata.sellCount"></span></p>
                    </div>
                </div>
            </div>
            <div class="details">
                <mt-navbar class="page-part" v-model="selected">
                <mt-tab-item id="1">商品介绍</mt-tab-item>
                <mt-tab-item id="2">商品参数</mt-tab-item>
                <!-- <mt-tab-item id="3">评论（0）</mt-tab-item> -->
                </mt-navbar>

                <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <img :src="gdata.goodsDrection" alt="商品介绍">
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <img :src="gdata.goodsParam" alt="商品参数">
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    3
                </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </div>
        <div class="bottom">
            <div>
                <div>
                    <i class="iconfont icon-caigou-xianxing"></i>
                    <p>购物车</p>
                </div>
                <div>
                    <i class="iconfont icon-icon-test5"></i>
                    <p>分享</p>
                </div>
                <div>
                    <i class="iconfont icon-xihuan"></i>
                    <p>收藏</p>
                </div>
            </div>
            <div>
                <button>加入购物车</button>
                <button>立即购买</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'goodsDetails',    
    data(){
        return{
            gDatas:[
                {
                    id:1,
                    oPrice:2000,
                    pPrice:22,
                    name:'OPPOR11',
                    introduce:'充电5分钟通话两小时',                    
                },
                {
                    id:2,
                    oPrice:8000,
                    pPrice:88,
                    name:'iphoneXs',
                    introduce:'苹果最新机',                    
                },
            ],
            gdata:{},
            gid:this.$route.params.gid,
            selected: '1'
        }
    },
    created(){
        var This = this;
        this.myRequest.get('/index/shop/list/goodsInfo/'+this.gid)
        .then(function (response) {
            This.gdata = response.data.data;
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}
</script>
<style scoped>
.mint-header{
    background:#ff5f28;
}
.mygSwiper{
    width:100%;
    height:190px;
    background:#3f4447;
    color:#fff;
    margin-top:40px;
}
.mygSwiper img{
    width:100%;
    height:100%;
}
.content{
    width:100%;
    padding:0 8px;
    box-sizing:border-box;
    background:#e7e7e7;
    text-align:left;
}
.price-gm{
    width:100%;
    box-sizing:border-box;
    background:#ffffff;
    padding:8px 8px;
    color:#a9a9a9;
}
.price-gm > p{
    color:#000000;
    padding-bottom:5px;
    
}
.price-gm ul{
    border-bottom:1px solid #f3f3f3;
    border-top:1px solid #f3f3f3;
}
.price-gm > ul li{
    padding:5px 0px;
}
.price-gm .xjia{
    color:#ff4a00;
    font-weight:bold;
    display:inline-block;
    margin:0 5px;
}
.price-gm del{
    font-size:12px;
}
.price-gm .btn-xl{
    width:100%;
    overflow:hidden;
}
.price-gm .btn-xl div{
    float:left;
    padding:8px 0 0;
}
.price-gm .btn-xl div:first-child button{
    width:36px;
    height:36px;
    padding:0;
    background:#e8e8e8;
    color:#929292;
    border-radius:3px;
    border:0;
    font-size:16px;
}
.price-gm .btn-xl div:first-child span{
    display:inline-block;
    width:70px;
    height:36px;
    margin:0 5px;
    background:#e8e8e8;
    color:#929292;
    text-align:center;
    line-height:36px;
}
.price-gm .btn-xl div:last-child p{
    font-size:12px;
    height:18px;
    line-height:18px;
    text-indent:10px;
}
.details{
    width:100%;
    margin-top:15px;
    background:#ffffff;
    padding-bottom:50px;
}
/* 选项卡 */
.mint-navbar .mint-tab-item{
    border-left:1px solid #dcdcdc;
    background:#f0f0f0;
    color:#777777;
    padding:10px 0;
    border-bottom-width:2px;
}
#app .mint-navbar .mint-tab-item.is-selected{
    border-color:#ffffff;
    background: #ffffff;
    color:#ff0000;
    border-bottom-color:#ff0000;
}
.mint-tab-container-item{
    padding:10px 5px;
    box-sizing:border-box;
}
.mint-tab-container-item img{
    width:100%;
}
/* bottom  */
.bottom{
    position:fixed;
    left:0;
    bottom:0;
    width:100%;
    overflow:hidden;
    box-sizing:border-box;
    background:#ffffff;
    padding:6px 10px;
}
.bottom div{
    float:left;
}
.bottom>div:first-child{
    width:40%;
    display:flex;
    display:-webkit-flex;
    justify-content:space-between;
}
.bottom div div{
    flex:1 1;
    font-size:12px;
}
.bottom div div i{
    font-size:20px;
}
.bottom>div:last-child{
    width:60%;
    box-sizing:border-box;
    padding:0 10px;
    overflow:hidden;
    margin-top:10px;
}
.bottom div:last-child button{
    width:50%;
    height:39px;
    display:block;
    float:left;
}
.bottom div:last-child button:first-child{
    background:#ff9103;
    border-top-left-radius: 39px;
    border-bottom-left-radius: 39px;
    border:0;
    color:#ffffff;
}
.bottom div:last-child button:last-child{
    background:#fd3c3c;
    border-top-right-radius: 39px;
    border-bottom-right-radius: 39px;
    border:0;
    color:#ffffff;
}

</style>


