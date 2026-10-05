/* ==========================================================================
   teoria.js — Módulos 0 a 3.
   Fonte: slides 01, 02 e 03 do Prof. George Lima (IC0004 / UFBA).
   O Módulo 0 não está nos slides: é o pré-requisito matemático pressuposto.

   Convenção de conteúdo: HTML com $matemática inline$ e $$destacada$$,
   processado por AG.tex(). Pseudocódigo via AG.pseudo().
   ========================================================================== */

window.TEORIA = (function () {
  var P = AG.pseudo;

  /* Atalhos de marcação usados com frequência. */
  function def(tag, body)  { return '<div class="callout def"><span class="tag">' + tag + '</span>' + body + '</div>'; }
  function warn(tag, body) { return '<div class="callout warn"><span class="tag">' + tag + '</span>' + body + '</div>'; }
  function tip(tag, body)  { return '<div class="callout tip"><span class="tag">' + tag + '</span>' + body + '</div>'; }
  function exam(body)      { return '<div class="callout exam"><span class="tag">Na prova</span>' + body + '</div>'; }
  function steps(list)     { return '<ol class="steps">' + list.map(function (s) { return '<li><div>' + s + '</div></li>'; }).join('') + '</ol>'; }
  function tbl(head, rows, cap) {
    return '<div class="tw"><table><thead><tr>'
      + head.map(function (h) { return '<th>' + h + '</th>'; }).join('')
      + '</tr></thead><tbody>'
      + rows.map(function (r) {
          return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
        }).join('')
      + '</tbody>' + (cap ? '<caption>' + cap + '</caption>' : '') + '</table></div>';
  }

  return [

/* ======================================================================== M0 */
{
  id: 'm0',
  num: '0',
  titulo: 'Pré-requisitos matemáticos',
  fonte: 'Não está nos slides — é o ferramental pressuposto',
  resumo: 'Logaritmos, somatórios, fatoriais e indução. Nada aqui é "conteúdo da prova", '
        + 'e é exatamente por isso que custa ponto: o erro aparece no meio de uma questão '
        + 'que você sabia resolver.',
  secoes: [

  { id: 'm0-log', titulo: 'Logaritmos', html: [
    '<p>Toda a disciplina mede tempo em logaritmos, porque dividir a entrada pela metade '
    + 'repetidamente é o movimento central de divisão e conquista. As identidades abaixo '
    + 'aparecem <em>dentro</em> de contas de recorrência — você precisa aplicá-las sem pensar.</p>',

    tbl(['Identidade', 'Forma', 'Onde aparece na disciplina'], [
      ['Produto',        '$log_b(xy) = log_b x + log_b y$',            'Abrir $log n!$ em soma de logs'],
      ['Quociente',      '$log_b(x/y) = log_b x − log_b y$',           'O passo $log(n/2) = log n − log 2$ da substituição'],
      ['Potência',       '$log_b(x^a) = a · log_b x$',                 'Comparar $n^{1.5}$ com $n log n$'],
      ['Mudança de base','$log_b x = \\f{log_c x}{log_c b}$',          'Provar que a base só muda a constante'],
      ['Troca de expoente','$a^{log_b n} = n^{log_b a}$',              'É <strong>a</strong> identidade do Teorema Mestre'],
      ['Caso particular','$2^{lg n} = n$',                             'Simplificar folhas de árvore binária'],
      ['Log iterado',    '$lg^{(i)} n$ · $lg^* n$',                    'Cormen 3.2, raramente cobrado']
    ], 'As cinco primeiras cobrem tudo que a Prova 1 exige.'),

    def('Consequência que mais importa',
      '<p>Como $log_b x = log_c x / log_c b$ e $1/log_c b$ é uma <em>constante</em>, '
      + 'a base do logaritmo desaparece dentro de $O$, $Ω$ e $Θ$:</p>'
      + '$$log_2 n = Θ(log_{10} n) = Θ(ln n)$$'
      + '<p>Por isso escrevemos $Θ(log n)$ sem base. Mas atenção: isso vale para o '
      + '<em>logaritmo</em>, não para o expoente. $2^n$ e $3^n$ <strong>não</strong> são '
      + 'da mesma classe, porque $3^n / 2^n = (3/2)^n → ∞$.</p>'),

    warn('Notação usada na disciplina',
      '<p>$lg n$ significa $log_2 n$; $ln n$ é o logaritmo natural; $log n$ sem base, '
      + 'dentro de notação assintótica, é indiferente. Já $lg^2 n$ é $(lg n)^2$ — '
      + 'diferente de $lg lg n$ e de $lg^{(2)} n$. Confundir os dois muda a resposta.</p>'),

    tip('Hierarquia que resolve metade dos exercícios de ordenação',
      '$$1 ≺ log log n ≺ log n ≺ log^2 n ≺ \\r{n} ≺ n ≺ n log n ≺ n^{1.5} ≺ n^2 ≺ n^3 ≺ 2^n ≺ 3^n ≺ n!$$'
      + '<p>Regra prática: qualquer polilogaritmo perde para qualquer potência positiva de $n$; '
      + 'qualquer polinômio perde para qualquer exponencial; e $n!$ cresce mais que $2^n$.</p>'
      + '<p>Formalmente: $(log n)^a = O(n^b)$ para <em>quaisquer</em> $a > 0$ e $b > 0$ — '
      + 'este é o item 26(a) da lista.</p>')
  ].join('') },

  { id: 'm0-somas', titulo: 'Somatórios', html: [
    '<p>A questão 2 da prova é um somatório disfarçado de laço aninhado. Analisar laços '
    + '<em>é</em> somar séries, e as quatro abaixo cobrem praticamente todos os casos.</p>',

    tbl(['Série', 'Fórmula fechada', 'Classe'], [
      ['Constante',   '$\\S{i=1}{n} c = c·n$',                                  '$Θ(n)$'],
      ['Aritmética',  '$\\S{i=1}{n} i = \\f{n(n+1)}{2}$',                       '$Θ(n^2)$'],
      ['Quadrados',   '$\\S{i=1}{n} i^2 = \\f{n(n+1)(2n+1)}{6}$',               '$Θ(n^3)$'],
      ['Potências',   '$\\S{i=1}{n} i^k = Θ(n^{k+1})$',                         '$Θ(n^{k+1})$'],
      ['Geométrica (finita)', '$\\S{i=0}{n} x^i = \\f{x^{n+1} − 1}{x − 1}$, $x ≠ 1$', 'domina o último termo se $x>1$'],
      ['Geométrica (infinita)', '$\\S{i=0}{∞} x^i = \\f{1}{1 − x}$, $|x| < 1$',  '$Θ(1)$'],
      ['Potências de 2', '$\\S{i=0}{n} 2^i = 2^{n+1} − 1$',                      '$Θ(2^n)$'],
      ['Harmônica',   '$H_n = \\S{i=1}{n} \\f{1}{i} = ln n + O(1)$',             '$Θ(log n)$']
    ]),

    def('As duas que decidem tudo',
      '<p><strong>Geométrica decrescente</strong> ($x < 1$): a soma é $Θ(1)$ — um número '
      + 'constante de vezes o primeiro termo. É por isso que, no caso 3 do Teorema Mestre, '
      + 'a <em>raiz</em> da árvore domina.</p>'
      + '<p><strong>Geométrica crescente</strong> ($x > 1$): a soma é $Θ$ do <em>último</em> '
      + 'termo. É por isso que, no caso 1, as <em>folhas</em> dominam.</p>'
      + '<p>Toda a intuição do Teorema Mestre é esta única observação sobre séries geométricas.</p>'),

    '<h4>Somatório aninhado: o padrão da questão 2</h4>',
    '<p>Quando um laço interno depende do índice externo, resolva de dentro para fora:</p>',
    '$$\\S{i=1}{n}\\S{j=1}{i} 1 = \\S{i=1}{n} i = \\f{n(n+1)}{2} = Θ(n^2)$$',
    '<p>Quando o laço interno <em>não</em> depende do externo, ele é um fator constante '
    + 'que sai do somatório:</p>',
    '$$\\S{i=1}{n}\\S{j=1}{i} g(n) = g(n)·\\S{i=1}{n} i = Θ(n^2 · g(n))$$',

    exam('<p>Na Q2 de 2026.1 o laço mais interno é $k ← k·3$ enquanto $k < n$, que executa '
      + '$Θ(log_3 n)$ vezes <strong>independentemente de $i$ e $j$</strong>. Reconhecer essa '
      + 'independência é o que permite tirar $log n$ do somatório:</p>'
      + '$$\\S{i=1}{n}\\S{j=1}{i} Θ(log n) = Θ(log n)·\\f{n(n+1)}{2} = Θ(n^2 log n)$$'),

    tip('Truque para somas que não fecham',
      '<p>Se não há fórmula fechada, limite por cima substituindo todo termo pelo maior: '
      + '$\\S{i=1}{n} f(i) ≤ n · max f(i)$. Costuma ser suficiente para um limite $O$. '
      + 'Para o $Θ$, limite também por baixo usando a metade superior dos termos.</p>')
  ].join('') },

  { id: 'm0-fat', titulo: 'Fatorial, Stirling e a soma telescópica', html: [
    '<p>O fatorial aparece na lista (itens 26f e 30e) e no limite inferior de ordenação por '
    + 'comparação. O que se cobra é um resultado só:</p>',
    '$$lg(n!) = Θ(n lg n)$$',

    def('Por que',
      '<p><strong>Limite superior:</strong> cada um dos $n$ fatores é no máximo $n$, logo '
      + '$n! ≤ n^n$ e portanto $lg(n!) ≤ n lg n$.</p>'
      + '<p><strong>Limite inferior:</strong> a metade superior dos fatores é maior que $n/2$, '
      + 'logo $n! ≥ (n/2)^{n/2}$ e $lg(n!) ≥ \\f{n}{2}(lg n − 1) = Ω(n lg n)$.</p>'
      + '<p>Os dois juntos dão $Θ(n lg n)$. Note que a prova não precisa de Stirling — '
      + 'o argumento de "metade dos fatores" basta, e é mais rápido de escrever na prova.</p>'),

    '<p>A <strong>aproximação de Stirling</strong> dá o valor exato quando se precisa dele:</p>',
    '$$n! = \\r{2πn}\\p{\\f{n}{e}}^n \\p{1 + Θ(1/n)}$$',
    '<p>Dela sai que $n!$ cresce mais rápido que $2^n$ — e, de fato, que qualquer $c^n$.</p>',

    '<h4>Soma telescópica</h4>',
    '<p>É a técnica que fecha as recorrências do tipo $T(n) = T(n−1) + f(n)$. Escreva todas '
    + 'as instâncias e cancele:</p>',
    '$$T(n) − T(0) = \\S{i=1}{n}\\p{T(i) − T(i−1)} = \\S{i=1}{n} f(i)$$',
    tip('Consequência direta',
      '<p>$T(n) = T(n−1) + Θ(n) ⇒ T(n) = Θ(n^2)$ — a soma aritmética.<br>'
      + '$T(n) = T(n−1) + Θ(1) ⇒ T(n) = Θ(n)$.<br>'
      + '$T(n) = T(n−1) + Θ(1/n) ⇒ T(n) = Θ(log n)$ — a harmônica, que fecha o Quick-sort médio.<br>'
      + '$T(n) = T(n−1) + log n ⇒ T(n) = Θ(n log n)$ — e esta é a que caiu em 2025.2.</p>'),

    '<h4>A soma de logaritmos — onde o fatorial encontra a recorrência</h4>',

    '<p>A última linha acima merece a conta inteira, porque ela liga as duas metades desta '
    + 'seção. Telescopando $T(n) = T(n−1) + log n$:</p>',
    '$$T(n) = \\S{i=1}{n} log i$$',

    '<p>E aqui entra a propriedade que resolve: <strong>soma de logaritmos é o logaritmo do '
    + 'produto</strong>. O produto de todos os $i$ de 1 a $n$ é justamente $n!$:</p>',
    '$$\\S{i=1}{n} log i = log\\p{\\P{i=1}{n} i} = log(n!) = Θ(n log n)$$',

    def('O encadeamento, em três passos',
      '<p><strong>1.</strong> Telescópica: $T(n) = T(n−1) + log n$ vira $\\S{i=1}{n} log i$.<br>'
      + '<strong>2.</strong> $log a + log b = log(ab)$, aplicada $n$ vezes, vira $log(n!)$.<br>'
      + '<strong>3.</strong> $lg(n!) = Θ(n lg n)$ — o resultado do começo desta seção.</p>'),

    warn('Não caia no $Θ(log n)$',
      '<p>O erro natural é olhar $T(n) = T(n−1) + log n$, ver "log" e responder $Θ(log n)$. '
      + 'Mas há $n$ níveis de recursão, cada um custando um logaritmo — o custo total é '
      + '$n$ logaritmos, não um. O mesmo raciocínio que faz $T(n−1) + Θ(1)$ dar $Θ(n)$ e não '
      + '$Θ(1)$.</p>'),

    exam('<p><strong>2025.2 Q2(C)</strong>. O enunciado descreve o algoritmo em prosa: '
      + '"descarta-se um elemento da entrada… o tempo gasto para processar a entrada recebida é '
      + 'logaritmo". O gabarito resolve exatamente por este caminho, e cita a propriedade da '
      + 'soma de logaritmos nome por nome.</p>')
  ].join('') },

  { id: 'm0-inducao', titulo: 'Indução matemática', html: [
    '<p>O método da substituição <em>é</em> uma prova por indução. E o invariante de laço é '
    + 'uma indução disfarçada — inicialização é a base, manutenção é o passo. Vale reconhecer '
    + 'a mesma estrutura nos dois lugares.</p>',
    steps([
      '<strong>Base.</strong> Verifique a afirmação para o menor caso ($n = 1$, ou $n = n_0$).',
      '<strong>Hipótese.</strong> Suponha a afirmação verdadeira para todo valor menor que $n$ '
      + '(indução forte) ou para $n − 1$ (indução simples).',
      '<strong>Passo.</strong> Derive a afirmação para $n$ usando a hipótese. É aqui que a '
      + 'álgebra acontece.',
      '<strong>Conclusão.</strong> Pelos três itens, vale para todo $n ≥ n_0$.'
    ]),
    warn('O erro clássico em análise de algoritmos',
      '<p>Provar $T(n) ≤ c·n$ e concluir a partir de $T(n) ≤ cn + 1$. <strong>Não fecha</strong>: '
      + 'você precisava de $≤ cn$ e obteve algo maior. A indução exige a desigualdade '
      + '<em>exata</em> que você enunciou. A saída é fortalecer a hipótese — está no Módulo 2.</p>')
  ].join('') },

  { id: 'm0-piso', titulo: 'Piso, teto e limites', html: [
    '<p>Recorrências reais dividem em $⌊n/2⌋$ e $⌈n/2⌉$, não em $n/2$. A boa notícia:</p>',
    def('Pisos e tetos não mudam a classe assintótica',
      '<p>Como $n/2 − 1 < ⌊n/2⌋ ≤ n/2 ≤ ⌈n/2⌉ < n/2 + 1$, trocar $⌊n/b⌋$ por $n/b$ altera a '
      + 'solução por um fator constante. Todo o curso ignora piso e teto na análise — e o '
      + 'enunciado da prova de 2026.1 chega a definir $⌊x⌋$ só para o pseudocódigo.</p>'),
    '<p>Propriedades ocasionalmente úteis: $⌈n/2⌉ + ⌊n/2⌋ = n$, e $⌊x⌋ = ⌈x⌉$ exatamente '
    + 'quando $x$ é inteiro.</p>',

    '<h4>Limites para comparar crescimento</h4>',
    '<p>É a ferramenta mais rápida para ordenar funções (itens 13, 14 e 19 da lista):</p>',
    tbl(['Se', 'Então'], [
      ['$lim_{n→∞} \\f{f(n)}{g(n)} = 0$',           '$f(n) = o(g(n))$ — e portanto $f = O(g)$, mas $f ≠ Θ(g)$'],
      ['$lim_{n→∞} \\f{f(n)}{g(n)} = c$, $0<c<∞$',  '$f(n) = Θ(g(n))$'],
      ['$lim_{n→∞} \\f{f(n)}{g(n)} = ∞$',           '$f(n) = ω(g(n))$ — e portanto $f = Ω(g)$']
    ], 'O item 34 da lista pede exatamente a primeira linha destas equivalências.'),
    tip('Com L\'Hôpital',
      '<p>Para comparar $n^{1.5}$ com $n log n$: divida, obtendo $n^{0.5}/log n → ∞$. '
      + 'Logo $n log n = o(n^{1.5})$ e $n log n$ é <strong>melhor</strong>. '
      + 'Este é o item 17 da lista, e também o 16.</p>')
  ].join('') }
  ]
},

/* ======================================================================== M1 */
{
  id: 'm1',
  num: '1',
  titulo: 'Conceitos iniciais e análise assintótica',
  fonte: 'Slide 01 — "Conceitos iniciais"',
  resumo: 'Corretude por invariante e as três notações assintóticas. Daqui sai a questão 3 '
        + 'da prova, que é o ponto mais barato da avaliação.',
  secoes: [

  { id: 'm1-prob', titulo: 'Problema, instância e algoritmo', html: [
    def('Algoritmo',
      '<p>Sequência de passos bem definidos, sem ambiguidade, para resolver um problema '
      + 'computacional — isto é, transformar entrada em saída.</p>'),
    tbl(['Conceito', 'Definição', 'Exemplo (ordenação)'], [
      ['<strong>Problema</strong>', 'Especificação da entrada e da saída esperada',
       'Entrada: sequência de $n$ números $A$. Saída: permutação de $A$ em ordem crescente'],
      ['<strong>Instância</strong>', 'Uma entrada concreta e específica',
       '$A = [20, 6, 10, 1]$'],
      ['<strong>Algoritmo</strong>', 'Os passos não-ambíguos que resolvem o problema mecanicamente',
       'Ordenação por inserção']
    ]),
    '<p>A distinção parece burocrática, mas organiza o raciocínio: um algoritmo é '
    + '<em>correto</em> se produz a saída especificada pelo <em>problema</em> para '
    + '<em>toda</em> instância — não para a instância que você testou.</p>',
    def('Os dois critérios de qualidade',
      '<p><strong>Correto:</strong> garante saída válida para qualquer entrada possível. '
      + 'Provar corretude é demonstrar um teorema.</p>'
      + '<p><strong>Eficiente:</strong> tratável em função do tamanho da entrada. '
      + 'É o que a análise de complexidade mede.</p>'),
    '<p>Há um limite anterior a ambos: <strong>nem tudo é computável</strong>. '
    + 'O Problema da Parada é o exemplo canônico.</p>'
  ].join('') },

  {id: 'm1-inv', titulo: 'Invariante de laço', html: [
    exam('<p><strong>Caiu em 1 das 3 provas</strong> — a Q3 de 2026.1, valendo 2,0 pts. '
      + 'Frequência baixa, mas <em>custo de aprender quase zero</em>: é um template de três '
      + 'parágrafos que você decora numa sentada. Mantenha no bolso, não gaste nele o tempo '
      + 'que os temas de 3/3 merecem.</p>'),

    def('Invariante de laço',
      '<p>Uma afirmação sobre o estado do programa que é verdadeira no início de cada iteração '
      + 'do laço. Serve para demonstrar corretude, e se verifica em três propriedades:</p>'
      + '<p><strong>Inicialização</strong> — é verdadeira antes da primeira iteração.<br>'
      + '<strong>Manutenção</strong> — se é verdadeira antes da iteração $j$, continua '
      + 'verdadeira antes da iteração $j+1$.<br>'
      + '<strong>Término</strong> — quando o laço acaba, o invariante fornece a propriedade '
      + 'que demonstra a corretude do algoritmo.</p>'),

    warn('É o término que fecha a prova',
      '<p>Inicialização e manutenção só provam que a propriedade <em>se mantém</em>. '
      + 'Sem o término você não ligou o invariante à saída do algoritmo — e é exatamente '
      + 'esse o pedido da questão. Sempre termine escrevendo: "o laço encerra quando '
      + '$i = n+1$; pelo invariante, ...; que é precisamente a saída especificada".</p>'),

    '<h4>O caso da prova de 2026.1</h4>',
    P({ title: 'SomaVetor(A, n)',
      io: ['<strong>Entrada:</strong> vetor $A[1..n]$', '<strong>Saída:</strong> a soma dos elementos de $A$'],
      lines: [
        '<span class="kw">Function</span> <span class="fnn">SomaVetor</span>(A, n):',
        '  s ← 0',
        '  <span class="kw">for</span> i ← 1 <span class="kw">to</span> n <span class="kw">do</span>',
        '    s ← s + A[i]',
        '  <span class="kw">return</span> s'
      ] }),

    '<p><strong>Invariante:</strong> no início da iteração $i$ do laço <code>for</code>, '
    + 'a variável $s$ contém a soma dos elementos de $A[1..i−1]$.</p>',
    steps([
      '<strong>Inicialização.</strong> Antes da primeira iteração, $i = 1$ e $s = 0$. '
      + 'O invariante afirma que $s$ é a soma de $A[1..0]$ — uma sequência vazia, cuja soma é $0$. '
      + 'Verdadeiro.',
      '<strong>Manutenção.</strong> Suponha que no início da iteração $i$ valha '
      + '$s = \\S{k=1}{i−1} A[k]$. O corpo do laço executa $s ← s + A[i]$, de modo que ao entrar '
      + 'na iteração $i+1$ temos $s = \\S{k=1}{i−1} A[k] + A[i] = \\S{k=1}{i} A[k]$ — que é '
      + 'exatamente o invariante com $i$ trocado por $i+1$. Mantido.',
      '<strong>Término.</strong> O laço encerra quando $i = n+1$. Pelo invariante, '
      + '$s = \\S{k=1}{n} A[k]$, a soma de todos os elementos de $A$. É o que o algoritmo '
      + 'retorna, logo ele está correto.'
    ]),

    '<h4>O caso do slide: ordenação por inserção</h4>',
    P({ title: 'Algoritmo 1 — Ordenação por inserção',
      io: ['<strong>Entrada:</strong> arranjo $A$ com $n$ elementos',
           '<strong>Saída:</strong> $A$ com os elementos em ordem crescente'],
      lines: [
        '<span class="kw">for</span> j ← 2, …, n <span class="kw">do</span>',
        '  v ← A[j];  i ← j − 1',
        '  <span class="kw">while</span> i &gt; 0 <span class="kw">and</span> A[i] &gt; v <span class="kw">do</span>',
        '    A[i + 1] ← A[i]',
        '    i ← i − 1',
        '  A[i + 1] ← v'
      ] }),
    '<p><strong>Invariante:</strong> no início de cada iteração do laço <code>for</code>, '
    + 'o subvetor $A[1..j−1]$ está ordenado e contém os mesmos elementos que ocupavam '
    + 'essas posições originalmente.</p>',
    '<p>Inicialização: $j = 2$, e $A[1..1]$ é trivialmente ordenado. Manutenção: o '
    + '<code>while</code> desloca para a direita todos os elementos maiores que $v$, abrindo '
    + 'a posição correta para inserir $v$; ao fim, $A[1..j]$ está ordenado. Término: '
    + '$j = n+1$, logo $A[1..n]$ está ordenado — o algoritmo está correto.</p>',
    tip('A cláusula "contém os mesmos elementos"',
      '<p>Sem ela, o invariante "$A[1..j−1]$ está ordenado" é satisfeito por um algoritmo que '
      + 'zera o vetor. Um invariante forte o bastante precisa excluir isso. '
      + 'O item 10 da Lista 1 pede justamente que você justifique a validade dessa invariante.</p>')
  ].join('') },

  { id: 'm1-parada', titulo: 'O Problema da Parada', html: [
    def('O problema (Turing e Church, 1936)',
      '<p>Dado um algoritmo e uma entrada, decidir se ele termina ou executa para sempre. '
      + '<strong>Não existe</strong> algoritmo universal que resolva este problema.</p>'),
    '<p>A demonstração é por contradição, e a estrutura vale conhecer porque é o modelo de '
    + 'argumento por auto-referência:</p>',
    steps([
      '<strong>Suposição.</strong> Assuma que existe $S(A, I)$ que retorna VERDADE se o '
      + 'algoritmo $A$ termina para a entrada $I$, e FALSO caso contrário.',
      '<strong>Construção.</strong> Projete um programa $S\'$ que recebe um algoritmo $X$ e '
      + 'chama $S(X, X)$: se o resultado for FALSO, $S\'$ termina; se for VERDADE, $S\'$ entra '
      + 'em laço infinito.',
      '<strong>O paradoxo.</strong> Execute $S\'(S\')$. Se $S(S\', S\')$ retorna FALSO, então '
      + 'pela construção $S\'$ termina — mas FALSO afirmava que não termina. Se retorna '
      + 'VERDADE, $S\'$ entra em laço — mas VERDADE afirmava que termina. Contradição nos '
      + 'dois ramos, logo $S$ não existe.'
    ]),
    '<p>Exemplos triviais de terminação mostram por que o caso geral é difícil: '
    + '<code>while(TRUE)</code> nunca termina, <code>for(i=1; i&lt;10; i++)</code> sempre '
    + 'termina — mas o comportamento de um algoritmo arbitrário não é óbvio.</p>'
  ].join('') },

  { id: 'm1-ram', titulo: 'Modelo RAM e os três cenários', html: [
    def('Random-Access Machine',
      '<p>Para analisar algoritmos independentemente de hardware:</p>'
      + '<ul><li>Instruções simples (aritmética, movimentação de dados, controle) custam '
      + 'exatamente uma unidade de tempo.</li>'
      + '<li>Memória infinita, com acesso de custo unitário.</li>'
      + '<li>Ignora-se a hierarquia de memória — cache, memória virtual.</li>'
      + '<li>O tamanho da entrada $n$ é o número de itens, ou o número de bits para '
      + 'representá-la.</li></ul>'),
    warn('Quando a escolha de $n$ muda a resposta',
      '<p>Para ordenação, $n$ é o número de elementos. Para testar se um número $N$ é primo, '
      + '$n$ é o número de <em>bits</em> de $N$ — e é por isso que o teste por divisões '
      + 'sucessivas, que parece $O(\\r{N})$, é de fato exponencial em $n$. '
      + 'A distinção é a base da discussão de NP-completude mais adiante no curso.</p>'),
    tbl(['Cenário', 'O que mede', 'Ordenação por inserção'], [
      ['<strong>Melhor caso</strong>', 'O menor $T(n)$ sobre entradas de tamanho $n$',
       'Entrada já ordenada: o teste do <code>while</code> falha de imediato → linear'],
      ['<strong>Pior caso</strong>', 'O maior $T(n)$ — dá uma garantia superior',
       'Entrada em ordem inversa: cada elemento é comparado com todos os anteriores → quadrático'],
      ['<strong>Caso médio</strong>', 'A média de $T(n)$ sobre todas as entradas de tamanho $n$',
       'Quadrático — em média, metade do subvetor é deslocada']
    ]),
    '<p>O foco costuma ser o <strong>pior caso</strong>, porque ele é o único que dá garantia. '
    + 'O item 6 da Lista 1 pede exatamente essa justificativa.</p>',
    tip('Por que o pior caso, e quando não',
      '<p>O pior caso é um limite que nunca será excedido, é frequentemente mais fácil de '
      + 'calcular, e para muitos algoritmos ocorre com frequência na prática. '
      + 'Mas quando o pior caso é patológico e raro — como no Quick-sort — o caso médio '
      + 'descreve melhor a realidade, e passa a ser a análise adequada.</p>')
  ].join('') },

  { id: 'm1-ins', titulo: 'Análise exata: ordenação por inserção', html: [
    '<p>Vale acompanhar esta conta uma vez, porque ela mostra de onde vêm os polinômios que '
    + 'depois se resumem a $Θ(n^2)$. Custo 1 por instrução; $t_j$ é o número de vezes que o '
    + 'teste do <code>while</code> executa para cada $j$.</p>',

    '<h4>Melhor caso — entrada já ordenada</h4>',
    '<p>$t_j = 1$ para todo $j$: o <code>while</code> testa a condição uma vez e falha.</p>',
    '$$T(n) = \\u{n}{linha 1} + \\u{3(n − 1)}{L2, L3, L7} + \\u{(n − 1)}{L4 (while)} = 5n − 4$$',

    '<h4>Pior caso — entrada em ordem inversa</h4>',
    '<p>Para cada $j$, o valor $v = A[j]$ é menor que todos em $A[1..j−1]$. Então o índice $i$ '
    + 'assume $j−1, j−2, …, 1, 0$; o teste do <code>while</code> executa $j$ vezes (as $j−1$ em '
    + 'que a condição é verdadeira, mais a última em que $i = 0$ e ela falha); e o corpo do '
    + '<code>while</code> executa $j − 1$ vezes.</p>',
    '$$T(n) = n + 3(n − 1) + \\S{j=2}{n} j + 2\\S{j=2}{n}(j − 1)$$',
    '<p>Usando $\\S{j=2}{n} j = \\f{n(n+1)}{2} − 1$ e $\\S{j=2}{n}(j−1) = \\f{(n−1)n}{2}$:</p>',
    '$$T(n) = \\f{3}{2}n^2 + \\f{7}{2}n − 4 = Θ(n^2)$$',
    tip('O que essa conta ensina',
      '<p>Os coeficientes $3/2$ e $7/2$ dependem de quantas instruções você contou por linha — '
      + 'são arbitrários. O expoente $2$ não é. É exatamente essa fronteira entre o que é '
      + 'acidental e o que é essencial que a notação assintótica captura.</p>'
      + '<p>Aliás: $\\f{3}{2}n^2 + \\f{7}{2}n − 4$ é a função dos itens 24(f) e 24(g) da Lista 1.</p>')
  ].join('') },

  { id: 'm1-assint', titulo: 'Notação assintótica', html: [
    def('As três definições formais',
      '<p><strong>$O$ — limite superior.</strong> $f(n) = O(g(n))$ se existem constantes '
      + '$c, n_0 > 0$ tais que $f(n) ≤ c·g(n)$ para todo $n ≥ n_0$.</p>'
      + '<p><strong>$Ω$ — limite inferior.</strong> $f(n) = Ω(g(n))$ se existem $c, n_0 > 0$ '
      + 'tais que $f(n) ≥ c·g(n)$ para todo $n ≥ n_0$.</p>'
      + '<p><strong>$Θ$ — limite justo.</strong> $f(n) = Θ(g(n))$ se existem $c_1, c_2, n_0 > 0$ '
      + 'tais que $c_1 g(n) ≤ f(n) ≤ c_2 g(n)$ para todo $n ≥ n_0$.</p>'),

    '<p>Os três elementos que uma prova precisa exibir são sempre os mesmos: '
    + '<strong>as constantes $c$ (ou $c_1, c_2$), o ponto de partida $n_0$, e a desigualdade '
    + 'verificada para todo $n ≥ n_0$</strong>. Uma resposta que não exibe as constantes não '
    + 'é uma demonstração.</p>',

    def('Teorema que economiza trabalho',
      '<p>$f(n) = Θ(g(n))$ se e somente se $f(n) = O(g(n))$ <em>e</em> $f(n) = Ω(g(n))$. '
      + 'Na prática: para provar um $Θ$, faça duas provas de uma desigualdade só.</p>'),

    '<h4>Exemplo completo de demonstração</h4>',
    '<p>Provar que $\\f{3}{2}n^2 + \\f{7}{2}n − 4 = Θ(n^2)$.</p>',
    steps([
      '<strong>Limite superior.</strong> Para $n ≥ 1$, $\\f{7}{2}n ≤ \\f{7}{2}n^2$ e $−4 ≤ 0$, '
      + 'logo $\\f{3}{2}n^2 + \\f{7}{2}n − 4 ≤ (\\f{3}{2} + \\f{7}{2})n^2 = 5n^2$. '
      + 'Tome $c_2 = 5$, $n_0 = 1$.',
      '<strong>Limite inferior.</strong> Para $n ≥ 2$ temos $\\f{7}{2}n − 4 ≥ 3 > 0$, logo '
      + 'a expressão é $≥ \\f{3}{2}n^2$. Tome $c_1 = \\f{3}{2}$, $n_0 = 2$.',
      '<strong>Conclusão.</strong> Com $c_1 = 3/2$, $c_2 = 5$ e $n_0 = 2$, as duas '
      + 'desigualdades valem simultaneamente. Logo a função é $Θ(n^2)$.'
    ]),

    '<h4>As notações estritas</h4>',
    tbl(['Notação', 'Significado', 'Em termos de limite'], [
      ['$f = O(g)$',  'cresce no máximo como $g$',         '$lim f/g < ∞$'],
      ['$f = o(g)$',  'cresce <em>estritamente</em> menos', '$lim f/g = 0$'],
      ['$f = Θ(g)$',  'cresce à mesma taxa',                '$lim f/g = c$, com $0 < c < ∞$'],
      ['$f = Ω(g)$',  'cresce no mínimo como $g$',          '$lim f/g > 0$'],
      ['$f = ω(g)$',  'cresce <em>estritamente</em> mais',  '$lim f/g = ∞$']
    ], 'A analogia útil: O é ≤, Ω é ≥, Θ é =, o é &lt; e ω é &gt;.'),

    '<h4>Álgebra assintótica</h4>',
    '<p>Duas igualdades do slide, que a lista repete nos itens 18 e 30, e que confundem '
    + 'porque o sinal "=" é assimétrico aqui:</p>',
    def('Θ dentro de uma expressão × Θ como resultado',
      '<p>$n^3 + 5n + 10 = n^3 + Θ(n)$ — aqui $Θ(n)$ significa <em>"alguma função anônima '
      + 'que é $Θ(n)$"</em>. A igualdade diz: os termos de ordem baixa somam algo que cresce '
      + 'linearmente. É informação parcial preservada.</p>'
      + '<p>$n^3 + Θ(n) = Θ(n^3)$ — aqui a leitura é: <em>qualquer</em> função da forma '
      + '$n^3$ mais algo linear é $Θ(n^3)$. O termo dominante absorveu o resto.</p>'
      + '<p>Por isso o "=" assintótico se lê como "é" ou "pertence a", e '
      + '<strong>não é simétrico</strong>: vale $n = O(n^2)$, mas não $O(n^2) = n$.</p>'),

    tbl(['Propriedade', 'Vale?', 'Observação'], [
      ['Transitividade: $f=O(g)$, $g=O(h)$ ⇒ $f=O(h)$', '<span class="pill ok">Sim</span>',
       'Item 23 da lista. Prova direta compondo as constantes: $c = c_1c_2$'],
      ['Soma: $f=O(s)$, $g=O(r)$ ⇒ $f+g = O(s+r)$', '<span class="pill ok">Sim</span>',
       'Item 22(b). As constantes somam'],
      ['Produto: $f=O(s)$, $g=O(r)$ ⇒ $f·g = O(s·r)$', '<span class="pill ok">Sim</span>',
       'Item 22(c). As constantes multiplicam'],
      ['Subtração: $f=O(s)$, $g=O(r)$ ⇒ $f−g = O(s−r)$', '<span class="pill bad">Não</span>',
       'Item 22(a). Contraexemplo: $f=g=n$, $s=r=n$ dão $0 = O(0)$, mas com $f=2n$, $g=n$, '
       + '$s=r=n$ temos $n = O(0)$ — falso'],
      ['Reflexividade: $f = Θ(f)$', '<span class="pill ok">Sim</span>', 'Com $c_1=c_2=1$'],
      ['$f(n) = Θ(f(n/2))$', '<span class="pill bad">Não em geral</span>',
       'Itens 26(e) e 29(b). Vale para $f=n$; falha para $f=2^n$, pois '
       + '$2^n / 2^{n/2} = 2^{n/2} → ∞$']
    ]),

    warn('A armadilha do "no mínimo O(n²)"',
      '<p>"O tempo de execução do algoritmo A é no mínimo $O(n^2)$" não tem sentido — '
      + '$O$ já é um limite <em>superior</em>, então "no mínimo um limite superior" não '
      + 'restringe nada: toda função é $O$ de algo suficientemente grande. O certo seria '
      + '$Ω(n^2)$. É o item 38 da lista (Cormen 3.1-3).</p>'),

    '<h4>O que a notação assintótica não diz</h4>',

    '<p>Tudo acima compara <strong>taxas de crescimento</strong>, e por construção joga fora '
    + 'constantes multiplicativas e termos de menor ordem. Isso é uma escolha deliberada: ela '
    + 'torna a comparação independente de máquina e de linguagem. Mas tem um preço, e a prova '
    + 'cobra exatamente o preço.</p>',

    def('A pergunta que o assintótico não responde',
      '<p>Dois programas resolvem o mesmo problema, com custos $f(n) = n + 5/n$ e '
      + '$g(n) = 100\\r{n}$. Qual é mais rápido <strong>para a entrada que eu tenho</strong>?</p>'),

    '<p>Assintoticamente não há dúvida: $f(n) = Θ(n)$ e $g(n) = Θ(\\r{n})$, então $g$ cresce '
    + 'menos e o segundo programa "ganha". Mas essa conclusão vale para $n$ <em>suficientemente '
    + 'grande</em> — e a definição nunca diz o quão grande. Aqui o cruzamento está longe:</p>',

    tbl(['$n$', '$f(n) = n + 5/n$', '$g(n) = 100\\r{n}$', 'Mais rápido'], [
      ['$10$', '$10{,}5$', '$≈ 316{,}2$', '<span class="pill ok">o de $Θ(n)$</span>'],
      ['$1.000$', '$1000{,}005$', '$≈ 3.162{,}3$', '<span class="pill ok">o de $Θ(n)$</span>'],
      ['$10.000$', '$10.000{,}0005$', '$10.000$', '<span class="pill warn">empatam</span>'],
      ['$1.000.000$', '$≈ 10^6$', '$100.000$', '<span class="pill accent">o de $Θ(\\r{n})$</span>']
    ], 'A constante 100 empurra o cruzamento até $n = 10.000$.'),

    '<p>O ponto de cruzamento sai de $n = 100\\r{n}$, ou seja $\\r{n} = 100$, ou seja '
    + '$n = 10.000$. Abaixo disso a constante decide; acima, a ordem decide.</p>',

    steps([
      '<strong>Reduza cada função a $Θ$.</strong> Serve para saber <em>quem acaba ganhando</em>, '
      + 'e para organizar a resposta.',
      '<strong>Veja se o enunciado fixa uma faixa de $n$.</strong> Se fixa, a resposta é '
      + 'numérica, não assintótica.',
      '<strong>Use monotonicidade.</strong> Se as duas funções são contínuas e crescentes, basta '
      + 'comparar nos <em>extremos</em> da faixa — não é preciso testar valor por valor. É o '
      + 'argumento que o gabarito usa.',
      '<strong>Diga explicitamente que o assintótico ignora constantes.</strong> O gabarito dá '
      + 'ponto por essa frase: é a justificativa de por que a resposta "óbvia" está errada.'
    ]),

    tip('O lado formal da mesma questão',
      '<p>Vale $g(n) = O(f(n))$, porque $100\\r{n} ≤ c\\p{n + 5/n}$ para todo $n ≥ 1$ bastando '
      + '$c ≥ 100/6$ (o pior caso é $n = 1$, onde $f(1) = 6$ e $g(1) = 100$).</p>'
      + '<p>Mas $f(n) ≠ O(g(n))$: a razão $\\f{f(n)}{g(n)} = \\f{n^2 + 5}{100n\\r{n}}$ cresce '
      + 'como $\\r{n}/100$, sem limite. Nenhuma constante $c$ segura isso para todo $n$ grande. '
      + 'Então a relação é estrita — $g$ é assintoticamente melhor, e ainda assim mais lenta na '
      + 'faixa pedida.</p>'),

    exam('<p>Esta é a <strong>Q1 de 2025.2</strong>, 2,0 pts — a única questão puramente '
      + 'conceitual das três provas. Ela não pede nenhuma conta difícil: pede que você saiba que '
      + '<em>crescimento assintótico menor não é o mesmo que programa mais rápido</em>. '
      + 'Se cair de novo, a resposta completa tem três partes: as duas ordens em $Θ$, a '
      + 'comparação numérica na faixa dada, e a frase sobre constantes.</p>')
  ].join('') }
  ]
},

/* ======================================================================== M2 */
{
  id: 'm2',
  num: '2',
  titulo: 'Fórmulas de recorrência',
  fonte: 'Slide 02 — "Fórmulas de recorrência e algoritmos recursivos"',
  resumo: 'Quatro métodos de solução. A questão de recorrências caiu nas três provas, valendo '
        + '2,0 a 2,5 pontos, e é resolvida inteiramente com eles — a maioria dos itens sai do '
        + 'Teorema Mestre em menos de um minuto cada, e o resto pede árvore de recursão.',
  secoes: [

  { id: 'm2-extrair', titulo: 'Extrair a recorrência do algoritmo', html: [
    '<p>Antes de resolver, é preciso montar. E montar é responder três perguntas olhando '
    + 'o código:</p>',
    steps([
      '<strong>Quantas chamadas recursivas?</strong> É o coeficiente $a$.',
      '<strong>De que tamanho é cada subproblema?</strong> É o divisor $b$ (ou a subtração, '
      + 'como em $n−1$).',
      '<strong>Quanto custa o trabalho local</strong> — dividir a entrada e combinar os '
      + 'resultados, fora das chamadas? É $f(n)$.'
    ]),
    def('A anatomia',
      '$$T(n) = \\u{T(n/4) + T(n/2)}{custo após 1 passo} + \\u{Θ(n)}{custo de 1 passo}$$'
      + '<p>O primeiro grupo reflete duas chamadas recursivas sobre porções assimétricas '
      + 'da entrada; o $Θ(n)$ reflete o custo de dividir e/ou combinar no nível atual.</p>'),

    '<h4>Três exemplos do slide</h4>',

    '<p><strong>Busca binária iterativa.</strong> O laço reduz o espaço de busca à metade em '
    + 'cada iteração. Não há recorrência a montar: o custo é diretamente $Θ(log n)$.</p>',
    P({ title: 'Algoritmo 1 — Busca binária (iterativa)',
      io: ['<strong>Entrada:</strong> vetor $X$ de tamanho $n$; valor $K$',
           '<strong>Saída:</strong> $i$ tal que $X[i] = K$, ou $−1$'],
      lines: [
        'a ← 1;  b ← n',
        '<span class="kw">while</span> a ≤ b <span class="kw">do</span>',
        '  i ← ⌊(a + b)/2⌋',
        '  <span class="kw">if</span> X[i] = K <span class="kw">then return</span> i',
        '  <span class="kw">else if</span> X[i] &lt; K <span class="kw">then</span> a ← i + 1',
        '  <span class="kw">else</span> b ← i − 1',
        '<span class="kw">return</span> −1'
      ] }),

    '<p><strong>Busca binária recursiva.</strong> Uma única chamada, sobre metade do vetor, '
    + 'com custo local constante:</p>',
    '$$T(n) = 1 · T(n/2) + Θ(1) ⇒ T(n) = Θ(log n)$$',

    warn('Erro de índice no slide',
      '<p>O pseudocódigo da busca binária recursiva do slide 02 chama '
      + '<code>BuscaBinaria(X, a+1, b, K)</code> e <code>BuscaBinaria(X, a, b−1, K)</code>. '
      + 'Com esses índices o intervalo encolhe de <em>um</em> elemento por chamada, o que daria '
      + '$T(n) = T(n−1) + Θ(1) = Θ(n)$ — uma busca linear recursiva.</p>'
      + '<p>O correto é <code>(X, i+1, b, K)</code> e <code>(X, a, i−1, K)</code>. '
      + 'A recorrência $T(n) = T(n/2) + Θ(1)$ só vale na versão com $i$. '
      + 'Se cair uma questão de leitura de código recursivo, verifique os índices antes de '
      + 'afirmar que o problema cai pela metade.</p>'),

    '<p><strong>Merge Sort.</strong> Duas chamadas sobre metades, e o procedimento '
    + '<code>Intercala</code> percorre os $n$ elementos:</p>',
    '$$T(n) = 2T(n/2) + Θ(n) ⇒ T(n) = Θ(n log n)$$',
    P({ title: 'Algoritmo 3 — Merge Sort',
      io: ['<strong>Entrada:</strong> vetor $X$, índices $p, q, r$ com $1 ≤ p ≤ q ≤ r ≤ n$',
           '<strong>Saída:</strong> $X[p..r]$ em ordem crescente'],
      lines: [
        '<span class="kw">if</span> p &lt; r <span class="kw">then</span>',
        '  q ← ⌊(p + r)/2⌋',
        '  <span class="fnn">MergeSort</span>(X, p, q)',
        '  <span class="fnn">MergeSort</span>(X, q + 1, r)',
        '  <span class="fnn">Intercala</span>(X, p, q, r)'
      ] }),
    P({ title: 'Algoritmo 4 — Intercala(A, p, q, r)',
      io: ['<strong>Entrada:</strong> $X[p..q]$ e $X[q+1..r]$ já ordenados'],
      lines: [
        'n₁ ← q − p + 1;  n₂ ← r − q',
        'alocar L[1..n₁+1] e R[1..n₂+1]                <span class="cm">// +1 p/ sentinela</span>',
        '<span class="kw">for</span> i ← 1 <span class="kw">to</span> n₁ <span class="kw">do</span> L[i] ← X[p + i − 1]',
        '<span class="kw">for</span> j ← 1 <span class="kw">to</span> n₂ <span class="kw">do</span> R[j] ← X[q + j]',
        'L[n₁ + 1] ← ∞;  R[n₂ + 1] ← ∞                 <span class="cm">// sentinelas</span>',
        'i ← 1;  j ← 1',
        '<span class="kw">for</span> k ← p <span class="kw">to</span> r <span class="kw">do</span>',
        '  <span class="kw">if</span> L[i] ≤ R[j] <span class="kw">then</span>',
        '    X[k] ← L[i];  i ← i + 1',
        '  <span class="kw">else</span>',
        '    X[k] ← R[j];  j ← j + 1'
      ] }),
    tip('Por que as sentinelas',
      '<p>O $∞$ no fim de $L$ e $R$ evita testar se um dos subvetores esvaziou: a comparação '
      + 'sempre escolhe o outro. Troca dois testes por iteração por duas atribuições no total — '
      + 'e deixa o laço com exatamente $r − p + 1$ iterações, o que torna a análise $Θ(n)$ '
      + 'imediata.</p>'),

    '<h4>Recorrências canônicas — vale reconhecer de olho</h4>',
    tbl(['Recorrência', 'Solução', 'De onde vem'], [
      ['$T(n) = T(n/2) + Θ(1)$', '$Θ(log n)$', 'Busca binária, potência inteira'],
      ['$T(n) = T(n/2) + Θ(n)$', '$Θ(n)$', 'Descartar metade, com trabalho linear'],
      ['$T(n) = 2T(n/2) + Θ(1)$', '$Θ(n)$', '2026.1 Q4 (máximo do vetor) e 2025.2 Q3 (MaxDif); também o pior caso de 2025.1 Q3'],
      ['$T(n) = 2T(n/2) + Θ(n)$', '$Θ(n log n)$', 'Merge Sort; 2025.2 Q4 (majoritário); 2025.1 Q5 (maior soma)'],
      ['$T(n) = 2T(n/4) + \\r{n}$', '$Θ(\\r{n} log n)$', '2025.1 Q1(a) — caso 2 com $f(n) = \\r{n}$'],
      ['$T(n) = 4T(n/2) + Θ(n)$', '$Θ(n^2)$', 'Item 67(a) da lista'],
      ['$T(n) = 4T(n/2) + Θ(n^2)$', '$Θ(n^2 log n)$','2026.1 Q1(a) — caso 2'],
      ['$T(n) = 16T(n/4) + Θ(n)$', '$Θ(n^2)$', '2025.2 Q2(A) — caso 1, pois $n^{log_4 16} = n^2$'],
      ['$T(n) = 7T(n/2) + Θ(n^2)$', '$Θ(n^{lg 7})$', 'Strassen'],
      ['$T(n) = T(n−1) + Θ(1)$', '$Θ(n)$', 'Recursão linear simples'],
      ['$T(n) = T(n−1) + Θ(n)$', '$Θ(n^2)$', 'Pior caso do Quick-sort'],
      ['$T(n) = T(n−1) + log n$', '$Θ(n log n)$', '2025.2 Q2(C) — soma de logaritmos, $= Θ(log n!)$'],
      ['$T(n) = 2T(n−1) + Θ(1)$', '$Θ(2^n)$', 'Torres de Hanói; 2025.2 Q2(B); 2025.1 Q1(b)'],
      ['$T(n) = 2T(n−1) + Θ(n)$', '$Θ(2^n)$', '2026.1 Q1(d)'],
      ['$T(n) = T(\\r{n}) + Θ(1)$', '$Θ(log log n)$','Item 64(j) da lista']
    ], 'Catorze linhas que cobrem a questão de recorrências das três provas — ela caiu em 3/3.'),

    '<h4>Da prosa à recorrência</h4>',

    '<p>Em 2025.2 a questão de recorrências <strong>não trouxe pseudocódigo</strong>: descreveu '
    + 'três algoritmos em português e pediu as recorrências. A nota vinha inteira da tradução. '
    + 'Vale ter o dicionário na ponta da língua.</p>',

    tbl(['O que o enunciado diz', 'O que vai na recorrência'], [
      ['"divide-se o problema em $a$ sub-problemas"', 'o coeficiente $a$'],
      ['"com entradas $b$ vezes menores"', '$T(n/b)$'],
      ['"cada uma com um elemento a menos"', '$T(n−1)$ — é <strong>subtrativa</strong>, Teorema Mestre não vale'],
      ['"descarta-se um elemento e os restantes são tratados na próxima chamada"', 'uma única chamada $T(n−1)$'],
      ['"as soluções são combinadas em tempo linear"', '$+ Θ(n)$'],
      ['"o tempo para combinar é constante"', '$+ Θ(1)$'],
      ['"o tempo para processar a entrada é logarítmico"', '$+ log n$'],
      ['"o problema é dividido pela metade"', '$T(n/2)$, com $a = 1$ se há só uma chamada'],
      ['"a cada chamada o expoente cai pela metade"', '$T(n/2)$ — mas $n$ aqui é o expoente, não o vetor']
    ], 'O enunciado de 2025.2 Q2 é literalmente uma concatenação destas frases.'),

    '<p>Aplicando às três descrições daquela prova:</p>',

    tbl(['Algoritmo', 'Descrição', 'Recorrência', 'Solução'], [
      ['A', '16 sub-problemas 4× menores, combinados em tempo linear',
       '$16T(n/4) + n$', '$Θ(n^2)$ — caso 1'],
      ['B', '2 sub-problemas com um elemento a menos, combinação constante',
       '$2T(n−1) + 1$', '$Θ(2^n)$ — árvore'],
      ['C', 'descarta um elemento, processa o resto em tempo logarítmico',
       '$T(n−1) + log n$', '$Θ(n log n)$ — soma de logs']
    ]),

    warn('O erro que a questão caça',
      '<p>Ler "um elemento a menos" e escrever $T(n/2)$ por força do hábito. A diferença entre '
      + '$2T(n−1)$ e $2T(n/2)$ é a diferença entre $Θ(2^n)$ e $Θ(n)$ — não é um detalhe. '
      + 'Sempre pergunte: o tamanho da entrada é <em>dividido</em> ou é <em>decrementado</em>?</p>'),

    exam('<p><strong>2025.2 Q2</strong>, 2,5 pts. É a maior questão de recorrências das três '
      + 'provas, e a única sem código. Treine lendo os enunciados dos itens de projeto da '
      + 'Lista 1 e escrevendo só a recorrência, sem resolver o problema.</p>')
  ].join('') },

  {id: 'm2-subst', titulo: 'Método 1 — Substituição', html: [
    '<p>Dois passos: <strong>adivinhar</strong> a forma da solução e <strong>provar por '
    + 'indução</strong>, encontrando as constantes $c$ e $n_0$ que satisfazem a definição '
    + 'de $O$ ou $Ω$.</p>',
    tip('De onde vem o palpite',
      '<p>Da árvore de recursão, ou da tabela de recorrências canônicas acima. '
      + 'O método da substituição é bom para <em>verificar</em> um palpite, não para gerá-lo.</p>'),

    '<h4>Exemplo que funciona</h4>',
    '<p>Recorrência $T(n) = 2T(n/2) + n$, palpite $T(n) = O(n log n)$, isto é, '
    + '$T(n) ≤ c·n log n$ para algum $c > 0$.</p>',
    '<p>Hipótese de indução aplicada a $n/2$: $T(n/2) ≤ c(n/2) log(n/2)$. Substituindo:</p>',
    '$$T(n) ≤ 2 \\p{c\\f{n}{2} log \\f{n}{2}} + n = cn log \\f{n}{2} + n$$',
    '$$= cn(log n − log 2) + n = cn log n − cn + n = cn log n − (c − 1)n$$',
    '<p>Para concluir $T(n) ≤ cn log n$, basta que $(c − 1)n ≥ 0$ — verdadeiro para '
    + 'qualquer $c ≥ 1$. A indução fecha.</p>',

    '<h4>A armadilha</h4>',
    '<p>Recorrência $T(n) = 2T(n/2) + 1$. É intuitivo palpitar $T(n) = O(n)$ e tentar '
    + 'provar $T(n) ≤ cn$:</p>',
    '$$T(n) ≤ 2\\p{c\\f{n}{2}} + 1 = cn + 1$$',
    warn('Não fecha',
      '<p>$cn + 1$ não implica $T(n) ≤ cn$ — é <em>maior</em>. Não se pode ignorar o "+1" '
      + 'alegando que é de ordem inferior: a indução exige a desigualdade exata que você '
      + 'enunciou. Escrever "$cn + 1 = O(n)$, logo está provado" é o erro mais comum aqui, '
      + 'e não vale ponto.</p>'),

    '<h4>A correção: fortalecer a hipótese</h4>',
    '<p>Subtraia um termo de ordem inferior. Novo palpite: $T(n) ≤ cn − d$, com $c, d > 0$.</p>',
    '$$T(n) ≤ 2\\p{c\\f{n}{2} − d} + 1 = cn − 2d + 1 = (cn − d) − d + 1$$',
    '<p>Queremos $T(n) ≤ cn − d$, o que exige $−d + 1 ≤ 0$, ou seja $d ≥ 1$. '
    + 'Agora funciona. (A solução exata, aliás, é $T(n) = 2n − 1$.)</p>',
    tip('Regra prática',
      '<p>Quando o termo aditivo de $f(n)$ é de ordem inferior ao palpite e a indução falha '
      + 'por pouco, tente $c·g(n) − d$. Se falhar por muito, o palpite está errado — '
      + 'desenhe a árvore.</p>'),

    '<h4>Mudança de variáveis</h4>',
    '<p>Às vezes a recorrência não permite palpite direto:</p>',
    '$$T(n) = 2T(\\r{n}) + log n$$',
    '<p>Faça $m = log n$, ou seja $n = 2^m$. Então $\\r{n} = 2^{m/2}$ e:</p>',
    '$$T(2^m) = 2T(2^{m/2}) + m$$',
    '<p>Renomeando $S(m) = T(2^m)$, chega-se a $S(m) = 2S(m/2) + m$, que já sabemos ser '
    + '$O(m log m)$. Substituindo $m = log n$ de volta:</p>',
    '$$T(n) = O(log n · log log n)$$'
  ].join('') },

  { id: 'm2-arvore', titulo: 'Método 2 — Árvore de recursão', html: [
    '<p>Transforma a recorrência numa árvore em que cada nó é o custo <em>local</em> de um '
    + 'subproblema. Soma-se o custo por nível, e depois somam-se os níveis. É a ferramenta '
    + 'para gerar palpites e para os casos que o Teorema Mestre não cobre.</p>',

    def('As quatro medidas de qualquer árvore',
      '<p>Para $T(n) = a·T(n/b) + f(n)$:</p>'
      + '<ul>'
      + '<li><strong>Altura:</strong> $log_b n$ — quantas divisões até o caso base.</li>'
      + '<li><strong>Nós no nível $i$:</strong> $a^i$.</li>'
      + '<li><strong>Tamanho do subproblema no nível $i$:</strong> $n/b^i$.</li>'
      + '<li><strong>Custo do nível $i$:</strong> $a^i · f(n/b^i)$.</li>'
      + '</ul>'
      + '<p>E o número de folhas é $a^{log_b n} = n^{log_b a}$ — a identidade de logaritmos '
      + 'do Módulo 0. É de onde vem o $n^{log_b a}$ do Teorema Mestre.</p>'),

    '<h4>Exemplo do slide: $T(n) = 3T(n/4) + cn^2$</h4>',
    tbl(['Nível', 'Nós', 'Tamanho', 'Custo por nó', 'Custo do nível'], [
      ['0', '1',   '$n$',      '$cn^2$',        '$cn^2$'],
      ['1', '3',   '$n/4$',    '$c(n/4)^2$',    '$3·\\f{cn^2}{16} = \\f{3}{16}cn^2$'],
      ['2', '9',   '$n/16$',   '$c(n/16)^2$',   '$9·\\f{cn^2}{256} = \\p{\\f{3}{16}}^2 cn^2$'],
      ['$i$', '$3^i$', '$n/4^i$', '$c(n/4^i)^2$', '$\\p{\\f{3}{16}}^i cn^2$'],
      ['folhas', '$n^{log_4 3}$', '1', '$Θ(1)$', '$Θ(n^{log_4 3})$']
    ]),
    '<p>Somando todos os níveis:</p>',
    '$$T(n) = \\S{i=0}{log_4 n − 1} \\p{\\f{3}{16}}^i cn^2 + Θ(n^{log_4 3})$$',
    '<p>O somatório é uma série geométrica de razão $3/16 < 1$. Limitando-a pela série '
    + 'infinita, sua soma é $O(1)$:</p>',
    '$$T(n) ≤ cn^2 · \\f{1}{1 − 3/16} + Θ(n^{log_4 3}) = \\f{16}{13}cn^2 + Θ(n^{0.79}) = Θ(n^2)$$',
    tip('A leitura',
      '<p>Como $log_4 3 ≈ 0.79 < 2$, o custo da <em>raiz</em> domina: a árvore é "gorda no '
      + 'topo". Cada nível custa menos que o anterior por um fator constante, e o total é '
      + 'proporcional ao primeiro nível. Este é o caso 3 do Teorema Mestre visto por dentro.</p>'),

    '<h4>Árvores assimétricas</h4>',
    '<p>$T(n) = T(n/3) + T(2n/3) + cn$. Os ramos alcançam folhas em profundidades diferentes:</p>',
    '<ul><li><strong>Caminho mais curto:</strong> divide por 3 sempre — profundidade $log_3 n$.</li>'
    + '<li><strong>Caminho mais longo:</strong> multiplica por $2/3$ sempre — profundidade '
    + '$log_{3/2} n$.</li></ul>',
    '<p>Cada nível completo custa $cn$ (porque $n/3 + 2n/3 = n$). Até o nível $log_3 n$ todos '
    + 'os níveis estão cheios; depois disso, ramos começam a virar folhas e o custo por nível '
    + 'decresce. O limite superior vem do caminho mais longo:</p>',
    '$$T(n) = O(cn · log_{3/2} n) = O(n log n)$$',
    '<p>E como os primeiros $log_3 n$ níveis custam exatamente $cn$ cada, '
    + '$T(n) = Ω(n log n)$ também — logo $T(n) = Θ(n log n)$.</p>',

    '<h4>Recorrências subtrativas: o caso da Q1(d)</h4>',
    '<p>$T(n) = 2T(n−1) + n$. O Teorema Mestre <strong>não se aplica</strong> — não há divisão '
    + 'da entrada, há subtração. Pela árvore: altura $n$, e o nível $i$ tem $2^{i−1}$ nós, cada '
    + 'um com custo $n − i + 1$.</p>',
    '$$S = \\S{i=1}{n} 2^{i−1}(n − i + 1)$$',
    '<p>O gabarito de 2026.1 resolve com o truque $S = 2S − S$:</p>',
    '$$2S − S = \\S{i=1}{n} 2^i(n − i + 1) − \\S{i=1}{n} 2^{i−1}(n − i + 1) = 2^n · 1 − 2^0 · n = Θ(2^n)$$',
    tip('Atalho para reconhecer',
      '<p>Em recorrências subtrativas, o coeficiente $a$ manda: '
      + '$T(n) = T(n−1) + f(n)$ é uma soma telescópica ($Θ(n·f(n))$ se $f$ é polinomial); '
      + '$T(n) = aT(n−1) + f(n)$ com $a ≥ 2$ é <strong>exponencial</strong>: $Θ(a^n)$, '
      + 'porque a árvore dobra de largura a cada nível e tem altura $n$.</p>'
      + '<p>É o item 20(b) da lista: $T(n) = 2T(n−2) + 1$ não pode ser limitado por polinômio.</p>')
  ].join('') },

  {id: 'm2-mestre', titulo: 'Método 3 — Teorema Mestre', html: [
    exam('<p><strong>O item mais rentável de toda a prova.</strong> A questão de recorrências '
      + 'caiu nas <strong>três</strong> provas (2025.1 Q1, 2025.2 Q2, 2026.1 Q1), valendo 2,0 a '
      + '2,5 pts, e a maioria dos itens sai direto daqui: em 2026.1 foram três dos quatro. '
      + 'São uns 1,5 ponto em poucos minutos, desde que o procedimento esteja automatizado — '
      + 'o resto da questão pede árvore de recursão.</p>'),

    def('A forma padrão',
      '$$T(n) = a·T(n/b) + f(n), \\t{ com } a ≥ 1 \\t{ e } b > 1$$'
      + '<p>$a$ é o número de subproblemas, $b$ o fator de divisão do tamanho da entrada, '
      + 'e $f(n)$ o custo de dividir e combinar.</p>'),

    def('A intuição: um cabo de guerra',
      '<p>Duas forças concorrem:</p>'
      + '<p><strong>A força das folhas</strong> — o peso de todos os subproblemas na base, '
      + 'que é $n^{log_b a}$.</p>'
      + '<p><strong>A força da raiz</strong> — o esforço local de dividir e combinar, $f(n)$.</p>'
      + '<p>A solução é determinada por quem dominar. Todo o teorema é comparar $f(n)$ com '
      + '$n^{log_b a}$ e ver quem ganha.</p>'),

    '<h4>O procedimento, em quatro passos</h4>',
    steps([
      'Identifique $a$, $b$ e $f(n)$.',
      'Calcule $n^{log_b a}$. <em>Este é o número que decide tudo.</em>',
      'Compare $f(n)$ com $n^{log_b a}$ — e note que a comparação precisa ser '
      + '<strong>polinomial</strong>, isto é, por um fator $n^ε$.',
      'Aplique o caso correspondente. Se for o caso 3, <strong>verifique também a condição '
      + 'de regularidade</strong>.'
    ]),

    tbl(['Caso', 'Condição', 'Solução', 'Quem domina'], [
      ['<strong>1</strong>', '$f(n) = O(n^{log_b a − ε})$ para algum $ε > 0$',
       '$T(n) = Θ(n^{log_b a})$', 'as folhas'],
      ['<strong>2</strong>', '$f(n) = Θ(n^{log_b a})$',
       '$T(n) = Θ(n^{log_b a} · lg n)$', 'empate — todos os níveis custam o mesmo'],
      ['<strong>3</strong>', '$f(n) = Ω(n^{log_b a + ε})$ para algum $ε > 0$, '
       + '<strong>e</strong> $a·f(n/b) ≤ c·f(n)$ para algum $c < 1$',
       '$T(n) = Θ(f(n))$', 'a raiz']
    ]),

    '<h4>Um exemplo de cada caso</h4>',
    tbl(['Caso', 'Recorrência', 'Conta', 'Resultado'], [
      ['1', '$T(n) = 9T(n/3) + n$',
       '$a=9$, $b=3$ → $n^{log_3 9} = n^2$. E $f(n) = n = O(n^{2−1})$, com $ε=1$.',
       '$Θ(n^2)$'],
      ['2', '$T(n) = T(2n/3) + 1$',
       '$a=1$, $b=3/2$ → $n^{log_{3/2} 1} = n^0 = 1$. E $f(n) = Θ(1)$ — empate.',
       '$Θ(lg n)$'],
      ['3', '$T(n) = 3T(n/4) + n log n$',
       '$a=3$, $b=4$ → $n^{log_4 3} ≈ n^{0.79}$. E $n log n$ cresce polinomialmente mais. '
       + 'Regularidade: $3·\\f{n}{4}log\\f{n}{4} ≤ \\f{3}{4}n log n$, com $c = 3/4 < 1$. ✓',
       '$Θ(n log n)$']
    ]),

    warn('Quando o teorema NÃO se aplica',
      '<p>O Teorema Mestre exige que $f(n)$ seja <strong>polinomialmente</strong> maior ou '
      + 'menor que $n^{log_b a}$. Há três situações em que ele falha:</p>'
      + '<p><strong>1. A diferença é apenas logarítmica.</strong> Em '
      + '$T(n) = 2T(n/2) + n log n$: temos $n^{log_2 2} = n$, e $n log n$ é '
      + 'assintoticamente maior que $n$ — mas não existe $ε > 0$ com '
      + '$n log n = Ω(n^{1+ε})$. Cai na lacuna entre os casos 2 e 3. '
      + 'Pela árvore de recursão: são $log n$ níveis, cada um custando $Θ(n log n)$, '
      + 'logo $T(n) = Θ(n log^2 n)$.</p>'
      + '<p><strong>2. A recorrência é subtrativa</strong> — $T(n−1)$ em vez de $T(n/b)$. '
      + 'Use árvore de recursão ou soma telescópica.</p>'
      + '<p><strong>3. Os subproblemas têm tamanhos diferentes</strong> — '
      + '$T(n/3) + T(2n/3)$. Use árvore de recursão.</p>'),

    '<h4>A questão 1 da prova de 2026.1, resolvida</h4>',
    steps([
      '<strong>(a) $T(n) = 4T(n/2) + n^2$.</strong> $a=4$, $b=2$, logo '
      + '$n^{log_2 4} = n^2$. Como $f(n) = n^2 = Θ(n^2) = Θ(n^{log_b a})$, é o '
      + '<strong>caso 2</strong>. Resposta: $Θ(n^2 log n)$.',
      '<strong>(b) $T(n) = 3T(n/4) + n log n$.</strong> $n^{log_4 3} ≈ n^{0.79}$. '
      + 'Como $f(n) = Ω(n^{log_4 3 + ε})$ e a regularidade vale com $c = 3/4$, é o '
      + '<strong>caso 3</strong>. Resposta: $Θ(n log n)$.',
      '<strong>(c) $T(n) = 5T(n/4) + n log n$.</strong> $n^{log_4 5} ≈ n^{1.16}$. '
      + 'Como $n^{1.16}$ domina $n log n$ polinomialmente, $f(n) = O(n^{log_4 5 − ε})$ e é o '
      + '<strong>caso 1</strong>. Resposta: $Θ(n^{log_4 5})$.',
      '<strong>(d) $T(n) = 2T(n−1) + n$.</strong> Subtrativa — o teorema não se aplica. '
      + 'Pela árvore (ver seção anterior): $Θ(2^n)$.'
    ]),
    warn('Uma divergência no enunciado da Q1(c)',
      '<p>O enunciado impresso traz $f(n) = n log n$, mas o gabarito oficial escreve '
      + '$f(n) = n log^2 n$. Não muda a resposta: em ambos os casos o crescimento polinomial '
      + '$n^{1.16}$ domina um $n$ multiplicado por polilogaritmo, e cai no caso 1 com '
      + '$Θ(n^{log_4 5})$.</p>'
      + '<p>A lição generaliza: <strong>qualquer</strong> potência de $n$ maior que 1 vence '
      + '$n·log^k n$ para todo $k$ fixo. Se você percebe isso, não precisa decidir qual '
      + 'enunciado é o correto.</p>')
  ].join('') },

  { id: 'm2-hist', titulo: 'Método 4 — Remoção de histórico', html: [
    '<p>Serve para recorrências em que $T(n)$ depende de <em>todos</em> os valores anteriores, '
    + 'através de um somatório. Árvore de recursão e Teorema Mestre não funcionam aqui.</p>',
    '$$T(n) = \\f{1}{n}\\S{i=0}{n−1}\\p{T(i) + 1}$$',
    def('A tática',
      '<p>Multiplique por $n$ para limpar a fração, escreva a mesma equação para $n−1$, '
      + 'e <strong>subtraia</strong>. Os somatórios se cancelam quase por completo, deixando '
      + 'uma recorrência comum.</p>'),

    '<h4>A derivação, passo a passo</h4>',
    steps([
      'Multiplique por $n$ para limpar a fração — chame esta de equação <strong>(1)</strong>: '
      + '$$nT(n) = \\S{i=0}{n−1} T(i) + n$$',
      'Escreva a mesma equação para $n − 1$ — equação <strong>(2)</strong>: '
      + '$$(n−1)T(n−1) = \\S{i=0}{n−2} T(i) + (n−1)$$',
      'Subtraia (2) de (1). A diferença entre os somatórios é um único termo: '
      + '$$nT(n) − (n−1)T(n−1) = T(n−1) + 1$$',
      'Isole: $nT(n) = (n−1)T(n−1) + T(n−1) + 1 = nT(n−1) + 1$, e divida por $n$: '
      + '$$T(n) = T(n−1) + \\f{1}{n}$$',
      'Isto é a série harmônica. Telescopando: '
      + '$$T(n) = \\S{i=1}{n}\\f{1}{i} = H_n = Θ(log n)$$'
    ]),

    tip('Onde esse método aparece no curso',
      '<p>Nas duas análises de caso médio do Módulo 3 — o k-ésimo menor elemento '
      + '($Θ(n)$) e o Quick-sort ($Θ(n log n)$). Em ambos o somatório sobre todas as '
      + 'partições possíveis é exatamente esta estrutura.</p>'),

    '<h4>Exercícios de fixação do slide</h4>',
    '<p>Resolva indicando sempre o $Θ$. As respostas estão na Lista 1 e no banco de '
    + 'exercícios desta plataforma.</p>',
    tbl(['#', 'Recorrência', 'Método indicado', 'Resposta'], [
      ['1', '$T(n) = T(n−1) + Θ(n)$',                      'Telescópica',        '$Θ(n^2)$'],
      ['2', '$T(n) = T(n/2) + Θ(n)$',                      'Mestre, caso 3',     '$Θ(n)$'],
      ['3', '$T(n) = 2T(n/2) + Θ(1)$',                     'Mestre, caso 1',     '$Θ(n)$'],
      ['4', '$T(n) = 2T(n/2) + Θ(n)$',                     'Mestre, caso 2',     '$Θ(n log n)$'],
      ['5', '$T(n) = 4T(n/2) + Θ(n)$',                     'Mestre, caso 1',     '$Θ(n^2)$'],
      ['6', '$T(n) = \\f{1}{n}\\S{i=0}{n−1}(T(i) + Θ(n))$','Remoção de histórico','$Θ(n)$'],
      ['7', '$T(n) = \\f{2}{n}\\S{i=0}{n−1}(T(i) + Θ(n))$','Remoção de histórico','$Θ(n log n)$']
    ], 'Os itens 6 e 7 são, respectivamente, o k-ésimo menor e o Quick-sort no caso médio.')
  ].join('') }
  ]
},

/* ======================================================================== M3 */
{
  id: 'm3',
  num: '3',
  titulo: 'Divisão e conquista',
  fonte: 'Slide 03 — "Estratégia: divisão e conquista"',
  resumo: 'Metade da prova vem daqui, nas três provas: ler uma recursiva e extrair a '
        + 'recorrência, projetar uma do zero, e enriquecer o retorno para combinar em tempo '
        + 'constante. A última seção reúne os seis padrões de decomposição que cobrem as sete '
        + 'questões de projeto já cobradas.',
  secoes: [

  { id: 'm3-fases', titulo: 'As três fases', html: [
    def('A estratégia',
      '<p><strong>1. Dividir</strong> — o problema é partido em subproblemas menores.<br>'
      + '<strong>2. Conquistar</strong> — cada subproblema é resolvido independentemente, '
      + 'em geral recursivamente.<br>'
      + '<strong>3. Combinar</strong> — as soluções dos subproblemas produzem a solução do '
      + 'problema maior.</p>'),
    '<p>O que distingue um algoritmo de outro é <strong>onde está o trabalho</strong>:</p>',
    tbl(['Algoritmo', 'Dividir', 'Combinar', 'Recorrência'], [
      ['Busca binária', 'trivial — calcula o meio', 'trivial — descarta uma metade', '$T(n) = T(n/2) + Θ(1)$'],
      ['Merge Sort',    'trivial — parte no meio',  'custa $Θ(n)$ — intercala',      '$T(n) = 2T(n/2) + Θ(n)$'],
      ['Quick-sort',    'custa $Θ(n)$ — particiona','trivial — não faz nada',        '$T(n) = 2T(n/2) + Θ(n)$ (médio)']
    ], 'Merge Sort e Quick-sort são espelhos: o trabalho de um está na combinação, o do outro na divisão.'),
    tip('A modelagem é tudo',
      '<p>O slide insiste nisto: em cada problema clássico a seguir, o ganho vem de '
      + '<em>como o problema foi modelado</em>, não de uma otimização de código. '
      + 'Strassen ganha porque reescreveu a multiplicação com 7 produtos em vez de 8; '
      + 'a potência inteira ganha porque $x^n = (x^{n/2})^2$.</p>')
  ].join('') },

  { id: 'm3-pot', titulo: 'Potência inteira e Fibonacci', html: [
    '<h4>Potência inteira em tempo sublinear</h4>',
    '<p>Como calcular $x^n$ sem fazer $n$ multiplicações? Modele recursivamente:</p>',
    '$$x^n = \\c{\\p{x^{n/2}}^2}{se n é par}{x · \\p{x^{(n−1)/2}}^2}{caso contrário}$$',
    '<p>Uma chamada, sobre metade do expoente, com custo local constante:</p>',
    '$$T(n) = T(n/2) + Θ(1) ⇒ T(n) = Θ(log n)$$',
    warn('O detalhe que faz a diferença',
      '<p>Calcular $x^{n/2}$ <strong>uma vez</strong> e elevar ao quadrado é $Θ(log n)$. '
      + 'Escrever $x^{n/2} · x^{n/2}$ como duas chamadas recursivas dá '
      + '$T(n) = 2T(n/2) + Θ(1) = Θ(n)$ — e joga fora todo o ganho. '
      + 'Guardar o resultado numa variável é o algoritmo inteiro.</p>'),

    '<h4>A variante que já caiu: potência modular</h4>',

    '<p>A prova de 2025.1 pediu $x^n mod k$ em $Θ(log n)$ — mesma recursão, com uma torção. '
    + 'O enunciado dá a identidade de graça:</p>',

    def('A identidade do enunciado',
      '<p>Se $x$, $y$ e $k > 0$ são inteiros, então</p>'
      + '$$(xy) mod k = [(x mod k)(y mod k)] mod k$$'
      + '<p>Em palavras: dá no mesmo tirar o resto <em>antes</em> ou <em>depois</em> de '
      + 'multiplicar.</p>'),

    '<p>É isso que permite aplicar o $mod$ <strong>dentro</strong> da recursão. Sem a '
    + 'identidade você calcularia $x^n$ inteiro — um número com $Θ(n log x)$ dígitos, que '
    + 'estoura qualquer inteiro de máquina — e só então tiraria o resto. Com ela, todo valor '
    + 'intermediário fica abaixo de $k^2$.</p>',

    '<pre class="pseudo"><span class="ln"><span class="hd">1</span> <span class="kw">Function</span> <span class="fnn">pm</span>(x, n, k):</span>'
    + '<span class="ln"><span class="hd">2</span> <span class="kw">if</span> k = 1 <span class="kw">then return</span> 0</span>'
    + '<span class="ln"><span class="hd">3</span> <span class="kw">if</span> n = 0 <span class="kw">then return</span> 1</span>'
    + '<span class="ln"><span class="hd">4</span> <span class="kw">if</span> n <span class="kw">mod</span> 2 = 1 <span class="kw">then</span></span>'
    + '<span class="ln"><span class="hd">5</span>   r ← <span class="fnn">pm</span>(x, (n − 1)/2, k)</span>'
    + '<span class="ln"><span class="hd">6</span>   s ← x <span class="kw">mod</span> k</span>'
    + '<span class="ln"><span class="hd">7</span> <span class="kw">else</span></span>'
    + '<span class="ln"><span class="hd">8</span>   r ← <span class="fnn">pm</span>(x, n/2, k)</span>'
    + '<span class="ln"><span class="hd">9</span>   s ← 1</span>'
    + '<span class="ln"><span class="hd">10</span> <span class="kw">return</span> (r² × s) <span class="kw">mod</span> k</span></pre>',

    '<p>A recorrência é idêntica à da potência comum — uma chamada, metade do expoente, '
    + 'trabalho local constante:</p>',
    '$$T(n) = T(n/2) + Θ(1) ⇒ T(n) = Θ(log n)$$',

    tbl(['Linha', 'Por que existe'], [
      ['2 — $k = 1$ devolve 0', 'Qualquer inteiro módulo 1 é 0. O enunciado não pede, mas o gabarito inclui'],
      ['3 — $n = 0$ devolve 1', '$x^0 = 1$. É o caso base da recursão no expoente'],
      ['5–6 — expoente ímpar', 'Sobra um fator $x$: guarda-se $s = x mod k$ para multiplicar no fim'],
      ['8–9 — expoente par', 'Não sobra fator, então $s = 1$ (elemento neutro)'],
      ['10 — $(r^2 × s) mod k$', 'Uma única redução modular no retorno, válida pela identidade do enunciado']
    ]),

    warn('A recorrência é no expoente',
      '<p>O "tamanho da entrada" aqui é $n$, o <strong>expoente</strong> — não o vetor, não o '
      + 'número de bits, não $x$ nem $k$. É $n$ que cai pela metade a cada chamada, e é por isso '
      + 'que $T(n) = T(n/2) + Θ(1)$. Dizer isso explicitamente faz parte da resposta: o '
      + 'enunciado de 2025.1 pede o $Θ(log n)$ "fato que você deve mostrar através da '
      + 'recorrência a ela associada".</p>'),

    exam('<p><strong>2025.1 Q4</strong>, 3,0 pts — a questão mais pesada daquela prova. O '
      + 'gabarito observa que "este problema é muito similar ao cálculo da $n$-ésima potência '
      + 'de um número, visto em sala": se você sabe a potência inteira acima, já sabe 90% '
      + 'desta. O outro 10% é lembrar de reduzir módulo $k$ no retorno.</p>'),

    '<h4>N-ésimo termo de Fibonacci</h4>',
    '$$F(n) = \\c{F(n−1) + F(n−2)}{se n ≥ 2}{n}{se n < 2}$$',
    '<p><strong>Ingênuo.</strong> A formulação direta leva à recorrência '
    + '$T(n) = T(n−1) + T(n−2) + Θ(1)$, cujo custo é <strong>exponencial</strong>: '
    + '$O(φ^n)$ com $φ ≈ 1.618$, a razão áurea. A árvore recalcula os mesmos subproblemas '
    + 'um número exponencial de vezes.</p>',
    '<p><strong>Modelagem por álgebra linear.</strong> A transição de estados é uma '
    + 'multiplicação de matrizes:</p>',
    '$$\\M{F(n+1)}{F(n)}{F(n)}{F(n−1)} = \\M{1}{1}{1}{0}^n$$',
    '<p>Multiplicar $n$ vezes iterativamente dá $Θ(n)$ — já é exponencialmente melhor. '
    + 'Mas a matriz está elevada a $n$, e acabamos de aprender a calcular potências em '
    + '$Θ(log n)$: aplicando exponenciação rápida à matriz, obtém-se</p>',
    '$$T(n) = Θ(log n) \\t{ multiplicações de matrizes } 2×2$$',
    tip('A ligação que o slide pede que você faça',
      '<p>O slide deixa essa última passagem como pergunta, com a dica "lembre-se do problema '
      + 'da potência inteira". A resposta é exatamente esta: uma matriz $2×2$ multiplica em '
      + '$Θ(1)$, então elevar a matriz a $n$ por quadrados sucessivos custa $Θ(log n)$.</p>')
  ].join('') },

  { id: 'm3-hanoi', titulo: 'Torres de Hanói', html: [
    def('O problema (Édouard Lucas, 1883)',
      '<p>Dados $n$ discos em ordem decrescente de diâmetro numa das três torres, transferir '
      + 'todos para outra torre no menor número de movimentos, sem violar as restrições: '
      + '(1) apenas um disco por vez; (2) apenas o disco do topo pode ser movido; '
      + '(3) um disco maior nunca sobre um menor.</p>'),
    '<p>A modelagem recursiva — assuma que você já sabe resolver para $n−1$ discos:</p>',
    steps([
      'Passe os $n−1$ discos do topo da torre A para a torre B (usando C como auxiliar).',
      'Mova o $n$-ésimo disco, o maior, de A para C. Um único movimento.',
      'Passe os $n−1$ discos de B para C (usando A como auxiliar).'
    ]),
    '$$T(n) = 2T(n−1) + 1 ⇒ T(n) = 2^n − 1 = Θ(2^n)$$',
    P({ title: 'Algoritmo 1 — hanoi(n, TA, TC, TB)',
      io: ['<strong>Entrada:</strong> $n$ discos empilhados em TA em ordem decrescente',
           '<strong>Saída:</strong> mover os $n$ discos para TC, usando TB como auxiliar'],
      lines: [
        '<span class="kw">if</span> n = 1 <span class="kw">then</span>',
        '  <span class="fnn">mover</span>(TA, TC)',
        '<span class="kw">else</span>',
        '  <span class="fnn">hanoi</span>(n − 1, TA, TB, TC)   <span class="cm">// n−1 para a auxiliar</span>',
        '  <span class="fnn">mover</span>(TA, TC)              <span class="cm">// o maior para o destino</span>',
        '  <span class="fnn">hanoi</span>(n − 1, TB, TC, TA)   <span class="cm">// n−1 da auxiliar ao destino</span>'
      ] }),
    tip('O que Hanói ensina',
      '<p>É o exemplo canônico de que divisão e conquista <strong>não implica eficiência</strong>. '
      + 'Aqui a decomposição é ótima — $2^n − 1$ é comprovadamente o mínimo de movimentos — '
      + 'e ainda assim o custo é exponencial, porque o problema é intrinsecamente exponencial '
      + 'no tamanho da saída. Divisão e conquista ajuda quando dá para <em>descartar</em> '
      + 'subproblemas ou <em>reduzir</em> quantos são.</p>')
  ].join('') },

  { id: 'm3-strassen', titulo: 'Multiplicação de matrizes: Strassen', html: [
    '<p>Objetivo: multiplicar duas matrizes $n×n$ em tempo melhor que $O(n^3)$.</p>',
    '<h4>Primeira tentativa — que não ganha nada</h4>',
    '<p>Parta cada matriz em quatro blocos $n/2 × n/2$:</p>',
    '$$C = A·B = \\M{A_{11}B_{11} + A_{12}B_{21}}{A_{11}B_{12} + A_{12}B_{22}}'
    + '{A_{21}B_{11} + A_{22}B_{21}}{A_{21}B_{12} + A_{22}B_{22}}$$',
    '<p>São <strong>8</strong> multiplicações e 4 somas de matrizes $n/2 × n/2$. As somas '
    + 'custam $Θ(n^2)$:</p>',
    '$$T(n) = 8T(n/2) + Θ(n^2)$$',
    '<p>Pelo Teorema Mestre: $n^{log_2 8} = n^3$, e $f(n) = n^2 = O(n^{3−1})$ — caso 1, '
    + 'logo $Θ(n^3)$. <strong>Nenhum ganho</strong> sobre o método tradicional.</p>',

    '<h4>A modelagem de Strassen (1969)</h4>',
    def('A ideia',
      '<p>Volker Strassen encontrou uma forma de obter os quatro blocos de $C$ usando '
      + '<strong>7</strong> multiplicações em vez de 8, ao custo de mais somas. Como somas são '
      + '$Θ(n^2)$ e multiplicações são recursivas, trocar uma multiplicação por várias somas '
      + 'é um bom negócio.</p>'
      + '$$T(n) = 7T(n/2) + Θ(n^2) = Θ(n^{log_2 7}) ≈ Θ(n^{2.81})$$'),
    '<p>Os sete produtos:</p>',
    tbl(['', ''], [
      ['$P_1 = A_{11}(B_{12} − B_{22})$',             '$P_2 = (A_{11} + A_{12})B_{22}$'],
      ['$P_3 = (A_{21} + A_{22})B_{11}$',             '$P_4 = A_{22}(B_{21} − B_{11})$'],
      ['$P_5 = (A_{11} + A_{22})(B_{11} + B_{22})$',  '$P_6 = (A_{12} − A_{22})(B_{21} + B_{22})$'],
      ['$P_7 = (A_{21} − A_{11})(B_{11} + B_{12})$',  '']
    ]),
    '<p>E a recombinação:</p>',
    '$$C = \\M{P_5 + P_4 − P_2 + P_6}{P_1 + P_2}{P_3 + P_4}{P_1 + P_5 − P_3 + P_7}$$',
    steps([
      'Dividir $A$ e $B$ em submatrizes $n/2 × n/2$.',
      'Calcular as 7 matrizes $P_i$ — são as chamadas recursivas.',
      'Calcular os 4 blocos de $C$ por somas e subtrações dos $P_i$.'
    ]),
    warn('Duas ressalvas do slide',
      '<p>Assume-se implicitamente que $n$ é potência de 2. Caso não seja, preenche-se com '
      + 'linhas e colunas de zeros (<em>padding</em>) — o que no máximo dobra $n$ e não altera '
      + 'a classe assintótica.</p>'
      + '<p>As constantes ocultas de Strassen são altas: o algoritmo só é vantajoso na prática '
      + 'para $n$ muito grande. É um resultado teórico importante que raramente se usa como '
      + 'está.</p>'),
    tip('O padrão a levar para a prova',
      '<p><strong>Reduzir o número de subproblemas</strong> é uma forma de acelerar divisão e '
      + 'conquista, distinta de reduzir o tamanho deles. Aparece em Strassen (8→7) e em '
      + 'Karatsuba (4→3 multiplicações de inteiros, item 2 dos exercícios do slide, dando '
      + '$T(n) = 3T(n/2) + Θ(n) = Θ(n^{lg 3}) ≈ Θ(n^{1.585})$).</p>'
      + '<p>O item 4.5-2 do Cormen (item 51 da lista) pergunta justamente o inverso: quantos '
      + 'subproblemas de tamanho $n/4$ você pode ter e ainda bater Strassen?</p>')
  ].join('') },

  { id: 'm3-kesimo', titulo: 'Particionamento e o k-ésimo menor', html: [
    '<p>Dada uma sequência $X$ de tamanho $n$ e um $k$ com $1 ≤ k ≤ n$, encontrar o k-ésimo '
    + 'menor elemento.</p>',
    '<p><strong>Solução trivial:</strong> ordenar e devolver $X[k]$. Custo $Θ(n log n)$. '
    + 'A pergunta é se dá para fazer melhor.</p>',
    def('A ideia de divisão e conquista',
      '<p>Escolha um pivô, particione $X$ de modo que os menores fiquem à esquerda e os '
      + 'maiores à direita. Agora você sabe a <em>posição final</em> do pivô — e pode '
      + '<strong>descartar inteiramente</strong> a partição que não contém o k-ésimo. '
      + 'Ao contrário do Merge Sort, só se recorre em <em>um</em> lado.</p>'),

    '<h4>A rotina de particionamento (Hoare)</h4>',
    P({ title: 'Algoritmo 2 — particiona(X, a, b)',
      io: ['<strong>Entrada:</strong> vetor $X$, índices $a$ e $b$',
           '<strong>Saída:</strong> índice $r$ do pivô em sua posição final ordenada'],
      lines: [
        'v ← X[a]                                      <span class="cm">// pivô</span>',
        'l ← a;  r ← b',
        '<span class="kw">while</span> l &lt; r <span class="kw">do</span>',
        '  <span class="kw">while</span> X[l] ≤ v <span class="kw">and</span> l ≤ b <span class="kw">do</span> l ← l + 1',
        '  <span class="kw">while</span> X[r] &gt; v <span class="kw">and</span> r ≥ a <span class="kw">do</span> r ← r − 1',
        '  <span class="kw">if</span> l &lt; r <span class="kw">then</span> <span class="fnn">trocar</span>(X[l], X[r])',
        '<span class="fnn">trocar</span>(X[a], X[r])                          <span class="cm">// põe o pivô no lugar</span>',
        '<span class="kw">return</span> r'
      ] }),
    '<p>Os dois laços internos, juntos, varrem o intervalo uma única vez: '
    + '<code>l</code> só cresce e <code>r</code> só decresce. Logo <code>particiona</code> '
    + 'custa $Θ(n)$ — e este é o item 46(a) da Lista 1.</p>',

    '<h4>O algoritmo de seleção</h4>',
    P({ title: 'Algoritmo 3 — k-menor(X, a, b, k)',
      io: ['<strong>Entrada:</strong> $X$, limites $a, b$ e a posição $k$ desejada',
           '<strong>Saída:</strong> o k-ésimo menor elemento do subvetor'],
      lines: [
        '<span class="kw">if</span> a = b <span class="kw">then return</span> X[a]',
        'p ← <span class="fnn">particiona</span>(X, a, b)',
        't ← p − a + 1                    <span class="cm">// tamanho da part. esquerda + pivô</span>',
        '<span class="kw">if</span> k = t <span class="kw">then</span>',
        '  <span class="kw">return</span> X[p]                     <span class="cm">// o pivô é o elemento procurado</span>',
        '<span class="kw">else if</span> k &gt; t <span class="kw">then</span>',
        '  <span class="kw">return</span> <span class="fnn">k-menor</span>(X, p + 1, b, k − t)  <span class="cm">// à direita, ajustando k</span>',
        '<span class="kw">else</span>',
        '  <span class="kw">return</span> <span class="fnn">k-menor</span>(X, a, p − 1, k)      <span class="cm">// à esquerda</span>'
      ] }),
    warn('O ajuste de $k$',
      '<p>Ao recorrer à direita, o $k$ muda: os $t$ elementos descartados à esquerda já não '
      + 'contam, então se procura o $(k − t)$-ésimo menor do subvetor direito. '
      + 'Esquecer esse ajuste é o bug clássico deste algoritmo.</p>'),

    '<h4>Pior caso: pior que ordenar</h4>',
    '<p>Se o particionamento for sempre o pior possível — por exemplo, vetor já ordenado com '
    + 'pivô numa extremidade — cada chamada elimina um único elemento:</p>',
    '$$T(n) = T(n−1) + Θ(n) ⇒ T(n) = Θ(n^2)$$',
    '<p>Ficou <em>pior</em> que simplesmente ordenar em $Θ(n log n)$. Onde está o ganho?</p>',

    '<h4>Caso médio: linear</h4>',
    '<p>A reflexão do slide: para uma sequência de tamanho $n$ existem $n$ formas distintas de '
    + 'particioná-la — proporções $(0, n−1), (1, n−2), …, (n−1, 0)$. Será que o '
    + 'particionamento é <em>sempre</em> o pior possível na prática? Assumindo que cada divisão '
    + 'é igualmente provável, com probabilidade $1/n$:</p>',
    '$$T(n) = \\f{1}{n}\\S{i=0}{n−1} T(i) + Θ(n)$$',
    '<p>Aplicando remoção de histórico: multiplique por $n$, escreva para $n−1$, subtraia.</p>',
    '$$nT(n) − (n−1)T(n−1) = T(n−1) + Θ(n)$$',
    '$$nT(n) = nT(n−1) + Θ(n) ⇒ T(n) = T(n−1) + Θ(1) ⇒ T(n) = Θ(n)$$',
    tip('Conclusão',
      '<p>No caso médio encontra-se o k-ésimo menor em <strong>tempo linear</strong> — melhor '
      + 'que ordenar. O pior caso quadrático existe, mas é raro, e escolher o pivô ao azar o '
      + 'torna improvável. (Existe também um algoritmo $Θ(n)$ no <em>pior</em> caso, '
      + 'o "mediana das medianas" — Cormen 9.3, fora do escopo desta prova.)</p>')
  ].join('') },

  { id: 'm3-quick', titulo: 'Quick-sort', html: [
    def('A ideia',
      '<p>Se colocarmos um elemento na sua posição final correta, basta ordenar '
      + 'recursivamente as duas subsequências à esquerda e à direita dele. E colocar um '
      + 'elemento na posição correta é exatamente o que <code>particiona</code> faz.</p>'),
    P({ title: 'Algoritmo 4 — quickSort(X, a, b)',
      io: ['<strong>Entrada:</strong> vetor $X$, do índice $a$ até $b$',
           '<strong>Saída:</strong> $X[a..b]$ ordenado no local (<em>in-place</em>)'],
      lines: [
        '<span class="kw">if</span> a &lt; b <span class="kw">then</span>',
        '  p ← <span class="fnn">particiona</span>(X, a, b)   <span class="cm">// posiciona o pivô</span>',
        '  <span class="fnn">quickSort</span>(X, a, p − 1)    <span class="cm">// ordena a primeira metade</span>',
        '  <span class="fnn">quickSort</span>(X, p + 1, b)    <span class="cm">// ordena a segunda metade</span>'
      ] }),
    '<p>Ao contrário do Merge Sort — onde a divisão é trivial e a combinação dá trabalho — '
    + 'no Quick-sort a <strong>divisão dá trabalho e a combinação é trivial</strong>: '
    + 'não faz absolutamente nada.</p>',

    '<h4>Pior caso</h4>',
    '<p>Assim como no k-ésimo menor, o particionamento mais desequilibrado possível dá:</p>',
    '$$T(n) = T(n−1) + Θ(n) ⇒ T(n) = Θ(n^2)$$',

    '<h4>Caso médio</h4>',
    '<p>O fator 2 aparece porque <em>ambos</em> os lados são resolvidos — não se descarta '
    + 'nenhum:</p>',
    '$$T(n) = \\f{2}{n}\\S{k=0}{n−1} T(k) + Θ(n)$$',
    steps([
      'Multiplique por $n$ e subtraia a equação de $n−1$: '
      + '$$nT(n) − (n−1)T(n−1) = 2T(n−1) + Θ(n)$$',
      'Reagrupe: $$nT(n) = (n+1)T(n−1) + Θ(n)$$',
      'Divida por $n(n+1)$ para desacoplar: '
      + '$$\\f{T(n)}{n+1} = \\f{T(n−1)}{n} + \\f{Θ(1)}{n+1}$$',
      'Expandindo os termos, a soma telescopa numa harmônica: '
      + '$$\\f{T(n)}{n+1} = Θ(1)·\\S{i=2}{n+1}\\f{1}{i} = Θ(1)\\p{\\f{1}{2} + \\f{1}{3} + ⋯ + \\f{1}{n+1}}$$',
      'A série harmônica é $Θ(log n)$, logo $\\f{T(n)}{n+1} = Θ(log n)$ e finalmente '
      + '$$T(n) = Θ(n log n)$$'
    ]),
    tip('No caso médio, o Quick-sort é incrivelmente rápido',
      '<p>Mesma classe do Merge Sort, mas com constantes menores e sem memória auxiliar '
      + '(<em>in-place</em>). Por isso é o algoritmo de ordenação mais usado na prática, '
      + 'apesar do pior caso quadrático.</p>'),
    exam('<p>A confusão que custa ponto: $Θ(n log n)$ é o caso <strong>médio</strong> do '
      + 'Quick-sort, não o pior. Se a questão pedir o pior caso, a resposta é $Θ(n^2)$.</p>')
  ].join('') },

  {id: 'm3-repertorio', titulo: 'Repertório de decomposições (as questões de projeto)', html: [
    '<p>Toda prova traz ao menos uma questão pedindo que você <em>invente</em> um algoritmo — '
    + 'caiu em <strong>3 de 3</strong>, e duas delas trouxeram duas. Não há receita, mas há um '
    + 'repertório pequeno de padrões, e todo enunciado das três provas caiu em um deles. '
    + 'Aprender a reconhecer qual é metade do trabalho.</p>',

    tbl(['Padrão', 'Recorrência típica', 'Onde já caiu'], [
      ['1 — Descartar metade com informação local', '$T(n/2) + Θ(1) = Θ(log n)$',
       '2026.1 Q5 (unimodal) · 2025.1 Q3 (melhor caso)'],
      ['2 — Retorno enriquecido', '$2T(n/2) + Θ(1) = Θ(n)$',
       '<strong>2025.2 Q3 e 2026.1 Q6</strong> — o mesmo problema, duas vezes'],
      ['3 — Reduzir o número de subproblemas', '$7T(n/2) + Θ(n^2)$',
       'Strassen e Karatsuba (slide 03)'],
      ['4 — Combinar com trabalho linear', '$2T(n/2) + Θ(n) = Θ(n log n)$',
       '2025.1 Q5 (maior soma) · par de pontos'],
      ['5 — Contar para validar um candidato', '$2T(n/2) + Θ(n) = Θ(n log n)$',
       '2025.2 Q4 (majoritário)'],
      ['6 — Dividir o expoente, não a entrada', '$T(n/2) + Θ(1) = Θ(log n)$',
       '2025.1 Q4 ($x^n mod k$)']
    ], 'Seis padrões cobrem as sete questões de projeto das três provas.'),

    '<h4>Padrão 1 — Descartar metade com informação local</h4>',
    def('Quando aplicar',
      '<p>Quando, olhando apenas o elemento do meio (e talvez seu vizinho), você consegue '
      + 'provar que a resposta <strong>não está</strong> em uma das metades. '
      + 'Recorrência $T(n) = T(n/2) + Θ(1) ⇒ Θ(log n)$.</p>'),
    '<p><strong>O caso da Q5 de 2026.1: vetor unimodal.</strong> Um vetor de $n$ elementos '
    + 'distintos é unimodal se cresce estritamente até um pico e depois decresce '
    + 'estritamente — por exemplo $[1, 3, 7, 15, 9, 4, 2]$. Encontrar o máximo.</p>',
    '<p>Olhe $X[i]$ e $X[i+1]$. Se $X[i] < X[i+1]$, você está na subida, e o pico está à '
    + 'direita. Se $X[i] > X[i+1]$, está na descida, e o pico está à esquerda (podendo ser '
    + 'o próprio $i$). Um único subproblema, de metade do tamanho:</p>',
    '$$T(n) = T(n/2) + Θ(1) ⇒ T(n) = Θ(log n)$$',
    P({ title: 'Gabarito de 2026.1 — Topo(X, a, b)',
      lines: [
        '<span class="kw">Function</span> <span class="fnn">Topo</span>(X, a, b):',
        '  <span class="kw">if</span> a = b <span class="kw">then return</span> X[a]',
        '  i ← ⌊(a + b)/2⌋',
        '  <span class="kw">if</span> X[i] &lt; X[i + 1] <span class="kw">then</span>',
        '    <span class="kw">return</span> <span class="fnn">Topo</span>(X, i + 1, b)',
        '  <span class="kw">else</span>',
        '    <span class="kw">return</span> <span class="fnn">Topo</span>(X, a, i)'
      ] }),
    '<p><strong>Outros problemas do mesmo padrão:</strong> encontrar $i$ com $X[i] = i$ num '
    + 'vetor ordenado de inteiros distintos (item 3 dos exercícios do slide) — a função '
    + '$X[i] − i$ é monótona, então busca binária sobre ela; e o k-ésimo elemento da união de '
    + 'dois vetores ordenados em $O(log m + log n)$ (item 4).</p>',

    '<h4>Padrão 2 — Retorno enriquecido</h4>',
    def('Quando aplicar',
      '<p>Quando a resposta pode "cruzar" a fronteira entre as metades, e recalcular o caso '
      + 'que cruza custaria caro. A saída é fazer cada chamada recursiva devolver '
      + '<strong>mais informação</strong> que apenas a resposta — o suficiente para combinar '
      + 'em $Θ(1)$. Recorrência $T(n) = 2T(n/2) + Θ(1) ⇒ Θ(n)$.</p>'),
    '<p><strong>O caso da Q6 de 2026.1: maior diferença.</strong> Dado $A$ com $n$ valores, '
    + 'achar índices $i ≤ j$ que maximizem $A[j] − A[i]$.</p>',
    exam('<p><strong>Este é o problema mais repetido do acervo.</strong> Caiu na Q3 de 2025.2 '
      + '(2,5 pts, pedindo que você <em>analise</em> o pseudocódigo pronto) e na Q6 de 2026.1 '
      + '(1,0 pt extra, pedindo que você <em>projete</em>). Mesmo problema, mesma tripla, dois '
      + 'ângulos. Se houver um algoritmo para saber de cor, é este.</p>'),
    '<p>Dividindo em Esquerda e Direita, a maior diferença está inteiramente em E, '
    + 'inteiramente em D, ou cruza ($i ∈ E$, $j ∈ D$). O caso que cruza é '
    + '$max(D) − min(E)$ — calculável em $Θ(1)$ <em>se</em> cada chamada já devolver o '
    + 'mínimo e o máximo da sua metade. Então cada chamada retorna a tripla '
    + '$(min, max, maiorDiferença)$:</p>',
    P({ title: 'Gabarito de 2026.1 — MaxDif(V, a, b)',
      lines: [
        '<span class="kw">Function</span> <span class="fnn">MaxDif</span>(V, a, b):',
        '  <span class="kw">if</span> a = b <span class="kw">then return</span> (V[a], V[a], 0)',
        '  i ← ⌊(a + b)/2⌋',
        '  (minE, maxE, difE) ← <span class="fnn">MaxDif</span>(V, a, i)',
        '  (minD, maxD, difD) ← <span class="fnn">MaxDif</span>(V, i + 1, b)',
        '  <span class="kw">return</span> ( <span class="fnn">min</span>(minE, minD),',
        '           <span class="fnn">max</span>(maxE, maxD),',
        '           <span class="fnn">max</span>(difE, difD, maxD − minE) )'
      ] }),
    '$$T(n) = 2T(n/2) + Θ(1) ⇒ T(n) = Θ(n)$$',
    tip('Como reconhecer na prova',
      '<p>O enunciado praticamente entrega: "note que para alcançar este objetivo, a chamada '
      + 'recursiva deve retornar não apenas a maior diferença, mas também o menor e o maior '
      + 'elemento". Quando o enunciado descreve os três casos (em E, em D, cruzando), '
      + 'é este padrão. O problema da <strong>subsequência de soma máxima</strong> é a '
      + 'variante mais famosa.</p>'),
    warn('Por que $Θ(n)$ e não $Θ(n log n)$',
      '<p>Se o caso que cruza custasse $Θ(n)$ — varrer as duas metades para achar min e max — '
      + 'teríamos $T(n) = 2T(n/2) + Θ(n) = Θ(n log n)$. O retorno enriquecido derruba a '
      + 'combinação para $Θ(1)$, e o Teorema Mestre cai do caso 2 para o caso 1. '
      + 'Essa é a diferença entre 1,0 ponto e 0,5.</p>'),

    '<h4>Padrão 3 — Reduzir o número de subproblemas</h4>',
    '<p>Em vez de resolver menos, resolva <em>menos vezes</em>. Strassen: $8T(n/2) → 7T(n/2)$. '
    + 'Karatsuba: para multiplicar inteiros de $n$ dígitos, $4T(n/2) → 3T(n/2)$, porque '
    + '$(a+b)(c+d) − ac − bd = ad + bc$ economiza um produto. '
    + 'Resultado: $Θ(n^{lg 3}) ≈ Θ(n^{1.585})$, melhor que $Θ(n^2)$.</p>',

    '<h4>Padrão 4 — Combinar com trabalho linear após ordenar/pré-processar</h4>',
    '<p><strong>Par de pontos mais próximos</strong> (item 1 dos exercícios do slide), em '
    + '$O(n log n)$ no pior caso: ordene por $x$; divida por uma reta vertical; resolva as '
    + 'duas metades recursivamente obtendo $δ = min(δ_E, δ_D)$; e para o caso que cruza, '
    + 'só é preciso examinar a faixa de largura $2δ$ em torno da reta — onde, ordenando por '
    + '$y$, cada ponto precisa ser comparado com no máximo 7 vizinhos. '
    + 'Combinação em $O(n)$, logo $T(n) = 2T(n/2) + O(n) = O(n log n)$.</p>',

    '<h4>Padrão 5 — Contar para validar um candidato (elemento majoritário)</h4>',
    '<p>Existe um elemento que aparece em mais da metade das posições? '
    + 'Aparece nos exercícios do slide 03 (item 5), na Lista 1 (item 76) e — valendo '
    + '<strong>3,0 pts</strong> — na Q4 de 2025.2.</p>',
    def('A forma do padrão',
      '<p>A recursão <strong>não resolve</strong> o problema: ela só produz '
      + '<em>candidatos</em>. A validação é uma varredura linear separada. Reconhecer isso é o '
      + 'que destrava o enunciado — quem tenta fazer a recursão já devolver a resposta certa '
      + 'não fecha o algoritmo.</p>'),
    '<p><strong>Por divisão e conquista, $O(n log n)$:</strong> um majoritário de $V$ tem de '
    + 'ser majoritário de ao menos uma das metades. Resolva as duas, obtendo no máximo dois '
    + 'candidatos, e verifique cada um com uma varredura $O(n)$. '
    + '$T(n) = 2T(n/2) + O(n) = O(n log n)$.</p>',
    '<p><strong>Em $O(n)$ (Boyer–Moore):</strong> mantenha um candidato e um contador. '
    + 'Percorra o vetor: se o contador é zero, adote o elemento atual como candidato com '
    + 'contador 1; se o elemento é igual ao candidato, incremente; senão, decremente. '
    + 'Ao fim, o candidato é o único possível majoritário — confirme com uma segunda '
    + 'varredura. A intuição: cada decremento "cancela" uma ocorrência do majoritário contra '
    + 'uma de outro elemento, e quem tem mais da metade sobrevive a todos os cancelamentos.</p>',
    tip('A resposta à pergunta do slide',
      '<p>O slide pergunta "seria possível resolver este problema em tempo $O(n)$?". '
      + 'Sim — Boyer–Moore, acima, sem memória extra e sem ordenar, exatamente como o '
      + 'enunciado exige. E o item 76(b) da lista pergunta o que muda se os elementos só '
      + 'admitirem teste de igualdade: nada, porque Boyer–Moore nunca compara por ordem, '
      + 'apenas por igualdade.</p>'),
    exam('<p><strong>2025.2 Q4</strong>, 3,0 pts. O enunciado pede explicitamente '
      + '"sem usar ordenação, mas usando divisão e conquista", com teto $O(n log n)$ — '
      + 'ou seja, pede a versão por D&amp;C, não Boyer–Moore. E entrega a dica: "se há '
      + 'proposta majoritária em $X$, ela deve ser majoritária em ao menos uma das metades". '
      + 'Saiba as duas, mas entregue a que o enunciado pediu.</p>'),

    '<h4>Padrão 6 — Dividir o expoente, não a entrada</h4>',
    def('Quando aplicar',
      '<p>Quando o "tamanho" do problema não é uma coleção, e sim um <strong>número</strong> — '
      + 'um expoente, um contador, um alcance. A recursão cai pela metade sobre esse número, '
      + 'e não sobre um vetor. Recorrência $T(n) = T(n/2) + Θ(1) ⇒ Θ(log n)$.</p>'),
    '<p>É o padrão da potência inteira $x^n$ e da sua variante modular '
    + '$x^n mod k$, que valeu <strong>3,0 pts na Q4 de 2025.1</strong>. '
    + 'A derivação completa, com o pseudocódigo do gabarito e a identidade '
    + '$(xy) mod k = [(x mod k)(y mod k)] mod k$, está na seção '
    + '<a href="#m3-pot">Potência inteira e Fibonacci</a>.</p>',
    warn('O erro de contagem',
      '<p>Aqui é fácil errar <em>em que variável</em> está a recorrência. Em $x^n mod k$ o '
      + 'parâmetro que diminui é $n$, o expoente — não $x$, não $k$, não um número de '
      + 'elementos. Dizer isso explicitamente é parte da resposta, porque é o que justifica '
      + 'o $log n$.</p>')
  ].join('') }
  ]
}

  ];
})();
