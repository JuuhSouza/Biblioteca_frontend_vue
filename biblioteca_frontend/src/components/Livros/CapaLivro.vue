<script setup>
import { corDe } from '../../utils/cores'

defineProps({
  livro: { type: Object, required: true },
})
</script>

<template>
  <div class="capa" :style="{ '--c': corDe(livro.assunto) }">
    <strong>{{ livro.titulo }}</strong>
    <span>{{ livro.autor }}</span>
  </div>
</template>

<style scoped>
.capa {
  container-type: inline-size;
  aspect-ratio: 2 / 3;
  width: 100%;
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0 6%, rgba(255, 255, 255, 0.14) 6% 7%, transparent 7%),
    var(--c);
  color: var(--color-geral);
  padding: 16% 9% 9% 17%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 2px 5px 5px 2px;
}

.capa::after {
  content: '';
  position: absolute;
  left: 7%;
  right: 0;
  bottom: 22%;
  height: 2px;
  background: rgba(255, 255, 255, 0.45);
}

.capa strong {
  font: 600 clamp(0.85rem, 8.5cqw, 1.25rem) / 1.15 var(--font-geral);
}

.capa span {
  font: 500 clamp(0.65rem, 5.5cqw, 0.8rem) var(--sans);
  opacity: 0.92;
}
</style>