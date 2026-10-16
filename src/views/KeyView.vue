<script setup>
import { ref } from "vue";
import LessonLayout from "../components/LessonLayout.vue";
const tarjetas = ref([
  { id: 101, nombre: "Diseñar" },
  { id: 102, nombre: "Programar" },
  { id: 103, nombre: "Publicar" },
]);
const code = `const tarjetas = ref([
  { id: 101, nombre: 'Diseñar' },
  { id: 102, nombre: 'Programar' },
  { id: 103, nombre: 'Publicar' }
])

<li v-for="tarjeta in tarjetas"
    v-bind:key="tarjeta.id">
  {{ tarjeta.nombre }}
  <input placeholder="Escribe una nota" />
</li>

<button @click="tarjetas.reverse()">
  Invertir orden
</button>`;
</script>
<template>
  <LessonLayout
    number="04"
    title="Cada elemento tiene identidad."
    :code="code"
    description="v-bind:key asigna una identidad única a cada elemento de v-for. Así Vue puede mover y reutilizar el nodo correcto al cambiar el orden, conservando su estado local. :key es su forma abreviada."
    takeaway="Usa un id único y estable, no el índice ni un valor aleatorio. Escribe una nota y cambia el orden: el input viaja con su tarjeta gracias a v-bind:key."
  >
    <h3>El orden cambia. La identidad no.</h3>
    <p class="muted">Escribe en una tarjeta y luego invierte la lista.</p>
    <button class="primary-button" @click="tarjetas.reverse()">
      Invertir orden
    </button>
    <ul class="key-list">
      <li
        v-for="tarjeta in tarjetas"
        v-bind:key="tarjeta.id"
        :data-id="tarjeta.id"
        data-testid="key-row"
      >
        <div>
          <label :for="`nota-${tarjeta.id}`">{{ tarjeta.nombre }}</label
          ><code>id: {{ tarjeta.id }}</code>
        </div>
        <input
          :id="`nota-${tarjeta.id}`"
          :aria-label="`Nota de ${tarjeta.nombre}`"
          placeholder="Escribe una nota"
          maxlength="80"
        />
      </li>
    </ul>
    <p class="state-line" aria-live="polite">
      <i class="dot"></i> Orden: {{ tarjetas.map((t) => t.id).join(", ") }}
    </p>
  </LessonLayout>
</template>
