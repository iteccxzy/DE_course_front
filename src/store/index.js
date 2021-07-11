import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import Global from "@/global.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload;
    },
  },
  actions: {
    async ruta({state}) {
      try {
        const res = await fetch(Global.url4, {
          headers: {
            "Content-Type": "application/json",
            "auth-token": state.token,
          },
        });
        await res.json();
      } catch (error) {
        console.log(error);
        state.token = null
       router.push("/login");
      }
    },


    async login({ commit }, usuario) {
      try {
        const res = await fetch(Global.url3, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuario),
        });
        const response = await res.json();
        
        localStorage.setItem("token2", response.data.token);
        commit("setToken", response.data.token);
        router.push("/");
      } catch (error) {
        console.log("error: ", error);
      }
    },


    obtenerToken({ commit }) {
      if (localStorage.getItem("token2")) {
        const ls = localStorage.getItem("token2");
        commit("setToken", ls);
      } else {
        commit("setToken", null);
      }
    },

    cerrarSesion({ commit }) {
      commit("setToken", null);
      localStorage.removeItem("token2");
      router.push("/login");
    },
  },
  getters: {
    autenticado(state) {
      const tk = state.token || localStorage.getItem("token2");
      return tk;
    },
    autenticado2(state) {
      const tk = state.token ;
      return tk;
    },
  },
});
