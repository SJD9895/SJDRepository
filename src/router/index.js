import Vue from 'vue';
import Router from 'vue-router';
// eslint-disable-next-line no-unused-vars
import HelloWorld from '@/components/HelloWorld';
// eslint-disable-next-line no-unused-vars
import HelloAac from '../components/HelloAac';
// eslint-disable-next-line no-unused-vars
import Login from '../components/login/Login';
// eslint-disable-next-line no-unused-vars
import Home from '../components/home/vue/Home';
// eslint-disable-next-line camelcase,no-unused-vars
import home_index from '../components/home_index/vue/home_index';
// eslint-disable-next-line no-unused-vars,import/extensions
import HelloAac2 from '../components/HelloAac2.vue';
// eslint-disable-next-line no-unused-vars,import/extensions
import addfang from '../components/fang/addfang/vue/addfang.vue';
// eslint-disable-next-line import/extensions,no-unused-vars
import fanglist from '../components/fang/fanglist/vue/fanglist.vue';
// eslint-disable-next-line import/extensions,no-unused-vars
import addbook from '../components/book/addbook/vue/addbook';
// eslint-disable-next-line import/extensions,no-unused-vars
import booklist from '../components/book/booklist/vue/booklist.vue';
// eslint-disable-next-line import/extensions,no-unused-vars
import addhouse from '../components/house/addhouse/vue/addhouse.vue';
// eslint-disable-next-line import/extensions,no-unused-vars
import houselist from '../components/house/houselist/vue/houselist.vue';

// eslint-disable-next-line no-unused-vars,import/extensions
import doctorlist from '../components/medical/doctor/doctorlist/vue/doctorlist.vue';

// eslint-disable-next-line no-unused-vars,import/extensions
import patientlist from '../components/medical/patient/patientlist/vue/patientlist.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/home_index',
      name: 'home_index',
      component: home_index,
      children: [
        /* {
          path: 'home_index',
          name: 'home_index',
          component: home_index,
        }, */
        {
          path: 'HelloAac',
          name: 'HelloAac',
          component: HelloAac,
        },
        {
          path: 'HelloAac2',
          name: 'HelloAac2',
          component: HelloAac2,
        },
        {
          path: 'addfang',
          name: 'addfang',
          component: addfang,
        },
        {
          path: 'fanglist',
          name: 'fanglist',
          component: fanglist,
        },
        {
          path: 'addbook',
          name: 'addbook',
          component: addbook,
        },
        {
          path: 'booklist',
          name: 'booklist',
          component: booklist,
        },
        {
          path: 'addhouse',
          name: 'addhouse',
          component: addhouse,
        },
        {
          path: 'houselist',
          name: 'houselist',
          component: houselist,
        },
        // doctorlist
        {
          path: 'doctorlist',
          name: 'doctorlist',
          component: doctorlist,
        },
        // patientlist
        {
          path: 'patientlist',
          name: 'patientlist',
          component: patientlist,
        },
      ],
    },

  ],
});

