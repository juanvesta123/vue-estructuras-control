import { createRouter, createWebHashHistory } from "vue-router";
import IfView from "../views/IfView.vue";
import ShowView from "../views/ShowView.vue";
import ForView from "../views/ForView.vue";
import KeyView from "../views/KeyView.vue";

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/v-if" },
    {
      path: "/v-if",
      component: IfView,
      meta: { title: "v-if · Condicionales" },
    },
    {
      path: "/v-show",
      component: ShowView,
      meta: { title: "v-show · Visibilidad" },
    },
    { path: "/v-for", component: ForView, meta: { title: "v-for · Listas" } },
    {
      path: "/v-bind-key",
      component: KeyView,
      meta: { title: "v-bind:key · Identidad" },
    },
    { path: "/:pathMatch(.*)*", redirect: "/v-if" },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (from.matched.length) return { el: "#contenido", top: 24 };
    return { top: 0 };
  },
});
