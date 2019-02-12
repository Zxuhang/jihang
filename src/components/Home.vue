<template>
    <div>
    <div class="view" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
        <mt-search placeholder="寻找宝贝"></mt-search>
      <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :autoFill="false" ref="loadmore">

        
        <div class="mySwiper">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="swipe in swiperData" :key="swipe.name">
                    <img :src="swipe.imgSrc" alt="swipe.name">
                </mt-swipe-item>
            </mt-swipe>
        </div>

        <ul>
            <li>
                <router-link to="/goodsList">
                    <img src="static/images/index_03.png" alt="">
                   <p>母婴用品</p>
                </router-link>
            </li>
            <li>
                <router-link to="/goodsList">
                    <img src="static/images/index_05.png" alt="">
                   <p>苏泊尔</p>
                </router-link>
            </li>
            <li>
                <router-link to="/goodsList">
                    <img src="static/images/index_07.png" alt="">
                   <p>精品箱包</p>
                </router-link>
            </li>
            <li>
                <router-link to="/goodsList">
                    <img src="static/images/index_09.png" alt="">
                   <p>洗涤用品</p>
                </router-link>
            </li>
            <li>
                <router-link to="/goodsList">
                    <img src="static/images/index_11.png" alt="">
                   <p>数码办公</p>
                </router-link>
            </li>
        </ul>
        <ul>
            <li>
                <router-link to="/goodsList">
                    <img src="static/images/index_18.png" alt="">
                   <p>日常用品</p>
                </router-link>
            </li>
            <li>
                <router-link to="/goodsList">
                    <img src="static/images/index_19.png" alt="">
                   <p>美妆护肤</p>
                </router-link>
            </li>
            <li>
                <router-link to="/goodsList">
                    <img src="static/images/index_20.png" alt="">
                   <p>家用电器</p>
                </router-link>
            </li>
            <li>
                <router-link to="/goodsList">
                    <img src="static/images/index_21.png" alt="">
                   <p>厨房用品</p>
                </router-link>
            </li>
            <li>
                <router-link to="/goodsList">
                    <img src="static/images/index_22.png" alt="">
                   <p>汽车用品</p>
                </router-link>
            </li>
        </ul>

        <div class="jptj">
            <h4>精品推荐</h4>
            <div class="j-top">
                <div class="j-left">
                    <router-link to="">
                        <img src="static/images/index_29.png" alt="">
                    </router-link>
                </div>
                <div class="j-right">
                    <router-link to="">
                        <img src="static/images/index_31.png" alt="">
                    </router-link>                    
                </div>
            </div>

            <div class="j-bottom">
                <div>
                    <img src="static/images/index_36.png" alt="">
                </div>
                <div>
                    <img src="static/images/index_39.png" alt="">
                </div>
                <div>
                    <img src="static/images/index_41.png" alt="">
                </div>
            </div>
            <div class="j-bottom">
                <div>
                    <img src="static/images/index_46.png" alt="">
                </div>
                <div>
                    <img src="static/images/index_48.png" alt="">
                </div>
                <div>
                    <img src="static/images/index_50.png" alt="">
                </div>
            </div>
            
        </div>
        <div class="cnxh">
            <h4>猜你喜欢</h4>
           <glist v-bind:gDatas="goodsL"></glist> 
        </div>
        <div slot="bottom" class="mint-loadmore-bottom">
            <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑加载更多</span>
            <span v-show="bottomStatus === 'loading'">
              <mt-spinner type="snake"></mt-spinner>
            </span>
        </div>
      </mt-loadmore>     
    </div>
    <bottomNav></bottomNav>
    </div>
</template>
<script>

