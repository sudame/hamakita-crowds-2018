<template lang="pug">
  #app
    header-view
    router-view
</template>

<script>
import Header from '@/components/Header';

export default {
  components: { 'header-view': Header },
  name: 'App',
};
</script>

<style lang="scss">

</style>
