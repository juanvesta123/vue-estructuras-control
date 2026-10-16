import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IfView from '../src/views/IfView.vue'
import ShowView from '../src/views/ShowView.vue'
import ForView from '../src/views/ForView.vue'
import KeyView from '../src/views/KeyView.vue'

describe('demostraciones interactivas de Vue', () => {
  it('selecciona las tres ramas en los límites de calificación', async () => {
    const w = mount(IfView)
    for (const [value, text] of [[90, 'Excelente'], [89, 'Aprobado'], [70, 'Aprobado'], [69, 'Sigue practicando']]) {
      await w.get('input').setValue(value)
      expect(w.get('[data-testid="grade-result"]').text()).toContain(text)
    }
  })
  it('oculta con v-show sin retirar ni recrear el nodo', async () => {
    const w = mount(ShowView)
    const node = w.get('[data-testid="secret"]').element
    await w.get('button').trigger('click')
    expect(w.get('[data-testid="secret"]').element).toBe(node)
    expect(node.style.display).toBe('none')
    await w.get('button').trigger('click')
    expect(node.style.display).toBe('')
  })
  it('agrega temas válidos, rechaza espacios y elimina un tema', async () => {
    const w = mount(ForView)
    expect(w.findAll('[data-testid="topic"]')).toHaveLength(3)
    await w.get('input').setValue('   ')
    await w.get('form').trigger('submit')
    expect(w.findAll('[data-testid="topic"]')).toHaveLength(3)
    await w.get('input').setValue('  Componentes  ')
    await w.get('form').trigger('submit')
    expect(w.findAll('[data-testid="topic"]')).toHaveLength(4)
    expect(w.findAll('[data-testid="topic"]')[3].text()).toContain('Componentes')
    await w.findAll('[data-testid="topic"]')[3].get('button').trigger('click')
    expect(w.findAll('[data-testid="topic"]')).toHaveLength(3)
  })
  it('mantiene el input y el nodo asociados al id al invertir la lista', async () => {
    const w = mount(KeyView)
    const node = w.get('[data-id="101"] input').element
    await w.get('[data-id="101"] input').setValue('Mi nota permanece')
    await w.get('button').trigger('click')
    expect(w.findAll('[data-testid="key-row"]').map(x => x.attributes('data-id'))).toEqual(['103', '102', '101'])
    expect(w.get('[data-id="101"] input').element).toBe(node)
    expect(node.value).toBe('Mi nota permanece')
  })
})
