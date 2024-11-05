async function excluirAnimal(id) {
    const confirmacao = confirm("Tem certeza que deseja excluir este animal?");
    if (confirmacao) {
        try {
            const response = await fetch(`/animais/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                alert("Animal excluído com sucesso!");
                location.reload();
            } else {
                alert("Erro ao excluir o animal.");
            }
        } catch (error) {
            console.error("Erro ao excluir animal:", error);
            alert("Erro ao excluir o animal.");
        }
    }
}