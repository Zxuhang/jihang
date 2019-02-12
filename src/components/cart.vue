<template>
    <div>
    <div class="view">
        <mt-header fixed title="购物车">
        <router-link to="/" slot="left"><mt-button icon="back"></mt-button></router-link>
        <span slot="right">编辑</span>
        </mt-header>
        <ul class="cart-list">
            <!-- <li>
                <div><label><input type="checkbox"><span></span></label></div>
                <div><img src="static/images/index_56.gif" alt=""></div>
                <div>
                    <p>会说话的毛绒玩具小熊大号儿童玩具</p>
                    <div><span>123</span>元</div>
                    <div>
                        <button>-</button>
                        <input value="1" type="text">
                        <button>+</button>
                    </div>
                </div>
            </li> -->

        </ul>
        
    </div>
    <bottomNav></bottomNav>
    </div>
</template>
<script>
import bottomNav from './bottom'
export default {
    name:'cart',
    data(){
        return{
        }
    },
    components:{
        bottomNav
    }
}
</script>
<style scrped>
.cart-list{
    margin-top:45px;
    padding-bottom:20px;
    background:#e9e9e9;
}
.cart-list li{
    padding:5px 10px;
    margin:8px 0;
    background:#ffffff;
    box-sizing:border-box;
    display:-webkit-flex;
    display:flex;
    align-items: center;
    height:100px;
}
.cart-list li>div:first-child{
    flex:1;
}
.cart-list li>div:first-child label>input{
    display:none;
}
.cart-list li>div:first-child label>input:checked+span{
    background:red;
    border:0;
}
.cart-list li>div:first-child label>input:checked+span:after{
    content:'∨';
    font-size:12px;
    color:#ffffff;
    font-weight:bold;
}
.cart-list li>div:first-child label>span{
    display:block;
    width:18px;
    height:18px;
    border-radius:18px;
    border:1px solid #aaa;
}
.cart-list li>div:nth-child(2){
    flex:2.5;
}
.cart-list li div:nth-child(2) img{
    width:80%;
}
.cart-list li>div:last-child{
    height:100%;
    flex:5.5;
    text-align:left;
    display:-webkit-flex;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
}
.cart-list li>div:last-child p{
    font-size:12px;
    color:black;
}
.cart-list li>div:last-child div:nth-child(2){
    color:#aaa;
}
.cart-list li>div:last-child div:nth-child(2) span{
    color:rgb(243, 77, 77);
}
.cart-list li>div:last-child input{
    width:40px;
    border:0;
    text-align:center;
}
.cart-list li>div:last-child button{
    border:0;
    background:none;
    color:#909090;
    font-size:18px;
}
</style>


