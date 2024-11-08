// async function excluirAnimal(id) {
//     const confirmacao = confirm("Tem certeza que deseja excluir este animal?");
//     if (confirmacao) {
//         try {
//             const response = await fetch(`/animais/${id}`, {
//                 method: "DELETE"
//             });
//             if (response.ok) {
//                 alert("Animal excluído com sucesso!");
//                 const card = document.querySelector(`.card[data-id="${id}"]`);
//                 if (card) card.remove();
//             } else if (response.status === 403) {
//                 const data = await response.json();
//                 alert(data.mensagemErro || "Acesso negado.");
//             } else {
//                 alert("Erro ao excluir o animal. Tente novamente.");
//             }
//         } catch (error) {
//             console.error("Erro ao excluir animal:", error);
//             alert("Erro ao excluir o animal. Verifique o console para mais detalhes.");
//         }
//     }
// }

// async function excluirAnimal(id) {
//     if (confirm("Tem certeza que deseja excluir este animal?")) {
//         fetch(`/animais/${id}`, { method: "DELETE" })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.success) location.reload();
//                 else alert("Erro ao excluir o animal");
//             })
//             .catch(error => console.error("Erro:", error));
//     }
// }

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
