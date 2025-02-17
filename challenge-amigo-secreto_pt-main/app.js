// Array para armazenar os participantes
let participantes = [];

// Função para adicionar um participante à lista
function adicionarAmigo() {
    const nome = document.getElementById("amigo").value.trim(); // Pega o nome do campo de input e remove espaços extras

    // Verifica se o nome é válido e não está duplicado
    if (!nome || participantes.includes(nome)) {
        alert("Nome inválido ou já cadastrado!");
        return;
    }

    // Adiciona o nome à lista de participantes
    participantes.push(nome);
    
    // Atualiza a lista de amigos na tela
    atualizarLista();
    
    // Limpa o campo de input após adicionar
    document.getElementById("amigo").value = '';
}

// Função para atualizar a lista de amigos na tela
function atualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";  // Limpa a lista antes de adicionar novos itens

    // Cria um item de lista para cada participante e adiciona na tela
    participantes.forEach(nome => {
        const item = document.createElement("li");
        item.textContent = nome;
        lista.appendChild(item);
    });
}

// Função para embaralhar o array (algoritmo de Fisher-Yates)
function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
    return array;
}

// Função para sortear os amigos secretos
function sortearAmigo() {
    if (participantes.length < 2) {
        alert("Adicione pelo menos 2 participantes para realizar o sorteio.");
        return;
    }

    // Faz uma cópia da lista de participantes e embaralha
    let sorteio = [...participantes];
    sorteio = embaralharArray(sorteio);
    
    let resultado = {};

    // Garante que ninguém sorteie a si mesmo
    do {
        sorteio = embaralharArray(sorteio);
    } while (sorteio.some((nome, i) => nome === participantes[i])); // Garante que o sorteio não seja auto-referencial

    // Preenche o resultado com os pares de amigo secreto
    participantes.forEach((nome, i) => {
        resultado[nome] = sorteio[i];
    });

    // Exibe o resultado do sorteio
    exibirResultado(resultado);
}

// Função para exibir o resultado do sorteio na tela
function exibirResultado(resultado) {
    const listaResultado = document.getElementById("resultado");
    listaResultado.innerHTML = "";  // Limpa o conteúdo anterior

    // Cria um item de lista para cada par de amigo secreto e exibe
    for (const [amigo, sorteado] of Object.entries(resultado)) {
        const item = document.createElement("li");
        item.textContent = `${amigo} → ${sorteado}`;
        listaResultado.appendChild(item);
    }
}
