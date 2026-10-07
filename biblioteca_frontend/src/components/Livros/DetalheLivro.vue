<template>
  <Teleport to="body">
    <div class="overlay" @click.self="emit('fechar')">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="det-titulo">
        <button ref="botaoFechar" class="fechar" aria-label="Fechar" @click="emit('fechar')">×</button>

        <div class="capa-wrap">
          <CapaLivro :livro="livro" />
        </div>

        <div class="info">
          <h2 id="det-titulo">{{ livro.titulo }}</h2>
          <p class="autor">{{ livro.autor }}</p>

          <dl>
            <dt>Assunto</dt>
            <dd>{{ livro.assunto }}</dd>
            <dt>Editora</dt>
            <dd>{{ livro.editora }}</dd>
            <dt>Ano</dt>
            <dd>{{ livro.ano }}</dd>
            <dt>Situação</dt>
            <dd>{{ livro.disponivel ? 'Disponível para empréstimo' : 'Indisponível no momento' }}</dd>
          </dl>

          <button class="acao" @click="acaoPrincipal">
            <template v-if="!logado">Entrar para salvar em coleções</template>
            <template v-else-if="estaNaColecao(livro.id)">Remover da coleção</template>
            <template v-else>Salvar em coleções</template>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CapaLivro from '../Livros/CapaLivro.vue'
import { useSessao } from '../../composables/useSessao.js'

const props = defineProps({
  livro: { type: Object, required: true },
})
const emit = defineEmits(['fechar'])

const router = useRouter()
const route = useRoute()
const { logado, estaNaColecao, alternarColecao } = useSessao()

const botaoFechar = ref(null)

function acaoPrincipal() {
  if (!logado.value) {
    router.push({ name: 'entrar', query: { redirect: route.fullPath } })
    return
  }
  alternarColecao(props.livro.id)
}

function aoPressionar(e) {
  if (e.key === 'Escape') emit('fechar')
}

onMounted(() => {
  window.addEventListener('keydown', aoPressionar)
  document.body.style.overflow = 'hidden'
  botaoFechar.value?.focus()
})

onUnmounted(() => {
  window.removeEventListener('keydown', aoPressionar)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgba(0, 0, 0, 0.6);
}

.modal {
  position: relative;
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 24px;
  width: min(680px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
  background: #17211c;
  color: #f1ece1;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

@media (max-width: 520px) {
  .modal {
    grid-template-columns: 1fr;
  }
  .capa-wrap {
    width: 140px;
  }
}

.fechar {
  position: absolute;
  top: 14px;
  right: 18px;
  background: none;
  border: 0;
  color: inherit;
  font-size: 1.6rem;
  line-height: 1;
  cursor: pointer;
  opacity: 0.8;
}
.fechar:hover {
  opacity: 1;
}

h2 {
  margin: 0;
  font: 600 1.7rem/1.15 var(--serif);
}

.autor {
  margin: 6px 0 18px;
  color: var(--muted);
  font: 0.95rem var(--sans);
}

dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px 18px;
  margin: 0 0 22px;
  font: 0.95rem var(--sans);
}

dt {
  color: var(--muted);
}

dd {
  margin: 0;
}

.acao {
  padding: 12px 18px;
  background: #86a9f2;
  color: #101713;
  border: 0;
  border-radius: 8px;
  font: 600 0.95rem var(--sans);
  cursor: pointer;
}
.acao:hover {
  filter: brightness(1.08);
}
</style>