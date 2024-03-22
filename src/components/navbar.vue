<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/">{{ $t("Navbar") }}</router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link" to="/">
            {{ $t("Home") }}
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/category"
            >{{ $t("Category") }}
          </router-link>
        </li>
      </ul>
      <div v-if="user">
        {{ user.user.email }}
      </div>

      <div class="form-inline my-2 my-lg-0">
        <router-link to="/login"
          ><button class="btn btn-outline-success m-2 my-sm-0">
            {{ $t("Login") }}
          </button></router-link
        >

        <button class="btn btn-outline-success m-2 my-sm-0" @click="logout">
          <i class="fa fa-sign-out"></i> {{ $t("Logout") }}
        </button>
        <select
          v-model="$i18n.locale"
          class="btn btn-outline-default m-2 my-sm-0"
          @change="changeLg($i18n.locale)"
        >
          <option
            v-for="locale in $i18n.availableLocales"
            :key="`locale-${locale}`"
            :value="locale"
          >
            {{ locale }}
          </option>
        </select>
      </div>
    </div>
  </nav>
</template>
  <script>
import http_res from "../http_res.js";
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  
  watch: {
  user(newValue, oldValue) {
    // Perform actions when user data changes
    if (newValue) {
      console.log('User is logged in:', newValue.user.email);
      // Perform additional actions for authenticated users
    } else {
      console.log('User is logged out');
      // Perform additional actions for logged out users
    }
  }
},

  methods: {
    changeLg(locale) {
      localStorage.setItem("locale", locale);
      
    },
    logout() {
      http_res
        .get("/user/logout/")
        .then((response) => {
          console.log(response);
          localStorage.removeItem("user");
          this.user = null;
          this.$router.push("/login");
        })
        .catch((error) => {
          localStorage.removeItem("user");
          this.$router.push("/login");
        });
    },
  },
};
</script>
  <style>
</style>
  