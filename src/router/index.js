import Vue from 'vue'
import VueRouter from 'vue-router'

//tourist相关组件
import touristHome from '../views/touristHome.vue'
import login from '../components/tourist/login.vue'
import touristWelcome from '../components/tourist/touristWelcome.vue'
import touristApply from '../components/tourist/touristApply.vue'
import register from '../components/tourist/register.vue'



//member相关组件
import memberHome from '../views/memberHome.vue'
import memberWelcome from '../components/member/memberWelcome.vue'
import memberTransaction from '../components/member/memberTransaction.vue'
import memberBorrow from '../components/member/memberBorrow.vue'
import memberchange from '../components/member/memberchange.vue'
import memberHistory from '../components/member/memberHistory.vue'
import financialProducts from '../components/member/financialProducts.vue'
import memberInformation from '../components/member/memberInformation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/touristHome'
  },
  {
    path: '/touristHome',
    component: touristHome,
    redirect: '/touristWelcome',
    children:[
      {path: '/login', component: login},
      {path: '/touristApply', component: touristApply},
      {path: '/touristWelcome', component: touristWelcome},
      {path: '/register', component: register}
    ]

  },
  {
    path: '/memberHome',
    component: memberHome,
    redirect:'/memberWelcome',
    children:[
      {path: '/memberWelcome', component: memberWelcome},
      {path: '/memberTransaction', component: memberTransaction},
      {path: '/memberBorrow', component: memberBorrow},
      {path: '/memberchange', component: memberchange},
      {path: '/memberHistory', component: memberHistory},
      {path: '/financialProducts', component: financialProducts},
      {path: '/memberInformation', component: memberInformation}
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
