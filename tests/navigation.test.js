import { it, expect } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { createRouter, createMemoryHistory } from "vue-router";
import App from "../src/App.vue";
import appRouter from "../src/router/index.js";

it("navega por las cuatro rutas conservando la cabecera y el menú de la SPA", async () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: appRouter.options.routes,
  });
  await router.push("/v-if");
  await router.isReady();
  const w = mount(App, { global: { plugins: [router] } });
  const header = w.get("header").element;
  const menu = w.get("nav").element;
  const cases = [
    ["/v-show", "Cambia la visibilidad."],
    ["/v-for", "De un dato a una lista."],
    ["/v-bind-key", "Cada elemento tiene identidad."],
    ["/v-if", "Decide qué mostrar."],
  ];
  for (const [path, title] of cases) {
    await w.get(`nav a[href="${path}"]`).trigger("click");
    await flushPromises();
    expect(router.currentRoute.value.path).toBe(path);
    expect(w.get("h2").text()).toBe(title);
    expect(w.get("header").element).toBe(header);
    expect(w.get("nav").element).toBe(menu);
    expect(w.get('nav a[aria-current="page"]').attributes("href")).toBe(path);
  }
  w.unmount();
});
