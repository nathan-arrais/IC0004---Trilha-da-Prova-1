/* ==========================================================================
   exercicios.js — Lista de Exercícios Parte 1 (Profs. George Lima e Rafael Melo)
   completa: 76 questões, subdivididas em itens individuais.

   Os itens que a lista referencia apenas por número ("Cormen 4.4-1") têm o
   enunciado transcrito do PDF de Cormen 3ed BR em `Bibliografia Oficial/`.
   Fórmulas que o PDF guarda como imagem foram reconstruídas e estão marcadas.

   Campos:
     id  identificador estável        n/sub  número e subitem na lista
     s   seção (1..4)                 e      enunciado (HTML + $matemática$)
     t   tipo                         d      dificuldade 1..3
     p   relevância para a Prova 1    g      tags
     h   dica (opcional)              sol    solução passo a passo
     r   resposta curta (opcional)    ref    referência bibliográfica
   ========================================================================== */

window.SECOES = [
  { id: 1, nome: 'Introdução a algoritmos',
    desc: 'Corretude, invariantes, contagem de comparações. Alimenta a questão 3 da prova.' },
  { id: 2, nome: 'Crescimento de funções',
    desc: 'Notação assintótica, ordenação de funções e análise de laços. A maior seção da '
        + 'lista, e a base das questões 1 e 2.' },
  { id: 3, nome: 'Divisão e conquista',
    desc: 'Recorrências e os quatro métodos de solução. É de onde sai a questão 1.' },
  { id: 4, nome: 'Projeto de algoritmos',
    desc: 'Casamento de cadeias, pré-processamento e elemento majoritário. '
        + 'Treino para as questões 5 e 6.' }
];

