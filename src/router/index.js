import Vue from "vue";
import VueRouter from "vue-router";

import Content from "../components/contentComponent.vue";
import Resultados from "../components/resultadosComponent.vue";
import Detalle from "../components/detalleComponent.vue";
import Contact from "../components/contactComponent.vue";
import loginComponent from "../components/loginComponent.vue";

Vue.config.productionTip = false;

import store from "../store/index";

// configuracion del router
Vue.use(VueRouter);
const routes = [
  { path: "/", component: Content, name: "home" },
  { path: "/resultados/:id", component: Resultados, name: "resultados" },
  { path: "/detalle/:id", component: Detalle, name: "detalle" },
  { path: "/contact", component: Contact },
  { path: "/login", component: loginComponent, name: "login" },

  {
    path: "/admin",
    name: "admin",
    component: () => import("../components/adminComponent"),
    meta: { requireAuth: true },
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: () => import("../components/editComponent.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/create",
    name: "create",
    component: () => import("../components/createComponent.vue"),
    meta: { requireAuth: true },
  },
];
const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  const rutaProtegida = to.matched.some((record) => record.meta.requireAuth);

  if (rutaProtegida && store.getters.autenticado === null) {

    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