import bottomNav from './bottom'
import glist from "./goodsList"
import { Toast } from 'mint-ui';
export default {
    name:'Home',   
    data(){
        return{
            swiperData:[
                {imgSrc:'../static/images/O1CN011C4P9tLbLDW73V0_!!27-0-luban.jpg',name:"手机"},
                {imgSrc:'../static/images/O1CN011CxMgZ9Ebxja1hr_!!147-0-lubanu.jpg',name:"衣服"},
                {imgSrc:'../static/images/TB1Jmq5qKGSBuNjSspbSuwiipXa.jpg',name:"电视"},
            ],
            goodsPage:0,
            goodsL:[],
            list: [],
            allLoaded: false,
            bottomStatus: 'loading',
            wrapperHeight: 0
        }
    },
    created(){
       this.getGoods({page:0});        
    },
    components:{
        glist,bottomNav
    },
    methods:{
        getGoods(page){
            var This = this;
            this.myRequest.post('/index/shop/list',page)
            .then(function (response) {
                if(response.data.data.length == 0){
                    This.allLoaded = true;//全部加载完之后
                    Toast('没有更多了')
                }
                if(page.page != 0){
                    response.data.data.forEach(element => {
                        This.goodsL.push(element)
                    });
                    console.log(This.goodsL)
                }else{
                    This.goodsL = response.data.data;
                }
                This.goodsPage =This.goodsL.length;
                console.log(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
        loadBottom() {
            setTimeout(() => {
            // let lastValue = this.list[this.list.length - 1];
            // console.log(this.list)
            // if (lastValue < 40) {
            //     for (let i = 1; i <= 10; i++) {
            //     this.list.push(lastValue + i);
            //     }
            // } else {
            //     this.allLoaded = true;//全部加载完之后
            // }
            var This = this;
            this.getGoods({page:This.goodsPage});
            this.$refs.loadmore.onBottomLoaded();
            }, 1500);
        }
    },

    mounted() {
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top - 50;
    }
}
</script>

<style scoped>
.mint-searchbar-inner{
    height:20px !important;
    text-align:center !important;
}
.mint-searchbar-core{
  text-align:center !important;
}
.mint-searchbar-inner i{
  order:2;
  font-size:14px !important;
  color:#6b5860 !important;
}
.mint-searchbar{
    padding:5px !important;
    margin:5px !important;
    border-radius:3px !important;
    text-align:center !important;
    background:none !important;
}
.mint-search{
    height:48px !important;
    background:#ff5f28 !important;
}

.mySwiper{
    width:100%;
    height:190px;
    background:#3f4447;
    color:#fff;
}
.mySwiper img{
    width:100%;
    height:100%;
}

/* 类别菜单 */
ul{
    width:100%;
    box-sizing:border-box;
    padding:8px;
    padding-bottom:0;
    overflow:hidden;
}
ul li{
    float:left;
    width:20%;
    text-align:center;
    font-size:14px;
}
ul li p{
     color:#3f4447;
}
ul li img{
    width:40px;
    height:40px;
}

/* 精品推荐 */
.jptj{
    padding:8px;
    overflow:hidden;
}
.jptj h4{
    width:100%;
    text-align:center;
    padding:5px 0;
    background:#f91b49;
    color:#ffffff;
    letter-spacing:2px;
    font-weight:normal;
}
.jptj a{
    display:block;
}
.jptj img{
    display:block;
    width:100%;
}
.j-top{
    width:100%;
    padding:8px 0 5px 0;
    box-sizing:border-box;
    overflow:hidden;
    display:flex;
    display:-webkit-flex;
    justify-content:space-between;
}
.j-top .j-left{
   margin-right:5px;
   width:50%;
}
.j-top .j-right{
   width:50%;
}
.j-bottom{
    width:100%;
    padding-bottom:5px;
    /* box-sizing:border-box; */
    /* overflow:hidden; */
    display:flex;
    display:-webkit-flex;
    justify-content:space-between;
}
.j-bottom > div:nth-child(2),.j-bottom > div:nth-child(5){
    margin-left: 5px;
    margin-right: 5px;
}
/*猜你喜欢*/
.cnxh{
    padding:8px;
    overflow:hidden;
}
.cnxh h4{
    color:#fa1545;
    background:#eeeded;
    font-weight:normal;
    letter-spacing:2px;
    padding:5px 0;
    margin:0 -8px;
}
</style>


