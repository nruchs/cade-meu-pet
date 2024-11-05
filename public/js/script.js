async function excluirAnimal(id) {
    const confirmacao = confirm("Tem certeza que deseja excluir este animal?");
    if (confirmacao) {
        try {
            const response = await fetch(`/animais/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                alert("Animal excluído com sucesso!");
                const card = document.querySelector(`.animal-card[data-id="${id}"]`);
                if (card) card.remove();
            } else if (response.status === 403) {
                const data = await response.json();
                alert(data.mensagemErro || "Acesso negado.");
            } else {
                alert("Erro ao excluir o animal. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao excluir animal:", error);
            alert("Erro ao excluir o animal. Verifique o console para mais detalhes.");
        }
    }
}
