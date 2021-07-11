<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-6">
        <div class="text-center">
          <main class="form-signin">
            <form v-on:submit.prevent="login(usuario)">
              <img
                class="my-2"
                src="../assets/favicon.png"
                alt=""
                width="72"
                height="57"
              />
              <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
              <label for="inputEmail" class="visually-hidden"
                >Email address</label
              >
              <input
                type="email"
                id="inputEmail"
                class="form-control mb-2"
                placeholder="Email address"
                required
                autofocus
                v-model="usuario.email"
              />
              <label for="inputPassword" class="visually-hidden"
                >Password</label
              >
              <input
                type="password"
                id="inputPassword"
                class="form-control mb-2"
                placeholder="Password"
                required
                v-model="usuario.password"
              />

              <button class="w-100 btn btn-lg btn-primary" type="submit">
                Sign in
              </button>
              <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
            </form>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "loginComponent",
  data() {
    return {
      usuario: { email: "", password: "" },
    };
  },
  methods: {
    ...mapActions(["login"]),
  },
};
</script>



<style scoped>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>