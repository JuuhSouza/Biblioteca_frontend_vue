<template>
  <div class="header">
    <NavBar />
  </div>

  <div class="navegacao">
    <NavegacaoAssunto />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import NavegacaoAssunto from './components/NavegacaoAssunto.vue'
</script>

<style>
.navegacao{
  padding: 1rem 3rem;
}
</style>


