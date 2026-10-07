<template>
  <section id="v-cat">
    <h1>Navegue por assunto</h1>

    <p v-if="carregando">Carregando livros…</p>

    <div v-else-if="erro" class="vazio">
      <p>{{ erro }}</p>
      <button class="btn" @click="carregar">Tentar de novo</button>
    </div>

    <template v-else>
      <EstanteAssuntos :assuntos="assuntos" v-model="assuntoAtivo" />

      <div class="wrap">
        <FiltrosLivros
          :editoras="editoras"
          :autores="autores"
          v-model:editora="editora"
          v-model:autor="autor"
          v-model:ordenar="ordenar"
          v-model:soDisponiveis="soDisponiveis"
          @limpar="limpar"
        />

        <div>
          <div class="topo">
            <h2 aria-live="polite">{{ textoContagem }}</h2>
          </div>

          <ul class="livros" v-if="filtrados.length">
            <li v-for="livro in filtrados" :key="livro.id">
              <CardLivro :livro="livro" @abrir="abrirLivro" />
            </li>
          </ul>

          <div class="vazio" v-else>
            <p>Nenhum livro encontrado com esses filtros.</p>
            <button class="btn" @click="limpar">Limpar filtros</button>
          </div>
        </div>
      </div>
    </template>

    <DetalheLivro
      v-if="livroSelecionado"
      :livro="livroSelecionado"
      @fechar="livroSelecionado = null"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { api } from '../../service/api.js'
import { cores, corDe } from '../../utils/cores'
import EstanteAssuntos from '../EstanteAssunto.vue'
import FiltrosLivros from '../FiltrosLivros.vue'
import CardLivro from '../Livros/CardsLivros.vue'
import DetalheLivro from '../Livros/DetalheLivro.vue'

const livros = ref([])
const carregando = ref(true)
const erro = ref(null)

async function carregar() {
  carregando.value = true
  erro.value = null
  try {
    livros.value = await api.listarLivros()
  } catch (e) {
    erro.value = 'Não foi possível carregar os livros.'
  } finally {
    carregando.value = false
  }
}

onMounted(carregar)

const assuntoAtivo = ref('Todos')
const editora = ref('')
const autor = ref('')
const ordenar = ref('titulo')
const soDisponiveis = ref(false)

const assuntos = computed(() => {
  const contagem = {}
  for (const l of livros.value) {
    contagem[l.assunto] = (contagem[l.assunto] || 0) + 1
  }

  const lista = Object.entries(contagem).map(([nome, total]) => ({
    nome,
    total,
    cor: corDe(nome),
    extra: total * 18,
  }))

  return [
    { nome: 'Todos', total: livros.value.length, cor: cores.Todos, extra: 0 },
    ...lista,
  ]
})

const editoras = computed(() => [...new Set(livros.value.map((l) => l.editora))].sort())
const autores = computed(() => [...new Set(livros.value.map((l) => l.autor))].sort())

const filtrados = computed(() => {
  const lista = livros.value.filter(
    (l) =>
      (assuntoAtivo.value === 'Todos' || l.assunto === assuntoAtivo.value) &&
      (!editora.value || l.editora === editora.value) &&
      (!autor.value || l.autor === autor.value) &&
      (!soDisponiveis.value || l.disponivel),
  )

  return [...lista].sort((a, b) => {
    if (ordenar.value === 'ano') return b.ano - a.ano
    return a[ordenar.value].localeCompare(b[ordenar.value], 'pt-BR')
  })
})

const textoContagem = computed(() => {
  const n = filtrados.value.length
  return `${n} ${n === 1 ? 'livro' : 'livros'}`
})

function limpar() {
  assuntoAtivo.value = 'Todos'
  editora.value = ''
  autor.value = ''
  ordenar.value = 'titulo'
  soDisponiveis.value = false
}

const livroSelecionado = ref(null)

function abrirLivro(livro) {
  livroSelecionado.value = livro
}
</script>


<style scoped>
.wrap {
  display: grid;
  grid-template-columns: 230px 1fr;
  gap: 34px;
  align-items: start;
}

@media (max-width: 760px) {
  .wrap {
    grid-template-columns: 1fr;
  }
}

.topo {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 18px;
}

.livros {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 26px 20px;
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>