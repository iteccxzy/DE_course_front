<template >
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-4 m-1"><h2>Course list</h2></div>
    </div>

    <div class="row justify-content-center">
      <div v-for="item in cursos" :key="item._id">
        <div class="col">
          <div class="card mx-auto m-3" style="width: 18rem; min-height: 240px">
            <div class="card-body">
              <h5 class="card-title">{{ item.nombre.slice(0, 20) }}...</h5>
              <img
                :src="urlimage + item.image"
                alt="..."
                class="img-thumbnail"
                style="max-height: 100px"
              />

              <p class="card-text">
                {{ item.institucion }}
              </p>
              <router-link
                :to="{ name: 'edit', params: { id: item._id } }"
                class="btn btn-primary btn-sm mr-1"
                >edit
              </router-link>
              <a
                class="btn btn-secondary btn-sm"
                href="#"
                target="_blank"
                v-on:click.prevent="eliminar(item._id)"
                >delete</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import { mapActions } from "vuex";
import Global from "@/global.js";
export default {
  name: "adminComponent",
  data() {
    return {
      cursos: [],
      urlimage: Global.url2,
    };
  },
  created() {
    this.obtenerToken();
    this.ruta();
  },

  methods: {
    ...mapActions(["ruta", "obtenerToken"]),
    // mover a vuex
    eliminar(_id) {
      axios
        .delete(Global.url + "delete/" + _id)
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {

          console.error("ocurrio un error!", error);
        });
    },
  },
  mounted() {
    axios.get(Global.url + "cursos/").then((res) => {
      res.data.cursos.forEach((element) => {
        this.cursos.push(element);
      });
    });
  },
};
</script>
