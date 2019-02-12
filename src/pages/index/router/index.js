import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import gclass from '@/components/gclass/gclass'
import rightCon from '@/components/gclass/rightCon'
import seller from '@/components/seller'
import cart from '@/components/cart'
import usercenter from '@/components/usercenter'
import message from '@/components/message'
import gDetails from '@/components/goodsDetails'
import spinfo from '@/components/spinfo'
import perData from '@/components/perData'
import spinfoSuccess from '@/components/spinfoSuccess'
import addBackCard from '@/components/mybankcard/addBackCard'
import bclist from '@/components/mybankcard/bankCardList'
import entryForm from '@/components/entryForm/entryForm'
import entryRlist from '@/components/entryForm/entryRecord'
import jdRecord from '@/components/axjdRecord/jdRecord'
import axRecord from '@/components/axjdRecord/axRecord'
import changePass from '@/components/changePass'
import buyBack from '@/components/buyBack/buyback'
import bblist from '@/components/buyBack/buybacklist'
import recommend from '@/components/recommend/recommend'
import recommendlist from '@/components/recommend/recommendlist'
import aixinzz from '@/components/aixinzz/aixinzz'
import axzzlist from '@/components/aixinzz/axzzlist'
import jindouzz from '@/components/jindouzz/jindouzz'
import jdzzlist from '@/components/jindouzz/jindoulist'

Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })

export default new Router({
  routes:[
    {
      path:'/',
      name:'Home',
      component:Home
    },
    {//商品分类
      path:'/gclass',
      // name:'gclass',
      component:gclass,
      children:[
        {
          path:'/',
          name:'gclass',
          component:rightCon
        },
        {
          path:'c1/:id',
          name:'c1',
          component:rightCon
        }
      ]
    },
    {
      path:'/seller',
      name:'seller',
      component:seller
    },
    {
      path:'/cart',
      name:'cart',
      component:cart
    },
    {//个人中心
      path:'/usercenter',
      name:'usercenter',
      component:usercenter,
      // children:[
      //   {path:'/',component:usercenter},
      //   {path:'axrecord',component:axRecord}
      // ]
    },
    {//我的消息
      path:'/usercenter/message',
      name:'message',
      component:message
    },
    {//银行卡列表
      path:'/usercenter/bclist',
      name:'bclist',
      component:bclist
    },
    {//爱心记录
      path:'/usercenter/axrecord',
      name:'axRecord',
      component:axRecord
    },
    {//金豆记录
      path:'/usercenter/jdrecord',
      name:'jdRecord',
      component:jdRecord
    },
    {//我要推荐
      path:'/usercenter/recommend',
      name:'recommend',
      component:recommend
    },
    {//推荐记录
      path:'/usercenter/recommendl',
      name:'recommendlist',
      component:recommendlist
    },
    {//我的回购
      path:'/usercenter/buyback',
      name:'buyBack',
      component:buyBack
    },
    {//回购记录
      path:'/usercenter/bblist',
      name:'bblist',
      component:bblist
    },
    {//录单列表
      path:'/usercenter/erlist',
      name:'entryRlist',
      component:entryRlist
    },
    {//录单
      path:'/usercenter/eform',
      name:'eform',
      component:entryForm
    },
    {//爱心转增
      path:'/usercenter/aixinzz',
      name:'aixinzz',
      component:aixinzz
    },
    {//爱心转增记录
      path:'/aixinzz/axzzlist',
      name:'axzzlist',
      component:axzzlist
    },
    {//金豆转增
      path:'/usercenter/jindouzz',
      name:'jindouzz',
      component:jindouzz
    },
    {//金豆转增记录
      path:'/jindouzz/jdzzlist',
      name:'jdzzlist',
      component:jdzzlist
    },
    {//添加银行卡
      path:'/usercenter/addbc',
      name:'addbc',
      component:addBackCard
    },
    {//完善资料
      path:'/usercenter/seller_per_info/:userId',
      name:'seller_per_info',
      component:spinfo
    },
    {//资料填写完成
      path:'/usercenter/spinfoSuccess',
      name:'spinfoSuccess',
      component:spinfoSuccess
    },
    {//个人资料
      path:'/usercenter/perdata/:userId',
      name:'perData',
      component:perData
    },
    {//密码管理
      path:'/usercenter/changePass/:id/:phone',
      name:'changePass',
      component:changePass
    },
    {
      path:'gDetails/:gid',
      name:'gDetails',
      component:gDetails
    }
  ]
})
