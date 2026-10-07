<template>
  <div class="shelf" role="group" aria-label="Assuntos">
    <button
      v-for="item in assuntos"
      :key="item.nome"
      class="spine"
      :style="{ '--c': item.cor, '--v': item.extra + 'px' }"
      :aria-pressed="ativo === item.nome"
      @click="ativo = item.nome"
    >
      {{ item.nome }} <small>{{ item.total }}</small>
    </button>
  </div>
</template>

<script setup>
// Recebe a lista de assuntos (de cima para baixo)
defineProps({
  assuntos: { type: Array, required: true },
})

const ativo = defineModel({ default: 'Todos' })
</script>

<style scoped>
.shelf {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  overflow-x: auto;
  padding: 22px 4px 0;
  border-bottom: 10px solid var(--line-navegacao);
  margin-bottom: 30px;
}

.spine {
  writing-mode: vertical-rl;
  background: var(--c);
  color: #fff;
  border: 0;
  border-radius: 4px 4px 0 0;
  padding: 14px 11px calc(14px + var(--v, 0px));
  font: 600 0.95rem/1 var(--font-geral);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex: none;
  transition: transform 0.15s;
  box-shadow: inset 3px 0 0 rgba(255, 255, 255, 0.2);
}

.spine small {
  font: 500 0.75rem var(--sans);
  opacity: 0.9;
}

.spine[aria-pressed='true'] {
  transform: translateY(-10px);
  box-shadow: 0 0 0 2px var(--ativado-livro);
}
</style>