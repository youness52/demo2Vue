<template>
  <div class="home">
    <navbar />
    <h1>This is the home page</h1>
      <div v-if="user">
        {{ user.user.email }}
      </div>
   
  </div>
</template>

<script>
// @ is an alias to /src

import navbar from '../components/navbar.vue'
export default {
  name: 'HomeView',
  components: {navbar},
  data() {
    return {
      user:JSON.parse(localStorage.getItem("user"))
    }
  },
}
</script>
