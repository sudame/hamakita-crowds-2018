<template lang="pug">
  div(is="sui-container")
    sui-form
      sui-form-field
        label メールアドレス
        //- sui-input(placeholder="メールアドレス", icon="email" v-model="email")
        sui-dropdown(selection search placeholder="団体名" v-model="email" :options="loginList")
      sui-form-field
        label パスワード
        sui-input(placeholder="パスワード", icon="email" type="password" v-model="password")
      sui-form-field
        sui-button(primasearchry @click="LOGIN({email: email, password: password})") ログイン
        sui-button(primary @click="LOGOUT()") ログアウト
    h2(v-if="userData.isLogined") {{ userData.user.email }}
</template>

<script>
// eslint-disable-next-line
import firebase from 'firebase';
import { mapActions, mapGetters } from 'vuex';
import { LOGIN, LOGOUT } from '@/vuex/mutation-types';

export default {
  created() {
    if (this.userData.isLogined) {
      this.$router.push('/admin/');
    }
  },
  data() {
    return {
      email: null,
      password: '',
      user: 0,
      loginList: [
        {
          text: '10HR',
          value: 'hamakita.crowds+10hr@gmail.com',
        },
        {
          text: '11HR',
          value: 'hamakita.crowds+11hr@gmail.com',
        },
        {
          text: '12HR',
          value: 'hamakita.crowds+12hr@gmail.com',
        },
        {
          text: '13HR',
          value: 'hamakita.crowds+13hr@gmail.com',
        },
        {
          text: '14HR',
          value: 'hamakita.crowds+14hr@gmail.com',
        },
        {
          text: '15HR',
          value: 'hamakita.crowds+15hr@gmail.com',
        },
        {
          text: '16HR',
          value: 'hamakita.crowds+16hr@gmail.com',
        },
        {
          text: '17HR',
          value: 'hamakita.crowds+17hr@gmail.com',
        },
        {
          text: '18HR',
          value: 'hamakita.crowds+18hr@gmail.com',
        },
        {
          text: '19HR',
          value: 'hamakita.crowds+19hr@gmail.com',
        },
        {
          text: '20HR',
          value: 'hamakita.crowds+20hr@gmail.com',
        },
        {
          text: '21HR',
          value: 'hamakita.crowds+21hr@gmail.com',
        },
        {
          text: '22HR',
          value: 'hamakita.crowds+22hr@gmail.com',
        },
        {
          text: '23HR',
          value: 'hamakita.crowds+23hr@gmail.com',
        },
        {
          text: '24HR',
          value: 'hamakita.crowds+24hr@gmail.com',
        },
        {
          text: '25HR',
          value: 'hamakita.crowds+25hr@gmail.com',
        },
        {
          text: '26HR',
          value: 'hamakita.crowds+26hr@gmail.com',
        },
        {
          text: '27HR',
          value: 'hamakita.crowds+27hr@gmail.com',
        },
        {
          text: '28HR',
          value: 'hamakita.crowds+28hr@gmail.com',
        },
        {
          text: '29HR',
          value: 'hamakita.crowds+29hr@gmail.com',
        },
        {
          text: '30HR',
          value: 'hamakita.crowds+30hr@gmail.com',
        },
        {
          text: '31HR',
          value: 'hamakita.crowds+31hr@gmail.com',
        },
        {
          text: '32HR',
          value: 'hamakita.crowds+32hr@gmail.com',
        },
        {
          text: '33HR',
          value: 'hamakita.crowds+33hr@gmail.com',
        },
        {
          text: '34HR',
          value: 'hamakita.crowds+34hr@gmail.com',
        },
        {
          text: '35HR',
          value: 'hamakita.crowds+35hr@gmail.com',
        },
        {
          text: '36HR',
          value: 'hamakita.crowds+36hr@gmail.com',
        },
        {
          text: '37HR',
          value: 'hamakita.crowds+37hr@gmail.com',
        },
        {
          text: '38HR',
          value: 'hamakita.crowds+38hr@gmail.com',
        },
        {
          text: '39HR',
          value: 'hamakita.crowds+39hr@gmail.com',
        },
        {
          text: 'admin',
          value: 'hamakita.crowds+admin@gmail.com',
        },
      ],
    };
  },
  watch: {
    userData() {
      if (this.userData.isLogined) {
        if (this.userData.user.uid === 'pRSUXgzCrAXD1yk8qJhC8n8ZWJQ2') {
          this.$router.push('/super-admin/');
        } else {
          this.$router.push('/admin/');
        }
      }
    },
  },
  methods: {
    ...mapActions([LOGIN, LOGOUT]),
  },
  computed: {
    ...mapGetters(['userData']),
  },
};
</script>

<style scoped lang="scss">
</style>
