<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
const props = defineProps({ directive: String, motionAllowed: Boolean });
const graphic = ref(null);
let media;
let stopWatching;
let generation = 0;

onMounted(() => {
  if (typeof window.matchMedia !== "function") return;
  if (!window.matchMedia("(min-width: 900px) and (pointer: fine)").matches) return;
  stopWatching = watch(
    () => props.motionAllowed,
    async (allowed) => {
      const request = ++generation;
      media?.revert();
      if (!allowed) return;
      const modules = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]).catch(() => null);
      if (!modules) return;
      const [{ gsap }, { ScrollTrigger }] = modules;
      if (request !== generation || !graphic.value) return;
      gsap.registerPlugin(ScrollTrigger);
      media = gsap.matchMedia();
      media.add(
        "(min-width: 900px) and (prefers-reduced-motion: no-preference) and (pointer: fine)",
        () => {
          // Explicación visual del flujo de Vue; los datos y controles no se animan.
          gsap.fromTo(
            graphic.value.querySelector(".diagram-surface"),
            { transform: "translateY(0%) scale(0.97)" },
            {
              transform: "translateY(-3%) scale(1)",
              ease: "none",
              scrollTrigger: {
                trigger: graphic.value,
                start: "top 40%",
                end: "bottom top",
                scrub: true,
              },
            },
          );
          gsap.fromTo(
            graphic.value.querySelectorAll(".flow-word"),
            { opacity: 0.35 },
            {
              opacity: 1,
              stagger: 0.06,
              ease: "none",
              scrollTrigger: {
                trigger: graphic.value,
                start: "top 85%",
                end: "center 35%",
                scrub: true,
              },
            },
          );
        },
        graphic.value,
      );
    },
    { immediate: true },
  );
});
onBeforeUnmount(() => {
  generation++;
  stopWatching?.();
  media?.revert();
});
</script>

<template>
  <div ref="graphic" class="hero-diagram" aria-hidden="true">
    <div class="diagram-surface">
      <div class="diagram-topline">
        <span>Una interfaz que responde.</span
        ><span class="diagram-corner">&lt;/&gt;</span>
      </div>
      <div class="diagram-orbit orbit-outer"></div>
      <div class="diagram-orbit orbit-inner"></div>
      <div class="directive-symbol">{{ directive }}</div>
      <div class="diagram-node node-data">
        <span class="node-icon">{ }</span><span>Datos</span><i></i>
      </div>
      <div class="diagram-node node-view">
        <span class="node-icon">↗</span><span>Interfaz</span><i></i>
      </div>
      <span class="diagram-coordinate coordinate-a">reactive()</span
      ><span class="diagram-coordinate coordinate-b">render()</span>
      <div class="diagram-bottomline">
        <span class="flow-word">Cambia.</span
        ><span class="flow-word">Observa.</span
        ><span class="flow-word">Comprende.</span>
      </div>
    </div>
  </div>
</template>
