<template>
  <div class="login">
    <!-- Button to Open the Modal -->
    <div class="row mb-12">
      <div class="col-md-12 text-capitalize text-center">
        <h1>Login page</h1>
      </div>
    </div>
    <div
      class="col-md-12 d-flex align-items-center justify-content-center"
    >
      <form
        method="post"
        class="needs-validation"
        id="user_form"
        @submit.prevent="checklogin"
        novalidate
      >
        <div class="row">
          <div class="col-md-12 mb-3">
            <label class="mb-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              class="form-control"
              required
              placeholder="Enter email"
              v-model="email"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mb-3">
            <label class="mb-2">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              class="form-control"
              required
              placeholder="Enter password"
              v-model="password"
            />
          </div>
        </div>

        <div class="modal-footer">
          <button type="submit" class="btn btn-success" id="Category_form_btn">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import http_res from "../http_res.js";
export default {
  name: "LoginView",
  components: {},

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    checklogin() {
      http_res
        .post("/user/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          if (response.data.status == true) {
            const user={
              user : response.data.user,
              token: response.data.token
            }
            localStorage.setItem("user",JSON.stringify(user));
            this.$router.push("/");
          } else {
            if (response.data.message) {
              this.$swal.fire("error!", response.data.message, "error");
            }
          }
        });
    },
  },
};
</script>

<style>
</style>