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
