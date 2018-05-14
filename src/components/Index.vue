<template lang="pug">
  div(is="sui-container")
    sui-table(striped unstackable)
      sui-table-header
        sui-table-row
          sui-table-header-cell(v-for="c in columns" :key="c.key") {{c.name}}
      sui-table-body
        sui-table-row(v-for="d in data" :key="d.id")
          sui-table-cell(v-for="c in columns" :key="c.key") {{d[c.key]}}
            template(v-if="c.key == 'people'") 人
            template(v-if="c.key == 'wait'") 分
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseKey from '../../firebase.key';

// eslint-disable-next-line
const firebaseApp = firebase.initializeApp(firebaseKey);
const firestore = firebase.firestore();
const firestoreSetting = {
  timestampsInSnapshots: true,
};
firestore.settings(firestoreSetting);

export default {
  firestore: {
    data: db.collection('data'),
  },
  data() {
    return {
      columns: [
        {
          key: 'name',
          name: '団体名',
          value: 'name_yomi',
        },
        {
          key: 'people',
          name: '待ち人数',
          value: 'people',
        },
        {
          key: 'wait',
          name: '待ち時間',
          value: 'wait',
        },
      ],
      data: [],
    };
  },
};
</script>

<style lang="scss">

</style>
