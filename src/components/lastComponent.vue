<template>
  <div class="container m-3">
    <div class="row">
      <div class="col-12">
        <div class="mx-auto" style="width: 250px">
          <h2  style="color: #425855">Last courses</h2>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" style="min-height: 330px">
      <div v-for="item in cursos" :key="item._id">
        <div class="col">
          <div class="card m-3" style="width: 18rem; min-height: 240px">
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
import Global from "@/global.js";
const axios = require("axios");
export default {
  name: "lastComponent",
  data() {
    return {
      cursos: [],
      urlimage: Global.url2,
    };
  },
  mounted() {
    axios
      .get(Global.url + "cursos/" + "true")
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