<template lang="pug">
  div
    sui-menu(fixed)
      sui-menu-menu(position="left")
        sui-menu-item
          | はまきたクラウズ
      sui-menu-menu(position="right")
        sui-dropdown(item icon="bars" fluid)
          sui-dropdown-menu
            sui-dropdown-item(link)
              a(href="/#/", title="title") TOP
            sui-dropdown-item(link)
              a(href="/#/about", title="title") ABOUT
            sui-dropdown-item(link)
              a(href="/#/admin", title="title") ADMIN

</template>

<script>
export default {};
</script>

<style>

</style>
