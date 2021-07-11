<template>
  <header>
    <div class="container pt-4">
      <nav class="navbar navbar-expand-lg navbar-dark bg-transparent px-0">
        <router-link class="text-white navbar-brand" to="/">HOME</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#da-navbarNav"
          aria-controls="da-navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse text-uppercase" id="da-navbarNav">
          <ul class="navbar-nav ml-auto">
            <li v-if="autenticado2" class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                >ADMIN</a
              >
              <div class="dropdown-menu">
                <router-link class="dropdown-item" :to="{ name: 'admin' }"
                  >Courses</router-link
                >

                <router-link class="dropdown-item" to="/create"
                  >Create course</router-link
                >
              </div>
            </li>
            <li class="nav-item">
              <router-link class="nav-link smooth-scroll" to="/contact"
                >Contact</router-link
              >
            </li>

            <li v-if="!autenticado2" class="nav-item">
              <router-link class="nav-link smooth-scroll" to="/login"
                >Login</router-link
              >
            </li>

            <li v-if="autenticado2" class="nav-item">
              <a class="nav-link smooth-scroll" @click="cerrarSesion"
                >Sign out</a
              >
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "headerComponent",
  data() {
    return {};
  },
  methods: {
    ...mapActions(["cerrarSesion", "obtenerToken", "ruta"]),
  },
  computed: {
    ...mapGetters(["autenticado2"]),
  },
  created() {
    this.obtenerToken();
    this.ruta();
  },
};
</script>