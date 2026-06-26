// --- CEP ---
async function buscarCEP() {
    const cep = document.getElementById('input-cep').value.trim();
    const resultado = document.getElementById('resultado-cep');

    if (cep.length !== 8) {
        resultado.innerHTML = '<p class="erro">Digite um CEP com 8 números.</p>';
        return;
    }

    resultado.innerHTML = '<p class="carregando">Buscando...</p>';

    try {
        const resposta = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
        if (!resposta.ok) throw new Error('CEP não encontrado.');
        const dados = await resposta.json();

        resultado.innerHTML = `
            <div class="dado"><span class="label">CEP</span><span>${dados.cep}</span></div>
            <div class="dado"><span class="label">Rua</span><span>${dados.street || '—'}</span></div>
            <div class="dado"><span class="label">Bairro</span><span>${dados.neighborhood || '—'}</span></div>
            <div class="dado"><span class="label">Cidade</span><span>${dados.city}</span></div>
            <div class="dado"><span class="label">Estado</span><span>${dados.state}</span></div>
        `;
    } catch (e) {
        resultado.innerHTML = `<p class="erro">${e.message}</p>`;
    }
}

// --- Feriados ---
async function buscarFeriados() {
    const ano = document.getElementById('input-feriado').value.trim();
    const resultado = document.getElementById('resultado-feriado');

    if (!ano || ano < 2000 || ano > 2100) {
        resultado.innerHTML = '<p class="erro">Digite um ano válido.</p>';
        return;
    }

    resultado.innerHTML = '<p class="carregando">Buscando...</p>';

    try {
        const resposta = await fetch(`https://brasilapi.com.br/api/feriados/v1/${ano}`);
        if (!resposta.ok) throw new Error('Não foi possível buscar os feriados.');
        const dados = await resposta.json();

        const lista = dados.map(f => `
            <div class="dado">
                <span class="label">${f.date}</span>
                <span>${f.name}</span>
            </div>
        `).join('');

        resultado.innerHTML = lista;
    } catch (e) {
        resultado.innerHTML = `<p class="erro">${e.message}</p>`;
    }
}

// --- DDD ---
async function buscarDDD() {
    const ddd = document.getElementById('input-ddd').value.trim();
    const resultado = document.getElementById('resultado-ddd');

    if (ddd.length !== 2 || isNaN(ddd)) {
        resultado.innerHTML = '<p class="erro">Digite um DDD com 2 números.</p>';
        return;
    }

    resultado.innerHTML = '<p class="carregando">Buscando...</p>';

    try {
        const resposta = await fetch(`https://brasilapi.com.br/api/ddd/v1/${ddd}`);
        if (!resposta.ok) throw new Error('DDD não encontrado.');
        const dados = await resposta.json();

        const cidades = dados.cities.slice(0, 8).join(', ');

        resultado.innerHTML = `
            <div class="dado"><span class="label">Estado</span><span>${dados.state}</span></div>
            <div class="dado"><span class="label">Cidades</span><span>${cidades}...</span></div>
        `;
    } catch (e) {
        resultado.innerHTML = `<p class="erro">${e.message}</p>`;
    }
}