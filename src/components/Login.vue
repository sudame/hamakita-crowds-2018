<template lang="pug">
  div(is="sui-container")
    sui-form
      sui-form-field
        label メールアドレス
        //- sui-input(placeholder="メールアドレス", icon="email" v-model="email")
        sui-dropdown(:options="loginList" placeholder="団体名" v-model="email")
      sui-form-field
        label パスワード
        sui-input(placeholder="パスワード", icon="email" type="password" v-model="password")
      sui-form-field
        sui-button(primary @click="LOGIN({email: email, password: password})") ログイン
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
      email: '',
      password: '',
      user: 0,
      loginList: [
        {
          text: '10HR',
          value: 'hamakita.crowds+10hr@gmail.com',
        },
      ],
    };
  },
  watch: {
    userData() {
      if (this.userData.isLogined) this.$router.push('/admin/');
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
