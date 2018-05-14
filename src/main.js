// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import SuiVue from 'semantic-ui-vue';
import firebase from 'firebase';
import VueFire from 'vuefire';
import App from './App';
import router from './router';
import firebaseKey from '../firebase.key'

Vue.config.productionTip = false;

Vue.use(SuiVue);
Vue.use(Vuefire);

const firebaseApp = firebase.initializeApp(firebaseKey);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
