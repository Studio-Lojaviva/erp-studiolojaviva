// Função para carregar dados do cliente
async function carregarCliente(idCliente) {
  try {
    const resposta = await fetch('clientes.json');
    const clientes = await resposta.json();

    const cliente = clientes.find(c => c.id === idCliente);

    if (cliente) {
      document.querySelector('header h1').innerText = `Cliente: ${cliente.nome}`;
      document.querySelector('header p').innerText = `Projeto: ${cliente.projeto}`;
      document.querySelector('.status').innerText = cliente.status;
      document.getElementById('horas').value = cliente.horasEstimadas;
      document.getElementById('valorHora').value = cliente.valorHora;
      document.querySelector('textarea[rows="5"]').value = cliente.briefing;

      if (cliente.orcamentoAceito) {
        document.getElementById('orcamentoFinal').innerText = `✅ Orçamento já aprovado`;
        document.getElementById('orcamentoFinal').style.color = '#003C61';
      }
    } else {
      alert('Cliente não encontrado.');
    }
  } catch (erro) {
    console.error('Erro ao carregar cliente:', erro);
  }
}

// Função de cálculo de orçamento
function calcularOrcamento() {
  const horas = parseFloat(document.getElementById('horas').value);
  const valorHora = parseFloat(document.getElementById('valorHora').value);
  const resultado = document.getElementById('orcamentoFinal');

  if (!isNaN(horas) && !isNaN(valorHora)) {
    const total = horas * valorHora;
    resultado.innerText = `💰 Orçamento estimado: R$ ${total.toFixed(2)}`;
    resultado.style.color = '#003C61';
    resultado.style.fontWeight = 'bold';
  } else {
    resultado.innerText = '⚠️ Preencha os campos corretamente.';
    resultado.style.color = '#D15A45';
    resultado.style.fontWeight = 'bold';
  }
}

// Chamar a função ao carregar a página
carregarCliente("001"); // Aqui você pode trocar o ID conforme o cliente
