<script setup>
import { ref } from "vue";
import LessonLayout from "../components/LessonLayout.vue";
const calificacion = ref(85);
const code = `const calificacion = ref(85)

<input v-model.number="calificacion"
       type="range" min="0" max="100" />

<p v-if="calificacion >= 90">
  Excelente
</p>
<p v-else-if="calificacion >= 70">
  Aprobado
</p>
<p v-else>Sigue practicando</p>`;
</script>
<template>
  <LessonLayout
    number="01"
    title="Decide qué mostrar."
    :code="code"
    description="v-if renderiza un elemento cuando su condición es verdadera. v-else-if comprueba otra condición y v-else cubre el resto de los casos. Solo una rama aparece en el DOM."
    takeaway="Las ramas deben estar juntas. Vue crea o retira sus elementos del DOM cuando cambia la condición; usa v-if para contenido que no siempre necesitas renderizar."
  >
    <h3>¿Cómo te fue en el examen?</h3>
    <p class="muted">Mueve el control y observa la rama activa.</p>
    <div class="score">
      <span>{{ calificacion }}</span
      ><small>/ 100 puntos</small>
    </div>
    <label for="calificacion">Calificación</label
    ><input
      id="calificacion"
      v-model.number="calificacion"
      type="range"
      min="0"
      max="100"
    />
    <div class="range-labels">
      <span>0</span><span>70 · Aprobado</span><span>100</span>
    </div>
    <div class="result-area" aria-live="polite">
      <p
        v-if="calificacion >= 90"
        class="result success"
        data-testid="grade-result"
      >
        <strong>Excelente</strong><span>Se cumple: calificacion &gt;= 90</span>
      </p>
      <p
        v-else-if="calificacion >= 70"
        class="result info"
        data-testid="grade-result"
      >
        <strong>Aprobado</strong><span>Se cumple: calificacion &gt;= 70</span>
      </p>
      <p v-else class="result warning" data-testid="grade-result">
        <strong>Sigue practicando</strong
        ><span>Ninguna condición anterior se cumple.</span>
      </p>
    </div>
  </LessonLayout>
</template>
