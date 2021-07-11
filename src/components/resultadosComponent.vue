<template >
  <div class="container">
    <div class="row justify-content-center mb-3">
      <div class="col col-lg-6 mt-3">
        <h2>Results</h2>

        <div v-for="item in cursos" :key="item._id">
          <div class="card" style="min-height: 250px">
            <div class="card-body">
              <h5 class="card-title">{{ item.nombre }}</h5>
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
                :to="{ name: 'detalle', params: { id: item._id } }"
                class="btn btn-primary btn-sm"
                >details
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import Global from "@/global.js";
export default {
  name: "resultadosComponent",
  data() {
    return {
      id: "",
      cursos: [],
      urlimage: Global.url2,
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    axios
      .get(Global.url + "searchkw/" + this.id)
      .then((response) => {
        response.data.cursos.forEach((a) => {
          this.cursos.push(a);
        });
      })
      .catch((error) => {
        console.error("ocurrio un error!", error);
      });
  },
};
</script>