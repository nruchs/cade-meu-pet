// document.getElementById('form-busca').addEventListener('submit', async function (e) {
//     e.preventDefault();

//     const formData = new FormData(e.target);
//     const queryString = new URLSearchParams(formData).toString();

//     try {
//         const response = await fetch(`/animais/busca?${queryString}`, {
//             headers: { 'Accept': 'application/json' }
//         });

//         if (response.ok) {
//             const animais = await response.json();
//             const resultadosDiv = document.getElementById('resultados');

//             if (!resultadosDiv) {
//                 console.error("Elemento 'resultados' não encontrado.");
//                 return;
//             }

//             resultadosDiv.innerHTML = ""; // Limpa os resultados anteriores

//             animais.forEach(animal => {
//                 const cardHTML = `
//                     <div class="col">
//                         <div class="card h-100 shadow-sm">
//                             ${animal.Foto ? `<img src="${animal.Foto}" class="card-img-top img-fluid" style="object-fit: cover; height: 200px;" alt="${animal.Nome}">` : ''}
//                             <div class="card-body">
//                                 <h5 class="card-title text-center">${animal.Nome}</h5>
//                                 <p class="card-text">
//                                     <strong>Idade:</strong> ${animal.Idade} anos<br>
//                                     <strong>Raça:</strong> ${animal.Raca || "Não especificado"}<br>
//                                     <strong>Status:</strong> ${animal.Status || "Não especificado"}<br>
//                                     <strong>Localização:</strong> ${animal.Localizacao || "Não especificado"}
//                                 </p>
//                             </div>
//                             <div class="card-footer text-center">
//                                 <a href="/animais/detalhes/${animal.AnimalID}" class="btn btn-outline-primary btn-sm">Ver Detalhes</a>
//                                 ${animal.isOwner ? `
//                                     <a href="/animais/editar/${animal.AnimalID}" class="btn btn-outline-primary btn-sm">Editar</a>
//                                     <button onclick="excluirAnimal(${animal.AnimalID})" class="btn btn-danger btn-sm">Excluir</button>
//                                 ` : ''}
//                             </div>
//                         </div>
//                     </div>
//                 `;
//                 resultadosDiv.insertAdjacentHTML('beforeend', cardHTML);
//             });

//             const verMaisButton = `
//                 <div class="d-flex justify-content-center mt-4">
//                     <button id="verMais" class="btn btn-primary" data-offset="6">Ver Mais</button>
//                 </div>
//             `;
//             resultadosDiv.insertAdjacentHTML('beforeend', verMaisButton);

//             document.getElementById('verMais').addEventListener('click', loadMoreAnimals);
//         } else {
//             console.error('Erro na resposta da busca:', response.status);
//         }
//     } catch (error) {
//         console.error('Erro ao buscar animais:', error);
//     }
// });

// async function loadMoreAnimals() {
//     const button = document.getElementById('verMais');
//     const offset = parseInt(button.getAttribute('data-offset')) || 6;
//     const formData = new FormData(document.getElementById('form-busca'));
//     formData.append('offset', offset);

//     try {
//         const response = await fetch(`/animais/busca?${new URLSearchParams(formData).toString()}`, {
//             headers: { 'Accept': 'application/json' }
//         });

//         if (response.ok) {
//             const animais = await response.json();
//             const resultadosDiv = document.getElementById('resultados');

//             animais.forEach(animal => {
//                 const cardHTML = `
//                     <div class="col">
//                         <div class="card h-100 shadow-sm">
//                             ${animal.Foto ? `<img src="${animal.Foto}" class="card-img-top img-fluid" style="object-fit: cover; height: 200px;" alt="${animal.Nome}">` : ''}
//                             <div class="card-body">
//                                 <h5 class="card-title text-center">${animal.Nome}</h5>
//                                 <p class="card-text">
//                                     <strong>Idade:</strong> ${animal.Idade} anos<br>
//                                     <strong>Raça:</strong> ${animal.Raca || "Não especificado"}<br>
//                                     <strong>Status:</strong> ${animal.Status || "Não especificado"}<br>
//                                     <strong>Localização:</strong> ${animal.Localizacao || "Não especificado"}
//                                 </p>
//                             </div>
//                             <div class="card-footer text-center">
//                                 <a href="/animais/detalhes/${animal.AnimalID}" class="btn btn-outline-primary btn-sm">Ver Detalhes</a>
//                                 ${animal.isOwner ? `
//                                     <a href="/animais/editar/${animal.AnimalID}" class="btn btn-outline-primary btn-sm">Editar</a>
//                                     <button onclick="excluirAnimal(${animal.AnimalID})" class="btn btn-danger btn-sm">Excluir</button>
//                                 ` : ''}
//                             </div>
//                         </div>
//                     </div>
//                 `;
//                 resultadosDiv.insertAdjacentHTML('beforeend', cardHTML);
//             });

//             // Atualiza o offset para o próximo clique
//             button.setAttribute('data-offset', offset + 6);

//             // Esconde o botão se menos de 6 animais foram retornados
//             if (animais.length < 6) {
//                 button.style.display = 'none';
//             }
//         }
//     } catch (error) {
//         console.error("Erro ao carregar mais animais:", error);
//     }
// }

////////////////////////


// document.getElementById('form-busca').addEventListener('submit', async function (e) {
//     e.preventDefault();

//     const formData = new FormData(e.target);
//     const queryString = new URLSearchParams(formData).toString();

//     try {
//         const response = await fetch(`/animais/busca?${queryString}`, {
//             headers: { 'Accept': 'application/json' }
//         });

//         if (response.ok) {
//             const animais = await response.json();
//             const resultadosDiv = document.getElementById('resultados');

