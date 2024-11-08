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

            // Remove o card do DOM
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
