import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Login from '@/components/Login';
import Admin from '@/components/Admin';
import SuperAdmin from '@/components/SuperAdmin';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/login/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin/',
      name: 'Admin',
      component: Admin,
    },
    {
      path: '/super-admin/',
      name: 'SuperAdmin',
      component: SuperAdmin,
    },
  ],
});
