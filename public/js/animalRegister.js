function exibirCamposEspecificos() {
    const situacao = document.getElementById("situacao").value;
    const camposAdocao = document.getElementById("camposAdocao");
    const camposPerdido = document.getElementById("camposPerdido");
    const camposTutor = document.getElementById("camposTutor");

    camposAdocao.style.display = situacao === "Para Adoção" ? "block" : "none";
    camposPerdido.style.display = situacao === "Perdido" ? "block" : "none";
    camposTutor.style.display = situacao === "Procurando Tutor" ? "block" : "none";
}

window.onload = exibirCamposEspecificos;


const recompensaInput = document.getElementById('recompensa');

// Formata o valor ao digitar
recompensaInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = (parseFloat(value) / 100).toFixed(2);
    e.target.value = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
});

// Remove a formatação ao enviar o formulário
document.getElementById('form-cadastro').addEventListener('submit', function () {
    const rawValue = recompensaInput.value.replace(/[R$\s.]/g, '').replace(',', '.'); // Remove R$, espaços e ponto decimal, substitui vírgula por ponto
    recompensaInput.value = rawValue; // Atualiza o campo com o valor desformatado antes de enviar
});
