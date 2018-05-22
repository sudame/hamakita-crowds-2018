<template lang="pug">
  div
    div(is="sui-container")
      sui-dropdown(button class="primary" v-model="sortKey" :options="columns")
      sui-dropdown(button class="primary" v-model="sortAbs" :options="sortAbsOptions")
      sui-input(v-model="filterWord" @input="tableFilter()" icon="search" placeholder="検索")
    sui-divider(hidden)
    div(is="sui-container")
      sui-table(striped)
        sui-table-header
          sui-table-row
            sui-table-header-cell(v-for="c in columns" :key="c.key") {{c.text}}
        sui-table-body
          sui-table-row(v-for="d in tableData" :key="d.id")
            sui-table-cell {{d.name}}
            sui-table-cell
                sui-input.edit(:value="d.people" disabled) {{d.people}}
                | 組
            sui-table-cell
                sui-input.edit(:value="d.waitPerGroup" disabled)
                | 分/組
            sui-table-cell(text-align="center")
                sui-button(primary @click="edit(d.id)") 編集
      .loader-wrapper
        sui-loader.inline(:active="isUnloaded")
</template>

<script>
import firebase from 'firebase';
import { mapGetters } from 'vuex';

const firestore = firebase.firestore();

export default {
  mounted() {
    if (!this.userData.isLogined) {
      this.$router.push('/login/');
    } else if (this.userData.user.uid !== 'pRSUXgzCrAXD1yk8qJhC8n8ZWJQ2') {
      this.$router.push('/admin/');
    }
  },
  data() {
    return {
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
          key: 'action',
          text: null,
          value: 'action',
        },
      ],
      tableData: [],
      rawTableData: [],
      nowtime: Date.now(),
      isEditRow: {},
    };
  },
  created() {
    firestore
      .collection('data')
      .get()
      .then(querySnapshot => {
        this.tableData = [];
        this.rawTableData = [];
        querySnapshot.forEach(doc => {
          const insertObj = Object.assign(doc.data(), { id: doc.id });
          this.rawTableData.push(insertObj);
          this.isEditRow[doc.id] = false;
        });
        this.tableData = this.rawTableData.slice();
        this.isUnloaded = false;
        this.tableFilter();
        this.tableSort();
      });
    window.setInterval(() => {
      this.nowtime = Date.now();
    }, 30000);
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
    edit(id) {
      console.log(id);
      console.log(this.isEditRow.id);
    },
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
      return (a, b) => {
        if (a[key] > b[key]) return this.sortAbs;
        else if (a[key] < b[key]) return this.sortAbs * -1;
        return 0;
      };
    },
  },
  computed: {
    ...mapGetters(['userData']),
  },
};
</script>

<style scoped>
.edit {
  max-width: 5rem;
  margin: auto 0.5rem;
}
</style>
