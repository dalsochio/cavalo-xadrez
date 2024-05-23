<script>
  import cavaloSvg from "./assets/cavalinho.svg";
  let tamanho = 8;
  let tabuleiro = [];

  // Movimentos possíveis de um cavalo no tabuleiro
  let movimentosCavalo = [
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
  ];

  let caminho = [];
  let loop = true;

  function gerarTabuleiro(tamanho) {
    for (let y = 0; y < tamanho; y++) {
      if (tabuleiro[y] === undefined) {
        tabuleiro[y] = [];
      }
      for (let x = 0; x < tamanho; x++) {
        tabuleiro[y][x] = true;
      }
    }
  }

  function limparTabuleiro() {
    tabuleiro = [];
    caminho = [];
    clearInterval(loop);
    console.clear();
    console.log("Tabuleiro limpo");
  }

  // Função para verificar se uma posição está dentro dos limites do tabuleiro
  function posicaoValida(linha, coluna) {
    return linha >= 0 && linha < tamanho && coluna >= 0 && coluna < tamanho;
  }

  function findMaxIndex(arr) {
    if (arr.length === 0) {
      return -1; // Retorna -1 para array vazia
    }

    let maxIndex = 0;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > arr[maxIndex]) {
        maxIndex = i;
      }
    }

    return maxIndex;
  }

  function findMinIndex(arr) {
    if (arr.length === 0) {
      return -1; // Retorna -1 para array vazia
    }

    let minIndex = 0;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[minIndex]) {
        minIndex = i;
      }
    }

    return minIndex;
  }

  function selecionaInicia(y, x) {
    caminho = [...caminho, [y, x]];

    setTimeout(() => {
      calculaCaminho();
    }, 500);
  }

  function continuar() {
    loop = setTimeout(() => {
      calculaCaminho();
    }, 500);
  }

  function pausar() {
    clearInterval(loop);
    loop = false;
  }

  function calculaCaminho() {
    if (
      tabuleiro.every((largura) => largura.every((altura) => altura === false))
    ) {
      clearInterval(loop);
      loop = false;
      return;
    }

    const posicaoAtual = caminho[caminho.length - 1];
    tabuleiro[posicaoAtual[0]][posicaoAtual[1]] = false;

    let posicoesPossiveis = caminhosPossiveis(posicaoAtual);
    let tamanhoPossibilidadesDasPosicoesPossiveis = posicoesPossiveis.map(
      (posicao) => caminhosPossiveis(posicao).length,
    );
    let indexDaMelhorPosicao = findMinIndex(
      tamanhoPossibilidadesDasPosicoesPossiveis,
    );
    let melhorPosicao = posicoesPossiveis[indexDaMelhorPosicao];
    caminho = [...caminho, melhorPosicao];

    document.querySelector('.sim').scrollIntoView();

    console.clear();
    console.table(tabuleiro);
    console.log("Posição atual:", posicaoAtual);
    console.log(`Posicoes possíveis:`, posicoesPossiveis);
    console.log(
      `Possibilidades das novas posições:`,
      tamanhoPossibilidadesDasPosicoesPossiveis,
    );
    console.log(`Posição com menos possibilidades:`, indexDaMelhorPosicao);
    console.log(`Posição melhor:`, melhorPosicao);

    loop = setTimeout(() => {
      calculaCaminho();
    }, 250);
  }

  function caminhosPossiveis(posicaoAtual) {
    let posicoes = [];
    for (const movimento of movimentosCavalo) {
      const novaLinha = posicaoAtual[0] + movimento[0];
      const novaColuna = posicaoAtual[1] + movimento[1];

      // Verificar se a nova posição é válida e não foi visitada
      if (
        posicaoValida(novaLinha, novaColuna) &&
        tabuleiro[novaLinha][novaColuna] === true
      ) {
        posicoes = [...posicoes, [novaLinha, novaColuna]];
      }
    }
    return posicoes;
  }

</script>

<main class="flex flex-col items-center justify-center min-w-screen max-w-screen min-h-screen max-h-screen overflow-scroll">
  <h1 class="mb-4">Problema problemático do xadrez</h1>
  {#if tabuleiro.length === 0}
    <div class="flex flex-col">
      <label class="flex flex-row gap-2">
        <span>Tamanho:</span>
        <input
          type="number"
          bind:value={tamanho}
          class="border rounded-md px-2 w-14"
        />
      </label>
      <button
        on:click={() => gerarTabuleiro(tamanho)}
        class="bg-blue-300 rounded-md shadow-sm py-1 px-4 w-fit mt-4"
      >
        Gerar tabuleiro
      </button>
    </div>
  {:else}
    <div class="flex flex-col border border-pink-500">
      {#each tabuleiro as altura, y}
        <div class="flex flex-row">
          {#each altura as largura, x}
            {@const visitado = caminho.find((c) => c[0] === y && c[1] === x)}
            {@const visitadoIndex = caminho.findIndex(
              (c) => c[0] === y && c[1] === x,
            )}
            <button
              class="w-10 h-10 border relative border border-blue-200 {caminho.length === 0 ? 'hover:bg-yellow-200' : ''}"
              class:bg-green-200={visitado}
              class:sim={caminho.length > 0 && caminho?.[caminho.length - 1]?.[0] === y && caminho?.[caminho.length - 1]?.[1] === x}
              class:nao={caminho.length > 0 && caminho?.[caminho.length - 1]?.[0] !== y && caminho?.[caminho.length - 1]?.[1] !== x}
              on:click={() => caminho.length === 0 ? selecionaInicia(y ,x) : null}
            >
              <span class="font-mono text-xs absolute top-0 left-0">
                {y}-{x}
              </span>
              {#if caminho.length > 0 && caminho?.[caminho.length - 1]?.[0] === y && caminho?.[caminho.length - 1]?.[1] === x}
                <img
                  src={cavaloSvg}
                  alt=""
                  class="absolute bottom-2 right-3 h-4 w-4"
                />
              {/if}
              <span class="font-mono text-xs absolute bottom-0 right-0"
                >{visitadoIndex !== -1 ? `${visitadoIndex + 1}º` : ""}</span
              >
            </button>
          {/each}
        </div>
      {/each}
    </div>
    <button
      class="bg-blue-300 rounded-md shadow-sm py-1 px-4 w-fit mt-4"
      on:click={() => (loop ? pausar() : continuar())}
    >
      {loop ? "Pausar" : "Continuar"}
    </button>
    <button
      class="bg-blue-300 rounded-md shadow-sm py-1 px-4 w-fit mt-4"
      on:click={limparTabuleiro}
    >
      Novo tabuleiro
    </button>
  {/if}
</main>

<style>
</style>