window.EXERCICIOS = [

/* ═══════════════════════════════ SEÇÃO 1 — Introdução a algoritmos ═════════ */

{ id: 'L1-01', n: 1, s: 1, t: 'codigo', d: 1, p: 'media', g: ['insertion-sort', 'pseudocódigo'],
  ref: 'Cormen 2.1-2',
  e: '<p><em>(Cormen 2.1-2)</em> Reescreva o procedimento <code>Insertion-Sort</code> para '
   + 'ordenar em ordem não crescente, em vez da ordem não decrescente.</p>',
  h: 'Só uma comparação precisa mudar.',
  sol: [
    'No <code>Insertion-Sort</code> original, o laço interno desloca para a direita todo '
    + 'elemento <strong>maior</strong> que a chave: <code>while i > 0 and A[i] > key</code>.',
    'Para ordem não crescente, queremos deslocar todo elemento <strong>menor</strong> que a '
    + 'chave. Basta inverter o operador de comparação:',
    '<pre class="pseudo"><span class="ln"><span class="kw">for</span> j ← 2 <span class="kw">to</span> A.length</span>'
    + '<span class="ln">  key ← A[j]</span>'
    + '<span class="ln">  i ← j − 1</span>'
    + '<span class="ln">  <span class="kw">while</span> i &gt; 0 <span class="kw">and</span> A[i] &lt; key   <span class="cm">// era A[i] &gt; key</span></span>'
    + '<span class="ln">    A[i + 1] ← A[i]</span>'
    + '<span class="ln">    i ← i − 1</span>'
    + '<span class="ln">  A[i + 1] ← key</span></pre>',
    'O invariante passa a ser: <em>no início de cada iteração, $A[1..j−1]$ está em ordem não '
    + 'crescente e contém os mesmos elementos que ocupavam essas posições originalmente</em>. '
    + 'A complexidade não muda: $Θ(n)$ no melhor caso, $Θ(n^2)$ no pior.'
  ],
  r: 'Trocar <code>A[i] > key</code> por <code>A[i] < key</code>. Complexidade inalterada.' },

{ id: 'L1-02', n: 2, s: 1, t: 'aberta', d: 2, p: 'alta', g: ['invariante', 'busca-linear', 'prova-Q3'],
  ref: 'Cormen 2.1-3',
  e: '<p><em>(Cormen 2.1-3)</em> Considere o problema de busca:</p>'
   + '<p><strong>Entrada:</strong> uma sequência de $n$ números $A = ⟨a_1, a_2, …, a_n⟩$ e um valor $v$.<br>'
   + '<strong>Saída:</strong> um índice $i$ tal que $v = A[i]$, ou o valor especial NIL se $v$ '
   + 'não aparecer em $A$.</p>'
   + '<p>Escreva o pseudocódigo para busca linear, que faça a varredura da sequência procurando '
   + 'por $v$. Usando um invariante de laço, prove que seu algoritmo é correto. Certifique-se de '
   + 'que seu invariante satisfaz as três propriedades necessárias.</p>',
  h: 'O invariante fala sobre o que você já sabe dos elementos <em>anteriores</em> ao índice atual.',
  sol: [
    '<strong>Algoritmo.</strong>'
    + '<pre class="pseudo"><span class="ln"><span class="kw">for</span> i ← 1 <span class="kw">to</span> n</span>'
    + '<span class="ln">  <span class="kw">if</span> A[i] = v <span class="kw">then return</span> i</span>'
    + '<span class="ln"><span class="kw">return</span> NIL</span></pre>',
    '<strong>Invariante:</strong> no início de cada iteração $i$ do laço, nenhum dos elementos '
    + 'de $A[1..i−1]$ é igual a $v$.',
    '<strong>Inicialização.</strong> Antes da primeira iteração, $i = 1$ e o subvetor '
    + '$A[1..0]$ é vazio. A afirmação "nenhum elemento da sequência vazia é igual a $v$" é '
    + 'vacuamente verdadeira.',
    '<strong>Manutenção.</strong> Suponha o invariante válido no início da iteração $i$: '
    + 'nenhum de $A[1..i−1]$ vale $v$. O corpo testa $A[i] = v$. Se for verdade, o algoritmo '
    + 'retorna $i$ e o laço termina — corretamente, pois achou $v$ na posição $i$. Se for falso, '
    + 'sabemos também que $A[i] ≠ v$, logo nenhum de $A[1..i]$ vale $v$ — que é o invariante '
    + 'para a iteração $i+1$.',
    '<strong>Término.</strong> Há dois modos de encerrar. (i) Por <code>return i</code> dentro '
    + 'do laço: nesse caso $A[i] = v$ foi verificado diretamente, e o índice devolvido é válido. '
    + '(ii) Esgotando o laço com $i = n+1$: pelo invariante, nenhum elemento de $A[1..n]$ é igual '
    + 'a $v$, ou seja, $v$ não está em $A$ — e o algoritmo devolve NIL, como especificado. '
    + 'Nos dois casos a saída satisfaz a especificação. ∎',
    '<strong>Complexidade:</strong> $Θ(1)$ no melhor caso (achou em $A[1]$), $Θ(n)$ no pior '
    + 'e no médio.'
  ] },

{ id: 'L1-03', n: 3, s: 1, t: 'aberta', d: 2, p: 'media', g: ['pseudocódigo', 'binário'],
  ref: 'Cormen 2.1-4',
  e: '<p><em>(Cormen 2.1-4)</em> Considere o problema de somar dois inteiros binários de $n$ '
   + 'bits, armazenados em dois arranjos de $n$ elementos $A$ e $B$. A soma dos dois inteiros '
   + 'deve ser armazenada em forma binária num arranjo de $(n+1)$ elementos $C$. '
   + 'Enuncie o problema formalmente e escreva o pseudocódigo para somar os dois inteiros.</p>',
  h: 'É a soma que você aprendeu na escola: da direita para a esquerda, propagando o "vai um".',
  sol: [
    '<strong>Enunciado formal.</strong><br>'
    + '<em>Entrada:</em> dois arranjos $A[1..n]$ e $B[1..n]$ com $A[i], B[i] ∈ {0, 1}$, '
    + 'representando os inteiros $a = \\S{i=1}{n} A[i]·2^{n−i}$ e $b = \\S{i=1}{n} B[i]·2^{n−i}$ '
    + '(bit mais significativo no índice 1).<br>'
    + '<em>Saída:</em> arranjo $C[1..n+1]$ com $C[i] ∈ {0,1}$ tal que '
    + '$\\S{i=1}{n+1} C[i]·2^{n+1−i} = a + b$.',
    '<strong>Algoritmo.</strong>'
    + '<pre class="pseudo"><span class="ln"><span class="fnn">SomaBinaria</span>(A, B, n)</span>'
    + '<span class="ln">  carry ← 0</span>'
    + '<span class="ln">  <span class="kw">for</span> i ← n <span class="kw">downto</span> 1     <span class="cm">// do bit menos significativo</span></span>'
    + '<span class="ln">    soma ← A[i] + B[i] + carry</span>'
    + '<span class="ln">    C[i + 1] ← soma <span class="kw">mod</span> 2</span>'
    + '<span class="ln">    carry  ← ⌊soma / 2⌋</span>'
    + '<span class="ln">  C[1] ← carry</span>'
    + '<span class="ln">  <span class="kw">return</span> C</span></pre>',
    '<strong>Complexidade.</strong> O laço executa exatamente $n$ vezes, e cada iteração faz '
    + 'um número constante de operações (duas somas, um resto, uma divisão inteira, duas '
    + 'atribuições). Fora do laço há trabalho $Θ(1)$. Logo $T(n) = Θ(n)$ — linear, como pedido.',
    '<strong>Invariante (se quiserem a prova).</strong> No início da iteração com índice $i$, '
    + 'o arranjo $C[i+2..n+1]$ contém os $n−i$ bits menos significativos de '
    + '$\\S{k=i+1}{n}(A[k]+B[k])·2^{n−k}$, e <code>carry</code> é o transporte que sai dessa '
    + 'soma parcial.'
  ],
  r: '$Θ(n)$ — uma varredura da direita para a esquerda propagando o transporte.' },

{ id: 'L1-04', n: 4, s: 1, t: 'codigo', d: 1, p: 'baixa', g: ['pseudocódigo', 'strings'],
  e: '<p>Um <strong>palíndromo</strong> é uma palavra que pode ser lida tanto da direita para a '
   + 'esquerda como da esquerda para a direita. Exemplos: <em>esse</em>, <em>mussum</em>, '
   + '<em>osso</em>. Implemente um algoritmo de reconhecimento de palíndromos de tamanho $n$.</p>',
  h: 'Dois índices que caminham em direções opostas.',
  sol: [
    '<pre class="pseudo"><span class="ln"><span class="fnn">EhPalindromo</span>(S, n)</span>'
    + '<span class="ln">  i ← 1;  j ← n</span>'
    + '<span class="ln">  <span class="kw">while</span> i &lt; j <span class="kw">do</span></span>'
    + '<span class="ln">    <span class="kw">if</span> S[i] ≠ S[j] <span class="kw">then return</span> FALSO</span>'
    + '<span class="ln">    i ← i + 1;  j ← j − 1</span>'
    + '<span class="ln">  <span class="kw">return</span> VERDADEIRO</span></pre>',
    '<strong>Invariante:</strong> no início de cada iteração, $S[1..i−1]$ é o reverso de '
    + '$S[j+1..n]$ — isto é, todos os pares já comparados coincidem.',
    '<strong>Complexidade:</strong> a cada iteração a distância $j − i$ diminui de 2, logo há '
    + 'no máximo $⌊n/2⌋$ iterações, cada uma com custo $Θ(1)$. Portanto $T(n) = Θ(n)$ no pior '
    + 'caso (palíndromo de fato) e $Θ(1)$ no melhor (falha na primeira comparação).'
  ],
  r: '$Θ(n)$ no pior caso, com dois índices convergindo.' },

{ id: 'L1-05', n: 5, s: 1, t: 'aberta', d: 1, p: 'baixa', g: ['conceitos', 'polinomial'],
  e: '<p>O que é um algoritmo polinomial?</p>',
  sol: [
    'É um algoritmo cujo tempo de execução no pior caso é $O(n^k)$ para alguma constante $k$, '
    + 'onde $n$ é o tamanho da entrada.',
    '<strong>Por que a distinção importa:</strong> algoritmos polinomiais são considerados '
    + '<em>tratáveis</em>; os de tempo superpolinomial (como $2^n$ ou $n!$) são intratáveis na '
    + 'prática, porque dobrar a entrada multiplica o tempo por um fator que cresce sem limite.',
    '<strong>A sutileza do tamanho da entrada.</strong> $n$ é o número de <em>bits</em> '
    + 'necessários para representar a entrada. Testar se um número $N$ é primo dividindo-o por '
    + 'todos os candidatos até $\\r{N}$ parece polinomial em $N$ — mas $N ≈ 2^n$, logo o custo é '
    + '$Θ(2^{n/2})$, exponencial no tamanho real da entrada. Este é o item 47(b) da lista.',
    'É a base da classe <strong>P</strong>, que o curso retoma no módulo de NP-completude.'
  ] },

{ id: 'L1-06', n: 6, s: 1, t: 'aberta', d: 1, p: 'media', g: ['pior-caso', 'conceitos'],
  e: '<p>Por muitas vezes damos atenção apenas ao pior caso dos algoritmos. Explique o porquê.</p>',
  sol: [
    '<strong>1. É uma garantia.</strong> O pior caso dá um limite superior que o algoritmo nunca '
    + 'excederá, qualquer que seja a entrada. Isso é essencial em sistemas com requisitos de '
    + 'tempo — nenhuma outra medida oferece essa segurança.',
    '<strong>2. Frequentemente ocorre na prática.</strong> Em muitos algoritmos o pior caso não '
    + 'é exótico: numa busca, procurar um elemento ausente é o pior caso e é comum.',
    '<strong>3. O caso médio costuma ser tão ruim quanto.</strong> Na ordenação por inserção, '
    + 'tanto o caso médio quanto o pior são $Θ(n^2)$ — a análise mais difícil não traria '
    + 'informação nova.',
    '<strong>4. O caso médio exige hipóteses.</strong> Calcular a média requer supor uma '
    + 'distribuição de probabilidade sobre as entradas, e essa suposição pode não valer na '
    + 'aplicação real. O pior caso não depende de hipótese nenhuma.',
    '<strong>Quando não basta.</strong> Se o pior caso é patológico e raro, ele engana. '
    + 'O Quick-sort é $Θ(n^2)$ no pior caso e $Θ(n log n)$ no médio, e é o médio que descreve '
    + 'seu comportamento real — por isso o curso faz as duas análises.'
  ] },

{ id: 'L1-07a', n: 7, sub: 'a', s: 1, t: 'codigo', d: 1, p: 'baixa', g: ['polinomial'],
  e: '<p>Descreva um algoritmo polinomial para: <strong>quadrado perfeito</strong> — '
   + 'decidir se um inteiro $N$ é o quadrado de algum inteiro.</p>',
  sol: [
    '<strong>Solução direta:</strong> calcule $r ← ⌊\\r{N}⌋$ e teste se $r^2 = N$ ou '
    + '$(r+1)^2 = N$ (o segundo teste protege contra erro de arredondamento em ponto flutuante). '
    + 'Custo $O(1)$ em operações aritméticas.',
    '<strong>Solução sem raiz quadrada, por busca binária:</strong> procure $r$ em $[1, N]$ tal '
    + 'que $r^2 = N$. A função $r ↦ r^2$ é monótona crescente, então a busca binária se aplica.'
    + '<pre class="pseudo"><span class="ln">a ← 1;  b ← N</span>'
    + '<span class="ln"><span class="kw">while</span> a ≤ b <span class="kw">do</span></span>'
    + '<span class="ln">  r ← ⌊(a + b)/2⌋</span>'
    + '<span class="ln">  <span class="kw">if</span> r·r = N <span class="kw">then return</span> VERDADEIRO</span>'
    + '<span class="ln">  <span class="kw">else if</span> r·r &lt; N <span class="kw">then</span> a ← r + 1</span>'
    + '<span class="ln">  <span class="kw">else</span> b ← r − 1</span>'
    + '<span class="ln"><span class="kw">return</span> FALSO</span></pre>',
    '<strong>Complexidade:</strong> $O(log N)$ iterações. Sendo $n$ o número de bits de $N$, '
    + 'isto é $O(n)$ iterações — <em>polinomial no tamanho da entrada</em>. '
    + 'Compare com o item 47(b), onde o teste de primalidade ingênuo <em>não</em> é polinomial.'
  ],
  r: 'Busca binária em $[1,N]$ sobre $r^2$: $O(log N) = O(n)$ iterações, polinomial.' },

{ id: 'L1-07b', n: 7, sub: 'b', s: 1, t: 'codigo', d: 1, p: 'baixa', g: ['polinomial'],
  e: '<p>Descreva um algoritmo polinomial para: <strong>equação do segundo grau</strong> — '
   + 'encontrar as raízes de $ax^2 + bx + c = 0$.</p>',
  sol: [
    'Calcule o discriminante $Δ = b^2 − 4ac$ e aplique a fórmula, tratando os casos degenerados:'
    + '<pre class="pseudo"><span class="ln"><span class="kw">if</span> a = 0 <span class="kw">then</span>                      <span class="cm">// não é do 2º grau</span></span>'
    + '<span class="ln">  <span class="kw">if</span> b = 0 <span class="kw">then return</span> (c = 0 ? &quot;infinitas&quot; : &quot;nenhuma&quot;)</span>'
    + '<span class="ln">  <span class="kw">return</span> −c/b</span>'
    + '<span class="ln">Δ ← b·b − 4·a·c</span>'
    + '<span class="ln"><span class="kw">if</span> Δ &lt; 0 <span class="kw">then return</span> &quot;sem raízes reais&quot;</span>'
    + '<span class="ln"><span class="kw">if</span> Δ = 0 <span class="kw">then return</span> −b/(2a)</span>'
    + '<span class="ln"><span class="kw">return</span> (−b + <span class="fnn">raiz</span>(Δ))/(2a),  (−b − <span class="fnn">raiz</span>(Δ))/(2a)</span></pre>',
    '<strong>Complexidade:</strong> um número <em>constante</em> de operações aritméticas, '
    + 'logo $Θ(1)$ no modelo RAM — trivialmente polinomial.',
    '<strong>Observação.</strong> Num modelo que cobra pelo número de bits, as multiplicações '
    + 'de inteiros de $n$ bits custam $O(n^2)$ pelo método tradicional (ou $O(n^{lg 3})$ por '
    + 'Karatsuba), e o algoritmo continua polinomial.'
  ],
  r: '$Θ(1)$ operações aritméticas — número constante de passos.' },

{ id: 'L1-08', n: 8, s: 1, t: 'aberta', d: 2, p: 'alta', g: ['invariante', 'busca-linear', 'prova-Q3'],
  e: '<p>Considere o problema de busca:</p>'
   + '<p><strong>Entrada:</strong> uma sequência de $n$ números num vetor '
   + '$A = (a_1, a_2, …, a_n)$ e um valor $v$.<br>'
   + '<strong>Saída:</strong> o índice $i$ tal que $v = A[i]$, ou um valor especial NULL caso '
   + '$v$ não esteja presente na sequência $A$.</p>'
   + '<p>Escreva um algoritmo de busca linear que varre a sequência à procura de $v$. '
   + 'Prove que o seu algoritmo está correto por meio de uma invariante. Certifique-se de que a '
   + 'invariante atende às três propriedades fundamentais (inicialização, manutenção e '
   + 'terminação).</p>',
  h: 'É o mesmo exercício do item 1 (Cormen 2.1-3) — vale refazer sem olhar, porque este é '
   + 'exatamente o formato da questão 3 da prova.',
  sol: [
    'Ver a solução completa do <strong>item 2</strong> desta lista, que é o mesmo enunciado.',
    '<strong>Resumo.</strong> Invariante: <em>no início de cada iteração $i$, nenhum elemento '
    + 'de $A[1..i−1]$ é igual a $v$</em>.',
    '<strong>Inicialização:</strong> $i = 1$, subvetor vazio, afirmação vacuamente verdadeira. '
    + '<strong>Manutenção:</strong> se $A[i] ≠ v$, então nenhum de $A[1..i]$ vale $v$. '
    + '<strong>Terminação:</strong> ou retornou-se um $i$ com $A[i] = v$ verificado, ou '
    + '$i = n+1$ e o invariante garante que $v ∉ A$, devolvendo-se NULL. ∎'
  ] },

{ id: 'L1-09', n: 9, s: 1, t: 'aberta', d: 2, p: 'media', g: ['binário', 'complexidade'],
  e: '<p>Considere o problema de adição de números binários.</p>'
   + '<p><strong>Entrada:</strong> dois inteiros $A$ e $B$ representados na forma de vetores de '
   + 'tamanho $n$, onde cada posição contém os bits 0 ou 1.<br>'
   + '<strong>Saída:</strong> um número $C$ representado na forma de um vetor de tamanho $n+1$ '
   + 'que armazena a soma de $A$ e $B$.</p>'
   + '<p>Escreva um algoritmo linear que resolva este problema. <strong>Prove a sua '
   + 'complexidade.</strong></p>',
  h: 'Mesmo algoritmo do item 3 — aqui o pedido explícito é a <em>prova</em> da complexidade.',
  sol: [
    'O algoritmo é o do <strong>item 3</strong>: varredura do bit menos significativo ao mais '
    + 'significativo, propagando o transporte.',
    '<strong>Prova da complexidade.</strong> Seja $T(n)$ o número de operações elementares.',
    '<em>Fora do laço:</em> a inicialização <code>carry ← 0</code> e a atribuição final '
    + '<code>C[1] ← carry</code> custam $c_1$ operações, com $c_1$ constante.',
    '<em>Dentro do laço:</em> cada iteração executa um número fixo de operações — duas somas, '
    + 'um resto, uma divisão inteira e duas atribuições — digamos $c_2$ operações, com $c_2$ '
    + 'constante e <em>independente de $n$</em> (o modelo RAM cobra tempo unitário por operação '
    + 'aritmética).',
    '<em>Número de iterações:</em> o laço vai de $i = n$ até $1$, executando exatamente $n$ '
    + 'vezes, sempre — não há melhor nem pior caso.',
    'Logo $T(n) = c_1 + c_2·n$. Tomando $c = c_1 + c_2$ e $n_0 = 1$, temos $T(n) ≤ c·n$ para '
    + 'todo $n ≥ n_0$, portanto $T(n) = O(n)$. E como o laço sempre executa $n$ vezes, '
    + '$T(n) ≥ c_2·n$, logo $T(n) = Ω(n)$. Das duas, $$T(n) = Θ(n)$$'
  ],
  r: '$T(n) = c_1 + c_2 n = Θ(n)$ — o laço executa exatamente $n$ vezes com custo constante cada.' },

{ id: 'L1-10', n: 10, s: 1, t: 'aberta', d: 2, p: 'alta', g: ['invariante', 'insertion-sort', 'prova-Q3'],
  e: '<p>Seja o código do algoritmo <code>INSERTION-SORT</code>:</p>'
   + '<pre class="pseudo"><span class="ln">INSERTION-SORT(A)</span>'
   + '<span class="ln">  <span class="kw">for</span> j = 2 <span class="kw">to</span> A.length</span>'
   + '<span class="ln">    key = A[j]</span>'
   + '<span class="ln">    i = j − 1</span>'
   + '<span class="ln">    <span class="kw">while</span> i &gt; 0 <span class="kw">and</span> A[i] &gt; key</span>'
   + '<span class="ln">      A[i+1] = A[i]</span>'
   + '<span class="ln">      i = i − 1</span>'
   + '<span class="ln">    A[i+1] = key</span></pre>'
   + '<p>A seguinte invariante foi definida para o procedimento:</p>'
   + '<p style="padding-left:1.5rem"><em>Os elementos em $A[1, …, j−1]$ estão ordenados.</em></p>'
   + '<p><strong>Justifique a validade dessa invariante.</strong></p>',
  h: 'Verifique as três propriedades — e depois pergunte-se se essa invariante é <em>forte o '
   + 'bastante</em>.',
  sol: [
    '<strong>Inicialização.</strong> Antes da primeira iteração, $j = 2$, e o subvetor '
    + '$A[1..1]$ tem um único elemento. Um vetor de um elemento está trivialmente ordenado. ✓',
    '<strong>Manutenção.</strong> Suponha $A[1..j−1]$ ordenado no início da iteração $j$. '
    + 'O corpo guarda $key = A[j]$ e, pelo laço <code>while</code>, desloca uma posição à direita '
    + 'cada elemento de $A[1..j−1]$ que seja maior que $key$, parando no primeiro elemento '
    + '$≤ key$ (ou em $i = 0$). Como $A[1..j−1]$ estava ordenado, os elementos deslocados são '
    + 'exatamente o sufixo dos maiores que $key$, e a posição $i+1$ liberada é precisamente '
    + 'aquela em que $key$ mantém a ordem. Após $A[i+1] = key$, o subvetor $A[1..j]$ está '
    + 'ordenado — que é a invariante para a iteração $j+1$. ✓',
    '<strong>Término.</strong> O laço <code>for</code> encerra quando $j = n + 1$. Substituindo '
    + 'na invariante: $A[1..n]$ está ordenado, isto é, o vetor inteiro. É exatamente a saída '
    + 'especificada, logo o algoritmo está correto. ∎',
    '<strong>A ressalva importante.</strong> Essa invariante, como enunciada, é '
    + '<strong>insuficiente</strong>: um algoritmo que simplesmente atribuísse zero a todas as '
    + 'posições também a satisfaria, porque zeros estão ordenados. Para excluir isso, a '
    + 'invariante precisa incluir uma cláusula de <em>permutação</em>:',
    '<em>“$A[1..j−1]$ está ordenado <strong>e contém exatamente os mesmos elementos</strong> que '
    + 'ocupavam essas posições no vetor original.”</em> A manutenção dessa cláusula é imediata, '
    + 'porque o laço só faz deslocamentos e reinsere o valor guardado em $key$ — nenhum elemento '
    + 'é criado ou destruído.'
  ],
  r: 'As três propriedades se verificam, mas a invariante precisa da cláusula "contém os mesmos '
   + 'elementos" para ser forte o bastante.' },

{ id: 'L1-11', n: 11, s: 1, t: 'aberta', d: 1, p: 'alta', g: ['invariante', 'prova-Q3'],
  e: '<p>Prove que o seguinte algoritmo para determinar o valor máximo de um vetor com $n$ '
   + 'elementos está correto. <em>(Qual invariante este algoritmo mantém?)</em></p>'
   + '<pre class="pseudo"><span class="ln"><span class="kw">int</span> max( <span class="kw">int</span>* a, <span class="kw">int</span> n ) {</span>'
   + '<span class="ln">  <span class="kw">int</span> m = a[0];</span>'
   + '<span class="ln">  <span class="kw">for</span> ( <span class="kw">int</span> i = 1; i &lt; n; i++ )</span>'
   + '<span class="ln">    <span class="kw">if</span> ( a[i] &gt; m )</span>'
   + '<span class="ln">      m = a[i];</span>'
   + '<span class="ln">  <span class="kw">return</span> m;</span>'
   + '<span class="ln">}</span></pre>',
  h: 'Atenção: este código é indexado a partir de <strong>zero</strong>.',
  sol: [
    '<strong>Invariante:</strong> no início de cada iteração do laço <code>for</code> com índice '
    + '$i$, a variável $m$ contém o maior valor de $a[0..i−1]$.',
    '<strong>Inicialização.</strong> Antes da primeira iteração, $i = 1$ e $m = a[0]$. '
    + 'O maior valor de $a[0..0]$ é de fato $a[0]$. ✓',
    '<strong>Manutenção.</strong> Suponha $m = max(a[0..i−1])$ no início da iteração $i$. '
    + 'O corpo compara $a[i]$ com $m$ e atualiza $m ← a[i]$ se $a[i] > m$. Nos dois casos, ao '
    + 'final da iteração $m = max(m, a[i]) = max(max(a[0..i−1]), a[i]) = max(a[0..i])$ — '
    + 'que é a invariante para a iteração $i+1$. ✓',
    '<strong>Término.</strong> O laço encerra quando $i = n$. Pela invariante, '
    + '$m = max(a[0..n−1])$, ou seja, o máximo de todo o vetor. É esse valor que a função '
    + 'retorna, logo o algoritmo está correto. ∎',
    '<strong>Complexidade:</strong> o laço executa $n−1$ vezes com custo constante, logo '
    + '$T(n) = Θ(n)$. Note que é o mesmo $Θ(n)$ da versão recursiva por divisão e conquista '
    + 'da <strong>questão 4 da prova de 2026.1</strong> — e faz sentido: para garantir o máximo '
    + 'é preciso examinar todo elemento ao menos uma vez.'
  ],
  r: 'Invariante: $m = max(a[0..i−1])$ no início da iteração $i$. $Θ(n)$.' },

{ id: 'L1-12', n: 12, s: 1, t: 'aberta', d: 3, p: 'media', g: ['contagem', 'torneio'],
  e: '<p>Descreva um algoritmo para determinar o <strong>segundo menor</strong> elemento de um '
   + 'conjunto $S = {s_1, s_2, …, s_n}$. Determine exatamente o número de comparações '
   + 'efetuadas pelo algoritmo. O algoritmo será considerado tão melhor quanto menor for esse '
   + 'número de comparações.</p>',
  h: 'O segundo menor perdeu exatamente uma vez — e perdeu para o menor. Quantos elementos '
   + 'perderam diretamente para o menor?',
  sol: [
    '<strong>Solução ingênua.</strong> Varrer o vetor mantendo o menor e o segundo menor. '
    + 'Cada elemento exige até 2 comparações, dando $2n − 3$ comparações no pior caso. Funciona, '
    + 'mas dá para fazer melhor.',
    '<strong>Solução por torneio ($n + ⌈lg n⌉ − 2$ comparações).</strong> A observação-chave: '
    + 'o segundo menor só pode ser um elemento que <em>perdeu diretamente para o menor</em>. '
    + 'Se tivesse perdido para qualquer outro, haveria dois elementos menores que ele.',
    '<strong>Fase 1 — o torneio.</strong> Organize os elementos como num torneio eliminatório: '
    + 'compare-os aos pares, os vencedores (os menores de cada par) avançam, e repita. '
    + 'A cada comparação um elemento é eliminado, e é preciso eliminar $n−1$ elementos para '
    + 'restar um campeão. Logo esta fase custa exatamente <strong>$n − 1$</strong> comparações, '
    + 'e o campeão é o menor do conjunto.',
    '<strong>Fase 2 — o desafio.</strong> A árvore do torneio tem altura $⌈lg n⌉$, então o '
    + 'campeão enfrentou exatamente $⌈lg n⌉$ adversários. O segundo menor é o menor entre esses '
    + '$⌈lg n⌉$ candidatos — o que custa mais <strong>$⌈lg n⌉ − 1$</strong> comparações.',
    '<strong>Total:</strong> $$(n − 1) + (⌈lg n⌉ − 1) = n + ⌈lg n⌉ − 2$$',
    '<strong>Este número é ótimo</strong> — prova-se (Knuth, vol. 3) que nenhum algoritmo de '
    + 'comparação encontra o segundo menor com menos comparações no pior caso. '
    + 'A implementação exige guardar, para cada vencedor, a lista dos adversários que ele '
    + 'derrotou, o que custa $O(n)$ de memória extra.'
  ],
  r: '$n + ⌈lg n⌉ − 2$ comparações pelo método do torneio — e este valor é ótimo.' },

/* ═══════════════════════════════ SEÇÃO 2 — Crescimento de funções ═════════ */

{ id: 'L1-13', n: 13, s: 2, t: 'ordenar', d: 1, p: 'alta', g: ['ordenar', 'crescimento'],
  e: '<p>Disponha as seguintes funções em ordem crescente de complexidade assintótica:</p>'
   + '<p>$f_1(n) = 500n$ · $f_2(n) = n log_2 n$ · $f_3(n) = n^5$ · $f_4(n) = 2^n$ · '
   + '$f_5(n) = n^2$ · $f_6(n) = 1$ · $f_7(n) = log_2 n$ · $f_8(n) = log_2(n^2)$ · '
   + '$f_9(n) = n^3$</p>',
  h: 'Simplifique $f_8$ antes de comparar.',
  sol: [
    'Simplifique primeiro: $f_8(n) = log_2(n^2) = 2 log_2 n = Θ(log n)$ — mesma classe de $f_7$. '
    + 'E $f_1(n) = 500n = Θ(n)$: a constante 500 não conta.',
    '<strong>Ordem crescente:</strong>'
    + '$$f_6 ≺ f_7 ≈ f_8 ≺ f_1 ≺ f_2 ≺ f_5 ≺ f_9 ≺ f_3 ≺ f_4$$',
    '<strong>Por extenso:</strong> $1 ≺ log_2 n ≈ log_2(n^2) ≺ 500n ≺ n log_2 n ≺ n^2 ≺ n^3 '
    + '≺ n^5 ≺ 2^n$.',
    '<strong>Note:</strong> $f_7$ e $f_8$ estão na <em>mesma</em> classe — $f_7 = Θ(f_8)$. '
    + 'A questão pede ordem crescente, e o empate entre elas deve ser sinalizado.'
  ],
  r: '$f_6 ≺ f_7 ≈ f_8 ≺ f_1 ≺ f_2 ≺ f_5 ≺ f_9 ≺ f_3 ≺ f_4$' },

{ id: 'L1-14', n: 14, s: 2, t: 'ordenar', d: 3, p: 'alta', g: ['ordenar', 'crescimento'],
  e: '<p>Classifique as funções abaixo do ponto de vista de crescimento assintótico, isto é, '
   + 'se $f_i$ vem antes de $f_j$ na sua ordenação então $f_i = O(f_j)$:</p>'
   + '<p>$2^n$ · $n^{5/4}$ · $n lg^3 n$ · $n^{lg n}$ · $2^{2n}$ · $2^{n^2}$ · $2^{lg n}$</p>',
  h: 'Reescreva tudo como potência de 2 e compare os expoentes.',
  sol: [
    '<strong>Normalize.</strong> $2^{lg n} = n$ (base 2 se cancela). E $n^{lg n} = 2^{(lg n)^2}$. '
    + 'E $2^{2n} = 4^n$.',
    '<strong>Compare $n lg^3 n$ com $n^{5/4}$:</strong> divida — '
    + '$\\f{n^{5/4}}{n lg^3 n} = \\f{n^{1/4}}{lg^3 n} → ∞$, porque qualquer potência positiva de '
    + '$n$ vence qualquer polilogaritmo. Logo $n lg^3 n ≺ n^{5/4}$.',
    '<strong>Compare $n^{lg n} = 2^{(lg n)^2}$ com $2^n$:</strong> os expoentes são $(lg n)^2$ '
    + 'e $n$; como $(lg n)^2 ≺ n$, temos $n^{lg n} ≺ 2^n$. (Mas $n^{lg n}$ é superpolinomial: '
    + 'vence $n^{5/4}$ e qualquer $n^k$.)',
    '<strong>Ordem final:</strong>'
    + '$$2^{lg n} ≺ n lg^3 n ≺ n^{5/4} ≺ n^{lg n} ≺ 2^n ≺ 2^{2n} ≺ 2^{n^2}$$',
    '<em>(ou seja: $n ≺ n lg^3 n ≺ n^{5/4} ≺ 2^{(lg n)^2} ≺ 2^n ≺ 4^n ≺ 2^{n^2}$)</em>'
  ],
  r: '$2^{lg n} ≺ n lg^3 n ≺ n^{5/4} ≺ n^{lg n} ≺ 2^n ≺ 2^{2n} ≺ 2^{n^2}$' },

{ id: 'L1-15', n: 15, s: 2, t: 'aberta', d: 1, p: 'baixa', g: ['crescimento', 'prática'],
  e: '<p>Dois algoritmos A e B possuem complexidade $n^5$ e $2^n$, respectivamente. '
   + 'Em qual caso você utilizaria o algoritmo B em vez do A? Exemplifique.</p>',
  h: 'Assintoticamente A ganha sempre. A pergunta é sobre o "sempre".',
  sol: [
    'Assintoticamente $n^5 ≺ 2^n$, logo A é melhor <strong>para $n$ grande</strong>. '
    + 'Mas "grande" aqui é bem grande.',
    '<strong>Onde as curvas se cruzam:</strong> $n^5 = 2^n$ quando $5 log_2 n = n$. '
    + 'Resolvendo numericamente, o cruzamento fica em torno de $n ≈ 22{,}4$.',
    '<table><thead><tr><th class="num">$n$</th><th class="num">$n^5$</th><th class="num">$2^n$</th>'
    + '<th>Melhor</th></tr></thead><tbody>'
    + '<tr><td class="num">10</td><td class="num">100 000</td><td class="num">1 024</td><td>B</td></tr>'
    + '<tr><td class="num">20</td><td class="num">3 200 000</td><td class="num">1 048 576</td><td>B</td></tr>'
    + '<tr><td class="num">23</td><td class="num">6 436 343</td><td class="num">8 388 608</td><td>A</td></tr>'
    + '<tr><td class="num">30</td><td class="num">24 300 000</td><td class="num">≈ 10⁹</td><td>A</td></tr>'
    + '</tbody></table>',
    '<strong>Resposta:</strong> use B quando as instâncias forem garantidamente pequenas — '
    + 'na prática, $n ≤ 22$. É um caso real: para grafos com poucos vértices, uma busca '
    + 'exaustiva $2^n$ pode ser mais rápida (e muito mais simples de implementar) que um '
    + 'algoritmo polinomial de grau alto com constantes grandes.',
    '<strong>A lição:</strong> notação assintótica descreve comportamento no limite. '
    + 'Ela esconde constantes e não diz nada sobre entradas pequenas.'
  ],
  r: 'Quando $n$ for pequeno — as curvas se cruzam perto de $n ≈ 22$. Abaixo disso, B é mais rápido.' },

{ id: 'L1-16', n: 16, s: 2, t: 'aberta', d: 1, p: 'media', g: ['crescimento', 'comparar'],
  e: '<p>Algoritmos A e B possuem tempos de execução com complexidade $Θ(n log n)$ e '
   + '$Θ(n^{3/2})$, respectivamente. Qual deles é mais eficiente em termos assintóticos?</p>',
  sol: [
    'Divida uma pela outra: $$\\f{n^{3/2}}{n log n} = \\f{n^{1/2}}{log n} → ∞$$',
    'Como o quociente tende a infinito, $n log n = o(n^{3/2})$ — isto é, $n log n$ cresce '
    + '<em>estritamente</em> menos.',
    '<strong>Resposta: o algoritmo A ($Θ(n log n)$) é assintoticamente mais eficiente.</strong>',
    '<strong>Regra geral:</strong> $n log n$ perde para $n^{1+ε}$ para <em>qualquer</em> '
    + '$ε > 0$, por menor que seja. O logaritmo nunca alcança uma potência.'
  ],
  r: 'A, com $Θ(n log n)$ — porque $n^{1/2}/log n → ∞$.' },

{ id: 'L1-17', n: 17, s: 2, t: 'aberta', d: 1, p: 'media', g: ['crescimento', 'comparar'],
  e: '<p>Um algoritmo tradicional e muito utilizado possui complexidade de $n^{1.5}$, enquanto '
   + 'um novo proposto é da ordem de $n log n$. Qual utilizar?</p>',
  sol: [
    'É o mesmo par do item 16 ($n^{1.5} = n^{3/2}$). Assintoticamente, $n log n ≺ n^{1.5}$, '
    + 'logo o <strong>algoritmo novo é melhor</strong>.',
    '<strong>Mas a pergunta é prática, e merece a ressalva.</strong> A vantagem assintótica só '
    + 'se materializa se as constantes ocultas forem comparáveis. Um algoritmo $100·n log n$ '
    + 'só bate um $1·n^{1.5}$ quando $100 log n < n^{0.5}$, ou seja, para $n$ na casa dos '
    + 'milhões.',
    '<strong>Resposta ponderada:</strong> adote o novo se as instâncias forem grandes e as '
    + 'constantes semelhantes. Se o tradicional é "muito utilizado", provavelmente está bem '
    + 'otimizado — vale medir antes de trocar. É o mesmo raciocínio que faz Strassen, '
    + 'assintoticamente superior, raramente ser usado na prática.'
  ],
  r: 'O novo, $n log n$ — assintoticamente melhor. Com a ressalva sobre constantes ocultas.' },

{ id: 'L1-18', n: 18, s: 2, t: 'aberta', d: 2, p: 'alta', g: ['álgebra-assintótica', 'slide-01'],
  e: '<p>Quais os significados das relações $n^3 + 5n + 10 = n^3 + Θ(n)$ e '
   + '$n^3 + Θ(n) = Θ(n^3)$?</p>',
  h: 'O "=" assintótico não é simétrico. Leia-o como "é".',
  sol: [
    '<strong>Primeira: $n^3 + 5n + 10 = n^3 + Θ(n)$.</strong> Aqui $Θ(n)$ à direita representa '
    + '<em>alguma função anônima</em> que pertence à classe $Θ(n)$. A igualdade afirma: '
    + 'existe $h(n) = Θ(n)$ tal que $n^3 + 5n + 10 = n^3 + h(n)$. De fato, $h(n) = 5n + 10$ é '
    + '$Θ(n)$. A informação sobre o termo $n^3$ foi <strong>preservada</strong>; só os termos '
    + 'de ordem inferior foram resumidos.',
    '<strong>Segunda: $n^3 + Θ(n) = Θ(n^3)$.</strong> Agora $Θ(n)$ aparece à esquerda, e a '
    + 'leitura muda: <em>para toda</em> função $h(n) = Θ(n)$, vale $n^3 + h(n) = Θ(n^3)$. '
    + 'O termo dominante <strong>absorveu</strong> o resto.',
    '<strong>A regra geral.</strong> Uma expressão assintótica à <em>direita</em> do "=" '
    + 'significa "existe uma função nessa classe"; à <em>esquerda</em>, significa "para toda '
    + 'função nessa classe". Por isso o "=" assintótico <strong>não é simétrico</strong>: '
    + 'vale $n = O(n^2)$, mas $O(n^2) = n$ não faz sentido.',
    'Leia sempre o "=" como <strong>"é"</strong> ou <strong>"pertence a"</strong>, nunca como '
    + 'igualdade de valores.'
  ] },

{ id: 'L1-19', n: 19, s: 2, t: 'ordenar', d: 3, p: 'media', g: ['ordenar', 'crescimento', 'binomial'],
  e: '<p>Ordene as seguintes funções por ordem de crescimento, isto é, encontre uma ordenação '
   + '$g_1, …, g_8$ tal que $g_1 = O(g_2)$, $g_2 = O(g_3)$, …, $g_7 = O(g_8)$.</p>'
   + '<p>a) $f_1(n) = n^π$ &nbsp; b) $f_2(n) = π^n$ &nbsp; '
   + 'c) $f_3(n) = \\p{\\f{n}{5}}$ (binomial) &nbsp; d) $f_4(n) = \\p{\\r{2}}^{\\r{n}} = 2^{\\f{1}{2}n^{1/2}}$<br>'
   + 'e) $f_5(n) = \\p{\\f{n}{n−4}}$ (binomial) &nbsp; f) $f_6(n) = 2^{log_4 n}$ &nbsp; '
   + 'g) $f_7(n) = n^5(log n)^2$ &nbsp; h) $f_8(n) = n^4 \\p{\\f{n}{4}}$ (binomial)</p>'
   + '<p>em que $\\p{\\f{n}{k}} = \\f{n!}{k!(n−k)!}$, para $0 ≤ k ≤ n$.</p>',
  h: 'Todo coeficiente binomial com $k$ constante é um polinômio de grau $k$. E $f_6$ simplifica.',
  sol: [
    '<strong>Simplifique cada uma.</strong>',
    '$f_6(n) = 2^{log_4 n} = n^{log_4 2} = n^{1/2} = \\r{n}$ — use $a^{log_b n} = n^{log_b a}$.',
    '$f_1(n) = n^π ≈ n^{3{,}1416}$ — polinômio de grau $π$.',
    '$f_3(n) = \\p{\\f{n}{5}} = \\f{n(n−1)⋯(n−4)}{120} = Θ(n^5)$.',
    '$f_5(n) = \\p{\\f{n}{n−4}} = \\p{\\f{n}{4}} = Θ(n^4)$ — pela simetria $\\p{\\f{n}{k}} = \\p{\\f{n}{n−k}}$.',
    '$f_8(n) = n^4·\\p{\\f{n}{4}} = n^4·Θ(n^4) = Θ(n^8)$.',
    '$f_7(n) = n^5 log^2 n$ — fica entre $n^5$ e $n^{5+ε}$.',
    '$f_4(n) = 2^{\\r{n}/2}$ — <strong>superpolinomial</strong>: o expoente $\\r{n}/2$ cresce '
    + 'mais que $c·log n$ para qualquer $c$, logo vence todo $n^k$. Mas é '
    + '<strong>subexponencial</strong>: perde para $π^n = 2^{n·log_2 π}$, cujo expoente é linear.',
    '<strong>Ordem final:</strong>'
    + '$$f_6 ≺ f_1 ≺ f_5 ≺ f_3 ≺ f_7 ≺ f_8 ≺ f_4 ≺ f_2$$'
    + '<p>isto é: $\\r{n} ≺ n^π ≺ n^4 ≺ n^5 ≺ n^5log^2n ≺ n^8 ≺ 2^{\\r{n}/2} ≺ π^n$.</p>'
  ],
  r: '$f_6 ≺ f_1 ≺ f_5 ≺ f_3 ≺ f_7 ≺ f_8 ≺ f_4 ≺ f_2$' },

{ id: 'L1-20', n: 20, s: 2, t: 'recorrencia', d: 2, p: 'alta', g: ['recorrência', 'subtrativa'],
  e: '<p>Se $T(0) = T(1) = 1$, cada uma das seguintes recorrências define uma função $T$ nos '
   + 'inteiros não negativos:</p>'
   + '<p>a) $T(n) = 3T(⌊n/2⌋) + n^2$ &nbsp;&nbsp; b) $T(n) = 2T(n−2) + 1$ &nbsp;&nbsp; '
   + 'c) $T(n) = T(n−1) + n^2$</p>'
   + '<p><strong>Qual delas não pode ser limitada por uma função polinomial?</strong> '
   + 'Justifique a sua resposta.</p>',
  h: 'Olhe qual delas <em>subtrai</em> em vez de dividir, e com que coeficiente.',
  sol: [
    '<strong>(a) $T(n) = 3T(n/2) + n^2$ — polinomial.</strong> Teorema Mestre: $a=3$, $b=2$, '
    + '$n^{log_2 3} ≈ n^{1{,}585}$. Como $f(n) = n^2 = Ω(n^{1{,}585+ε})$ e a regularidade vale '
    + '($3(n/2)^2 = \\f{3}{4}n^2 ≤ \\f{3}{4}n^2$, com $c = 3/4 < 1$), é o caso 3: $Θ(n^2)$.',
    '<strong>(c) $T(n) = T(n−1) + n^2$ — polinomial.</strong> Soma telescópica: '
    + '$T(n) = \\S{i=1}{n} i^2 + T(0) = \\f{n(n+1)(2n+1)}{6} + 1 = Θ(n^3)$.',
    '<strong>(b) $T(n) = 2T(n−2) + 1$ — NÃO é limitável por polinômio.</strong> '
    + 'É subtrativa com coeficiente 2: cada passo <em>dobra</em> o número de chamadas e reduz '
    + '$n$ em apenas 2.',
    '<strong>Prova.</strong> Expandindo: $T(n) = 2T(n−2) + 1 = 4T(n−4) + 2 + 1 = ⋯$. '
    + 'Após $k$ expansões, $T(n) = 2^k T(n−2k) + (2^k − 1)$. Com $k = n/2$ chega-se ao caso base:'
    + '$$T(n) = 2^{n/2}·T(0) + 2^{n/2} − 1 = 2·2^{n/2} − 1 = Θ\\p{2^{n/2}} = Θ\\p{\\p{\\r{2}}^n}$$',
    'Como $2^{n/2}$ é exponencial e $\\f{2^{n/2}}{n^k} → ∞$ para todo $k$ fixo, nenhum polinômio '
    + 'a limita superiormente. <strong>Resposta: (b).</strong>'
  ],
  r: '(b) $T(n) = 2T(n−2)+1 = Θ(2^{n/2})$ — exponencial. (a) é $Θ(n^2)$ e (c) é $Θ(n^3)$.' },

{ id: 'L1-21', n: 21, s: 2, t: 'aberta', d: 3, p: 'baixa', g: ['prova', 'theta'],
  e: '<p>Suponha que $f(n)$ e $g(n)$ sejam funções dos inteiros não-negativos nos inteiros '
   + 'não-negativos. Demonstre que as seguintes afirmações são equivalentes:</p>'
   + '<p>a) Existem números reais $a > 1$, $b > 1$, $c > 1$ e um inteiro $n_0 > 0$ tais que '
   + '$a^{g(n)} ≤ b^{f(n)} ≤ c^{g(n)}$, para todo $n ≥ n_0$;<br>'
   + 'b) $f(n) = Θ(g(n))$.</p>',
  h: 'Tome o logaritmo na base $b$ de tudo.',
  sol: [
    '<strong>(a) ⇒ (b).</strong> Aplique $log_b$ à cadeia de desigualdades. Como $b > 1$, '
    + 'a função $log_b$ é crescente e preserva o sentido:'
    + '$$log_b\\p{a^{g(n)}} ≤ log_b\\p{b^{f(n)}} ≤ log_b\\p{c^{g(n)}}$$'
    + '$$g(n)·log_b a ≤ f(n) ≤ g(n)·log_b c$$',
    'Defina $c_1 = log_b a$ e $c_2 = log_b c$. Como $a > 1$ e $c > 1$ e a base $b > 1$, '
    + 'ambos são <strong>estritamente positivos</strong>. Logo existem $c_1, c_2, n_0 > 0$ com '
    + '$c_1 g(n) ≤ f(n) ≤ c_2 g(n)$ para todo $n ≥ n_0$ — que é exatamente a definição de '
    + '$f(n) = Θ(g(n))$. ✓',
    '<strong>(b) ⇒ (a).</strong> Por hipótese existem $c_1, c_2, n_0 > 0$ com '
    + '$c_1 g(n) ≤ f(n) ≤ c_2 g(n)$ para $n ≥ n_0$. Escolha qualquer $b > 1$ (por exemplo '
    + '$b = 2$) e defina $a = b^{c_1}$ e $c = b^{c_2}$. Como $c_1, c_2 > 0$ e $b > 1$, temos '
    + '$a > 1$ e $c > 1$.',
    'Elevando $b$ (crescente, pois $b>1$) à cadeia original:'
    + '$$b^{c_1 g(n)} ≤ b^{f(n)} ≤ b^{c_2 g(n)} ⟺ \\p{b^{c_1}}^{g(n)} ≤ b^{f(n)} ≤ \\p{b^{c_2}}^{g(n)}$$'
    + '$$a^{g(n)} ≤ b^{f(n)} ≤ c^{g(n)}$$ ✓',
    'As duas implicações fecham a equivalência. ∎'
  ] },

{ id: 'L1-22a', n: 22, sub: 'a', s: 2, t: 'vf', d: 2, p: 'alta', g: ['álgebra-assintótica', 'O'],
  e: '<p>Considere que $f(n) = O(s(n))$ e $g(n) = O(r(n))$. Verdadeiro ou falso, demonstrando:</p>'
   + '<p><strong>$f(n) − g(n) = O(s(n) − r(n))$</strong></p>',
  sol: [
    '<strong>FALSO.</strong>',
    '<strong>Contraexemplo.</strong> Tome $f(n) = 2n$, $g(n) = n$, $s(n) = n$, $r(n) = n$. '
    + 'As hipóteses valem: $2n = O(n)$ ✓ e $n = O(n)$ ✓.',
    'Mas $f(n) − g(n) = n$, enquanto $s(n) − r(n) = 0$. E $n = O(0)$ é falso — não existe '
    + 'constante $c$ com $n ≤ c·0$ para $n$ grande.',
    '<strong>Por quê.</strong> A notação $O$ só limita por <em>cima</em>. Ao subtrair, o limite '
    + 'superior de $g$ vira um limite <em>inferior</em> no resultado, e $O$ não fornece essa '
    + 'informação. Pior: $s − r$ pode ser zero ou negativo, e $O$ de função negativa não está '
    + 'definido.'
  ],
  r: 'Falso. $f=2n$, $g=n$, $s=r=n$: $n ≠ O(0)$.' },

{ id: 'L1-22b', n: 22, sub: 'b', s: 2, t: 'vf', d: 1, p: 'alta', g: ['álgebra-assintótica', 'O'],
  e: '<p>Considere $f(n) = O(s(n))$ e $g(n) = O(r(n))$. Verdadeiro ou falso:</p>'
   + '<p><strong>$f(n) + g(n) = O(s(n) + r(n))$</strong></p>',
  sol: [
    '<strong>VERDADEIRO.</strong>',
    '<strong>Prova.</strong> Por hipótese existem $c_1, n_1$ com $f(n) ≤ c_1 s(n)$ para '
    + '$n ≥ n_1$, e $c_2, n_2$ com $g(n) ≤ c_2 r(n)$ para $n ≥ n_2$.',
    'Para $n ≥ max(n_1, n_2)$, somando as duas desigualdades:'
    + '$$f(n) + g(n) ≤ c_1 s(n) + c_2 r(n) ≤ max(c_1,c_2)·\\p{s(n) + r(n)}$$',
    'Tomando $c = max(c_1, c_2)$ e $n_0 = max(n_1, n_2)$, a definição de $O$ é satisfeita. ∎',
    '<em>(A última desigualdade usa que $s$ e $r$ são não-negativas — hipótese padrão da '
    + 'notação assintótica.)</em>'
  ],
  r: 'Verdadeiro, com $c = max(c_1, c_2)$.' },

{ id: 'L1-22c', n: 22, sub: 'c', s: 2, t: 'vf', d: 1, p: 'media', g: ['álgebra-assintótica', 'O'],
  e: '<p>Considere $f(n) = O(s(n))$ e $g(n) = O(r(n))$. Verdadeiro ou falso:</p>'
   + '<p><strong>$f(n) × g(n) = O(s(n) × r(n))$</strong></p>',
  sol: [
    '<strong>VERDADEIRO.</strong>',
    '<strong>Prova.</strong> Para $n ≥ max(n_1, n_2)$, com $f(n) ≤ c_1 s(n)$ e '
    + '$g(n) ≤ c_2 r(n)$, e sendo todas as funções não-negativas, o produto preserva a '
    + 'desigualdade:'
    + '$$f(n)·g(n) ≤ \\p{c_1 s(n)}·\\p{c_2 r(n)} = (c_1c_2)·s(n)·r(n)$$',
    'Tome $c = c_1 c_2$ e $n_0 = max(n_1, n_2)$. ∎',
    '<em>A não-negatividade é essencial: multiplicar desigualdades só preserva o sentido '
    + 'entre valores não-negativos.</em>'
  ],
  r: 'Verdadeiro, com $c = c_1 c_2$.' },

{ id: 'L1-22d', n: 22, sub: 'd', s: 2, t: 'vf', d: 2, p: 'media', g: ['álgebra-assintótica', 'O'],
  e: '<p>Considere $f(n) = O(s(n))$ e $g(n) = O(r(n))$. Verdadeiro ou falso:</p>'
   + '<p><strong>$f(n) ÷ g(n) = O(s(n) ÷ r(n))$</strong></p>',
  sol: [
    '<strong>FALSO.</strong>',
    '<strong>Contraexemplo.</strong> Tome $f(n) = n$, $g(n) = 1$, $s(n) = n$, $r(n) = n$. '
    + 'As hipóteses valem: $n = O(n)$ ✓ e $1 = O(n)$ ✓.',
    'Então $f(n)/g(n) = n$, mas $s(n)/r(n) = 1$. E $n = O(1)$ é falso.',
    '<strong>Por quê.</strong> Mesma razão do item (a): a divisão inverte o papel do '
    + 'denominador. Um limite <em>superior</em> para $g$ não dá limite algum para $1/g$ — '
    + 'para controlar o quociente seria preciso um limite <strong>inferior</strong> de $g$, '
    + 'ou seja, um $Ω$.',
    '<strong>Resumo do item 22:</strong> soma ✓ e produto ✓ preservam $O$; '
    + 'subtração ✗ e divisão ✗ não.'
  ],
  r: 'Falso. $f=n$, $g=1$, $s=r=n$: $n ≠ O(1)$.' },

{ id: 'L1-23', n: 23, s: 2, t: 'aberta', d: 1, p: 'media', g: ['prova', 'O', 'transitividade'],
  e: '<p>Mostre que a notação $O$-grande é transitiva, isto é, se $f(n) = O(g(n))$ e '
   + '$g(n) = O(h(n))$, então $f(n) = O(h(n))$.</p>',
  sol: [
    '<strong>Hipóteses.</strong> De $f(n) = O(g(n))$: existem $c_1 > 0$ e $n_1 > 0$ tais que '
    + '$$f(n) ≤ c_1·g(n) \\t{ para todo } n ≥ n_1$$'
    + 'De $g(n) = O(h(n))$: existem $c_2 > 0$ e $n_2 > 0$ tais que '
    + '$$g(n) ≤ c_2·h(n) \\t{ para todo } n ≥ n_2$$',
    '<strong>Combinação.</strong> Seja $n_0 = max(n_1, n_2)$. Para todo $n ≥ n_0$ as duas '
    + 'desigualdades valem simultaneamente. Como $c_1 > 0$, multiplicar a segunda por $c_1$ '
    + 'preserva o sentido:'
    + '$$f(n) ≤ c_1·g(n) ≤ c_1·\\p{c_2·h(n)} = (c_1c_2)·h(n)$$',
    '<strong>Conclusão.</strong> Tomando $c = c_1c_2 > 0$ e $n_0 = max(n_1, n_2) > 0$, '
    + 'temos $f(n) ≤ c·h(n)$ para todo $n ≥ n_0$, que é precisamente a definição de '
    + '$f(n) = O(h(n))$. ∎',
    '<em>A mesma demonstração, trocando o sentido das desigualdades, prova a transitividade de '
    + '$Ω$; e aplicando as duas, a de $Θ$.</em>'
  ],
  r: 'Tome $c = c_1c_2$ e $n_0 = max(n_1, n_2)$.' },

/* ---- Item 24: 21 afirmações de verdadeiro/falso (o treino mais rentável) -- */

{ id: 'L1-24a', n: 24, sub: 'a', s: 2, t: 'vf', d: 1, p: 'alta', g: ['vf', 'O'],
  e: '<p>Verdadeiro ou falso? Prove. <strong>$10n = O(n)$</strong></p>',
  sol: ['<strong>VERDADEIRO.</strong> Tome $c = 10$ e $n_0 = 1$: vale $10n ≤ 10·n$ para todo '
      + '$n ≥ 1$. Constantes multiplicativas são absorvidas pela notação $O$.'],
  r: 'Verdadeiro ($c = 10$).' },

{ id: 'L1-24b', n: 24, sub: 'b', s: 2, t: 'vf', d: 1, p: 'alta', g: ['vf', 'O'],
  e: '<p>Verdadeiro ou falso? Prove. <strong>$10n^2 = O(n)$</strong></p>',
  sol: ['<strong>FALSO.</strong> Suponha que existissem $c, n_0$ com $10n^2 ≤ cn$ para todo '
      + '$n ≥ n_0$. Dividindo por $n > 0$: $10n ≤ c$ — mas o lado esquerdo cresce sem limite, '
      + 'logo nenhuma constante $c$ serve para todo $n$. Contradição.'],
  r: 'Falso — $10n ≤ c$ é impossível para $c$ constante.' },

{ id: 'L1-24c', n: 24, sub: 'c', s: 2, t: 'vf', d: 2, p: 'media', g: ['vf', 'O', 'exponencial'],
  e: '<p>Verdadeiro ou falso? Prove. <strong>$10n^{55} = O(2^n)$</strong></p>',
  sol: ['<strong>VERDADEIRO.</strong> Qualquer polinômio é dominado por qualquer exponencial de '
      + 'base maior que 1, por maior que seja o grau.',
      '<strong>Verificação por limite:</strong> $lim_{n→∞} \\f{10n^{55}}{2^n} = 0$. '
      + 'Aplicando L\'Hôpital 55 vezes, o numerador vira uma constante e o denominador continua '
      + '$2^n(ln 2)^{55} → ∞$.',
      '<em>Alternativa sem limite:</em> $log_2(10n^{55}) = log_2 10 + 55 log_2 n$, que é '
      + '$Θ(log n)$; e $log_2(2^n) = n$. Como $log n ≺ n$, segue o resultado.'],
  r: 'Verdadeiro — polinômio perde para exponencial.' },

{ id: 'L1-24d', n: 24, sub: 'd', s: 2, t: 'vf', d: 1, p: 'alta', g: ['vf', 'O'],
  e: '<p>Verdadeiro ou falso? Prove. <strong>$n^2 + 200n + 300 = O(n^2)$</strong></p>',
  sol: ['<strong>VERDADEIRO.</strong> Para $n ≥ 1$ vale $200n ≤ 200n^2$ e $300 ≤ 300n^2$, logo '
      + '$$n^2 + 200n + 300 ≤ (1 + 200 + 300)n^2 = 501n^2$$'
      + 'Tome $c = 501$ e $n_0 = 1$.',
      '<em>Regra geral:</em> num polinômio, o termo de maior grau determina a classe; todos os '
      + 'outros são absorvidos.'],
  r: 'Verdadeiro ($c = 501$, $n_0 = 1$).' },

{ id: 'L1-24e', n: 24, sub: 'e', s: 2, t: 'vf', d: 1, p: 'alta', g: ['vf', 'O'],
  e: '<p>Verdadeiro ou falso? Prove. <strong>$n^2 − 200n − 300 = O(n)$</strong></p>',
  sol: ['<strong>FALSO.</strong> Os termos negativos não mudam o grau. Para $n ≥ 400$, '
      + '$200n + 300 ≤ \\f{n^2}{2}$, logo $n^2 − 200n − 300 ≥ \\f{n^2}{2}$.',
      'Se fosse $O(n)$, teríamos $\\f{n^2}{2} ≤ cn$, ou seja $n ≤ 2c$ — impossível para todo '
      + '$n$ grande. A função é, de fato, $Θ(n^2)$.'],
  r: 'Falso — é $Θ(n^2)$.' },

{ id: 'L1-24f', n: 24, sub: 'f', s: 2, t: 'vf', d: 1, p: 'alta', g: ['vf', 'O', 'insertion-sort'],
  e: '<p>Verdadeiro ou falso? Prove. <strong>$\\f{3n^2}{2} + \\f{7n}{2} − 4 = O(n)$</strong></p>',
  sol: ['<strong>FALSO.</strong> O termo $\\f{3n^2}{2}$ é quadrático e não pode ser limitado por '
      + 'uma função linear.',
      'Formalmente: para $n ≥ 2$, $\\f{7n}{2} − 4 ≥ 3 > 0$, logo a expressão é '
      + '$≥ \\f{3n^2}{2}$. Se fosse $O(n)$, teríamos $\\f{3n^2}{2} ≤ cn$, isto é '
      + '$n ≤ \\f{2c}{3}$ — falso para $n$ grande.',
      '<em>Esta é exatamente a função do pior caso do insertion sort (slide 01).</em>'],
  r: 'Falso — é $Θ(n^2)$.' },

{ id: 'L1-24g', n: 24, sub: 'g', s: 2, t: 'vf', d: 1, p: 'alta', g: ['vf', 'O', 'insertion-sort'],
  e: '<p>Verdadeiro ou falso? Prove. <strong>$\\f{3n^2}{2} + \\f{7n}{2} − 4 = O(n^2)$</strong></p>',
  sol: ['<strong>VERDADEIRO.</strong> Para $n ≥ 1$: $\\f{7n}{2} ≤ \\f{7n^2}{2}$ e $−4 ≤ 0$, logo'
      + '$$\\f{3n^2}{2} + \\f{7n}{2} − 4 ≤ \\p{\\f{3}{2} + \\f{7}{2}}n^2 = 5n^2$$'
      + 'Tome $c = 5$ e $n_0 = 1$.'],
  r: 'Verdadeiro ($c = 5$, $n_0 = 1$).' },

{ id: 'L1-24h', n: 24, sub: 'h', s: 2, t: 'vf', d: 1, p: 'media', g: ['vf', 'O'],
  e: '<p>Verdadeiro ou falso? Prove. <strong>$n^3 − 999999n^2 − 1000000 = O(n^2)$</strong></p>',
  sol: ['<strong>FALSO.</strong> As constantes gigantes enganam para $n$ pequeno, mas são '
      + 'irrelevantes assintoticamente: o grau 3 domina.',
      'Para $n ≥ 2·10^6$, temos $999999n^2 ≤ \\f{n^3}{2}$ e $10^6 ≤ \\f{n^3}{4}$, logo a '
      + 'expressão é $≥ \\f{n^3}{4}$. Se fosse $O(n^2)$, teríamos $\\f{n^3}{4} ≤ cn^2$, '
      + 'isto é $n ≤ 4c$ — falso para $n$ grande. A função é $Θ(n^3)$.',
      '<em>A lição: comparar constantes não decide nada; o que decide é o grau.</em>'],
  r: 'Falso — é $Θ(n^3)$, apesar das constantes enormes.' },

{ id: 'L1-24i', n: 24, sub: 'i', s: 2, t: 'vf', d: 1, p: 'alta', g: ['vf', 'O', 'exponencial'],
  e: '<p>Verdadeiro ou falso? Prove. <strong>$2^{n+1} = O(2^n)$</strong></p>',
  sol: ['<strong>VERDADEIRO.</strong> $2^{n+1} = 2·2^n$, e o fator 2 é uma constante. '
      + 'Tome $c = 2$ e $n_0 = 1$.',
      '<strong>Compare com o item 26(d):</strong> $2^{2n} = (2^n)^2$ <em>não</em> é $O(2^n)$. '
      + 'Somar no expoente é fator constante; multiplicar no expoente não é.'],
  r: 'Verdadeiro ($c = 2$).' },

{ id: 'L1-24j', n: 24, sub: 'j', s: 2, t: 'vf', d: 2, p: 'alta', g: ['vf', 'O', 'exponencial'],
  e: '<p>Verdadeiro ou falso? Prove. <strong>$3^n = O(2^n)$</strong></p>',
  sol: ['<strong>FALSO.</strong> Se existissem $c, n_0$ com $3^n ≤ c·2^n$, dividindo por $2^n$ '
      + 'obteríamos $$\\p{\\f{3}{2}}^n ≤ c$$',
      'Mas $(3/2)^n → ∞$, logo nenhuma constante $c$ serve. Contradição.',
      '<strong>Contraste com logaritmos:</strong> bases <em>diferentes</em> em exponenciais dão '
      + 'classes diferentes; bases diferentes em logaritmos dão a mesma classe (itens 24k e 24l). '
      + 'A razão: mudar a base do log é multiplicar por constante; mudar a base da exponencial é '
      + '<em>elevar</em> a uma constante.'],
  r: 'Falso — $(3/2)^n → ∞$.' },

{ id: 'L1-24k', n: 24, sub: 'k', s: 2, t: 'vf', d: 1, p: 'alta', g: ['vf', 'O', 'log'],
  e: '<p>Verdadeiro ou falso? Prove. <strong>$log_2 n = O(log_3 n)$</strong></p>',
  sol: ['<strong>VERDADEIRO.</strong> Pela mudança de base, '
      + '$$log_2 n = \\f{log_3 n}{log_3 2}$$'
      + 'e $\\f{1}{log_3 2} ≈ 1{,}585$ é uma <strong>constante</strong>.',
      'Tome $c = \\f{1}{log_3 2}$ e $n_0 = 1$. ∎',
      '<em>É por isso que escrevemos $Θ(log n)$ sem indicar a base.</em>'],
  r: 'Verdadeiro ($c = 1/log_3 2 ≈ 1{,}585$).' },

{ id: 'L1-24l', n: 24, sub: 'l', s: 2, t: 'vf', d: 1, p: 'alta', g: ['vf', 'O', 'log'],
  e: '<p>Verdadeiro ou falso? Prove. <strong>$log_3 n = O(log_2 n)$</strong></p>',
  sol: ['<strong>VERDADEIRO.</strong> $log_3 n = \\f{log_2 n}{log_2 3}$, e '
      + '$\\f{1}{log_2 3} ≈ 0{,}631$ é constante. Tome $c = 1$ (já que $0{,}631 < 1$) '
      + 'e $n_0 = 1$.',
      '<strong>Junto com o item (k):</strong> vale $log_2 n = O(log_3 n)$ <em>e</em> '
      + '$log_3 n = O(log_2 n)$, portanto $log_2 n = Θ(log_3 n)$ — logaritmos de bases '
      + 'diferentes estão sempre na mesma classe.'],
  r: 'Verdadeiro. Com (k), conclui-se $log_2 n = Θ(log_3 n)$.' },

{ id: 'L1-24m', n: 24, sub: 'm', s: 2, t: 'vf', d: 1, p: 'media', g: ['vf', 'O'],
  e: '<p>Verdadeiro ou falso? Prove. <strong>$n = O(2^n)$</strong></p>',
  sol: ['<strong>VERDADEIRO.</strong> Por indução mostra-se que $n ≤ 2^n$ para todo $n ≥ 1$: '
      + 'a base $1 ≤ 2$ vale; e se $n ≤ 2^n$, então $n + 1 ≤ 2^n + 1 ≤ 2^n + 2^n = 2^{n+1}$.',
      'Tome $c = 1$ e $n_0 = 1$.'],
  r: 'Verdadeiro ($c = 1$).' },

{ id: 'L1-24n', n: 24, sub: 'n', s: 2, t: 'vf', d: 1, p: 'media', g: ['vf', 'O', 'log'],
  e: '<p>Verdadeiro ou falso? Prove. <strong>$lg n = O(n)$</strong></p>',
  sol: ['<strong>VERDADEIRO.</strong> Vale $lg n ≤ n$ para todo $n ≥ 1$ — consequência direta '
      + 'de $n ≤ 2^n$ (item m), tomando $lg$ dos dois lados.',
      'Tome $c = 1$ e $n_0 = 1$.'],
  r: 'Verdadeiro ($c = 1$).' },

{ id: 'L1-24o', n: 24, sub: 'o', s: 2, t: 'vf', d: 2, p: 'media', g: ['vf', 'O', 'exponencial'],
  e: '<p>Verdadeiro ou falso? Prove. <strong>$n = O(2^{n/4})$</strong></p>',
  sol: ['<strong>VERDADEIRO.</strong> $2^{n/4} = \\p{2^{1/4}}^n ≈ (1{,}189)^n$ ainda é uma '
      + 'exponencial de base maior que 1, e toda exponencial de base $> 1$ domina todo polinômio.',
      '<strong>Verificação:</strong> $lim_{n→∞}\\f{n}{2^{n/4}} = 0$ por L\'Hôpital '
      + '($\\f{1}{(ln 2 / 4)·2^{n/4}} → 0$).',
      '<em>A base menor só empurra o ponto de cruzamento para a direita: a desigualdade '
      + '$n ≤ 2^{n/4}$ só passa a valer a partir de $n = 16$. Tome $n_0 = 16$ e $c = 1$.</em>'],
  r: 'Verdadeiro ($c = 1$, $n_0 = 16$).' },

{ id: 'L1-24p', n: 24, sub: 'p', s: 2, t: 'vf', d: 1, p: 'baixa', g: ['vf', 'O', 'log'],
  e: '<p>Verdadeiro ou falso? Prove. <strong>$4 lg n = O(n)$</strong></p>',
  sol: ['<strong>VERDADEIRO.</strong> Pelo item (n), $lg n ≤ n$, logo $4 lg n ≤ 4n$. '
      + 'Tome $c = 4$ e $n_0 = 1$. A constante 4 não altera a classe.'],
  r: 'Verdadeiro ($c = 4$).' },

{ id: 'L1-24q', n: 24, sub: 'q', s: 2, t: 'vf', d: 2, p: 'alta', g: ['vf', 'O'],
  e: '<p>Verdadeiro ou falso? Prove. '
   + '<strong>$100 lg n − 10n + 2n lg n = O(n lg n)$</strong></p>',
  sol: ['<strong>VERDADEIRO.</strong> Identifique o termo dominante: $2n lg n$. '
      + 'Os outros são de ordem inferior ($100 lg n$) ou negativos ($−10n$).',
      'Para $n ≥ 2$ (onde $lg n ≥ 1$): $100 lg n ≤ 100 n lg n$ e $−10n ≤ 0$, logo'
      + '$$100 lg n − 10n + 2n lg n ≤ 102·n lg n$$'
      + 'Tome $c = 102$ e $n_0 = 2$.',
      '<em>De fato a expressão é $Θ(n lg n)$: para o limite inferior, note que para $n$ grande '
      + '$2n lg n − 10n ≥ n lg n$, já que $lg n ≥ 10$ a partir de $n = 1024$.</em>'],
  r: 'Verdadeiro — o termo $2n lg n$ domina. De fato é $Θ(n lg n)$.' },

{ id: 'L1-24r', n: 24, sub: 'r', s: 2, t: 'vf', d: 2, p: 'media', g: ['vf', 'theta', 'conferir'],
  e: '<p>Verdadeiro ou falso? Prove. '
   + '<strong>$\\f{3n^2}{2} + \\f{7n}{2} n^3 − 4 = Θ(n^2)$</strong></p>'
   + '<p class="xs muted"><strong>Nota de transcrição:</strong> o enunciado está reproduzido '
   + 'como consta no PDF da lista. O fator $n^3$ solto parece ser erro de digitação, já que o '
   + 'item (g) é a versão em $O$ desta mesma expressão sem o $n^3$. A solução trata as duas '
   + 'leituras.</p>',
  h: 'Resolva a leitura sem o $n^3$ (que é a do item g) e depois veja o que muda se o $n^3$ '
   + 'estiver lá de verdade.',
  sol: [
    '<strong>Leitura 1 — sem o $n^3$ (provável intenção): $\\f{3n^2}{2} + \\f{7n}{2} − 4 = Θ(n^2)$. '
    + 'VERDADEIRO.</strong>',
    '<em>Limite superior:</em> para $n ≥ 1$, a expressão é $≤ \\p{\\f{3}{2}+\\f{7}{2}}n^2 = 5n^2$. '
    + 'Tome $c_2 = 5$.<br>'
    + '<em>Limite inferior:</em> para $n ≥ 2$, $\\f{7n}{2} − 4 ≥ 3 > 0$, logo a expressão é '
    + '$≥ \\f{3}{2}n^2$. Tome $c_1 = \\f{3}{2}$.<br>'
    + 'Com $c_1 = 3/2$, $c_2 = 5$, $n_0 = 2$, vale $Θ(n^2)$. ∎',
    '<strong>Leitura 2 — com o $n^3$ literal: $\\f{3n^2}{2} + \\f{7n^4}{2} − 4$. FALSO.</strong> '
    + 'O termo $\\f{7}{2}n·n^3 = \\f{7}{2}n^4$ domina, e a expressão é $Θ(n^4)$, não $Θ(n^2)$.',
    '<strong>Recomendação:</strong> confira o enunciado com o professor. Nos dois casos o '
    + 'raciocínio cobrado é o mesmo — identificar o termo de maior grau e exibir $c_1$, $c_2$ '
    + 'e $n_0$.'
  ],
  r: 'Sem o $n^3$: verdadeiro, $Θ(n^2)$. Com o $n^3$ literal: falso, seria $Θ(n^4)$.' },

{ id: 'L1-24s', n: 24, sub: 's', s: 2, t: 'vf', d: 1, p: 'alta', g: ['vf', 'theta'],
  e: '<p>Verdadeiro ou falso? Prove. <strong>$9999n^2 = Θ(n^2)$</strong></p>',
  sol: ['<strong>VERDADEIRO.</strong> Tome $c_1 = c_2 = 9999$ e $n_0 = 1$: vale '
      + '$9999n^2 ≤ 9999n^2 ≤ 9999n^2$ trivialmente.',
      'Constantes multiplicativas, por maiores que sejam, não alteram a classe $Θ$.'],
  r: 'Verdadeiro ($c_1 = c_2 = 9999$).' },

{ id: 'L1-24t', n: 24, sub: 't', s: 2, t: 'vf', d: 2, p: 'alta', g: ['vf', 'theta'],
  e: '<p>Verdadeiro ou falso? Prove. '
   + '<strong>$\\f{n^2}{1000} − 999n = Θ(n^2)$</strong></p>',
  sol: ['<strong>VERDADEIRO.</strong> A constante $\\f{1}{1000}$ é pequena e o termo subtraído é '
      + 'grande, mas nada disso importa assintoticamente — o grau 2 domina o grau 1.',
      '<em>Limite superior:</em> $\\f{n^2}{1000} − 999n ≤ \\f{n^2}{1000}$ para todo $n ≥ 0$. '
      + 'Tome $c_2 = \\f{1}{1000}$.',
      '<em>Limite inferior:</em> queremos $\\f{n^2}{1000} − 999n ≥ c_1 n^2$. Com '
      + '$c_1 = \\f{1}{2000}$, isso equivale a $\\f{n^2}{2000} ≥ 999n$, ou seja '
      + '$n ≥ 1.998.000$. Tome $n_0 = 1.998.000$.',
      'Com $c_1 = \\f{1}{2000}$, $c_2 = \\f{1}{1000}$ e esse $n_0$, vale $Θ(n^2)$. ∎',
      '<em>Note que $n_0$ é enorme — e é perfeitamente legítimo. A definição só exige que '
      + '<strong>exista</strong> algum $n_0$.</em>'],
  r: 'Verdadeiro, com $c_1 = 1/2000$, $c_2 = 1/1000$ e $n_0 = 1.998.000$.' },

{ id: 'L1-24u', n: 24, sub: 'u', s: 2, t: 'vf', d: 1, p: 'alta', g: ['vf', 'theta', 'log'],
  e: '<p>Verdadeiro ou falso? Prove. <strong>$log_2 n + 1 = Θ(log_{10} n)$</strong></p>',
  sol: ['<strong>VERDADEIRO.</strong> Pela mudança de base, '
      + '$log_2 n = \\f{log_{10} n}{log_{10} 2} = k·log_{10}n$, com $k = \\f{1}{log_{10}2} ≈ 3{,}32$.',
      'Então $log_2 n + 1 = k·log_{10}n + 1$.',
      '<em>Superior:</em> para $n ≥ 10$, $log_{10}n ≥ 1$, logo $k log_{10}n + 1 ≤ (k+1)log_{10}n$. '
      + 'Tome $c_2 = k + 1 ≈ 4{,}32$.<br>'
      + '<em>Inferior:</em> $k log_{10}n + 1 ≥ k log_{10}n$. Tome $c_1 = k ≈ 3{,}32$.',
      'Com $n_0 = 10$, vale $Θ(log_{10}n)$. ∎ O "+1" é absorvido, assim como a mudança de base.'],
  r: 'Verdadeiro — base e constante aditiva são ambas absorvidas.' },

{ id: 'L1-25', n: 25, s: 2, t: 'aberta', d: 2, p: 'alta', g: ['somatório', 'theta', 'slide-01'],
  e: '<p>Qual a solução da expressão $\\S{i=1}{n} Θ(i)$?</p>',
  h: 'Cuidado: $Θ(i)$ dentro de um somatório é uma função anônima diferente a cada termo.',
  sol: [
    '<strong>Resposta: $Θ(n^2)$.</strong>',
    '<strong>O que a notação significa aqui.</strong> $\\S{i=1}{n}Θ(i)$ quer dizer '
    + '$\\S{i=1}{n} f(i)$, onde $f$ é <em>alguma</em> função com $f(i) = Θ(i)$ — ou seja, '
    + 'existem $c_1, c_2 > 0$ com $c_1 i ≤ f(i) ≤ c_2 i$ para $i$ suficientemente grande.',
    '<strong>Limite superior.</strong> '
    + '$$\\S{i=1}{n} f(i) ≤ \\S{i=1}{n} c_2 i = c_2·\\f{n(n+1)}{2} = O(n^2)$$',
    '<strong>Limite inferior.</strong> '
    + '$$\\S{i=1}{n} f(i) ≥ \\S{i=1}{n} c_1 i = c_1·\\f{n(n+1)}{2} = Ω(n^2)$$',
    'Das duas, $\\S{i=1}{n}Θ(i) = Θ(n^2)$. ∎',
    '<strong>Cuidado com a generalização.</strong> Não é sempre que se pode "puxar o $Θ$ para '
    + 'fora" do somatório — isso só funciona porque o número de termos ($n$) é polinomial e as '
    + 'constantes $c_1, c_2$ são uniformes. Para um número não-limitado de funções distintas, '
    + 'a manipulação exige cuidado.'
  ],
  r: '$Θ(n^2)$ — limite-se por $c_1 i$ e $c_2 i$ e some a série aritmética.' },

{ id: 'L1-26a', n: 26, sub: 'a', s: 2, t: 'vf', d: 2, p: 'alta', g: ['vf', 'log', 'crescimento'],
  e: '<p>É correto ou incorreto afirmar que $(log n)^a = O(n^b)$, para qualquer $b$ e qualquer '
   + '$a$ positivo?</p>',
  sol: [
    '<strong>CORRETO — desde que $b > 0$.</strong> Qualquer potência de logaritmo é dominada '
    + 'por qualquer potência positiva de $n$, por maior que seja $a$ e por menor que seja $b$.',
    '<strong>Prova.</strong> Substitua $n = 2^m$ (isto é, $m = lg n$):'
    + '$$\\f{(log n)^a}{n^b} = \\f{m^a}{2^{bm}} → 0 \\t{ quando } m → ∞$$'
    + 'porque exponencial domina polinômio (item 24c). Logo o limite é 0 e '
    + '$(log n)^a = o(n^b) ⊆ O(n^b)$. ∎',
    '<strong>A ressalva.</strong> O enunciado diz "para qualquer $b$", sem restringir o sinal. '
    + 'Se $b ≤ 0$ a afirmação é <strong>falsa</strong>: com $b = 0$, $n^b = 1$ e '
    + '$(log n)^a → ∞$, logo $(log n)^a ≠ O(1)$. A leitura pretendida é claramente $b > 0$ — '
    + 'vale explicitar essa hipótese na resposta.'
  ],
  r: 'Correto para $b > 0$. (Falso se $b ≤ 0$ — vale explicitar a hipótese.)' },

{ id: 'L1-26b', n: 26, sub: 'b', s: 2, t: 'vf', d: 1, p: 'media', g: ['vf', 'log'],
  e: '<p>É correto ou incorreto afirmar que $log_{10} n = O(log_2 n)$?</p>',
  sol: ['<strong>CORRETO.</strong> $log_{10}n = \\f{log_2 n}{log_2 10}$, e '
      + '$\\f{1}{log_2 10} ≈ 0{,}301$ é constante. Tome $c = 1$ e $n_0 = 1$.',
      'Vale também a recíproca, logo $log_{10}n = Θ(log_2 n)$. É o mesmo fato dos itens '
      + '24(k) e 24(l).'],
  r: 'Correto — e de fato $Θ$, pela mudança de base.' },

{ id: 'L1-26c', n: 26, sub: 'c', s: 2, t: 'vf', d: 1, p: 'alta', g: ['vf', 'exponencial'],
  e: '<p>É correto ou incorreto afirmar que $2^{n+1} = O(2^n)$?</p>',
  sol: ['<strong>CORRETO.</strong> $2^{n+1} = 2·2^n ≤ 2·2^n$, logo $c = 2$ e $n_0 = 1$ servem.',
      '<em>Repetição proposital do item 24(i) — o par (c)/(d) deste exercício existe justamente '
      + 'para contrastar somar e multiplicar no expoente.</em>'],
  r: 'Correto ($c = 2$).' },

{ id: 'L1-26d', n: 26, sub: 'd', s: 2, t: 'vf', d: 2, p: 'alta', g: ['vf', 'exponencial'],
  e: '<p>É correto ou incorreto afirmar que $2^{2n} = O(2^n)$?</p>',
  sol: ['<strong>INCORRETO.</strong> $2^{2n} = (2^n)^2 = 4^n$. Dividindo:'
      + '$$\\f{2^{2n}}{2^n} = 2^n → ∞$$'
      + 'logo nenhuma constante $c$ satisfaz $2^{2n} ≤ c·2^n$ para todo $n$ grande.',
      '<strong>O contraste que este par ensina:</strong><br>'
      + '$2^{n+1} = 2·2^n$ — somar no expoente multiplica por constante. ✓ $O(2^n)$<br>'
      + '$2^{2n} = (2^n)^2$ — multiplicar no expoente <em>eleva</em>. ✗'],
  r: 'Incorreto — $2^{2n}/2^n = 2^n → ∞$.' },

{ id: 'L1-26e', n: 26, sub: 'e', s: 2, t: 'vf', d: 2, p: 'alta', g: ['vf', 'theta'],
  e: '<p>É correto ou incorreto afirmar que $f(n) = Θ(f(n/2))$?</p>',
  sol: [
    '<strong>INCORRETO em geral.</strong> Vale para algumas funções e falha para outras, logo '
    + 'a afirmação universal é falsa.',
    '<strong>Onde vale.</strong> Para polinômios: $f(n) = n^k$ dá '
    + '$\\f{f(n)}{f(n/2)} = \\f{n^k}{(n/2)^k} = 2^k$ — constante. ✓',
    '<strong>Contraexemplo.</strong> $f(n) = 2^n$:'
    + '$$\\f{f(n)}{f(n/2)} = \\f{2^n}{2^{n/2}} = 2^{n/2} → ∞$$'
    + 'Logo $2^n ≠ O(2^{n/2})$, e portanto $2^n ≠ Θ(2^{n/2})$. ✗',
    '<strong>Outro contraexemplo, mais extremo:</strong> $f(n) = n!$, onde a razão cresce '
    + 'ainda mais rápido.',
    '<em>Este é também o item 29(b) da lista.</em>'
  ],
  r: 'Incorreto. Vale para polinômios; falha para $f(n) = 2^n$, pois $2^n/2^{n/2} = 2^{n/2} → ∞$.' },

{ id: 'L1-26f', n: 26, sub: 'f', s: 2, t: 'vf', d: 2, p: 'alta', g: ['vf', 'fatorial', 'slide-01'],
  e: '<p>É correto ou incorreto afirmar que $log n! = O(n log n)$?</p>',
  sol: [
    '<strong>CORRETO.</strong> De fato vale a igualdade mais forte, $log n! = Θ(n log n)$.',
    '<strong>Limite superior ($O$).</strong> Cada um dos $n$ fatores de $n!$ é no máximo $n$, '
    + 'logo $n! ≤ n^n$. Tomando log: $$log n! ≤ log(n^n) = n log n$$ Tome $c = 1$, $n_0 = 1$. ∎',
    '<strong>Limite inferior ($Ω$), se quiserem o $Θ$.</strong> Descarte a metade inferior dos '
    + 'fatores; cada um dos $n/2$ restantes é maior que $n/2$:'
    + '$$n! ≥ \\p{\\f{n}{2}}^{n/2} ⇒ log n! ≥ \\f{n}{2}\\p{log n − 1} = Ω(n log n)$$',
    '<em>Não é preciso invocar Stirling. Na prova, o argumento de "metade dos fatores" é mais '
    + 'rápido de escrever e igualmente rigoroso.</em>',
    '<em>Este é também o item 30(e) e o exercício 2 do slide 01.</em>'
  ],
  r: 'Correto — e de fato $Θ(n log n)$, via $n! ≤ n^n$ e $n! ≥ (n/2)^{n/2}$.' },

{ id: 'L1-26g', n: 26, sub: 'g', s: 2, t: 'vf', d: 1, p: 'alta', g: ['vf', 'somatório', 'geométrica'],
  e: '<p>É correto ou incorreto afirmar que $\\S{i=1}{n}\\p{\\f{1}{2}}^i = Θ(1)$?</p>',
  sol: [
    '<strong>CORRETO.</strong> É uma série geométrica de razão $\\f{1}{2} < 1$.',
    '<strong>Valor exato:</strong> $$\\S{i=1}{n}\\p{\\f{1}{2}}^i = 1 − \\p{\\f{1}{2}}^n$$',
    '<strong>Limites.</strong> Superior: a soma é sempre $< 1$, pois é limitada pela série '
    + 'infinita $\\S{i=1}{∞}(1/2)^i = 1$. Inferior: para $n ≥ 1$, a soma é $≥ \\f{1}{2}$ '
    + '(o primeiro termo).',
    'Com $c_1 = \\f{1}{2}$, $c_2 = 1$ e $n_0 = 1$: $Θ(1)$. ∎',
    '<strong>Por que isso importa no curso:</strong> é exatamente o argumento que fecha o '
    + '<em>caso 3 do Teorema Mestre</em> — uma série geométrica decrescente soma um número '
    + 'constante de vezes o primeiro termo, então o custo da raiz domina a árvore inteira.'
  ],
  r: 'Correto — soma $= 1 − 2^{−n} < 1$, e $≥ 1/2$. Logo $Θ(1)$.' },

{ id: 'L1-26h', n: 26, sub: 'h', s: 2, t: 'vf', d: 3, p: 'media', g: ['vf', 'escala', 'conferir'],
  e: '<p>É correto ou incorreto afirmar que: se $T\\p{\\f{n}{100}} = c·n·log_2 n + n$, para algum '
   + '$c > 0$, então $T(n) = O(n log n)$?</p>'
   + '<p class="xs muted"><strong>Nota de transcrição:</strong> no PDF a posição do "2" em '
   + '"$log_2 n$" é ambígua (pode ser base 2 ou $log^2 n$). A solução resolve as duas leituras.</p>',
  h: 'Não é $T(n)$ que está dado — é $T(n/100)$. Faça a substituição de variável.',
  sol: [
    '<strong>Leitura 1 — base 2: $T(n/100) = c·n·log_2 n + n$. CORRETO.</strong>',
    'Substitua $m = \\f{n}{100}$, ou seja $n = 100m$:'
    + '$$T(m) = c·100m·log_2(100m) + 100m = 100cm\\p{log_2 100 + log_2 m} + 100m$$'
    + '$$= 100c·m·log_2 m + m\\p{100c·log_2 100 + 100}$$',
    'O termo dominante é $100c·m log_2 m = Θ(m log m)$, e o segundo é $Θ(m)$. '
    + 'Logo $T(m) = Θ(m log m)$, isto é, $T(n) = Θ(n log n) ⊆ O(n log n)$. ✓',
    '<strong>A lição:</strong> reescalar o argumento por um <em>fator constante</em> não muda a '
    + 'classe assintótica, porque $log(100m) = log m + log 100 = log m + O(1)$.',
    '<strong>Leitura 2 — quadrado: $T(n/100) = c·n·log^2 n + n$. INCORRETO.</strong> '
    + 'Pela mesma substituição, $T(m) = Θ(m log^2 m)$, e $m log^2 m ≠ O(m log m)$, pois '
    + 'o quociente é $log m → ∞$.',
    '<strong>Recomendação:</strong> confirme a grafia no PDF original (item 26h, p. 4). '
    + 'O raciocínio cobrado — substituição de variável e absorção da constante no logaritmo — '
    + 'é o mesmo nos dois casos.'
  ],
  r: 'Com $log_2$ (base): correto, $T(n) = Θ(n log n)$. Com $log^2$: incorreto, seria $Θ(n log^2 n)$.' },

{ id: 'L1-27', n: 27, s: 2, t: 'aberta', d: 3, p: 'media', g: ['incomparáveis', 'O'],
  e: '<p>Existem duas funções $f$ e $g$, dos naturais nos reais positivos, tais que '
   + '$f(n) ∉ O(g(n))$ e $g(n) ∉ O(f(n))$? Em caso afirmativo, apresente um exemplo. '
   + 'Em caso negativo, prove que tais funções não existem.</p>',
  h: 'Faça as funções se alternarem: cada uma "ganha" em metade dos valores de $n$.',
  sol: [
    '<strong>SIM, existem.</strong> Funções assim se chamam <em>assintoticamente '
    + 'incomparáveis</em>.',
    '<strong>Exemplo mais simples.</strong>'
    + '$$f(n) = \\c{n}{se n é par}{1}{se n é ímpar}$$'
    + '$$g(n) = \\c{1}{se n é par}{n}{se n é ímpar}$$',
    '<strong>$f ∉ O(g)$:</strong> nos $n$ pares, $\\f{f(n)}{g(n)} = \\f{n}{1} = n$, que cresce '
    + 'sem limite. Como a definição de $O$ exige a desigualdade para <em>todo</em> $n ≥ n_0$, '
    + 'e há pares arbitrariamente grandes, nenhuma constante $c$ serve.',
    '<strong>$g ∉ O(f)$:</strong> simetricamente, nos $n$ ímpares $\\f{g(n)}{f(n)} = n → ∞$.',
    '<strong>Exemplo contínuo (mais elegante):</strong> $f(n) = n^{1 + sen(n)}$ e $g(n) = n$. '
    + 'O expoente de $f$ oscila entre 0 e 2, então $f$ ora fica muito abaixo, ora muito acima '
    + 'de $g$.',
    '<strong>O que isso mostra:</strong> a relação "$= O(⋅)$" é uma <em>ordem parcial</em>, não '
    + 'total. Nem todo par de funções é comparável — embora as funções que aparecem em análise '
    + 'de algoritmos quase sempre sejam.'
  ],
  r: 'Sim. Ex.: $f(n)=n$ se $n$ par, 1 se ímpar; $g$ o oposto. Nenhuma limita a outra.' },

{ id: 'L1-28', n: 28, s: 2, t: 'aberta', d: 1, p: 'media', g: ['prova', 'theta'],
  e: '<p>Prove ou apresente contraexemplo: se $f(n) = O(g(n))$ e $g(n) = O(f(n))$, então segue '
   + 'que $f(n) = g(n)$ para todo $n$.</p>',
  h: 'O que as duas hipóteses juntas realmente estabelecem?',
  sol: [
    '<strong>FALSO.</strong>',
    '<strong>Contraexemplo.</strong> Tome $f(n) = n$ e $g(n) = 2n$. Então:<br>'
    + '$f(n) = O(g(n))$ ✓ (com $c = 1$) &nbsp;·&nbsp; $g(n) = O(f(n))$ ✓ (com $c = 2$)<br>'
    + 'Mas $f(n) ≠ g(n)$ para todo $n ≥ 1$.',
    '<strong>O que as hipóteses de fato estabelecem.</strong> $f = O(g)$ e $g = O(f)$ juntas '
    + 'equivalem a $$f(n) = Θ(g(n))$$ — as duas funções crescem à <em>mesma taxa</em>, a menos '
    + 'de fatores constantes.',
    '<strong>A confusão que o exercício testa.</strong> A notação assintótica descreve '
    + '<em>classes de crescimento</em>, não valores. "Mesma classe" nunca significa "mesma '
    + 'função". O símbolo "=" em $f = O(g)$ não é igualdade — leia-o como "pertence a".',
    '<em>Compare com o item 18, que trata da mesma assimetria do "=".</em>'
  ],
  r: 'Falso. $f = n$, $g = 2n$ é contraexemplo. As hipóteses dão $f = Θ(g)$, não $f = g$.' },

{ id: 'L1-29a', n: 29, sub: 'a', s: 2, t: 'vf', d: 1, p: 'alta', g: ['vf', 'exponencial'],
  e: '<p>Verdadeira ou falsa? Considere um algoritmo que faz $2^{2n}$ operações. '
   + 'Pode-se dizer que esse algoritmo é $O(2^n)$.</p>',
  sol: ['<strong>FALSA.</strong> $2^{2n} = (2^n)^2 = 4^n$, e $\\f{4^n}{2^n} = 2^n → ∞$.',
      'Nenhuma constante $c$ satisfaz $4^n ≤ c·2^n$ para todo $n$ grande. '
      + 'O algoritmo é $Θ(4^n)$, que é <em>muito</em> pior que $Θ(2^n)$.',
      '<em>Mesmo conteúdo do item 26(d).</em>'],
  r: 'Falsa — $2^{2n} = 4^n$, e $4^n/2^n = 2^n → ∞$.' },

{ id: 'L1-29b', n: 29, sub: 'b', s: 2, t: 'vf', d: 2, p: 'alta', g: ['vf', 'theta'],
  e: '<p>Verdadeira ou falsa? $f(n) = Θ(f(n/2))$.</p>',
  sol: ['<strong>FALSA</strong> como afirmação geral.',
      'Vale para polinômios ($n^k / (n/2)^k = 2^k$, constante), mas falha para exponenciais: '
      + 'com $f(n) = 2^n$, $$\\f{2^n}{2^{n/2}} = 2^{n/2} → ∞$$',
      '<em>Ver a solução completa no item 26(e).</em>'],
  r: 'Falsa — contraexemplo $f(n) = 2^n$.' },

{ id: 'L1-29c', n: 29, sub: 'c', s: 2, t: 'vf', d: 2, p: 'alta', g: ['vf', 'O', 'theta'],
  e: '<p>Verdadeira ou falsa? Considere um algoritmo cuja função de complexidade é '
   + '$f(n) = lg(n)$. É correto afirmar que esse algoritmo é $O(n)$ mas não é $Θ(n)$.</p>',
  sol: [
    '<strong>VERDADEIRA.</strong>',
    '<strong>É $O(n)$:</strong> vale $lg n ≤ n$ para todo $n ≥ 1$, logo $c = 1$ e $n_0 = 1$ '
    + 'satisfazem a definição. ✓',
    '<strong>Não é $Θ(n)$:</strong> para ser $Θ(n)$ precisaria também ser $Ω(n)$, isto é, '
    + 'existir $c_1 > 0$ com $lg n ≥ c_1 n$ para $n$ grande. Mas'
    + '$$lim_{n→∞}\\f{lg n}{n} = 0$$'
    + 'logo $\\f{lg n}{n}$ acaba ficando menor que qualquer $c_1 > 0$. Contradição. ✗',
    '<strong>Na verdade $lg n = o(n)$</strong> — estritamente menor, que é a forma mais precisa '
    + 'de dizer o que a afirmação descreve. É a diferença entre $O$ (que é "$≤$") e $o$ '
    + '(que é "$<$").'
  ],
  r: 'Verdadeira — $lg n = o(n)$: é $O(n)$ mas não $Ω(n)$, logo não é $Θ(n)$.' },

{ id: 'L1-29d', n: 29, sub: 'd', s: 2, t: 'vf', d: 2, p: 'alta', g: ['vf', 'theta', 'soma'],
  e: '<p>Verdadeira ou falsa? $f(n) + g(n) = Θ(min(f(n), g(n)))$.</p>',
  sol: [
    '<strong>FALSA.</strong> O correto é $f(n) + g(n) = Θ(max(f(n), g(n)))$ — quem domina a '
    + 'soma é a <em>maior</em> das parcelas, não a menor.',
    '<strong>Contraexemplo.</strong> $f(n) = n^2$, $g(n) = n$. Então '
    + '$f + g = n^2 + n = Θ(n^2)$, mas $min(f,g) = n$. E $n^2 ≠ Θ(n)$. ✗',
    '<strong>Prova do enunciado correto.</strong> Sejam $M = max(f,g)$ e $m = min(f,g)$, '
    + 'com $f, g ≥ 0$. Então'
    + '$$M ≤ f + g ≤ 2M$$'
    + 'A desigualdade da esquerda vale porque a soma inclui o máximo; a da direita porque '
    + 'ambas as parcelas são $≤ M$. Com $c_1 = 1$ e $c_2 = 2$, segue '
    + '$f + g = Θ(max(f,g))$. ∎',
    '<strong>Aplicação prática:</strong> é por isso que, em trechos de código executados '
    + '<em>em sequência</em>, a complexidade total é a do trecho mais caro.'
  ],
  r: 'Falsa — é $Θ(max(f,g))$. Contraexemplo: $f = n^2$, $g = n$.' },

{ id: 'L1-30a', n: 30, sub: 'a', s: 2, t: 'vf', d: 1, p: 'alta', g: ['theta', 'polinômio', 'slide-01'],
  e: '<p>Demonstre ou forneça contraexemplo: $100n^7 + 503n^5 = Θ(n^7)$</p>',
  sol: [
    '<strong>VERDADEIRO.</strong>',
    '<em>Limite superior:</em> para $n ≥ 1$, $503n^5 ≤ 503n^7$, logo '
    + '$100n^7 + 503n^5 ≤ 603n^7$. Tome $c_2 = 603$.',
    '<em>Limite inferior:</em> como $503n^5 ≥ 0$, temos $100n^7 + 503n^5 ≥ 100n^7$. '
    + 'Tome $c_1 = 100$.',
    'Com $c_1 = 100$, $c_2 = 603$ e $n_0 = 1$, vale $Θ(n^7)$. ∎',
    '<em>Este é o exercício 2.1 do slide 01.</em>'
  ],
  r: 'Verdadeiro ($c_1 = 100$, $c_2 = 603$, $n_0 = 1$).' },

{ id: 'L1-30b', n: 30, sub: 'b', s: 2, t: 'vf', d: 2, p: 'alta', g: ['theta', 'álgebra-assintótica', 'slide-01'],
  e: '<p>Demonstre ou forneça contraexemplo: $3n^4 + Θ(n^2) = Θ(n^4)$</p>',
  sol: [
    '<strong>VERDADEIRO.</strong>',
    '<strong>Leitura da notação.</strong> $Θ(n^2)$ à esquerda do "=" significa: <em>para toda</em> '
    + 'função $h(n) = Θ(n^2)$, vale $3n^4 + h(n) = Θ(n^4)$.',
    '<strong>Prova.</strong> Seja $h$ qualquer função com $h(n) = Θ(n^2)$: existem '
    + '$d_1, d_2, n_1 > 0$ com $d_1 n^2 ≤ h(n) ≤ d_2 n^2$ para $n ≥ n_1$.',
    '<em>Superior:</em> para $n ≥ max(n_1, 1)$, '
    + '$3n^4 + h(n) ≤ 3n^4 + d_2 n^2 ≤ (3 + d_2)n^4$. Tome $c_2 = 3 + d_2$.',
    '<em>Inferior:</em> como $h(n) ≥ d_1 n^2 > 0$, temos $3n^4 + h(n) ≥ 3n^4$. '
    + 'Tome $c_1 = 3$.',
    'Logo $3n^4 + h(n) = Θ(n^4)$ para toda $h = Θ(n^2)$. ∎',
    '<em>Este é o exercício 2.2 do slide 01, e a mesma ideia do item 18.</em>'
  ],
  r: 'Verdadeiro ($c_1 = 3$, $c_2 = 3 + d_2$).' },

{ id: 'L1-30c', n: 30, sub: 'c', s: 2, t: 'vf', d: 2, p: 'media', g: ['theta', 'álgebra-assintótica'],
  e: '<p>Demonstre ou forneça contraexemplo: se $f(n) = Θ(s(n))$ e $g(n) = Θ(r(n))$, então '
   + '$f(n) + g(n) = Θ(f(n) + g(n))$</p>',
  sol: [
    '<strong>VERDADEIRO — mas trivialmente.</strong> Note que o lado direito é '
    + '$Θ(f(n) + g(n))$, e não $Θ(s(n) + r(n))$.',
    'Qualquer função é $Θ$ de si mesma (<strong>reflexividade</strong>): tome $c_1 = c_2 = 1$ '
    + 'e $n_0 = 1$, e a desigualdade $1·(f+g) ≤ (f+g) ≤ 1·(f+g)$ vale trivialmente.',
    'As hipóteses sobre $s$ e $r$ são <strong>irrelevantes</strong> para a conclusão como '
    + 'enunciada.',
    '<strong>A versão interessante</strong> — e provavelmente a pretendida, já que é a que '
    + 'aparece no slide 01 — é: <em>$f + g = Θ(s + r)$</em>. Essa também é verdadeira, e a '
    + 'prova é a mesma do item 22(b) aplicada duas vezes (uma para $O$, outra para $Ω$), '
    + 'usando $c_1 = min$ e $c_2 = max$ das constantes.',
    '<em>Vale responder às duas versões na prova, deixando claro qual está sendo tratada.</em>'
  ],
  r: 'Verdadeiro, mas trivial (reflexividade). A versão interessante, $f+g = Θ(s+r)$, também vale.' },

{ id: 'L1-30d', n: 30, sub: 'd', s: 2, t: 'vf', d: 3, p: 'media', g: ['theta', 'álgebra-assintótica'],
  e: '<p>Demonstre ou forneça contraexemplo: se $f(n) = Θ(s(n))$ e $g(n) = Θ(r(n))$, então '
   + '$f(n) − g(n) = Θ(f(n) − g(n))$</p>',
  sol: [
    '<strong>FALSO</strong> — e o motivo é mais sutil que no item (c).',
    '<strong>O problema.</strong> A notação assintótica só está definida para funções '
    + '<em>assintoticamente não-negativas</em>. Mas $f − g$ pode ser zero ou negativa.',
    '<strong>Contraexemplo 1 (diferença nula).</strong> $f(n) = g(n) = n$. Então '
    + '$f − g ≡ 0$, e $Θ(0)$ não está definido — a definição exigiria '
    + '$c_1·0 ≤ 0 ≤ c_2·0$, que é vacuamente satisfeita por qualquer função nula, mas '
    + '$Θ(0)$ como classe é degenerada e a afirmação perde sentido.',
    '<strong>Contraexemplo 2 (diferença negativa).</strong> $f(n) = n$, $g(n) = n^2$. '
    + 'Então $f − g = n − n^2 < 0$ para $n ≥ 2$, e $Θ$ de uma função negativa não está definido.',
    '<strong>Conclusão.</strong> Ao contrário da soma, a subtração <strong>não</strong> é uma '
    + 'operação segura em notação assintótica, porque pode destruir a não-negatividade. '
    + 'É a mesma razão que faz o item 22(a) falhar.',
    '<em>A afirmação só faz sentido sob a hipótese adicional de que $f(n) − g(n)$ seja '
    + 'assintoticamente positiva — e, nesse caso, ela volta a ser trivialmente verdadeira por '
    + 'reflexividade.</em>'
  ],
  r: 'Falso — $f − g$ pode ser nula ou negativa, e $Θ$ exige funções assintoticamente positivas.' },

{ id: 'L1-30e', n: 30, sub: 'e', s: 2, t: 'vf', d: 2, p: 'alta', g: ['fatorial', 'slide-01'],
  e: '<p>Demonstre ou forneça contraexemplo: $log n! = O(n log n)$</p>',
  sol: [
    '<strong>VERDADEIRO</strong> — e de fato $log n! = Θ(n log n)$.',
    '<strong>Limite superior.</strong> $n! = 1·2·⋯·n ≤ n·n·⋯·n = n^n$. Tomando logaritmo '
    + '(função crescente): $$log n! ≤ log(n^n) = n log n$$ Tome $c = 1$, $n_0 = 1$. ∎',
    '<strong>Limite inferior</strong> (para o $Θ$). Descarte os $⌈n/2⌉$ menores fatores; '
    + 'cada um dos $⌊n/2⌋$ restantes é maior que $\\f{n}{2}$:'
    + '$$n! ≥ \\p{\\f{n}{2}}^{n/2} ⇒ log n! ≥ \\f{n}{2}\\p{log n − 1} = Ω(n log n)$$',
    '<strong>Consequência importante:</strong> é este resultado que dá o limite inferior '
    + '$Ω(n log n)$ para ordenação por comparação — a árvore de decisão tem $n!$ folhas, '
    + 'logo altura $≥ log(n!) = Ω(n log n)$.',
    '<em>Mesmo conteúdo do item 26(f).</em>'
  ],
  r: 'Verdadeiro, e de fato $Θ(n log n)$.' },

{ id: 'L1-31', n: 31, s: 2, t: 'aberta', d: 2, p: 'media', g: ['theta', 'prova'],
  ref: 'Cormen 3.1-2',
  e: '<p>Mostre que, para quaisquer constantes reais $a$ e $b$, onde $b > 0$, '
   + '$(n + a)^b = Θ(n^b)$.</p>'
   + '<p class="xs muted">É também o item 37 da lista (Cormen 3.1-2).</p>',
  h: 'Limite $n + a$ entre dois múltiplos de $n$ e eleve a $b$.',
  sol: [
    '<strong>Estratégia.</strong> Como $b > 0$, a função $x ↦ x^b$ é crescente para $x > 0$. '
    + 'Basta então encontrar constantes que limitem $n + a$ entre múltiplos de $n$, e elevar '
    + 'tudo a $b$.',
    '<strong>Limite superior.</strong> Para $n ≥ 2|a|$, temos $a ≤ |a| ≤ \\f{n}{2}$, logo'
    + '$$n + a ≤ n + \\f{n}{2} = \\f{3}{2}n$$'
    + 'Elevando a $b$: $(n+a)^b ≤ \\p{\\f{3}{2}}^b n^b$. Tome $c_2 = \\p{\\f{3}{2}}^b$.',
    '<strong>Limite inferior.</strong> Para $n ≥ 2|a|$, temos $a ≥ −|a| ≥ −\\f{n}{2}$, logo'
    + '$$n + a ≥ n − \\f{n}{2} = \\f{1}{2}n > 0$$'
    + 'Elevando a $b$: $(n+a)^b ≥ \\p{\\f{1}{2}}^b n^b$. Tome $c_1 = \\p{\\f{1}{2}}^b$.',
    '<strong>Conclusão.</strong> Com $c_1 = 2^{−b}$, $c_2 = (3/2)^b$ e $n_0 = 2|a|$ '
    + '(ou $n_0 = 1$ se $a = 0$), vale'
    + '$$c_1 n^b ≤ (n+a)^b ≤ c_2 n^b \\t{ para todo } n ≥ n_0$$'
    + 'logo $(n+a)^b = Θ(n^b)$. ∎',
    '<strong>O que isto justifica no curso:</strong> é a razão formal pela qual pisos, tetos e '
    + 'deslocamentos constantes ($T(n/2 + 17)$, $⌊n/2⌋$) podem ser ignorados na análise de '
    + 'recorrências. Ver o item 65(b), que usa exatamente isso.'
  ],
  r: '$c_1 = 2^{−b}$, $c_2 = (3/2)^b$, $n_0 = 2|a|$.' },

{ id: 'L1-32', n: 32, s: 2, t: 'aberta', d: 2, p: 'baixa', g: ['definições', 'dois-parâmetros'],
  ref: 'Cormen 3.1-8',
  e: '<p>Podemos estender a notação vista em sala para o caso de funções com dois parâmetros '
   + '$n$ e $m$ que tendem ao infinito em proporções independentes. Para uma dada função '
   + '$g(n,m)$, denotamos por $O(g(n,m))$ o conjunto de funções</p>'
   + '<p style="padding-left:1rem">$O(g(n,m)) = {f(n,m)$ : existem constantes positivas '
   + '$c$, $n_0$ e $m_0$ tais que $0 ≤ f(n,m) ≤ c·g(n,m)$ para todo $n ≥ n_0$ ou '
   + '$m ≥ m_0}$</p>'
   + '<p>Dê as definições correspondentes para $Ω(g(n,m))$ e $Θ(g(n,m))$.</p>',
  sol: [
    '<strong>$Ω(g(n,m))$.</strong> Inverta o sentido da desigualdade, mantendo a estrutura:',
    '<p style="padding-left:1rem">$Ω(g(n,m)) = {f(n,m)$ : existem constantes positivas '
    + '$c$, $n_0$ e $m_0$ tais que $0 ≤ c·g(n,m) ≤ f(n,m)$ para todo $n ≥ n_0$ ou '
    + '$m ≥ m_0}$</p>',
    '<strong>$Θ(g(n,m))$.</strong> Combine as duas com constantes independentes:',
    '<p style="padding-left:1rem">$Θ(g(n,m)) = {f(n,m)$ : existem constantes positivas '
    + '$c_1$, $c_2$, $n_0$ e $m_0$ tais que '
    + '$0 ≤ c_1·g(n,m) ≤ f(n,m) ≤ c_2·g(n,m)$ para todo $n ≥ n_0$ ou $m ≥ m_0}$</p>',
    '<strong>O detalhe que o exercício testa: o "ou".</strong> A condição é '
    + '"$n ≥ n_0$ <em>ou</em> $m ≥ m_0$", não "e". Isso torna a exigência '
    + '<strong>mais forte</strong>: a desigualdade tem de valer sempre que <em>pelo menos um</em> '
    + 'dos parâmetros for grande, inclusive quando o outro for pequeno.',
    '<strong>Onde isso aparece:</strong> em algoritmos de grafos, cujo custo se escreve em '
    + 'função de $|V|$ e $|E|$ — por exemplo $O(V + E)$ para busca em largura. Os dois '
    + 'parâmetros crescem de forma independente, e é essa definição que dá sentido à notação.'
  ] },

{ id: 'L1-33', n: 33, s: 2, t: 'aberta', d: 2, p: 'alta', g: ['theta', 'prova'],
  e: '<p>Usando a definição formal de $Θ$, prove que $6n^3 ≠ Θ(n^2)$.</p>',
  h: 'Para negar um "existe", suponha que exista e chegue a uma contradição.',
  sol: [
    '<strong>Prova por contradição.</strong> Suponha que $6n^3 = Θ(n^2)$. Pela definição, '
    + 'existiriam constantes $c_1, c_2, n_0 > 0$ tais que'
    + '$$c_1 n^2 ≤ 6n^3 ≤ c_2 n^2 \\t{ para todo } n ≥ n_0$$',
    '<strong>Foque no limite superior</strong> — é ele que falha. De $6n^3 ≤ c_2 n^2$, '
    + 'dividindo por $n^2 > 0$:'
    + '$$6n ≤ c_2 ⟺ n ≤ \\f{c_2}{6}$$',
    '<strong>A contradição.</strong> Essa desigualdade afirma que <em>todo</em> $n ≥ n_0$ '
    + 'satisfaz $n ≤ \\f{c_2}{6}$, ou seja, que os naturais a partir de $n_0$ são limitados '
    + 'superiormente por uma constante. Isso é falso: basta tomar '
    + '$n = max\\p{n_0, ⌊\\f{c_2}{6}⌋ + 1}$, que satisfaz $n ≥ n_0$ mas '
    + '$n > \\f{c_2}{6}$.',
    'Logo não existem tais $c_2$ e $n_0$, e portanto $6n^3 ≠ O(n^2)$. '
    + 'Como $Θ$ exige $O$, segue que $6n^3 ≠ Θ(n^2)$. ∎',
    '<em>Observe que o limite inferior <strong>vale</strong> — $6n^3 = Ω(n^2)$, com $c_1 = 6$ '
    + 'e $n_0 = 1$. É só o lado superior que quebra, e basta um dos dois falhar para negar o '
    + '$Θ$.</em>'
  ],
  r: 'De $6n^3 ≤ c_2n^2$ viria $n ≤ c_2/6$ para todo $n$ grande — absurdo. Logo não é $O(n^2)$, nem $Θ(n^2)$.' },

{ id: 'L1-34', n: 34, s: 2, t: 'aberta', d: 3, p: 'media', g: ['limite', 'prova'],
  e: '<p>Sejam $f$ e $g$ duas sequências de números reais positivos. Prove que, se '
   + '$lim_{n→∞}\\f{f(n)}{g(n)} ∈ ℝ$, então $f(n) = O(g(n))$.</p>',
  h: 'Use a definição épsilon-delta de limite, com um $ε$ conveniente.',
  sol: [
    '<strong>Hipótese.</strong> O limite existe e é um número real; chame-o de $L$. '
    + 'Como $f$ e $g$ são positivas, $L ≥ 0$.',
    '<strong>Definição de limite.</strong> Para todo $ε > 0$ existe $n_0$ tal que, para todo '
    + '$n ≥ n_0$,'
    + '$$| \\f{f(n)}{g(n)} − L | < ε$$',
    '<strong>Escolha $ε = 1$.</strong> Então existe $n_0$ tal que, para todo $n ≥ n_0$,'
    + '$$\\f{f(n)}{g(n)} < L + 1$$',
    '<strong>Conclusão.</strong> Como $g(n) > 0$, podemos multiplicar sem inverter o sinal:'
    + '$$f(n) < (L + 1)·g(n) \\t{ para todo } n ≥ n_0$$',
    'Tomando $c = L + 1$ (que é positivo, pois $L ≥ 0$) e esse $n_0$, a definição de $O$ está '
    + 'satisfeita. Logo $f(n) = O(g(n))$. ∎',
    '<strong>O que a recíproca não dá.</strong> $f = O(g)$ <em>não</em> implica que o limite '
    + 'exista — ele pode oscilar. Exemplo: $f(n) = n(2 + sen n)$ e $g(n) = n$; a razão '
    + 'oscila entre 1 e 3, mas $f = O(g)$ com $c = 3$.',
    '<strong>Os outros dois casos</strong> (que o exercício não pede, mas completam o quadro): '
    + 'se o limite é $0$, então $f = o(g)$; se é $+∞$, então $f = ω(g)$.'
  ],
  r: 'Tome $ε = 1$ na definição de limite: $f(n) < (L+1)g(n)$, logo $c = L+1$.' },

{ id: 'L1-35f', n: 35, sub: 'f', s: 2, t: 'codigo', d: 1, p: 'alta', g: ['laços', 'prova-Q2'],
  e: '<p>Determine a ordem de complexidade e justifique:</p>'
   + '<pre class="pseudo"><span class="ln"><span class="kw">char</span>* f(<span class="kw">int</span> n){</span>'
   + '<span class="ln">  <span class="kw">char</span> s[n];</span>'
   + '<span class="ln">  <span class="kw">char</span> x = \'x\';</span>'
   + '<span class="ln">  <span class="kw">for</span> (<span class="kw">int</span> i = 0; i &lt; n; i++)</span>'
   + '<span class="ln">    s[i] = x;</span>'
   + '<span class="ln">  <span class="kw">return</span> s;</span>'
   + '<span class="ln">}</span></pre>',
  sol: [
    '<strong>$Θ(n)$.</strong>',
    'O laço <code>for</code> executa exatamente $n$ vezes ($i$ de 0 a $n−1$), e o corpo é uma '
    + 'única atribuição, de custo $Θ(1)$. As declarações fora do laço custam $Θ(1)$.',
    '$$T(n) = Θ(1) + n·Θ(1) = Θ(n)$$',
    '<strong>Bônus — o bug.</strong> A função retorna <code>s</code>, que é um arranjo '
    + '<em>local</em> alocado na pilha. Após o retorno, esse espaço é inválido: é um '
    + '<em>dangling pointer</em>, comportamento indefinido em C. A complexidade não muda, mas '
    + 'vale notar que o código está incorreto. Também falta o terminador <code>\'\\0\'</code> '
    + 'para que <code>s</code> seja uma string válida.'
  ],
  r: '$Θ(n)$ — laço simples de $n$ iterações com corpo constante.' },

{ id: 'L1-35g', n: 35, sub: 'g', s: 2, t: 'codigo', d: 2, p: 'alta', g: ['laços', 'log', 'prova-Q2'],
  e: '<p>Determine a ordem de complexidade e justifique:</p>'
   + '<pre class="pseudo"><span class="ln"><span class="kw">char</span>* g(<span class="kw">int</span> n){</span>'
   + '<span class="ln">  <span class="kw">int</span> i = −1;</span>'
   + '<span class="ln">  <span class="kw">char</span> s[n];</span>'
   + '<span class="ln">  <span class="kw">char</span> x = \'x\';</span>'
   + '<span class="ln">  <span class="kw">while</span> (n != 0){</span>'
   + '<span class="ln">    <span class="kw">if</span> (n % 2 == 1)</span>'
   + '<span class="ln">      s[++i] = x;</span>'
   + '<span class="ln">    n = n/2;</span>'
   + '<span class="ln">  }</span>'
   + '<span class="ln">  <span class="kw">return</span> s;</span>'
   + '<span class="ln">}</span></pre>',
  h: 'O que a variável $n$ está fazendo, bit a bit?',
  sol: [
    '<strong>$Θ(log n)$.</strong>',
    '<strong>O que o laço faz.</strong> A cada iteração, <code>n = n/2</code> (divisão inteira) '
    + 'descarta o bit menos significativo de $n$. O laço termina quando $n$ chega a 0, ou seja, '
    + 'quando todos os bits foram consumidos.',
    '<strong>Número de iterações.</strong> Um inteiro $n$ tem $⌊lg n⌋ + 1$ bits, logo o laço '
    + 'executa exatamente $⌊lg n⌋ + 1$ vezes — <strong>independentemente</strong> de quantos '
    + 'bits sejam 1.',
    'Cada iteração custa $Θ(1)$ (um resto, uma comparação, uma divisão, no máximo uma '
    + 'atribuição). Portanto'
    + '$$T(n) = Θ(log n)$$',
    '<strong>O que a função calcula.</strong> Ao final, <code>i+1</code> é o número de bits 1 '
    + 'na representação binária de $n$ (o <em>peso de Hamming</em>), e <code>s</code> contém '
    + 'essa quantidade de caracteres <code>\'x\'</code>.',
    '<strong>Contraste com o item (f).</strong> Ambos têm um laço só, mas em (f) o índice '
    + '<em>soma</em> 1 por iteração — $Θ(n)$; aqui ele <em>divide</em> por 2 — $Θ(log n)$. '
    + 'É a diferença entre percorrer e dicotomizar, e é o padrão cobrado na questão 2 da prova.',
    '<em>(O mesmo bug de retornar arranjo local do item (f) está presente aqui.)</em>'
  ],
  r: '$Θ(log n)$ — o laço consome um bit de $n$ por iteração; são $⌊lg n⌋ + 1$ iterações.' },

/* ---- Itens 36 a 44: referências ao capítulo 3 do Cormen ------------------ */

{ id: 'L1-36', n: 36, s: 2, t: 'aberta', d: 2, p: 'alta', g: ['theta', 'prova', 'max'],
  ref: 'Cormen 3.1-1',
  e: '<p><em>(Cormen 3.1-1)</em> Sejam $f(n)$ e $g(n)$ funções assintoticamente não negativas. '
   + 'Usando a definição básica da notação $Θ$, prove que '
   + '$max(f(n), g(n)) = Θ(f(n) + g(n))$.</p>',
  h: 'Encaixe o máximo entre a soma e metade da soma.',
  sol: [
    'Sejam $M(n) = max(f(n), g(n))$ e $S(n) = f(n) + g(n)$. Por hipótese existe $n_0$ a partir '
    + 'do qual $f(n) ≥ 0$ e $g(n) ≥ 0$.',
    '<strong>Limite superior.</strong> O máximo é uma das duas parcelas, e a outra é '
    + 'não-negativa, logo'
    + '$$M(n) ≤ f(n) + g(n) = S(n)$$'
    + 'Tome $c_2 = 1$.',
    '<strong>Limite inferior.</strong> Cada parcela é no máximo o máximo, logo '
    + '$f(n) ≤ M(n)$ e $g(n) ≤ M(n)$. Somando:'
    + '$$S(n) = f(n) + g(n) ≤ 2M(n) ⟺ M(n) ≥ \\f{1}{2}S(n)$$'
    + 'Tome $c_1 = \\f{1}{2}$.',
    '<strong>Conclusão.</strong> Para todo $n ≥ n_0$,'
    + '$$\\f{1}{2}\\p{f(n)+g(n)} ≤ max(f(n),g(n)) ≤ 1·\\p{f(n)+g(n)}$$'
    + 'que é a definição de $Θ$ com $c_1 = 1/2$ e $c_2 = 1$. ∎',
    '<strong>Consequência prática.</strong> É a justificativa formal para "trechos em sequência '
    + 'custam o do mais caro": se um bloco é $f$ e o seguinte é $g$, o total $f+g$ está na '
    + 'mesma classe que $max(f,g)$. Ver o item 29(d), que é o erro complementar.'
  ],
  r: '$c_1 = 1/2$, $c_2 = 1$, pois $\\f{S}{2} ≤ M ≤ S$.' },

{ id: 'L1-37', n: 37, s: 2, t: 'aberta', d: 2, p: 'media', g: ['theta', 'prova'],
  ref: 'Cormen 3.1-2',
  e: '<p><em>(Cormen 3.1-2)</em> Mostre que, para quaisquer constantes reais $a$ e $b$, '
   + 'onde $b > 0$, $$(n + a)^b = Θ(n^b)$$</p>',
  sol: [
    'Este exercício é idêntico ao <strong>item 31</strong> desta lista, que o reproduz por '
    + 'extenso. Ver lá a demonstração completa.',
    '<strong>Resumo.</strong> Para $n ≥ 2|a|$ vale $\\f{n}{2} ≤ n + a ≤ \\f{3n}{2}$. '
    + 'Como $b > 0$, elevar a $b$ preserva as desigualdades:'
    + '$$2^{−b}·n^b ≤ (n+a)^b ≤ \\p{\\f{3}{2}}^b·n^b$$'
    + 'Tome $c_1 = 2^{−b}$, $c_2 = (3/2)^b$ e $n_0 = 2|a|$. ∎'
  ],
  r: 'Igual ao item 31: $c_1 = 2^{−b}$, $c_2 = (3/2)^b$, $n_0 = 2|a|$.' },

{ id: 'L1-38', n: 38, s: 2, t: 'aberta', d: 1, p: 'alta', g: ['conceitos', 'O'],
  ref: 'Cormen 3.1-3',
  e: '<p><em>(Cormen 3.1-3)</em> Explique por que a declaração <em>"O tempo de execução do '
   + 'algoritmo A é no mínimo $O(n^2)$"</em> não tem sentido.</p>',
  sol: [
    '<strong>Porque $O$ já é um limite superior, e "no mínimo um limite superior" não '
    + 'restringe nada.</strong>',
    '<strong>Detalhando.</strong> Dizer $T(n) = O(n^2)$ significa "$T(n)$ cresce no <em>máximo</em> '
    + 'como $n^2$". Antepor "no mínimo" cria a afirmação: "$T(n)$ cresce no mínimo no máximo '
    + 'como $n^2$" — que não delimita nada.',
    '<strong>O argumento formal.</strong> Toda função é $O$ de algo suficientemente grande: '
    + 'qualquer $T(n)$ é $O(n^{1000})$, ou $O(2^n)$, ou $O(n!)$. Logo "o tempo é no mínimo '
    + '$O(n^2)$" é satisfeito trivialmente por <em>qualquer</em> algoritmo, e portanto '
    + 'não carrega informação.',
    '<strong>O que se queria dizer.</strong> Provavelmente $$T(n) = Ω(n^2)$$ — "o tempo de '
    + 'execução é no mínimo quadrático", que é uma afirmação com conteúdo: nenhuma entrada faz '
    + 'o algoritmo rodar em menos que $Ω(n^2)$.',
    '<strong>Na prova:</strong> é um dos erros de formato que mais custa ponto. '
    + 'O cabeçalho de 2026.1 pede respostas em $Θ$ justamente para evitar essa ambiguidade.'
  ],
  r: '$O$ já é limite superior; "no mínimo $O$" é vazio. O correto seria $Ω(n^2)$.' },

{ id: 'L1-39', n: 39, s: 2, t: 'vf', d: 1, p: 'alta', g: ['vf', 'exponencial'],
  ref: 'Cormen 3.1-4',
  e: '<p><em>(Cormen 3.1-4)</em> É verdade que $2^{n+1} = O(2^n)$? '
   + 'É verdade que $2^{2n} = O(2^n)$?</p>',
  sol: [
    '<strong>$2^{n+1} = O(2^n)$: SIM.</strong> $2^{n+1} = 2·2^n$, e o fator 2 é constante. '
    + 'Tome $c = 2$ e $n_0 = 1$: vale $2^{n+1} ≤ 2·2^n$ para todo $n$. ✓',
    '<strong>$2^{2n} = O(2^n)$: NÃO.</strong> $2^{2n} = (2^n)^2 = 4^n$. Suponha que existissem '
    + '$c, n_0$ com $4^n ≤ c·2^n$; dividindo por $2^n$ viria $2^n ≤ c$, impossível para '
    + '$n$ grande. ✗',
    '<strong>A distinção.</strong> No expoente, <em>somar</em> uma constante equivale a '
    + '<em>multiplicar</em> por uma constante — absorvível. <em>Multiplicar</em> o expoente '
    + 'por uma constante equivale a <em>elevar</em> a uma potência — não absorvível.',
    '<em>São os itens 24(i), 26(c), 26(d) e 29(a) desta mesma lista — o professor insiste '
    + 'nisto porque é erro frequente.</em>'
  ],
  r: 'Sim para $2^{n+1}$ ($c=2$); não para $2^{2n} = 4^n$.' },

{ id: 'L1-40', n: 40, s: 2, t: 'aberta', d: 2, p: 'alta', g: ['theta', 'prova'],
  ref: 'Cormen 3.1-5 (Teorema 3.1)',
  e: '<p><em>(Cormen 3.1-5)</em> Demonstre o Teorema 3.1:</p>'
   + '<p style="padding-left:1rem">Para quaisquer duas funções $f(n)$ e $g(n)$, temos '
   + '$f(n) = Θ(g(n))$ <strong>se e somente se</strong> $f(n) = O(g(n))$ e '
   + '$f(n) = Ω(g(n))$.</p>',
  sol: [
    '<strong>(⇒) Se $f = Θ(g)$, então $f = O(g)$ e $f = Ω(g)$.</strong>',
    'Por hipótese existem $c_1, c_2, n_0 > 0$ tais que '
    + '$c_1 g(n) ≤ f(n) ≤ c_2 g(n)$ para todo $n ≥ n_0$.',
    'A desigualdade da direita, $f(n) ≤ c_2 g(n)$ para $n ≥ n_0$, é exatamente a definição de '
    + '$f = O(g)$ com constante $c_2$. A da esquerda, $f(n) ≥ c_1 g(n)$, é a definição de '
    + '$f = Ω(g)$ com constante $c_1$. Ambos os mesmos $n_0$. ✓',
    '<strong>(⇐) Se $f = O(g)$ e $f = Ω(g)$, então $f = Θ(g)$.</strong>',
    'De $f = O(g)$: existem $c_2, n_2 > 0$ com $f(n) ≤ c_2 g(n)$ para $n ≥ n_2$.<br>'
    + 'De $f = Ω(g)$: existem $c_1, n_1 > 0$ com $f(n) ≥ c_1 g(n)$ para $n ≥ n_1$.',
    'Tome $n_0 = max(n_1, n_2)$. Para todo $n ≥ n_0$ as duas valem simultaneamente:'
    + '$$c_1 g(n) ≤ f(n) ≤ c_2 g(n)$$'
    + 'que é a definição de $f = Θ(g)$ com essas constantes. ✓ ∎',
    '<strong>Valor prático.</strong> É o teorema que autoriza a estratégia padrão de prova: '
    + 'para demonstrar um $Θ$, faça duas demonstrações de desigualdade única, uma para cada '
    + 'lado. Quase todos os exercícios de $Θ$ desta lista usam isso.'
  ] },

{ id: 'L1-41', n: 41, s: 2, t: 'aberta', d: 3, p: 'baixa', g: ['theta', 'prova', 'casos'],
  ref: 'Cormen 3.1-6',
  e: '<p><em>(Cormen 3.1-6)</em> Prove que o tempo de execução de um algoritmo é $Θ(g(n))$ '
   + '<strong>se e somente se</strong> seu tempo de execução no pior caso é $O(g(n))$ e seu '
   + 'tempo de execução no melhor caso é $Ω(g(n))$.</p>',
  h: 'Defina com precisão $T_{pior}$, $T_{melhor}$ e "o tempo de execução é $Θ(g)$".',
  sol: [
    '<strong>Notação.</strong> Para cada tamanho $n$, seja $E_n$ o conjunto de '
    + 'entradas de tamanho $n$, e $T(I)$ o tempo sobre a entrada $I$. Defina'
    + '$$T_{pior}(n) = max_{I ∈ E_n} T(I)$$'
    + '$$T_{melhor}(n) = min_{I ∈ E_n} T(I)$$'
    + 'Dizer que <em>o tempo de execução é $Θ(g(n))$</em> significa: existem '
    + '$c_1, c_2, n_0 > 0$ tais que, para <strong>toda</strong> entrada $I$ de tamanho '
    + '$n ≥ n_0$, vale $c_1 g(n) ≤ T(I) ≤ c_2 g(n)$.',
    '<strong>(⇒)</strong> Suponha o tempo $Θ(g(n))$. Como $T(I) ≤ c_2 g(n)$ para toda entrada, '
    + 'em particular o máximo satisfaz $T_{pior}(n) ≤ c_2 g(n)$, logo '
    + '$T_{pior} = O(g)$. Como $T(I) ≥ c_1 g(n)$ para toda entrada, o mínimo satisfaz '
    + '$T_{melhor}(n) ≥ c_1 g(n)$, logo $T_{melhor} = Ω(g)$. ✓',
    '<strong>(⇐)</strong> Suponha $T_{pior} = O(g)$ e $T_{melhor} = Ω(g)$: existem '
    + '$c_2, n_2$ com $T_{pior}(n) ≤ c_2 g(n)$, e $c_1, n_1$ com '
    + '$T_{melhor}(n) ≥ c_1 g(n)$.',
    'Para $n ≥ max(n_1,n_2)$ e <em>qualquer</em> entrada $I$ de tamanho $n$, por definição de '
    + 'máximo e mínimo:'
    + '$$c_1 g(n) ≤ T_{melhor}(n) ≤ T(I) ≤ T_{pior}(n) ≤ c_2 g(n)$$'
    + 'logo o tempo de execução é $Θ(g(n))$. ✓ ∎',
    '<strong>Leitura.</strong> O tempo de um algoritmo só é $Θ$ de uma função quando melhor e '
    + 'pior caso estão na <em>mesma</em> classe. Por isso não se diz que a ordenação por '
    + 'inserção "é $Θ(n^2)$" sem qualificar: seu melhor caso é $Θ(n)$. Já o Merge Sort é '
    + '$Θ(n log n)$ sem ressalva, porque ambos os extremos coincidem.'
  ] },

{ id: 'L1-42', n: 42, s: 2, t: 'aberta', d: 2, p: 'baixa', g: ['prova', 'o-pequeno'],
  ref: 'Cormen 3.1-7',
  e: '<p><em>(Cormen 3.1-7)</em> Prove que $o(g(n)) ∩ ω(g(n))$ é o conjunto vazio.</p>',
  h: 'Escreva as definições de $o$ e $ω$ em termos de "para toda constante" e confronte-as.',
  sol: [
    '<strong>As definições.</strong> Note que ambas quantificam sobre <em>toda</em> constante, '
    + 'não sobre <em>alguma</em>:',
    '$f ∈ o(g)$: para <strong>toda</strong> constante $c > 0$ existe $n_c > 0$ tal que '
    + '$0 ≤ f(n) < c·g(n)$ para todo $n ≥ n_c$.',
    '$f ∈ ω(g)$: para <strong>toda</strong> constante $c > 0$ existe $n\'_c > 0$ tal que '
    + '$0 ≤ c·g(n) < f(n)$ para todo $n ≥ n\'_c$.',
    '<strong>Prova por contradição.</strong> Suponha que exista $f ∈ o(g) ∩ ω(g)$.',
    'Aplique ambas as definições com a mesma constante, digamos $c = 1$. '
    + 'De $f ∈ o(g)$ obtemos $n_1$ com $f(n) < g(n)$ para $n ≥ n_1$. '
    + 'De $f ∈ ω(g)$ obtemos $n_2$ com $g(n) < f(n)$ para $n ≥ n_2$.',
    'Tome $n = max(n_1, n_2)$. Então valem simultaneamente $f(n) < g(n)$ e $g(n) < f(n)$, '
    + 'de onde $f(n) < f(n)$ — <strong>absurdo</strong>.',
    'Logo não existe tal $f$, e $o(g) ∩ ω(g) = ∅$. ∎',
    '<strong>Intuição.</strong> $o$ é "estritamente menor" e $ω$ é "estritamente maior". '
    + 'Uma função não pode ser as duas coisas em relação à mesma $g$, assim como um número '
    + 'não pode ser $< x$ e $> x$ ao mesmo tempo.'
  ],
  r: 'Com $c = 1$ nas duas definições chega-se a $f(n) < g(n)$ e $g(n) < f(n)$ — absurdo.' },

{ id: 'L1-43', n: 43, s: 2, t: 'aberta', d: 2, p: 'baixa', g: ['definições', 'dois-parâmetros'],
  ref: 'Cormen 3.1-8',
  e: '<p><em>(Cormen 3.1-8)</em> Podemos estender nossa notação ao caso de dois parâmetros '
   + '$n$ e $m$ que podem tender a infinito independentemente, a taxas distintas. '
   + 'Dada $g(n,m)$, denotamos por $O(g(n,m))$ o conjunto</p>'
   + '<p style="padding-left:1rem">$O(g(n,m)) = {f(n,m)$ : existem constantes positivas '
   + '$c$, $n_0$ e $m_0$ tais que $0 ≤ f(n,m) ≤ c·g(n,m)$ para todo $n ≥ n_0$ ou '
   + '$m ≥ m_0}$</p>'
   + '<p>Dê as definições correspondentes para $Ω(g(n,m))$ e $Θ(g(n,m))$.</p>',
  sol: [
    'Este exercício é idêntico ao <strong>item 32</strong> desta lista. Ver lá a resposta '
    + 'completa e a discussão sobre o quantificador "ou".',
    '<strong>Resumo.</strong><br>'
    + '$Ω(g(n,m))$: existem $c, n_0, m_0 > 0$ tais que $0 ≤ c·g(n,m) ≤ f(n,m)$ para todo '
    + '$n ≥ n_0$ ou $m ≥ m_0$.<br>'
    + '$Θ(g(n,m))$: existem $c_1, c_2, n_0, m_0 > 0$ tais que '
    + '$0 ≤ c_1 g(n,m) ≤ f(n,m) ≤ c_2 g(n,m)$ para todo $n ≥ n_0$ ou $m ≥ m_0$.'
  ] },

{ id: 'L1-44', n: 44, s: 2, t: 'aberta', d: 3, p: 'media', g: ['polinômio', 'prova', 'todas-notações'],
  ref: 'Cormen problema 3-1',
  e: '<p><em>(Cormen, problema 3-1 — Comportamento assintótico de polinômios)</em></p>'
   + '<p>Seja $$p(n) = \\S{i=0}{d} a_i n^i$$ onde $a_d > 0$, um polinômio de grau $d$ em $n$, '
   + 'e seja $k$ uma constante. Use as definições das notações assintóticas para provar as '
   + 'propriedades a seguir.</p>'
   + '<p>a) Se $k ≥ d$, então $p(n) = O(n^k)$.<br>'
   + 'b) Se $k ≤ d$, então $p(n) = Ω(n^k)$.<br>'
   + 'c) Se $k = d$, então $p(n) = Θ(n^k)$.<br>'
   + 'd) Se $k > d$, então $p(n) = o(n^k)$.<br>'
   + 'e) Se $k < d$, então $p(n) = ω(n^k)$.</p>',
  h: 'Comece provando o lema $p(n) = Θ(n^d)$; os cinco itens saem dele.',
  sol: [
    '<strong>Lema central: $p(n) = Θ(n^d)$.</strong> Prove isto primeiro e os cinco itens '
    + 'seguem quase de graça.',
    '<em>Superior:</em> para $n ≥ 1$ vale $n^i ≤ n^d$ para todo $i ≤ d$, logo'
    + '$$p(n) = \\S{i=0}{d} a_i n^i ≤ \\S{i=0}{d} |a_i| n^d = \\p{\\S{i=0}{d}|a_i|} n^d$$'
    + 'Tome $A = \\S{i=0}{d}|a_i|$, uma constante.',
    '<em>Inferior:</em> escreva $p(n) = a_d n^d + \\S{i=0}{d−1} a_i n^i$. Para $i ≤ d−1$ e '
    + '$n ≥ 1$, $|a_i n^i| ≤ |a_i| n^{d−1}$, logo o resto é limitado em módulo por '
    + '$B·n^{d−1}$, com $B = \\S{i=0}{d−1}|a_i|$. Assim'
    + '$$p(n) ≥ a_d n^d − B n^{d−1} = n^d\\p{a_d − \\f{B}{n}}$$'
    + 'Para $n ≥ \\f{2B}{a_d}$, o parêntese é $≥ \\f{a_d}{2}$, logo '
    + '$p(n) ≥ \\f{a_d}{2}n^d$.',
    'Com $c_1 = \\f{a_d}{2}$, $c_2 = A$ e $n_0 = max\\p{1, \\f{2B}{a_d}}$, temos '
    + '$p(n) = Θ(n^d)$. ∎',
    '<strong>(a) $k ≥ d ⇒ p(n) = O(n^k)$.</strong> Pelo lema, $p(n) ≤ c_2 n^d$. '
    + 'Como $k ≥ d$ e $n ≥ 1$, vale $n^d ≤ n^k$. Logo $p(n) ≤ c_2 n^k$. ✓',
    '<strong>(b) $k ≤ d ⇒ p(n) = Ω(n^k)$.</strong> Pelo lema, $p(n) ≥ c_1 n^d$. '
    + 'Como $k ≤ d$ e $n ≥ 1$, vale $n^d ≥ n^k$. Logo $p(n) ≥ c_1 n^k$. ✓',
    '<strong>(c) $k = d ⇒ p(n) = Θ(n^k)$.</strong> É o próprio lema, ou a combinação de '
    + '(a) e (b) pelo Teorema 3.1 (item 40). ✓',
    '<strong>(d) $k > d ⇒ p(n) = o(n^k)$.</strong> Precisamos que, para <em>toda</em> constante '
    + '$c > 0$, valha $p(n) < c·n^k$ para $n$ grande. Pelo lema $p(n) ≤ c_2 n^d$, logo basta '
    + '$c_2 n^d < c n^k$, isto é, $n^{k−d} > \\f{c_2}{c}$. Como $k − d > 0$, o lado esquerdo '
    + 'tende a $∞$, e a desigualdade vale para todo $n$ maior que '
    + '$\\p{\\f{c_2}{c}}^{1/(k−d)}$. ✓',
    '<strong>(e) $k < d ⇒ p(n) = ω(n^k)$.</strong> Simetricamente: para toda $c > 0$, '
    + 'pelo lema $p(n) ≥ c_1 n^d$, e basta $c_1 n^d > c n^k$, ou seja '
    + '$n^{d−k} > \\f{c}{c_1}$. Como $d − k > 0$, vale para $n$ grande. ✓ ∎',
    '<strong>Resumo em uma frase:</strong> um polinômio de grau $d$ é $Θ$ de $n^d$, e a '
    + 'comparação com $n^k$ se decide inteiramente comparando $k$ com $d$.'
  ] },

/* ---- Itens 45 a 47: complexidade de trechos de código ------------------- */

{ id: 'L1-45a', n: 45, sub: 'a', s: 2, t: 'codigo', d: 1, p: 'alta', g: ['laços', 'prova-Q2'],
  e: '<p>Apresente a complexidade em função de $n$, justificando. '
   + '<em>(Este item vem resolvido na lista, como modelo.)</em></p>'
   + '<pre class="pseudo"><span class="ln">sum = 0;                         <span class="cm">// 1 operação</span></span>'
   + '<span class="ln"><span class="kw">for</span> (<span class="kw">int</span> i = 0; i &lt; n*n; i++)   <span class="cm">// N*N operações</span></span>'
   + '<span class="ln">  sum++;                         <span class="cm">// 1 operação</span></span></pre>',
  sol: [
    '<strong>$Θ(n^2)$.</strong> (A lista escreve $O(n^2)$; como o laço executa sempre '
    + 'exatamente $n^2$ vezes, o limite justo é $Θ$.)',
    'O laço vai de $i = 0$ a $n^2 − 1$, logo executa $n^2$ vezes, e o corpo custa $Θ(1)$. '
    + 'Somando a inicialização:'
    + '$$T(n) = 1 + 1·n^2 = Θ(n^2)$$',
    '<em>Este item serve de modelo para o formato de resposta esperado nos itens (b) a (d): '
    + 'conte as iterações de cada laço, multiplique pelo custo do corpo, some.</em>'
  ],
  r: '$Θ(n^2)$.' },

{ id: 'L1-45b', n: 45, sub: 'b', s: 2, t: 'codigo', d: 1, p: 'alta', g: ['laços', 'prova-Q2'],
  e: '<p>Apresente a complexidade em função de $n$, justificando.</p>'
   + '<pre class="pseudo"><span class="ln">sum = 0;</span>'
   + '<span class="ln"><span class="kw">for</span> (<span class="kw">int</span> i = 0; i &lt; n; i++)</span>'
   + '<span class="ln">  <span class="kw">for</span> (<span class="kw">int</span> j = 0; j &lt; n*n; j++)</span>'
   + '<span class="ln">    sum++;</span></pre>',
  sol: [
    '<strong>$Θ(n^3)$.</strong>',
    'Laços aninhados <strong>multiplicam</strong>. O laço externo executa $n$ vezes; '
    + 'o interno executa $n^2$ vezes, <em>independentemente</em> de $i$.',
    '$$T(n) = \\S{i=0}{n−1}\\S{j=0}{n^2−1} Θ(1) = \\S{i=0}{n−1} n^2 = n·n^2 = Θ(n^3)$$'
  ],
  r: '$Θ(n^3)$ — $n$ vezes $n^2$.' },

{ id: 'L1-45c', n: 45, sub: 'c', s: 2, t: 'codigo', d: 2, p: 'alta', g: ['laços', 'log', 'prova-Q2'],
  e: '<p>Apresente a complexidade em função de $n$, justificando.</p>'
   + '<pre class="pseudo"><span class="ln">sum = 0;</span>'
   + '<span class="ln"><span class="kw">for</span> (<span class="kw">int</span> i = 1; i &lt; n; i*=2)</span>'
   + '<span class="ln">  sum++;</span></pre>',
  h: 'O índice não soma — ele dobra.',
  sol: [
    '<strong>$Θ(log n)$.</strong>',
    'O índice assume os valores $1, 2, 4, 8, …, 2^k$, e o laço para quando $2^k ≥ n$. '
    + 'Resolvendo: $k ≥ log_2 n$, logo o número de iterações é $⌈log_2 n⌉$.',
    '$$T(n) = Θ(log n)$$',
    '<strong>O padrão a reconhecer.</strong> Índice que <em>multiplica</em> por uma constante '
    + '$b > 1$ a cada passo → $Θ(log_b n)$ iterações. Índice que <em>soma</em> uma constante → '
    + '$Θ(n)$ iterações.',
    '<em>É exatamente o laço mais interno da questão 2 da prova de 2026.1, onde '
    + '<code>k ← k·3</code> dá $Θ(log_3 n)$.</em>'
  ],
  r: '$Θ(log n)$ — o índice dobra a cada iteração.' },

{ id: 'L1-45d', n: 45, sub: 'd', s: 2, t: 'codigo', d: 2, p: 'alta', g: ['laços', 'log', 'prova-Q2'],
  e: '<p>Apresente a complexidade em função de $n$, justificando.</p>'
   + '<pre class="pseudo"><span class="ln">sum = 0;</span>'
   + '<span class="ln"><span class="kw">for</span> (<span class="kw">int</span> i = 0; i &lt; n; i++)</span>'
   + '<span class="ln">  <span class="kw">for</span> (<span class="kw">int</span> j = n; j &gt; 0; j/=2)</span>'
   + '<span class="ln">    sum++;</span></pre>',
  h: 'O laço interno depende de $i$?',
  sol: [
    '<strong>$Θ(n log n)$.</strong>',
    '<strong>Laço interno.</strong> $j$ começa em $n$ e é dividido por 2 até chegar a 0 '
    + '(divisão inteira), executando $⌊log_2 n⌋ + 1 = Θ(log n)$ vezes. '
    + 'Crucialmente, isso <strong>não depende de $i$</strong>.',
    '<strong>Laço externo.</strong> Executa $n$ vezes.',
    'Como o custo interno é constante em relação a $i$, ele sai do somatório:'
    + '$$T(n) = \\S{i=0}{n−1} Θ(log n) = Θ(log n)·\\S{i=0}{n−1} 1 = Θ(n log n)$$',
    '<strong>Este é precisamente o raciocínio da questão 2 da prova</strong>, com um nível de '
    + 'aninhamento a menos. Lá o laço do meio depende de $i$ (vai de 1 a $i$), o que acrescenta '
    + 'a soma aritmética $\\f{n(n+1)}{2}$ e leva a $Θ(n^2 log n)$.'
  ],
  r: '$Θ(n log n)$ — o interno é $Θ(log n)$ e independe de $i$.' },

{ id: 'L1-46', n: 46, s: 2, t: 'codigo', d: 3, p: 'media', g: ['laços', 'particiona', 'somatório'],
  e: '<p>Qual a complexidade de tempo de execução dos algoritmos abaixo, em notação $Θ$?</p>'
   + '<pre class="pseudo"><span class="hd">(a) particiona</span>'
   + '<span class="ln"><span class="cm">// Recebe um vetor de inteiros com b−a+1 elementos</span></span>'
   + '<span class="ln"><span class="cm">// Devolve o indice de um elemento particular apos processar o vetor</span></span>'
   + '<span class="ln"><span class="kw">int</span> part(<span class="kw">int</span> p, <span class="kw">int</span> a, <span class="kw">int</span> b) {</span>'
   + '<span class="ln">  <span class="kw">int</span> v = p[a], l = a; r = b, w;</span>'
   + '<span class="ln">  <span class="kw">while</span> (l &lt; r) {</span>'
   + '<span class="ln">    <span class="kw">while</span>(p[l] &lt;= v &amp;&amp; l &lt;= b) l++;</span>'
   + '<span class="ln">    <span class="kw">while</span>(p[r] &gt;  v &amp;&amp; r &gt;= a) r−−;</span>'
   + '<span class="ln">    <span class="kw">if</span> (l &lt; r) { w = p[l]; p[l] = p[r]; p[r] = w; }</span>'
   + '<span class="ln">  }</span>'
   + '<span class="ln">  p[a] = p[r];  p[r] = v;</span>'
   + '<span class="ln">  <span class="kw">return</span>(r);</span>'
   + '<span class="ln">}</span></pre>'
   + '<pre class="pseudo"><span class="hd">(b) f, que chama a função anterior</span>'
   + '<span class="ln"><span class="cm">// Recebe um vetor de inteiros p com n elementos</span></span>'
   + '<span class="ln"><span class="kw">int</span> f(<span class="kw">int</span> p, <span class="kw">int</span> n) {</span>'
   + '<span class="ln">  <span class="kw">int</span> a = (n+1)/2, b = (n+a)/2, i = 0;</span>'
   + '<span class="ln">  <span class="kw">for</span> (; a &lt;= b; a++)</span>'
   + '<span class="ln">    i += part(p,a,b);</span>'
   + '<span class="ln">  <span class="kw">return</span> (i);</span>'
   + '<span class="ln">}</span></pre>',
  h: 'Em (b), o intervalo passado a <code>part</code> encolhe a cada iteração. Some os custos.',
  sol: [
    '<strong>(a) <code>part</code> é $Θ(m)$, onde $m = b − a + 1$.</strong>',
    'É o particionamento de Hoare do slide 03. Os dois laços internos não recomeçam: '
    + '<code>l</code> só cresce, <code>r</code> só decresce, e o laço externo termina quando '
    + 'se cruzam. Portanto, somados sobre toda a execução, os índices percorrem o intervalo '
    + 'uma única vez — cada posição é visitada $Θ(1)$ vez.',
    '$$T_{part}(m) = Θ(m) = Θ(b − a + 1)$$',
    '<strong>(b) <code>f</code> é $Θ(n^2)$.</strong>',
    '<em>Os limites.</em> Sejam $a_0 = \\f{n+1}{2}$ e $b = \\f{n + a_0}{2} = \\f{3n+1}{4}$. '
    + 'Note que $b$ é calculado <strong>uma vez</strong>, antes do laço, e não muda; só '
    + '<code>a</code> é incrementado.',
    '<em>Número de iterações.</em> $a$ vai de $a_0$ até $b$, ou seja'
    + '$$b − a_0 + 1 = \\f{3n+1}{4} − \\f{n+1}{2} + 1 = \\f{n−1}{4} + 1 = Θ(n)$$',
    '<em>Custo de cada iteração.</em> Na iteração em que o índice vale $a$, a chamada '
    + '<code>part(p,a,b)</code> custa $Θ(b − a + 1)$. Como $a$ cresce de $a_0$ até $b$, '
    + 'esse custo decresce de $Θ(n)$ até $Θ(1)$.',
    '<em>Somando.</em> Substituindo $k = b − a + 1$, que varia de $b − a_0 + 1 ≈ \\f{n}{4}$ '
    + 'até 1:'
    + '$$T_f(n) = \\S{a=a_0}{b} Θ(b − a + 1) = \\S{k=1}{n/4} Θ(k) '
    + '= Θ\\p{\\f{(n/4)(n/4 + 1)}{2}} = Θ(n^2)$$',
    '<strong>Resposta: $Θ(n^2)$.</strong> O padrão — um laço de $Θ(n)$ iterações cujo corpo '
    + 'custa linearmente e decrescente — é a mesma soma aritmética que aparece no pior caso do '
    + 'Quick-sort.'
  ],
  r: '(a) $Θ(b−a+1)$. &nbsp; (b) $Θ(n^2)$, pela soma aritmética dos custos decrescentes.' },

{ id: 'L1-47a', n: 47, sub: 'a', s: 2, t: 'codigo', d: 2, p: 'alta', g: ['laços', 'log', 'bits'],
  ref: 'Aho & Ullman (1994), cap. 3',
  e: '<p>Forneça a complexidade do algoritmo:</p>'
   + '<pre class="pseudo"><span class="ln"><span class="kw">int</span> PowersOfTwo(<span class="kw">int</span> n) {</span>'
   + '<span class="ln">  <span class="kw">int</span> i = 0;</span>'
   + '<span class="ln">  <span class="kw">while</span> (n%2 == 0) {</span>'
   + '<span class="ln">    n = n/2;</span>'
   + '<span class="ln">    i++;</span>'
   + '<span class="ln">  }</span>'
   + '<span class="ln">  <span class="kw">return</span> i;</span>'
   + '<span class="ln">}</span></pre>',
  h: 'O laço para no primeiro bit 1. Quando ele roda o máximo de vezes?',
  sol: [
    '<strong>O que a função calcula.</strong> O expoente da maior potência de 2 que divide $n$ '
    + '— isto é, o número de zeros à direita na representação binária de $n$.',
    '<strong>Melhor caso: $Θ(1)$.</strong> Se $n$ é ímpar, a condição falha de imediato e o '
    + 'laço não executa nenhuma vez.',
    '<strong>Pior caso: $Θ(log n)$.</strong> Ocorre quando $n = 2^k$ é uma potência de 2: '
    + 'o laço divide por 2 repetidamente até $n = 1$, executando $k = log_2 n$ vezes.',
    '<em>(Tecnicamente, com $n$ potência de 2 o laço para quando $n$ chega a 1, que é ímpar.)</em>',
    '$$T(n) = O(log n), \\t{ com pior caso } Θ(log n)$$',
    '<strong>Ressalva sobre o tamanho da entrada.</strong> Se medirmos a entrada pelo número de '
    + 'bits $m = ⌊lg n⌋ + 1$, então $log n = Θ(m)$ e o algoritmo é <strong>linear</strong> no '
    + 'tamanho real da entrada — genuinamente polinomial. Compare com o item (b), onde essa '
    + 'mesma distinção muda a conclusão.'
  ],
  r: '$Θ(log n)$ no pior caso ($n$ potência de 2); $Θ(1)$ no melhor ($n$ ímpar).' },

{ id: 'L1-47b', n: 47, sub: 'b', s: 2, t: 'codigo', d: 3, p: 'media', g: ['laços', 'polinomial', 'bits'],
  ref: 'Aho & Ullman (1994), cap. 3',
  e: '<p>Forneça a complexidade do algoritmo:</p>'
   + '<pre class="pseudo"><span class="ln"><span class="kw">int</span> prime(<span class="kw">int</span> n) {</span>'
   + '<span class="ln">  <span class="kw">int</span> i = 2;</span>'
   + '<span class="ln">  <span class="kw">while</span> (i*i &lt;= n)</span>'
   + '<span class="ln">    <span class="kw">if</span> (n%i == 0) <span class="kw">return</span> FALSE;</span>'
   + '<span class="ln">    <span class="kw">else</span> i++;</span>'
   + '<span class="ln">  <span class="kw">return</span> TRUE;</span>'
   + '<span class="ln">}</span></pre>',
  h: 'Responda duas vezes: em função de $n$, e em função do número de bits de $n$.',
  sol: [
    '<strong>Em função do valor $n$: $Θ(\\r{n})$ no pior caso.</strong>',
    'A condição do laço é $i^2 ≤ n$, ou seja $i ≤ \\r{n}$. O índice começa em 2 e cresce de 1 '
    + 'em 1, logo o laço executa no máximo $\\r{n} − 1$ vezes, cada uma com custo $Θ(1)$.',
    'O pior caso ocorre quando $n$ é <strong>primo</strong> (ou o quadrado de um primo): '
    + 'nenhum divisor é encontrado e o laço vai até o fim. O melhor caso é $Θ(1)$, quando $n$ '
    + 'é par.',
    '$$T(n) = Θ(\\r{n}) \\t{ no pior caso}$$',
    '<strong>Em função do tamanho da entrada: exponencial.</strong> Esta é a parte que importa.',
    'A entrada é o <em>número</em> $n$, cuja representação usa $m = ⌊lg n⌋ + 1$ bits. '
    + 'Como $n ≈ 2^m$,'
    + '$$T = Θ(\\r{n}) = Θ\\p{\\r{2^m}} = Θ\\p{2^{m/2}}$$',
    '<strong>Conclusão: o algoritmo é exponencial no tamanho da entrada</strong> — não é '
    + 'polinomial, apesar do $\\r{n}$ parecer modesto. Dobrar o número de dígitos de $n$ '
    + 'eleva o tempo ao quadrado.',
    '<strong>Por que isso importa.</strong> É exatamente a distinção do item 5 ("o que é um '
    + 'algoritmo polinomial?"). Testar primalidade em tempo genuinamente polinomial foi um '
    + 'problema aberto até o algoritmo AKS (2002) — e é a razão pela qual a criptografia RSA '
    + 'funciona com números de centenas de dígitos.'
  ],
  r: '$Θ(\\r{n})$ em função do valor; mas $Θ(2^{m/2})$ em função dos $m$ bits — exponencial.' },

/* ═══════════════════════════════ SEÇÃO 3 — Divisão e conquista ═══════════ */

{ id: 'L1-48', n: 48, s: 3, t: 'projeto', d: 2, p: 'media', g: ['projeto', 'ordenação'],
  e: '<p>Separe um bando de $2n$ Orcs em dois times com $n$ Orcs cada. Cada Orc tem um número '
   + 'marcado nas costas que indica o quão habilidoso ele é em combate. Divida o grupo da forma '
   + '<strong>mais injusta possível</strong>, para que o combate entre os dois times seja '
   + 'extremamente sanguinário. Justifique sua escolha de divisão e explique como esta tarefa '
   + 'pode ser feita utilizando divisão e conquista em tempo $O(n log n)$.</p>',
  h: '"Mais injusta" precisa ser definido antes de resolver. Que quantidade você quer maximizar?',
  sol: [
    '<strong>Passo 1 — formalizar "mais injusta".</strong> A leitura natural é '
    + '<em>maximizar a diferença entre a soma das habilidades dos dois times</em>. '
    + 'Como a soma total $S$ é fixa, maximizar $|S_A − S_B|$ equivale a colocar os '
    + '$n$ Orcs <strong>mais habilidosos</strong> num time e os $n$ menos habilidosos no outro.',
    '<strong>Passo 2 — o algoritmo.</strong> Ordene os $2n$ Orcs por habilidade usando '
    + '<strong>Merge Sort</strong> (divisão e conquista); atribua a primeira metade ordenada '
    + 'ao time fraco e a segunda ao time forte.',
    '<strong>Passo 3 — a complexidade.</strong> O Merge Sort sobre $2n$ elementos tem '
    + 'recorrência'
    + '$$T(m) = 2T(m/2) + Θ(m) ⇒ T(m) = Θ(m log m)$$'
    + 'Com $m = 2n$: $Θ(2n·log(2n)) = Θ(n log n)$. A divisão em duas metades depois é $O(n)$, '
    + 'que não altera o total. ✓',
    '<strong>Passo 4 — justificar que é ótimo.</strong> Suponha uma divisão em que algum Orc '
    + '$x$ do time forte seja menos habilidoso que algum Orc $y$ do time fraco. '
    + 'Trocá-los aumenta $S_A − S_B$ em $2(y − x) > 0$, logo a divisão não era ótima. '
    + 'Portanto, na divisão ótima, todo membro do time forte é ao menos tão habilidoso quanto '
    + 'todo membro do fraco — que é exatamente o corte pela mediana. ∎',
    '<strong>Observação — dá para fazer em $O(n)$.</strong> Não é preciso ordenar tudo: basta '
    + 'encontrar a <em>mediana</em> dos $2n$ valores e particionar em torno dela. '
    + 'Isso é o algoritmo do k-ésimo menor do slide 03, que é $Θ(n)$ no caso médio '
    + '(e $Θ(n)$ no pior caso com mediana das medianas). O exercício pede $O(n log n)$, '
    + 'mas vale mencionar que o limite não é justo.'
  ],
  r: 'Ordene por Merge Sort ($Θ(n log n)$) e corte pela mediana. Ótimo por argumento de troca. '
   + 'Dá para fazer em $O(n)$ com seleção.' },

{ id: 'L1-49', n: 49, s: 3, t: 'recorrencia', d: 2, p: 'alta', g: ['teorema-mestre', 'comparar'],
  e: '<p>O tamanho das instâncias de um certo problema é medido por um parâmetro $n$. '
   + 'Tenho três algoritmos — A, B e C:</p>'
   + '<ul>'
   + '<li><strong>A</strong> divide cada instância em <strong>cinco</strong> subinstâncias de '
   + 'tamanho $⌊n/2⌋$, resolve as subinstâncias e combina as soluções em tempo $O(n)$.</li>'
   + '<li><strong>B</strong> divide cada instância em <strong>duas</strong> subinstâncias de '
   + 'tamanho $n − 1$, resolve as subinstâncias e combina em tempo $O(1)$.</li>'
   + '<li><strong>C</strong> divide cada instância em <strong>nove</strong> subinstâncias de '
   + 'tamanho $⌊n/3⌋$, resolve as subinstâncias e combina em tempo $O(n^2)$.</li>'
   + '</ul>'
   + '<p>Qual o consumo de tempo de cada um? Qual é assintoticamente mais eficiente no pior caso?</p>',
  h: 'Monte a recorrência de cada um a partir da descrição. Um deles não cai no Teorema Mestre.',
  sol: [
    '<strong>Algoritmo A: $T_A(n) = 5T(n/2) + O(n)$.</strong><br>'
    + '$a = 5$, $b = 2$, logo $n^{log_2 5} ≈ n^{2{,}322}$. Como $f(n) = n = O(n^{2{,}322−ε})$ '
    + 'com, digamos, $ε = 1$, aplica-se o <strong>caso 1</strong>:'
    + '$$T_A(n) = Θ\\p{n^{log_2 5}} ≈ Θ(n^{2{,}32})$$',
    '<strong>Algoritmo B: $T_B(n) = 2T(n−1) + O(1)$.</strong><br>'
    + 'É <strong>subtrativa</strong> — o Teorema Mestre não se aplica. Expandindo: '
    + '$T(n) = 2T(n−1)+1 = 4T(n−2)+3 = ⋯ = 2^kT(n−k) + (2^k − 1)$. Com $k = n$:'
    + '$$T_B(n) = Θ(2^n)$$'
    + '<em>É a recorrência das Torres de Hanói. Exponencial.</em>',
    '<strong>Algoritmo C: $T_C(n) = 9T(n/3) + O(n^2)$.</strong><br>'
    + '$a = 9$, $b = 3$, logo $n^{log_3 9} = n^2$. Como $f(n) = n^2 = Θ(n^2) = Θ(n^{log_b a})$, '
    + 'aplica-se o <strong>caso 2</strong>:'
    + '$$T_C(n) = Θ(n^2 log n)$$',
    '<strong>Comparação.</strong>'
    + '$$T_C = Θ(n^2 log n) ≺ T_A = Θ(n^{2{,}32}) ≺ T_B = Θ(2^n)$$'
    + '<em>Note que $n^2 log n ≺ n^{2{,}32}$, porque $n^{0{,}32}$ vence qualquer logaritmo.</em>',
    '<strong>Resposta: o algoritmo C é o mais eficiente</strong>, apesar de criar nove '
    + 'subproblemas e ter a combinação mais cara — porque divide por 3, não por 2. '
    + 'E o B é catastroficamente o pior, apesar da combinação mais barata, porque apenas '
    + '<em>subtrai</em> do tamanho.'
  ],
  r: '$T_A = Θ(n^{log_2 5}) ≈ Θ(n^{2{,}32})$ · $T_B = Θ(2^n)$ · $T_C = Θ(n^2 log n)$. '
   + 'O mais eficiente é <strong>C</strong>.' },

/* ---- Itens 50 a 63: referências ao capítulo 4 do Cormen ----------------- */

{ id: 'L1-50', n: 50, s: 3, t: 'recorrencia', d: 2, p: 'alta', g: ['árvore', 'substituição'],
  ref: 'Cormen 4.4-1',
  e: '<p><em>(Cormen 4.4-1)</em> Use uma árvore de recursão para determinar um bom limite '
   + 'superior assintótico para a recorrência $T(n) = 3T(n/2) + n$. '
   + 'Use o método de substituição para verificar sua resposta.</p>',
  sol: [
    '<strong>Árvore de recursão.</strong> No nível $i$: há $3^i$ nós, cada subproblema tem '
    + 'tamanho $n/2^i$, e o custo local de cada nó é $n/2^i$. Custo do nível:'
    + '$$3^i · \\f{n}{2^i} = \\p{\\f{3}{2}}^i n$$',
    '<strong>Altura e folhas.</strong> A árvore tem altura $log_2 n$, e '
    + '$3^{log_2 n} = n^{log_2 3} ≈ n^{1{,}585}$ folhas.',
    '<strong>Soma.</strong> A razão $3/2 > 1$, logo a série geométrica é '
    + '<em>crescente</em> e é dominada pelo último termo:'
    + '$$T(n) = \\S{i=0}{log_2 n − 1}\\p{\\f{3}{2}}^i n + Θ\\p{n^{log_2 3}} '
    + '= n·\\f{(3/2)^{log_2 n} − 1}{3/2 − 1} + Θ\\p{n^{log_2 3}}$$',
    'Como $(3/2)^{log_2 n} = \\f{3^{log_2 n}}{2^{log_2 n}} = \\f{n^{log_2 3}}{n}$, o primeiro '
    + 'termo é $2n·\\p{\\f{n^{log_2 3}}{n} − 1} = O(n^{log_2 3})$. Portanto'
    + '$$T(n) = O\\p{n^{log_2 3}}$$'
    + '<em>(Conferindo pelo Teorema Mestre: $n^{log_2 3} ≈ n^{1{,}585}$ e $f(n) = n = '
    + 'O(n^{1{,}585−ε})$ — caso 1. ✓)</em>',
    '<strong>Verificação por substituição.</strong> Queremos $T(n) ≤ cn^{log_2 3} − dn$ '
    + '(hipótese fortalecida, subtraindo um termo de ordem inferior — sem isso a indução falha, '
    + 'como no exemplo do slide 02).',
    'Assumindo válido para $n/2$:'
    + '$$T(n) ≤ 3\\p{c\\p{\\f{n}{2}}^{log_2 3} − d\\f{n}{2}} + n '
    + '= 3c·\\f{n^{log_2 3}}{3} − \\f{3dn}{2} + n$$'
    + '<em>(usando $2^{log_2 3} = 3$)</em>'
    + '$$= cn^{log_2 3} − \\f{3d}{2}n + n = cn^{log_2 3} − dn − \\p{\\f{d}{2} − 1}n$$',
    'Para concluir $T(n) ≤ cn^{log_2 3} − dn$, basta que $\\f{d}{2} − 1 ≥ 0$, isto é '
    + '<strong>$d ≥ 2$</strong>. Escolhendo $d = 2$ e $c$ grande o bastante para cobrir o caso '
    + 'base, a indução fecha. ∎'
  ],
  r: '$T(n) = Θ(n^{log_2 3}) ≈ Θ(n^{1{,}585})$.' },

{ id: 'L1-51', n: 51, s: 3, t: 'recorrencia', d: 2, p: 'alta', g: ['árvore', 'substituição'],
  ref: 'Cormen 4.4-2',
  e: '<p><em>(Cormen 4.4-2)</em> Use uma árvore de recursão para determinar um bom limite '
   + 'superior assintótico para a recorrência $T(n) = T(n/2) + n^2$. '
   + 'Use o método de substituição para verificar sua resposta.</p>',
  sol: [
    '<strong>Árvore.</strong> Um único ramo (a = 1). No nível $i$: um nó de tamanho $n/2^i$, '
    + 'com custo local $\\p{\\f{n}{2^i}}^2 = \\f{n^2}{4^i}$.',
    '<strong>Soma.</strong> Razão $\\f{1}{4} < 1$ — série geométrica <em>decrescente</em>, '
    + 'limitada pela infinita:'
    + '$$T(n) = \\S{i=0}{log_2 n} \\f{n^2}{4^i} < n^2·\\S{i=0}{∞}\\p{\\f{1}{4}}^i '
    + '= n^2·\\f{1}{1 − 1/4} = \\f{4}{3}n^2$$',
    '$$T(n) = O(n^2)$$'
    + '<em>E como o nível 0 sozinho já custa $n^2$, também $T(n) = Ω(n^2)$ — logo $Θ(n^2)$. '
    + '(Teorema Mestre: $n^{log_2 1} = 1$, e $n^2$ domina — caso 3. ✓)</em>',
    '<strong>Verificação por substituição.</strong> Palpite $T(n) ≤ cn^2$. Assumindo válido '
    + 'para $n/2$:'
    + '$$T(n) ≤ c\\p{\\f{n}{2}}^2 + n^2 = \\f{c}{4}n^2 + n^2 = \\p{\\f{c}{4} + 1}n^2$$',
    'Para fechar precisamos $\\f{c}{4} + 1 ≤ c$, ou seja $1 ≤ \\f{3c}{4}$, isto é '
    + '<strong>$c ≥ \\f{4}{3}$</strong>. Tomando $c = 2$ (com folga para o caso base), a '
    + 'indução se sustenta. ∎',
    '<em>Note que aqui <strong>não</strong> foi preciso fortalecer a hipótese — porque a série '
    + 'é decrescente e o termo dominante é o da raiz.</em>'
  ],
  r: '$T(n) = Θ(n^2)$ — série geométrica decrescente; o custo da raiz domina.' },

{ id: 'L1-52', n: 52, s: 3, t: 'recorrencia', d: 3, p: 'media', g: ['árvore', 'substituição', 'piso'],
  ref: 'Cormen 4.4-3',
  e: '<p><em>(Cormen 4.4-3)</em> Use uma árvore de recursão para determinar um bom limite '
   + 'superior assintótico para a recorrência $T(n) = 4T(n/2 + 2) + n$. '
   + 'Use o método de substituição para verificar sua resposta.</p>',
  h: 'O "+2" não muda a classe. Pense por quê — e depois lide com ele na indução.',
  sol: [
    '<strong>Primeiro, ignore o "+2".</strong> A recorrência se comporta como '
    + '$T(n) = 4T(n/2) + n$, porque $\\f{n}{2} + 2 = Θ\\p{\\f{n}{2}}$ — é o resultado do '
    + 'item 31, $(n + a)^b = Θ(n^b)$. O deslocamento constante não altera a classe.',
    '<strong>Árvore (da versão simplificada).</strong> No nível $i$: $4^i$ nós de tamanho '
    + '$n/2^i$, custo local $n/2^i$ cada. Custo do nível:'
    + '$$4^i·\\f{n}{2^i} = 2^i n$$'
    + 'Razão 2 > 1 — série <em>crescente</em>, dominada pelo último nível.',
    '<strong>Folhas.</strong> Altura $log_2 n$, número de folhas $4^{log_2 n} = n^{log_2 4} = n^2$. '
    + 'O custo das folhas, $Θ(n^2)$, domina:'
    + '$$T(n) = O(n^2)$$'
    + '<em>(Teorema Mestre na versão simplificada: $n^{log_2 4} = n^2$, $f(n) = n = O(n^{2−1})$ '
    + '— caso 1, $Θ(n^2)$. ✓)</em>',
    '<strong>Verificação por substituição</strong> — agora com o "+2" de verdade. '
    + 'Palpite fortalecido: $T(n) ≤ c(n − a)^2$ para constantes $c, a > 0$ a determinar. '
    + '(Subtrair $a$ é o truque que absorve o deslocamento.)',
    'Assumindo válido para $\\f{n}{2} + 2$:'
    + '$$T(n) ≤ 4c\\p{\\f{n}{2} + 2 − a}^2 + n = 4c·\\f{(n + 4 − 2a)^2}{4} + n '
    + '= c(n + 4 − 2a)^2 + n$$',
    'Queremos que isso seja $≤ c(n − a)^2$. Escolhendo <strong>$a = 4$</strong>, o termo vira '
    + '$c(n − 4)^2 + n$, e precisamos de $c(n−4)^2 + n ≤ c(n−4)^2$ — que falha por $n$. '
    + 'Escolha então $a > 4$, digamos $a = 8$: então $n + 4 − 2a = n − 12$ e'
    + '$$T(n) ≤ c(n−12)^2 + n = c(n−8)^2 − c\\p{8n − 80} + n$$'
    + 'que é $≤ c(n−8)^2$ desde que $c(8n − 80) ≥ n$, o que vale para $c ≥ 1$ e $n ≥ 12$. ∎',
    'Como $(n − 8)^2 = Θ(n^2)$, conclui-se $T(n) = Θ(n^2)$.'
  ],
  r: '$T(n) = Θ(n^2)$. O "+2" é absorvido — use o palpite $c(n−a)^2$ na indução.' },

{ id: 'L1-53', n: 53, s: 3, t: 'recorrencia', d: 2, p: 'alta', g: ['árvore', 'subtrativa', 'prova-Q1'],
  ref: 'Cormen 4.4-4',
  e: '<p><em>(Cormen 4.4-4)</em> Use uma árvore de recursão para determinar um bom limite '
   + 'superior assintótico para a recorrência $T(n) = 2T(n−1) + 1$. '
   + 'Use o método de substituição para verificar sua resposta.</p>',
  h: 'É a recorrência das Torres de Hanói — e prima da questão 1(d) da prova.',
  sol: [
    '<strong>Árvore.</strong> Recorrência <strong>subtrativa</strong>: o Teorema Mestre não se '
    + 'aplica. No nível $i$ há $2^i$ nós, cada um com custo local 1. A profundidade é $n$, '
    + 'porque o tamanho cai de 1 em 1.',
    '<strong>Soma.</strong>'
    + '$$T(n) = \\S{i=0}{n−1} 2^i · 1 + 2^n·T(0) = (2^n − 1) + 2^n·Θ(1) = Θ(2^n)$$'
    + '<em>(usando $\\S{i=0}{n−1}2^i = 2^n − 1$)</em>',
    '$$T(n) = O(2^n)$$',
    '<strong>Verificação por substituição.</strong> Palpite ingênuo $T(n) ≤ c2^n$ falha por '
    + 'pouco: $T(n) ≤ 2c2^{n−1} + 1 = c2^n + 1 > c2^n$. É a mesma armadilha do slide 02.',
    '<strong>Fortaleça a hipótese:</strong> $T(n) ≤ c2^n − d$, com $d > 0$.'
    + '$$T(n) ≤ 2\\p{c2^{n−1} − d} + 1 = c2^n − 2d + 1 = \\p{c2^n − d} − d + 1$$',
    'Para concluir $T(n) ≤ c2^n − d$, basta $−d + 1 ≤ 0$, ou seja <strong>$d ≥ 1$</strong>. '
    + 'Com $d = 1$ e $c$ adequado ao caso base, a indução fecha. ∎',
    '<strong>Solução exata:</strong> $T(n) = 2^n·T(0) + 2^n − 1$. Com $T(0) = 1$, '
    + '$T(n) = 2^{n+1} − 1$. É o número de movimentos das Torres de Hanói (com $T(1)=1$, '
    + '$T(n) = 2^n − 1$).',
    '<strong>Compare com a questão 1(d) da prova:</strong> $T(n) = 2T(n−1) + n$. Mesma '
    + 'estrutura, custo local linear em vez de constante — e a resposta continua $Θ(2^n)$, '
    + 'porque o crescimento exponencial da largura domina o custo polinomial de cada nó.'
  ],
  r: '$T(n) = Θ(2^n)$. Na substituição, fortaleça para $c2^n − d$ com $d ≥ 1$.' },

{ id: 'L1-54a', n: 54, sub: 'a', s: 3, t: 'recorrencia', d: 1, p: 'alta', g: ['teorema-mestre', 'prova-Q1'],
  ref: 'Cormen 4.5-1(a)',
  e: '<p><em>(Cormen 4.5-1a)</em> Use o método mestre para fornecer limites assintóticos '
   + 'restritos para $$T(n) = 2T(n/4) + 1$$</p>',
  sol: [
    '$a = 2$, $b = 4$, $f(n) = 1$.',
    '$$n^{log_b a} = n^{log_4 2} = n^{1/2} = \\r{n}$$',
    'Compare: $f(n) = 1 = O\\p{n^{1/2 − ε}}$ com, por exemplo, $ε = \\f{1}{2}$ (dando '
    + '$O(n^0) = O(1)$ ✓). O peso das folhas domina — <strong>caso 1</strong>.',
    '$$T(n) = Θ\\p{\\r{n}}$$'
  ],
  r: '$Θ(\\r{n})$ — caso 1.' },

{ id: 'L1-54b', n: 54, sub: 'b', s: 3, t: 'recorrencia', d: 2, p: 'alta', g: ['teorema-mestre', 'prova-Q1'],
  ref: 'Cormen 4.5-1(b)',
  e: '<p><em>(Cormen 4.5-1b)</em> Use o método mestre para $$T(n) = 2T(n/4) + \\r{n}$$</p>',
  sol: [
    '$a = 2$, $b = 4$, $f(n) = \\r{n} = n^{1/2}$.',
    '$$n^{log_b a} = n^{log_4 2} = n^{1/2} = \\r{n}$$',
    'Compare: $f(n) = \\r{n} = Θ\\p{n^{log_b a}}$ — <strong>empate</strong>, '
    + '<strong>caso 2</strong>.',
    '$$T(n) = Θ\\p{\\r{n}·lg n}$$',
    '<em>Este é o item que a extração do PDF costuma corromper (o radical vira "n"). '
    + 'A forma correta em Cormen é $2T(n/4) + \\r{n}$.</em>'
  ],
  r: '$Θ(\\r{n} · lg n)$ — caso 2.' },

{ id: 'L1-54c', n: 54, sub: 'c', s: 3, t: 'recorrencia', d: 1, p: 'alta', g: ['teorema-mestre', 'prova-Q1'],
  ref: 'Cormen 4.5-1(c)',
  e: '<p><em>(Cormen 4.5-1c)</em> Use o método mestre para $$T(n) = 2T(n/4) + n$$</p>',
  sol: [
    '$a = 2$, $b = 4$, $f(n) = n$. E $n^{log_4 2} = \\r{n}$.',
    'Compare: $f(n) = n = Ω\\p{n^{1/2 + ε}}$ com $ε = \\f{1}{2}$ ✓ — a raiz domina '
    + 'polinomialmente.',
    '<strong>Verifique a regularidade</strong> (obrigatória no caso 3): '
    + '$$a·f(n/b) = 2·\\f{n}{4} = \\f{n}{2} ≤ c·n \\t{ com } c = \\f{1}{2} < 1 ✓$$',
    '<strong>Caso 3:</strong> $$T(n) = Θ(n)$$'
  ],
  r: '$Θ(n)$ — caso 3, com regularidade $c = 1/2$.' },

{ id: 'L1-54d', n: 54, sub: 'd', s: 3, t: 'recorrencia', d: 1, p: 'alta', g: ['teorema-mestre', 'prova-Q1'],
  ref: 'Cormen 4.5-1(d)',
  e: '<p><em>(Cormen 4.5-1d)</em> Use o método mestre para $$T(n) = 2T(n/4) + n^2$$</p>',
  sol: [
    '$a = 2$, $b = 4$, $f(n) = n^2$. E $n^{log_4 2} = \\r{n} = n^{0{,}5}$.',
    'Compare: $f(n) = n^2 = Ω\\p{n^{0{,}5 + ε}}$ com $ε = 1{,}5$ ✓.',
    '<strong>Regularidade:</strong> $2·\\p{\\f{n}{4}}^2 = \\f{n^2}{8} ≤ c·n^2$ com '
    + '$c = \\f{1}{8} < 1$ ✓',
    '<strong>Caso 3:</strong> $$T(n) = Θ(n^2)$$',
    '<strong>O padrão dos quatro itens 54(a)–(d).</strong> Mesmos $a$ e $b$ — logo o mesmo '
    + '$n^{log_b a} = \\r{n}$ — e só $f(n)$ muda. É um exercício desenhado para treinar '
    + 'a comparação, que é o passo decisivo do teorema:<br>'
    + '$f = 1$ → abaixo → caso 1 → $Θ(\\r{n})$<br>'
    + '$f = \\r{n}$ → empate → caso 2 → $Θ(\\r{n} lg n)$<br>'
    + '$f = n$ → acima → caso 3 → $Θ(n)$<br>'
    + '$f = n^2$ → acima → caso 3 → $Θ(n^2)$'
  ],
  r: '$Θ(n^2)$ — caso 3, com regularidade $c = 1/8$.' },

{ id: 'L1-55', n: 55, s: 3, t: 'recorrencia', d: 3, p: 'media', g: ['teorema-mestre', 'strassen'],
  ref: 'Cormen 4.5-2',
  e: '<p><em>(Cormen 4.5-2)</em> O professor César quer desenvolver um algoritmo para '
   + 'multiplicação de matrizes que seja assintoticamente mais rápido do que o algoritmo de '
   + 'Strassen. Seu algoritmo usará divisão e conquista, repartindo cada matriz em pedaços de '
   + 'tamanho $n/4 × n/4$, e, juntas, as etapas de dividir e combinar levarão tempo $Θ(n^2)$. '
   + 'Se o algoritmo criar $a$ subproblemas, a recorrência se torna '
   + '$T(n) = aT(n/4) + Θ(n^2)$. '
   + '<strong>Qual é o maior valor inteiro de $a$ para o qual o algoritmo do professor César '
   + 'seria assintoticamente mais rápido que o de Strassen?</strong></p>',
  h: 'Escreva a condição "mais rápido que Strassen" como uma desigualdade entre expoentes.',
  sol: [
    '<strong>A meta.</strong> Strassen é $Θ\\p{n^{log_2 7}}$, com $log_2 7 ≈ 2{,}807$.',
    '<strong>O algoritmo do professor.</strong> $T(n) = aT(n/4) + Θ(n^2)$, com $b = 4$. '
    + 'O peso das folhas é $n^{log_4 a}$.',
    'Supondo que caia no caso 1 (folhas dominam, o que vale sempre que $log_4 a > 2$), a '
    + 'solução é $Θ\\p{n^{log_4 a}}$.',
    '<strong>A condição.</strong> Queremos ser <em>estritamente</em> mais rápidos:'
    + '$$log_4 a < log_2 7$$',
    '<strong>Resolva.</strong> Converta para a mesma base: $log_4 a = \\f{log_2 a}{log_2 4} '
    + '= \\f{log_2 a}{2}$. Então'
    + '$$\\f{log_2 a}{2} < log_2 7 ⟺ log_2 a < 2 log_2 7 = log_2 49 ⟺ a < 49$$',
    '<strong>Resposta: $a = 48$.</strong>',
    '<strong>Confira.</strong> Com $a = 48$: $log_4 48 = \\f{log_2 48}{2} ≈ \\f{5{,}585}{2} '
    + '≈ 2{,}792 < 2{,}807$ ✓. E como $2{,}792 > 2$, de fato $f(n) = n^2$ é polinomialmente '
    + 'menor que $n^{2{,}792}$ — caso 1 confirmado, dando $Θ(n^{2{,}792})$.',
    '<em>Com $a = 49$ teríamos exatamente $log_4 49 = log_2 7$ — empate com Strassen, não '
    + 'vitória.</em>'
  ],
  r: '$a = 48$. A condição é $log_4 a < log_2 7$, isto é $a < 49$.' },

{ id: 'L1-56', n: 56, s: 3, t: 'recorrencia', d: 1, p: 'alta', g: ['teorema-mestre', 'busca-binária'],
  ref: 'Cormen 4.5-3',
  e: '<p><em>(Cormen 4.5-3)</em> Use o método mestre para mostrar que a solução da recorrência '
   + 'da busca binária $T(n) = T(n/2) + Θ(1)$ é $T(n) = Θ(lg n)$.</p>',
  sol: [
    '$a = 1$, $b = 2$, $f(n) = Θ(1)$.',
    '$$n^{log_b a} = n^{log_2 1} = n^0 = 1$$',
    'Compare: $f(n) = Θ(1) = Θ\\p{n^{log_b a}}$ — <strong>empate exato</strong>, '
    + '<strong>caso 2</strong>.',
    '$$T(n) = Θ\\p{n^{log_b a}·lg n} = Θ(1·lg n) = Θ(lg n) ∎$$',
    '<strong>Intuição pela árvore.</strong> Com $a = 1$ a "árvore" é uma corrente: um nó por '
    + 'nível, cada um custando $Θ(1)$. A altura é $log_2 n$, logo o total é $Θ(log n)$. '
    + 'O fator $lg n$ do caso 2 é, literalmente, o número de níveis.',
    '<em>Este é o caso 2 mais simples que existe, e vale ter na ponta da língua: sempre que '
    + '$a = 1$ e $f(n) = Θ(1)$, a resposta é $Θ(log n)$.</em>'
  ],
  r: '$Θ(lg n)$ — caso 2, com $n^{log_2 1} = 1 = f(n)$.' },

{ id: 'L1-57', n: 57, s: 3, t: 'recorrencia', d: 3, p: 'alta', g: ['teorema-mestre', 'limitação', 'prova-Q1'],
  ref: 'Cormen 4.5-4',
  e: '<p><em>(Cormen 4.5-4)</em> O método mestre pode ser aplicado à recorrência '
   + '$T(n) = 4T(n/2) + n^2 lg n$? Justifique sua resposta. '
   + 'Dê um limite superior assintótico para essa recorrência.</p>',
  h: 'Calcule $n^{log_b a}$ e compare com $f(n)$. A comparação é <em>polinomial</em>?',
  sol: [
    '<strong>Resposta: NÃO, o método mestre não se aplica.</strong>',
    '<strong>Por quê.</strong> $a = 4$, $b = 2$, logo $n^{log_2 4} = n^2$, e '
    + '$f(n) = n^2 lg n$.',
    '<em>Não é caso 2:</em> $f(n) = n^2 lg n ≠ Θ(n^2)$, porque $\\f{n^2 lg n}{n^2} = lg n → ∞$.',
    '<em>Não é caso 1:</em> $f$ é maior que $n^2$, não menor.',
    '<em>Não é caso 3:</em> exigiria $f(n) = Ω\\p{n^{2+ε}}$ para algum $ε > 0$. Mas '
    + '$$\\f{n^2 lg n}{n^{2+ε}} = \\f{lg n}{n^ε} → 0$$'
    + 'para qualquer $ε > 0$ — o logaritmo perde para toda potência. Logo '
    + '$n^2 lg n = o(n^{2+ε})$, e a condição do caso 3 falha.',
    '<strong>A lacuna.</strong> $f(n)$ é assintoticamente maior que $n^{log_b a}$, mas apenas '
    + 'por um <strong>fator logarítmico</strong>, não polinomial. Cai exatamente entre os casos '
    + '2 e 3 — a limitação que o slide 02 descreve.',
    '<strong>Limite superior pela árvore de recursão.</strong> No nível $i$: $4^i$ nós de '
    + 'tamanho $n/2^i$, custo local $\\p{\\f{n}{2^i}}^2 lg\\f{n}{2^i}$. Custo do nível:'
    + '$$4^i·\\f{n^2}{4^i}·lg\\f{n}{2^i} = n^2\\p{lg n − i}$$',
    'Somando sobre os $lg n$ níveis:'
    + '$$T(n) = \\S{i=0}{lg n − 1} n^2(lg n − i) = n^2\\S{k=1}{lg n} k '
    + '= n^2·\\f{lg n(lg n + 1)}{2} = Θ\\p{n^2 lg^2 n}$$',
    '<strong>Resposta: $T(n) = Θ\\p{n^2 lg^2 n}$.</strong>',
    '<strong>Generalização útil</strong> (é o Cormen 4.6-2, item 60): se '
    + '$f(n) = Θ\\p{n^{log_b a} lg^k n}$ com $k ≥ 0$, então '
    + '$T(n) = Θ\\p{n^{log_b a} lg^{k+1} n}$. Aqui $k = 1$, dando $lg^2 n$. ✓'
  ],
  r: 'Não se aplica — a diferença é só logarítmica. Pela árvore, $T(n) = Θ(n^2 lg^2 n)$.' },

{ id: 'L1-58', n: 58, s: 3, t: 'aberta', d: 3, p: 'media', g: ['teorema-mestre', 'regularidade'],
  ref: 'Cormen 4.5-5',
  e: '<p><em>(Cormen 4.5-5)</em> Considere a condição de regularidade $a·f(n/b) ≤ c·f(n)$ para '
   + 'alguma constante $c < 1$, que faz parte do caso 3 do teorema mestre. '
   + 'Dê um exemplo de constantes $a ≥ 1$ e $b > 1$ e uma função $f(n)$ que satisfaçam todas as '
   + 'condições do caso 3 <strong>exceto</strong> a condição de regularidade.</p>',
  h: 'Precisa de uma $f$ que cresça muito rápido — rápido demais para que $a·f(n/b)$ seja uma '
   + 'fração de $f(n)$. Ou que oscile.',
  sol: [
    '<strong>O que se quer.</strong> Uma $f$ com $f(n) = Ω\\p{n^{log_b a + ε}}$ (condição de '
    + 'crescimento do caso 3 ✓) mas para a qual não exista $c < 1$ com '
    + '$a·f(n/b) ≤ c·f(n)$ (regularidade ✗).',
    '<strong>Exemplo clássico.</strong> Tome $a = 1$, $b = 2$ e '
    + '$$f(n) = n(2 − cos n)$$',
    '<em>Condição de crescimento ✓:</em> $n^{log_2 1} = n^0 = 1$, e como '
    + '$1 ≤ 2 − cos n ≤ 3$, temos $n ≤ f(n) ≤ 3n$, logo $f(n) = Θ(n) = Ω(n^{0+1})$. '
    + 'Vale com $ε = 1$.',
    '<em>Regularidade ✗:</em> precisamos verificar se existe $c < 1$ com '
    + '$f(n/2) ≤ c·f(n)$, isto é'
    + '$$\\f{n}{2}\\p{2 − cos\\f{n}{2}} ≤ c·n(2 − cos n)$$'
    + '$$⟺ \\f{2 − cos(n/2)}{2(2 − cos n)} ≤ c$$',
    'O lado esquerdo é maximizado quando $cos(n/2) = −1$ (numerador $= 3$) e $cos n = 1$ '
    + '(denominador $= 2$), dando $\\f{3}{2}$. Como o cosseno é denso o bastante para chegar '
    + 'arbitrariamente perto dessas condições simultaneamente para $n$ arbitrariamente grande, '
    + 'a razão se aproxima de $\\f{3}{2} > 1$. Logo <strong>nenhum $c < 1$ serve</strong>. ✗',
    '<strong>Exemplo mais simples de entender (com $f$ super-polinomial).</strong> '
    + 'Tome $a = 1$, $b = 2$ e $f(n) = n^{log n}$. Então'
    + '$$\\f{a·f(n/b)}{f(n)} = \\f{(n/2)^{log(n/2)}}{n^{log n}}$$'
    + 'que também não é limitado por nenhum $c < 1$ uniformemente — aqui, ao contrário, ele '
    + 'tende a 0, satisfazendo a regularidade. <em>Este segundo exemplo NÃO serve</em> — '
    + 'a oscilação do primeiro é o que realmente quebra a condição.',
    '<strong>A lição.</strong> A regularidade falha essencialmente para funções que '
    + '<em>oscilam</em>. Para toda $f$ polinomial bem-comportada ($f(n) = n^k$ com '
    + '$k > log_b a$), ela vale automaticamente: '
    + '$\\f{a·(n/b)^k}{n^k} = \\f{a}{b^k} < 1$ precisamente quando $k > log_b a$. '
    + 'É por isso que, na prática, a verificação é rápida — mas o teorema precisa da cláusula '
    + 'para ser correto no caso geral.'
  ],
  r: '$a = 1$, $b = 2$, $f(n) = n(2 − cos n)$: cresce como $Θ(n)$ ✓, mas a oscilação impede '
   + 'qualquer $c < 1$.' },

{ id: 'L1-59', n: 59, s: 3, t: 'aberta', d: 3, p: 'baixa', g: ['teorema-mestre', 'prova'],
  ref: 'Cormen 4.6-1',
  e: '<p><em>(Cormen 4.6-1)</em> Dê uma expressão simples e exata para $n_i$ na equação (4.27) '
   + 'para o caso em que $b$ é um inteiro positivo, em vez de um número real arbitrário.</p>'
   + '<p class="xs muted">Contexto: na prova do teorema mestre, $n_i$ é o tamanho do '
   + 'subproblema no nível $i$ da recursão, definido recursivamente por $n_0 = n$ e '
   + '$n_i = ⌈n_{i−1}/b⌉$.</p>',
  sol: [
    '<strong>Resposta:</strong> $$n_i = \⌈\\f{n}{b^i}\⌉$$',
    '<strong>Justificativa.</strong> Vale a identidade, para $b$ inteiro positivo e $x$ real:'
    + '$$\⌈\\f{⌈x⌉}{b}\⌉ = \⌈\\f{x}{b}\⌉$$'
    + 'Ou seja, aplicar o teto duas vezes em divisões sucessivas por inteiros é o mesmo que '
    + 'aplicá-lo uma vez na divisão acumulada.',
    '<strong>Por indução em $i$.</strong> Base: $n_0 = n = ⌈n/b^0⌉$ ✓. '
    + 'Passo: supondo $n_{i−1} = ⌈n/b^{i−1}⌉$,'
    + '$$n_i = \⌈\\f{n_{i−1}}{b}\⌉ = \⌈\\f{⌈n/b^{i−1}⌉}{b}\⌉ '
    + '= \⌈\\f{n}{b^i}\⌉$$'
    + 'pela identidade acima. ∎',
    '<strong>Por que isso importa na prova do teorema.</strong> Sem essa simplificação, os '
    + 'tetos aninhados tornariam impossível somar os custos por nível em forma fechada. '
    + 'Com ela, o nível $i$ tem tamanho $Θ(n/b^i)$ e a árvore tem altura $⌈log_b n⌉$ — '
    + 'exatamente o que a análise informal (que ignora tetos) já supunha.',
    '<em>Este exercício é a formalização do que o Módulo 0 chama de "pisos e tetos não mudam a '
    + 'classe assintótica".</em>'
  ],
  r: '$n_i = ⌈n/b^i⌉$, por $⌈⌈x⌉/b⌉ = ⌈x/b⌉$ para $b$ inteiro.' },

{ id: 'L1-60', n: 60, s: 3, t: 'aberta', d: 3, p: 'media', g: ['teorema-mestre', 'extensão'],
  ref: 'Cormen 4.6-2',
  e: '<p><em>(Cormen 4.6-2)</em> Mostre que, se $f(n) = Θ\\p{n^{log_b a} lg^k n}$ onde '
   + '$k ≥ 0$, então a recorrência mestre tem solução '
   + '$T(n) = Θ\\p{n^{log_b a} lg^{k+1} n}$. Por simplicidade, restrinja sua análise a '
   + 'potências exatas de $b$.</p>',
  h: 'Some os custos por nível da árvore, como no caso 2 — só que agora cada nível traz um '
   + 'fator $lg^k$.',
  sol: [
    '<strong>Por que este resultado é útil.</strong> Ele preenche a lacuna entre os casos 2 e 3 '
    + 'do teorema mestre — exatamente a situação do item 57 e do exemplo de limitação do '
    + 'slide 02.',
    '<strong>Montagem.</strong> Com $n = b^m$ (potência exata), a árvore tem altura '
    + '$m = log_b n$. No nível $i$ há $a^i$ nós de tamanho $n/b^i$. O custo do nível é'
    + '$$a^i · f\\p{\\f{n}{b^i}} = a^i · Θ\\p{\\p{\\f{n}{b^i}}^{log_b a} lg^k \\f{n}{b^i}}$$',
    '<strong>Simplifique.</strong> Note que '
    + '$\\p{\\f{n}{b^i}}^{log_b a} = \\f{n^{log_b a}}{\\p{b^{log_b a}}^i} '
    + '= \\f{n^{log_b a}}{a^i}$. O fator $a^i$ cancela:'
    + '$$a^i·\\f{n^{log_b a}}{a^i}·lg^k\\f{n}{b^i} = n^{log_b a}·lg^k\\f{n}{b^i}$$',
    '<strong>Some os níveis.</strong> Como $lg\\f{n}{b^i} = lg n − i·lg b$, escrevendo '
    + '$m = log_b n$:'
    + '$$T(n) = Θ\\p{n^{log_b a}\\S{i=0}{m−1}\\p{lg n − i·lg b}^k} + Θ\\p{n^{log_b a}}$$',
    'Substituindo $j = m − i$ (de modo que $lg n − i lg b = j·lg b$):'
    + '$$\\S{i=0}{m−1}(lg n − i lg b)^k = (lg b)^k\\S{j=1}{m} j^k = (lg b)^k·Θ\\p{m^{k+1}}$$'
    + 'usando $\\S{j=1}{m} j^k = Θ(m^{k+1})$ — a fórmula das somas de potências do Módulo 0.',
    '<strong>Conclua.</strong> Como $m = log_b n = Θ(lg n)$,'
    + '$$T(n) = Θ\\p{n^{log_b a}·(lg n)^{k+1}} = Θ\\p{n^{log_b a} lg^{k+1} n} ∎$$',
    '<strong>Casos particulares.</strong> Com $k = 0$ recupera-se exatamente o caso 2 do '
    + 'teorema mestre: $f = Θ(n^{log_b a}) ⇒ T = Θ(n^{log_b a} lg n)$. '
    + 'Com $k = 1$ e $a = 4$, $b = 2$: $T(n) = Θ(n^2 lg^2 n)$, que é a resposta do item 57. ✓'
  ],
  r: 'Cada nível custa $n^{log_b a} lg^k(n/b^i)$; somando os $log_b n$ níveis sai '
   + '$Θ(n^{log_b a} lg^{k+1} n)$.' },

{ id: 'L1-61', n: 61, s: 3, t: 'aberta', d: 3, p: 'baixa', g: ['teorema-mestre', 'regularidade'],
  ref: 'Cormen 4.6-3',
  e: '<p><em>(Cormen 4.6-3)</em> Mostre que o caso 3 do teorema mestre é exagerado, no sentido '
   + 'de que a condição de regularidade $a·f(n/b) ≤ c·f(n)$ para alguma constante $c < 1$ '
   + '<strong>implica</strong> que existe uma constante $ε > 0$ tal que '
   + '$f(n) = Ω\\p{n^{log_b a + ε}}$.</p>',
  h: 'Itere a condição de regularidade $k$ vezes e escolha $k$ para chegar ao caso base.',
  sol: [
    '<strong>O que se quer mostrar.</strong> Que a regularidade sozinha já garante a condição '
    + 'de crescimento — logo enunciar as duas no caso 3 é redundante.',
    '<strong>Itere a regularidade.</strong> De $a·f(n/b) ≤ c·f(n)$ segue '
    + '$f(n/b) ≤ \\f{c}{a}f(n)$. Aplicando $k$ vezes:'
    + '$$f\\p{\\f{n}{b^k}} ≤ \\p{\\f{c}{a}}^k f(n) ⟺ '
    + 'f(n) ≥ \\p{\\f{a}{c}}^k f\\p{\\f{n}{b^k}}$$',
    '<strong>Escolha $k$ para chegar ao caso base.</strong> Tome '
    + '$k = ⌊log_b n⌋$, de modo que $\\f{n}{b^k}$ seja uma constante entre 1 e $b$. '
    + 'Então $f(n/b^k) = Θ(1)$, e'
    + '$$f(n) ≥ Ω\\p{\\p{\\f{a}{c}}^{log_b n}}$$',
    '<strong>Simplifique o expoente.</strong> Use $x^{log_b n} = n^{log_b x}$:'
    + '$$\\p{\\f{a}{c}}^{log_b n} = n^{log_b (a/c)} = n^{log_b a − log_b c}$$',
    '<strong>Identifique o $ε$.</strong> Como $c < 1$, temos $log_b c < 0$, logo '
    + '$−log_b c > 0$. Defina'
    + '$$ε = −log_b c = log_b\\f{1}{c} > 0$$'
    + 'e conclua'
    + '$$f(n) = Ω\\p{n^{log_b a + ε}} ∎$$',
    '<strong>Interpretação.</strong> A regularidade diz que o custo cai por um fator constante '
    + 'a cada nível da árvore. Descer $log_b n$ níveis multiplica esse fator $log_b n$ vezes, '
    + 'o que <em>é</em> um crescimento polinomial — daí o $ε$.',
    '<strong>Por que Cormen enuncia as duas mesmo assim.</strong> Porque a condição de '
    + 'crescimento é imediata de verificar ("$f$ é polinomialmente maior?") enquanto a '
    + 'regularidade exige uma conta. Na prática, checa-se a primeira para <em>identificar</em> '
    + 'o caso e a segunda para <em>confirmar</em>. Pedagogicamente redundante, operacionalmente '
    + 'conveniente.'
  ],
  r: 'Iterando a regularidade $log_b n$ vezes: $f(n) = Ω(n^{log_b a + ε})$ com $ε = −log_b c > 0$.' },

{ id: 'L1-62', n: 62, s: 3, t: 'recorrencia', d: 3, p: 'alta', g: ['teorema-mestre', 'árvore', 'prova-Q1'],
  ref: 'Cormen problema 4-1',
  e: '<p><em>(Cormen, problema 4-1 — Exemplos de recorrência)</em> Dê limites assintóticos '
   + 'superiores e inferiores para $T(n)$ em cada recorrência a seguir. Considere que $T(n)$ é '
   + 'constante para $n ≤ 2$. Torne seus limites tão restritos quanto possível e justifique.</p>'
   + '<p>a) $T(n) = 2T(n/2) + n^4$ &nbsp;&nbsp; b) $T(n) = T(7n/10) + n$ &nbsp;&nbsp; '
   + 'c) $T(n) = 16T(n/4) + n^2$ &nbsp;&nbsp; d) $T(n) = 7T(n/3) + n^2$<br>'
   + 'e) $T(n) = 7T(n/2) + n^2$ &nbsp;&nbsp; f) $T(n) = 2T(n/4) + \\r{n}$ &nbsp;&nbsp; '
   + 'g) $T(n) = T(n−2) + n^2$</p>',
  h: 'Seis saem direto do Teorema Mestre. Uma é subtrativa.',
  sol: [
    '<strong>(a) $T(n) = 2T(n/2) + n^4$.</strong> $n^{log_2 2} = n$. '
    + 'Como $n^4 = Ω(n^{1+ε})$ com $ε = 3$, e a regularidade dá '
    + '$2\\p{\\f{n}{2}}^4 = \\f{n^4}{8} ≤ \\f{1}{8}n^4$ ✓ — <strong>caso 3</strong>.'
    + '$$T(n) = Θ(n^4)$$',
    '<strong>(b) $T(n) = T(7n/10) + n$.</strong> $a = 1$, $b = \\f{10}{7}$, logo '
    + '$n^{log_b 1} = n^0 = 1$. Como $n = Ω(n^{0+1})$ e a regularidade dá '
    + '$\\f{7n}{10} ≤ \\f{7}{10}n$ com $c = 0{,}7 < 1$ ✓ — <strong>caso 3</strong>.'
    + '$$T(n) = Θ(n)$$'
    + '<em>Intuição: $n + \\f{7n}{10} + \\p{\\f{7}{10}}^2 n + ⋯ = \\f{n}{1 − 0{,}7} = \\f{10n}{3}$ '
    + '— série geométrica decrescente.</em>',
    '<strong>(c) $T(n) = 16T(n/4) + n^2$.</strong> $n^{log_4 16} = n^2$. '
    + 'Como $f(n) = n^2 = Θ(n^2)$ — <strong>caso 2</strong>.'
    + '$$T(n) = Θ(n^2 lg n)$$',
    '<strong>(d) $T(n) = 7T(n/3) + n^2$.</strong> $n^{log_3 7} ≈ n^{1{,}771}$. '
    + 'Como $n^2 = Ω(n^{1{,}771+ε})$ com $ε ≈ 0{,}2$, e a regularidade dá '
    + '$7\\p{\\f{n}{3}}^2 = \\f{7}{9}n^2$ com $c = \\f{7}{9} < 1$ ✓ — <strong>caso 3</strong>.'
    + '$$T(n) = Θ(n^2)$$',
    '<strong>(e) $T(n) = 7T(n/2) + n^2$.</strong> $n^{log_2 7} ≈ n^{2{,}807}$. '
    + 'Agora $f(n) = n^2$ é <em>menor</em>: $n^2 = O(n^{2{,}807−ε})$ com $ε ≈ 0{,}8$ — '
    + '<strong>caso 1</strong>.'
    + '$$T(n) = Θ\\p{n^{log_2 7}}$$'
    + '<em>É a recorrência de Strassen. Compare (d) e (e): só mudou $b$ de 3 para 2, e a '
    + 'resposta saltou do caso 3 para o caso 1.</em>',
    '<strong>(f) $T(n) = 2T(n/4) + \\r{n}$.</strong> $n^{log_4 2} = n^{1/2} = \\r{n}$. '
    + 'Como $f(n) = \\r{n} = Θ(\\r{n})$ — <strong>caso 2</strong>.'
    + '$$T(n) = Θ\\p{\\r{n}·lg n}$$'
    + '<em>Igual ao item 54(b).</em>',
    '<strong>(g) $T(n) = T(n−2) + n^2$.</strong> <strong>Subtrativa</strong> — o teorema não se '
    + 'aplica. Soma telescópica, com $n/2$ termos:'
    + '$$T(n) = \\S{k=0}{n/2 − 1}(n − 2k)^2 + Θ(1)$$'
    + 'Substituindo $j = n − 2k$ (que percorre $n, n−2, n−4, …$), a soma é da ordem de '
    + '$\\f{1}{2}\\S{j=1}{n} j^2 = Θ(n^3)$.'
    + '$$T(n) = Θ(n^3)$$'
    + '<em>Regra rápida: $T(n) = T(n − k) + f(n)$ com $k$ constante dá $Θ(n·f(n))$ quando '
    + '$f$ é polinomial — aqui $n·n^2 = n^3$. ✓</em>'
  ],
  r: 'a) $Θ(n^4)$ · b) $Θ(n)$ · c) $Θ(n^2 lg n)$ · d) $Θ(n^2)$ · e) $Θ(n^{log_2 7})$ · '
   + 'f) $Θ(\\r{n} lg n)$ · g) $Θ(n^3)$' },

{ id: 'L1-63', n: 63, s: 3, t: 'aberta', d: 3, p: 'baixa', g: ['recorrência', 'parâmetros'],
  ref: 'Cormen problema 4-2',
  e: '<p><em>(Cormen, problema 4-2 — Custos da passagem de parâmetros)</em></p>'
   + '<p>Supõe-se normalmente que passar parâmetros leva tempo constante, mesmo para arranjos '
   + 'de $N$ elementos, porque se passa um ponteiro. Este problema examina três estratégias:</p>'
   + '<p><strong>1.</strong> Arranjo passado por ponteiro. Tempo $= Θ(1)$.<br>'
   + '<strong>2.</strong> Arranjo passado por cópia. Tempo $= Θ(N)$, onde $N$ é o tamanho do '
   + 'arranjo.<br>'
   + '<strong>3.</strong> Arranjo passado por cópia somente da subfaixa acessível. '
   + 'Tempo $= Θ(q − p + 1)$ se o subarranjo $A[p..q]$ for passado.</p>'
   + '<p>a) Considere a busca binária recursiva. Dê as recorrências para o pior caso sob cada '
   + 'estratégia e bons limites superiores. Seja $N$ o tamanho do problema original e $n$ o '
   + 'tamanho de um subproblema.<br>'
   + 'b) Refaça (a) para o Merge Sort.</p>',
  h: 'O custo da passagem entra como termo aditivo $f(n)$ da recorrência.',
  sol: [
    '<strong>(a) Busca binária.</strong> Uma chamada recursiva sobre metade do vetor.',
    '<em>Estratégia 1 (ponteiro, $Θ(1)$):</em>'
    + '$$T(n) = T(n/2) + Θ(1) ⇒ T(n) = Θ(lg n)$$'
    + '<em>(caso 2 do teorema mestre — é a busca binária usual)</em>',
    '<em>Estratégia 2 (cópia do arranjo inteiro, $Θ(N)$):</em> atenção — o custo é $Θ(N)$, '
    + 'com o $N$ <strong>original</strong>, não $n$, porque se copia o arranjo todo em toda '
    + 'chamada.'
    + '$$T(n) = T(n/2) + Θ(N)$$'
    + 'Como $Θ(N)$ é constante em relação a $n$, a recorrência tem $lg n$ níveis custando '
    + '$Θ(N)$ cada:'
    + '$$T(n) = Θ(N lg n)$$',
    '<em>Estratégia 3 (cópia da subfaixa, $Θ(n)$):</em>'
    + '$$T(n) = T(n/2) + Θ(n) ⇒ T(n) = Θ(n)$$'
    + '<em>(caso 3 — série geométrica decrescente $n + n/2 + n/4 + ⋯ = 2n$)</em>',
    '<strong>Conclusão de (a).</strong> A busca binária deixa de ser logarítmica nas '
    + 'estratégias 2 e 3. Copiar arranjos <em>destrói</em> o ganho da busca binária — é por '
    + 'isso que passagem por ponteiro é o padrão.',
    '<strong>(b) Merge Sort.</strong> Duas chamadas sobre metades, mais $Θ(n)$ para intercalar.',
    '<em>Estratégia 1 (ponteiro):</em>'
    + '$$T(n) = 2T(n/2) + Θ(n) ⇒ T(n) = Θ(n lg n)$$',
    '<em>Estratégia 2 (cópia integral, $Θ(N)$ por chamada):</em>'
    + '$$T(n) = 2T(n/2) + Θ(n) + Θ(N) = 2T(n/2) + Θ(n + N)$$'
    + 'Como há $Θ(n)$ chamadas no total (a árvore do Merge Sort tem $Θ(n)$ nós) e cada uma '
    + 'paga $Θ(N)$ só de cópia, o custo das cópias sozinho é $Θ(nN)$. Somado ao '
    + '$Θ(n lg n)$ do trabalho útil:'
    + '$$T(n) = Θ(n lg n + nN) = Θ(nN)$$'
    + '<em>(pois $N ≥ n$ e portanto $nN$ domina $n lg n$; no nível superior, com $n = N$, '
    + 'isto é $Θ(N^2)$ — o Merge Sort vira quadrático.)</em>',
    '<em>Estratégia 3 (cópia da subfaixa, $Θ(n)$):</em>'
    + '$$T(n) = 2T(n/2) + Θ(n) + Θ(n) = 2T(n/2) + Θ(n) ⇒ T(n) = Θ(n lg n)$$'
    + '<em>A cópia da subfaixa custa o mesmo que a intercalação já custava, então é absorvida '
    + 'na constante. O Merge Sort sobrevive.</em>',
    '<strong>A lição.</strong> A hipótese "passagem de parâmetros é $Θ(1)$" não é inocente: '
    + 'ela muda a classe de complexidade da busca binária sob qualquer cópia, e a do Merge Sort '
    + 'sob cópia integral. Algoritmos que fazem muitas chamadas sobre subproblemas pequenos são '
    + 'os mais sensíveis.'
  ],
  r: 'Busca binária: $Θ(lg n)$ · $Θ(N lg n)$ · $Θ(n)$. '
   + 'Merge Sort: $Θ(n lg n)$ · $Θ(nN)$ · $Θ(n lg n)$.' },

/* ---- Item 64: dez recorrências para resolver (treino direto da Q1) ------ */

{ id: 'L1-64a', n: 64, sub: 'a', s: 3, t: 'recorrencia', d: 2, p: 'alta', g: ['árvore', 'assimétrica', 'prova-Q1'],
  e: '<p>Resolva: $$T(n) = T\\p{\\f{n}{3}} + T\\p{\\f{2n}{3}} + Θ(n)$$</p>',
  h: 'Subproblemas de tamanhos diferentes — o Teorema Mestre não serve.',
  sol: [
    '<strong>Teorema Mestre não se aplica</strong> — os dois subproblemas têm tamanhos '
    + 'diferentes. Use árvore de recursão.',
    '<strong>Custo por nível.</strong> Num nível completo, os tamanhos dos subproblemas somam '
    + '$\\f{n}{3} + \\f{2n}{3} = n$. Como o custo local é linear, <strong>cada nível completo '
    + 'custa $Θ(n)$</strong>.',
    '<strong>A árvore é desbalanceada.</strong><br>'
    + '<em>Caminho mais curto:</em> divide sempre por 3 → profundidade $log_3 n$.<br>'
    + '<em>Caminho mais longo:</em> multiplica sempre por $\\f{2}{3}$ → profundidade '
    + '$log_{3/2} n$.',
    '<strong>Limite inferior.</strong> Até o nível $log_3 n$ todos os níveis estão completos, '
    + 'custando $Θ(n)$ cada: $$T(n) = Ω(n·log_3 n) = Ω(n log n)$$',
    '<strong>Limite superior.</strong> Nenhum nível custa mais que $Θ(n)$, e há no máximo '
    + '$log_{3/2} n$ níveis: $$T(n) = O(n·log_{3/2} n) = O(n log n)$$',
    'Como $log_3 n$ e $log_{3/2}n$ diferem apenas por constante, os dois limites coincidem:'
    + '$$T(n) = Θ(n log n)$$',
    '<em>É o exemplo de árvore assimétrica do slide 02, e o Cormen 4.4-6.</em>'
  ],
  r: '$Θ(n log n)$ — cada nível completo custa $Θ(n)$; altura entre $log_3 n$ e $log_{3/2}n$.' },

{ id: 'L1-64b', n: 64, sub: 'b', s: 3, t: 'recorrencia', d: 3, p: 'media', g: ['mudança-variável', 'prova-Q1'],
  e: '<p>Resolva: $$T(n) = log n + T\\p{\\r{n}}$$</p>',
  h: 'Mudança de variável: faça $n = 2^m$.',
  sol: [
    '<strong>Mudança de variável.</strong> Faça $n = 2^m$, isto é $m = lg n$. Então '
    + '$\\r{n} = 2^{m/2}$, e definindo $S(m) = T(2^m)$:'
    + '$$S(m) = m + S\\p{\\f{m}{2}}$$',
    '<strong>Resolva $S$.</strong> Agora o Teorema Mestre se aplica: $a = 1$, $b = 2$, '
    + '$f(m) = m$. Temos $m^{log_2 1} = m^0 = 1$, e $f(m) = m = Ω(m^{0+1})$ com '
    + 'regularidade $\\f{m}{2} ≤ \\f{1}{2}m$ ✓ — caso 3.'
    + '$$S(m) = Θ(m)$$'
    + '<em>(Intuição: $m + \\f{m}{2} + \\f{m}{4} + ⋯ = 2m$.)</em>',
    '<strong>Volte a $n$.</strong> Como $m = lg n$:'
    + '$$T(n) = S(lg n) = Θ(log n)$$',
    '<strong>Confira pela expansão direta.</strong> '
    + '$T(n) = log n + log n^{1/2} + log n^{1/4} + ⋯ '
    + '= log n\\p{1 + \\f{1}{2} + \\f{1}{4} + ⋯} = 2 log n$. ✓'
  ],
  r: '$Θ(log n)$ — com $n = 2^m$ vira $S(m) = S(m/2) + m = Θ(m)$.' },

{ id: 'L1-64c', n: 64, sub: 'c', s: 3, t: 'recorrencia', d: 1, p: 'alta', g: ['telescópica', 'prova-Q1'],
  e: '<p>Resolva: $$T(n) = T(n−1) + 3n + 2$$</p>',
  sol: [
    '<strong>Subtrativa com $a = 1$ — soma telescópica.</strong>',
    '$$T(n) = T(0) + \\S{i=1}{n}(3i + 2) = T(0) + 3\\S{i=1}{n} i + 2n$$'
    + '$$= T(0) + 3·\\f{n(n+1)}{2} + 2n = \\f{3}{2}n^2 + \\f{7}{2}n + T(0)$$',
    '$$T(n) = Θ(n^2)$$',
    '<em>Curiosidade: o polinômio resultante é essencialmente o mesmo do pior caso do insertion '
    + 'sort (itens 24f e 24g) — e não por acaso: aquela análise também soma uma série '
    + 'aritmética.</em>'
  ],
  r: '$Θ(n^2)$ — telescópica sobre uma série aritmética.' },

{ id: 'L1-64d', n: 64, sub: 'd', s: 3, t: 'recorrencia', d: 1, p: 'alta', g: ['telescópica', 'prova-Q1'],
  e: '<p>Resolva: $$T(n) = T(n−1) + n$$</p>',
  sol: [
    '<strong>Telescópica.</strong>'
    + '$$T(n) = T(0) + \\S{i=1}{n} i = T(0) + \\f{n(n+1)}{2} = Θ(n^2)$$',
    '$$T(n) = Θ(n^2)$$',
    '<strong>Onde aparece no curso:</strong> é o <em>pior caso</em> do Quick-sort e do k-ésimo '
    + 'menor elemento — quando o particionamento sempre elimina um único elemento. '
    + 'Vale reconhecer de imediato.'
  ],
  r: '$Θ(n^2)$ — é o pior caso do Quick-sort.' },

{ id: 'L1-64e', n: 64, sub: 'e', s: 3, t: 'recorrencia', d: 2, p: 'alta', g: ['teorema-mestre', 'prova-Q1'],
  e: '<p>Resolva: $$T(n) = 2T(n/2) + lg(n)$$</p>',
  h: 'Compare $lg n$ com $n^{log_2 2}$. É polinomialmente menor?',
  sol: [
    '$a = 2$, $b = 2$, $f(n) = lg n$. E $n^{log_2 2} = n$.',
    '<strong>Compare.</strong> $f(n) = lg n$ é <em>muito</em> menor que $n$ — e é '
    + '<strong>polinomialmente</strong> menor: $lg n = O(n^{1−ε})$ para qualquer '
    + '$ε < 1$ (por exemplo $ε = \\f{1}{2}$, pois $lg n = O(\\r{n})$ ✓).',
    '<strong>Caso 1:</strong> as folhas dominam.'
    + '$$T(n) = Θ(n)$$',
    '<strong>Confira pela árvore.</strong> As $n$ folhas custam $Θ(1)$ cada, totalizando '
    + '$Θ(n)$. O nível $i$ custa $2^i·lg\\f{n}{2^i}$, que cresce até dominar nas folhas. '
    + 'A soma é $Θ(n)$. ✓',
    '<em>Note o contraste com o item (f): trocar $lg n$ por $n lg n$ faz o Teorema Mestre '
    + 'deixar de funcionar.</em>'
  ],
  r: '$Θ(n)$ — caso 1, pois $lg n = O(n^{1−ε})$.' },

{ id: 'L1-64f', n: 64, sub: 'f', s: 3, t: 'recorrencia', d: 3, p: 'alta', g: ['árvore', 'limitação', 'prova-Q1'],
  e: '<p>Resolva: $$T(n) = 2T(n/2) + n lg(n)$$</p>',
  h: 'Este é o exemplo de limitação do Teorema Mestre que o slide 02 apresenta.',
  sol: [
    '<strong>O Teorema Mestre NÃO se aplica.</strong> $n^{log_2 2} = n$, e $f(n) = n lg n$ é '
    + 'assintoticamente maior que $n$ — mas não <em>polinomialmente</em>: não existe '
    + '$ε > 0$ com $n lg n = Ω(n^{1+ε})$, porque $\\f{n lg n}{n^{1+ε}} = \\f{lg n}{n^ε} → 0$.',
    'Cai na lacuna entre os casos 2 e 3.',
    '<strong>Árvore de recursão.</strong> No nível $i$: $2^i$ nós de tamanho $\\f{n}{2^i}$, '
    + 'custo local $\\f{n}{2^i}·lg\\f{n}{2^i}$ cada. Custo do nível:'
    + '$$2^i·\\f{n}{2^i}·lg\\f{n}{2^i} = n\\p{lg n − i}$$',
    '<strong>Some os $lg n$ níveis.</strong>'
    + '$$T(n) = \\S{i=0}{lg n − 1} n(lg n − i) = n\\S{k=1}{lg n} k '
    + '= n·\\f{lg n(lg n + 1)}{2} = Θ\\p{n lg^2 n}$$',
    '$$T(n) = Θ\\p{n lg^2 n}$$',
    '<em>Confere com a extensão do Cormen 4.6-2 (item 60): $f = Θ(n^{log_b a} lg^k n)$ com '
    + '$k = 1$ dá $T = Θ(n^{log_b a} lg^{k+1} n) = Θ(n lg^2 n)$. ✓</em>',
    '<strong>É o exemplo de limitação do slide 02 e deve estar decorado</strong> — aparece com '
    + 'frequência justamente porque expõe a fronteira do teorema.'
  ],
  r: '$Θ(n lg^2 n)$. O Teorema Mestre falha — a diferença é só logarítmica.' },

{ id: 'L1-64g', n: 64, sub: 'g', s: 3, t: 'recorrencia', d: 3, p: 'media', g: ['árvore', 'limitação'],
  e: '<p>Resolva: $$T(n) = 2T(n/2) + n lg^2(n)$$</p>',
  sol: [
    '<strong>Mesma situação do item (f)</strong> — o Teorema Mestre não se aplica, porque '
    + '$n lg^2 n$ excede $n^{log_2 2} = n$ apenas por fator polilogarítmico.',
    '<strong>Pela extensão do Cormen 4.6-2 (item 60).</strong> Com '
    + '$f(n) = Θ\\p{n^{log_b a} lg^k n}$ e $k = 2$:'
    + '$$T(n) = Θ\\p{n^{log_b a} lg^{k+1} n} = Θ\\p{n lg^3 n}$$',
    '<strong>Confirmando pela árvore.</strong> Custo do nível $i$: '
    + '$2^i·\\f{n}{2^i}·lg^2\\f{n}{2^i} = n(lg n − i)^2$. Somando:'
    + '$$T(n) = n\\S{k=1}{lg n} k^2 = n·Θ\\p{lg^3 n} = Θ\\p{n lg^3 n}$$'
    + 'usando $\\S{k=1}{m} k^2 = Θ(m^3)$.',
    '$$T(n) = Θ\\p{n lg^3 n}$$',
    '<strong>O padrão.</strong> Em $T(n) = 2T(n/2) + n lg^k n$, cada potência de logaritmo em '
    + '$f$ vira uma potência a mais na resposta: $k → k+1$. '
    + 'Assim (e) → $Θ(n)$, (f) → $Θ(n lg^2 n)$, (g) → $Θ(n lg^3 n)$.'
  ],
  r: '$Θ(n lg^3 n)$ — cada $lg^k$ em $f$ vira $lg^{k+1}$ na solução.' },

{ id: 'L1-64h', n: 64, sub: 'h', s: 3, t: 'recorrencia', d: 1, p: 'alta', g: ['teorema-mestre', 'prova-Q1'],
  e: '<p>Resolva: $$T(n) = 4T(n/2) + n^2$$</p>',
  sol: [
    '$a = 4$, $b = 2$, $f(n) = n^2$. E $n^{log_2 4} = n^2$.',
    '<strong>Empate exato:</strong> $f(n) = Θ\\p{n^{log_b a}}$ — <strong>caso 2</strong>.',
    '$$T(n) = Θ\\p{n^2 lg n}$$',
    '<strong>Esta é exatamente a questão 1(a) da prova de 2026.1</strong> — e também os itens '
    + '67(b), 72(d) e 62(c) desta lista. O professor repete muito, o que é um bom sinal de '
    + 'que vale ter automatizado.'
  ],
  r: '$Θ(n^2 lg n)$ — caso 2. É a Q1(a) da prova de 2026.1.' },

{ id: 'L1-64i', n: 64, sub: 'i', s: 3, t: 'recorrencia', d: 2, p: 'alta', g: ['teorema-mestre', 'prova-Q1'],
  e: '<p>Resolva: $$T(n) = 2T(n/4) + \\r{n}$$</p>',
  sol: [
    '$a = 2$, $b = 4$, $f(n) = \\r{n} = n^{1/2}$.',
    '$$n^{log_b a} = n^{log_4 2} = n^{1/2} = \\r{n}$$',
    '<strong>Empate:</strong> $f(n) = Θ\\p{n^{log_b a}}$ — <strong>caso 2</strong>.',
    '$$T(n) = Θ\\p{\\r{n}·lg n}$$',
    '<em>Idêntico aos itens 54(b) e 62(f).</em>'
  ],
  r: '$Θ(\\r{n} · lg n)$ — caso 2.' },

{ id: 'L1-64j', n: 64, sub: 'j', s: 3, t: 'recorrencia', d: 3, p: 'media', g: ['mudança-variável'],
  e: '<p>Resolva: $$T(n) = T\\p{\\r{n}} + 1$$</p>',
  h: 'Quantas vezes se pode tirar a raiz de $n$ antes de chegar a 2?',
  sol: [
    '<strong>Intuição direta.</strong> Tirar a raiz quadrada <em>divide o expoente por 2</em>. '
    + 'Escrevendo $n = 2^m$, a sequência de tamanhos é '
    + '$2^m, 2^{m/2}, 2^{m/4}, …$ — o expoente cai pela metade a cada passo. '
    + 'Chega-se ao caso base quando o expoente vira 1, após $lg m$ passos.',
    '<strong>Formalmente, por mudança de variável.</strong> Faça $n = 2^m$ e '
    + '$S(m) = T(2^m)$:'
    + '$$S(m) = S\\p{\\f{m}{2}} + 1$$',
    'Teorema Mestre: $a = 1$, $b = 2$, $f(m) = 1$, e $m^{log_2 1} = 1 = f(m)$ — caso 2.'
    + '$$S(m) = Θ(lg m)$$',
    '<strong>Volte a $n$.</strong> Como $m = lg n$:'
    + '$$T(n) = Θ(lg lg n)$$',
    '<strong>Quão devagar isso cresce.</strong> Para $n = 2^{65536}$ — número maior que a '
    + 'quantidade de átomos no universo — $lg lg n = 16$. É uma das funções de crescimento '
    + 'mais lento que aparecem em algoritmos.'
  ],
  r: '$Θ(lg lg n)$ — com $n = 2^m$ vira $S(m) = S(m/2) + 1$.' },

/* ---- Item 65: método da substituição ------------------------------------ */

{ id: 'L1-65a', n: 65, sub: 'a', s: 3, t: 'recorrencia', d: 2, p: 'alta', g: ['substituição', 'slide-02'],
  e: '<p>Aplique o método da substituição para mostrar que $T(n) = O(g(n))$:</p>'
   + '<p>$$T(n) = 2T(n/2) + n, \\qquad g(n) = n log n$$</p>',
  sol: [
    '<strong>Palpite:</strong> $T(n) ≤ c·n log n$ para algum $c > 0$.',
    '<strong>Hipótese de indução</strong> aplicada a $\\f{n}{2}$: '
    + '$T\\p{\\f{n}{2}} ≤ c·\\f{n}{2}·log\\f{n}{2}$.',
    '<strong>Passo.</strong> Substituindo na recorrência:'
    + '$$T(n) ≤ 2\\p{c\\f{n}{2}log\\f{n}{2}} + n = cn·log\\f{n}{2} + n$$'
    + '$$= cn(log n − log 2) + n = cn log n − cn + n \\t{ (base 2)}$$'
    + '$$= cn log n − (c − 1)n$$',
    '<strong>Conclusão.</strong> Para termos $T(n) ≤ cn log n$, basta que '
    + '$(c − 1)n ≥ 0$, isto é <strong>$c ≥ 1$</strong>.',
    'Escolhendo $c$ grande o bastante para também cobrir o caso base (por exemplo $c = 2$ com '
    + '$n_0 = 2$), a indução se sustenta e $T(n) = O(n log n)$. ∎',
    '<em>É a demonstração modelo do slide 02 — vale saber reproduzir de memória.</em>'
  ],
  r: 'Fecha com $c ≥ 1$: $T(n) ≤ cn log n − (c−1)n$.' },

{ id: 'L1-65b', n: 65, sub: 'b', s: 3, t: 'recorrencia', d: 3, p: 'media', g: ['substituição', 'deslocamento'],
  e: '<p>Aplique o método da substituição para mostrar que $T(n) = O(g(n))$:</p>'
   + '<p>$$T(n) = 2T\\p{\\f{n}{2} + k} + n, \\quad k > 0, \\qquad g(n) = n log n$$</p>',
  h: 'O deslocamento $+k$ não muda a classe — mas a indução precisa absorvê-lo. Tente '
   + '$c(n − a)log(n − a)$.',
  sol: [
    '<strong>Por que a classe não muda.</strong> $\\f{n}{2} + k = Θ\\p{\\f{n}{2}}$, pelo '
    + 'item 31. Assintoticamente é a mesma recorrência do item (a), logo esperamos '
    + '$O(n log n)$.',
    '<strong>Palpite fortalecido.</strong> Tome $T(n) ≤ c(n − a)log(n − a)$, com constantes '
    + '$c > 0$ e $a > 0$ a determinar. Subtrair $a$ é o que permite absorver o deslocamento.',
    '<strong>Passo.</strong> Aplicando a hipótese a $\\f{n}{2} + k$:'
    + '$$T(n) ≤ 2c\\p{\\f{n}{2} + k − a}log\\p{\\f{n}{2} + k − a} + n$$',
    '<strong>Escolha $a = 2k$.</strong> Então $\\f{n}{2} + k − a = \\f{n}{2} − k '
    + '= \\f{n − 2k}{2} = \\f{n − a}{2}$, e a expressão fica'
    + '$$T(n) ≤ 2c·\\f{n − a}{2}·log\\f{n − a}{2} + n = c(n−a)\\p{log(n−a) − 1} + n$$'
    + '$$= c(n−a)log(n−a) − c(n−a) + n$$',
    '<strong>Conclusão.</strong> Para $T(n) ≤ c(n−a)log(n−a)$ basta que '
    + '$c(n − a) ≥ n$, ou seja $c ≥ \\f{n}{n − a}$. Como $\\f{n}{n−a} → 1$, qualquer '
    + '$c ≥ 2$ funciona para $n ≥ 2a = 4k$.',
    'Tomando $c = 2$, $a = 2k$ e $n_0 = 4k$, a indução fecha. E como '
    + '$(n − a)log(n − a) = O(n log n)$, conclui-se $T(n) = O(n log n)$. ∎',
    '<strong>A técnica geral.</strong> Deslocamentos constantes no argumento se absorvem '
    + 'trocando $n$ por $n − a$ no palpite, com $a$ escolhido para fazer o argumento da '
    + 'recursão virar exatamente $\\f{n−a}{b}$. É a mesma ideia do item 52.'
  ],
  r: '$O(n log n)$. Use o palpite $c(n−a)log(n−a)$ com $a = 2k$; fecha com $c ≥ 2$.' },

{ id: 'L1-65c', n: 65, sub: 'c', s: 3, t: 'recorrencia', d: 2, p: 'media', g: ['substituição', 'limite-frouxo'],
  e: '<p>Aplique o método da substituição para mostrar que $T(n) = O(g(n))$:</p>'
   + '<p>$$T(n) = 4T(n/2) + n, \\qquad g(n) = n^3$$</p>',
  h: 'Este limite é verdadeiro mas frouxo. A indução vai fechar com folga.',
  sol: [
    '<strong>Palpite:</strong> $T(n) ≤ c·n^3$.',
    '<strong>Passo.</strong>'
    + '$$T(n) ≤ 4c\\p{\\f{n}{2}}^3 + n = 4c·\\f{n^3}{8} + n = \\f{c}{2}n^3 + n$$',
    '<strong>Conclusão.</strong> Para $T(n) ≤ cn^3$ basta que '
    + '$\\f{c}{2}n^3 + n ≤ cn^3$, isto é $n ≤ \\f{c}{2}n^3$, que vale para $c ≥ 2$ e '
    + '$n ≥ 1$. A indução fecha com <strong>$c = 2$</strong>. ∎',
    '<strong>Mas o limite é frouxo.</strong> Note que sobrou muita folga: '
    + '$\\f{c}{2}n^3$ é apenas metade de $cn^3$. Isso é sinal de que o limite verdadeiro é '
    + 'bem menor.',
    'De fato, pelo Teorema Mestre ($n^{log_2 4} = n^2$, $f(n) = n = O(n^{2−1})$, caso 1) a '
    + 'resposta justa é $$T(n) = Θ(n^2)$$'
    + 'É o que o item (d) pede a seguir.',
    '<strong>A lição do par (c)/(d):</strong> a substituição <em>verifica</em> um palpite, '
    + 'mas não avisa se ele é frouxo. Quando a indução fecha com folga enorme, desconfie e '
    + 'tente um limite menor.'
  ],
  r: '$O(n^3)$ fecha com $c = 2$ — mas é frouxo: o limite justo é $Θ(n^2)$.' },

{ id: 'L1-65d', n: 65, sub: 'd', s: 3, t: 'recorrencia', d: 2, p: 'alta', g: ['substituição', 'fortalecer'],
  e: '<p>Aplique o método da substituição para mostrar que $T(n) = O(g(n))$:</p>'
   + '<p>$$T(n) = 4T(n/2) + n, \\qquad g(n) = n^2$$</p>',
  h: 'O palpite ingênuo $cn^2$ vai falhar por pouco. Fortaleça a hipótese.',
  sol: [
    '<strong>Tentativa ingênua.</strong> Palpite $T(n) ≤ cn^2$:'
    + '$$T(n) ≤ 4c\\p{\\f{n}{2}}^2 + n = cn^2 + n$$'
    + '<strong>Falha!</strong> Obtivemos $cn^2 + n$, que é <em>maior</em> que $cn^2$. '
    + 'É exatamente a armadilha do slide 02 — não se pode descartar o "+n".',
    '<strong>Fortaleça a hipótese</strong> subtraindo um termo de ordem inferior. '
    + 'Novo palpite: $T(n) ≤ cn^2 − dn$, com $c, d > 0$.',
    '<strong>Passo.</strong>'
    + '$$T(n) ≤ 4\\p{c\\p{\\f{n}{2}}^2 − d\\f{n}{2}} + n = 4c·\\f{n^2}{4} − 2dn + n$$'
    + '$$= cn^2 − 2dn + n = \\p{cn^2 − dn} − dn + n = \\p{cn^2 − dn} − (d − 1)n$$',
    '<strong>Conclusão.</strong> Para $T(n) ≤ cn^2 − dn$ basta que $(d − 1)n ≥ 0$, ou seja '
    + '<strong>$d ≥ 1$</strong>.',
    'Tomando $d = 1$ e $c$ suficientemente grande para o caso base, a indução fecha. '
    + 'E como $cn^2 − n = O(n^2)$, segue $T(n) = O(n^2)$. ∎',
    '<em>Junto com o Teorema Mestre (caso 1), que dá $Ω(n^2)$, conclui-se $T(n) = Θ(n^2)$ — '
    + 'o limite justo.</em>'
  ],
  r: '$O(n^2)$. O palpite $cn^2$ falha; fortaleça para $cn^2 − dn$ com $d ≥ 1$.' },

{ id: 'L1-65e', n: 65, sub: 'e', s: 3, t: 'recorrencia', d: 1, p: 'alta', g: ['substituição', 'telescópica'],
  e: '<p>Aplique o método da substituição para mostrar que $T(n) = O(g(n))$:</p>'
   + '<p>$$T(n) = T(n−1) + n, \\qquad g(n) = n^2$$</p>',
  sol: [
    '<strong>Palpite:</strong> $T(n) ≤ c·n^2$.',
    '<strong>Passo.</strong> Aplicando a hipótese a $n − 1$:'
    + '$$T(n) ≤ c(n−1)^2 + n = c\\p{n^2 − 2n + 1} + n = cn^2 − 2cn + c + n$$'
    + '$$= cn^2 − \\p{2c n − c − n} = cn^2 − \\p{(2c − 1)n − c}$$',
    '<strong>Conclusão.</strong> Para $T(n) ≤ cn^2$ basta que $(2c − 1)n − c ≥ 0$. '
    + 'Com $c = 1$: $n − 1 ≥ 0$, verdadeiro para todo $n ≥ 1$.',
    'Logo $c = 1$ e $n_0 = 1$ servem (ajustando $c$ se necessário para o caso base), e '
    + '$T(n) = O(n^2)$. ∎',
    '<strong>Confira pela telescópica.</strong> '
    + '$T(n) = T(0) + \\S{i=1}{n} i = T(0) + \\f{n(n+1)}{2} = Θ(n^2)$ — o limite é justo. ✓'
  ],
  r: 'Fecha com $c = 1$. E pela telescópica o limite é justo: $Θ(n^2)$.' },

/* ---- Itens 66 a 72: árvore, mestre e recorrências especiais ------------- */

{ id: 'L1-66a', n: 66, sub: 'a', s: 3, t: 'recorrencia', d: 2, p: 'alta', g: ['árvore', 'teorema-mestre'],
  e: '<p>Mostre a árvore de recursão e encontre os limites assintóticos. '
   + 'Verifique com o método de substituição.</p>'
   + '<p>$$T(n) = 2T(n/4) + Θ(n^2)$$</p>',
  sol: [
    '<strong>Árvore.</strong> Nível $i$: $2^i$ nós de tamanho $\\f{n}{4^i}$, custo local '
    + '$\\p{\\f{n}{4^i}}^2 = \\f{n^2}{16^i}$ cada. Custo do nível:'
    + '$$2^i·\\f{n^2}{16^i} = \\p{\\f{2}{16}}^i n^2 = \\p{\\f{1}{8}}^i n^2$$',
    '<strong>Soma.</strong> Razão $\\f{1}{8} < 1$ — geométrica decrescente, limitada pela '
    + 'infinita:'
    + '$$T(n) < n^2\\S{i=0}{∞}\\p{\\f{1}{8}}^i = n^2·\\f{1}{1 − 1/8} = \\f{8}{7}n^2$$',
    '<strong>Folhas.</strong> $2^{log_4 n} = n^{log_4 2} = \\r{n}$, contribuindo '
    + '$Θ(\\r{n})$ — desprezível diante de $n^2$.',
    '$$T(n) = Θ(n^2)$$'
    + '<em>(Teorema Mestre: $n^{log_4 2} = \\r{n}$, e $n^2 = Ω(n^{0{,}5+ε})$; regularidade '
    + '$2\\p{\\f{n}{4}}^2 = \\f{n^2}{8} ≤ \\f{1}{8}n^2$ ✓ — caso 3.)</em>',
    '<strong>Verificação por substituição.</strong> Palpite $T(n) ≤ cn^2$:'
    + '$$T(n) ≤ 2c\\p{\\f{n}{4}}^2 + dn^2 = \\f{c}{8}n^2 + dn^2 = \\p{\\f{c}{8} + d}n^2$$'
    + 'Fecha se $\\f{c}{8} + d ≤ c$, isto é $c ≥ \\f{8d}{7}$. ✓ ∎'
  ],
  r: '$Θ(n^2)$ — série geométrica de razão $1/8$; o custo da raiz domina.' },

{ id: 'L1-66b', n: 66, sub: 'b', s: 3, t: 'recorrencia', d: 2, p: 'alta', g: ['árvore', 'teorema-mestre'],
  e: '<p>Mostre a árvore de recursão e encontre os limites assintóticos. '
   + 'Verifique com substituição.</p>'
   + '<p>$$T(n) = 2T(n/2) + n^3$$</p>',
  sol: [
    '<strong>Árvore.</strong> Nível $i$: $2^i$ nós de tamanho $\\f{n}{2^i}$, custo local '
    + '$\\f{n^3}{8^i}$. Custo do nível:'
    + '$$2^i·\\f{n^3}{8^i} = \\p{\\f{1}{4}}^i n^3$$',
    '<strong>Soma.</strong> Razão $\\f{1}{4} < 1$:'
    + '$$T(n) < n^3·\\f{1}{1 − 1/4} = \\f{4}{3}n^3$$',
    '<strong>Folhas.</strong> $2^{log_2 n} = n$, contribuindo $Θ(n)$ — desprezível.',
    '$$T(n) = Θ(n^3)$$'
    + '<em>(Teorema Mestre: $n^{log_2 2} = n$, $n^3 = Ω(n^{1+2})$, regularidade '
    + '$2\\p{\\f{n}{2}}^3 = \\f{n^3}{4} ≤ \\f{1}{4}n^3$ ✓ — caso 3.)</em>',
    '<strong>Verificação.</strong> Palpite $T(n) ≤ cn^3$: '
    + '$T(n) ≤ 2c\\f{n^3}{8} + n^3 = \\p{\\f{c}{4} + 1}n^3$, que é $≤ cn^3$ se '
    + '$c ≥ \\f{4}{3}$. ✓ ∎'
  ],
  r: '$Θ(n^3)$ — caso 3, razão $1/4$.' },

{ id: 'L1-66c', n: 66, sub: 'c', s: 3, t: 'recorrencia', d: 2, p: 'alta', g: ['árvore', 'slide-02'],
  e: '<p>Mostre a árvore de recursão e encontre os limites assintóticos. '
   + 'Verifique com substituição.</p>'
   + '<p>$$T(n) = 3T(n/4) + n$$</p>',
  sol: [
    '<strong>Árvore.</strong> Nível $i$: $3^i$ nós de tamanho $\\f{n}{4^i}$, custo local '
    + '$\\f{n}{4^i}$. Custo do nível:'
    + '$$3^i·\\f{n}{4^i} = \\p{\\f{3}{4}}^i n$$',
    '<strong>Soma.</strong> Razão $\\f{3}{4} < 1$ — geométrica decrescente:'
    + '$$T(n) < n·\\f{1}{1 − 3/4} = 4n$$',
    '<strong>Folhas.</strong> $3^{log_4 n} = n^{log_4 3} ≈ n^{0{,}79}$, contribuindo '
    + '$Θ(n^{0{,}79})$ — menos que $n$.',
    '$$T(n) = Θ(n)$$'
    + '<em>(Teorema Mestre: $n^{log_4 3} ≈ n^{0{,}79}$, e $n = Ω(n^{0{,}79+ε})$; regularidade '
    + '$3·\\f{n}{4} = \\f{3}{4}n ≤ \\f{3}{4}n$ ✓ com $c = \\f{3}{4}$ — caso 3.)</em>',
    '<strong>Verificação.</strong> Palpite $T(n) ≤ cn$: '
    + '$T(n) ≤ 3c\\f{n}{4} + n = \\p{\\f{3c}{4} + 1}n$, que é $≤ cn$ se '
    + '$1 ≤ \\f{c}{4}$, isto é $c ≥ 4$. ✓ ∎',
    '<em>Compare com o exemplo do slide 02, $T(n) = 3T(n/4) + cn^2$, que dá $Θ(n^2)$ — '
    + 'mesma estrutura de árvore, custo local diferente.</em>'
  ],
  r: '$Θ(n)$ — caso 3, razão $3/4$. Substituição fecha com $c ≥ 4$.' },

{ id: 'L1-66d', n: 66, sub: 'd', s: 3, t: 'recorrencia', d: 3, p: 'alta', g: ['árvore', 'assimétrica'],
  e: '<p>Mostre a árvore de recursão e encontre os limites assintóticos. '
   + 'Verifique com substituição.</p>'
   + '<p>$$T(n) = T(n/2) + T(n/3) + n$$</p>',
  h: 'Os tamanhos somam menos que $n$. O que isso faz com o custo por nível?',
  sol: [
    '<strong>Teorema Mestre não se aplica</strong> — tamanhos diferentes.',
    '<strong>Custo por nível.</strong> Os subproblemas do primeiro nível somam '
    + '$\\f{n}{2} + \\f{n}{3} = \\f{5n}{6} < n$. Como a fração se repete a cada nível, '
    + 'o custo do nível $i$ é'
    + '$$\\p{\\f{5}{6}}^i n$$',
    '<strong>Soma.</strong> Razão $\\f{5}{6} < 1$ — geométrica <em>decrescente</em>:'
    + '$$T(n) ≤ n\\S{i=0}{∞}\\p{\\f{5}{6}}^i = n·\\f{1}{1 − 5/6} = 6n$$'
    + '$$T(n) = O(n)$$',
    '<strong>Limite inferior.</strong> O nível 0 sozinho custa $n$, logo $T(n) = Ω(n)$.',
    '$$T(n) = Θ(n)$$',
    '<strong>Verificação por substituição.</strong> Palpite $T(n) ≤ cn$:'
    + '$$T(n) ≤ c\\f{n}{2} + c\\f{n}{3} + n = \\f{5c}{6}n + n = \\p{\\f{5c}{6} + 1}n$$'
    + 'Fecha se $\\f{5c}{6} + 1 ≤ c$, isto é $1 ≤ \\f{c}{6}$, ou seja '
    + '<strong>$c ≥ 6$</strong>. ✓ ∎',
    '<strong>O critério geral.</strong> Em $T(n) = \\S{} T(α_i n) + n$, se '
    + '$\\S{}α_i < 1$ a solução é $Θ(n)$; se $\\S{}α_i = 1$ é $Θ(n log n)$ (item 64a); '
    + 'se $\\S{}α_i > 1$ é superlinear. Aqui $\\f{1}{2} + \\f{1}{3} = \\f{5}{6} < 1$.'
  ],
  r: '$Θ(n)$ — as frações somam $5/6 < 1$, gerando série geométrica decrescente. $c ≥ 6$.' },

{ id: 'L1-66e', n: 66, sub: 'e', s: 3, t: 'recorrencia', d: 3, p: 'media', g: ['árvore', 'mista'],
  e: '<p>Mostre a árvore de recursão e encontre os limites assintóticos.</p>'
   + '<p>$$T(n) = T(n/2) + T(n−k) + 1, \\t{ onde } k \\t{ é constante, } 0 < k < n$$</p>',
  h: 'Um ramo divide, o outro subtrai. Qual domina?',
  sol: [
    '<strong>Recorrência mista</strong> — um ramo divide por 2, o outro subtrai a constante $k$. '
    + 'O Teorema Mestre não se aplica.',
    '<strong>Qual ramo domina.</strong> O ramo $T(n−k)$ encolhe <em>muito</em> mais devagar: '
    + 'ele gera uma cadeia de profundidade $\\f{n}{k} = Θ(n)$, enquanto o ramo $T(n/2)$ tem '
    + 'profundidade apenas $log_2 n$.',
    '<strong>Limite inferior.</strong> Considere só o caminho que sempre escolhe $T(n−k)$: '
    + 'é uma cadeia de $\\f{n}{k}$ nós, cada um custando 1. Logo'
    + '$$T(n) = Ω\\p{\\f{n}{k}} = Ω(n)$$',
    '<strong>Limite superior.</strong> Cada nó da cadeia principal dispara também um ramo '
    + '$T(n/2)$. Se $U(n)$ é a solução, uma cota grosseira é notar que a árvore tem '
    + 'profundidade $Θ(n)$ e cada nível pode dobrar — o que daria $O(2^n)$. '
    + 'Mas o ramo $T(n/2)$ satura rapidamente: seu próprio custo é $O(n)$ no máximo.',
    '<strong>Solução por substituição.</strong> Palpite $T(n) ≤ cn$:'
    + '$$T(n) ≤ c\\f{n}{2} + c(n − k) + 1 = cn + \\p{\\f{cn}{2} − ck + 1}$$'
    + 'Para fechar precisaríamos $\\f{cn}{2} − ck + 1 ≤ 0$, ou seja $\\f{n}{2} ≤ k$ — '
    + 'falso para $n$ grande. <strong>O palpite linear não fecha.</strong>',
    '<strong>Palpite correto: $T(n) = Θ\\p{n^{?}}$.</strong> Tente $T(n) ≤ cn^2$:'
    + '$$T(n) ≤ c\\f{n^2}{4} + c(n−k)^2 + 1 = c\\p{\\f{n^2}{4} + n^2 − 2kn + k^2} + 1$$'
    + '$$= cn^2 + c\\p{\\f{n^2}{4} − 2kn + k^2} + 1$$'
    + 'O termo $\\f{n^2}{4}$ é positivo e cresce, logo <strong>também não fecha</strong>.',
    '<strong>A resposta.</strong> Nenhum polinômio limita esta recorrência. Como cada nó da '
    + 'cadeia de comprimento $n/k$ contribui com um subproblema $T(n/2)$ independente, '
    + 'a solução é <strong>exponencial</strong>. Mais precisamente, dominada pela recorrência '
    + '$T(n) ≈ T(n−k) + T(n/2)$, cujo crescimento é superpolinomial.',
    '<strong>Cota segura para a prova:</strong> $$T(n) = Ω(n) \\t{ e } T(n) = O\\p{2^{n/k}}$$'
    + 'com a solução exata não admitindo forma fechada simples. '
    + '<em>Se este item cair, o esperado é o raciocínio — identificar que o ramo subtrativo '
    + 'domina e que a recorrência não é polinomial — mais que uma fórmula fechada.</em>'
  ],
  r: 'Não é polinomial. $Ω(n)$ pela cadeia subtrativa; superpolinomial porque cada um dos '
   + '$n/k$ nós dispara um ramo $T(n/2)$.' },

{ id: 'L1-67a', n: 67, sub: 'a', s: 3, t: 'recorrencia', d: 1, p: 'alta', g: ['teorema-mestre', 'prova-Q1'],
  e: '<p>Usando o método mestre, resolva: $$T(n) = 4T(n/2) + n$$</p>',
  sol: [
    '$a = 4$, $b = 2$, $f(n) = n$. E $n^{log_2 4} = n^2$.',
    'Compare: $f(n) = n = O\\p{n^{2−ε}}$ com $ε = 1$ ✓ — as folhas dominam, '
    + '<strong>caso 1</strong>.',
    '$$T(n) = Θ(n^2)$$'
  ],
  r: '$Θ(n^2)$ — caso 1.' },

{ id: 'L1-67b', n: 67, sub: 'b', s: 3, t: 'recorrencia', d: 1, p: 'alta', g: ['teorema-mestre', 'prova-Q1'],
  e: '<p>Usando o método mestre, resolva: $$T(n) = 4T(n/2) + n^2$$</p>',
  sol: [
    '$a = 4$, $b = 2$, $f(n) = n^2$. E $n^{log_2 4} = n^2$.',
    '<strong>Empate exato:</strong> $f(n) = Θ\\p{n^{log_b a}}$ — <strong>caso 2</strong>.',
    '$$T(n) = Θ\\p{n^2 lg n}$$',
    '<em>É a questão 1(a) da prova de 2026.1.</em>'
  ],
  r: '$Θ(n^2 lg n)$ — caso 2. É a Q1(a) da prova.' },

{ id: 'L1-67c', n: 67, sub: 'c', s: 3, t: 'recorrencia', d: 1, p: 'alta', g: ['teorema-mestre', 'prova-Q1'],
  e: '<p>Usando o método mestre, resolva: $$T(n) = 4T(n/2) + n^3$$</p>',
  sol: [
    '$a = 4$, $b = 2$, $f(n) = n^3$. E $n^{log_2 4} = n^2$.',
    'Compare: $f(n) = n^3 = Ω\\p{n^{2+ε}}$ com $ε = 1$ ✓.',
    '<strong>Regularidade:</strong> $4\\p{\\f{n}{2}}^3 = \\f{n^3}{2} ≤ c·n^3$ com '
    + '$c = \\f{1}{2} < 1$ ✓',
    '<strong>Caso 3:</strong> $$T(n) = Θ(n^3)$$',
    '<strong>O trio 67(a)-(b)-(c)</strong> é um exercício de calibração: mesmos $a$ e $b$, '
    + 'logo o mesmo $n^{log_b a} = n^2$, e $f$ variando de $n$ a $n^3$ passa pelos três casos '
    + 'em ordem. Vale fazer os três seguidos.'
  ],
  r: '$Θ(n^3)$ — caso 3, regularidade $c = 1/2$.' },

{ id: 'L1-68a', n: 68, sub: 'a', s: 3, t: 'recorrencia', d: 2, p: 'alta', g: ['teorema-mestre', 'prova-Q1'],
  e: '<p>O método mestre resolve? Em caso positivo, forneça a solução; caso contrário, '
   + 'forneça o motivo e resolva por outro método.</p>'
   + '<p>$$T(n) = 2T(n/2) + log n$$</p>',
  sol: [
    '<strong>SIM, resolve.</strong> $a = 2$, $b = 2$, $f(n) = log n$, e $n^{log_2 2} = n$.',
    'Compare: $log n$ é <strong>polinomialmente</strong> menor que $n$ — vale '
    + '$log n = O\\p{n^{1−ε}}$ com, por exemplo, $ε = \\f{1}{2}$ (pois $log n = O(\\r{n})$ ✓).',
    '<strong>Caso 1:</strong> $$T(n) = Θ(n)$$',
    '<em>Cuidado com o reflexo errado: a presença de um logaritmo em $f(n)$ não impede o '
    + 'teorema. O que impede é o logaritmo estar <em>junto</em> do termo crítico, como no '
    + 'item (d).</em>'
  ],
  r: 'Resolve. $Θ(n)$ — caso 1.' },

{ id: 'L1-68b', n: 68, sub: 'b', s: 3, t: 'recorrencia', d: 2, p: 'alta', g: ['teorema-mestre'],
  e: '<p>O método mestre resolve? $$T(n) = 2T(n/4) + log n$$</p>',
  sol: [
    '<strong>SIM, resolve.</strong> $a = 2$, $b = 4$, $f(n) = log n$, e '
    + '$n^{log_4 2} = n^{1/2} = \\r{n}$.',
    'Compare: $log n = O\\p{n^{1/2 − ε}}$ com, digamos, $ε = \\f{1}{4}$ — pois '
    + '$log n = O(n^{1/4})$ ✓. Polinomialmente menor.',
    '<strong>Caso 1:</strong> $$T(n) = Θ\\p{\\r{n}}$$'
  ],
  r: 'Resolve. $Θ(\\r{n})$ — caso 1.' },

{ id: 'L1-68c', n: 68, sub: 'c', s: 3, t: 'recorrencia', d: 2, p: 'alta', g: ['teorema-mestre'],
  e: '<p>O método mestre resolve? $$T(n) = T(n/2) + n log n$$</p>',
  sol: [
    '<strong>SIM, resolve.</strong> $a = 1$, $b = 2$, $f(n) = n log n$, e '
    + '$n^{log_2 1} = n^0 = 1$.',
    'Compare: $n log n = Ω\\p{n^{0+ε}}$ com, por exemplo, $ε = 1$ ✓ — enormemente maior '
    + 'que a constante 1.',
    '<strong>Regularidade:</strong> '
    + '$1·\\f{n}{2}·log\\f{n}{2} ≤ \\f{1}{2}·n log n$, com $c = \\f{1}{2} < 1$ ✓ '
    + '(o lado esquerdo é ainda menor, pois $log\\f{n}{2} < log n$).',
    '<strong>Caso 3:</strong> $$T(n) = Θ(n log n)$$',
    '<em>Intuição: $n log n + \\f{n}{2}log\\f{n}{2} + ⋯$ é dominado pelo primeiro termo, '
    + 'porque cada termo é menos da metade do anterior.</em>'
  ],
  r: 'Resolve. $Θ(n log n)$ — caso 3, regularidade $c = 1/2$.' },

{ id: 'L1-68d', n: 68, sub: 'd', s: 3, t: 'recorrencia', d: 3, p: 'alta', g: ['teorema-mestre', 'limitação', 'prova-Q1'],
  e: '<p>O método mestre resolve? $$T(n) = 2T(n/2) + n log n$$</p>',
  sol: [
    '<strong>NÃO resolve.</strong> $a = 2$, $b = 2$, e $n^{log_2 2} = n$, com '
    + '$f(n) = n log n$.',
    '<em>Não é caso 2:</em> $n log n ≠ Θ(n)$, pois a razão é $log n → ∞$.<br>'
    + '<em>Não é caso 1:</em> $f$ é maior, não menor.<br>'
    + '<em>Não é caso 3:</em> exigiria $n log n = Ω(n^{1+ε})$ para algum $ε > 0$, mas '
    + '$\\f{n log n}{n^{1+ε}} = \\f{log n}{n^ε} → 0$ para todo $ε > 0$.',
    '<strong>O motivo:</strong> $f(n)$ excede $n^{log_b a}$ apenas por um fator '
    + '<strong>logarítmico</strong>, não polinomial. É a lacuna entre os casos 2 e 3.',
    '<strong>Resolva pela árvore.</strong> Custo do nível $i$: '
    + '$2^i·\\f{n}{2^i}·lg\\f{n}{2^i} = n(lg n − i)$. Somando os $lg n$ níveis:'
    + '$$T(n) = n\\S{k=1}{lg n} k = n·\\f{lg n(lg n+1)}{2} = Θ\\p{n lg^2 n}$$',
    '$$T(n) = Θ\\p{n lg^2 n}$$',
    '<strong>É o exemplo de limitação do slide 02</strong>, e idêntico ao item 64(f). '
    + 'Aparece muito — tenha decorado.'
  ],
  r: 'Não resolve (diferença só logarítmica). Pela árvore: $Θ(n lg^2 n)$.' },

{ id: 'L1-68e', n: 68, sub: 'e', s: 3, t: 'recorrencia', d: 2, p: 'alta', g: ['teorema-mestre', 'assimétrica'],
  e: '<p>O método mestre resolve? $$T(n) = T(n/2) + T(n/3) + n$$</p>',
  sol: [
    '<strong>NÃO resolve.</strong> O motivo é estrutural: o Teorema Mestre exige a forma '
    + '$aT(n/b)$, com <em>todos</em> os subproblemas do <strong>mesmo tamanho</strong>. '
    + 'Aqui há dois tamanhos distintos, $\\f{n}{2}$ e $\\f{n}{3}$.',
    '<strong>Resolva pela árvore.</strong> As frações somam '
    + '$\\f{1}{2} + \\f{1}{3} = \\f{5}{6} < 1$, logo o custo do nível $i$ é '
    + '$\\p{\\f{5}{6}}^i n$ — série geométrica decrescente:'
    + '$$T(n) ≤ n·\\f{1}{1 − 5/6} = 6n ⇒ T(n) = O(n)$$'
    + 'E o nível 0 dá $T(n) = Ω(n)$.',
    '$$T(n) = Θ(n)$$',
    '<em>Ver o item 66(d), que é o mesmo exercício com a verificação por substituição '
    + '($c ≥ 6$).</em>'
  ],
  r: 'Não resolve (tamanhos diferentes). Pela árvore: $Θ(n)$, pois $1/2 + 1/3 < 1$.' },

{ id: 'L1-68f', n: 68, sub: 'f', s: 3, t: 'recorrencia', d: 3, p: 'media', g: ['teorema-mestre', 'exponencial'],
  e: '<p>O método mestre resolve? $$T(n) = 2T(n/2) + 2^n log n$$</p>'
   + '<p class="xs muted">Leitura do enunciado: "$2^n log n$" como impresso na lista. '
   + 'Se a intenção era $2n log n$, ver a nota no fim da solução.</p>',
  h: 'Um $f(n)$ exponencial é polinomialmente maior que qualquer $n^k$ — com folga enorme.',
  sol: [
    '<strong>SIM, resolve — pelo caso 3.</strong> $a = 2$, $b = 2$, e $n^{log_2 2} = n$, '
    + 'com $f(n) = 2^n log n$.',
    '<em>Condição de crescimento:</em> $2^n log n$ é exponencial, logo é '
    + '$Ω\\p{n^{1+ε}}$ para <strong>qualquer</strong> $ε > 0$ — com folga imensa. ✓',
    '<em>Regularidade:</em> precisamos de $c < 1$ com '
    + '$2·2^{n/2}·log\\f{n}{2} ≤ c·2^n log n$. Como'
    + '$$\\f{2·2^{n/2}log(n/2)}{2^n log n} < \\f{2·2^{n/2}}{2^n} = \\f{2}{2^{n/2}} → 0$$'
    + 'a razão fica menor que qualquer $c < 1$ para $n$ grande. ✓',
    '<strong>Caso 3:</strong> $$T(n) = Θ\\p{2^n log n}$$',
    '<strong>Intuição.</strong> O custo local é tão dominante que a recursão é irrelevante: '
    + 'a raiz sozinha responde por praticamente todo o trabalho.',
    '<strong>Nota sobre a leitura alternativa.</strong> Se o enunciado fosse '
    + '$f(n) = 2n log n$ (com "2n" em vez de "$2^n$"), então $f(n) = Θ(n log n)$ e '
    + 'recairíamos exatamente no item (d): o teorema <em>não</em> se aplicaria, e a resposta '
    + 'seria $Θ(n lg^2 n)$. Vale confirmar a grafia — mas note que, se fosse esse o caso, '
    + 'o item seria redundante com (d).'
  ],
  r: 'Resolve. $Θ(2^n log n)$ — caso 3, com folga. (Se fosse $2n log n$, cairia no item d: '
   + '$Θ(n lg^2 n)$.)' },

{ id: 'L1-68g', n: 68, sub: 'g', s: 3, t: 'recorrencia', d: 3, p: 'media', g: ['teorema-mestre', 'exponencial'],
  e: '<p>O método mestre resolve? $$T(n) = 2T(n/2) + 2^n$$</p>',
  sol: [
    '<strong>SIM, resolve — caso 3.</strong> $a = 2$, $b = 2$, $n^{log_2 2} = n$, '
    + 'com $f(n) = 2^n$.',
    '<em>Crescimento:</em> $2^n = Ω\\p{n^{1+ε}}$ para qualquer $ε > 0$ ✓ — exponencial domina '
    + 'todo polinômio.',
    '<em>Regularidade:</em> $$\\f{a·f(n/b)}{f(n)} = \\f{2·2^{n/2}}{2^n} '
    + '= \\f{2}{2^{n/2}} → 0$$'
    + 'logo qualquer $c < 1$ serve para $n$ suficientemente grande. ✓',
    '<strong>Caso 3:</strong> $$T(n) = Θ\\p{2^n}$$',
    '<strong>Verificação pela árvore.</strong> O nível 0 custa $2^n$; o nível 1 custa '
    + '$2·2^{n/2}$, que é <em>drasticamente</em> menor. A soma é dominada pela raiz, e de fato '
    + '$2^n + 2·2^{n/2} + 4·2^{n/4} + ⋯ = Θ(2^n)$. ✓',
    '<em>Este par (f)/(g) mostra que o caso 3 é generoso: qualquer $f$ que cresça '
    + 'exponencialmente satisfaz as duas condições sem esforço.</em>'
  ],
  r: 'Resolve. $Θ(2^n)$ — caso 3, a raiz domina tudo.' },

{ id: 'L1-69', n: 69, s: 3, t: 'recorrencia', d: 2, p: 'alta', g: ['substituição', 'omega'],
  e: '<p>Seja $T$ uma função que leva números naturais em números reais. Suponha que $T$ '
   + 'satisfaz a recorrência $$T(n) = 2T\\p{\\f{n}{2}} + 7n + 2$$ '
   + 'Mostre que $T(n) = Ω(n log n)$.</p>',
  h: 'Atenção: pede-se $Ω$, não $O$. A desigualdade da indução inverte de sentido.',
  sol: [
    '<strong>O que provar.</strong> Existem $c > 0$ e $n_0$ tais que '
    + '$T(n) ≥ c·n log n$ para todo $n ≥ n_0$. '
    + '<em>Note que a desigualdade é $≥$, não $≤$ — é uma prova de $Ω$.</em>',
    '<strong>Hipótese de indução</strong> aplicada a $\\f{n}{2}$: '
    + '$T\\p{\\f{n}{2}} ≥ c·\\f{n}{2}·log\\f{n}{2}$.',
    '<strong>Passo.</strong> Substituindo na recorrência (a desigualdade se preserva porque o '
    + 'coeficiente 2 é positivo):'
    + '$$T(n) ≥ 2\\p{c\\f{n}{2}log\\f{n}{2}} + 7n + 2 = cn·log\\f{n}{2} + 7n + 2$$'
    + '$$= cn(log n − 1) + 7n + 2 \\t{ (base 2)}$$'
    + '$$= cn log n − cn + 7n + 2 = cn log n + (7 − c)n + 2$$',
    '<strong>Conclusão.</strong> Para termos $T(n) ≥ cn log n$, basta que '
    + '$(7 − c)n + 2 ≥ 0$. Isso vale para qualquer <strong>$c ≤ 7$</strong>.',
    'Escolha $c = 1$ (bem folgado) e $n_0 = 2$, ajustando para o caso base. '
    + 'Logo $T(n) = Ω(n log n)$. ∎',
    '<strong>Observação — o limite é justo.</strong> Pelo Teorema Mestre ($a = 2$, $b = 2$, '
    + '$f(n) = 7n + 2 = Θ(n) = Θ(n^{log_2 2})$ — caso 2), na verdade '
    + '$T(n) = Θ(n log n)$. O exercício pede só o $Ω$, que é a metade mais fácil.',
    '<strong>O contraste pedagógico com o item 65(a).</strong> Lá, provando $O$, sobrava o '
    + 'termo $−(c−1)n$ e precisávamos de $c ≥ 1$. Aqui, provando $Ω$, sobra $+(7−c)n$ e '
    + 'precisamos de $c ≤ 7$. Em provas de $O$ busca-se $c$ <em>grande</em>; em provas de $Ω$, '
    + '$c$ <em>pequeno</em>.'
  ],
  r: 'Fecha com qualquer $c ≤ 7$: sobra $+(7−c)n + 2 ≥ 0$. (De fato $T(n) = Θ(n log n)$.)' },

{ id: 'L1-70a', n: 70, sub: 'a', s: 3, t: 'recorrencia', d: 3, p: 'baixa', g: ['indução', 'potência-de-dois'],
  e: '<p>Considere a recorrência</p>'
   + '$$T(n) = \\c{1}{se n = 1}{T(n−1) + 1}{se n > 1 é ímpar}{3T(n/2)}{se n > 1 é par}$$'
   + '<p><strong>(a)</strong> Prove que, sempre que $n$ é uma potência de dois, '
   + '$T(n) = n^{log_2 3}$.</p>',
  h: 'Se $n$ é potência de 2, o ramo ímpar nunca é usado. Indução sobre o expoente.',
  sol: [
    '<strong>Observação-chave.</strong> Se $n = 2^k$ com $k ≥ 1$, então $n$ é par, e '
    + '$\\f{n}{2} = 2^{k−1}$ também é potência de 2. Logo, partindo de uma potência de 2, '
    + '<strong>o ramo ímpar nunca é acionado</strong> — só o caso par, até chegar a '
    + '$n = 1$. A recorrência efetiva é $T(n) = 3T(n/2)$.',
    '<strong>Prova por indução em $k$, onde $n = 2^k$.</strong>',
    '<strong>Base ($k = 0$, $n = 1$).</strong> $T(1) = 1$ pela definição. E '
    + '$n^{log_2 3} = 1^{log_2 3} = 1$. ✓',
    '<strong>Hipótese.</strong> Suponha $T(2^{k−1}) = \\p{2^{k−1}}^{log_2 3}$ para algum '
    + '$k ≥ 1$.',
    '<strong>Passo.</strong> Como $n = 2^k$ é par (pois $k ≥ 1$), aplica-se o terceiro ramo:'
    + '$$T(2^k) = 3·T\\p{2^{k−1}} = 3·\\p{2^{k−1}}^{log_2 3}$$',
    'Agora use a identidade $3 = 2^{log_2 3}$:'
    + '$$= 2^{log_2 3}·2^{(k−1)·log_2 3} = 2^{log_2 3·(1 + k − 1)} = 2^{k·log_2 3}$$',
    'E finalmente, como $2^{k·log_2 3} = \\p{2^k}^{log_2 3} = n^{log_2 3}$:'
    + '$$T(n) = n^{log_2 3} ∎$$',
    '<strong>Interpretação.</strong> $log_2 3 ≈ 1{,}585$, logo $T(n) ≈ n^{1{,}585}$ — '
    + 'é exatamente a solução de $T(n) = 3T(n/2)$ pelo Teorema Mestre (caso 1, sem termo '
    + 'aditivo), e a mesma classe do algoritmo de Karatsuba.'
  ],
  r: 'Indução em $k$ com $n = 2^k$: o ramo ímpar nunca ocorre, e $3·(2^{k−1})^{log_2 3} = '
   + '(2^k)^{log_2 3}$ usando $3 = 2^{log_2 3}$.' },

{ id: 'L1-70b', n: 70, sub: 'b', s: 3, t: 'aberta', d: 3, p: 'baixa', g: ['indução', 'monotonicidade'],
  e: '<p>Para a recorrência do item 70:</p>'
   + '$$T(n) = \\c{1}{se n = 1}{T(n−1) + 1}{se n > 1 é ímpar}{3T(n/2)}{se n > 1 é par}$$'
   + '<p><strong>(b)</strong> Prove que $T$ é crescente.</p>',
  h: 'Indução forte: mostre $T(n) > T(n−1)$ tratando separadamente $n$ ímpar e $n$ par.',
  sol: [
    '<strong>O que provar.</strong> Que $T(n) > T(n−1)$ para todo $n > 1$. '
    + 'Vamos usar indução forte, assumindo que $T$ é crescente em todos os valores menores '
    + 'que $n$ (e, em particular, que $T(m) ≥ 1$ para todo $m ≥ 1$, o que segue da definição).',
    '<strong>Caso 1: $n$ ímpar.</strong> Então, pela definição,'
    + '$$T(n) = T(n−1) + 1 > T(n−1) ✓$$'
    + 'Imediato — o ramo ímpar é crescente por construção.',
    '<strong>Caso 2: $n$ par.</strong> Então $n − 1$ é ímpar. Se $n − 1 > 1$, aplica-se o '
    + 'ramo ímpar a ele:'
    + '$$T(n−1) = T(n−2) + 1$$'
    + 'Precisamos mostrar $T(n) = 3T\\p{\\f{n}{2}} > T(n−2) + 1$.',
    'Como $n$ é par, $n − 2$ também é. Aplicando o ramo par a $n−2$: '
    + '$T(n−2) = 3T\\p{\\f{n}{2} − 1}$. Substituindo, basta mostrar'
    + '$$3T\\p{\\f{n}{2}} > 3T\\p{\\f{n}{2} − 1} + 1$$',
    'Pela hipótese de indução, $T$ é crescente abaixo de $n$, logo '
    + '$T\\p{\\f{n}{2}} ≥ T\\p{\\f{n}{2} − 1} + 1$ (os valores de $T$ são inteiros — '
    + 'verifica-se por indução que $T$ assume só valores inteiros positivos). Então'
    + '$$3T\\p{\\f{n}{2}} ≥ 3T\\p{\\f{n}{2} − 1} + 3 > 3T\\p{\\f{n}{2} − 1} + 1 ✓$$',
    '<strong>Caso base residual: $n = 2$.</strong> $T(2) = 3T(1) = 3 > 1 = T(1)$ ✓',
    'Nos dois casos $T(n) > T(n−1)$, logo $T$ é estritamente crescente. ∎',
    '<em>O item (b) serve de lema para o item (c), que precisa comparar $T$ em pontos que não '
    + 'são potências de 2 com os valores conhecidos nas potências de 2.</em>'
  ],
  r: '$n$ ímpar: imediato, $T(n) = T(n−1)+1$. $n$ par: reduza ao ramo par em $n−2$ e use a '
   + 'hipótese com o fator 3.' },

{ id: 'L1-70c', n: 70, sub: 'c', s: 3, t: 'aberta', d: 3, p: 'baixa', g: ['indução', 'crescimento'],
  e: '<p>Para a recorrência do item 70:</p>'
   + '<p><strong>(c)</strong> Prove que existe $k ≥ 1$ tal que '
   + '$k · n^{log_2 3} ≥ (2n)^{log_2 3}$ para todo $n ∈ ℕ$.</p>',
  h: 'Isto é álgebra pura — nem precisa da recorrência.',
  sol: [
    '<strong>Simplifique o lado direito.</strong> Pela propriedade $(ab)^c = a^c b^c$:'
    + '$$(2n)^{log_2 3} = 2^{log_2 3} · n^{log_2 3} = 3 · n^{log_2 3}$$'
    + 'usando a identidade $2^{log_2 3} = 3$.',
    '<strong>A desigualdade fica.</strong>'
    + '$$k·n^{log_2 3} ≥ 3·n^{log_2 3}$$',
    'Como $n^{log_2 3} > 0$ para todo $n ≥ 1$, podemos dividir ambos os lados por ele:'
    + '$$k ≥ 3$$',
    '<strong>Conclusão.</strong> Qualquer $k ≥ 3$ satisfaz a desigualdade para todo '
    + '$n ∈ ℕ$ — em particular <strong>$k = 3$</strong>, que dá igualdade. ∎',
    '<strong>Para que serve este resultado.</strong> Ele é o passo que permite estender a '
    + 'conclusão do item (a) — válida só nas potências de 2 — para <em>todo</em> $n$.',
    'O argumento completo: dado um $n$ qualquer, existe uma potência de 2 entre $n$ e $2n$, '
    + 'digamos $2^j$ com $n ≤ 2^j < 2n$. Pelo item (b), $T$ é crescente, logo '
    + '$T(n) ≤ T(2^j)$. Pelo item (a), $T(2^j) = \\p{2^j}^{log_2 3} < (2n)^{log_2 3} '
    + '= 3n^{log_2 3}$. Portanto'
    + '$$T(n) = O\\p{n^{log_2 3}} \\t{ para todo } n$$'
    + 'Essa é a técnica padrão para passar de "potências exatas de $b$" para "todo $n$" — '
    + 'a mesma que o Cormen usa na seção 4.6 ao provar o Teorema Mestre.'
  ],
  r: '$k = 3$, pois $(2n)^{log_2 3} = 2^{log_2 3}n^{log_2 3} = 3n^{log_2 3}$.' },

{ id: 'L1-71', n: 71, s: 3, t: 'recorrencia', d: 3, p: 'baixa', g: ['indução', 'potência-de-dois'],
  e: '<p>Considere a recorrência</p>'
   + '$$U(n) = \\c{1}{se n = 1}{2U(n−1)}{se n > 1 é ímpar}{3U(n/2)}{se n > 1 é par}$$'
   + '<p>Prove que, sempre que $n$ é uma potência de dois, $U(n) = n^{log_2 3}$.</p>',
  h: 'Mesma observação do item 70(a): partindo de potência de 2, o ramo ímpar nunca é usado.',
  sol: [
    '<strong>Observação-chave.</strong> Se $n = 2^k$ com $k ≥ 1$, então $n$ é par e '
    + '$\\f{n}{2} = 2^{k−1}$ também é potência de 2. A cadeia de chamadas é '
    + '$2^k → 2^{k−1} → ⋯ → 2^1 → 1$, sempre pelo ramo par. '
    + '<strong>O ramo ímpar ($2U(n−1)$) nunca é acionado</strong>, e a recorrência efetiva é '
    + '$U(n) = 3U(n/2)$ — <em>exatamente</em> a mesma do item 70(a).',
    '<strong>Prova por indução em $k$, com $n = 2^k$.</strong>',
    '<strong>Base ($k = 0$, $n = 1$).</strong> $U(1) = 1$, e $1^{log_2 3} = 1$. ✓',
    '<strong>Hipótese.</strong> $U(2^{k−1}) = \\p{2^{k−1}}^{log_2 3}$.',
    '<strong>Passo.</strong> Como $2^k$ é par para $k ≥ 1$:'
    + '$$U(2^k) = 3·U(2^{k−1}) = 3·\\p{2^{k−1}}^{log_2 3} = 2^{log_2 3}·2^{(k−1)log_2 3}$$'
    + '$$= 2^{k·log_2 3} = \\p{2^k}^{log_2 3} = n^{log_2 3} ∎$$',
    '<strong>Por que os itens 70 e 71 são o mesmo exercício nas potências de 2.</strong> '
    + 'Porque o ramo ímpar é inalcançável a partir de uma potência de 2, e ele é a única '
    + 'diferença entre $T$ e $U$ ($+1$ versus $×2$).',
    '<strong>Mas as funções diferem fora das potências de 2.</strong> Por exemplo: '
    + '$T(3) = T(2) + 1 = 3 + 1 = 4$, enquanto $U(3) = 2U(2) = 2·3 = 6$. '
    + 'Nos ímpares, $U$ cresce multiplicativamente e $T$ apenas aditivamente — '
    + 'o que faz $U$ crescer bem mais rápido no geral.',
    '<em>A moral: provar algo "para potências de $b$" pode esconder diferenças reais entre '
    + 'recorrências. É por isso que o item 70(c) existe — para justificar a extensão a todo '
    + '$n$.</em>'
  ],
  r: 'Indução em $k$: o ramo ímpar nunca ocorre, e $U(n) = 3U(n/2)$ dá $n^{log_2 3}$ — '
   + 'igual ao item 70(a).' },

{ id: 'L1-72a', n: 72, sub: 'a', s: 3, t: 'recorrencia', d: 2, p: 'alta', g: ['teorema-mestre', 'prova-Q1'],
  e: '<p>Apresente o comportamento assintótico: $$T(n) = 2T(n/2) + lg(n)$$</p>',
  sol: [
    '$a = 2$, $b = 2$, $n^{log_2 2} = n$, e $f(n) = lg n$.',
    '$lg n$ é polinomialmente menor que $n$ ($lg n = O(n^{1−ε})$, ex.: $ε = 1/2$) — '
    + '<strong>caso 1</strong>.',
    '$$T(n) = Θ(n)$$',
    '<em>Idêntico aos itens 64(e) e 68(a). O item 72 repete integralmente as recorrências '
    + '64(e), (f), (g) e (h) — aproveite para conferir se as respostas saem no automático.</em>'
  ],
  r: '$Θ(n)$ — caso 1.' },

{ id: 'L1-72b', n: 72, sub: 'b', s: 3, t: 'recorrencia', d: 3, p: 'alta', g: ['árvore', 'limitação', 'prova-Q1'],
  e: '<p>Apresente o comportamento assintótico: $$T(n) = 2T(n/2) + n lg(n)$$</p>',
  sol: [
    '<strong>Teorema Mestre não se aplica</strong> — $n lg n$ excede $n^{log_2 2} = n$ apenas '
    + 'por fator logarítmico.',
    'Pela árvore: $lg n$ níveis, custo do nível $i$ igual a $n(lg n − i)$, somando'
    + '$$T(n) = n\\S{k=1}{lg n}k = Θ\\p{n lg^2 n}$$',
    '$$T(n) = Θ\\p{n lg^2 n}$$',
    '<em>Idêntico aos itens 64(f) e 68(d) — e é o exemplo de limitação do slide 02.</em>'
  ],
  r: '$Θ(n lg^2 n)$ — o teorema falha; resolva pela árvore.' },

{ id: 'L1-72c', n: 72, sub: 'c', s: 3, t: 'recorrencia', d: 3, p: 'media', g: ['árvore', 'limitação'],
  e: '<p>Apresente o comportamento assintótico: $$T(n) = 2T(n/2) + n lg^2(n)$$</p>',
  sol: [
    '<strong>Teorema Mestre não se aplica</strong>, pela mesma razão do item (b).',
    'Pela extensão do Cormen 4.6-2 (item 60), com $f(n) = Θ(n^{log_b a} lg^k n)$ e $k = 2$:'
    + '$$T(n) = Θ\\p{n^{log_b a} lg^{k+1} n} = Θ\\p{n lg^3 n}$$',
    '$$T(n) = Θ\\p{n lg^3 n}$$',
    '<em>Idêntico ao item 64(g).</em>'
  ],
  r: '$Θ(n lg^3 n)$.' },

{ id: 'L1-72d', n: 72, sub: 'd', s: 3, t: 'recorrencia', d: 1, p: 'alta', g: ['teorema-mestre', 'prova-Q1'],
  e: '<p>Apresente o comportamento assintótico: $$T(n) = 4T(n/2) + n^2$$</p>',
  sol: [
    '$a = 4$, $b = 2$, $n^{log_2 4} = n^2 = f(n)$ — <strong>empate, caso 2</strong>.',
    '$$T(n) = Θ\\p{n^2 lg n}$$',
    '<strong>É a questão 1(a) da prova de 2026.1</strong>, e aparece também nos itens 64(h), '
    + '67(b) e 62(c) desta lista. Quatro ocorrências na mesma lista — é o sinal mais claro de '
    + 'que esta recorrência precisa sair sem pensar.'
  ],
  r: '$Θ(n^2 lg n)$ — caso 2. Aparece 4× na lista e na Q1(a) da prova.' },

/* ═══════════════════════════════ SEÇÃO 4 — Projeto de algoritmos ═════════ */

{ id: 'L1-73a', n: 73, sub: 'a', s: 4, t: 'aberta', d: 2, p: 'baixa', g: ['strings', 'contagem'],
  e: '<p>Considere o pseudocódigo do algoritmo ingênuo para casamento de cadeias:</p>'
   + '<pre class="pseudo"><span class="ln">NAIVE-STRING-MATCHER(texto T, padrao P){</span>'
   + '<span class="ln">  n = T.length;</span>'
   + '<span class="ln">  m = P.length;</span>'
   + '<span class="ln">  <span class="kw">for</span> s = 0 <span class="kw">to</span> n−m <span class="kw">do</span></span>'
   + '<span class="ln">    <span class="kw">if</span> P[1 .. m] == T[s+1 .. s+m]</span>'
   + '<span class="ln">      print "Padrao encontrado em" s</span>'
   + '<span class="ln">}</span></pre>'
   + '<p><strong>(a)</strong> Conte as comparações que o algoritmo realiza com o padrão '
   + '$P = 0001$ dentro do texto $T = 000010001010001$.</p>',
  h: 'Para cada deslocamento, conte quantos caracteres são comparados antes de falhar. '
   + 'A comparação para na primeira diferença.',
  sol: [
    '<strong>Dados.</strong> $T = 000010001010001$ com $n = 15$; $P = 0001$ com $m = 4$. '
    + 'Os deslocamentos vão de $s = 0$ a $s = n − m = 11$ — são 12 tentativas.',
    '<strong>Índices de $T$ (base 1):</strong>'
    + '<div class="tw"><table><thead><tr><th>pos</th>'
    + '<th class="num">1</th><th class="num">2</th><th class="num">3</th><th class="num">4</th>'
    + '<th class="num">5</th><th class="num">6</th><th class="num">7</th><th class="num">8</th>'
    + '<th class="num">9</th><th class="num">10</th><th class="num">11</th><th class="num">12</th>'
    + '<th class="num">13</th><th class="num">14</th><th class="num">15</th></tr></thead>'
    + '<tbody><tr><td><strong>T</strong></td>'
    + '<td class="num">0</td><td class="num">0</td><td class="num">0</td><td class="num">0</td>'
    + '<td class="num">1</td><td class="num">0</td><td class="num">0</td><td class="num">0</td>'
    + '<td class="num">1</td><td class="num">0</td><td class="num">1</td><td class="num">0</td>'
    + '<td class="num">0</td><td class="num">0</td><td class="num">1</td></tr></tbody></table></div>',
    '<strong>Tentativa por tentativa.</strong> Em cada $s$, compara-se $P[1..4]$ com '
    + '$T[s+1..s+4]$, parando na primeira diferença.'
    + '<div class="tw"><table><thead><tr><th class="num">s</th><th>T[s+1..s+4]</th>'
    + '<th>P = 0001</th><th class="num">comparações</th><th>resultado</th></tr></thead><tbody>'
    + '<tr><td class="num">0</td><td class="mono">0001</td><td class="mono">0001</td><td class="num">4</td><td>✓ casou</td></tr>'
    + '<tr><td class="num">1</td><td class="mono">0010</td><td class="mono">0001</td><td class="num">4</td><td>falha na 4ª</td></tr>'
    + '<tr><td class="num">2</td><td class="mono">0100</td><td class="mono">0001</td><td class="num">2</td><td>falha na 2ª</td></tr>'
    + '<tr><td class="num">3</td><td class="mono">1000</td><td class="mono">0001</td><td class="num">1</td><td>falha na 1ª</td></tr>'
    + '<tr><td class="num">4</td><td class="mono">0001</td><td class="mono">0001</td><td class="num">4</td><td>✓ casou</td></tr>'
    + '<tr><td class="num">5</td><td class="mono">0010</td><td class="mono">0001</td><td class="num">4</td><td>falha na 4ª</td></tr>'
    + '<tr><td class="num">6</td><td class="mono">0101</td><td class="mono">0001</td><td class="num">2</td><td>falha na 2ª</td></tr>'
    + '<tr><td class="num">7</td><td class="mono">1010</td><td class="mono">0001</td><td class="num">1</td><td>falha na 1ª</td></tr>'
    + '<tr><td class="num">8</td><td class="mono">0100</td><td class="mono">0001</td><td class="num">2</td><td>falha na 2ª</td></tr>'
    + '<tr><td class="num">9</td><td class="mono">1000</td><td class="mono">0001</td><td class="num">1</td><td>falha na 1ª</td></tr>'
    + '<tr><td class="num">10</td><td class="mono">0001</td><td class="mono">0001</td><td class="num">4</td><td>✓ casou</td></tr>'
    + '<tr><td class="num">11</td><td class="mono">001</td><td class="mono">0001</td><td class="num">3</td><td>texto acabou</td></tr>'
    + '</tbody></table></div>',
    '<strong>Total de comparações de caracteres:</strong>'
    + '$$4+4+2+1+4+4+2+1+2+1+4+3 = 32$$',
    '<strong>Ocorrências encontradas:</strong> três, nos deslocamentos $s = 0$, $s = 4$ e '
    + '$s = 10$ (isto é, nas posições 1, 5 e 11 de $T$).',
    '<strong>Nota sobre o deslocamento $s = 11$.</strong> Com $s = 11$ a janela é '
    + '$T[12..15] = 0001$, que <em>casa</em>. Recontando essa linha com a janela correta, '
    + 'são 4 comparações e uma quarta ocorrência. A contagem depende de se o laço vai até '
    + '$s = n − m$ inclusive — e vai. Corrigindo:'
    + '$$4+4+2+1+4+4+2+1+2+1+4+4 = 33 \\t{ comparações, 4 ocorrências}$$',
    '<strong>Resposta: 33 comparações de caracteres, com 4 ocorrências</strong> '
    + '(deslocamentos 0, 4, 10 e 11).',
    '<em>Observação: o pseudocódigo da lista tem um laço interno espúrio '
    + '(<code>for j = 1 to i</code>) com a variável <code>i</code> nunca definida, e imprime '
    + '<code>s−m</code> em vez de <code>s</code>. Tratei como erro de digitação e contei o '
    + 'algoritmo ingênuo padrão (Cormen 32.1).</em>'
  ],
  r: '33 comparações de caracteres; 4 ocorrências, nos deslocamentos 0, 4, 10 e 11.' },

{ id: 'L1-73b', n: 73, sub: 'b', s: 4, t: 'projeto', d: 3, p: 'media', g: ['strings', 'projeto'],
  e: '<p><strong>(b)</strong> Suponha que sabemos que todos os caracteres em um padrão $P$ são '
   + '<strong>diferentes</strong>. Mostre como acelerar o algoritmo '
   + 'NAIVE-STRING-MATCHER para executar em tempo $O(n)$ num texto de tamanho $n$.</p>',
  h: 'Se os caracteres de $P$ são distintos e a comparação falhou na posição $j$, o que você '
   + 'já sabe sobre os deslocamentos intermediários?',
  sol: [
    '<strong>A observação central.</strong> Suponha que, no deslocamento $s$, as primeiras '
    + '$j$ posições casaram e a $(j+1)$-ésima falhou. Isso significa que'
    + '$$T[s+1..s+j] = P[1..j]$$',
    'Como <strong>todos os caracteres de $P$ são distintos</strong>, o caractere $P[1]$ aparece '
    + 'uma única vez em $P$ — na posição 1. Portanto $P[1]$ não pode ocorrer em '
    + '$T[s+2..s+j]$ (que é igual a $P[2..j]$).',
    '<strong>Consequência.</strong> Nenhum dos deslocamentos '
    + '$s+1, s+2, …, s+j−1$ pode dar casamento, porque todos começariam em uma posição '
    + 'de $T$ que já sabemos não conter $P[1]$. <strong>Podemos saltar direto para '
    + '$s + j$.</strong>',
    '<strong>O algoritmo.</strong>'
    + '<pre class="pseudo"><span class="ln"><span class="fnn">MatcherDistintos</span>(T, P)</span>'
    + '<span class="ln">  n ← T.length;  m ← P.length</span>'
    + '<span class="ln">  s ← 0</span>'
    + '<span class="ln">  <span class="kw">while</span> s ≤ n − m <span class="kw">do</span></span>'
    + '<span class="ln">    j ← 0</span>'
    + '<span class="ln">    <span class="kw">while</span> j &lt; m <span class="kw">and</span> T[s+j+1] = P[j+1] <span class="kw">do</span></span>'
    + '<span class="ln">      j ← j + 1</span>'
    + '<span class="ln">    <span class="kw">if</span> j = m <span class="kw">then</span></span>'
    + '<span class="ln">      print "padrão encontrado em" s</span>'
    + '<span class="ln">      s ← s + m            <span class="cm">// salta o padrão inteiro</span></span>'
    + '<span class="ln">    <span class="kw">else if</span> j = 0 <span class="kw">then</span></span>'
    + '<span class="ln">      s ← s + 1            <span class="cm">// falhou na 1ª: avança 1</span></span>'
    + '<span class="ln">    <span class="kw">else</span></span>'
    + '<span class="ln">      s ← s + j            <span class="cm">// salta as j−1 posições inúteis</span></span></pre>',
    '<strong>Análise: por que é $O(n)$.</strong> Use um argumento de <em>potencial</em> — '
    + 'acompanhe a quantidade $s + j$, que é a posição mais à direita já examinada em $T$.',
    'Em cada iteração do laço externo, o laço interno faz $j + 1$ comparações (ou $m$, se '
    + 'casou). E o deslocamento avança de $max(1, j)$ — ou de $m$, se casou.',
    '<em>Se $j = 0$:</em> 1 comparação, $s$ avança 1.<br>'
    + '<em>Se $1 ≤ j < m$:</em> $j+1$ comparações, $s$ avança $j$.<br>'
    + '<em>Se $j = m$:</em> $m$ comparações, $s$ avança $m$.',
    'Nos três casos, o número de comparações é no máximo <strong>duas vezes</strong> o avanço '
    + 'de $s$. Como $s$ só cresce e vai no máximo até $n$, o total de comparações é '
    + '$$≤ 2n = O(n) ∎$$',
    '<strong>Contexto.</strong> Este é o caso especial mais simples da ideia por trás do '
    + 'algoritmo <strong>KMP (Knuth–Morris–Pratt)</strong>, que atinge $O(n + m)$ para '
    + '<em>qualquer</em> padrão, pré-computando quanto se pode saltar após cada falha. '
    + 'Aqui, a hipótese "caracteres distintos" torna esse cálculo trivial: salta-se sempre $j$.'
  ],
  r: 'Ao falhar na posição $j+1$, salte $s ← s + max(1,j)$. Comparações ≤ 2× o avanço de $s$, '
   + 'logo $O(n)$. É o caso mais simples da ideia do KMP.' },

{ id: 'L1-74', n: 74, s: 4, t: 'projeto', d: 2, p: 'media', g: ['pré-processamento', 'counting-sort'],
  e: '<p>Descreva um algoritmo que, dados $n$ inteiros com valores entre 1 e $k$, pré-processe '
   + 'esses inteiros e então (descontado o tempo do pré-processamento) responda perguntas da '
   + 'forma <em>"dados $a$, $b$, quantos dos $n$ inteiros estão no intervalo $[a, b]$"</em> em '
   + 'tempo $O(1)$. O pré-processamento deve ser feito em tempo $O(n + k)$.</p>',
  h: 'Soma de prefixos sobre um histograma.',
  sol: [
    '<strong>A ideia: histograma + soma de prefixos.</strong> É exatamente a primeira metade '
    + 'do Counting Sort (Cormen 8.2).',
    '<strong>Pré-processamento.</strong>'
    + '<pre class="pseudo"><span class="ln"><span class="fnn">PreProcessa</span>(A, n, k)</span>'
    + '<span class="ln">  <span class="kw">for</span> i ← 0 <span class="kw">to</span> k <span class="kw">do</span>       <span class="cm">// O(k)</span></span>'
    + '<span class="ln">    C[i] ← 0</span>'
    + '<span class="ln">  <span class="kw">for</span> j ← 1 <span class="kw">to</span> n <span class="kw">do</span>       <span class="cm">// O(n) — histograma</span></span>'
    + '<span class="ln">    C[A[j]] ← C[A[j]] + 1</span>'
    + '<span class="ln">  <span class="kw">for</span> i ← 1 <span class="kw">to</span> k <span class="kw">do</span>       <span class="cm">// O(k) — soma de prefixos</span></span>'
    + '<span class="ln">    C[i] ← C[i] + C[i−1]</span>'
    + '<span class="ln">  <span class="kw">return</span> C</span></pre>',
    '<strong>Invariante do resultado.</strong> Ao fim, $C[i]$ contém a quantidade de elementos '
    + 'de $A$ com valor <strong>menor ou igual a $i$</strong>. (Depois do segundo laço, $C[i]$ '
    + 'era a contagem de valores <em>iguais</em> a $i$; o terceiro laço acumula.)',
    '<strong>Custo do pré-processamento.</strong> Três laços, de $k+1$, $n$ e $k$ iterações, '
    + 'cada uma $Θ(1)$: $$Θ(n + k) ✓$$',
    '<strong>A consulta.</strong>'
    + '<pre class="pseudo"><span class="ln"><span class="fnn">Consulta</span>(C, a, b)</span>'
    + '<span class="ln">  <span class="kw">if</span> a &gt; b <span class="kw">then return</span> 0</span>'
    + '<span class="ln">  a\' ← <span class="fnn">max</span>(a, 1);  b\' ← <span class="fnn">min</span>(b, k)   <span class="cm">// recorta ao domínio</span></span>'
    + '<span class="ln">  <span class="kw">if</span> a\' &gt; b\' <span class="kw">then return</span> 0</span>'
    + '<span class="ln">  <span class="kw">return</span> C[b\'] − C[a\' − 1]</span></pre>',
    '<strong>Por que funciona.</strong> $C[b]$ conta os elementos $≤ b$ e $C[a−1]$ conta os '
    + '$≤ a−1$, ou seja $< a$. A diferença conta exatamente os que estão em $[a, b]$:'
    + '$$#{j : a ≤ A[j] ≤ b} = C[b] − C[a−1]$$',
    '<strong>Custo da consulta.</strong> Dois acessos a vetor e uma subtração: '
    + '$$Θ(1) ✓$$',
    '<strong>Espaço.</strong> $Θ(k)$ para o vetor $C$.',
    '<strong>Por que $k$ entra no custo.</strong> Este é um algoritmo de '
    + '<em>ordenação/contagem por chave</em>, não por comparação: ele indexa diretamente pelo '
    + 'valor. Isso só é viável quando $k$ é comparável a $n$ — se $k$ fosse, digamos, $2^{32}$, '
    + 'o pré-processamento seria impraticável.'
  ],
  r: 'Histograma + soma de prefixos: $C[i] = #{A[j] ≤ i}$ em $Θ(n+k)$. '
   + 'Consulta: $C[b] − C[a−1]$ em $Θ(1)$.' },

{ id: 'L1-75', n: 75, s: 4, t: 'projeto', d: 3, p: 'media', g: ['pré-processamento', 'prefixos-2d'],
  e: '<p>Descreva um algoritmo que, dados $n$ inteiros com valores de 1 a 10, pré-processe esses '
   + 'inteiros e então responda à pergunta: <em>"dados três inteiros $(i, j, x)$ tais que '
   + '$1 ≤ i ≤ j ≤ n$ e $1 ≤ x ≤ 10$, quantos dos $j − i + 1$ inteiros no intervalo $[i, j]$ '
   + 'têm valor igual a $x$?"</em> O pré-processamento deve ser feito em tempo $O(n)$ e cada '
   + 'consulta respondida em tempo $O(1)$.</p>',
  h: 'Agora o intervalo é de <em>posições</em>, não de valores. E há apenas 10 valores possíveis '
   + '— um número constante.',
  sol: [
    '<strong>A diferença em relação ao item 74.</strong> Lá o intervalo era de <em>valores</em>; '
    + 'aqui é de <em>posições</em>, e o valor $x$ é fixo na consulta. '
    + 'A solução é uma tabela de prefixos <strong>por valor</strong>.',
    '<strong>A estrutura.</strong> Defina uma matriz $P[1..10][0..n]$ onde'
    + '$$P[v][p] = #{q ≤ p : A[q] = v}$$'
    + 'isto é, quantas vezes o valor $v$ aparece no prefixo $A[1..p]$.',
    '<strong>Pré-processamento.</strong>'
    + '<pre class="pseudo"><span class="ln"><span class="fnn">PreProcessa</span>(A, n)</span>'
    + '<span class="ln">  <span class="kw">for</span> v ← 1 <span class="kw">to</span> 10 <span class="kw">do</span></span>'
    + '<span class="ln">    P[v][0] ← 0</span>'
    + '<span class="ln">  <span class="kw">for</span> p ← 1 <span class="kw">to</span> n <span class="kw">do</span></span>'
    + '<span class="ln">    <span class="kw">for</span> v ← 1 <span class="kw">to</span> 10 <span class="kw">do</span>        <span class="cm">// 10 é constante</span></span>'
    + '<span class="ln">      P[v][p] ← P[v][p−1]</span>'
    + '<span class="ln">    P[A[p]][p] ← P[A[p]][p] + 1</span>'
    + '<span class="ln">  <span class="kw">return</span> P</span></pre>',
    '<strong>Custo do pré-processamento.</strong> O laço externo roda $n$ vezes e o interno '
    + '<strong>10 vezes — um número constante, independente de $n$</strong>. Logo'
    + '$$T(n) = 10·n·Θ(1) = Θ(n) ✓$$'
    + '<em>É exatamente por isso que o enunciado fixa o limite superior dos valores em 10: '
    + 'se fosse $k$ genérico, o custo seria $Θ(nk)$.</em>',
    '<strong>A consulta.</strong>'
    + '<pre class="pseudo"><span class="ln"><span class="fnn">Consulta</span>(P, i, j, x)</span>'
    + '<span class="ln">  <span class="kw">return</span> P[x][j] − P[x][i−1]</span></pre>',
    '<strong>Por que funciona.</strong> $P[x][j]$ conta as ocorrências de $x$ em $A[1..j]$, e '
    + '$P[x][i−1]$ conta as em $A[1..i−1]$. A diferença é o número de ocorrências em '
    + '$A[i..j]$:'
    + '$$#{q ∈ [i,j] : A[q] = x} = P[x][j] − P[x][i−1]$$',
    '<strong>Custo da consulta:</strong> dois acessos e uma subtração — $$Θ(1) ✓$$',
    '<strong>Espaço:</strong> $Θ(10n) = Θ(n)$.',
    '<strong>Otimização possível.</strong> Em vez de 10 vetores de prefixos, pode-se guardar, '
    + 'para cada valor $v$, a <em>lista ordenada</em> das posições em que $v$ ocorre, e '
    + 'responder com duas buscas binárias — mas isso custaria $O(log n)$ por consulta, '
    + 'pior que o pedido. A tabela de prefixos é a escolha certa aqui.',
    '<strong>Generalização.</strong> A técnica se chama <em>soma de prefixos</em> e é o '
    + 'protótipo do <em>trade-off espaço × tempo</em>: paga-se $Θ(n)$ de memória e '
    + 'pré-processamento uma vez, para tornar cada uma de (potencialmente muitas) consultas '
    + 'constante.'
  ],
  r: 'Tabela $P[v][p] = $ ocorrências de $v$ em $A[1..p]$, montada em $Θ(10n) = Θ(n)$. '
   + 'Consulta: $P[x][j] − P[x][i−1]$ em $Θ(1)$.' },

{ id: 'L1-76a', n: 76, sub: 'a', s: 4, t: 'projeto', d: 3, p: 'alta', g: ['majoritário', 'projeto', 'slide-03'],
  e: '<p>Um <strong>elemento majoritário</strong> num vetor de inteiros de tamanho $n$ é um '
   + 'inteiro que ocorre em pelo menos $n/2$ posições do vetor. Nem todos os vetores têm um '
   + 'elemento majoritário, mas ele é claramente único se existe.</p>'
   + '<p><strong>(a)</strong> Projete um algoritmo de custo <strong>linear</strong> que '
   + 'identifica o elemento majoritário, se ele existir.</p>',
  h: 'Mantenha um candidato e um contador. Pense no que acontece quando você "cancela" duas '
   + 'ocorrências diferentes.',
  sol: [
    '<strong>Algoritmo de Boyer–Moore (voto majoritário).</strong> Duas varredura, $O(1)$ de '
    + 'memória extra, sem ordenar.',
    '<pre class="pseudo"><span class="hd">Fase 1 — encontrar o candidato</span>'
    + '<span class="ln"><span class="fnn">Candidato</span>(A, n)</span>'
    + '<span class="ln">  cand ← A[1];  cont ← 1</span>'
    + '<span class="ln">  <span class="kw">for</span> i ← 2 <span class="kw">to</span> n <span class="kw">do</span></span>'
    + '<span class="ln">    <span class="kw">if</span> cont = 0 <span class="kw">then</span></span>'
    + '<span class="ln">      cand ← A[i];  cont ← 1</span>'
    + '<span class="ln">    <span class="kw">else if</span> A[i] = cand <span class="kw">then</span></span>'
    + '<span class="ln">      cont ← cont + 1</span>'
    + '<span class="ln">    <span class="kw">else</span></span>'
    + '<span class="ln">      cont ← cont − 1        <span class="cm">// cancela um par</span></span>'
    + '<span class="ln">  <span class="kw">return</span> cand</span></pre>',
    '<pre class="pseudo"><span class="hd">Fase 2 — confirmar</span>'
    + '<span class="ln"><span class="fnn">Majoritario</span>(A, n)</span>'
    + '<span class="ln">  cand ← <span class="fnn">Candidato</span>(A, n)</span>'
    + '<span class="ln">  cont ← 0</span>'
    + '<span class="ln">  <span class="kw">for</span> i ← 1 <span class="kw">to</span> n <span class="kw">do</span></span>'
    + '<span class="ln">    <span class="kw">if</span> A[i] = cand <span class="kw">then</span> cont ← cont + 1</span>'
    + '<span class="ln">  <span class="kw">if</span> cont &gt; n/2 <span class="kw">then return</span> cand</span>'
    + '<span class="ln">  <span class="kw">else return</span> "não existe majoritário"</span></pre>',
    '<strong>Por que a fase 1 funciona — a intuição do cancelamento.</strong> '
    + 'Cada decremento do contador "cancela" uma ocorrência do candidato atual contra uma '
    + 'ocorrência de <em>outro</em> elemento. Se algum valor $M$ ocorre mais de $n/2$ vezes, '
    + 'ele tem mais ocorrências que todos os outros <em>somados</em> — logo não pode ser '
    + 'inteiramente cancelado, e sobra como candidato final.',
    '<strong>Argumento formal (invariante).</strong> Seja, no início da iteração $i$, '
    + '$k$ = valor de <code>cont</code>. O invariante é: <em>o multiconjunto '
    + '$A[1..i−1]$ pode ser particionado em (a) $k$ cópias de <code>cand</code> e '
    + '(b) pares de elementos distintos entre si</em>.',
    '<em>Inicialização:</em> $i = 2$, $k = 1$, e $A[1..1]$ é uma cópia de <code>cand</code> '
    + 'mais zero pares. ✓<br>'
    + '<em>Manutenção:</em> se $A[i] = $ <code>cand</code>, acrescenta-se uma cópia e $k$ sobe. '
    + 'Se $A[i] ≠$ <code>cand</code> e $k > 0$, o novo elemento forma um par com uma cópia de '
    + '<code>cand</code>, e $k$ desce. Se $k = 0$, não há cópias sobrando e $A[i]$ inicia uma '
    + 'nova contagem. ✓<br>'
    + '<em>Término:</em> $A[1..n]$ = $k$ cópias de <code>cand</code> + pares distintos. '
    + 'Se existe $M$ majoritário, $M$ aparece mais de $n/2$ vezes; como cada par contribui com '
    + 'no máximo uma ocorrência de $M$ e os pares cobrem $n − k$ posições, seriam no máximo '
    + '$\\f{n−k}{2}$ ocorrências de $M$ nos pares. Para totalizar mais de $\\f{n}{2}$, '
    + '$M$ precisa estar entre as $k$ cópias — ou seja, $M = $ <code>cand</code>. ∎',
    '<strong>Por que a fase 2 é necessária.</strong> A fase 1 garante apenas que, '
    + '<em>se</em> existe majoritário, ele é o candidato. Ela não garante que o candidato '
    + '<em>seja</em> majoritário. Exemplo: $A = [1, 2, 3]$ devolve candidato 3, que não é '
    + 'majoritário. A confirmação é obrigatória.',
    '<strong>Complexidade.</strong> Duas varreduras de $n$ elementos, custo $Θ(1)$ por '
    + 'elemento:'
    + '$$T(n) = Θ(n)$$'
    + '<strong>Espaço extra:</strong> $Θ(1)$ — apenas duas variáveis. Atende à restrição do '
    + 'slide 03 ("não deve alocar memória extra além da necessária para armazenar $V$ nem '
    + 'deve ordenar $V$").',
    '<strong>Alternativa por divisão e conquista ($O(n log n)$).</strong> Um majoritário de '
    + '$A$ tem de ser majoritário de ao menos uma das metades (se não fosse de nenhuma, teria '
    + '$≤ \\f{n}{4} + \\f{n}{4} = \\f{n}{2}$ ocorrências). Resolva as duas metades, obtendo '
    + 'até dois candidatos, e verifique cada um em $O(n)$:'
    + '$$T(n) = 2T(n/2) + O(n) = O(n log n)$$'
    + 'É o que o item 5 dos exercícios do slide 03 pede — e a pergunta "seria possível em '
    + '$O(n)$?" é respondida por Boyer–Moore acima.'
  ],
  r: 'Boyer–Moore: candidato + contador numa varredura, confirmação em outra. '
   + '$Θ(n)$ tempo, $Θ(1)$ espaço.' },

{ id: 'L1-76b', n: 76, sub: 'b', s: 4, t: 'aberta', d: 2, p: 'media', g: ['majoritário', 'modelo'],
  e: '<p><strong>(b)</strong> Assuma agora que o vetor não contenha inteiros, mas contenha '
   + 'outro tipo de dados que permita <strong>apenas testes de igualdade</strong>. '
   + 'Qual é a complexidade para determinar se o vetor contém um elemento majoritário?</p>',
  h: 'Reveja o algoritmo do item (a): que operações ele realmente usa?',
  sol: [
    '<strong>Resposta: continua $Θ(n)$ — nada muda.</strong>',
    '<strong>Por quê.</strong> Examine as operações que o algoritmo de Boyer–Moore executa '
    + 'sobre os elementos do vetor:',
    '<ul><li>Fase 1: <code>A[i] = cand</code> — um teste de <strong>igualdade</strong>.</li>'
    + '<li>Fase 2: <code>A[i] = cand</code> — outro teste de <strong>igualdade</strong>.</li></ul>',
    'É tudo. O algoritmo <strong>nunca compara por ordem</strong> ($&lt;$, $&gt;$), nunca faz '
    + 'aritmética com os elementos, e nunca os usa como índice. As únicas operações '
    + 'aritméticas são sobre o <em>contador</em>, que é um inteiro interno ao algoritmo.',
    '<strong>Conclusão.</strong> Boyer–Moore funciona sem alteração alguma em qualquer domínio '
    + 'que ofereça teste de igualdade — strings, objetos, cores, o que for. '
    + '$$T(n) = Θ(n), \\t{ com espaço } Θ(1)$$',
    '<strong>O que <em>não</em> funcionaria neste modelo.</strong> Vale notar o contraste, '
    + 'porque é o ponto do exercício:',
    '<ul>'
    + '<li><strong>Ordenar e pegar o elemento do meio</strong> ($O(n log n)$) — exige comparação '
    + 'por ordem. <span class="pill bad">indisponível</span></li>'
    + '<li><strong>Tabela de hash</strong> contando ocorrências ($O(n)$ esperado) — exige uma '
    + 'função de hash, mais que igualdade. <span class="pill warn">talvez</span></li>'
    + '<li><strong>Contagem direta por indexação</strong> (como nos itens 74 e 75) — exige que '
    + 'os elementos sejam inteiros pequenos. <span class="pill bad">indisponível</span></li>'
    + '<li><strong>Boyer–Moore</strong> — só igualdade. <span class="pill ok">funciona</span></li>'
    + '</ul>',
    '<strong>O limite inferior.</strong> $Ω(n)$ é obviamente necessário: sem examinar todo '
    + 'elemento ao menos uma vez, um adversário poderia alterar um elemento não lido e mudar a '
    + 'resposta. Logo $Θ(n)$ é <strong>ótimo</strong>.',
    '<em>A lição de projeto: um algoritmo que usa menos da estrutura do domínio é mais '
    + 'robusto. Boyer–Moore ganha aqui não por ser mais rápido que a ordenação, mas por exigir '
    + 'menos do tipo de dado.</em>'
  ],
  r: 'Continua $Θ(n)$ — Boyer–Moore só usa testes de igualdade. E $Ω(n)$ é obrigatório, '
   + 'logo é ótimo.' }

];
