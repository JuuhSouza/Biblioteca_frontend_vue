const LIVROS = [
    {
        id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis', editora: 'Penguin', ano: 1899, assunto: 'Literatura brasileira', disponivel: true
    },
    {
        id: 2, titulo: 'Vidas Secas', autor: 'Graciliano Ramos', editora: 'Record', ano: 1938, assunto: 'Literatura brasileira', disponivel: false
    },
    {
        id: 3, titulo: 'Duna', autor: 'Frank Herbert', editora: 'Aleph', ano: 1965, assunto: 'Ficção científica', disponivel: true
    },
    {
        id: 4, titulo: 'O Hobbit', autor: 'J.R.R. Tolkien', editora: 'HarperCollins', ano: 1937, assunto: 'Fantasia', disponivel: true
    },
]

export const api = {
    listarLivros: () => Promise.resolve(LIVROS),
}

/*
const BASE = 'https://sua-api.com'

export const api = {
  async listarLivros() {
    const res = await fetch(`${BASE}/livros`)
    if (!res.ok) throw new Error(`Erro ${res.status}`)
    return res.json()
  },
}
*/