<script>
  import cavaloSvg from "./assets/cavalinho.svg";
  import { compareArrays } from "./lib/util";
  let tamanho = 8;
  let tabuleiro = [];
  let cavalo = [];

  // Movimentos possíveis de um cavalo no tabuleiro
  const movimentosCavalo = [
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
  ];

  function gerarTabuleiro(tamanho) {
    for (let y = 0; y < tamanho; y++) {
      if (tabuleiro[y] === undefined) {
        tabuleiro[y] = [];
        cavalo[y] = [];
      }
      for (let x = 0; x < tamanho; x++) {
        tabuleiro[y][x] = [y, x];
        cavalo[y][x] = null;
      }
    }

    cavalo[0][0] = 0;

    console.table(cavalo);
  }

  function limparTabuleiro() {
    tabuleiro = [];
  }

  // Função para verificar se uma posição está dentro dos limites do tabuleiro
  function posicaoValida(linha, coluna) {
    return linha >= 0 && linha < 8 && coluna >= 0 && coluna < 8;
  }

  // Função para realizar a busca em largura para o caminho do cavalo
  function caminhosCavalo(posicaoInicial, posicaoFinal) {
    const fila = [[posicaoInicial]]; // Fila com o caminho inicial
    const visitados = new Set(); // Conjunto para manter registro das posições visitadas

    while (fila.length > 0) {
      const caminho = fila.shift(); // Remover o próximo caminho da fila
      const posicaoAtual = caminho[caminho.length - 1]; // Obter a posição atual

      // Verificar se a posição atual é o destino
      if (
        posicaoAtual[0] === posicaoFinal[0] &&
        posicaoAtual[1] === posicaoFinal[1]
      ) {
        return caminho; // Retornar o caminho encontrado
      }

      // Marcar a posição atual como visitada
      visitados.add(`${posicaoAtual[0]},${posicaoAtual[1]}`);

      // Explorar os movimentos possíveis do cavalo
      for (const movimento of movimentosCavalo) {
        const novaLinha = posicaoAtual[0] + movimento[0];
        const novaColuna = posicaoAtual[1] + movimento[1];

        // Verificar se a nova posição é válida e não foi visitada
        if (
          posicaoValida(novaLinha, novaColuna) &&
          !visitados.has(`${novaLinha},${novaColuna}`)
        ) {
          fila.push([...caminho, [novaLinha, novaColuna]]); // Adicionar o novo caminho à fila
        }
      }
    }

    return null; // Retornar null se nenhum caminho for encontrado
  }

  // Exemplo de uso
  const posicaoInicial = [0, 0]; // Posição inicial do cavalo (linha, coluna)
  const posicaoFinal = [0, 1]; // Posição final desejada

  const caminho = caminhosCavalo(posicaoInicial, posicaoFinal);

  if (caminho) {
    console.log(
      "Caminho encontrado:",
      caminho.find((c) => compareArrays(c, [0, 0])),
    );
  } else {
    console.log("Não foi possível encontrar um caminho válido.");
  }
</script>

<main class="flex flex-col items-center justify-center h-screen">
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
      {#each tabuleiro as largura, y}
        <div class="flex flex-row">
          {#each largura as _, x}
            <div
              class="w-10 h-10 border relative border border-blue-200"
              class:bg-green-500={caminho.find((c) => compareArrays(c, [x, y]))}
            >
              <span class="font-mono text-xs absolute top-0 left-0">
                {y}-{x}
              </span>
              {#if cavalo[y][x] !== null}
                <img
                  src={cavaloSvg}
                  alt=""
                  class="absolute bottom-1 right-2 h-6 w-6"
                />
              {/if}
            </div>
          {/each}
        </div>
      {/each}
    </div>
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
