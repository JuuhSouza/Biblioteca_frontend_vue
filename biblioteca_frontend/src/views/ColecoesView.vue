<template>
  <section>
    <h1>Minhas coleções</h1>
    <p>Olá, {{ usuario?.nome }}!</p>

    <p v-if="carregando">Carregando…</p>

    <ul v-else-if="meus.length" class="livros">
      <li v-for="livro in meus" :key="livro.id">
        <CardLivro :livro="livro" @abrir="livroSelecionado = livro" />
      </li>
    </ul>

    <p v-else>
      Você ainda não salvou nenhum livro.
      <RouterLink to="/">Explorar o catálogo</RouterLink>
    </p>

    <DetalheLivro
      v-if="livroSelecionado"
      :livro="livroSelecionado"
      @fechar="livroSelecionado = null"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSessao } from '../composables/useSessao'

const { usuario, colecao } = useSessao()

const livros = ref([])
const carregando = ref(true)
const livroSelecionado = ref(null)

onMounted(async () => {
  try {
    livros.value = await api.listarLivros()
  } finally {
    carregando.value = false
  }
})

const meus = computed(() => livros.value.filter((l) => colecao.value.includes(l.id)))
</script>

<style scoped>
.livros {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 26px 20px;
  list-style: none;
  padding: 0;
  margin: 24px 0 0;
}
</style>