// Função para limpar campos de uma seção específica
function limparCamposSeletor(seletor) {
    const inputs = document.querySelectorAll(`${seletor} input, ${seletor} select, ${seletor} textarea`);
    inputs.forEach(input => {
      if (input.type === 'checkbox' || input.type === 'radio') {
        input.checked = false;
      } else {
        input.value = '';
      }
    });
  }
  
// Modifique a função de exibição dos campos específicos para também limpar os campos ocultos
function exibirCamposEspecificos() {
  const situacao = document.getElementById("situacao").value;

  document.getElementById("camposAdocao").style.display = "none";
  document.getElementById("camposTutor").style.display = "none";
  document.getElementById("camposPerdido").style.display = "none";

  // Limpa campos quando a situação muda para garantir que apenas os campos visíveis mantenham dados
  if (situacao === "Para Adocao") {
    document.getElementById("camposAdocao").style.display = "block";
    limparCamposSeletor("#camposTutor");
    limparCamposSeletor("#camposPerdido");
  } else if (situacao === "Procurando Tutor") {
    document.getElementById("camposTutor").style.display = "block";
    limparCamposSeletor("#camposAdocao");
    limparCamposSeletor("#camposPerdido");
  } else if (situacao === "Perdido") {
    document.getElementById("camposPerdido").style.display = "block";
    limparCamposSeletor("#camposAdocao");
    limparCamposSeletor("#camposTutor");
  }
}
