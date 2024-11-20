// Função para obter os materiais do localStorage
function obterEstoque() {
    const estoque = localStorage.getItem("estoque");
    return estoque ? JSON.parse(estoque) : [];
}

// Função para salvar os materiais no localStorage
function salvarEstoque(estoque) {
    localStorage.setItem("estoque", JSON.stringify(estoque));
}

// Função para renderizar a tabela de materiais
function renderizarEstoque() {
    const estoque = obterEstoque();
    const tableBody = document.querySelector("#estoque-table tbody");
    tableBody.innerHTML = "";

    estoque.forEach((material, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${material.nome}</td>
            <td>${material.quantidade}</td>
            <td><button onclick="removerMaterial(${index})">Remover</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para adicionar material ao estoque
function adicionarMaterial() {
    const nome = document.getElementById("nome-material").value;
    const quantidade = parseInt(document.getElementById("quantidade-material").value);

    if (nome && !isNaN(quantidade)) {
        const estoque = obterEstoque();
        estoque.push({ nome, quantidade });
        salvarEstoque(estoque);
        renderizarEstoque();
        alert("Material adicionado com sucesso!");
    } else {
        alert("Preencha todos os campos corretamente.");
    }
}

// Função para movimentar o estoque (entrada/saída)
function movimentarEstoque() {
    const id = parseInt(document.getElementById("id-material").value) - 1;
    const tipo = document.getElementById("tipo-movimentacao").value;
    const quantidade = parseInt(document.getElementById("quantidade-movimentacao").value);

    const estoque = obterEstoque();

    if (id >= 0 && id < estoque.length && !isNaN(quantidade) && quantidade > 0) {
        const material = estoque[id];

        if (tipo === "entrada") {
            material.quantidade += quantidade;
            alert("Entrada de material realizada.");
        } else if (tipo === "saida" && material.quantidade >= quantidade) {
            material.quantidade -= quantidade;
            alert("Saída de material realizada.");
        } else {
            alert("Erro: Quantidade insuficiente para saída.");
            return;
        }

        salvarEstoque(estoque);
        renderizarEstoque();
    } else {
        alert("ID ou quantidade inválidos.");
    }
}

// Função para remover um material do estoque
function removerMaterial(index) {
    const estoque = obterEstoque();

    // Remove o material da lista
    estoque.splice(index, 1);

    // Salva o estoque atualizado no localStorage
    salvarEstoque(estoque);

    // Atualiza a tabela exibida
    renderizarEstoque();
}

// Inicializa o sistema
renderizarEstoque();
