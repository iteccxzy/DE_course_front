<template>
  <div id="top">
    <header-component />
    <router-view></router-view>
    <footer-component />
  </div>
</template>

<script>
import HeaderComponent from "@/components/headerComponent.vue";
import FooterComponent from "@/components/footerComponent.vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent,
  },

};
</script>

<style>
@import "./assets/css/aos.css";
@import "./assets/css/ekko-lightbox.css";
@import "./assets/styles/bootstrap.css";
@import "./assets/styles/main.css";
.card {
  background-color: #efefef;
}
</style>

  