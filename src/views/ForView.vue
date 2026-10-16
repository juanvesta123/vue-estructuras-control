<script setup>
import { ref } from 'vue'
import LessonLayout from '../components/LessonLayout.vue'
const temas = ref([{ id: 1, nombre: 'Directivas' }, { id: 2, nombre: 'Componentes' }, { id: 3, nombre: 'Vue Router' }])
const nuevoTema = ref('')
let siguienteId = 4
function agregarTema() {
  const nombre = nuevoTema.value.trim()
  if (!nombre) return
  temas.value.push({ id: siguienteId++, nombre })
  nuevoTema.value = ''
}
const code = `const temas = ref([
  { id: 1, nombre: 'Directivas' },
  { id: 2, nombre: 'Componentes' },
  { id: 3, nombre: 'Vue Router' }
])

<ul>
  <li v-for="(tema, indice) in temas"
      :key="tema.id">
    {{ indice + 1 }}. {{ tema.nombre }}
  </li>
</ul>`
</script>
<template>
  <LessonLayout number="03" title="De un dato a una lista." :code="code"
    description="v-for repite un elemento por cada entrada de un arreglo. Puedes acceder al elemento y a su índice. Cuando el arreglo cambia, Vue actualiza la lista automáticamente."
    takeaway="La sintaxis es (elemento, indice) in arreglo. El índice sirve para numerar; una key única y estable permite identificar cada elemento al modificar la lista.">
    <h3>Tu ruta de aprendizaje</h3><p class="muted">Agrega un tema y Vue dibujará un nuevo elemento.</p>
    <form class="add-form" @submit.prevent="agregarTema"><label class="sr-only" for="nuevo-tema">Nuevo tema</label><input id="nuevo-tema" v-model="nuevoTema" placeholder="Ej. Reactividad" maxlength="60"><button class="primary-button" type="submit" :disabled="!nuevoTema.trim()">Agregar +</button></form>
    <ul class="topic-list"><li v-for="(tema, indice) in temas" :key="tema.id" data-testid="topic"><span class="item-index">{{ String(indice + 1).padStart(2, '0') }}</span><span>{{ tema.nombre }}</span><button class="remove-button" @click="temas = temas.filter(t => t.id !== tema.id)" :aria-label="`Eliminar ${tema.nombre}`">×</button></li></ul>
    <p v-if="!temas.length" class="muted">La lista está vacía. Agrega tu primer tema.</p>
    <p class="state-line" aria-live="polite"><i class="dot"></i> {{ temas.length }} elementos en el arreglo</p>
  </LessonLayout>
</template>
