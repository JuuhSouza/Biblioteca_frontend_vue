<template>
  <section id="v-cat">
    <h1>Navegue por assunto</h1>
    <p v-if="carregando">Carregando livros…</p>

    <div v-else-if="erro" class="vazio">
      <p>{{ erro }}</p>
      <button class="btn" @click="carregar">Tentar de novo</button>
    </div>

    <template v-else>
      <div class="shelf" role="group" aria-label="Assuntos">
        <button
          v-for="item in assuntos"
          :key="item.nome"
          class="spine"
          :style="{ '--c': item.cor, '--v': item.extra + 'px' }"
          :aria-pressed="assuntoAtivo === item.nome"
          @click="assuntoAtivo = item.nome"
        >
          {{ item.nome }} <small>{{ item.total }}</small>
        </button>
      </div>

      <div class="wrap">
        <aside class="filtros" aria-label="Filtros">
          <label>
            Editora
            <select v-model="editora">
              <option value="">Todas</option>
              <option v-for="e in editoras" :key="e" :value="e">{{ e }}</option>
            </select>
          </label>

          <label>
            Autor
            <select v-model="autor">
              <option value="">Todos</option>
              <option v-for="a in autores" :key="a" :value="a">{{ a }}</option>
            </select>
          </label>

          <label>
            Ordenar por
            <select v-model="ordenar">
              <option value="titulo">Título (A–Z)</option>
              <option value="autor">Autor (A–Z)</option>
              <option value="ano">Mais recentes</option>
            </select>
          </label>

          <label class="chk">
            <input type="checkbox" v-model="soDisponiveis" /> Só disponíveis
          </label>

          <button class="btn" @click="limpar">Limpar filtros</button>
        </aside>


        <!-- LISTA DE LIVROS -->
        <div>
          <div class="topo">
            <h2 aria-live="polite">{{ textoContagem }}</h2>
          </div>

          <ul class="livros" v-if="filtrados.length">
            <li v-for="livro in filtrados" :key="livro.id">
              <button class="card">
                <div class="cover" :style="{ '--c': cores[livro.assunto] || '#444' }">
                  <strong>{{ livro.titulo }}</strong>
                  <span>{{ livro.autor }}</span>
                </div>
              </button>
            </li>
          </ul>

          <div class="vazio" v-else>
            <p>Nenhum livro encontrado com esses filtros.</p>
            <button class="btn" @click="limpar">Limpar filtros</button>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { api } from '../service/api'

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
const cores = {
  'Literatura brasileira': '#8f2f3d',
  'Ficção científica': '#2f5da8',
  Fantasia: '#5f4a8b',
  Ciência: '#1f7a6a',
  Tecnologia: '#b8620f',
  História: '#6b6b25',
  Infantil: '#c0400f',
  Todos: '#1c3b33',
}

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
    cor: cores[nome] || '#444',
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
</script>

<style>
.btn.pri {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--on);
}

#conta {
  margin-left: auto;
}

main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 28px clamp(16px, 4vw, 40px) 64px;
}

h1 {
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  margin-bottom: 8px;
}

.shelf {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  overflow-x: auto;
  padding: 22px 4px 0;
  border-bottom: 10px solid var(--pine);
  margin-bottom: 30px;
}

.spine {
  writing-mode: vertical-rl;
  background: var(--c);
  color: #fff;
  border: 0;
  border-radius: 4px 4px 0 0;
  padding: 14px 11px calc(14px + var(--v, 0px));
  font: 600 0.95rem/1 var(--serif);
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
  box-shadow: 0 0 0 2px var(--ink);
}

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

.filtros {
  display: grid;
  gap: 16px;
}

.filtros label {
  display: grid;
  gap: 4px;
  font-weight: 500;
  font-size: 0.9rem;
}

.filtros .chk {
  display: flex;
  gap: 8px;
  align-items: center;
}

.chk input {
  width: 18px;
  height: 18px;
  accent-color: var(--accent);
}

.topo {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 18px;
}

.topo p {
  margin: 0;
  color: var(--muted);
}

.livros {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 26px 20px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.card {
  background: none;
  border: 0;
  padding: 0;
  text-align: left;
  display: grid;
  gap: 8px;
  width: 100%;
  align-content: start;
}

.cover {
  aspect-ratio: 2/3;
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0 6%, rgba(255, 255, 255, 0.14) 6% 7%, transparent 7%),
    var(--c);
  color: #fff;
  padding: 16% 9% 9% 17%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 2px 5px 5px 2px;
  box-shadow: 3px 4px 0 rgba(0, 0, 0, 0.2);
  transition: transform 0.15s;
}

.cover::after {
  content: '';
  position: absolute;
  left: 7%;
  right: 0;
  bottom: calc(22% + var(--p, 0) * 5%);
  height: 2px;
  background: rgba(255, 255, 255, 0.45);
}

.cover strong {
  font: 600 clamp(0.9rem, 2vw, 1.1rem) / 1.15 var(--serif);
}

.cover span {
  font-size: 0.72rem;
  opacity: 0.92;
}

.card:hover .cover {
  transform: translateY(-4px);
}
</style>