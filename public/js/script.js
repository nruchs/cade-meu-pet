async function excluirAnimal(animalId) {
    if (!confirm("Tem certeza de que deseja excluir este animal?")) return;

    try {
        const response = await fetch(`/animais/${animalId}`, {
            method: 'DELETE',
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.mensagemSucesso || "Animal excluído com sucesso!");

            const animalCard = document.getElementById(`animal-card-${animalId}`);
            if (animalCard) {
                animalCard.remove();
            }
        } else {
            const errorData = await response.json();
            alert(errorData.mensagemErro || "Erro ao excluir o animal.");
        }
    } catch (error) {
        console.error("Erro ao excluir o animal:", error);
        alert("Erro ao excluir o animal.");
    }
}

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

window.onload = exibirCamposEspecificos;

const recompensaInput = document.getElementById('recompensa');
recompensaInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = (parseFloat(value) / 100).toFixed(2);
    e.target.value = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
});

document.getElementById('form-cadastro').addEventListener('submit', function () {
    const rawValue = recompensaInput.value.replace(/[R$\s.]/g, '').replace(',', '.');
    recompensaInput.value = rawValue;
});
