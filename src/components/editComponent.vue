<template >
  <div class="container m-5">
    <!-- <div v-if="isEdit"><h1>Editar curso</h1></div>
    <div v-else><h1>Crear curso</h1></div> -->
    <div><h1>Editar curso</h1></div>
    <form v-on:submit.prevent="uploadFile()">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          v-model="curso.nombre"
        />
      </div>
      <div class="form-group">
        <label for="descripcion">descripcion</label>
        <textarea
          type="text"
          class="form-control"
          id="descripcion"
          v-model="curso.descripcion"
        />
      </div>
      <div class="form-group">
        <label for="institucion">institucion</label>
        <input
          type="text"
          class="form-control"
          id="institucion"
          v-model="curso.institucion"
        />
      </div>
      <div class="form-group">
        <label for="duracion">Duracion</label>
        <input
          type="text"
          class="form-control"
          id="duracion"
          v-model="curso.duracion"
        />
      </div>
      <div class="form-group">
        <label for="keyword">Keyword</label>
        <input
          type="text"
          class="form-control"
          id="keyword"
          v-model="curso.keyword"
        />
      </div>
      <div class="form-group">
        <label for="image">Image</label>
        <input
          type="file"
          class="form-control"
          id="file"
          ref="file"
          name="file0"
          v-on:change="subir()"
        />
      </div>
      <div class="form-group">
        <label for="url">Url</label>
        <input type="text" class="form-control" id="url" v-model="curso.url" />
      </div>

      <button type="submit" class="btn btn-primary btn-sm">Guardar</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import S3 from "aws-s3";
const axios = require("axios");
import Curso from "@/model/cursos";
import Global from "@/global.js";
export default {
  name: "editComponent",
  data() {
    return {
      submitted: false,
      file: "",
      curso: new Curso("", "", "", "", "", "", ""),
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    axios
      .get(Global.url + "curso/" + this.id)
      .then((res) => {
        this.curso = res.data.curso;
      })
      .catch((error) => {
        console.error("ocurrio un error!", error);
      });
  },
  created() {
    this.ruta();
    this.obtenerToken();
  },
  methods: {
    ...mapActions(["ruta", "obtenerToken"]),

    subir() {
      this.file = this.$refs.file.files[0];
    },

    uploadFile() {
      if (this.file) {
        const config = {
          bucketName: "",
          dirName: "img" ,
          region: "us-east-2",
          accessKeyId: "",
          secretAccessKey: "",
        };

        const S3Client = new S3(config);

        const newFileName = "image-" + Date.now();

        S3Client.uploadFile(this.file, newFileName)
          .then((data) => {
            let path_splitted = data.key.split(".");
            let extension = path_splitted.pop();

            this.curso.image = newFileName + "." + extension;
     

            this.save();
          })
          .catch((err) => console.error(err));
      } else {
        this.save();
      }
    },
    save() {
      axios
        .put(Global.url + "update/" + this.curso._id, this.curso)
        .then(() => {
          this.$router.push("/admin");
         
        })
        .catch((error) => {
          console.error("ocurrio un error!", error);
        });
    },

  },
};
</script>