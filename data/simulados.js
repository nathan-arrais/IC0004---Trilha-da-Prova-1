/* ==========================================================================
   simulados.js — cinco provas: as três Avaliação 1 reais + duas autorais.

   ORDEM DO ARRAY = ordem de exibição (as reais primeiro):
     S1  Prova 1 de 2026.1   — oficial, transcrita do PDF com gabarito
     S4  Prova 1 de 2025.2   — oficial, transcrita do PDF com gabarito
     S5  Prova 1 de 2025.1   — oficial, transcrita do PDF com gabarito
     S2  Simulado autoral A  — no molde de 2026.1
     S3  Simulado autoral B  — itens mais difíceis

   Os ids NÃO seguem a ordem de exibição de propósito: o progresso vive no
   localStorage sob sim.S2/sim.S3 e respostas por S2Q1…, então renumerar
   faria as respostas das autorais reaparecerem anexadas à prova errada.
   Para mudar a ordem na tela, reordene o array — nunca os ids.

   A estrutura da prova NÃO é fixa entre semestres:
     2026.1  6 questões · 2 / 2 / 2 / 2 / 2 / 1 extra   = 11,0
     2025.2  4 questões · 2 / 2,5 / 2,5 / 3             = 10,0
     2025.1  5 questões · 2 / 2 / 3 / 3 / 1,5 opcional  = 11,5 (teto de 10)

   O que repete nas três (ver a Anatomia em index.html):
     · resolver recorrências dadas (Teorema Mestre + árvore)      3/3
     · analisar pseudocódigo e extrair a recorrência              3/3
     · projetar um algoritmo de divisão e conquista               3/3
     · laços aninhados → somatório                                2/3
   ========================================================================== */

