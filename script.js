const cardContainer = document.querySelector(".card-container");
const campoBusca = document.querySelector("header input");
let dados = [];

// Função para carregar os dados do JSON e renderizar na tela
async function carregarConteudo() {
    if (dados.length === 0) {
        try {
            const resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (error) {
            console.error("Falha ao buscar dados:", error);
            cardContainer.innerHTML = "<p>Não foi possível carregar os dados. Tente novamente mais tarde.</p>";
            return;
        }
    }
    renderizarCards(dados); // Renderiza todos os cards inicialmente
}

// Função para filtrar e renderizar os dados com base na busca
function iniciarBusca() {
    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca) ||
        dado.subtitulo.toLowerCase().includes(termoBusca)
    );

    renderizarCards(dadosFiltrados);
}

// Função que cria os elementos HTML para cada item
function renderizarCards(dadosParaRenderizar) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes
    dadosParaRenderizar.forEach(dado => {
        const accordionItem = document.createElement("div");
        accordionItem.className = "accordion-item";

        accordionItem.innerHTML = `
            <div class="accordion-header">
                <h2>${dado.nome}</h2>
                <span class="accordion-icon">+</span>
            </div>
            <div class="accordion-content">
                <h3>${dado.subtitulo}</h3>
                <p>${dado.descricao}</p>
                <div class="recurso">
                    <strong>Recurso Recomendado (${dado.recurso_complementar.tipo}):</strong>
                    <a href="${dado.recurso_complementar.link}" target="_blank">${dado.recurso_complementar.titulo}</a>
                </div>
            </div>
        `;

        // Adiciona o evento de clique para abrir/fechar o accordion
        const header = accordionItem.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            accordionItem.classList.toggle('active');
        });

        cardContainer.appendChild(accordionItem);
    });
}

// Carrega o conteúdo assim que o DOM estiver pronto
document.addEventListener("DOMContentLoaded", carregarConteudo);