import { describe, it, expect } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { createRouter, createMemoryHistory } from "vue-router";
import App from "../src/App.vue";
import LessonLayout from "../src/components/LessonLayout.vue";
import appRouter from "../src/router/index.js";

describe("rediseño accesible del laboratorio", () => {
  it("presenta el código sin controles ficticios de macOS", () => {
    const w = mount(LessonLayout, {
      props: {
        number: "01",
        title: "Ejemplo",
        code: '<p v-if="activo">Visible</p>',
      },
    });
    expect(w.find(".window-dots").exists()).toBe(false);
    expect(w.get("pre code").text()).toContain("v-if");
    expect(w.get(".code-filename").text()).toBe("IfView.vue");
  });
  it("ofrece la siguiente lección y un salto al contenido sin cambiar la ruta", async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: appRouter.options.routes,
    });
    await router.push("/v-if");
    await router.isReady();
    const w = mount(App, { global: { plugins: [router] } });
    expect(w.get(".skip-link").attributes("href")).toBe("#contenido");
    expect(w.get("#contenido").attributes("tabindex")).toBe("-1");
    expect(w.get(".next-lesson").attributes("href")).toBe("/v-show");
    await w.get(".next-lesson").trigger("click");
    await flushPromises();
    expect(router.currentRoute.value.path).toBe("/v-show");
    expect(w.get("h2").text()).toBe("Cambia la visibilidad.");
    w.unmount();
  });
});
