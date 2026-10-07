import { ref, computed } from 'vue'

function ler(chave, padrao) {
    try {
        const bruto = localStorage.getItem(chave)
        return bruto ? JSON.parse(bruto) : padrao
    } catch {
        return padrao
    }
}

function gravar(chave, valor) {
    try {
        localStorage.setItem(chave, JSON.stringify(valor))
    } catch {
        /* sem storage disponível: segue só em memória */
    }
}

// Declarados FORA da função: todos os componentes compartilham o mesmo estado
const usuario = ref(ler('usuario', null))
const colecao = ref(ler('colecao', [])) // ids dos livros salvos

export function useSessao() {
    const logado = computed(() => usuario.value !== null)

    // Login de mentira, só para o fluxo funcionar. Troque por chamada à sua API.
    function entrar(nome) {
        usuario.value = { nome }
        gravar('usuario', usuario.value)
    }

    function sair() {
        usuario.value = null
        gravar('usuario', null)
    }

    const estaNaColecao = (id) => colecao.value.includes(id)

    function alternarColecao(id) {
        colecao.value = estaNaColecao(id)
            ? colecao.value.filter((x) => x !== id)
            : [...colecao.value, id]
        gravar('colecao', colecao.value)
    }

    return { usuario, logado, entrar, sair, colecao, estaNaColecao, alternarColecao }
}