<template>
  <div>
    <div class="container mt-3">
      <div class="row justify-content-center" style="min-height: 180px">
        <div class="col-9">
          <p class="text-center h2" style="color: #425855">Courseview</p>
          <p class="text-center  fs-6 mb-4" style="color: #425855">
          choose a course and create your learning road
          </p>
          <div class="autosuggest-container mx-auto">
            <vue-autosuggest
              v-model="query"
              :suggestions="filteredOptions"
              @focus="focusMe"
              @click="clickHandler"
              @input="onInputChange"
              @selected="onSelected"
              :get-suggestion-value="getSuggestionValue"
              :input-props="{
                id: 'autosuggest__input',
                placeholder: 'search a course...',
              }"
            >
              <div
                slot-scope="{ suggestion }"
                style="display: flex; align-items: center"
              >
                <div style="{ display: 'flex', color: 'navyblue'}">
                  {{ suggestion.item.nombre }}
                </div>
              </div>
            </vue-autosuggest>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import { VueAutosuggest } from "vue-autosuggest";
import Global from "@/global.js";
export default {
  name: "searchComponent",
  components: {
    VueAutosuggest,
  },
  data() {
    return {
      query: "",
      selected: "",
      suggestions: [
        {
          cursos: [],
        },
      ],
      id: "",
    };
  },
  computed: {
    filteredOptions() {
      return [
        {
          data: this.suggestions[0].cursos.filter((option) => {
            this.suggestions[0].cursos = [];

            return (
              option.nombre.toLowerCase().indexOf(this.query.toLowerCase()) > -1
            );
          }),
        },
      ];
    },
  },
  methods: {
    clickHandler() {},

    onSelected(item) {
      this.selected = item.item;
      this.id = item.item.nombre;
      this.$router.push("/resultados/" + this.id);
    },
    onInputChange(text) {
      this.suggestions[0].cursos = [];
      if (text) {
        axios
          .get(Global.url + "search/" + text)
          .then((response) => {
            response.data.cursos.forEach((a) => {
              this.suggestions[0].cursos.push(a);
            });
          })
          .catch((error) => {
            console.error("ocurrio un error!", error);
          });
      }
    },

    getSuggestionValue(suggestion) {
      return suggestion.item.nombre;
    },
    focusMe(e) {
      console.log(e);
    },
  },
};
</script> 
