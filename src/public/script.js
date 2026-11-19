const API_URL = '/transacoes';

document.addEventListener('DOMContentLoaded', () => {
    carregarDadosFinanceiros();

    const form = document.getElementById('transacaoForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await cadastrarTransacao();
    });
});

async function carregarDadosFinanceiros() {
    try {
        const response = await fetch(API_URL);
        const dados = await response.json();

        document.getElementById('saldoTotal').innerText = `R$ ${dados.metricas.saldoTotal.toFixed(2)}`;
        document.getElementById('totalDespesas').innerText = `R$ ${dados.metricas.totalDespesas.toFixed(2)}`;
        document.getElementById('totalGastoImpulso').innerText = `R$ ${dados.metricas.totalGastolmpulso.toFixed(2)}`;

        const tbody = document.getElementById('tabelaHistorico');
        tbody.innerHTML = '';

        dados.historico.forEach(t => {
            const tr = document.createElement('tr');
            const dataFormatada = new Date(t.createdAt || Date.now()).toLocaleDateString('pt-BR');
            
            tr.innerHTML = `
                <td>${dataFormatada}</td>
                <td>${t.descricao}</td>
                <td>${t.categoria}</td>
                <td>${t.tipo}</td>
                <td>R$ ${t.valor.toFixed(2)}</td>
                <td>${t.consumoConsciente ? 'Sim' : 'Não'}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert('Erro ao conectar com a API.');
    }
}

async function cadastrarTransacao() {
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const tipo = document.getElementById('tipo').value;
    const categoria = document.getElementById('categoria').value;
    const consumoConsciente = document.getElementById('consumoConsciente').checked;

    const novaTransacao = {
        descricao,
        valor,
        tipo,
        categoria,
        consumoConsciente
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novaTransacao)
        });

        if (response.ok) {
            document.getElementById('transacaoForm').reset();
            document.getElementById('consumoConsciente').checked = true;
            carregarDadosFinanceiros();
        } else {
            alert('Erro ao salvar transação.');
        }
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        alert('Erro de conexão ao salvar.');
    }
}
