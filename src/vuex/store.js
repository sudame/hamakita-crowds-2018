import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';
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
    commit,
  }) {
    firebase.auth().signOut();
    commit(LOGOUT);
  },
  [LOGIN]({
    commit,
  }, {
    email,
    password,
  }) {
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
    state.userData.isLogined = true;
  },
  // eslint-disable-next-line
  [LOGOUT](state) {
    state.userData = {};
    state.userData.isLogined = false;
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [
    createPersistedState({
      getState: key => Cookies.getJSON(key),
      // eslint-disable-next-line
      setState: (key, state) => Cookies.set(key, state, {
        expires: 7,
        secrure: true,
      }),
    }),
  ],
});
