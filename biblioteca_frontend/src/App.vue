<template>
  <header>
    <NavBar/>
  </header>
  
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useSessao } from './composables/useSessao'
import NavBar from './components/NavBar.vue'

const router = useRouter()
const { usuario, logado, sair } = useSessao()

function aoSair() {
  sair()
  router.push({ name: 'home' })
}
</script>

<!-- <style scoped>
.topo-site {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px clamp(16px, 4vw, 40px) 0;
}

nav,
.conta {
  display: flex;
  align-items: center;
  gap: 18px;
}

a {
  color: inherit;
  text-decoration: none;
  opacity: 0.8;
}
a.router-link-exact-active {
  opacity: 1;
  border-bottom: 2px solid var(--accent);
}
</style> -->