window.SIMULADOS = [

/* ═════════════════════════════════════ SIMULADO 1 — a prova de 2026.1 ═════ */
{
  id: 'S1',
  nome: 'Prova 1 de 2026.1',
  origem: 'Avaliação 01 · 13/04/2026 · Prof. George Lima',
  oficial: true,
  minutos: 100,
  resumo: 'A prova real do semestre anterior, com o gabarito oficial transcrito na íntegra. '
        + 'Faça esta primeiro, cronometrada e sem consulta — ela vale como diagnóstico.',
  observacoes: '<strong>(a)</strong> Limites assintóticos devem ser fornecidos em notação $Θ$. '
             + '<strong>(b)</strong> $⌊x⌋$ fornece o maior inteiro menor ou igual a $x$. '
             + '<strong>(c)</strong> Assuma que $T(1) = T(0) = Θ(1)$ e que cada instrução de um '
             + 'algoritmo executa em $Θ(1)$.',
  questoes: [

  { id: 'S1Q1', n: 1, pts: 2, tema: 'Recorrências',
    e: '<p>Encontre os limites assintóticos para as seguintes recorrências:</p>'
     + '<p>(a) $T(n) = 4T(n/2) + n^2$<br>'
     + '(b) $T(n) = 3T(n/4) + n log n$<br>'
     + '(c) $T(n) = 5T(n/4) + n log n$<br>'
     + '(d) $T(n) = 2T(n−1) + n$</p>',
    gab: [
      '<strong>(a)</strong> $a = 4$, $b = 2$, $f(n) = n^2$. Temos $n^{log_b a} = n^{log_2 4} = n^2$. '
      + 'Como $f(n) = Θ\\p{n^{log_b a}}$, aplicamos o <strong>Caso 2</strong> do Teorema Mestre. '
      + 'Logo $$T(n) = Θ(n^2 log n)$$',
      '<strong>(b)</strong> $a = 3$, $b = 4$, $f(n) = n log n$. Temos '
      + '$n^{log_b a} = n^{log_4 3} ≈ n^{0{,}79}$. Como $f(n) = Ω\\p{n^{log_4 3 + ε}}$, '
      + 'verificamos a regularidade: $3(n/4)log(n/4) ≤ c·n log n$ para $c < 1$ e $n$ grande '
      + '(ex.: $c = 3/4$). Portanto, pelo <strong>Caso 3</strong>, $$T(n) = Θ(n log n)$$',
      '<strong>(c)</strong> $a = 5$, $b = 4$, $f(n) = n log^2 n$. Temos '
      + '$n^{log_b a} = n^{log_4 5} ≈ n^{1{,}16}$. Note que $f(n) = O\\p{n^{log_4 5 − ε}}$ '
      + 'para um $ε > 0$ pequeno, pois o crescimento polinomial $n^{1{,}16}$ domina o '
      + 'crescimento $n^1 log^2 n$. Portanto recai no <strong>Caso 1</strong> do Teorema Mestre. '
      + 'Logo $$T(n) = Θ\\p{n^{log_4 5}}$$'
      + '<p class="xs muted">Nota: o enunciado impresso traz $f(n) = n log n$ e o gabarito '
      + 'escreve $n log^2 n$. Nas duas leituras a conclusão é a mesma — qualquer potência de '
      + '$n$ acima de 1 vence $n·log^k n$ — e a resposta é $Θ(n^{log_4 5})$.</p>',
      '<strong>(d)</strong> O Teorema Mestre <strong>não se aplica</strong>. Pelo método da '
      + 'árvore, constrói-se uma árvore de altura $n$, com $2^{i−1}$ nós para cada nível '
      + '$i = 1, …, n$. Cada nó do nível $i$ tem custo $n − i + 1$. A soma dos nós é'
      + '$$S = \\S{i=1}{n} 2^{i−1}(n − i + 1)$$'
      + 'Para simplificar, multiplicamos $S$ por 2 e subtraímos de $S$, afinal $S = 2S − S$:'
      + '$$S = \\p{\\S{i=1}{n} 2^i(n−i+1)} − \\S{i=1}{n} 2^{i−1}(n−i+1) = 2^n · 1 − 2^0 · n = Θ(2^n)$$'
      + '$$T(n) = Θ(2^n)$$'
    ] },

  { id: 'S1Q2', n: 2, pts: 2, tema: 'Laços aninhados',
    e: '<p>Forneça a complexidade assintótica para o tempo de execução do algoritmo a seguir. '
     + '<strong>Mostre o equacionamento e sua relação com os laços iterativos.</strong></p>'
     + '<pre class="pseudo"><span class="ln"><span class="kw">for</span> i ← 1 <span class="kw">to</span> n <span class="kw">do</span></span>'
     + '<span class="ln">  <span class="kw">for</span> j ← 1 <span class="kw">to</span> i <span class="kw">do</span></span>'
     + '<span class="ln">    k ← 1</span>'
     + '<span class="ln">    <span class="kw">while</span> k &lt; n <span class="kw">do</span></span>'
     + '<span class="ln">      k ← k · 3</span></pre>',
    gab: [
      'O laço <code>while</code> mais interno executa $Θ(log_3 n)$ vezes '
      + '<strong>independentemente de $i$ e $j$</strong> — porque $k$ parte de 1 e é '
      + 'multiplicado por 3 até atingir $n$.',
      'O laço intermediário $j$ executa $i$ vezes. O laço externo $i$ vai de 1 a $n$. '
      + 'A somatória total é:',
      '$$\\S{i=1}{n}\\S{j=1}{i} Θ(log n) = \\S{i=1}{n} i·Θ(log n) = Θ(log n)\\S{i=1}{n} i '
      + '= Θ(log n)·\\f{n(n+1)}{2}$$',
      '$$T(n) = Θ(n^2 log n)$$'
    ] },

  { id: 'S1Q3', n: 3, pts: 2, tema: 'Invariante de laço',
    e: '<p>Considere o algoritmo iterativo abaixo, que soma os elementos de um vetor '
     + '$A[1 … n]$.</p>'
     + '<pre class="pseudo"><span class="ln"><span class="kw">Function</span> <span class="fnn">SomaVetor</span>(A, n):</span>'
     + '<span class="ln">  s ← 0</span>'
     + '<span class="ln">  <span class="kw">for</span> i ← 1 <span class="kw">to</span> n <span class="kw">do</span></span>'
     + '<span class="ln">    s ← s + A[i]</span>'
     + '<span class="ln">  <span class="kw">return</span> s</span></pre>'
     + '<p>Especifique claramente qual é o <strong>Invariante de Laço</strong> para a variável '
     + '$s$ no início de cada iteração $i$ e demonstre a sua corretude através dos passos de '
     + '<strong>Inicialização</strong>, <strong>Manutenção</strong> e <strong>Término</strong>.</p>',
    gab: [
      '<strong>Invariante:</strong> “No início da iteração $i$ do laço <code>for</code>, a '
      + 'variável $s$ contém a soma dos elementos de $A[1 … i−1]$.”',
      '<strong>Inicialização:</strong> antes do laço iniciar ($i = 1$), $s = 0$, o que é a '
      + 'soma de zero elementos (de $A[1 … 0]$), o que representa uma sequência vazia.',
      '<strong>Manutenção:</strong> assumindo que $s = \\S{k=1}{i−1} A[k]$, o passo do laço '
      + 'adiciona $A[i]$ em $s$. Para a próxima iteração ($i+1$), teremos '
      + '$s + A[i] = \\S{k=1}{i−1}A[k] + A[i] = \\S{k=1}{i}A[k]$.',
      '<strong>Término:</strong> o laço encerra quando $i = n+1$. Pelo invariante, $s$ conterá '
      + 'a soma dos elementos $A[1 … n]$, que é exatamente a soma total do vetor, provando a '
      + 'corretude do retorno.'
    ] },

  { id: 'S1Q4', n: 4, pts: 2, tema: 'Ler recursiva de D&C',
    e: '<p>Analise a função recursiva $F$ baseada em divisão e conquista, que recebe um vetor '
     + '$V$ <strong>não ordenado</strong>.</p>'
     + '<pre class="pseudo"><span class="ln"><span class="kw">Function</span> <span class="fnn">F</span>(V, a, b):</span>'
     + '<span class="ln">  <span class="kw">if</span> a = b <span class="kw">then return</span> V[a]</span>'
     + '<span class="ln">  i ← ⌊(a+b)/2⌋</span>'
     + '<span class="ln">  L ← <span class="fnn">F</span>(V, a, i)</span>'
     + '<span class="ln">  R ← <span class="fnn">F</span>(V, i+1, b)</span>'
     + '<span class="ln">  <span class="kw">if</span> L &gt; R <span class="kw">then return</span> L</span>'
     + '<span class="ln">  <span class="kw">else return</span> R</span></pre>'
     + '<p>(a) O que a função $F$ retorna?<br>'
     + '(b) Determine a equação de recorrência do tempo de execução e seu limite assintótico.</p>',
    gab: [
      '<strong>(a)</strong> A função retorna o <strong>valor máximo</strong> presente no vetor '
      + '$V$, comparando as metades recursivamente.',
      '<strong>(b)</strong> A função divide o problema em 2 subproblemas de tamanho $n/2$ e faz '
      + '$O(1)$ operações de comparação no retorno. Recorrência:'
      + '$$T(n) = 2T(n/2) + Θ(1)$$'
      + 'Usando o Teorema Mestre ($a = 2$, $b = 2$, $f(n) = 1$), como '
      + '$n^{log_2 2} = n^1 > f(n)$, caímos no <strong>Caso 1</strong>. Logo'
      + '$$T(n) = Θ(n)$$'
    ] },

  { id: 'S1Q5', n: 5, pts: 2, tema: 'Projetar D&C',
    e: '<p>Um vetor $X$ de $n$ elementos distintos é dito <strong>unimodal</strong> se ele '
     + 'cresce estritamente até um ponto máximo (pico) e depois decresce estritamente. '
     + 'Exemplo: $[1, 3, 7, 15, 9, 4, 2]$.</p>'
     + '<p>Descreva um algoritmo eficiente de <strong>Divisão e Conquista</strong> para '
     + 'encontrar o valor máximo deste vetor. Indique a recorrência do seu algoritmo e o seu '
     + 'tempo em notação $Θ$.</p>',
    gab: [
      'Por ser unimodal, podemos usar uma <strong>busca binária modificada</strong>. '
      + 'Analisamos o elemento do meio $X[i]$:',
      'Se $X[i] < X[i+1]$, estamos na <em>subida</em> e o pico está à direita (chamada '
      + 'recursiva na metade direita). Se $X[i] > X[i+1]$, estamos na <em>descida</em> e o pico '
      + 'está à esquerda (incluindo $i$).',
      'Como dividimos em um <strong>único</strong> subproblema, a recorrência é'
      + '$$T(n) = T(n/2) + Θ(1)$$'
      + 'Pelo Teorema Mestre, a complexidade é $$Θ(log n)$$',
      '<pre class="pseudo"><span class="ln"><span class="kw">Function</span> <span class="fnn">Topo</span>(X, a, b):</span>'
      + '<span class="ln">  <span class="kw">if</span> a = b <span class="kw">then return</span> X[a]</span>'
      + '<span class="ln">  i ← ⌊(a+b)/2⌋</span>'
      + '<span class="ln">  <span class="kw">if</span> X[i] &lt; X[i+1] <span class="kw">then</span></span>'
      + '<span class="ln">    <span class="kw">return</span> <span class="fnn">Topo</span>(X, i+1, b)</span>'
      + '<span class="ln">  <span class="kw">else</span></span>'
      + '<span class="ln">    <span class="kw">return</span> <span class="fnn">Topo</span>(X, a, i)</span></pre>'
    ] },

  { id: 'S1Q6', n: 6, pts: 1, extra: true, tema: 'D&C com retorno enriquecido',
    e: '<p><strong>(Extra)</strong> Dado um vetor $A$ contendo $n$ valores numéricos, queremos '
     + 'encontrar um par de índices $i$ e $j$ (com $i ≤ j$) tal que a diferença '
     + '$A[j] − A[i]$ seja a maior possível.</p>'
     + '<p>Se dividirmos o vetor na metade em Esquerda (E) e Direita (D), sabemos que a maior '
     + 'diferença pode estar contida integralmente em E, integralmente em D, ou cruzando as '
     + 'metades ($i ∈ E$ e $j ∈ D$).</p>'
     + '<p>Usando <strong>Divisão e Conquista</strong>, escreva um algoritmo que resolve este '
     + 'problema em $Θ(n)$. Note que para alcançar este objetivo, a chamada recursiva deve '
     + 'retornar não apenas a maior diferença, mas também o menor e o maior elemento da sua '
     + 'respectiva metade.</p>',
    gab: [
      'O caso em que a resposta cruza as metades pode ser calculado selecionando o maior valor '
      + 'de D e subtraindo do menor valor de E. Para os demais casos, basta considerar os '
      + 'valores obtidos nas respectivas metades.',
      'Para que a etapa de combinação custe $Θ(1)$, cada chamada recursiva deve retornar não '
      + 'apenas a maior diferença, mas também o menor e o maior elemento de sua respectiva '
      + 'metade. A recorrência resultante será'
      + '$$T(n) = 2T(n/2) + Θ(1)$$'
      + 'o que leva ao tempo de execução de $$Θ(n)$$',
      '<pre class="pseudo"><span class="ln"><span class="kw">Function</span> <span class="fnn">MaxDif</span>(V, a, b):</span>'
      + '<span class="ln">  <span class="kw">if</span> a = b <span class="kw">then return</span> (V[a], V[a], 0)</span>'
      + '<span class="ln">  i ← ⌊(a+b)/2⌋</span>'
      + '<span class="ln">  (minE, maxE, difE) ← <span class="fnn">MaxDif</span>(V, a, i)</span>'
      + '<span class="ln">  (minD, maxD, difD) ← <span class="fnn">MaxDif</span>(V, i+1, b)</span>'
      + '<span class="ln">  <span class="kw">return</span> ( <span class="fnn">min</span>(minE, minD),</span>'
      + '<span class="ln">           <span class="fnn">max</span>(maxE, maxD),</span>'
      + '<span class="ln">           <span class="fnn">max</span>(difE, difD, maxD − minE) )</span></pre>'
    ] }
  ]
},

/* ═════════════════════════════════════ SIMULADO 4 — a prova de 2025.2 ═════ */
/* Ordem de exibição: entra aqui, logo depois de S1, porque é prova real.
   O id continua S4 para não embaralhar o progresso já salvo em S2/S3.      */
{
  id: 'S4',
  nome: 'Prova 1 de 2025.2',
  origem: 'Avaliação 1 · 23/10/2025 · Prof. George Lima',
  oficial: true,
  minutos: 100,
  resumo: 'Quatro questões, 10,0 pts, sem ponto extra. É a prova mais conceitual das três: '
        + 'abre cobrando o que a notação assintótica NÃO diz e pede três recorrências a partir '
        + 'de enunciado em prosa, sem pseudocódigo.',
  questoes: [

  {id: 'S4Q1', n: 1, pts: 2, tema: 'Assintótico em n pequeno',
    e: '<p>Há dois programas, $F$ e $G$, que resolvem o mesmo problema. Sabe-se que '
     + '$f(n) = n + 5/n$ e $g(n) = 100\\r{n}$ representam os custos de execução de $F$ e $G$, '
     + 'respectivamente, com entradas de tamanho $n > 0$.</p>'
     + '<p>Para cada cenário abaixo, entre $F$ e $G$, escolha aquele com o '
     + '<strong>melhor desempenho</strong>. Use seus conhecimentos sobre notação assintótica '
     + 'para justificar sua resposta.</p>'
     + '<p>(a) Sabendo que o tamanho da entrada $n ≤ 1.000$.<br>'
     + '(b) Valores considerados de $n$ são maiores que $10.000$.</p>',
    gab: [
      'É fácil de ver que $f(n) = Θ(n)$ e $g(n) = Θ(\\r{n})$. Desta forma, se compararmos os '
      + '<em>algoritmos</em>, percebe-se que a segunda expressa crescimento menor que a primeira.',
      '<strong>Mas o ponto da questão é outro.</strong> Para comparar os <em>programas</em> '
      + '$F$ e $G$, devemos levar em consideração as <strong>constantes e termos de menor '
      + 'ordem</strong> presentes nestas funções — exatamente o que a notação assintótica ignora.',
      '<strong>(a) $n ≤ 1.000$.</strong> Ambas as funções são contínuas e crescentes em $n$. '
      + 'Então o máximo de ambas é para $n = 1.000$. Neste caso '
      + '$$f(1000) = 1000{,}005 \\qquad g(1000) = 100\\r{1000} = 1000\\r{10} ≈ 3162{,}3$$'
      + 'Como $f$ é menor em toda a faixa, a melhor escolha é o programa $F$.',
      '<strong>(b) $n > 10.000$.</strong> No intervalo considerado, o mínimo das duas funções '
      + 'não é inferior àqueles obtidos para $n = 10.000$. Tais valores são '
      + '$$f(10000) > 10.000 \\qquad g(10000) = 100 × 100 = 10.000$$'
      + 'Como as funções são contínuas e crescentes, a melhor escolha será o programa $G$.',
      '<strong>A parte formal.</strong> De fato, sabe-se que $g(n) = O(f(n))$, mas '
      + '$f(n) ≠ O(g(n))$. Para a primeira afirmação, note que'
      + '$$100\\r{n} ≤ c\\p{n + 5/n}$$'
      + 'para qualquer $c ≥ 100/6$ e para todo $n ≥ 1$.',
      'Para a segunda, não existe constante positiva $c$ que faça'
      + '$$100\\r{n} ≥ c\\p{n + 5/n} ⇔ c ≤ \\f{100\\r{n} · n}{n^2 + 5}$$'
      + 'a partir de algum valor de $n$ — o lado direito tende a zero, então nenhum $c > 0$ '
      + 'serve para todo $n$ grande.',
      '<strong>A lição.</strong> Crescimento assintótico menor não quer dizer programa mais '
      + 'rápido na faixa de entrada que você tem. $Θ(\\r{n})$ com constante 100 só vence '
      + '$Θ(n)$ a partir de $n = 10.000$.'
    ] },

  {id: 'S4Q2', n: 2, pts: 2.5, tema: 'Da prosa à recorrência',
    e: '<p>Há três algoritmos recursivos para resolver um determinado problema, cuja entrada '
     + 'é uma sequência com $n$ elementos.</p>'
     + '<p>Na solução <strong>A</strong>, a cada chamada da recursão, divide-se o problema em '
     + '16 sub-problemas com entradas quatro vezes menores que a recebida. As 16 soluções são '
     + 'combinadas em tempo linear.</p>'
     + '<p>O algoritmo <strong>B</strong>, por sua vez, divide o problema em apenas dois a '
     + 'cada etapa recursiva. Cada uma delas possui um elemento a menos em relação à sequência '
     + 'recebida. O tempo para combinar os seus resultados é constante.</p>'
     + '<p>Na solução <strong>C</strong>, descarta-se um elemento da entrada e os elementos '
     + 'restantes são tratados na próxima chamada recursiva. O tempo gasto para processar a '
     + 'entrada recebida é logarítmico.</p>'
     + '<p>(a) Expresse as recorrências associadas a cada um dos algoritmos.<br>'
     + '(b) Encontre o tempo de execução de cada um desses algoritmos, expressando-os em '
     + 'notação assintótica $Θ$.</p>',
    gab: [
      '<strong>(a) As três recorrências.</strong> Cada frase do enunciado vira um termo:'
      + '$$T_A(n) = 16 T_A(n/4) + n$$'
      + '$$T_B(n) = 2 T_B(n − 1) + 1$$'
      + '$$T_C(n) = T_C(n − 1) + log n$$',
      '<strong>(b) $T_A$ — Teorema Mestre.</strong> Com $a = 16$, $b = 4$ e $f(n) = n$, temos '
      + '$n^{log_b a} = n^{log_4 16} = n^2$. Como $f(n) = n$ é polinomialmente <em>menor</em> '
      + 'que $n^2$, recai no <strong>Caso 1</strong>:'
      + '$$T_A(n) = Θ(n^2)$$',
      '<strong>(b) $T_B$ — árvore de recursão.</strong> É subtrativa, o Teorema Mestre não se '
      + 'aplica. A árvore tem altura $n$, o nível $i$ tem $2^{i−1}$ nós e cada nó custa 1:'
      + '$$T_B(n) = \\S{i=1}{n} 2^{i−1} = 2^n − 1 = Θ(2^n)$$',
      '<strong>(b) $T_C$ — soma de logaritmos.</strong> A árvore de recursão é um caminho: a '
      + 'raiz custa $log n$, o segundo nível $log(n−1)$, e assim sucessivamente. Sabe-se que a '
      + 'soma de logaritmos é o logaritmo do produto, ou seja'
      + '$$T_C(n) = \\S{i=1}{n} log i = log\\p{\\P{i=1}{n} i} = log(n!) = Θ(log n!) = Θ(n log n)$$',
      '<strong>O que a questão treina.</strong> Não há pseudocódigo: a nota vem de traduzir '
      + 'português para recorrência. "Divide em $a$ sub-problemas $b$ vezes menores" é '
      + '$aT(n/b)$; "com um elemento a menos" é $aT(n−1)$; "combinadas em tempo linear" é '
      + '$+ n$; "tempo constante" é $+ Θ(1)$.'
    ] },

  {id: 'S4Q3', n: 3, pts: 2.5, tema: 'Analisar dois pseudocódigos',
    e: '<p>Dada uma sequência $X$ contendo $n$ valores numéricos, deseja-se encontrar</p>'
     + '$$MaxDif(X) = max_{1 ≤ i < j ≤ n} (X[j] − X[i])$$'
     + '<p>Por exemplo, para $X = [100, −2, 4, 1, 10, 4]$, a solução é 12, pois '
     + '$10 − (−2) = 12$ é a diferença máxima.</p>'
     + '<p>Analise as soluções dadas pelas funções abaixo, assumindo que '
     + '<code>MaxDifA(X)</code> e <code>MaxDifB(X, 1, n)</code> são as chamadas iniciais. '
     + 'Forneça as complexidades de tempo de execução em notação $Θ$. Note que '
     + '<code>MaxDifB</code> retorna uma <strong>tripla</strong>, contendo respectivamente os '
     + 'valores observados de mínimo, de máximo e a máxima diferença sendo buscada.</p>'
     + '<pre class="pseudo"><span class="ln"><span class="kw">Function</span> <span class="fnn">MaxDifA</span>(X)</span>'
     + '<span class="ln">  m ← −∞</span>'
     + '<span class="ln">  n ← |X|</span>'
     + '<span class="ln">  <span class="kw">for</span> i ← 1, …, n − 1 <span class="kw">do</span></span>'
     + '<span class="ln">    <span class="kw">for</span> j ← i + 1, …, n <span class="kw">do</span></span>'
     + '<span class="ln">      <span class="kw">if</span> m &lt; X[j] − X[i] <span class="kw">then</span></span>'
     + '<span class="ln">        m ← X[j] − X[i]</span>'
     + '<span class="ln">  <span class="kw">return</span> m</span></pre>'
     + '<pre class="pseudo"><span class="ln"><span class="kw">Function</span> <span class="fnn">MaxDifB</span>(X, a, b)</span>'
     + '<span class="ln">  <span class="kw">if</span> a = b <span class="kw">then</span></span>'
     + '<span class="ln">    <span class="kw">return</span> (X[a], X[a], −∞)   <span class="cm">// (min, max, dif)</span></span>'
     + '<span class="ln">  i ← ⌊(a+b)/2⌋</span>'
     + '<span class="ln">  (minl, maxl, difl) ← <span class="fnn">MaxDifB</span>(X, a, i)</span>'
     + '<span class="ln">  (minr, maxr, difr) ← <span class="fnn">MaxDifB</span>(X, i + 1, b)</span>'
     + '<span class="ln">  <span class="kw">return</span> ( <span class="fnn">min</span>(minl, minr),</span>'
     + '<span class="ln">           <span class="fnn">max</span>(maxl, maxr),</span>'
     + '<span class="ln">           <span class="fnn">max</span>(maxr − minl, difl, difr) )</span></pre>',
    gab: [
      '<strong>MaxDifA</strong> executa em $Θ(n^2)$, pois seu custo de execução é dado pela '
      + 'somatória dupla'
      + '$$\\S{i=1}{n−1}\\S{j=i+1}{n} 1 = \\S{i=1}{n−1}(n − i) = n(n − 1) − \\S{i=1}{n−1} i$$',
      'Resolvendo a somatória aritmética:'
      + '$$= n(n − 1) − \\f{n(n − 1)}{2} = \\f{n(n − 1)}{2} = Θ(n^2)$$',
      '<strong>MaxDifB</strong> pode ser obtida através de recorrência. Pelo seu '
      + 'pseudocódigo, deduz-se que são duas chamadas em metades e trabalho constante na '
      + 'combinação:'
      + '$$T(n) = 2T(n/2) + 1$$'
      + 'o que leva a $$T(n) = Θ(n)$$'
      + 'resultado que pode ser obtido aplicando o <strong>Teorema Mestre</strong> '
      + '($a = 2$, $b = 2$, $f(n) = 1$, Caso 1).',
      '<strong>Por que a tripla é o truque.</strong> Se a recursão devolvesse só a maior '
      + 'diferença, a combinação não teria como avaliar o caso que cruza a fronteira e '
      + 'precisaria varrer as metades — custo $Θ(n)$ por nível, levando a $Θ(n log n)$. '
      + 'Devolvendo também o mínimo e o máximo, o caso cruzado sai de '
      + '$maxr − minl$ em $Θ(1)$.',
      '<div class="callout tip"><span class="tag">Já caiu duas vezes</span>'
      + '<p>Este mesmo problema é a <strong>Q6 de 2026.1</strong> (ponto extra), ali pedindo '
      + 'que você <em>projete</em> a solução em vez de analisá-la. É o problema mais '
      + 'repetido do acervo — vale saber de cor.</p></div>'
    ] },

  {id: 'S4Q4', n: 4, pts: 3, tema: 'Projetar D&C: elemento majoritário',
    e: '<p>Uma pesquisa de opinião foi realizada para se determinar se havia uma posição '
     + '<strong>majoritária</strong> favorável a uma proposta entre várias que foram '
     + 'enunciadas. Os $n$ votos colhidos foram armazenados num vetor $X$.</p>'
     + '<p><strong>Sem usar ordenação</strong>, mas usando divisão e conquista, desenvolva um '
     + 'algoritmo para determinar qual das propostas é a majoritária. Se não há proposta '
     + 'majoritária, seu algoritmo deve retornar "Não há posição majoritária". Sua solução '
     + 'não deve executar em tempo maior que $O(n log n)$.</p>'
     + '<p><em>Dica: se há proposta majoritária em $X$, ela deve ser majoritária em ao menos '
     + 'uma das metades de $X$.</em></p>',
    gab: [
      '<strong>A ideia.</strong> O vetor $X$ contendo os votos é particionado em dois. Se '
      + 'houver proposta majoritária em ambas as partições e elas forem iguais, então esta é '
      + 'a proposta majoritária de $X$.',
      '<strong>O caso que exige trabalho.</strong> Caso contrário, pode ocorrer que a proposta '
      + 'majoritária de <em>uma</em> das partições seja majoritária em $X$. Para verificar se '
      + 'isto é verdade, <strong>conta-se as suas ocorrências em $X$</strong>, o que leva a um '
      + 'custo linear para esta verificação.',
      '<strong>Por que a dica fecha o algoritmo.</strong> Se um valor aparece mais de $n/2$ '
      + 'vezes em $X$, ele tem de aparecer mais da metade das vezes em pelo menos uma das '
      + 'metades — senão somaria no máximo $n/2$. Logo bastam <strong>dois candidatos</strong> '
      + 'a testar, e não todos os valores distintos.',
      'A recorrência que expressa este comportamento é'
      + '$$T(n) = 2T(n/2) + n$$'
      + 'o que implica, pelo Teorema Mestre (Caso 2), que $$T(n) = Θ(n log n)$$',
      '<strong>Pseudocódigo do gabarito.</strong>'
      + '<pre class="pseudo"><span class="ln"><span class="kw">Function</span> <span class="fnn">Maj</span>(X, a, b)</span>'
      + '<span class="ln">  <span class="kw">if</span> a = b <span class="kw">then return</span> X[a]</span>'
      + '<span class="ln">  i ← ⌊(a+b)/2⌋</span>'
      + '<span class="ln">  l ← <span class="fnn">Maj</span>(X, a, i)</span>'
      + '<span class="ln">  r ← <span class="fnn">Maj</span>(X, i + 1, b)</span>'
      + '<span class="ln">  <span class="kw">if</span> l = r <span class="kw">then return</span> l</span>'
      + '<span class="ln">  cl ← 0; cr ← 0</span>'
      + '<span class="ln">  <span class="kw">for</span> i ← a, a + 1, …, b <span class="kw">do</span></span>'
      + '<span class="ln">    <span class="kw">if</span> l = X[i] <span class="kw">then</span> cl ← cl + 1</span>'
      + '<span class="ln">    <span class="kw">if</span> r = X[i] <span class="kw">then</span> cr ← cr + 1</span>'
      + '<span class="ln">  <span class="kw">if</span> cl &gt; (b − a + 1)/2 <span class="kw">then return</span> l</span>'
      + '<span class="ln">  <span class="kw">if</span> cr &gt; (b − a + 1)/2 <span class="kw">then return</span> r</span>'
      + '<span class="ln">  <span class="kw">return</span> "Não há posição majoritária"</span></pre>',
      '<div class="callout tip"><span class="tag">Padrão nomeado</span>'
      + '<p><strong>Contar para validar um candidato.</strong> A recursão não resolve o '
      + 'problema — ela só produz <em>candidatos</em>. A validação é uma varredura linear. '
      + 'Reconhecer esta forma vale ponto em qualquer questão de projeto.</p></div>'
    ] }
  ]
},

/* ═════════════════════════════════════ SIMULADO 5 — a prova de 2025.1 ═════ */
{
  id: 'S5',
  nome: 'Prova 1 de 2025.1',
  origem: 'Avaliação 1 · 15/05/2025 · Prof. George Lima',
  oficial: true,
  minutos: 100,
  resumo: 'Cinco questões, sendo a última opcional (1,5 pt). O enunciado avisa que no máximo '
        + '10 pts serão contabilizados — a Q5 serve para recuperar pontos perdidos, não para '
        + 'passar de 10. É a prova com mais análise de pseudocódigo das três.',
  observacoes: '<strong>(a)</strong> Limites assintóticos devem ser fornecidos em notação $Θ$. '
             + '<strong>(b)</strong> $⌊x⌋$ fornece o maior inteiro menor ou igual a $x$. '
             + '<strong>(c)</strong> $\\S{i=1}{n} 1/i ≈ ln n$. '
             + '<strong>(d)</strong> Para $x$ e $k ≠ 0$ inteiros, a operação $x mod k$ fornece '
             + 'o resto da divisão inteira de $x$ por $k$. '
             + '<strong>(e)</strong> Assuma que $T(1) = T(0) = 1$ e que cada instrução de um '
             + 'algoritmo executa em $Θ(1)$. '
             + '<strong>(f)</strong> No máximo 10 pts estarão associados a esta avaliação.',
  questoes: [

  {id: 'S5Q1', n: 1, pts: 2, tema: 'Recorrências',
    e: '<p>Encontre os limites assintóticos para:</p>'
     + '<p>(a) $T(n) = 2T(n/4) + \\r{n}$<br>'
     + '(b) $T(n) = n + \\S{i=1}{n−1} T(i)$</p>',
    gab: [
      '<strong>(a)</strong> Com $a = 2$, $b = 4$ e $f(n) = \\r{n}$, temos'
      + '$$n^{log_b a} = n^{log_4 2} = n^{1/2} = \\r{n}$$'
      + 'Como $\\r{n} = Θ\\p{n^{log_4 2}}$, aplicamos o <strong>Caso 2</strong> do Teorema '
      + 'Mestre. Logo $$T(n) = Θ(\\r{n} log n)$$',
      '<strong>(b)</strong> Esta recorrência tem <strong>histórico</strong> — o termo '
      + '$n$-ésimo depende de <em>todos</em> os anteriores, então o Teorema Mestre não se '
      + 'aplica. A saída é o método da <strong>remoção de histórico</strong>: escrever também '
      + 'a recorrência para $n − 1$ e subtrair.',
      'Desenvolvendo a expressão $T(n) − T(n−1)$:'
      + '$$T(n) − T(n−1) = n − (n−1) + \\S{i=1}{n−1} T(i) − \\S{i=1}{n−2} T(i)$$'
      + 'As somatórias diferem por um único termo, $T(n−1)$, e $n − (n−1) = 1$:'
      + '$$T(n) − T(n−1) = T(n−1) + 1$$',
      'Isolando $T(n)$, chegamos a uma recorrência subtrativa limpa:'
      + '$$T(n) = 2T(n−1) + 1$$'
      + 'Usando o método da árvore, que tem altura $n$ e custo unitário por nó, obtém-se'
      + '$$T(n) = \\S{i=1}{n} 2^{i−1} = Θ(2^n)$$',
      '<div class="callout exam"><span class="tag">Na prova</span>'
      + '<p>Recorrência subtrativa que explode em $Θ(2^n)$ caiu nas <strong>três</strong> '
      + 'provas: aqui, na Q2(B) de 2025.2 e na Q1(d) de 2026.1. Se você só decorar um '
      + 'resultado da matéria de recorrências, decore este.</p></div>'
    ] },

  {id: 'S5Q2', n: 2, pts: 2, tema: 'Laços aninhados',
    e: '<p>Forneça a complexidade para o tempo de execução do algoritmo a seguir, que recebe '
     + 'um valor inteiro positivo $n$ como entrada (linha 1).</p>'
     + '<pre class="pseudo"><span class="ln"><span class="hd">1</span> i ← n</span>'
     + '<span class="ln"><span class="hd">2</span> <span class="kw">while</span> i &gt; 0 <span class="kw">do</span></span>'
     + '<span class="ln"><span class="hd">3</span>   j ← 1</span>'
     + '<span class="ln"><span class="hd">4</span>   <span class="kw">while</span> j &lt; n <span class="kw">do</span></span>'
     + '<span class="ln"><span class="hd">5</span>     k ← 0</span>'
     + '<span class="ln"><span class="hd">6</span>     <span class="kw">while</span> k &lt; n <span class="kw">do</span></span>'
     + '<span class="ln"><span class="hd">7</span>       k ← k + 2</span>'
     + '<span class="ln"><span class="hd">8</span>     j ← j × 2</span>'
     + '<span class="ln"><span class="hd">9</span>   i ← ⌊i/2⌋</span></pre>',
    gab: [
      '<strong>Laço externo (linhas 2 e 9).</strong> $i$ parte de $n$ e é '
      + '<em>dividido por 2</em> a cada volta, até chegar a 0. São $⌈log_2 n⌉$ iterações.',
      '<strong>Laço intermediário (linhas 4 e 8).</strong> $j$ parte de 1 e é '
      + '<em>multiplicado por 2</em> até atingir $n$. São também $⌈log_2 n⌉$ iterações — e '
      + 'note que esse número <strong>não depende de $i$</strong>, porque $j$ é reinicializado '
      + 'em 1 na linha 3.',
      '<strong>Laço interno (linhas 6 e 7).</strong> $k$ parte de 0 e <em>soma 2</em> até '
      + 'atingir $n$: executa entre $n/2$ e $⌈n/2⌉$ vezes, ou seja $Θ(n)$.',
      'Os três laços são independentes entre si, então o total é o produto:'
      + '$$T(n) = ⌈log_2 n⌉ × ⌈log_2 n⌉ × \\f{n}{2} = Θ(n log^2 n)$$',
      '<div class="callout warn"><span class="tag">A pegadinha</span>'
      + '<p>O laço interno soma 2 em vez de 1 — e isso <strong>não</strong> muda a ordem: '
      + '$n/2 = Θ(n)$. O que muda a ordem é a operação <em>multiplicativa</em> '
      + '($j × 2$, $i/2$), que troca $n$ por $log n$. Reconhecer qual das duas é cada laço é '
      + 'a questão inteira.</p></div>'
    ] },

  {id: 'S5Q3', n: 3, pts: 3, tema: 'Analisar pseudocódigo: melhor e pior caso',
    e: '<p>Considere a função $F$ a seguir, desenvolvida segundo a técnica de divisão e '
     + 'conquista. Ela recebe um vetor de inteiros em <strong>ordem não-decrescente</strong> '
     + '$V$ com $n = b − a + 1$ elementos e um inteiro $k$.</p>'
     + '<pre class="pseudo"><span class="ln"><span class="hd">1</span> <span class="kw">Function</span> <span class="fnn">F</span>(V, k, a, b):</span>'
     + '<span class="ln"><span class="hd">2</span> <span class="kw">if</span> a &gt; b <span class="kw">then return</span> 0</span>'
     + '<span class="ln"><span class="hd">3</span>   i ← ⌊(a+b)/2⌋</span>'
     + '<span class="ln"><span class="hd">4</span> <span class="kw">if</span> V[i] &lt; k <span class="kw">then</span></span>'
     + '<span class="ln"><span class="hd">5</span>   <span class="kw">return</span> <span class="fnn">F</span>(V, k, i + 1, b)</span>'
     + '<span class="ln"><span class="hd">6</span> <span class="kw">if</span> V[i] &gt; k <span class="kw">then</span></span>'
     + '<span class="ln"><span class="hd">7</span>   <span class="kw">return</span> <span class="fnn">F</span>(V, k, a, i − 1)</span>'
     + '<span class="ln"><span class="hd">8</span> <span class="kw">return</span></span>'
     + '<span class="ln">     1 + <span class="fnn">F</span>(V, k, a, i − 1) + <span class="fnn">F</span>(V, k, i + 1, b)</span></pre>'
     + '<p>Após analisar o pseudocódigo, responda:</p>'
     + '<p>(a) O que a função $F$ faz e retorna como saída para um dado vetor $V$? '
     + 'Exemplifique.<br>'
     + '(b) Caracterize o <strong>melhor caso</strong> para o tempo de execução de $F$, '
     + 'determine a recorrência correspondente e forneça a complexidade associada.<br>'
     + '(c) Caracterize o <strong>pior caso</strong> para o tempo de execução de $F$, '
     + 'determine a recorrência correspondente e forneça a complexidade associada.</p>',
    gab: [
      '<strong>(a)</strong> A função $F$ <strong>conta o número de vezes que $k$ ocorre em '
      + '$V$</strong>.',
      '<strong>Exemplo.</strong> Para $V = [1, 2, 3, 3, 5, 7]$ e $k = 3$, o valor retornado '
      + 'será 2. Para qualquer outro valor presente em $V$, a função retornará 1. Se '
      + '$k ∉ V$, a função retorna 0.',
      '<strong>Como ela funciona.</strong> As linhas 4–7 são uma busca binária comum: se o '
      + 'elemento do meio é menor que $k$, só a metade direita interessa; se é maior, só a '
      + 'esquerda. A linha 8 é o caso $V[i] = k$: conta essa ocorrência e '
      + '<strong>recursa nas duas metades</strong>, porque a ordenação garante que as outras '
      + 'cópias de $k$ são vizinhas.',
      '<strong>(b) Melhor caso.</strong> Ocorre quando todos os valores de $V$ são distintos '
      + 'de $k$, pois a <strong>linha 8 nunca será executada</strong> — há sempre uma única '
      + 'chamada recursiva, sobre metade do intervalo. Neste caso'
      + '$$T(n) = T(n/2) + 1 \\qquad T(n) = Θ(log n)$$',
      '<strong>(c) Pior caso.</strong> Ocorre quando a linha 8 executa sempre, até que '
      + '$b < a$ — o que leva a <strong>duas</strong> chamadas recursivas em cada metade:'
      + '$$T(n) = 2T(n/2) + 1$$'
      + 'Neste caso, pelo Teorema Mestre (Caso 1, pois $n^{log_2 2} = n > 1 = f(n)$), '
      + '$$T(n) = Θ(n)$$'
      + 'Isto pode ocorrer quando $k = V[i]$ para todo $i$ entre 1 e $n$ — isto é, quando o '
      + 'vetor inteiro é composto por cópias de $k$.',
      '<div class="callout tip"><span class="tag">O que dá a nota</span>'
      + '<p>Perceba que melhor e pior caso aqui não diferem no <em>tamanho</em> dos '
      + 'subproblemas (sempre $n/2$), e sim no <strong>número</strong> deles: 1 contra 2. É '
      + 'essa única diferença que separa $Θ(log n)$ de $Θ(n)$.</p></div>'
    ] },

  {id: 'S5Q4', n: 4, pts: 3, tema: 'Projetar D&C: potenciação modular',
    e: '<p>Se $x$, $y$ e $k > 0$ são números inteiros, então</p>'
     + '$$(xy) mod k = [(x mod k)(y mod k)] mod k$$'
     + '<p>Usando este fato, desenvolva uma função $pm(x, n, k)$ que calcula '
     + '$x^n mod k$, sendo $x$, $n$ e $k$ inteiros positivos.</p>'
     + '<p>O tempo de execução de sua função deve ser $Θ(log n)$, fato que você deve '
     + '<strong>mostrar através da recorrência</strong> a ela associada.</p>',
    gab: [
      '<strong>De onde vem a solução.</strong> Este problema é muito similar ao cálculo da '
      + '$n$-ésima potência de um número, visto em sala. A identidade dada é o que permite '
      + 'aplicar o $mod$ <em>durante</em> a recursão, em vez de calcular $x^n$ inteiro (que '
      + 'estouraria) e só depois tirar o resto.',
      '<strong>A decomposição.</strong> A cada chamada, o tamanho do problema se reduz pela '
      + 'metade (aproximadamente), separando os casos par e ímpar:'
      + '$$x^n = \\c{\\p{x^{n/2}}^2}{se n é par}{x · \\p{x^{(n−1)/2}}^2}{se n é ímpar}$$',
      '<strong>Pseudocódigo do gabarito.</strong>'
      + '<pre class="pseudo"><span class="ln"><span class="hd">1</span> <span class="kw">Function</span> <span class="fnn">pm</span>(x, n, k):</span>'
      + '<span class="ln"><span class="hd">2</span> <span class="kw">if</span> k = 1 <span class="kw">then return</span> 0</span>'
      + '<span class="ln"><span class="hd">3</span> <span class="kw">if</span> n = 0 <span class="kw">then return</span> 1</span>'
      + '<span class="ln"><span class="hd">4</span> <span class="kw">if</span> n <span class="kw">mod</span> 2 = 1 <span class="kw">then</span></span>'
      + '<span class="ln"><span class="hd">5</span>   r ← <span class="fnn">pm</span>(x, (n − 1)/2, k)</span>'
      + '<span class="ln"><span class="hd">6</span>   s ← x <span class="kw">mod</span> k</span>'
      + '<span class="ln"><span class="hd">7</span> <span class="kw">else</span></span>'
      + '<span class="ln"><span class="hd">8</span>   r ← <span class="fnn">pm</span>(x, n/2, k)</span>'
      + '<span class="ln"><span class="hd">9</span>   s ← 1</span>'
      + '<span class="ln"><span class="hd">10</span> <span class="kw">return</span> (r² × s) <span class="kw">mod</span> k</span></pre>',
      '<strong>A recorrência — é isso que a questão cobra.</strong> Há uma única chamada '
      + 'recursiva, sobre metade do expoente, e o trabalho local (uma multiplicação, um '
      + 'resto) é constante:'
      + '$$T(n) = T(n/2) + 1$$'
      + 'Pelo Teorema Mestre ($a = 1$, $b = 2$, $n^{log_2 1} = n^0 = 1 = f(n)$ — Caso 2): '
      + '$$T(n) = Θ(log n)$$',
      '<div class="callout warn"><span class="tag">Dois detalhes do gabarito</span>'
      + '<p><strong>1.</strong> A recorrência é em $n$, o <em>expoente</em> — não no número '
      + 'de bits nem em $x$. É o expoente que cai pela metade.</p>'
      + '<p><strong>2.</strong> A linha 2 trata $k = 1$ devolvendo 0, porque qualquer inteiro '
      + 'módulo 1 é 0. É um caso base que o enunciado não pede, mas o gabarito inclui.</p></div>'
    ] },

  {id: 'S5Q5', n: 5, pts: 1.5, extra: true, tema: 'D&C: maior soma de subsequência',
    e: '<p><strong>(Opcional)</strong> Seja $X$ uma sequência numérica contendo $n$ '
     + 'elementos. Usando divisão e conquista, encontre a maior soma dos elementos contidos '
     + 'em sub-sequências de $X$. Mais especificamente, sua solução deve fornecer o valor de</p>'
     + '$$max_{1 ≤ i ≤ j ≤ n} (X[i] + X[i+1] + … + X[j])$$'
     + '<p>Ex.: $X = [1, 2, −1, 4]$, resposta 6, pois $X[1]+X[2]+X[3]+X[4] = 6$. '
     + '$X = [−5, 2, −1, 4, −3]$, resposta 5, pois $X[2]+X[3]+X[4] = 5$.</p>'
     + '<p>Forneça a complexidade associada ao tempo de execução de sua solução.</p>',
    gab: [
      '<strong>Os três casos.</strong> Particionando $X$ em duas sub-sequências, '
      + '$L = X[1], …, X[i]$ e $R = X[i+1], …, X[n]$, há três possibilidades: a maior soma '
      + 'está inteiramente em $L$, inteiramente em $R$, ou <strong>cruza</strong> a fronteira.',
      '<strong>O caso que cruza.</strong> Um subvetor que cruza é um <em>sufixo</em> de $L$ '
      + 'seguido de um <em>prefixo</em> de $R$. Com $i$ escolhido no meio, calcula-se o melhor '
      + 'sufixo varrendo de $i$ para trás e o melhor prefixo varrendo de $i+1$ para frente — '
      + 'duas varreduras lineares.',
      'A recorrência associada é'
      + '$$T(n) = 2T(n/2) + Θ(n)$$'
      + 'e portanto, pelo Teorema Mestre (Caso 2), o tempo de execução é '
      + '$$T(n) = Θ(n log n)$$',
      '<strong>Pseudocódigo do gabarito.</strong>'
      + '<pre class="pseudo"><span class="ln"><span class="hd">1</span> <span class="kw">Function</span> <span class="fnn">maxSomaSeq</span>(X, a, b):</span>'
      + '<span class="ln"><span class="hd">2</span> <span class="kw">if</span> a = b <span class="kw">then return</span> X[a]</span>'
      + '<span class="ln"><span class="hd">3</span>   i ← ⌊(a+b)/2⌋</span>'
      + '<span class="ln"><span class="hd">4</span> l ← <span class="fnn">maxSomaSeq</span>(X, a, i)</span>'
      + '<span class="ln"><span class="hd">5</span> r ← <span class="fnn">maxSomaSeq</span>(X, i + 1, b)</span>'
      + '<span class="ln">   <span class="cm">/* maior soma de sufixo à esquerda */</span></span>'
      + '<span class="ln"><span class="hd">6</span> ml ← X[i]</span>'
      + '<span class="ln"><span class="hd">7</span> t ← 0</span>'
      + '<span class="ln"><span class="hd">8</span> <span class="kw">for</span> k ← i, i − 1, …, a <span class="kw">do</span></span>'
      + '<span class="ln"><span class="hd">9</span>   t ← t + X[k]</span>'
      + '<span class="ln"><span class="hd">10</span>   <span class="kw">if</span> t &gt; ml <span class="kw">then</span> ml ← t</span>'
      + '<span class="ln">   <span class="cm">/* maior soma de prefixo à direita */</span></span>'
      + '<span class="ln"><span class="hd">11</span> mr ← X[i + 1]</span>'
      + '<span class="ln"><span class="hd">12</span> t ← 0</span>'
      + '<span class="ln"><span class="hd">13</span> <span class="kw">for</span> k ← i + 1, i + 2, …, b <span class="kw">do</span></span>'
      + '<span class="ln"><span class="hd">14</span>   t ← t + X[k]</span>'
      + '<span class="ln"><span class="hd">15</span>   <span class="kw">if</span> t &gt; mr <span class="kw">then</span> mr ← t</span>'
      + '<span class="ln"><span class="hd">16</span> <span class="kw">return</span> <span class="fnn">max</span>(l, r, ml + mr)</span></pre>'
      + '<p class="xs muted">Nota: o PDF do gabarito traz a linha 11 como $mr ← i + 1$, o que '
      + 'é erro de digitação — inicializar o acumulador com um <em>índice</em> em vez de um '
      + 'valor quebraria a conta. A leitura correta é $mr ← X[i+1]$, como está acima, por '
      + 'simetria com a linha 6.</p>',
      '<div class="callout tip"><span class="tag">Dá para fazer melhor</span>'
      + '<p>O gabarito aceita $Θ(n log n)$, mas este problema tem solução em '
      + '<strong>$Θ(n)$</strong> pelo padrão de <em>retorno enriquecido</em>: cada chamada '
      + 'devolve a quádrupla $(tot, pre, suf, melhor)$ e a combinação custa $Θ(1)$. É '
      + 'exatamente o que a Q6 do <strong>Simulado autoral A</strong> treina. Na prova, '
      + 'entregue a de '
      + '$Θ(n log n)$ primeiro — ela já vale o ponto — e mencione a de $Θ(n)$ se sobrar '
      + 'tempo.</p></div>'
    ] }
  ]
},

/* ═════════════════════════════════════════════ SIMULADO 2 — autoral ═══════ */
{
  id: 'S2',
  nome: 'Simulado autoral A',
  origem: 'Autoral · mesma estrutura e distribuição de pontos da prova de 2026.1',
  oficial: false,
  minutos: 100,
  resumo: 'Mesmo molde de 2026.1, parâmetros trocados. Faça depois das três provas reais.',
  observacoes: '<strong>(a)</strong> Limites assintóticos em notação $Θ$. '
             + '<strong>(b)</strong> $⌊x⌋$ é o maior inteiro menor ou igual a $x$. '
             + '<strong>(c)</strong> Assuma $T(1) = T(0) = Θ(1)$ e cada instrução em $Θ(1)$.',
  questoes: [

  { id: 'S2Q1', n: 1, pts: 2, tema: 'Recorrências',
    e: '<p>Encontre os limites assintóticos para as seguintes recorrências:</p>'
     + '<p>(a) $T(n) = 9T(n/3) + n^2$<br>'
     + '(b) $T(n) = 2T(n/4) + n$<br>'
     + '(c) $T(n) = 8T(n/2) + n^2$<br>'
     + '(d) $T(n) = 3T(n−1) + 1$</p>',
    gab: [
      '<strong>(a)</strong> $a = 9$, $b = 3$, $f(n) = n^2$. Temos '
      + '$n^{log_3 9} = n^2$. Como $f(n) = Θ\\p{n^{log_b a}}$, é o <strong>Caso 2</strong>:'
      + '$$T(n) = Θ(n^2 log n)$$',
      '<strong>(b)</strong> $a = 2$, $b = 4$, $f(n) = n$. Temos '
      + '$n^{log_4 2} = n^{1/2} = \\r{n}$. Como $f(n) = n = Ω\\p{n^{1/2 + ε}}$ com '
      + '$ε = 1/2$, e a regularidade vale — $2·\\f{n}{4} = \\f{n}{2} ≤ c·n$ com '
      + '$c = \\f{1}{2} < 1$ ✓ — é o <strong>Caso 3</strong>:'
      + '$$T(n) = Θ(n)$$',
      '<strong>(c)</strong> $a = 8$, $b = 2$, $f(n) = n^2$. Temos '
      + '$n^{log_2 8} = n^3$. Como $f(n) = n^2 = O\\p{n^{3 − ε}}$ com $ε = 1$, as folhas '
      + 'dominam — <strong>Caso 1</strong>:'
      + '$$T(n) = Θ(n^3)$$'
      + '<em>É a multiplicação de matrizes por blocos <strong>sem</strong> o truque de '
      + 'Strassen — daí não haver ganho sobre o método tradicional.</em>',
      '<strong>(d)</strong> Recorrência <strong>subtrativa</strong> — o Teorema Mestre não se '
      + 'aplica. Expandindo:'
      + '$$T(n) = 3T(n−1) + 1 = 9T(n−2) + 3 + 1 = ⋯ = 3^k T(n−k) + \\S{i=0}{k−1} 3^i$$'
      + 'Com $k = n$, e usando $\\S{i=0}{n−1}3^i = \\f{3^n − 1}{2}$:'
      + '$$T(n) = 3^n·Θ(1) + \\f{3^n − 1}{2} = Θ(3^n)$$'
      + '<em>Regra rápida: $T(n) = aT(n−1) + f(n)$ com $a ≥ 2$ é sempre $Θ(a^n)$ — '
      + 'a árvore tem altura $n$ e largura multiplicada por $a$ a cada nível.</em>'
    ] },

  { id: 'S2Q2', n: 2, pts: 2, tema: 'Laços aninhados',
    e: '<p>Forneça a complexidade assintótica para o tempo de execução do algoritmo a seguir. '
     + '<strong>Mostre o equacionamento e sua relação com os laços iterativos.</strong></p>'
     + '<pre class="pseudo"><span class="ln">s ← 0</span>'
     + '<span class="ln"><span class="kw">for</span> i ← 1 <span class="kw">to</span> n <span class="kw">do</span></span>'
     + '<span class="ln">  j ← n</span>'
     + '<span class="ln">  <span class="kw">while</span> j &gt; 1 <span class="kw">do</span></span>'
     + '<span class="ln">    <span class="kw">for</span> k ← 1 <span class="kw">to</span> i <span class="kw">do</span></span>'
     + '<span class="ln">      s ← s + 1</span>'
     + '<span class="ln">    j ← ⌊j / 2⌋</span></pre>',
    gab: [
      '<strong>Do mais interno para o mais externo.</strong>',
      '<strong>Laço $k$</strong> (o mais interno): vai de 1 a $i$, logo executa $i$ vezes, com '
      + 'corpo $Θ(1)$. Custo: $Θ(i)$.',
      '<strong>Laço $j$</strong> (intermediário): $j$ parte de $n$ e é dividido por 2 até '
      + 'chegar a 1, executando $Θ(log n)$ vezes — <strong>independentemente de $i$</strong>. '
      + 'A cada uma dessas iterações, roda o laço $k$ inteiro. Custo: $Θ(i·log n)$.',
      '<strong>Laço $i$</strong> (externo): vai de 1 a $n$.',
      '<strong>Equacionamento.</strong>'
      + '$$T(n) = \\S{i=1}{n}\\S{j\\t{-ésima divisão}}{Θ(log n)}\\S{k=1}{i} Θ(1) '
      + '= \\S{i=1}{n} Θ(log n)·i$$',
      'Como $log n$ não depende de $i$, sai do somatório:'
      + '$$T(n) = Θ(log n)·\\S{i=1}{n} i = Θ(log n)·\\f{n(n+1)}{2}$$',
      '$$T(n) = Θ(n^2 log n)$$',
      '<em>Mesma resposta da prova de 2026.1, com os papéis trocados: aqui o laço que depende '
      + 'do índice externo é o mais interno, e o logarítmico é o do meio. O equacionamento é '
      + 'idêntico porque a multiplicação é comutativa — mas você tem de mostrar que percebeu '
      + 'qual laço depende de quem.</em>'
    ] },

  { id: 'S2Q3', n: 3, pts: 2, tema: 'Invariante de laço',
    e: '<p>Considere o algoritmo abaixo, que recebe um vetor $A[1 … n]$ de números e devolve a '
     + 'quantidade de elementos <strong>estritamente positivos</strong>.</p>'
     + '<pre class="pseudo"><span class="ln"><span class="kw">Function</span> <span class="fnn">ContaPositivos</span>(A, n):</span>'
     + '<span class="ln">  c ← 0</span>'
     + '<span class="ln">  <span class="kw">for</span> i ← 1 <span class="kw">to</span> n <span class="kw">do</span></span>'
     + '<span class="ln">    <span class="kw">if</span> A[i] &gt; 0 <span class="kw">then</span></span>'
     + '<span class="ln">      c ← c + 1</span>'
     + '<span class="ln">  <span class="kw">return</span> c</span></pre>'
     + '<p>Especifique o <strong>Invariante de Laço</strong> para a variável $c$ no início de '
     + 'cada iteração $i$ e demonstre a corretude através dos passos de '
     + '<strong>Inicialização</strong>, <strong>Manutenção</strong> e <strong>Término</strong>.</p>',
    gab: [
      '<strong>Invariante:</strong> “No início da iteração $i$ do laço <code>for</code>, a '
      + 'variável $c$ contém a quantidade de elementos estritamente positivos em '
      + '$A[1 … i−1]$.”',
      'Formalmente: $c$ é a cardinalidade do conjunto dos índices $k$ com '
      + '$1 ≤ k ≤ i−1$ e $A[k] > 0$.',
      '<strong>Inicialização.</strong> Antes da primeira iteração, $i = 1$ e $c = 0$. '
      + 'O invariante afirma que $c$ é a quantidade de positivos em $A[1 … 0]$ — uma sequência '
      + 'vazia, que tem zero elementos positivos. Verdadeiro.',
      '<strong>Manutenção.</strong> Suponha o invariante válido no início da iteração $i$, isto '
      + 'é, $c = |{k ≤ i−1 : A[k] > 0}|$. O corpo do laço examina $A[i]$ e há dois casos:'
      + '<br>· Se $A[i] > 0$, o algoritmo faz $c ← c + 1$, e o novo valor é a contagem em '
      + '$A[1..i−1]$ mais um — exatamente a contagem em $A[1..i]$.'
      + '<br>· Se $A[i] ≤ 0$, o algoritmo não altera $c$, e a contagem em $A[1..i]$ é igual à '
      + 'de $A[1..i−1]$ — também correto.'
      + '<br>Nos dois casos, ao entrar na iteração $i+1$ vale '
      + '$c = |{k ≤ i : A[k] > 0}|$, que é o invariante com $i$ trocado por $i+1$. Mantido.',
      '<strong>Término.</strong> O laço encerra quando $i = n+1$. Substituindo no invariante, '
      + '$c = |{k ≤ n : A[k] > 0}|$ — a quantidade de elementos estritamente positivos em '
      + 'todo o vetor. É esse valor que o algoritmo retorna, logo ele está correto. ∎',
      '<strong>Complexidade:</strong> o laço executa $n$ vezes com corpo $Θ(1)$, logo '
      + '$T(n) = Θ(n)$.'
    ] },

  { id: 'S2Q4', n: 4, pts: 2, tema: 'Ler recursiva de D&C',
    e: '<p>Analise a função recursiva $G$ abaixo, que recebe um vetor $V$ de números '
     + '<strong>não ordenado</strong> e índices $a ≤ b$.</p>'
     + '<pre class="pseudo"><span class="ln"><span class="kw">Function</span> <span class="fnn">G</span>(V, a, b):</span>'
     + '<span class="ln">  <span class="kw">if</span> a = b <span class="kw">then return</span> V[a]</span>'
     + '<span class="ln">  i ← ⌊(a+b)/2⌋</span>'
     + '<span class="ln">  L ← <span class="fnn">G</span>(V, a, i)</span>'
     + '<span class="ln">  R ← <span class="fnn">G</span>(V, i+1, b)</span>'
     + '<span class="ln">  <span class="kw">return</span> L + R</span></pre>'
     + '<p>(a) O que a função $G$ retorna?<br>'
     + '(b) Determine a equação de recorrência do tempo de execução e seu limite assintótico.<br>'
     + '(c) Compare com a versão iterativa que soma o vetor num laço simples. Há vantagem '
     + 'assintótica em usar divisão e conquista aqui?</p>',
    gab: [
      '<strong>(a)</strong> A função retorna a <strong>soma</strong> dos elementos de '
      + '$V[a … b]$. Cada chamada divide o intervalo, soma as duas metades recursivamente e '
      + 'devolve $L + R$; no caso base devolve o único elemento.',
      '<strong>(b)</strong> São 2 chamadas recursivas sobre subproblemas de tamanho $n/2$, e '
      + 'a combinação é uma única adição, $Θ(1)$. Recorrência:'
      + '$$T(n) = 2T(n/2) + Θ(1)$$'
      + 'Pelo Teorema Mestre: $a = 2$, $b = 2$, $f(n) = Θ(1)$, e $n^{log_2 2} = n$. '
      + 'Como $f(n) = O(n^{1−ε})$ com $ε = 1$, é o <strong>Caso 1</strong>:'
      + '$$T(n) = Θ(n)$$',
      '<strong>(c) Não há vantagem assintótica.</strong> A versão iterativa também é $Θ(n)$, e '
      + 'com constantes menores — sem o custo de gerenciar a pilha de chamadas. '
      + 'Além disso, a versão recursiva consome $Θ(log n)$ de espaço na pilha, enquanto a '
      + 'iterativa usa $Θ(1)$.',
      '<strong>A lição.</strong> Divisão e conquista só ganha quando permite '
      + '<em>descartar</em> subproblemas (busca binária, unimodal) ou '
      + '<em>reduzir</em> quantos são (Strassen, Karatsuba). Quando é preciso examinar todo '
      + 'elemento de qualquer forma, como na soma ou no máximo, o limite $Ω(n)$ é inescapável '
      + 'e a recursão não traz ganho. '
      + '<em>(A mesma conclusão vale para a questão 4 da prova de 2026.1, que calcula o '
      + 'máximo.)</em>'
    ] },

  { id: 'S2Q5', n: 5, pts: 2, tema: 'Projetar D&C',
    e: '<p>Seja $X$ um vetor de $n$ inteiros <strong>distintos</strong> dispostos em ordem '
     + '<strong>crescente</strong>. Desenvolva um algoritmo de <strong>Divisão e Conquista</strong> '
     + 'para encontrar algum índice $i$ tal que $X[i] = i$, ou informar que não existe tal '
     + 'índice.</p>'
     + '<p>Indique a recorrência do seu algoritmo e o seu tempo em notação $Θ$. '
     + 'O tempo deve ser $Θ(log n)$.</p>',
    gab: [
      '<strong>A observação-chave.</strong> Defina $D[i] = X[i] − i$. Como os elementos de $X$ '
      + 'são inteiros <em>distintos</em> e <em>crescentes</em>, temos '
      + '$X[i+1] ≥ X[i] + 1$, logo'
      + '$$D[i+1] = X[i+1] − (i+1) ≥ X[i] + 1 − i − 1 = D[i]$$'
      + 'Ou seja, <strong>$D$ é não decrescente</strong> — é uma função monótona.',
      '<strong>Consequência.</strong> Procurar $i$ com $X[i] = i$ é procurar um zero de $D$. '
      + 'Como $D$ é monótona, <strong>busca binária se aplica</strong>:'
      + '<br>· Se $D[m] = 0$, achamos: devolva $m$.'
      + '<br>· Se $D[m] < 0$ (isto é, $X[m] < m$), então $D[k] < 0$ para todo $k ≤ m$ — '
      + 'nenhum zero à esquerda. Procure à direita.'
      + '<br>· Se $D[m] > 0$ (isto é, $X[m] > m$), então $D[k] > 0$ para todo $k ≥ m$ — '
      + 'nenhum zero à direita. Procure à esquerda.',
      '<strong>Algoritmo.</strong>'
      + '<pre class="pseudo"><span class="ln"><span class="kw">Function</span> <span class="fnn">PontoFixo</span>(X, a, b):</span>'
      + '<span class="ln">  <span class="kw">if</span> a &gt; b <span class="kw">then return</span> NENHUM</span>'
      + '<span class="ln">  m ← ⌊(a+b)/2⌋</span>'
      + '<span class="ln">  <span class="kw">if</span> X[m] = m <span class="kw">then return</span> m</span>'
      + '<span class="ln">  <span class="kw">else if</span> X[m] &lt; m <span class="kw">then</span></span>'
      + '<span class="ln">    <span class="kw">return</span> <span class="fnn">PontoFixo</span>(X, m+1, b)</span>'
      + '<span class="ln">  <span class="kw">else</span></span>'
      + '<span class="ln">    <span class="kw">return</span> <span class="fnn">PontoFixo</span>(X, a, m−1)</span></pre>',
      '<strong>Recorrência e complexidade.</strong> Uma única chamada recursiva sobre metade do '
      + 'intervalo, com $Θ(1)$ de trabalho local:'
      + '$$T(n) = T(n/2) + Θ(1)$$'
      + 'Pelo Teorema Mestre ($a = 1$, $b = 2$, $n^{log_2 1} = 1 = f(n)$ — Caso 2):'
      + '$$T(n) = Θ(log n) ✓$$',
      '<strong>Por que a hipótese "distintos" é essencial.</strong> Se houvesse repetições, '
      + '$D$ poderia decrescer ($X[i+1] = X[i]$ daria $D[i+1] = D[i] − 1$) e a monotonicidade '
      + 'se perderia — o problema passaria a exigir $Ω(n)$ no pior caso. '
      + '<em>Este é o item 3 dos exercícios do slide 03.</em>'
    ] },

  { id: 'S2Q6', n: 6, pts: 1, extra: true, tema: 'D&C com retorno enriquecido',
    e: '<p><strong>(Extra)</strong> Dado um vetor $A$ com $n$ números (possivelmente negativos), '
     + 'queremos encontrar a <strong>maior soma de um subvetor contíguo não vazio</strong> — '
     + 'isto é, $max_{i ≤ j} \\S{k=i}{j} A[k]$.</p>'
     + '<p>Se dividirmos o vetor em Esquerda (E) e Direita (D), o subvetor ótimo está '
     + 'integralmente em E, integralmente em D, ou cruza a fronteira.</p>'
     + '<p>Usando <strong>Divisão e Conquista</strong>, escreva um algoritmo que resolve o '
     + 'problema em $Θ(n)$. Indique que informação cada chamada recursiva precisa retornar para '
     + 'que a combinação custe $Θ(1)$.</p>',
    gab: [
      '<strong>O que cada chamada deve retornar.</strong> Para combinar em $Θ(1)$, a tripla '
      + 'usual não basta — é preciso a quádrupla:'
      + '<br>· <strong>tot</strong> — a soma de <em>todos</em> os elementos do trecho;'
      + '<br>· <strong>pre</strong> — a maior soma de um <em>prefixo</em> do trecho;'
      + '<br>· <strong>suf</strong> — a maior soma de um <em>sufixo</em> do trecho;'
      + '<br>· <strong>melhor</strong> — a maior soma de subvetor contíguo do trecho (a resposta).',
      '<strong>Por que essas quatro.</strong> O caso que cruza a fronteira é um sufixo de E '
      + 'seguido de um prefixo de D, logo vale $suf_E + pre_D$ — calculável em $Θ(1)$ com essa '
      + 'informação. E $pre$ e $suf$ do trecho combinado também saem em $Θ(1)$ a partir dos '
      + 'valores das metades, o que mantém a invariante da recursão.',
      '<strong>As fórmulas de combinação.</strong>'
      + '$$tot = tot_E + tot_D$$'
      + '$$pre = max\\p{pre_E, tot_E + pre_D}$$'
      + '$$suf = max\\p{suf_D, tot_D + suf_E}$$'
      + '$$melhor = max\\p{melhor_E, melhor_D, suf_E + pre_D}$$',
      '<strong>Algoritmo.</strong>'
      + '<pre class="pseudo"><span class="ln"><span class="kw">Function</span> <span class="fnn">MaxSub</span>(A, a, b):</span>'
      + '<span class="ln">  <span class="kw">if</span> a = b <span class="kw">then</span></span>'
      + '<span class="ln">    <span class="kw">return</span> (A[a], A[a], A[a], A[a])   <span class="cm">// tot, pre, suf, melhor</span></span>'
      + '<span class="ln">  i ← ⌊(a+b)/2⌋</span>'
      + '<span class="ln">  (totE, preE, sufE, melE) ← <span class="fnn">MaxSub</span>(A, a, i)</span>'
      + '<span class="ln">  (totD, preD, sufD, melD) ← <span class="fnn">MaxSub</span>(A, i+1, b)</span>'
      + '<span class="ln">  tot ← totE + totD</span>'
      + '<span class="ln">  pre ← <span class="fnn">max</span>(preE, totE + preD)</span>'
      + '<span class="ln">  suf ← <span class="fnn">max</span>(sufD, totD + sufE)</span>'
      + '<span class="ln">  mel ← <span class="fnn">max</span>(melE, melD, sufE + preD)</span>'
      + '<span class="ln">  <span class="kw">return</span> (tot, pre, suf, mel)</span></pre>',
      '<strong>Recorrência e complexidade.</strong> Duas chamadas sobre metades, e a combinação '
      + 'faz um número constante de somas e comparações:'
      + '$$T(n) = 2T(n/2) + Θ(1)$$'
      + 'Pelo Teorema Mestre ($n^{log_2 2} = n$ domina $f(n) = 1$ — Caso 1):'
      + '$$T(n) = Θ(n) ✓$$',
      '<strong>O contraste que vale notar.</strong> A versão "clássica" deste problema em livros '
      + 'de divisão e conquista calcula o caso que cruza com uma varredura $Θ(n)$ a partir do '
      + 'meio, dando $T(n) = 2T(n/2) + Θ(n) = Θ(n log n)$. '
      + 'O <strong>retorno enriquecido</strong> derruba a combinação para $Θ(1)$ e o Teorema '
      + 'Mestre cai do Caso 2 para o Caso 1 — exatamente a mesma jogada da questão 6 de 2026.1.',
      '<em>(Existe também a solução por programação dinâmica em $Θ(n)$ — o algoritmo de '
      + 'Kadane — mas o enunciado pede divisão e conquista.)</em>'
    ] }
  ]
},

/* ═════════════════════════════════════════════ SIMULADO 3 — autoral ═══════ */
{
  id: 'S3',
  nome: 'Simulado autoral B',
  origem: 'Autoral · itens mais difíceis, para calibrar o topo da nota',
  oficial: false,
  minutos: 100,
  resumo: 'Mesmo molde, mas puxando para os casos que o Teorema Mestre não resolve e para '
        + 'decomposições menos óbvias. Use como último teste antes da prova.',
  observacoes: '<strong>(a)</strong> Limites assintóticos em notação $Θ$. '
             + '<strong>(b)</strong> $⌊x⌋$ é o maior inteiro menor ou igual a $x$. '
             + '<strong>(c)</strong> Assuma $T(1) = T(0) = Θ(1)$ e cada instrução em $Θ(1)$.',
  questoes: [

  { id: 'S3Q1', n: 1, pts: 2, tema: 'Recorrências',
    e: '<p>Encontre os limites assintóticos para as seguintes recorrências:</p>'
     + '<p>(a) $T(n) = 2T(n/2) + n log n$<br>'
     + '(b) $T(n) = T(n/3) + T(2n/3) + n$<br>'
     + '(c) $T(n) = T(\\r{n}) + 1$<br>'
     + '(d) $T(n) = \\f{1}{n}\\S{i=0}{n−1} T(i) + Θ(n)$</p>',
    gab: [
      '<strong>(a) $Θ(n log^2 n)$.</strong> O Teorema Mestre <strong>não se aplica</strong>: '
      + '$n^{log_2 2} = n$ e $f(n) = n log n$ é maior que $n$, mas apenas por fator '
      + 'logarítmico — não existe $ε > 0$ com $n log n = Ω(n^{1+ε})$.',
      'Pela árvore: no nível $i$ há $2^i$ nós de tamanho $\\f{n}{2^i}$, custo local '
      + '$\\f{n}{2^i}lg\\f{n}{2^i}$ cada, logo o nível custa $n(lg n − i)$. Somando os '
      + '$lg n$ níveis:'
      + '$$T(n) = n\\S{k=1}{lg n} k = n·\\f{lg n(lg n + 1)}{2} = Θ(n log^2 n)$$',
      '<strong>(b) $Θ(n log n)$.</strong> Subproblemas de <strong>tamanhos diferentes</strong> — '
      + 'o Teorema Mestre não se aplica.',
      'Pela árvore: os tamanhos de cada nível completo somam '
      + '$\\f{n}{3} + \\f{2n}{3} = n$, logo <strong>cada nível completo custa $Θ(n)$</strong>. '
      + 'O caminho mais curto tem profundidade $log_3 n$ e o mais longo $log_{3/2} n$. '
      + 'Portanto $T(n) = Ω(n log_3 n)$ e $T(n) = O(n log_{3/2} n)$; como as duas alturas '
      + 'diferem por constante, $$T(n) = Θ(n log n)$$',
      '<strong>(c) $Θ(log log n)$.</strong> Mudança de variável: com $n = 2^m$ e '
      + '$S(m) = T(2^m)$, a recorrência vira $S(m) = S(m/2) + 1$, que pelo Teorema Mestre '
      + '(Caso 2, $m^{log_2 1} = 1 = f$) é $Θ(lg m)$. Voltando, $m = lg n$:'
      + '$$T(n) = Θ(lg lg n)$$'
      + '<em>Intuição: tirar a raiz divide o expoente por 2, então o expoente cai pela metade a '
      + 'cada passo — são $lg(lg n)$ passos.</em>',
      '<strong>(d) $Θ(n)$.</strong> Há um <strong>somatório</strong> na recorrência: use '
      + '<strong>remoção de histórico</strong>. Multiplique por $n$:'
      + '$$nT(n) = \\S{i=0}{n−1}T(i) + n·Θ(n)$$'
      + 'Escreva para $n−1$:'
      + '$$(n−1)T(n−1) = \\S{i=0}{n−2}T(i) + (n−1)·Θ(n−1)$$'
      + 'Subtraindo, os somatórios colapsam num único termo:'
      + '$$nT(n) − (n−1)T(n−1) = T(n−1) + Θ(n)$$'
      + '$$nT(n) = nT(n−1) + Θ(n) ⇒ T(n) = T(n−1) + Θ(1) ⇒ T(n) = Θ(n)$$'
      + '<em>É o caso médio do algoritmo do k-ésimo menor elemento (slide 03).</em>'
    ] },

  { id: 'S3Q2', n: 2, pts: 2, tema: 'Laços aninhados',
    e: '<p>Forneça a complexidade assintótica do algoritmo a seguir. '
     + '<strong>Mostre o equacionamento.</strong></p>'
     + '<pre class="pseudo"><span class="ln">s ← 0</span>'
     + '<span class="ln"><span class="kw">for</span> i ← 1 <span class="kw">to</span> n <span class="kw">do</span></span>'
     + '<span class="ln">  j ← i</span>'
     + '<span class="ln">  <span class="kw">while</span> j &lt; n <span class="kw">do</span></span>'
     + '<span class="ln">    s ← s + 1</span>'
     + '<span class="ln">    j ← j · 2</span></pre>',
    gab: [
      '<strong>A dificuldade.</strong> Aqui o laço interno <strong>depende de $i$</strong>: '
      + '$j$ começa em $i$, não em 1. Não é possível simplesmente tirar $log n$ do somatório.',
      '<strong>Quantas iterações faz o <code>while</code> para um $i$ fixo?</strong> '
      + '$j$ assume $i, 2i, 4i, …, 2^t i$, e o laço para quando $2^t i ≥ n$. '
      + 'Resolvendo: $2^t ≥ \\f{n}{i}$, logo $t = ⌈lg\\f{n}{i}⌉$. '
      + 'O número de iterações é'
      + '$$Θ\\p{lg\\f{n}{i}} = Θ(lg n − lg i)$$',
      '<strong>Equacionamento.</strong>'
      + '$$T(n) = \\S{i=1}{n} Θ\\p{lg n − lg i} = Θ\\p{n lg n − \\S{i=1}{n} lg i}$$',
      '<strong>Resolva o somatório.</strong> Note que '
      + '$\\S{i=1}{n} lg i = lg\\p{\\S{}} = lg(n!)$, e pelo resultado conhecido '
      + '$lg(n!) = Θ(n lg n)$. Mais precisamente, $lg(n!) = n lg n − Θ(n)$ (por Stirling: '
      + '$ln n! = n ln n − n + O(log n)$).',
      'Substituindo:'
      + '$$T(n) = Θ\\p{n lg n − \\p{n lg n − Θ(n)}} = Θ(n)$$',
      '$$T(n) = Θ(n)$$',
      '<strong>Conferindo pela intuição.</strong> Para $i$ pequeno o laço roda ~$lg n$ vezes; '
      + 'mas para $i > n/2$ ele roda apenas <strong>uma</strong> vez. Como metade dos valores '
      + 'de $i$ está acima de $n/2$, a média de iterações por $i$ é $O(1)$ — daí o total '
      + 'linear, e não $n log n$.',
      '<strong>Por que esta questão é mais difícil que a de 2026.1.</strong> Lá o laço interno '
      + 'era independente de $i$ e o $log n$ saía do somatório direto. Aqui a dependência '
      + 'obriga a somar $lg i$, o que exige conhecer $lg(n!) = Θ(n lg n)$ — '
      + 'um pré-requisito do Módulo 0 que aparece na Lista 1 nos itens 26(f) e 30(e).'
    ] },

  { id: 'S3Q3', n: 3, pts: 2, tema: 'Invariante de laço',
    e: '<p>O algoritmo abaixo recebe um vetor $A[1 … n]$ de números e devolve o índice de uma '
     + 'posição de <strong>valor máximo</strong> (a primeira, em caso de empate).</p>'
     + '<pre class="pseudo"><span class="ln"><span class="kw">Function</span> <span class="fnn">IndiceMax</span>(A, n):</span>'
     + '<span class="ln">  p ← 1</span>'
     + '<span class="ln">  <span class="kw">for</span> i ← 2 <span class="kw">to</span> n <span class="kw">do</span></span>'
     + '<span class="ln">    <span class="kw">if</span> A[i] &gt; A[p] <span class="kw">then</span></span>'
     + '<span class="ln">      p ← i</span>'
     + '<span class="ln">  <span class="kw">return</span> p</span></pre>'
     + '<p>Especifique o <strong>Invariante de Laço</strong> para a variável $p$ e demonstre a '
     + 'corretude pelos passos de <strong>Inicialização</strong>, <strong>Manutenção</strong> e '
     + '<strong>Término</strong>. Atenção: o invariante precisa ser forte o bastante para '
     + 'justificar também a cláusula “a primeira, em caso de empate”.</p>',
    gab: [
      '<strong>Invariante:</strong> “No início da iteração $i$ do laço <code>for</code>, '
      + '$p$ é o <strong>menor</strong> índice de $A[1 … i−1]$ cujo valor é máximo nesse '
      + 'subvetor.”',
      'Formalmente: $1 ≤ p ≤ i−1$, e (i) $A[p] ≥ A[k]$ para todo $k ≤ i−1$; '
      + '(ii) $A[p] > A[k]$ para todo $k < p$.',
      '<strong>Inicialização.</strong> Antes da primeira iteração, $i = 2$ e $p = 1$. '
      + 'O subvetor é $A[1 … 1]$, em que o único índice é 1: ele é trivialmente o de valor '
      + 'máximo, e é o menor tal índice (não há $k < 1$). As duas condições valem. ✓',
      '<strong>Manutenção.</strong> Suponha o invariante válido no início da iteração $i$. '
      + 'Dois casos:'
      + '<br>· <strong>$A[i] > A[p]$:</strong> o algoritmo faz $p ← i$. Então o novo $A[p] = A[i]$ '
      + 'é estritamente maior que o máximo anterior, logo é máximo em $A[1..i]$, e é o único '
      + 'índice com esse valor até aqui — portanto o menor. Condições (i) e (ii) ✓'
      + '<br>· <strong>$A[i] ≤ A[p]$:</strong> o algoritmo não altera $p$. O máximo de $A[1..i]$ '
      + 'continua sendo $A[p]$ (pois $A[i]$ não o supera), e $p$ segue sendo o menor índice com '
      + 'esse valor — note que a <em>desigualdade estrita</em> no teste é essencial aqui: se o '
      + 'teste fosse $≥$, um empate faria $p$ avançar e a cláusula “a primeira” se perderia. ✓'
      + '<br>Nos dois casos o invariante vale para a iteração $i+1$. ✓',
      '<strong>Término.</strong> O laço encerra quando $i = n+1$. Substituindo no invariante: '
      + '$p$ é o menor índice de $A[1 … n]$ cujo valor é máximo em todo o vetor. '
      + 'É esse índice que o algoritmo retorna, e ele satisfaz exatamente a especificação '
      + '(“o índice de uma posição de valor máximo — a primeira, em caso de empate”). ∎',
      '<strong>Complexidade:</strong> $n − 1$ iterações de custo $Θ(1)$, logo $T(n) = Θ(n)$.',
      '<strong>O ponto que esta questão cobra.</strong> Um invariante fraco — “$p$ é o índice '
      + 'de um valor máximo” — verificaria as três propriedades mas <em>não</em> provaria a '
      + 'especificação completa. A condição (ii) é o que liga o comportamento do código '
      + '(comparação estrita) à cláusula do enunciado. É o mesmo tipo de cuidado que a cláusula '
      + '“contém os mesmos elementos” exige no invariante do insertion sort (item 10 da lista).'
    ] },

  { id: 'S3Q4', n: 4, pts: 2, tema: 'Ler recursiva de D&C',
    e: '<p>Analise a função recursiva $H$ abaixo. Ela recebe um inteiro $x$ e um inteiro '
     + '$n ≥ 0$.</p>'
     + '<pre class="pseudo"><span class="ln"><span class="kw">Function</span> <span class="fnn">H</span>(x, n):</span>'
     + '<span class="ln">  <span class="kw">if</span> n = 0 <span class="kw">then return</span> 1</span>'
     + '<span class="ln">  y ← <span class="fnn">H</span>(x, ⌊n/2⌋)</span>'
     + '<span class="ln">  <span class="kw">if</span> n <span class="kw">mod</span> 2 = 0 <span class="kw">then</span></span>'
     + '<span class="ln">    <span class="kw">return</span> y · y</span>'
     + '<span class="ln">  <span class="kw">else</span></span>'
     + '<span class="ln">    <span class="kw">return</span> x · y · y</span></pre>'
     + '<p>(a) O que a função $H$ retorna?<br>'
     + '(b) Determine a recorrência do tempo de execução e seu limite assintótico.<br>'
     + '(c) O que aconteceria com a complexidade se a linha 3 fosse removida e as linhas 5 e 7 '
     + 'passassem a chamar $H(x, ⌊n/2⌋)$ duas vezes, em vez de reutilizar $y$?</p>',
    gab: [
      '<strong>(a)</strong> A função retorna $x^n$ — a <strong>exponenciação rápida</strong>. '
      + 'A recursão implementa a identidade'
      + '$$x^n = \\c{\\p{x^{n/2}}^2}{se n é par}{x·\\p{x^{⌊n/2⌋}}^2}{se n é ímpar}$$'
      + 'Confira num exemplo: $H(2,5)$ → $y = H(2,2)$; $H(2,2)$ → $y = H(2,1)$; '
      + '$H(2,1)$ → $y = H(2,0) = 1$, e como 1 é ímpar devolve $2·1·1 = 2$. '
      + 'Então $H(2,2) = 2·2 = 4$, e $H(2,5) = 2·4·4 = 32 = 2^5$ ✓',
      '<strong>(b)</strong> Há <strong>uma única</strong> chamada recursiva, sobre $⌊n/2⌋$, e '
      + 'o trabalho local (um resto, uma ou duas multiplicações) é $Θ(1)$:'
      + '$$T(n) = T(n/2) + Θ(1)$$'
      + 'Pelo Teorema Mestre: $a = 1$, $b = 2$, $f(n) = Θ(1)$, e $n^{log_2 1} = n^0 = 1$. '
      + 'Como $f(n) = Θ\\p{n^{log_b a}}$, é o <strong>Caso 2</strong>:'
      + '$$T(n) = Θ(log n)$$',
      '<strong>(c) A complexidade saltaria de $Θ(log n)$ para $Θ(n)$.</strong>',
      'Com duas chamadas recursivas em vez de uma, a recorrência passaria a ser'
      + '$$T(n) = 2T(n/2) + Θ(1)$$'
      + 'que pelo Teorema Mestre ($n^{log_2 2} = n$ domina $f(n) = 1$ — Caso 1) dá '
      + '$$T(n) = Θ(n)$$',
      '<strong>Todo o ganho do algoritmo estaria perdido</strong> — ficaria na mesma classe do '
      + 'método ingênuo de multiplicar $x$ por si mesmo $n$ vezes.',
      '<strong>A lição.</strong> Guardar o resultado da chamada recursiva numa variável e '
      + 'reutilizá-lo não é detalhe de implementação: é o que transforma $2T(n/2)$ em '
      + '$T(n/2)$, mudando o caso do Teorema Mestre. '
      + 'O mesmo fenômeno explica por que o Fibonacci recursivo ingênuo é exponencial — '
      + 'ele recalcula os mesmos subproblemas em vez de reaproveitá-los.'
    ] },

  { id: 'S3Q5', n: 5, pts: 2, tema: 'Projetar D&C',
    e: '<p>Sejam $X$ e $Y$ dois vetores <strong>ordenados</strong> de tamanhos $n$ e $m$, '
     + 'respectivamente, com elementos distintos. Desenvolva um algoritmo de '
     + '<strong>Divisão e Conquista</strong> para encontrar o $k$-ésimo menor elemento da união '
     + '$X ∪ Y$.</p>'
     + '<p>O algoritmo deve executar em tempo $O(log m + log n)$. Indique a recorrência e '
     + 'justifique o limite.</p>',
  gab: [
      '<strong>A ideia.</strong> Em cada passo, descarte um bloco de elementos que '
      + '<em>provadamente</em> não contém o $k$-ésimo menor, ajustando $k$ quando o descarte '
      + 'for pela esquerda.',
      '<strong>O argumento de descarte.</strong> Compare os elementos nas posições '
      + '$i = ⌊k/2⌋$ de $X$ e $j = ⌈k/2⌉$ de $Y$ (de modo que $i + j = k$).'
      + '<br>· Se $X[i] < Y[j]$: então $X[1..i]$ contém no máximo $i + j − 1 = k−1$ elementos '
      + 'menores ou iguais a $X[i]$ na união, logo <strong>nenhum</strong> dos elementos '
      + '$X[1..i]$ pode ser o $k$-ésimo <em>ou maior</em> — na verdade, todos eles estão '
      + 'entre os $k−1$ menores. Descarte $X[1..i]$ e procure o $(k−i)$-ésimo no restante.'
      + '<br>· Se $X[i] > Y[j]$: simetricamente, descarte $Y[1..j]$ e procure o '
      + '$(k−j)$-ésimo.'
      + '<br>· Se $X[i] = Y[j]$ (não ocorre com elementos distintos entre si, mas se ocorrer): '
      + 'esse valor é o $k$-ésimo.',
      '<strong>Algoritmo.</strong>'
      + '<pre class="pseudo"><span class="ln"><span class="kw">Function</span> <span class="fnn">KEsimo</span>(X, a, Y, b, k):</span>'
      + '<span class="ln">  <span class="cm">// a, b = início das porções ainda ativas</span></span>'
      + '<span class="ln">  <span class="kw">if</span> a &gt; n <span class="kw">then return</span> Y[b + k − 1]   <span class="cm">// X esgotado</span></span>'
      + '<span class="ln">  <span class="kw">if</span> b &gt; m <span class="kw">then return</span> X[a + k − 1]   <span class="cm">// Y esgotado</span></span>'
      + '<span class="ln">  <span class="kw">if</span> k = 1 <span class="kw">then return</span> <span class="fnn">min</span>(X[a], Y[b])</span>'
      + '<span class="ln">  i ← <span class="fnn">min</span>(a + ⌊k/2⌋ − 1, n)</span>'
      + '<span class="ln">  j ← <span class="fnn">min</span>(b + ⌈k/2⌉ − 1, m)</span>'
      + '<span class="ln">  <span class="kw">if</span> X[i] &lt; Y[j] <span class="kw">then</span></span>'
      + '<span class="ln">    <span class="kw">return</span> <span class="fnn">KEsimo</span>(X, i+1, Y, b, k − (i − a + 1))</span>'
      + '<span class="ln">  <span class="kw">else</span></span>'
      + '<span class="ln">    <span class="kw">return</span> <span class="fnn">KEsimo</span>(X, a, Y, j+1, k − (j − b + 1))</span></pre>',
      '<strong>Recorrência.</strong> Cada chamada descarta aproximadamente $\\f{k}{2}$ '
      + 'elementos, ou seja, <strong>reduz $k$ à metade</strong>, com trabalho local $Θ(1)$:'
      + '$$T(k) = T(k/2) + Θ(1) ⇒ T(k) = Θ(log k)$$',
      '<strong>Fechando o limite pedido.</strong> Como $k ≤ n + m$,'
      + '$$T = O\\p{log(n+m)} = O\\p{log(2·max(m,n))} = O\\p{log max(m,n)} = O(log m + log n)$$'
      + 'usando $log(n+m) ≤ log(2 max(m,n)) = 1 + log max(m,n)$ e '
      + '$log max(m,n) ≤ log m + log n$ para $m, n ≥ 2$. ✓',
      '<strong>Por que não basta uma busca binária simples.</strong> Buscar em $X$ e em $Y$ '
      + 'separadamente não resolve: o $k$-ésimo da união depende de quantos elementos de '
      + '<em>cada</em> vetor estão abaixo dele, e essas duas quantidades são acopladas. '
      + 'O algoritmo acima faz as duas buscas <em>simultaneamente</em>, mantendo a soma '
      + '$i + j = k$ como invariante do particionamento.',
      '<em>É o item 4 dos exercícios do slide 03.</em>'
    ] },

  { id: 'S3Q6', n: 6, pts: 1, extra: true, tema: 'D&C com retorno enriquecido',
    e: '<p><strong>(Extra)</strong> Dado um vetor $A$ com $n$ números, uma '
     + '<strong>inversão</strong> é um par de índices $(i, j)$ com $i < j$ e $A[i] > A[j]$.</p>'
     + '<p>Projete um algoritmo de <strong>Divisão e Conquista</strong> que conte o número total '
     + 'de inversões em tempo $Θ(n log n)$. Indique que informação cada chamada recursiva deve '
     + 'retornar e por que a combinação custa $Θ(n)$.</p>',
    gab: [
      '<strong>A decomposição.</strong> Divida $A$ em metades E e D. Toda inversão é de um de '
      + 'três tipos:'
      + '<br>· ambos os índices em E — contadas recursivamente;'
      + '<br>· ambos em D — contadas recursivamente;'
      + '<br>· $i ∈ E$ e $j ∈ D$ — as inversões <em>cruzadas</em>, que a combinação precisa contar.',
      '<strong>O que cada chamada retorna.</strong> A quantidade de inversões do trecho '
      + '<strong>e o trecho ordenado</strong>. É o retorno enriquecido: ordenar de graça, '
      + 'durante a recursão, é o que torna a contagem cruzada linear.',
      '<strong>Por que a combinação é $Θ(n)$.</strong> Com E e D já ordenados, faça a '
      + 'intercalação do Merge Sort. Quando o elemento $Y[j]$ de D é escolhido antes de '
      + '$X[i]$ de E, isso significa que $Y[j]$ é menor que <strong>todos</strong> os elementos '
      + 'restantes de E — que são $|E| − i + 1$. Cada um forma uma inversão com $Y[j]$, então '
      + 'some $|E| − i + 1$ de uma vez, em $Θ(1)$.',
      '<strong>Algoritmo.</strong>'
      + '<pre class="pseudo"><span class="ln"><span class="kw">Function</span> <span class="fnn">ContaInv</span>(A, a, b):</span>'
      + '<span class="ln">  <span class="kw">if</span> a ≥ b <span class="kw">then return</span> (0, [A[a]])   <span class="cm">// zero inversões, trecho ordenado</span></span>'
      + '<span class="ln">  i ← ⌊(a+b)/2⌋</span>'
      + '<span class="ln">  (invE, E) ← <span class="fnn">ContaInv</span>(A, a, i)</span>'
      + '<span class="ln">  (invD, D) ← <span class="fnn">ContaInv</span>(A, i+1, b)</span>'
      + '<span class="ln">  (invC, M) ← <span class="fnn">IntercalaEConta</span>(E, D)</span>'
      + '<span class="ln">  <span class="kw">return</span> (invE + invD + invC, M)</span>'
      + '<span class="ln"></span>'
      + '<span class="ln"><span class="kw">Function</span> <span class="fnn">IntercalaEConta</span>(E, D):</span>'
      + '<span class="ln">  p ← 1;  q ← 1;  inv ← 0;  M ← [ ]</span>'
      + '<span class="ln">  <span class="kw">while</span> p ≤ |E| <span class="kw">and</span> q ≤ |D| <span class="kw">do</span></span>'
      + '<span class="ln">    <span class="kw">if</span> E[p] ≤ D[q] <span class="kw">then</span></span>'
      + '<span class="ln">      anexa E[p] a M;  p ← p + 1</span>'
      + '<span class="ln">    <span class="kw">else</span></span>'
      + '<span class="ln">      anexa D[q] a M;  q ← q + 1</span>'
      + '<span class="ln">      inv ← inv + (|E| − p + 1)      <span class="cm">// D[q] inverte com todo E[p..]</span></span>'
      + '<span class="ln">  anexa o resto de E e de D a M</span>'
      + '<span class="ln">  <span class="kw">return</span> (inv, M)</span></pre>',
      '<strong>Recorrência e complexidade.</strong> Duas chamadas sobre metades, e a '
      + 'combinação (intercalação com contagem) é $Θ(n)$:'
      + '$$T(n) = 2T(n/2) + Θ(n)$$'
      + 'Pelo Teorema Mestre ($a = 2$, $b = 2$, $n^{log_2 2} = n = f(n)$ — <strong>Caso 2</strong>):'
      + '$$T(n) = Θ(n log n) ✓$$',
      '<strong>Note a diferença em relação às outras questões 6.</strong> Aqui o retorno '
      + 'enriquecido <em>não</em> derruba a combinação para $Θ(1)$ — ela permanece $Θ(n)$, e '
      + 'a resposta é $Θ(n log n)$, não $Θ(n)$. O que ele evita é o custo $Θ(n^2)$ da contagem '
      + 'ingênua par a par. <strong>A informação extra certa é aquela que faz a combinação ser '
      + 'tão barata quanto possível</strong> — e aqui $Θ(n)$ é o melhor possível, porque a '
      + 'contagem de inversões tem limite inferior $Ω(n log n)$ no modelo de comparação.',
      '<em>Aplicação clássica: medir o quão “desordenada” está uma lista, ou a distância entre '
      + 'dois rankings (coeficiente tau de Kendall).</em>'
    ] }
  ]
}

];
