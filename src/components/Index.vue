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
export default {
  data() {
    return {
      columns: [
        {
          key: 'id',
          name: 'ID',
          value: 'id',
        },
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
      data: [
        {
          id: 0,
          name: '10HR',
          people: '32',
          wait: '14',
        },
        {
          id: 1,
          name: '11HR',
          people: '53',
          wait: '87',
        },
        {
          id: 2,
          name: '12HR',
          people: '37',
          wait: '34',
        },
      ],
    };
  },
};
</script>

<style lang="scss">

</style>