//             if (!resultadosDiv) {
//                 console.error("Elemento 'resultados' não encontrado.");
//                 return;
//             }

//             // Limpa os resultados anteriores e adiciona a estrutura inicial
//             resultadosDiv.innerHTML = `
//                 <div id="animais-container" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//                     ${animais.map(animal => renderAnimalCard(animal)).join('')}
//                 <div class="d-flex justify-content-center mt-4">
//                     <button id="verMais" class="btn btn-primary" data-offset="6">Ver Mais</button>
//                 </div>
//             `;

//             // Adiciona evento ao botão "Ver Mais"
//             document.getElementById('verMais').addEventListener('click', loadMoreAnimals);
//         } else {
//             console.error('Erro na resposta da busca:', response.status);
//         }
//     } catch (error) {
//         console.error('Erro ao buscar animais:', error);
//     }
// });

// // Função auxiliar para renderizar um card de animal
// function renderAnimalCard(animal) {
//     return `
//         <div class="col">
//             <div class="card h-100">
//                 ${animal.Foto ? `<img src="${animal.Foto}" class="card-img-top" alt="${animal.Nome}">` : ''}
//                 <div class="card-body">
//                     <h5 class="card-title">${animal.Nome}</h5>
//                     <p class="card-text">
//                         <strong>Idade:</strong> ${animal.Idade} anos<br>
//                         <strong>Raça:</strong> ${animal.Raca}<br>
//                         <strong>Status:</strong> ${animal.Status || 'Não especificado'}<br>
//                         <strong>Localização:</strong> ${animal.Localizacao || 'Não especificado'}
//                     </p>
//                 </div>
//                 <div class="card-footer text-center">
//                     <a href="/animais/detalhes/${animal.AnimalID}" class="btn btn-outline-primary">Ver Detalhes</a>
//                     ${animal.isOwner ? `
//                         <a href="/animais/editar/${animal.AnimalID}" class="btn btn-outline-primary">Editar</a>
//                         <button onclick="excluirAnimal(${animal.AnimalID})" class="btn btn-danger">Excluir</button>
//                     ` : ''}
//                 </div>
//             </div>
//         </div>
//     `;
// }

// // Função para carregar mais animais
// async function loadMoreAnimals() {
//     const button = document.getElementById('verMais');
//     const offset = parseInt(button.getAttribute('data-offset'));

//     const formData = new FormData(document.getElementById('form-busca'));
//     formData.append('offset', offset);

//     try {
//         const response = await fetch(`/animais/busca?${new URLSearchParams(formData).toString()}`, {
//             headers: { 'Accept': 'application/json' }
//         });

//         if (response.ok) {
//             const animais = await response.json();
//             const container = document.getElementById('animais-container');

//             animais.forEach(animal => {
//                 container.insertAdjacentHTML('beforeend', renderAnimalCard(animal));
//             });

//             // Atualiza o offset para o próximo clique
//             button.setAttribute('data-offset', offset + 6);

//             // Esconde o botão se menos de 6 animais foram retornados
//             if (animais.length < 6) {
//                 button.style.display = 'none';
//             }
//         }
//     } catch (error) {
//         console.error("Erro ao carregar mais animais:", error);
//     }
// }

document.getElementById('form-busca').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const queryString = new URLSearchParams(formData).toString();

    try {
        const response = await fetch(`/animais/busca?${queryString}`, {
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            const { animais, hasMore } = await response.json();
            const resultadosDiv = document.getElementById('resultados');
            const verMaisDiv = document.getElementById('ver-mais-container');

            if (!resultadosDiv) {
                console.error("Elemento 'resultados' não encontrado.");
                return;
            }

            resultadosDiv.innerHTML = `
                <div id="animais-container" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    ${animais.map(animal => renderAnimalCard(animal)).join('')}
                </div>
            `;

            if (hasMore) {
                verMaisDiv.innerHTML = `<button id="verMais" class="btn btn-primary" data-offset="6">Ver Mais</button>`;
                document.getElementById('verMais').addEventListener('click', loadMoreAnimals);
            } else {
                verMaisDiv.innerHTML = ''; // Remove o botão se não houver mais animais
            }
        } else {
            console.error('Erro na resposta da busca:', response.status);
        }
    } catch (error) {
        console.error('Erro ao buscar animais:', error);
    }
});


// Função auxiliar para renderizar um card de animal
function renderAnimalCard(animal) {
    return `
        <div class="col">
            <div class="card h-100">
                ${animal.Foto ? `<img src="${animal.Foto}" class="card-img-top" alt="${animal.Nome}">` : ''}
                <div class="card-body">
                    <h5 class="card-title">${animal.Nome}</h5>
                    <p class="card-text">
                        <strong>Idade:</strong> ${animal.Idade} anos<br>
                        <strong>Raça:</strong> ${animal.Raca}<br>
                        <strong>Status:</strong> ${animal.Status}<br>
                        <strong>Localização:</strong> ${animal.Localizacao || 'Não especificado'}
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
    `;
}


// Função para carregar mais animais
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
            const data = await response.json();
            const animais = Array.isArray(data.animais) ? data.animais : []; // Garante que `animais` é uma lista
            const hasMore = data.hasMore || false;

            const resultadosDiv = document.getElementById('animais-container');
            if (!resultadosDiv) {
                console.error("Elemento 'animais-container' não encontrado.");
                return;
            }

            // Adiciona os novos cards ao final do container de resultados
            animais.forEach(animal => {
                const cardHTML = renderAnimalCard(animal);
                resultadosDiv.insertAdjacentHTML('beforeend', cardHTML);
            });

            // Atualiza o offset para o próximo clique
            button.setAttribute('data-offset', offset + 6);

            // Esconde o botão se não houver mais animais
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

