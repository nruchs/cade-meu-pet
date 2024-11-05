function exibirCamposEspecificos() {
    const situacao = document.getElementById("situacao").value;
    const camposAdocao = document.getElementById("camposAdocao");
    const camposPerdido = document.getElementById("camposPerdido");
    const camposTutor = document.getElementById("camposTutor");
    

    camposAdocao.style.display = situacao === "Para Adocao" ? "block" : "none";
    camposPerdido.style.display = situacao === "Perdido" ? "block" : "none";
    camposTutor.style.display = situacao === "Procurando Tutor" ? "block" : "none";
}

window.onload = exibirCamposEspecificos;

document.getElementById('recompensa').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Remove qualquer caractere não-numérico
    value = (parseFloat(value) / 100).toFixed(2); // Divide por 100 para o formato de moeda
    e.target.value = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value); // Formata como moeda BRL
});