<template lang="pug">
  div(is="sui-container" v-if="this.userData.isLogined")
    p {{userName}}としてログイン中
    sui-form
      sui-form-field
        label 現在の待ち組数
        sui-input(:placeholder="peoplePlaceholder", icon="email" v-model="newPeople" type="number")
      sui-form-field
        label 1組あたりの所要時間
        sui-input(placeholder="1組あたりの所要時間" disabled :value="wait")
        p 変更は運営委員会に申請してください
      sui-form-field
        sui-button(primary @click="update()") 更新
        sui-button(color="red" @click="LOGOUT()") ログアウト
    sui-message(v-if="updateSuccess" success)
      p 正常に更新しました
    sui-message(v-if="updateFailure" error)
      p 更新に失敗しました

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { LOGIN, LOGOUT } from '@/vuex/mutation-types';
import firebase from 'firebase';

export default {
  mounted() {
    firebase.auth();    
    if (!this.userData.isLogined) {
      this.$router.push('/login/');
    } else if (this.userData.user.uid === 'pRSUXgzCrAXD1yk8qJhC8n8ZWJQ2') {
      this.$router.push('/super-admin/');
    }
  },
  created() {
    if (this.userData.isLogined) {
      firebase
        .firestore()
        .collection('data')
        .doc(this.userData.user.uid)
        .onSnapshot(snapshot => {
          this.wait = snapshot.data().waitPerGroup;
          this.peoplePlaceholder = snapshot.data().people;
          this.userName = snapshot.data().name;
        });
    }
  },
  data() {
    return {
      updateSuccess: false,
      updateFailure: false,
      peoplePlaceholder: null,
      newPeople: null,
      wait: 0,
      userName: '',
    };
  },
  watch: {
    userData() {
      if (!this.userData.isLogined) this.$router.push('/login/');
    },
  },
  methods: {
    ...mapActions([LOGIN, LOGOUT]),
    showMessage(flag) {
      // eslint-disable-next-line
      flag === 's' ? (this.updateSuccess = true) : (this.updateFailure = true);
      setTimeout(() => {
        // eslint-disable-next-line
        flag === 's' ? (this.updateSuccess = false) : (this.updateFailure = false);
      }, 3000);
    },
    update() {
      if (this.newPeople === null) {
        this.showMessage('f');
        return;
      }
      firebase
        .firestore()
        .collection('data')
        .doc(this.userData.user.uid)
        .set(
          {
            people: this.newPeople,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true },
        )
        .then(() => {
          this.showMessage('s');
          this.newPeople = null;
        })
        .catch(() => {
          this.showMessage('f');
        });
    },
  },
  computed: {
    ...mapGetters(['userData']),
  },
};
</script>

<style scoped lang="scss">
</style>
