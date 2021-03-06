<template lang="pug">
  div
    section.info(is="sui-container")
      sui-message(color="teal")
        sui-message-header
          sui-icon(name="info circle icon")
          | 運営委員会からのお知らせ
        p {{infoText.length > 0 ? infoText : '現在お知らせはありません'}}
    section.sort-tools(is="sui-container")
      sui-dropdown.sort-tool(button class="primary" v-model="sortKey" :options="columns")
      sui-dropdown.sort-tool(button class="primary" v-model="sortAbs" :options="sortAbsOptions")
      sui-input.sort-tool(v-model="filterWord" @input="tableFilter()" icon="search" placeholder="検索")
    section.maintable(is="sui-container")
      sui-table(striped unstackable)
        sui-table-header
          sui-table-row
            sui-table-header-cell(v-for="c in columns" :key="c.key") {{c.text}}
        sui-table-body
          sui-table-row(v-for="d in tableData" :key="d.id")
            sui-table-cell {{d.name}}
            sui-table-cell {{d.people}} 組
            sui-table-cell {{d.people * d.waitPerGroup}} 分
            sui-table-cell {{Math.round((nowtime - d.timestamp.toDate())/60000)}} 分前
      .loader-wrapper
        sui-loader.inline(:active="isUnloaded")
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
  data() {
    return {
      infoText: '',
      isUnloaded: true,
      sortAbs: 1,
      sortAbsOptions: [
        {
          text: '昇順',
          value: 1,
        },
        {
          text: '降順',
          value: -1,
        },
      ],
      filterWord: '',
      sortKey: 'name_yomi',
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
          key: 'timestamp',
          text: '最終更新',
          value: 'timestamp',
        },
      ],
      tableData: [],
      rawTableData: [],
      nowtime: Date.now(),
    };
  },
  created() {
    firestore.collection('data').onSnapshot(querySnapshot => {
      this.tableData = [];
      this.rawTableData = [];
      querySnapshot.forEach(doc => {
        this.rawTableData.push(doc.data());
      });
      this.tableData = this.rawTableData.slice();
      this.isUnloaded = false;
      this.tableFilter();
      this.tableSort();
    });
    window.setInterval(() => {
      this.nowtime = Date.now();
    }, 30000);
    firestore
      .collection('messages')
      .doc('exec')
      .onSnapshot(querySnapshot => {
        this.infoText = querySnapshot.data().text;
      });
  },
  watch: {
    sortKey() {
      this.tableSort();
    },
    sortAbs() {
      this.tableSort();
    },
  },
  methods: {
    tableFilter() {
      this.tableData = this.rawTableData.filter(el => {
        let isMatch = false;
        Object.keys(el).forEach(key => {
          if (el[key].toString().indexOf(this.filterWord) >= 0) isMatch = true;
        });
        return isMatch;
      });
    },
    tableSort() {
      this.tableData.sort(this.sortAlg(this.sortKey));
    },
    sortAlg(key) {
      if (key === 'name_yomi') {
        return (a, b) => {
          if (a[key] > b[key]) return this.sortAbs;
          else if (a[key] < b[key]) return this.sortAbs * -1;
          return 0;
        };
      } else if (key === 'wait') {
        return (a, b) => {
          if (Number(a.waitPerGroup) * Number(a.people) > Number(b.waitPerGroup) * Number(b.people)) return this.sortAbs;
          else if (Number(a.waitPerGroup) * Number(a.people) < Number(b.waitPerGroup) * Number(b.people)) return this.sortAbs * -1;
          return 0;
        };
      } else if (key === 'timestamp') {
        return (a, b) => {
          if (Math.round((this.nowtime - a.timestamp.toDate()) / 60000) > Math.round((this.nowtime - b.timestamp.toDate()) / 60000)) return this.sortAbs;
          else if (Math.round((this.nowtime - a.timestamp.toDate()) / 60000) < Math.round((this.nowtime - b.timestamp.toDate()) / 60000)) return this.sortAbs * -1;
          return 0;
        };
      }
      return (a, b) => {
        if (Number(a[key]) > Number(b[key])) return this.sortAbs;
        else if (Number(a[key]) < Number(b[key])) return this.sortAbs * -1;
        return 0;
      };
    },
  },
};
</script>

<style lang="scss">
.loader-wrapper {
  text-align: center;
}

section.info {
  margin-bottom: 1.5rem;
  p {
    white-space: pre-wrap;
  }
}

.sort-tools {
  text-align: center;
}

.sort-tool {
  margin: 0.5rem auto;
}
</style>
