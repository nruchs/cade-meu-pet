function limparCamposSeletor(seletor) {
  const inputs = document.querySelectorAll(
    `${seletor} input, ${seletor} select, ${seletor} textarea`
  );
  inputs.forEach((input) => {
    if (input.type === "checkbox" || input.type === "radio") {
      input.checked = false;
    } else {
      input.value = "";
    }
  });
}

function exibirCamposEspecificos() {
  const situacao = document.getElementById("situacao").value;

  document.getElementById("camposAdocao").style.display = "none";
  document.getElementById("camposTutor").style.display = "none";
  document.getElementById("camposPerdido").style.display = "none";

  if (situacao === "Para Adoção") {
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
