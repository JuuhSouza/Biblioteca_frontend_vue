<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSessao } from '../composables/useSessao'

const router = useRouter()
const { usuario, logado, sair } = useSessao()

const termo = ref('')

function buscar() {
  const q = termo.value.trim()
  router.push({ name: 'home', query: q ? { q } : {} })
}

function aoSair() {
  sair()
  router.push({ name: 'home' })
}
</script>

<template>
  <header class="topo-site">
    <div class="topo-inner">
      <RouterLink to="/" class="brand">Biblioteca</RouterLink>

      <form class="search" role="search" @submit.prevent="buscar">
        <input
          v-model="termo"
          type="search"
          placeholder="Buscar por título…"
          aria-label="Buscar livros"
        />
      </form>

      <nav aria-label="Principal">
        <RouterLink to="/" class="tab">Catálogo</RouterLink>
        <RouterLink to="/colecoes" class="tab">Coleções</RouterLink>
      </nav>

      <div class="conta">
        <template v-if="logado">
          <span>Olá, {{ usuario.nome }}</span>
          <button class="btn" @click="aoSair">Sair</button>
        </template>
        <RouterLink v-else to="/entrar" class="tab">Entrar</RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Faixa que ocupa a largura toda (fundo e borda) */
.topo-site {
  position: sticky;
  top: 0; /* sem isso o "sticky" não gruda */
  z-index: 5;
  background: var(--bg-page);
  border-bottom: 1px solid var(--line);
}

/* Conteúdo centralizado, alinhado com o <main> da página */
.topo-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 22px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 12px clamp(16px, 4vw, 40px);
}

.brand {
  font: 600 1.6rem var(--font-geral);
  color: inherit;
  text-decoration: none;
}

.search {
  flex: 1 1 240px;
  max-width: 420px;
}

nav {
  display: flex;
  gap: 20px;
}

.tab {
  padding: 6px 2px;
  border-bottom: 2px solid transparent;
  font-weight: 500;
  color: var(--color-link-header);
  text-decoration: none;
}

/* O RouterLink põe aria-current="page" no link da página atual */
.tab[aria-current='page'] {
  color: var(--color-geral);
  border-color: var(--link-ativo);
}

.conta {
  margin-left: auto; /* empurra para a direita */
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>