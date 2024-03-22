<template>
  
 <div>
  <navbar />

  <div class="container">
   
    <br />
    <div class="row mb-12">
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#myModal"
        ref="openM"
      >
        {{ $t("Add category") }}
      </button>
    </div>
    <br />
   
    <!-- The Modal -->
    <div class="modal" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">{{ $t("Category") }}</h4>
            <button
              type="button"
              class="close"
              ref="Close"
              data-dismiss="modal"
            >
              &times;
            </button>
          </div>
          <form @submit.prevent="saveCategory">
            <!-- Modal body -->
            <div class="modal-body">
              <input type="hidden" v-model="id" />
              <input type="text" class="form-control" required v-model="name" />
              <small class="text-danger" v-if="!name"><i>{{ $t("The name is required") }}</i></small>
            </div>
            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="submit" class="btn btn-success">
                {{ $t("Save") }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <table class="table" id="myTable">
      <tr>
        <th>{{ $t("ID") }}</th>
        <th>{{ $t("Name") }}</th>
        <th>{{ $t("Action") }}</th>
      </tr>
      <tr v-for="post in posts" :key="post.id">
        <td>{{ post.id }}</td>
        <td>{{ post.name }}</td>
        <td>
          <button
            class="btn btn-success btn-sm font-base m-1"
            type="button"
            @click="cateEdit(post.id)"
          >
            <i class="fa fa-edit"></i>
          </button>
          <button
            class="btn btn-danger btn-sm font-base m-1"
            type="button"
            @click="cateDelete(post.id)"
          >
            <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    </table>
  </div>
</div>
</template>

<script>
import http_res from "../http_res.js";
import navbar from '../components/navbar.vue'

export default {
  name: "CategoryView",
  components: {navbar},
 
  data() {
    return {
      posts: [],
      name: "",
      id: "",
      user:JSON.parse( localStorage.getItem("user"))
    };
  },
mounted() {
  this.getAllCat();
},
  methods: {
    getAllCat() {
      http_res.get("/categories/list/").then((response) => {
        this.posts = response.data.data;
        //console.log(response);
      });
    },

    cateDelete(id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You will not be able to recover this item!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, keep it",
        })
        .then((result) => {
          if (result.isConfirmed) {
            http_res.get("/categories/delete/" + id).then((response) => {
              this.getAllCat();
            });
            this.$swal.fire(
              "Deleted!",
              "Your item has been deleted.",
              "success"
            );
          }
        });
    },
    saveCategory() {
      // this.name = this.$refs.name.value;
      //this.id=  this.$refs.id.value ;
      http_res
        .post("/categories/save/" + this.id, {
          name: this.name,
        })
        .then((response) => {
          this.$swal.fire("Good job!", response.data.message, "success");
          this.name = "";
          this.id = "";
          this.$refs.Close.click();

          this.getAllCat();
        });

      console.log(this.name);
    },
    cateEdit(id) {
      http_res.get("/categories/find/" + id).then((response) => {
        this.name = response.data.data.name;
        this.id = response.data.data.id;
        this.$refs.openM.click();
      });
    },
  },
};
</script>

<style></style>