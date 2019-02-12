<template>
    <div>
        <mt-header title="我的消息">
        <router-link to="/usercenter" slot="left"><mt-button icon="back"></mt-button></router-link>        
        </mt-header>
        <p v-if="noticeList.length == 0">无</p>
        <ul>
            <li v-for="l in noticeList" :key="l.id">
                <h5 v-text="l.noticeType"></h5>
                <div>标题：<span v-text="l.noticeTitle"></span> <i v-if="l.isRead == 0"></i></div>
                <div>时间：<span v-text="l.sendTime"></span> <button @click="read(l.id)">我知道了</button></div>
                <p v-text="l.noticeBody"></p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'message',
    data(){
        return {
            noticeList:[]
        }
    },
    methods:{
        read(id){
            this.myRequest.get('/ucenter/notification/sendmessage/list/'+id)
            .then((response)=>{
                if(response.data.message == 'success'){
                    this.getMessage();
                }
                console.log(response)
            })
            .catch((err)=>{
                console.log(err);
            });
        },
        getMessage(){
            this.myRequest.post('/ucenter/notification/sendmessage/list',{
                userId:localStorage.getItem('userId')
            })
            .then((response)=>{
                this.noticeList = response.data.data.list;
                console.log(response)
            })
            .catch((err)=>{
                console.log(err);
            });
        }
    },
    created(){
        this.getMessage()
    }
}
</script>
<style scoped>
ul{
    width:100%;

}
ul li{
    padding:0 10px;
    -webkit-box-sizing:border-box;
    box-sizing: border-box;
    width:100%;
    border-bottom:1px solid #aaaaaa;
    text-align:left;

}
ul li>h5:first-child{
    font-size:12px;
    background:#ddd;
    padding:5px 10px;
    margin:0 -10px;
    border-bottom:1px solid #aaa;
}
ul li>div:nth-child(3){
    overflow: hidden;
    margin:6px 0;
    /* font-size:12px; */
}
ul li>div:nth-child(3) button{
    display:block;
    float:right;
    background: #ff5f28;
    color:#fff;
    padding:2px 5px;
    border:0;
    border-radius:3px;
}
ul li>div>i{
    display:inline-block;
    margin-bottom:10px;
    width:5px;
    height:5px;
    border-radius: 5px;
    background:rgb(248, 78, 78);
}
ul li p{
    color:#333;
    width:100%;
    font-size:14px;
    /* text-indent:20px; */
    padding:5px 0;
}
</style>

