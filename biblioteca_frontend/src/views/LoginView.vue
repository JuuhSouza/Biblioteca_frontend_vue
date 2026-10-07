<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSessao } from '../composables/useSessao'

const route = useRoute()
const router = useRouter()
const { entrar } = useSessao()

const nome = ref('')
function destinoSeguro() {
  const r = route.query.redirect
  return typeof r === 'string' && r.startsWith('/') && !r.startsWith('//') ? r : '/'
}

function enviar() {
  if (!nome.value.trim()) return
  entrar(nome.value.trim()) // troque a sua API de login
  router.push(destinoSeguro())
}
</script>

<template>
  <section class="login">
    <h1>Entrar</h1>
    <p>Entre para salvar livros em coleções.</p>

    <form @submit.prevent="enviar">
      <label>
        Seu nome
        <input v-model="nome" type="text" autocomplete="name" required />
      </label>
      <button class="btn pri" type="submit">Entrar</button>
    </form>

    <RouterLink to="/">← Voltar ao catálogo</RouterLink>
  </section>
</template>

<style scoped>
.login {
  max-width: 380px;
  display: grid;
  gap: 14px;
}

form {
  display: grid;
  gap: 14px;
}

label {
  display: grid;
  gap: 4px;
  font-weight: 500;
  font-size: 0.9rem;
}

input {
  padding: 10px 12px;
  font: 1rem var(--sans);
}
</style>