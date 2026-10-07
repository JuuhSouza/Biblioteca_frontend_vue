<template>
  <aside class="filtros" aria-label="Filtros">
    <label>
      Editora
      <select v-model="editora">
        <option value="">Todas</option>
        <option v-for="e in editoras" :key="e" :value="e">{{ e }}</option>
      </select>
    </label>

    <label>
      Autor
      <select v-model="autor">
        <option value="">Todos</option>
        <option v-for="a in autores" :key="a" :value="a">{{ a }}</option>
      </select>
    </label>

    <label>
      Ordenar por
      <select v-model="ordenar">
        <option value="titulo">Título (A–Z)</option>
        <option value="autor">Autor (A–Z)</option>
        <option value="ano">Mais recentes</option>
      </select>
    </label>

    <label class="chk">
      <input type="checkbox" v-model="soDisponiveis" /> Só disponíveis
    </label>

    <button class="btn" @click="$emit('limpar')">Limpar filtros</button>
  </aside>
</template>

<script setup>
defineProps({
  editoras: { type: Array, default: () => [] },
  autores: { type: Array, default: () => [] },
})

const editora = defineModel('editora', { default: '' })
const autor = defineModel('autor', { default: '' })
const ordenar = defineModel('ordenar', { default: 'titulo' })
const soDisponiveis = defineModel('soDisponiveis', { default: false })

defineEmits(['limpar'])
</script>

<style scoped>
.filtros {
  display: grid;
  gap: 16px;
}

.filtros label {
  display: grid;
  gap: 4px;
  font-weight: 500;
  font-size: 0.9rem;
}

.filtros .chk {
  display: flex;
  gap: 8px;
  align-items: center;
}

.chk input {
  width: 18px;
  height: 18px;
  accent-color: var(--accent);
}
</style>