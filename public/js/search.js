document.getElementById('form-busca').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const queryString = new URLSearchParams(formData).toString();

    try {
        const response = await fetch(`/animais/busca?${queryString}`, {
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            const animais = await response.json();
            const resultadosDiv = document.getElementById('resultados');

            resultadosDiv.innerHTML = `
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    ${animais.map(animal => `
                        <div class="col">
                            <div class="card h-100">
                                ${animal.Foto ? `<img src="${animal.Foto}" class="card-img-top" alt="${animal.Nome}">` : ''}
                                <div class="card-body">
                                    <h5 class="card-title">${animal.Nome}</h5>
                                    <p class="card-text">
                                        <strong>Idade:</strong> ${animal.Idade} anos<br>
                                        <strong>Raça:</strong> ${animal.Raca}<br>
                                        <strong>Status:</strong> ${animal.Status}<br>
                                        <strong>Localização:</strong> ${animal.Localizacao}
                                    </p>
                                </div>
                                <div class="card-footer text-center">
                                    <a href="/animais/detalhes/${animal.AnimalID}" class="btn btn-outline-primary">Ver Detalhes</a>
                                    ${animal.isOwner ? `
                                        <a href="/animais/editar/${animal.AnimalID}" class="btn btn-outline-primary">Editar</a>
                                        <button onclick="excluirAnimal(${animal.AnimalID})" class="btn btn-danger">Excluir</button>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            console.error('Erro na resposta da busca:', response.status);
        }
    } catch (error) {
        console.error('Erro ao buscar animais:', error);
    }
});