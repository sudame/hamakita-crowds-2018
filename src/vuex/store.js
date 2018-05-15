import Vuex from 'vuex';
import Vue from 'vue';
import firebase from 'firebase';
import {
  LOGIN,
  LOGOUT,
} from './mutation-types';

Vue.use(Vuex);

const state = {
  userData: {},
};
const actions = {
  [LOGOUT]({
    commit
  }) {
    firebase.auth().signOut();
    commit(LOGOUT);
  },
  [LOGIN]({
    commit,
  }, {
    email,
    password
  }) {
    console.log(`${email} : ${password}`);
    firebase.auth().signInWithEmailAndPassword(email, password).then(d => {
      commit(LOGIN, d);
    });
  },
};
const getters = {
  // eslint-disable-next-line
  userData: state => state.userData,
};
const mutations = {
  // eslint-disable-next-line
  [LOGIN](state, userData) {
    state.userData = userData;
  },
  [LOGOUT](state){
      state.userData = {};
  }
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
