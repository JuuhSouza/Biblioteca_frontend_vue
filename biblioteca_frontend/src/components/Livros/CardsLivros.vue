<template>
  <button class="card" aria-haspopup="dialog" @click="$emit('abrir', livro)">
    <CapaLivro :livro="livro" />

    <span class="titulo">{{ livro.titulo }}</span>
    <span class="autor">{{ livro.autor }}</span>

    <span class="status" :class="{ off: !livro.disponivel }">
      <i class="dot" aria-hidden="true"></i>
      {{ livro.disponivel ? 'Disponível' : 'Indisponível' }}
    </span>
  </button>
</template>

<script setup>
import CapaLivro from '../Livros/CapaLivro.vue'

defineProps({
  livro: { type: Object, required: true },
})

defineEmits(['abrir'])
</script>

<style scoped>
.card {
  background: none;
  border: 0;
  padding: 0;
  text-align: left;
  color: inherit;
  cursor: pointer;
  display: grid;
  gap: 6px;
  width: 100%;
  align-content: start;
}

.card .capa {
  transition: transform 0.15s;
}
.card:hover .capa,
.card:focus-visible .capa {
  transform: translateY(-4px);
}

.titulo {
  margin-top: 6px;
  font: 600 1.05rem/1.2 var(--serif);
}

.autor {
  color: var(--color-geral);
  font: 0.9rem var(--sans);
}

.status {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  font: 0.85rem var(--sans);
}

.dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--disponivel);
}

.status.off .dot {
  background: var(--indisponivel);
}
</style>