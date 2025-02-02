// Lista para armazenar os dados dos alunos
const listaEstudantes = [];

// Referências aos elementos do DOM
const form = document.getElementById("form");
const nomeInput = document.getElementById("nome");
const notasInput = document.getElementById("notas");
const resultDiv = document.getElementById("result");
const verMediaButton = document.getElementById("verMedia");

// Função para validar notas
function validarNotas(notas) {
    return !notas.some(nota => nota > 10 || nota < 0);
}

// Evento para adicionar um estudante
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const notas = notasInput.value.trim().split(",").map(Number);

    // Validações
    if (!nome || notas.some(isNaN)) {
        alert("Por favor, insira um nome válido e notas numéricas separadas por vírgula.");
        return;
    }

    // Nova validação para notas maiores que 10
    if (!validarNotas(notas)) {
        alert("As notas devem estar entre 0 e 10.");
        return;
    }

    // Adiciona o estudante à lista
    listaEstudantes.push({ nome, notas });

    // Limpa os campos de entrada
    nomeInput.value = "";
    notasInput.value = "";

    alert(`Estudante ${nome} adicionado com sucesso!`);
});

// Evento para exibir a lista de médias
verMediaButton.addEventListener("click", function () {
    if (listaEstudantes.length === 0) {
        alert("Nenhum estudante foi adicionado ainda!");
        return;
    }

    // Calcula os resultados
    const resultados = calcularResultados(listaEstudantes);

    // Exibe os resultados
    exibirResultados(resultados);
});

// Função para calcular médias e status
function calcularResultados(estudantes) {
    return estudantes.map(estudante => {
        const soma = estudante.notas.reduce((acc, nota) => acc + nota, 0);
        const media = soma / estudante.notas.length;
        const status = media >= 6 ? "Aprovado" : "Reprovado";
        return { nome: estudante.nome, media: media.toFixed(2), status };
    });
}

// Função para exibir os resultados na tabela
function exibirResultados(resultados) {
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Média</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                ${resultados.map(r => `
                    <tr>
                        <td>${r.nome}</td>
                        <td>${r.media}</td>
                        <td>${r.status}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}
