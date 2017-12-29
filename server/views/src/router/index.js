import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import ErrorPage from '@/components/ErrorPage'
import IndexPage from '@/components/IndexPage'
import Total from '@/components/Total'
import Query from "@/components/Query";
import Manager from "@/components/Manager";
import Register from "@/components/Register";
import Mute from "@/components/Mute";
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path:'/',
      redirect:'login'
    },{
      path:'',
      redirect:'login'
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/error',
      name:'error',
      component: ErrorPage
    },
    {
      path:'/index',
      name:'index',
      component: IndexPage,
      children:[
        {
          path:'total',
          component:Total
        },
        {
          path:'query',
          component:Query
        },
        {
          path:'manager',
          component:Manager
        },
        {
          path:'mute',
          component:Mute
        }
      ]
    }

  ]
});
router.beforeEach(({name},from,next)=>{
  let username =sessionStorage.getItem("username");
  let roles =sessionStorage.getItem("roles");
  if(!username){
    if(name==='Login'||name==='Register'){
      next();
    }else{
      next('/login');
    }
  }else{
    next();
  }
})
export default router;