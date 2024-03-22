<template>
  <div id="" :dir="$i18n.locale == 'AR' ? 'rtl' : 'ltr'">
    <router-view />
  </div>
</template>
<script>

import navbar from './components/navbar.vue'

export default {
  components: { navbar },
  
}
</script>
<style>
</style>
