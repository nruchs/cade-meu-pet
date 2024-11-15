document.getElementById('form-busca').addEventListener('submit', async function (e) {
    e.preventDefault();
    loadAnimalsWithFilters();
});

document.getElementById('verMais').addEventListener('click', loadMoreAnimals);

async function loadAnimalsWithFilters() {
    const formData = new FormData(document.getElementById('form-busca'));
    const queryString = new URLSearchParams(formData).toString();

    try {
        const response = await fetch(`/animais/busca?${queryString}`, {
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            const { animais, hasMore } = await response.json();
            const resultadosDiv = document.getElementById('resultados');
            const verMaisDiv = document.getElementById('ver-mais-container');

            resultadosDiv.innerHTML = `
                <div id="animais-container" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    ${animais.map(animal => renderAnimalCard(animal)).join('')}
                </div>
            `;

            if (hasMore) {
                verMaisDiv.innerHTML = `<button id="verMais" class="btn btn-primary" data-offset="6">Ver Mais</button>`;
                document.getElementById('verMais').addEventListener('click', loadMoreAnimals);
            } else {
                verMaisDiv.innerHTML = '';
            }
        } else {
            console.error('Erro na resposta da busca:', response.status);
        }
    } catch (error) {
        console.error('Erro ao buscar animais:', error);
    }
}

async function loadMoreAnimals() {
    const button = document.getElementById('verMais');
    const offset = parseInt(button.getAttribute('data-offset')) || 0;
    const formData = new FormData(document.getElementById('form-busca'));
    formData.append('offset', offset);

    try {
        const response = await fetch(`/animais/busca?${new URLSearchParams(formData).toString()}`, {
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            const { animais, hasMore } = await response.json();
            const resultadosDiv = document.getElementById('animais-container');

            animais.forEach(animal => {
                const cardHTML = renderAnimalCard(animal);
                resultadosDiv.insertAdjacentHTML('beforeend', cardHTML);
            });

            button.setAttribute('data-offset', offset + 6);

            if (!hasMore) {
                button.style.display = 'none';
            }
        } else {
            console.error('Erro na resposta ao carregar mais animais:', response.status);
        }
    } catch (error) {
        console.error("Erro ao carregar mais animais:", error);
    }
}

function renderAnimalCard(animal) {
    return `
        <div class="col" id="animal-card-${animal.AnimalID}">
            <div class="card h-100 shadow-sm">
                ${animal.Foto ? `<img src="${animal.Foto}" class="card-img-top img-fluid" style="object-fit: cover; height: 200px;" alt="${animal.Nome}">` : ''}
                <div class="card-body">
                    <h5 class="card-title text-center">${animal.Nome}</h5>
                    <p class="card-text">
                        <strong>Idade:</strong> ${animal.Idade} anos<br>
                        <strong>Raça:</strong> ${animal.Raca || 'Não especificado'}<br>
                        <strong>Situação:</strong> ${animal.Situacao || 'Não especificado'}<br>
                        <strong>Localização:</strong> ${animal.Localizacao || 'Não especificado'}
                    </p>
                </div>
                <div class="card-footer">
                    <a href="/animais/detalhes/${animal.AnimalID}" class="btn btn-outline-primary">Ver Detalhes</a>
                    ${animal.isOwner ? `
                        <a href="/animais/editar/${animal.AnimalID}" class="btn btn-outline-primary">Editar</a>
                        <button onclick="excluirAnimal(${animal.AnimalID})" class="btn btn-danger">Excluir</button>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}
