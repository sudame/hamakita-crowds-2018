<template lang="pug">
  div
    section.edit-info(is="sui-container")
      h3 運営委員会からのメッセージ編集
      textarea(:placeholder="infoPlaceHolder" v-model="infoText")
      sui-button(primary @click="editInfo()") 更新
    section(is="sui-container")
      h3 クラス展・部展情報編集
      sui-table(striped v-if="!isUnloaded")
        sui-table-header
          sui-table-row
            sui-table-header-cell(v-for="c in columns" :key="c.key") {{c.text}}
        sui-table-body
          sui-table-row(v-for="d in tableData" :key="d.id")
            sui-table-cell {{d.name}}
            sui-table-cell
                sui-input.edit(type="number" :placeholder="d.people" v-model="state[d.id].peopleVal" :disabled="state[d.id] ? !state[d.id].isEditing : false")
                | 組
            sui-table-cell
                sui-input.edit(type="number" :placeholder="d.waitPerGroup" v-model="state[d.id].wpgVal" :disabled="state[d.id] ? !state[d.id].isEditing : false")
                | 分/組
            sui-table-cell(text-align="center")
                sui-button(primary @click="edit(d.id)" v-if="state[d.id] ? !state[d.id].isEditing : false") 編集
                sui-button(color="red" @click="update(d.id)" v-else) 更新
      .loader-wrapper
        sui-loader.inline(:active="isUnloaded")
    section.update-message(v-show="messageIsVisible")
      sui-message.message(:color="updateSuccess ? 'green' : 'red'" size="big")
        sui-message-header {{updateSuccess ? '更新しました' : '更新に失敗しました'}}
        p {{updateSuccess ? 'データは正常に更新されました。' : '申し訳ありません。もう一度お試しください。'}}
</template>

<script>
import firebase from 'firebase';
import { mapGetters } from 'vuex';

const firestore = firebase.firestore();

export default {
  mounted() {
    firebase.auth();
    if (!this.userData.isLogined) {
      this.$router.push('/login/');
    } else if (this.userData.user.uid !== 'pRSUXgzCrAXD1yk8qJhC8n8ZWJQ2') {
      this.$router.push('/admin/');
    }
  },
  data() {
    return {
      messageIsVisible: false,
      updateSuccess: true,
      updateMessage: '',
      infoText: '',
      infoPlaceHolder: '',
      isUnloaded: true,
      columns: [
        {
          key: 'name',
          text: '団体名',
          value: 'name_yomi',
        },
        {
          key: 'people',
          text: '待ち組数',
          value: 'people',
        },
        {
          key: 'wait',
          text: '待ち時間',
          value: 'wait',
        },
        {
          key: 'action',
          text: null,
          value: 'action',
        },
      ],
      tableData: [],
      state: {},
      isEditRow: {},
    };
  },
  created() {
    firestore
      .collection('data')
      .orderBy('name_yomi')
      .get()
      .then(querySnapshot => {
        this.tableData = [];
        querySnapshot.forEach(doc => {
          const insertObj = Object.assign(doc.data(), { id: doc.id });
          this.tableData.push(insertObj);
          this.isEditRow[doc.id] = false;
        });
      })
      .then(() => {
        this.tableData.forEach(el => {
          this.$set(this.state, el.id, { isEditing: false, peopleVal: null, wpgVal: null });
        });
      })
      .then(() => {
        this.isUnloaded = false;
      });
    firestore
      .collection('messages')
      .doc('exec')
      .get()
      .then(querySnapshot => {
        this.infoPlaceHolder = querySnapshot.data().text;
      });
  },
  methods: {
    edit(id) {
      this.state[id].isEditing = true;
    },
    update(id) {
      const data = {};
      if (this.state[id].peopleVal != null) {
        data.people = this.state[id].peopleVal;
        data.timestamp = firebase.firestore.FieldValue.serverTimestamp();
      }
      if (this.state[id].wpgVal != null) data.waitPerGroup = this.state[id].wpgVal;
      firebase
        .firestore()
        .collection('data')
        .doc(id)
        .set(data, { merge: true })
        .then(() => {
          if (this.state[id].peopleVal != null) {
            this.tableData.find(el => el.id === id).people = this.state[id].peopleVal;
          }
          if (this.state[id].wpgVal != null) {
            this.tableData.find(el => el.id === id).waitPerGroup = this.state[id].wpgVal;
          }
          this.state[id].wpgVal = null;
          this.state[id].peopleVal = null;
          this.state[id].isEditing = false;
          this.updateSuccess = true;
          this.showMessage();
        })
        .catch(() => {
          this.updateSuccess = false;
          this.showMessage();
        });
    },
    editInfo() {
      firebase
        .firestore()
        .collection('messages')
        .doc('exec')
        .set({
          text: this.infoText,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          this.infoPlaceHolder = this.infoText;
          this.infoText = '';
          this.updateSuccess = true;
          this.showMessage();
        })
        .catch(() => {
          this.updateSuccess = false;
          this.showMessage();
        });
    },
    showMessage() {
      this.messageIsVisible = true;
      setTimeout(() => {
        this.messageIsVisible = false;
      }, 3000);
    },
  },
  computed: {
    ...mapGetters(['userData']),
  },
};
</script>

<style scoped lang="scss">
.edit-info {
  textarea {
    width: 100%;
    height: 10rem;
    padding: 0.5rem;
    white-space: pre-wrap;
  }
}
.edit {
  max-width: 5rem;
  margin: auto 0.5rem;
}

section {
  margin: 2rem auto;
}

.update-message {
  position: fixed;
  bottom: 0;
  right: 3rem;
}
</style>
