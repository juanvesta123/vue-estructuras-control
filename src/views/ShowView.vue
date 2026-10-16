<script setup>
import { ref } from 'vue'
import LessonLayout from '../components/LessonLayout.vue'
const visible = ref(true)
const code = `const visible = ref(true)

<button @click="visible = !visible">
  {{ visible ? 'Ocultar' : 'Mostrar' }}
</button>

<div v-show="visible">
  ¡Hola! Sigo aquí, en el DOM.
</div>`
</script>
<template>
  <LessonLayout number="02" title="Cambia la visibilidad." :code="code"
    description="v-show muestra u oculta un elemento mediante la propiedad CSS display. El elemento siempre se renderiza y permanece en el DOM, incluso cuando no lo ves."
    takeaway="v-show resulta útil al alternar la visibilidad con frecuencia. A diferencia de v-if, ocultar el elemento no lo elimina del DOM; v-show no tiene ramas v-else.">
    <h3>Ahora lo ves…</h3><p class="muted">Alterna el mensaje sin eliminar su elemento.</p>
    <button class="primary-button" @click="visible = !visible" :aria-expanded="visible" aria-controls="mensaje">{{ visible ? 'Ocultar mensaje' : 'Mostrar mensaje' }} <span>↗</span></button>
    <div class="visibility-stage"><div id="mensaje" v-show="visible" class="message-card" data-testid="secret"><span class="message-icon">✦</span><strong>¡Hola! Sigo aquí, en el DOM.</strong><p>Mi visibilidad cambia con v-show.</p></div></div>
    <p class="state-line" aria-live="polite"><i class="dot" :class="{ inactive: !visible }"></i> visible = <code>{{ visible }}</code><span class="state-detail">{{ visible ? 'Mensaje visible' : 'display: none' }}</span></p>
  </LessonLayout>
</template>
