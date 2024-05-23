**LINK DO VÍDEO APRESENTAÇÃO**: [https://youtu.be/TvH5I3FTds0](https://youtu.be/TvH5I3FTds0)

**LINK DO PROJETO PUBLICADO**: [https://cavalo-no-xadrez.web.app/](https://cavalo-no-xadrez.web.app/)


## Introdução do problema:
O problema do "Cavalo de Xadrez" é um famoso desafio envolvendo a movimentação do cavalo no tabuleiro de xadrez. O objetivo é encontrar um caminho que visite todas as casas do tabuleiro exatamente uma vez, começando de uma casa inicial escolhida pelo usuário.
Esse problema é um exemplo clássico de problemas de percurso, amplamente estudado na teoria dos grafos e na computação. Apesar de parecer simples, encontrar uma solução eficiente para tabuleiros maiores pode ser um desafio computacional significativo.
A solução proposta neste código utiliza uma heurística gulosa conhecida como a "Regra de Warnsdorff" ou "Algoritmo das Casas Mais Próximas". Essa abordagem foi proposta por H. C. Warnsdorff, um mestre de xadrez alemão do século XIX, e é uma das heurísticas mais populares e eficientes para resolver o problema do Cavalo de Xadrez.
A Regra de Warnsdorff segue o princípio de que, em cada movimento, o cavalo deve ir para a casa que tenha o menor número de casas adjacentes acessíveis a partir dela. Essa abordagem busca minimizar as possibilidades de ficar "preso" em um beco sem saída, maximizando as chances de encontrar uma solução completa para o problema.

## Heurística utilizada:
A heurística utilizada nesta solução é baseada no algoritmo de Warnsdorff, também conhecido como a regra das casas mais próximas. Essa abordagem segue o princípio de que, em cada movimento, o cavalo deve ir para a casa que tenha o menor número de casas adjacentes acessíveis a partir dela.
O algoritmo funciona da seguinte maneira:

- Inicia-se a partir da casa escolhida pelo usuário.
- Em cada passo, calcula-se todas as casas acessíveis a partir da posição atual do cavalo.
- Para cada casa acessível, conta-se quantas casas vazias estão adjacentes a ela.
- O próximo movimento é feito para a casa que tiver o menor número de casas adjacentes vazias.
- Caso haja empate, escolhe-se uma das casas empatadas aleatoriamente.
- O processo é repetido até que todas as casas sejam visitadas ou até que não haja mais movimentos possíveis.

Essa heurística é eficiente porque tende a evitar que o cavalo fique "preso" em situações sem saída, maximizando as chances de encontrar uma solução completa para o problema.

## Explicação da implementação no código:
O código implementa a heurística descrita anteriormente utilizando a linguagem de programação JavaScript e o framework Svelte para a interface de usuário.
Inicialmente, o usuário informa o tamanho do tabuleiro desejado, e o programa gera uma matriz bidimensional representando o tabuleiro. Em seguida, o usuário escolhe a casa inicial clicando em uma das casas vazias.
A função calculaCaminho é responsável por implementar a heurística. Ela verifica se todas as casas foram visitadas e, caso contrário, calcula as posições possíveis a partir da posição atual do cavalo usando a função caminhosPossiveis. Em seguida, para cada posição possível, conta-se quantas casas vazias estão adjacentes a ela.
A função findMinIndex é usada para encontrar o índice da posição com o menor número de casas adjacentes vazias. Essa posição é selecionada como o próximo movimento do cavalo, e o processo é repetido até que todas as casas sejam visitadas ou não haja mais movimentos possíveis.
O código também inclui recursos adicionais, como botões para pausar, continuar e limpar o tabuleiro, além de uma visualização animada do caminho percorrido pelo cavalo.
Com essa implementação, o programa é capaz de resolver eficientemente o problema do "Cavalo de Xadrez" para tabuleiros de diferentes tamanhos, utilizando a heurística gulosa baseada no algoritmo de Warnsdorff.
