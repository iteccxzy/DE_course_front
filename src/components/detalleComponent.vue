<template >
  <div class="container">
    <div class="row justify-content-center">
      <div class="col col-lg-8 mt-3">
        <div v-if="curso">
          <div class="card" style="min-height: 250px">
            <div class="card-header">
           Institution: {{ curso.institucion }}
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ curso.nombre }}</h5>
              <img
                style="max-height: 100px"
                :src="urlimage + curso.image"
                alt="..."
                class="img-thumbnail"
              />
              <p class="card-text">{{ curso.descripcion }}</p>
              <p class="card-text">Duracion: {{ curso.duracion }}</p>

              <a class="btn btn-primary btn-sm mr-2" :href="addhttp" target="_blank"
                >see the course</a
              >
              <router-link class="btn btn-secondary btn-sm" :to="{ name: 'home' }"
                >home</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Global from "@/global.js";
const axios = require("axios");
export default {
  name: "detalle",
  data() {
    return {
      id: null,
      curso: null,
      urlimage: Global.url2,
    };
  },
  methods: {},
  mounted() {
    this.id = this.$route.params.id;
    axios
      .get(Global.url + "curso/" + this.id)
      .then((response) => {
        this.curso = response.data.curso;
      })
      .catch((error) => {
        // this.errorMessage = error.message;
        console.error("ocurrio un error!", error);
      });
  },
  computed: {
    addhttp() {
      return "http://" + this.curso.url;
    },
  },
};
</script>