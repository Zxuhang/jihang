import Vue from 'vue'
import Router from 'vue-router'
import signIn from '@/components/signIn'
import Reg from '@/components/reg'
import forgetPass from '@/components/changePass'

// Vue.use(VueAxios, axios);

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
  // mode: 'history',
  routes:[
    {
      path:'/',
      name:'signIn',
      component:signIn
    },
    {
      path:'/reg/:id',
      name:'Reg1',
      component:Reg
    },
    {
      path:'/reg',
      name:'Reg',
      component:Reg
    },
    {
      path:'/forgetpass',
      name:'forgetp',
      component:forgetPass
    }
  ]
})
