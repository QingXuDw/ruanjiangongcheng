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
import createHome from '../views/createHome.vue'
import memberWelcome from '../components/member/memberWelcome.vue'
import memberNotice from '../components/member/memberNotice.vue'
import memberBorrow from '../components/member/memberBorrow.vue'
import memberchange from '../components/member/memberchange.vue'
import memberHistory from '../components/member/memberHistory.vue'
import financialProducts from '../components/member/financialProducts.vue'
import memberInformation from '../components/member/memberInformation.vue'
import memberCreate from '../components/member/memberCreate.vue'

//admin相关组件
import adminHome from '../views/adminHome.vue'
import checkRegister from '../components/admin/checkRegister.vue'
import adminCompany from '../components/admin/adminCompany.vue'
import adminInvestment from '../components/admin/adminInvestment.vue'
import adminLoan from '../components/admin/adminLoan.vue'
import adminWelcome from '../components/admin/adminWelcome.vue'

//公用组件
import message from '../components/message.vue'
import changePassword from '../components/changePassword.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/touristHome'
  },
  {
    path: '/touristHome',
    component: touristHome,
    redirect: '/login',
    children:[
      {path: '/login', component: login},
      {path: '/touristApply', component: touristApply},
      {path: '/touristWelcome', component: login},
      {path: '/register', component: register}
    ]

  },
  {
    path: '/memberHome',
    component: memberHome,
    redirect:'/memberNotice',
    children:[
      {path: '/memberWelcome', component: message},
      {path: '/memberNotice', component: message},
      {path: '/memberBorrow', component: memberBorrow},
      {path: '/memberchange', component: memberchange},
      {path: '/memberHistory', component: memberHistory},
      {path: '/changePassword', component: changePassword},
      {path: '/financialProducts', component: financialProducts},
      {path: '/memberInformation', component: memberInformation},
    ]
  },
  {
    path: '/createHome',
    component: createHome,
    redirect:'/memberCreate',
    children:[
      {path: '/memberCreate', component: memberCreate},
      {path: '/createMessage', component: message},
      {path: '/changePassword', component: changePassword},
    ]
  },
  {
    path: '/adminHome',
    component: adminHome,
    redirect:'/adminWelcome',
    children:[
      {path: '/checkRegister', component: checkRegister},
      {path: '/adminCompany', component: adminCompany},
      {path: '/adminInvestment', component: adminInvestment},
      {path: '/adminLoan', component: adminLoan},
      {path: '/adminMessage', component: message},
      {path: '/changePassword', component: changePassword},
      {path: '/adminWelcome', component: message},
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
