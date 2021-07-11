<template>
  <div class="container">
    <div class="rol justify-content-center mb-2">
      <div class="col-8">

        <div><h1>Crear curso</h1></div>

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
            <input
              type="text"
              class="form-control"
              id="url"
              v-model="curso.url"
            />
          </div>

          <button type="submit" class="btn btn-primary btn-sm">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import S3 from "aws-s3";
const axios = require("axios");
import Curso from "@/model/cursos";
import Global from "@/global.js";
import { mapActions } from "vuex";
export default {
  name: "createComponent",
  data() {
    return {
      submitted: false,
      file: "",
      curso: new Curso("", "", "", "", "", "", ""),
      // isEdit: false,
      url: "",
    };
  },

  created() {
    this.ruta();
    this.obtenerToken();
  },
  methods: {
    ...mapActions(["ruta", "obtenerToken"]),

    subir() {
      this.file = this.$refs.file.files[0];
      // console.log(this.file);
    },
    uploadFile() {
      const config = {
        bucketName: "",
        dirName: "img" /* optional */,
        region: "",
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

  
    },
    save() {
      axios
        .post(Global.url + "save/", this.curso)
        .then(() => {
          // console.log(this.curso);
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("ocurrio un error!", error);
        });
    },
  },
};
</script>

  