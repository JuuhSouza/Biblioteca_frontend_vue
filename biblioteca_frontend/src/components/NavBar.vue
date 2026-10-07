<template>
    <header>
        <div class="brand">Biblioteca</div>
        <input class="search" id="q" type="search" placeholder="Buscar por título ou autor" aria-label="Buscar livros">
        <nav>
            <button class="tab" data-view="cat" aria-selected="true">Catálogo</button>
            <button class="tab" data-view="col" aria-selected="false">Minhas coleções</button>
        </nav>
        <span id="conta"></span>
    </header>
</template>

<script>

</script>

<style>
.brand{
    font:600 1.6rem var(--serif)
}

.search{
    flex:1 1 240px;
    max-width:420px;
}

button,
input,
select{
    font:inherit;
}button{
    cursor:pointer
}
:focus-visible{
    outline:2px solid var(--accent);
    outline-offset:2px
}
h1,
h2{
    font-family:var(--serif);
    font-weight:600;
    margin:0;
    line-height:1.15
}
header{
    position:sticky;
    z-index:5;
    background:var(--bg);
    border-bottom:1px solid var(--line);
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    gap:10px 22px;
    padding:12px 3rem;
}

input[type=search],input[type=email],input[type=password],input[type=text],
select{
    width:100%;
    padding:9px 12px;
    border:1px solid var(--line);
    border-radius:6px;
    background:var(--surface)
}

.tab{
    background:none;
    border:0;
    border-bottom:2px solid transparent;
    padding:6px 2px;
    font-weight:500;
    color:var(--muted)
}
.tab[aria-selected=true]{
    color:var(--ink);
    border-color:var(--accent)
}
nav{
    display:flex;
    gap:20px
}
</style>