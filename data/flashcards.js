/* ==========================================================================
   flashcards.js — 5 decks para repetição espaçada.
   Formato: { id, deck, f: frente, v: verso, tag? }
   Matemática em $…$ / $$…$$, processada por AG.tex().

   Numeração dos ids por bloco de deck:
     D0 c001+ · D1 c101+ · D2 c201+ · D3 c301+ · D4 c401+
   Os cartões c411–c422 vieram da comparação das três Avaliação 1
   (2025.1, 2025.2, 2026.1) — alguns moram em D2/D3 por assunto.
   ========================================================================== */

window.DECKS = [
  { id: 'D0', nome: 'Pré-requisitos',      cor: 'gold',
    desc: 'Logaritmos, somatórios, fatoriais. Não é "conteúdo da prova" — é o que faz você '
        + 'errar no meio de uma questão que sabia.' },
  {id: 'D1', nome: 'Conceitos e assintótica', cor: 'accent',
    desc: 'Definições de O, Ω e Θ, invariantes, modelo RAM. Base da questão de invariante de '
        + 'laço e da questão conceitual de assintótica.' },
  {id: 'D2', nome: 'Recorrências', cor: 'ok',
    desc: 'Teorema Mestre, substituição, árvore, remoção de histórico, e as recorrências '
        + 'canônicas de reconhecimento imediato. A questão de recorrências caiu em 3 de 3 provas.' },
  {id: 'D3', nome: 'Divisão e conquista', cor: 'warn',
    desc: 'Cada algoritmo clássico: recorrência, complexidade e a ideia que o faz funcionar. '
        + 'Ler e projetar D&C somam metade da nota — e caíram em 3 de 3 provas.' },
  {id: 'D4', nome: 'Padrões de prova', cor: 'bad',
    desc: 'O roteiro de resposta de cada tipo de questão, o que caiu em quantas das três '
        + 'provas, e toda recorrência já cobrada. Revise na véspera.' }
];

window.FLASHCARDS = [

/* ===================================================== D0 · Pré-requisitos */

{ id: 'c001', deck: 'D0', tag: 'log', f: 'Logaritmo de um produto: $log_b(xy) = $ ?',
  v: '$$log_b(xy) = log_b x + log_b y$$<p>É o que permite abrir $log(n!)$ numa soma de logaritmos.</p>' },

{ id: 'c002', deck: 'D0', tag: 'log', f: 'Logaritmo de um quociente: $log_b(x/y) = $ ?',
  v: '$$log_b(x/y) = log_b x − log_b y$$'
   + '<p>É o passo central da substituição: $log(n/2) = log n − log 2 = log n − 1$ na base 2.</p>' },

{ id: 'c003', deck: 'D0', tag: 'log', f: 'Logaritmo de uma potência: $log_b(x^a) = $ ?',
  v: '$$log_b(x^a) = a · log_b x$$'
   + '<p>Usado para comparar crescimento: $log(n^{1.5}) = 1.5 log n$.</p>' },

{ id: 'c004', deck: 'D0', tag: 'log', f: 'Mudança de base: $log_b x = $ ? (em termos da base $c$)',
  v: '$$log_b x = \\f{log_c x}{log_c b}$$'
   + '<p><strong>Consequência:</strong> $1/log_c b$ é constante, logo a base desaparece dentro '
   + 'de notação assintótica — $log_2 n = Θ(log_{10} n) = Θ(ln n)$. É por isso que escrevemos '
   + '$Θ(log n)$ sem base.</p>' },

{ id: 'c005', deck: 'D0', tag: 'log', f: 'A identidade que sustenta o Teorema Mestre: $a^{log_b n} = $ ?',
  v: '$$a^{log_b n} = n^{log_b a}$$'
   + '<p>É exatamente daqui que sai o $n^{log_b a}$ do teorema: a árvore tem $a^{log_b n}$ folhas, '
   + 'e essa expressão se reescreve como $n^{log_b a}$.</p>' },

{ id: 'c006', deck: 'D0', tag: 'log', f: 'Quanto vale $2^{lg n}$?',
  v: '$$2^{lg n} = n$$'
   + '<p>Porque $lg$ é o logaritmo de base 2 — exponencial e logaritmo de mesma base se cancelam. '
   + 'Aparece ao contar folhas de árvores binárias: $2^{lg n} = n$ folhas.</p>' },

{ id: 'c007', deck: 'D0', tag: 'log', f: 'Qual a diferença entre $lg^2 n$, $lg lg n$ e $lg^{(2)} n$?',
  v: '<p>$lg^2 n = (lg n)^2$ — o logaritmo elevado ao quadrado.</p>'
   + '<p>$lg lg n$ — o logaritmo do logaritmo. Cresce muitíssimo mais devagar.</p>'
   + '<p>$lg^{(2)} n = lg lg n$ — a notação de iteração funcional, igual ao anterior.</p>'
   + '<p>Confundir os dois primeiros muda a resposta: $2T(n/2) + n lg n$ dá $Θ(n lg^2 n)$, '
   + 'não $Θ(n lg lg n)$.</p>' },

{ id: 'c008', deck: 'D0', tag: 'somas', f: 'Soma aritmética: $\\S{i=1}{n} i = $ ?',
  v: '$$\\S{i=1}{n} i = \\f{n(n+1)}{2} = Θ(n^2)$$'
   + '<p>É a soma que fecha a questão 2 da prova e a análise do pior caso do insertion sort.</p>' },

{ id: 'c009', deck: 'D0', tag: 'somas', f: 'Soma dos quadrados: $\\S{i=1}{n} i^2 = $ ?',
  v: '$$\\S{i=1}{n} i^2 = \\f{n(n+1)(2n+1)}{6} = Θ(n^3)$$'
   + '<p>Generalizando: $\\S{i=1}{n} i^k = Θ(n^{k+1})$ — a soma "sobe um grau".</p>' },

{ id: 'c010', deck: 'D0', tag: 'somas', f: 'Série geométrica finita: $\\S{i=0}{n} x^i = $ ?',
  v: '$$\\S{i=0}{n} x^i = \\f{x^{n+1} − 1}{x − 1}, \\t{ para } x ≠ 1$$'
   + '<p>Se $x > 1$, a soma é $Θ$ do <strong>último</strong> termo. Se $x < 1$, é $Θ(1)$.</p>' },

{ id: 'c011', deck: 'D0', tag: 'somas', f: 'Série geométrica infinita com $|x| < 1$: $\\S{i=0}{∞} x^i = $ ?',
  v: '$$\\S{i=0}{∞} x^i = \\f{1}{1 − x} = Θ(1)$$'
   + '<p>É o truque que fecha o caso 3 do Teorema Mestre: uma série geométrica decrescente '
   + 'soma um número <em>constante</em> de vezes o primeiro termo, então o custo da raiz domina.</p>' },

{ id: 'c012', deck: 'D0', tag: 'somas', f: 'Soma das potências de 2: $\\S{i=0}{n} 2^i = $ ?',
  v: '$$\\S{i=0}{n} 2^i = 2^{n+1} − 1 = Θ(2^n)$$'
   + '<p>Ou seja: a soma de todos os termos é menor que o dobro do último. Numa árvore binária '
   + 'completa, o último nível tem mais nós que todos os anteriores somados.</p>' },

{ id: 'c013', deck: 'D0', tag: 'somas', f: 'Série harmônica: $H_n = \\S{i=1}{n} \\f{1}{i} = $ ?',
  v: '$$H_n = ln n + O(1) = Θ(log n)$$'
   + '<p>É ela que fecha as duas análises de caso médio do curso: o k-ésimo menor ($Θ(n)$) '
   + 'e o Quick-sort ($Θ(n log n)$).</p>' },

{ id: 'c014', deck: 'D0', tag: 'somas',
  f: 'Como resolver $\\S{i=1}{n}\\S{j=1}{i} g(n)$, quando $g$ não depende de $i$ nem de $j$?',
  v: '<p>$g(n)$ é constante em relação aos índices, então sai do somatório:</p>'
   + '$$g(n)·\\S{i=1}{n}\\S{j=1}{i} 1 = g(n)·\\S{i=1}{n} i = g(n)·\\f{n(n+1)}{2} = Θ(n^2 g(n))$$'
   + '<p>É exatamente a questão 2 da prova de 2026.1, com $g(n) = log_3 n$, dando $Θ(n^2 log n)$.</p>' },

{ id: 'c015', deck: 'D0', tag: 'fat', f: 'Quanto vale $lg(n!)$ em notação $Θ$? E como se prova?',
  v: '$$lg(n!) = Θ(n lg n)$$'
   + '<p><strong>Superior:</strong> todo fator é $≤ n$, logo $n! ≤ n^n$ e $lg(n!) ≤ n lg n$.</p>'
   + '<p><strong>Inferior:</strong> a metade superior dos fatores é $> n/2$, logo '
   + '$n! ≥ (n/2)^{n/2}$ e $lg(n!) ≥ \\f{n}{2}(lg n − 1) = Ω(n lg n)$.</p>'
   + '<p>Não precisa de Stirling — e na prova o argumento de "metade dos fatores" é mais rápido.</p>' },

{ id: 'c016', deck: 'D0', tag: 'somas',
  f: 'Soma telescópica: como resolver $T(n) = T(n−1) + f(n)$?',
  v: '$$T(n) − T(0) = \\S{i=1}{n} f(i)$$'
   + '<p>Escreva todas as instâncias e cancele os termos intermediários. Consequências diretas:</p>'
   + '<p>$f(n) = Θ(1) ⇒ T(n) = Θ(n)$<br>'
   + '$f(n) = Θ(n) ⇒ T(n) = Θ(n^2)$<br>'
   + '$f(n) = Θ(1/n) ⇒ T(n) = Θ(log n)$</p>' },

{ id: 'c017', deck: 'D0', tag: 'crescimento',
  f: 'Ordene: $2^n$, $n lg n$, $lg n$, $n!$, $n^2$, $\\r{n}$, $1$, $n$, $lg^2 n$',
  v: '$$1 ≺ lg n ≺ lg^2 n ≺ \\r{n} ≺ n ≺ n lg n ≺ n^2 ≺ 2^n ≺ n!$$'
   + '<p><strong>As duas regras:</strong> qualquer polilogaritmo perde para qualquer potência '
   + 'positiva de $n$; qualquer polinômio perde para qualquer exponencial.</p>' },

{ id: 'c018', deck: 'D0', tag: 'crescimento',
  f: 'É verdade que $(log n)^a = O(n^b)$ para quaisquer $a, b > 0$?',
  v: '<p><strong>Sim.</strong> Qualquer potência de logaritmo é dominada por qualquer potência '
   + 'positiva de $n$, ainda que $a$ seja enorme e $b$ minúsculo.</p>'
   + '<p>Verificação por limite: $lim_{n→∞} \\f{(log n)^a}{n^b} = 0$ — aplique L\'Hôpital $a$ vezes, '
   + 'ou substitua $n = 2^m$, obtendo $\\f{m^a}{2^{bm}} → 0$.</p>'
   + '<p>É o item 26(a) da Lista 1.</p>' },

{ id: 'c019', deck: 'D0', tag: 'crescimento',
  f: 'Quando usar limites para comparar $f$ e $g$? Quais os três resultados?',
  v: '<p>$lim \\f{f}{g} = 0 ⇒ f = o(g)$ — $f$ cresce estritamente menos.</p>'
   + '<p>$lim \\f{f}{g} = c$, com $0 < c < ∞$ $⇒ f = Θ(g)$.</p>'
   + '<p>$lim \\f{f}{g} = ∞ ⇒ f = ω(g)$.</p>'
   + '<p>É o caminho mais rápido para ordenar funções, e o item 34 da lista pede a primeira '
   + 'implicação formalmente.</p>' },

{ id: 'c020', deck: 'D0', tag: 'piso',
  f: 'Pisos e tetos ($⌊n/2⌋$, $⌈n/2⌉$) alteram a solução assintótica de uma recorrência?',
  v: '<p><strong>Não.</strong> Como $n/2 − 1 < ⌊n/2⌋ ≤ n/2 ≤ ⌈n/2⌉ < n/2 + 1$, a troca muda '
   + 'a solução por um fator constante, que $Θ$ absorve.</p>'
   + '<p>Por isso todo o curso escreve $T(n/2)$ e ignora piso e teto na análise. '
   + 'Também vale lembrar: $⌊n/2⌋ + ⌈n/2⌉ = n$.</p>' },

{ id: 'c021', deck: 'D0', tag: 'inducao',
  f: 'Quais os quatro passos de uma prova por indução?',
  v: '<p><strong>1. Base</strong> — verifique para o menor caso ($n = n_0$).<br>'
   + '<strong>2. Hipótese</strong> — suponha verdadeiro para valores menores que $n$.<br>'
   + '<strong>3. Passo</strong> — derive para $n$ usando a hipótese.<br>'
   + '<strong>4. Conclusão</strong> — vale para todo $n ≥ n_0$.</p>'
   + '<p>O invariante de laço é a mesma estrutura: inicialização é a base, manutenção é o passo.</p>' },

/* ============================================ D1 · Conceitos e assintótica */

{ id: 'c101', deck: 'D1', tag: 'assint', f: 'Definição formal de $f(n) = O(g(n))$',
  v: '<p>Existem constantes $c, n_0 > 0$ tais que</p>'
   + '$$0 ≤ f(n) ≤ c · g(n), \\t{ para todo } n ≥ n_0$$'
   + '<p>Uma demonstração precisa <strong>exibir</strong> $c$ e $n_0$. Sem elas, não é prova.</p>' },

{ id: 'c102', deck: 'D1', tag: 'assint', f: 'Definição formal de $f(n) = Ω(g(n))$',
  v: '<p>Existem constantes $c, n_0 > 0$ tais que</p>'
   + '$$f(n) ≥ c · g(n) ≥ 0, \\t{ para todo } n ≥ n_0$$' },

{ id: 'c103', deck: 'D1', tag: 'assint', f: 'Definição formal de $f(n) = Θ(g(n))$',
  v: '<p>Existem constantes $c_1, c_2, n_0 > 0$ tais que</p>'
   + '$$c_1 · g(n) ≤ f(n) ≤ c_2 · g(n), \\t{ para todo } n ≥ n_0$$'
   + '<p>Equivalentemente: $f = Θ(g)$ ⟺ $f = O(g)$ <strong>e</strong> $f = Ω(g)$. '
   + 'Na prática, faça duas provas de uma desigualdade só.</p>' },

{ id: 'c104', deck: 'D1', tag: 'assint',
  f: 'Qual a diferença entre $O$ e $o$ (e entre $Ω$ e $ω$)?',
  v: '<p>$O$ e $Ω$ admitem igualdade de taxa; $o$ e $ω$ são <strong>estritos</strong>.</p>'
   + '<p>$n^2 = O(n^2)$ ✓ &nbsp;·&nbsp; $n^2 = o(n^2)$ ✗ &nbsp;·&nbsp; $n = o(n^2)$ ✓</p>'
   + '<p>A analogia: $O$ é $≤$, $Ω$ é $≥$, $Θ$ é $=$, $o$ é $<$ e $ω$ é $>$.</p>' },

{ id: 'c105', deck: 'D1', tag: 'assint',
  f: 'Por que "o tempo de execução de A é no mínimo $O(n^2)$" não faz sentido?',
  v: '<p>$O$ já é um limite <strong>superior</strong>. "No mínimo um limite superior" não '
   + 'restringe nada — toda função é $O$ de algo suficientemente grande, então a frase é vazia.</p>'
   + '<p>O correto seria $Ω(n^2)$. É o item 38 da lista (Cormen 3.1-3).</p>' },

{ id: 'c106', deck: 'D1', tag: 'assint',
  f: 'O que significa $n^3 + 5n + 10 = n^3 + Θ(n)$? E $n^3 + Θ(n) = Θ(n^3)$?',
  v: '<p><strong>Primeira:</strong> $Θ(n)$ à direita representa <em>alguma função anônima</em> '
   + 'que é $Θ(n)$. A igualdade afirma que os termos de ordem baixa somam algo linear — '
   + 'informação parcial preservada.</p>'
   + '<p><strong>Segunda:</strong> <em>qualquer</em> função da forma "$n^3$ mais algo linear" '
   + 'é $Θ(n^3)$. O termo dominante absorveu o resto.</p>'
   + '<p>O "=" assintótico lê-se "é" e <strong>não é simétrico</strong>: $n = O(n^2)$, mas '
   + '$O(n^2) ≠ n$. É o item 18 da lista.</p>' },

{ id: 'c107', deck: 'D1', tag: 'assint',
  f: 'Se $f = O(s)$ e $g = O(r)$, vale $f − g = O(s − r)$?',
  v: '<p><strong>Não.</strong> Contraexemplo: $f = 2n$, $g = n$, $s = r = n$. '
   + 'Então $f − g = n$, mas $s − r = 0$, e $n ≠ O(0)$.</p>'
   + '<p>Soma, produto e divisão por constante preservam; <strong>subtração não</strong>, '
   + 'porque $O$ só limita por cima e a subtração pode cancelar o limite. Item 22(a) da lista.</p>' },

{ id: 'c108', deck: 'D1', tag: 'assint', f: 'A notação $O$ é transitiva? Como se prova?',
  v: '<p><strong>Sim.</strong> Se $f = O(g)$ e $g = O(h)$, então $f = O(h)$.</p>'
   + '<p><strong>Prova:</strong> existem $c_1, n_1$ com $f(n) ≤ c_1 g(n)$ para $n ≥ n_1$, e '
   + '$c_2, n_2$ com $g(n) ≤ c_2 h(n)$ para $n ≥ n_2$. Então para '
   + '$n ≥ max(n_1, n_2)$: $f(n) ≤ c_1 g(n) ≤ c_1 c_2 h(n)$. '
   + 'Tome $c = c_1c_2$ e $n_0 = max(n_1, n_2)$. Item 23 da lista.</p>' },

{ id: 'c109', deck: 'D1', tag: 'assint', f: 'É verdade que $f(n) = Θ(f(n/2))$ para toda $f$?',
  v: '<p><strong>Não em geral.</strong> Vale para polinômios: $n^2$ e $(n/2)^2 = n^2/4$ diferem '
   + 'por constante.</p>'
   + '<p>Falha para exponenciais: $\\f{2^n}{2^{n/2}} = 2^{n/2} → ∞$, logo $2^n ≠ Θ(2^{n/2})$.</p>'
   + '<p>Itens 26(e) e 29(b) da lista.</p>' },

{ id: 'c110', deck: 'D1', tag: 'assint', f: '$2^{n+1} = O(2^n)$? E $2^{2n} = O(2^n)$?',
  v: '<p><strong>$2^{n+1} = O(2^n)$: sim.</strong> $2^{n+1} = 2·2^n$, e o fator 2 é constante. '
   + 'Tome $c = 2$.</p>'
   + '<p><strong>$2^{2n} = O(2^n)$: não.</strong> $2^{2n} = (2^n)^2$, logo '
   + '$\\f{2^{2n}}{2^n} = 2^n → ∞$ — não há constante que sirva.</p>'
   + '<p>Itens 24(i), 26(c) e 26(d) da lista. A diferença: somar no expoente é constante, '
   + '<em>multiplicar</em> no expoente não é.</p>' },

{ id: 'c111', deck: 'D1', tag: 'invariante', f: 'Quais as três propriedades de um invariante de laço?',
  v: '<p><strong>Inicialização</strong> — verdadeiro antes da primeira iteração.</p>'
   + '<p><strong>Manutenção</strong> — se verdadeiro antes da iteração $j$, continua verdadeiro '
   + 'antes da iteração $j+1$.</p>'
   + '<p><strong>Término</strong> — ao fim do laço, o invariante fornece a propriedade que '
   + 'demonstra a corretude do algoritmo.</p>'
   + '<p><strong>É o término que fecha a prova.</strong> Sem ele você só mostrou que a '
   + 'propriedade se mantém, não que o algoritmo está correto.</p>' },

{ id: 'c112', deck: 'D1', tag: 'invariante',
  f: 'Qual o invariante de <code>SomaVetor</code> ($s ← 0$; para $i$ de 1 a $n$: $s ← s + A[i]$)?',
  v: '<p><strong>Invariante:</strong> no início da iteração $i$, a variável $s$ contém a soma '
   + 'dos elementos de $A[1..i−1]$.</p>'
   + '<p><strong>Inicialização:</strong> $i = 1$, $s = 0$ — soma de $A[1..0]$, sequência vazia. ✓</p>'
   + '<p><strong>Manutenção:</strong> de $s = \\S{k=1}{i−1}A[k]$, o corpo faz $s ← s + A[i]$, '
   + 'dando $s = \\S{k=1}{i}A[k]$ ao entrar em $i+1$. ✓</p>'
   + '<p><strong>Término:</strong> $i = n+1$, logo $s = \\S{k=1}{n}A[k]$ — a soma total, '
   + 'que é o retorno. ∎</p>'
   + '<p>É literalmente a questão 3 de 2026.1, valendo 2,0 pontos.</p>' },

{ id: 'c113', deck: 'D1', tag: 'invariante',
  f: 'Por que o invariante do insertion sort precisa da cláusula "contém os mesmos elementos"?',
  v: '<p>Sem ela, o invariante "$A[1..j−1]$ está ordenado" seria satisfeito por um algoritmo '
   + 'que simplesmente <strong>zera o vetor</strong> — zeros estão ordenados.</p>'
   + '<p>Um invariante precisa ser forte o bastante para excluir algoritmos errados. '
   + 'O enunciado completo: "$A[1..j−1]$ está ordenado e contém os mesmos elementos que '
   + 'ocupavam essas posições originalmente". Item 10 da lista.</p>' },

{ id: 'c114', deck: 'D1', tag: 'ram', f: 'O que o modelo RAM assume?',
  v: '<ul><li>Instruções simples — aritmética, movimentação de dados, controle — custam '
   + '<strong>uma</strong> unidade de tempo.</li>'
   + '<li>Memória infinita, com acesso de custo unitário.</li>'
   + '<li>Ignora-se a hierarquia de memória (cache, memória virtual).</li>'
   + '<li>$n$ é o número de itens da entrada, ou o número de bits para representá-la.</li></ul>'
   + '<p>Serve para analisar algoritmos independentemente de hardware.</p>' },

{ id: 'c115', deck: 'D1', tag: 'ram', f: 'Por que costumamos analisar o pior caso?',
  v: '<p><strong>1.</strong> É uma <em>garantia</em>: o algoritmo nunca será mais lento que isso.</p>'
   + '<p><strong>2.</strong> É frequentemente mais fácil de calcular que o caso médio, que '
   + 'exige hipóteses sobre a distribuição das entradas.</p>'
   + '<p><strong>3.</strong> Para muitos algoritmos, o pior caso ocorre com frequência na prática.</p>'
   + '<p><strong>Quando não:</strong> se o pior caso é patológico e raro — Quick-sort — '
   + 'o caso médio descreve melhor a realidade. Item 6 da lista.</p>' },

{ id: 'c116', deck: 'D1', tag: 'ins',
  f: 'Insertion sort: $T(n)$ exato no melhor e no pior caso (contando 1 por instrução)',
  v: '<p><strong>Melhor caso</strong> (já ordenado), $t_j = 1$ para todo $j$:</p>'
   + '$$T(n) = n + 3(n−1) + (n−1) = 5n − 4 = Θ(n)$$'
   + '<p><strong>Pior caso</strong> (ordem inversa), o <code>while</code> testa $j$ vezes:</p>'
   + '$$T(n) = n + 3(n−1) + \\S{j=2}{n} j + 2\\S{j=2}{n}(j−1) = \\f{3}{2}n^2 + \\f{7}{2}n − 4 = Θ(n^2)$$'
   + '<p>Os coeficientes são arbitrários (dependem de como você conta instruções); '
   + 'o <strong>expoente</strong> não é. É o que $Θ$ captura.</p>' },

{ id: 'c117', deck: 'D1', tag: 'parada', f: 'O que afirma o Problema da Parada, e como se prova?',
  v: '<p><strong>Afirmação:</strong> não existe algoritmo que, dado um algoritmo $A$ e uma '
   + 'entrada $I$, decida se $A$ termina para $I$. (Turing e Church, 1936.)</p>'
   + '<p><strong>Prova por contradição:</strong> suponha que exista $S(A, I)$. Construa $S\'$ que, '
   + 'recebendo $X$, chama $S(X, X)$ e faz o <em>oposto</em>: termina se o resultado for FALSO, '
   + 'entra em laço se for VERDADE. Agora execute $S\'(S\')$ — os dois resultados possíveis '
   + 'contradizem a própria construção. Logo $S$ não existe.</p>' },

{ id: 'c118', deck: 'D1', tag: 'conceitos',
  f: 'Diferença entre problema, instância e algoritmo',
  v: '<p><strong>Problema:</strong> especificação da entrada e da saída esperada. '
   + '("Entrada: sequência de $n$ números; saída: permutação em ordem crescente.")</p>'
   + '<p><strong>Instância:</strong> uma entrada concreta. ($A = [20, 6, 10, 1]$.)</p>'
   + '<p><strong>Algoritmo:</strong> os passos não-ambíguos que resolvem o problema '
   + 'mecanicamente.</p>'
   + '<p>A distinção importa: correção é sobre <em>todas</em> as instâncias do problema, '
   + 'não sobre a que você testou.</p>' },

/* ================================================== D2 · Recorrências */

{ id: 'c201', deck: 'D2', tag: 'mestre', f: 'Forma padrão do Teorema Mestre e o que significa cada símbolo',
  v: '$$T(n) = a·T(n/b) + f(n), \\t{ com } a ≥ 1, b > 1$$'
   + '<p>$a$ — número de subproblemas (chamadas recursivas).<br>'
   + '$b$ — fator de divisão do tamanho da entrada.<br>'
   + '$f(n)$ — custo local de dividir e combinar.</p>'
   + '<p>O número que decide tudo é $n^{log_b a}$ — o peso das folhas.</p>' },

{ id: 'c202', deck: 'D2', tag: 'mestre', f: 'Teorema Mestre, caso 1: condição e solução',
  v: '<p><strong>Condição:</strong> $f(n) = O(n^{log_b a − ε})$ para algum $ε > 0$ — ou seja, '
   + '$f$ é <em>polinomialmente menor</em> que o peso das folhas.</p>'
   + '$$T(n) = Θ(n^{log_b a})$$'
   + '<p><strong>Quem domina:</strong> as folhas. A árvore é "gorda na base".</p>'
   + '<p>Exemplo: $T(n) = 9T(n/3) + n$ → $n^{log_3 9} = n^2$, e $n = O(n^{2−1})$ → $Θ(n^2)$.</p>' },

{ id: 'c203', deck: 'D2', tag: 'mestre', f: 'Teorema Mestre, caso 2: condição e solução',
  v: '<p><strong>Condição:</strong> $f(n) = Θ(n^{log_b a})$ — empate técnico.</p>'
   + '$$T(n) = Θ(n^{log_b a} · lg n)$$'
   + '<p><strong>Quem domina:</strong> ninguém. Todos os $log_b n$ níveis custam o mesmo, '
   + 'e é daí que vem o fator $lg n$.</p>'
   + '<p>Exemplo: $T(n) = 4T(n/2) + n^2$ → $n^{log_2 4} = n^2 = f(n)$ → $Θ(n^2 log n)$. '
   + 'É a questão 1(a) de 2026.1.</p>' },

{ id: 'c204', deck: 'D2', tag: 'mestre', f: 'Teorema Mestre, caso 3: condição e solução',
  v: '<p><strong>Condição:</strong> $f(n) = Ω(n^{log_b a + ε})$ para algum $ε > 0$, '
   + '<strong>e</strong> a condição de regularidade $a·f(n/b) ≤ c·f(n)$ para algum $c < 1$.</p>'
   + '$$T(n) = Θ(f(n))$$'
   + '<p><strong>Quem domina:</strong> a raiz. O custo local é tão alto que o resto da árvore '
   + 'é uma série geométrica decrescente, somando $O(1)$ vezes a raiz.</p>'
   + '<p><strong>Não esqueça a regularidade</strong> — o gabarito de 2026.1 a verifica '
   + 'explicitamente na questão 1(b).</p>' },

{ id: 'c205', deck: 'D2', tag: 'mestre', f: 'Para que serve a condição de regularidade do caso 3?',
  v: '<p>Ela garante que o custo <em>realmente</em> decresce geometricamente ao descer a árvore: '
   + 'o custo de um nível ($a·f(n/b)$) é uma fração $c < 1$ do nível acima ($f(n)$).</p>'
   + '<p>Sem isso, a soma dos níveis poderia não ser $Θ(f(n))$.</p>'
   + '<p>Para $f$ polinomial ela vale sempre — verifique explicitamente de todo modo, porque '
   + 'a questão pede. Exemplo (Q1b): $3·\\f{n}{4}log\\f{n}{4} ≤ \\f{3}{4}·n log n$, com $c = 3/4$.</p>' },

{ id: 'c206', deck: 'D2', tag: 'mestre', f: 'Em que três situações o Teorema Mestre NÃO se aplica?',
  v: '<p><strong>1. A diferença é só logarítmica.</strong> $T(n) = 2T(n/2) + n log n$: '
   + '$n log n$ é maior que $n = n^{log_2 2}$, mas não <em>polinomialmente</em> — não existe '
   + '$ε>0$ com $n log n = Ω(n^{1+ε})$. Pela árvore: $Θ(n log^2 n)$.</p>'
   + '<p><strong>2. Recorrência subtrativa.</strong> $T(n−1)$ em vez de $T(n/b)$ — use árvore '
   + 'ou soma telescópica.</p>'
   + '<p><strong>3. Subproblemas de tamanhos diferentes.</strong> $T(n/3) + T(2n/3)$ — use árvore.</p>' },

{ id: 'c207', deck: 'D2', tag: 'mestre',
  f: 'Procedimento em 4 passos para aplicar o Teorema Mestre',
  v: '<p><strong>1.</strong> Identifique $a$, $b$ e $f(n)$.<br>'
   + '<strong>2.</strong> Calcule $n^{log_b a}$.<br>'
   + '<strong>3.</strong> Compare $f(n)$ com $n^{log_b a}$ — a comparação tem de ser '
   + '<em>polinomial</em>, por um fator $n^ε$.<br>'
   + '<strong>4.</strong> Aplique o caso. Se for o caso 3, verifique a regularidade.</p>'
   + '<p>Treinado, isso leva menos de um minuto por item — e a questão 1 vale 2,0 pontos.</p>' },

{ id: 'c208', deck: 'D2', tag: 'subst', f: 'Os dois passos do método da substituição',
  v: '<p><strong>1. Adivinhar</strong> a forma da solução assintótica.</p>'
   + '<p><strong>2. Provar por indução</strong>, encontrando as constantes $c$ e $n_0$ que '
   + 'satisfazem a definição de $O$ ou $Ω$.</p>'
   + '<p>O palpite vem da árvore de recursão ou do repertório de recorrências canônicas — '
   + 'a substituição <em>verifica</em>, não gera.</p>' },

{ id: 'c209', deck: 'D2', tag: 'subst',
  f: 'Por que a prova de $T(n) = 2T(n/2) + 1 ≤ cn$ falha, e como corrigir?',
  v: '<p><strong>Falha:</strong> $T(n) ≤ 2(cn/2) + 1 = cn + 1$, que <em>não</em> é $≤ cn$. '
   + 'Não se pode descartar o "+1" alegando ordem inferior — a indução exige a desigualdade '
   + 'exata que você enunciou.</p>'
   + '<p><strong>Correção — fortalecer a hipótese</strong> subtraindo um termo de ordem inferior. '
   + 'Palpite $T(n) ≤ cn − d$:</p>'
   + '$$T(n) ≤ 2\\p{c\\f{n}{2} − d} + 1 = (cn − d) − d + 1$$'
   + '<p>Fecha se $−d + 1 ≤ 0$, ou seja $d ≥ 1$. ✓</p>' },

{ id: 'c210', deck: 'D2', tag: 'subst', f: 'Como resolver $T(n) = 2T(\\r{n}) + log n$?',
  v: '<p><strong>Mudança de variável.</strong> Faça $m = log n$, logo $n = 2^m$ e $\\r{n} = 2^{m/2}$:</p>'
   + '$$T(2^m) = 2T(2^{m/2}) + m$$'
   + '<p>Renomeie $S(m) = T(2^m)$, obtendo $S(m) = 2S(m/2) + m$, que é $O(m log m)$. '
   + 'Substituindo $m = log n$ de volta:</p>'
   + '$$T(n) = O(log n · log log n)$$' },

{ id: 'c211', deck: 'D2', tag: 'arvore',
  f: 'As quatro medidas de uma árvore de recursão de $T(n) = aT(n/b) + f(n)$',
  v: '<p><strong>Altura:</strong> $log_b n$.<br>'
   + '<strong>Nós no nível $i$:</strong> $a^i$.<br>'
   + '<strong>Tamanho do subproblema no nível $i$:</strong> $n/b^i$.<br>'
   + '<strong>Custo do nível $i$:</strong> $a^i · f(n/b^i)$.</p>'
   + '<p>E o número de <strong>folhas</strong> é $a^{log_b n} = n^{log_b a}$ — de onde vem '
   + 'o termo do Teorema Mestre.</p>' },

{ id: 'c212', deck: 'D2', tag: 'arvore',
  f: 'Como a árvore de recursão resolve $T(n) = T(n/3) + T(2n/3) + cn$?',
  v: '<p>Árvore assimétrica. Cada nível <em>completo</em> custa $cn$, porque '
   + '$n/3 + 2n/3 = n$.</p>'
   + '<p><strong>Caminho mais curto:</strong> profundidade $log_3 n$ — até aqui todos os '
   + 'níveis estão cheios, logo $T(n) = Ω(n log n)$.</p>'
   + '<p><strong>Caminho mais longo:</strong> profundidade $log_{3/2} n$ — limite superior '
   + '$O(n log n)$.</p>'
   + '<p>Os dois juntos: $T(n) = Θ(n log n)$.</p>' },

{ id: 'c213', deck: 'D2', tag: 'hist',
  f: 'Remoção de histórico: quando usar e qual a tática?',
  v: '<p><strong>Quando:</strong> $T(n)$ depende de <em>todos</em> os valores anteriores, '
   + 'através de um somatório. Árvore e Teorema Mestre não funcionam.</p>'
   + '<p><strong>Tática:</strong> multiplique por $n$, escreva a mesma equação para $n−1$, '
   + 'e <strong>subtraia</strong>. Os somatórios se cancelam, deixando uma recorrência comum.</p>'
   + '$$nT(n) − (n−1)T(n−1) = T(n−1) + \\t{(termo local)}$$' },

{ id: 'c214', deck: 'D2', tag: 'hist',
  f: 'Resolva $T(n) = \\f{1}{n}\\S{i=0}{n−1}(T(i) + 1)$',
  v: '<p>$nT(n) = \\S{i=0}{n−1}T(i) + n$ &nbsp;(1)<br>'
   + '$(n−1)T(n−1) = \\S{i=0}{n−2}T(i) + (n−1)$ &nbsp;(2)</p>'
   + '<p>Subtraindo (2) de (1): $nT(n) − (n−1)T(n−1) = T(n−1) + 1$, logo '
   + '$nT(n) = nT(n−1) + 1$ e</p>'
   + '$$T(n) = T(n−1) + \\f{1}{n} = H_n = Θ(log n)$$' },

{ id: 'c215', deck: 'D2', tag: 'canonicas', f: '$T(n) = 2T(n/2) + Θ(1)$ → ?',
  v: '$$Θ(n)$$<p>Caso 1: $n^{log_2 2} = n$ domina $f(n) = 1$.</p>'
   + '<p>É a recorrência da <strong>questão 4 de 2026.1</strong> — a função que acha o máximo '
   + 'de um vetor dividindo-o em duas metades.</p>' },

{ id: 'c216', deck: 'D2', tag: 'canonicas', f: '$T(n) = 2T(n/2) + Θ(n)$ → ?',
  v: '$$Θ(n log n)$$<p>Caso 2: $n^{log_2 2} = n = f(n)$. É o Merge Sort.</p>' },

{ id: 'c217', deck: 'D2', tag: 'canonicas', f: '$T(n) = T(n/2) + Θ(1)$ → ?',
  v: '$$Θ(log n)$$<p>Caso 2: $n^{log_2 1} = n^0 = 1 = f(n)$. '
   + 'É a busca binária e a potência inteira rápida.</p>' },

{ id: 'c218', deck: 'D2', tag: 'canonicas', f: '$T(n) = T(n/2) + Θ(n)$ → ?',
  v: '$$Θ(n)$$<p>Caso 3: $n^{log_2 1} = 1$, e $f(n) = n$ domina. '
   + 'Intuição: $n + n/2 + n/4 + ⋯ = 2n$ — série geométrica decrescente.</p>' },

{ id: 'c219', deck: 'D2', tag: 'canonicas', f: '$T(n) = 4T(n/2) + Θ(n)$ → ?',
  v: '$$Θ(n^2)$$<p>Caso 1: $n^{log_2 4} = n^2$ domina $f(n) = n$. Item 67(a) da lista.</p>' },

{ id: 'c220', deck: 'D2', tag: 'canonicas', f: '$T(n) = 4T(n/2) + Θ(n^2)$ → ?',
  v: '$$Θ(n^2 log n)$$<p>Caso 2 — empate. É a <strong>questão 1(a) de 2026.1</strong>.</p>' },

{ id: 'c221', deck: 'D2', tag: 'canonicas', f: '$T(n) = 4T(n/2) + Θ(n^3)$ → ?',
  v: '$$Θ(n^3)$$<p>Caso 3: $n^{log_2 4} = n^2$, e $n^3$ domina polinomialmente. '
   + 'Item 67(c) da lista.</p>' },

{ id: 'c222', deck: 'D2', tag: 'canonicas', f: '$T(n) = 3T(n/4) + n log n$ → ?',
  v: '$$Θ(n log n)$$<p>Caso 3: $n^{log_4 3} ≈ n^{0.79}$, e $n log n$ domina polinomialmente. '
   + 'Regularidade com $c = 3/4$. É a <strong>questão 1(b) de 2026.1</strong>.</p>' },

{ id: 'c223', deck: 'D2', tag: 'canonicas', f: '$T(n) = 5T(n/4) + n log n$ → ?',
  v: '$$Θ(n^{log_4 5})$$<p>Caso 1: $n^{log_4 5} ≈ n^{1.16}$, que domina $n log n$ '
   + 'polinomialmente — qualquer potência de $n$ acima de 1 vence $n·log^k n$.</p>'
   + '<p>É a <strong>questão 1(c) de 2026.1</strong>.</p>' },

{ id: 'c224', deck: 'D2', tag: 'canonicas', f: '$T(n) = 2T(n−1) + n$ → ?',
  v: '$$Θ(2^n)$$<p><strong>Subtrativa</strong> — o Teorema Mestre não se aplica. '
   + 'Árvore de altura $n$ com $2^{i−1}$ nós no nível $i$, cada um custando $n−i+1$:</p>'
   + '$$S = \\S{i=1}{n}2^{i−1}(n−i+1) = Θ(2^n)$$'
   + '<p>É a <strong>questão 1(d) de 2026.1</strong>.</p>' },

{ id: 'c225', deck: 'D2', tag: 'canonicas',
  f: 'Regra rápida para recorrências subtrativas $T(n) = aT(n−1) + f(n)$',
  v: '<p><strong>$a = 1$:</strong> soma telescópica. $T(n) = Θ(n·f(n))$ se $f$ for polinomial. '
   + 'Ex.: $T(n−1) + n → Θ(n^2)$.</p>'
   + '<p><strong>$a ≥ 2$:</strong> <strong>exponencial</strong>, $T(n) = Θ(a^n)$ — a árvore '
   + 'multiplica de largura a cada nível e tem altura $n$. Ex.: $2T(n−1) + 1 → Θ(2^n)$.</p>'
   + '<p>É a chave do item 20(b) da lista: $T(n) = 2T(n−2) + 1$ não é limitável por polinômio.</p>' },

{ id: 'c226', deck: 'D2', tag: 'canonicas', f: '$T(n) = 2T(n/2) + n log n$ → ?',
  v: '$$Θ(n log^2 n)$$'
   + '<p><strong>O Teorema Mestre falha aqui.</strong> $n^{log_2 2} = n$, e $n log n$ é maior '
   + 'que $n$ — mas só por um fator logarítmico, não polinomial.</p>'
   + '<p>Pela árvore: $log n$ níveis, cada um custando $Θ(n log n)$. '
   + 'É o exemplo de limitação que o slide 02 apresenta.</p>' },

{ id: 'c227', deck: 'D2', tag: 'canonicas', f: '$T(n) = T(\\r{n}) + Θ(1)$ → ?',
  v: '$$Θ(log log n)$$'
   + '<p>Cada passo tira a raiz, ou seja, <em>divide o expoente por 2</em>. Com $n = 2^m$, '
   + 'o tamanho vira $2^{m/2}$, então $m$ cai pela metade a cada passo: '
   + 'são $log m = log log n$ passos. Item 64(j) da lista.</p>' },

/* =============================================== D3 · Divisão e conquista */

{ id: 'c301', deck: 'D3', tag: 'fases', f: 'As três fases de divisão e conquista',
  v: '<p><strong>1. Dividir</strong> — partir o problema em subproblemas menores.<br>'
   + '<strong>2. Conquistar</strong> — resolver cada subproblema, em geral recursivamente.<br>'
   + '<strong>3. Combinar</strong> — juntar as soluções para produzir a do problema maior.</p>'
   + '<p>O que distingue os algoritmos é <em>onde está o trabalho</em>: no Merge Sort está na '
   + 'combinação; no Quick-sort, na divisão.</p>' },

{ id: 'c302', deck: 'D3', tag: 'potencia', f: 'Como calcular $x^n$ em tempo $Θ(log n)$?',
  v: '$$x^n = \\c{\\p{x^{n/2}}^2}{se n é par}{x·\\p{x^{(n−1)/2}}^2}{se n é ímpar}$$'
   + '$$T(n) = T(n/2) + Θ(1) ⇒ Θ(log n)$$'
   + '<p><strong>Cuidado:</strong> calcule $x^{n/2}$ <em>uma vez</em> e guarde numa variável. '
   + 'Escrever $x^{n/2}·x^{n/2}$ como duas chamadas dá $2T(n/2) + Θ(1) = Θ(n)$ e joga o ganho '
   + 'fora.</p>' },

{ id: 'c303', deck: 'D3', tag: 'fib', f: 'Por que o Fibonacci recursivo ingênuo é exponencial?',
  v: '$$T(n) = T(n−1) + T(n−2) + Θ(1) ⇒ O(φ^n), \\t{ com } φ ≈ 1.618$$'
   + '<p>A árvore de recursão recalcula os mesmos subproblemas um número exponencial de vezes — '
   + '$F(n−2)$ é computado duas vezes, $F(n−3)$ três vezes, e assim por diante seguindo os '
   + 'próprios números de Fibonacci.</p>' },

{ id: 'c304', deck: 'D3', tag: 'fib', f: 'Como calcular $F(n)$ em tempo $Θ(log n)$?',
  v: '<p>Modele a transição de estados como potência de matriz:</p>'
   + '$$\\M{F(n+1)}{F(n)}{F(n)}{F(n−1)} = \\M{1}{1}{1}{0}^n$$'
   + '<p>Multiplicar $n$ vezes dá $Θ(n)$. Mas elevar a matriz a $n$ por '
   + '<strong>exponenciação rápida</strong> (quadrados sucessivos) custa $Θ(log n)$ '
   + 'multiplicações de matrizes $2×2$, cada uma $Θ(1)$.</p>'
   + '<p>É a pergunta que o slide 03 deixa em aberto, com a dica "lembre-se da potência inteira".</p>' },

{ id: 'c305', deck: 'D3', tag: 'hanoi', f: 'Torres de Hanói: modelagem, recorrência e custo',
  v: '<p><strong>Modelagem:</strong> (1) passe $n−1$ discos de A para B; (2) mova o maior de A '
   + 'para C; (3) passe os $n−1$ de B para C.</p>'
   + '$$T(n) = 2T(n−1) + 1 ⇒ T(n) = 2^n − 1 = Θ(2^n)$$'
   + '<p><strong>A lição:</strong> divisão e conquista não implica eficiência. Aqui a '
   + 'decomposição é <em>ótima</em> e o custo ainda é exponencial — porque a própria saída '
   + 'tem tamanho exponencial.</p>' },

{ id: 'c306', deck: 'D3', tag: 'strassen',
  f: 'Por que dividir matrizes em 4 blocos ingenuamente não acelera a multiplicação?',
  v: '<p>Os 4 blocos de $C$ exigem <strong>8</strong> multiplicações de submatrizes '
   + '$n/2 × n/2$, mais somas em $Θ(n^2)$:</p>'
   + '$$T(n) = 8T(n/2) + Θ(n^2)$$'
   + '<p>$n^{log_2 8} = n^3$, e $f(n) = n^2 = O(n^{3−1})$ — caso 1, logo $Θ(n^3)$. '
   + 'Exatamente o mesmo do método tradicional.</p>' },

{ id: 'c307', deck: 'D3', tag: 'strassen', f: 'Qual a ideia de Strassen, e qual a complexidade?',
  v: '<p>Obter os 4 blocos de $C$ com <strong>7</strong> multiplicações em vez de 8, ao custo '
   + 'de mais somas. Somas são $Θ(n^2)$; multiplicações são recursivas — a troca vale.</p>'
   + '$$T(n) = 7T(n/2) + Θ(n^2) = Θ(n^{log_2 7}) ≈ Θ(n^{2.81})$$'
   + '<p><strong>Ressalvas:</strong> assume $n$ potência de 2 (senão, <em>padding</em> com zeros), '
   + 'e tem constantes ocultas altas — só compensa para $n$ muito grande.</p>' },

{ id: 'c308', deck: 'D3', tag: 'strassen', f: 'Karatsuba: qual o ganho e qual a complexidade?',
  v: '<p>Multiplicar inteiros de $n$ dígitos. O método direto faz 4 produtos de meio tamanho; '
   + 'Karatsuba faz <strong>3</strong>, porque</p>'
   + '$$(a+b)(c+d) − ac − bd = ad + bc$$'
   + '<p>economiza um produto ao obter o termo cruzado de graça.</p>'
   + '$$T(n) = 3T(n/2) + Θ(n) = Θ(n^{lg 3}) ≈ Θ(n^{1.585})$$'
   + '<p>Mesmo padrão de Strassen: <em>reduzir o número de subproblemas</em>. '
   + 'Item 2 dos exercícios do slide 03.</p>' },

{ id: 'c309', deck: 'D3', tag: 'particiona', f: 'Qual o custo de <code>particiona</code> (Hoare), e por quê?',
  v: '$$Θ(n)$$'
   + '<p>Os dois laços internos varrem o intervalo <strong>uma única vez</strong>: o índice '
   + '$l$ só cresce, o índice $r$ só decresce, e eles se encontram no meio. '
   + 'Logo o total de comparações é proporcional a $b − a + 1$.</p>'
   + '<p>É o item 46(a) da Lista 1.</p>' },

{ id: 'c310', deck: 'D3', tag: 'kesimo', f: 'k-ésimo menor por D&C: qual a ideia, e o pior caso?',
  v: '<p><strong>Ideia:</strong> particione; agora você sabe a posição final do pivô e pode '
   + '<strong>descartar inteiramente</strong> a partição que não contém o k-ésimo. '
   + 'Recorre-se em <em>um</em> lado só.</p>'
   + '<p><strong>Pior caso</strong> (partição sempre péssima, elimina 1 elemento por vez):</p>'
   + '$$T(n) = T(n−1) + Θ(n) = Θ(n^2)$$'
   + '<p>Pior que simplesmente ordenar em $Θ(n log n)$ — daí a necessidade da análise de '
   + 'caso médio.</p>' },

{ id: 'c311', deck: 'D3', tag: 'kesimo', f: 'k-ésimo menor: caso médio e sua derivação',
  v: '<p>Assumindo que cada uma das $n$ partições possíveis é igualmente provável ($1/n$):</p>'
   + '$$T(n) = \\f{1}{n}\\S{i=0}{n−1}T(i) + Θ(n)$$'
   + '<p>Por remoção de histórico: $nT(n) − (n−1)T(n−1) = T(n−1) + Θ(n)$, logo '
   + '$nT(n) = nT(n−1) + Θ(n)$ e</p>'
   + '$$T(n) = T(n−1) + Θ(1) = Θ(n)$$'
   + '<p><strong>Linear</strong> no caso médio — melhor que ordenar.</p>' },

{ id: 'c312', deck: 'D3', tag: 'kesimo',
  f: 'No k-ésimo menor, por que $k$ muda ao recorrer à direita?',
  v: '<p>Porque os $t = p − a + 1$ elementos descartados à esquerda (incluindo o pivô) já não '
   + 'estão no subvetor. O que era o $k$-ésimo do vetor inteiro é o '
   + '<strong>$(k − t)$-ésimo</strong> do subvetor direito.</p>'
   + '<p>Recorrendo à esquerda, $k$ <em>não</em> muda. Esquecer esse ajuste é o bug clássico.</p>' },

{ id: 'c313', deck: 'D3', tag: 'quick', f: 'Quick-sort: pior caso e caso médio',
  v: '<p><strong>Pior caso:</strong> partição sempre desequilibrada.</p>'
   + '$$T(n) = T(n−1) + Θ(n) = Θ(n^2)$$'
   + '<p><strong>Caso médio:</strong> (o fator 2 aparece porque <em>ambos</em> os lados são '
   + 'resolvidos — nada é descartado)</p>'
   + '$$T(n) = \\f{2}{n}\\S{k=0}{n−1}T(k) + Θ(n) = Θ(n log n)$$'
   + '<p><strong>Não confunda:</strong> o famoso $Θ(n log n)$ é o caso <em>médio</em>.</p>' },

{ id: 'c314', deck: 'D3', tag: 'quick', f: 'Derivação do caso médio do Quick-sort (passos)',
  v: '<p>De $T(n) = \\f{2}{n}\\S{k=0}{n−1}T(k) + Θ(n)$:</p>'
   + '<p>1. Multiplique por $n$ e subtraia a equação de $n−1$:<br>'
   + '$nT(n) − (n−1)T(n−1) = 2T(n−1) + Θ(n)$</p>'
   + '<p>2. Reagrupe: $nT(n) = (n+1)T(n−1) + Θ(n)$</p>'
   + '<p>3. Divida por $n(n+1)$: $\\f{T(n)}{n+1} = \\f{T(n−1)}{n} + \\f{Θ(1)}{n+1}$</p>'
   + '<p>4. Telescopa numa harmônica: $\\f{T(n)}{n+1} = Θ(log n)$</p>'
   + '$$T(n) = Θ(n log n)$$' },

{ id: 'c315', deck: 'D3', tag: 'quick', f: 'Merge Sort e Quick-sort: onde está o trabalho em cada um?',
  v: '<p><strong>Merge Sort:</strong> divisão trivial (parte no meio), combinação custa $Θ(n)$ '
   + '(intercala). Precisa de memória auxiliar.</p>'
   + '<p><strong>Quick-sort:</strong> divisão custa $Θ(n)$ (particiona), combinação é '
   + '<em>trivial</em> — não faz nada. É <em>in-place</em>.</p>'
   + '<p>São espelhos um do outro, e ambos dão $T(n) = 2T(n/2) + Θ(n) = Θ(n log n)$ '
   + '(no caso médio, para o Quick-sort).</p>' },

{ id: 'c316', deck: 'D3', tag: 'merge', f: 'Por que <code>Intercala</code> usa sentinelas $∞$?',
  v: '<p>Para evitar testar, a cada iteração, se um dos subvetores esvaziou. Com $∞$ no fim de '
   + '$L$ e $R$, a comparação sempre escolhe o outro vetor naturalmente.</p>'
   + '<p>Troca dois testes <em>por iteração</em> por duas atribuições <em>no total</em> — e '
   + 'deixa o laço com exatamente $r − p + 1$ iterações, tornando a análise $Θ(n)$ imediata.</p>' },

{ id: 'c317', deck: 'D3', tag: 'projeto',
  f: 'Padrão "descartar metade": quando se aplica e qual a recorrência?',
  v: '<p><strong>Quando:</strong> olhando só o elemento do meio (e talvez o vizinho), você '
   + 'consegue <em>provar</em> que a resposta não está numa das metades.</p>'
   + '$$T(n) = T(n/2) + Θ(1) ⇒ Θ(log n)$$'
   + '<p><strong>Exemplos:</strong> busca binária; pico de vetor unimodal (Q5 de 2026.1); '
   + 'achar $i$ com $X[i] = i$ em vetor ordenado (a função $X[i] − i$ é monótona); '
   + 'k-ésimo da união de dois vetores ordenados.</p>' },

{ id: 'c318', deck: 'D3', tag: 'projeto',
  f: 'Vetor unimodal: como achar o pico em $Θ(log n)$?',
  v: '<p>Compare $X[i]$ com $X[i+1]$. Se $X[i] < X[i+1]$, você está na <strong>subida</strong> '
   + 'e o pico está à direita ($i+1$ a $b$). Se $X[i] > X[i+1]$, está na '
   + '<strong>descida</strong> e o pico está à esquerda, podendo ser o próprio $i$ ($a$ a $i$).</p>'
   + '$$T(n) = T(n/2) + Θ(1) ⇒ Θ(log n)$$'
   + '<p>É a <strong>questão 5 de 2026.1</strong>, valendo 2,0 pontos.</p>' },

{ id: 'c319', deck: 'D3', tag: 'projeto',
  f: 'Padrão "retorno enriquecido": quando se aplica e qual a recorrência?',
  v: '<p><strong>Quando:</strong> a resposta pode cruzar a fronteira entre as metades, e '
   + 'recalcular o caso que cruza custaria $Θ(n)$. A saída é cada chamada devolver '
   + '<em>mais informação</em> que só a resposta — o bastante para combinar em $Θ(1)$.</p>'
   + '$$T(n) = 2T(n/2) + Θ(1) ⇒ Θ(n)$$'
   + '<p>Se a combinação custasse $Θ(n)$, daria $Θ(n log n)$. O retorno enriquecido é '
   + 'exatamente o que derruba o caso 2 do Teorema Mestre para o caso 1.</p>' },

{ id: 'c320', deck: 'D3', tag: 'projeto',
  f: 'Maior diferença $A[j] − A[i]$ com $i ≤ j$, em $Θ(n)$: o que cada chamada retorna?',
  v: '<p>A tripla <strong>$(min, max, maiorDiferença)$</strong> da sua metade.</p>'
   + '<p>A resposta está toda em E, toda em D, ou cruza — e o caso que cruza é '
   + '$max(D) − min(E)$, calculável em $Θ(1)$ com essa informação:</p>'
   + '<p><code>return ( min(minE,minD), max(maxE,maxD), max(difE, difD, maxD − minE) )</code></p>'
   + '$$T(n) = 2T(n/2) + Θ(1) ⇒ Θ(n)$$'
   + '<p>É a <strong>questão 6 de 2026.1</strong> (1,0 ponto extra).</p>' },

{ id: 'c321', deck: 'D3', tag: 'projeto',
  f: 'Elemento majoritário em $O(n)$, sem ordenar nem memória extra: qual o algoritmo?',
  v: '<p><strong>Boyer–Moore.</strong> Mantenha um candidato e um contador. Percorra o vetor:</p>'
   + '<ul><li>contador zero → adote o elemento atual como candidato, contador 1;</li>'
   + '<li>elemento igual ao candidato → incremente;</li>'
   + '<li>diferente → decremente.</li></ul>'
   + '<p>Ao fim, o candidato é o <em>único</em> majoritário possível — confirme com uma '
   + 'segunda varredura.</p>'
   + '<p><strong>Intuição:</strong> cada decremento cancela uma ocorrência do majoritário '
   + 'contra uma de outro elemento; quem tem mais da metade sobrevive a todos os cancelamentos.</p>'
   + '<p>Usa apenas testes de <em>igualdade</em> — por isso a resposta ao item 76(b) da lista '
   + 'é "não muda nada".</p>' },

{ id: 'c322', deck: 'D3', tag: 'projeto',
  f: 'Elemento majoritário por divisão e conquista: como e com que custo?',
  v: '<p>Um majoritário de $V$ tem de ser majoritário de <strong>ao menos uma das metades</strong> '
   + '(se não fosse de nenhuma, teria $≤ n/4 + n/4 = n/2$ ocorrências).</p>'
   + '<p>Resolva as duas metades, obtendo no máximo dois candidatos, e verifique cada um com '
   + 'uma varredura $O(n)$.</p>'
   + '$$T(n) = 2T(n/2) + O(n) = O(n log n)$$'
   + '<p>É o item 5 dos exercícios do slide 03.</p>' },

{ id: 'c323', deck: 'D3', tag: 'projeto',
  f: 'Par de pontos mais próximos em $O(n log n)$: qual a ideia da combinação?',
  v: '<p>Ordene por $x$ e divida por uma reta vertical. Resolva as metades, obtendo '
   + '$δ = min(δ_E, δ_D)$.</p>'
   + '<p><strong>A combinação:</strong> um par que cruza e bate $δ$ tem de estar na faixa de '
   + 'largura $2δ$ em torno da reta. Ordenando essa faixa por $y$, cada ponto precisa ser '
   + 'comparado com no máximo <strong>7</strong> vizinhos — porque num retângulo $2δ × δ$ não '
   + 'cabem mais pontos separados por ao menos $δ$.</p>'
   + '<p>Combinação em $O(n)$, logo $T(n) = 2T(n/2) + O(n) = O(n log n)$.</p>' },

/* ================================================= D4 · Padrões de prova */

{ id: 'c401', deck: 'D4', tag: 'padrao',
  f: '<strong>Questão 1</strong> (2,0 pts) — "Encontre os limites assintóticos para as seguintes recorrências". Roteiro?',
  v: '<p>Para cada item:</p>'
   + '<p><strong>1.</strong> É subtrativa ($T(n−1)$)? Então árvore/telescópica, não Teorema Mestre.</p>'
   + '<p><strong>2.</strong> Se for $aT(n/b) + f(n)$: escreva $a$, $b$, calcule $n^{log_b a}$.</p>'
   + '<p><strong>3.</strong> Compare com $f(n)$, diga <em>qual caso</em> e por quê.</p>'
   + '<p><strong>4.</strong> Caso 3 → verifique a regularidade e exiba o $c < 1$.</p>'
   + '<p><strong>5.</strong> Responda em $Θ$.</p>'
   + '<p>Escreva os passos: o gabarito dá crédito pelo equacionamento, não só pela resposta.</p>' },

{ id: 'c402', deck: 'D4', tag: 'padrao',
  f: '<strong>Questão 2</strong> (2,0 pts) — "Complexidade do algoritmo a seguir. Mostre o equacionamento e sua relação com os laços". Roteiro?',
  v: '<p><strong>1.</strong> Analise o laço <em>mais interno</em> primeiro e diga quantas vezes '
   + 'executa — e, crucialmente, <strong>se depende ou não</strong> dos índices externos.</p>'
   + '<p><strong>2.</strong> Suba um nível: quantas vezes o laço do meio executa (pode depender '
   + 'do externo — ex.: $j$ de 1 a $i$ executa $i$ vezes).</p>'
   + '<p><strong>3.</strong> Monte o somatório aninhado completo.</p>'
   + '<p><strong>4.</strong> Resolva de dentro para fora, tirando do somatório o que for constante '
   + 'em relação ao índice.</p>'
   + '<p><strong>5.</strong> Responda em $Θ$.</p>' },

{ id: 'c403', deck: 'D4', tag: 'padrao',
  f: '<strong>Questão 3</strong> (2,0 pts) — "Especifique o invariante e demonstre a corretude". Roteiro?',
  v: '<p><strong>1. Enuncie o invariante</strong> como uma frase sobre o estado no '
   + '<em>início da iteração $i$</em>. Quase sempre da forma: "a variável X contém '
   + '&lt;o resultado parcial&gt; dos elementos já processados, $A[1..i−1]$".</p>'
   + '<p><strong>2. Inicialização:</strong> substitua $i$ pelo valor inicial e mostre que a '
   + 'afirmação é trivialmente verdadeira (em geral sobre a sequência vazia).</p>'
   + '<p><strong>3. Manutenção:</strong> assuma o invariante em $i$, aplique o corpo do laço, '
   + 'mostre que vale em $i+1$.</p>'
   + '<p><strong>4. Término:</strong> diga <em>com que valor</em> o laço encerra, substitua no '
   + 'invariante e conclua que é exatamente a saída especificada.</p>'
   + '<p>É o ponto mais barato da prova. Não saia sem os quatro parágrafos.</p>' },

{ id: 'c404', deck: 'D4', tag: 'padrao',
  f: '<strong>Questão 4</strong> (2,0 pts) — "O que a função retorna? Determine a recorrência e o limite". Roteiro?',
  v: '<p><strong>(a) O que retorna:</strong> rastreie o caso base e a combinação. Se ela '
   + 'devolve <code>max(L, R)</code> das duas metades, retorna o máximo do vetor. '
   + 'Verifique num exemplo pequeno de 3 ou 4 elementos.</p>'
   + '<p><strong>(b) A recorrência:</strong> conte <em>quantas</em> chamadas ($a$), sobre '
   + '<em>que tamanho</em> ($n/b$ ou $n−1$), com <em>que custo local</em> ($f(n)$). '
   + 'Escreva $T(n) = aT(n/b) + f(n)$ e resolva.</p>'
   + '<p>Em 2026.1: $T(n) = 2T(n/2) + Θ(1)$, caso 1, $Θ(n)$. '
   + 'Faz sentido — achar o máximo exige olhar todo elemento.</p>' },

{ id: 'c405', deck: 'D4', tag: 'padrao',
  f: '<strong>Questão 5</strong> (2,0 pts) — "Descreva um algoritmo eficiente de D&C para…". Roteiro?',
  v: '<p><strong>1.</strong> Pergunte-se: dá para <em>descartar</em> metade? '
   + 'Se o enunciado dá uma propriedade estrutural (ordenado, unimodal, monótono), quase sempre sim '
   + '→ $Θ(log n)$.</p>'
   + '<p><strong>2.</strong> Se não, a resposta pode cruzar as metades? Então retorno enriquecido '
   + '→ $Θ(n)$.</p>'
   + '<p><strong>3.</strong> Escreva o <em>pseudocódigo</em>, com caso base explícito.</p>'
   + '<p><strong>4.</strong> Escreva a <strong>recorrência</strong> — o enunciado pede.</p>'
   + '<p><strong>5.</strong> Resolva e dê o $Θ$. Confira contra o limite que o enunciado exigia.</p>' },

{ id: 'c406', deck: 'D4', tag: 'padrao',
  f: '<strong>Questão 6</strong> (1,0 pt extra) — como reconhecer o padrão?',
  v: '<p>O enunciado descreve explicitamente <strong>os três casos</strong>: a resposta está '
   + 'toda em E, toda em D, ou cruza as metades. Isso é a assinatura do '
   + '<strong>retorno enriquecido</strong>.</p>'
   + '<p>Pergunte: <em>que informação extra cada metade precisa devolver para que o caso que '
   + 'cruza saia em $Θ(1)$?</em> Em 2026.1 era o mínimo e o máximo.</p>'
   + '<p>Deixe para o fim, mas <strong>reserve tempo</strong> — é nota acima de 10, e é curta '
   + 'para quem reconhece o padrão.</p>' },

{ id: 'c407', deck: 'D4', tag: 'erro',
  f: 'O enunciado da prova avisa três coisas no cabeçalho. Quais?',
  v: '<p><strong>(a)</strong> Limites assintóticos devem ser fornecidos em notação <strong>$Θ$</strong> '
   + '— responder em $O$ é resposta incompleta.</p>'
   + '<p><strong>(b)</strong> $⌊x⌋$ é o maior inteiro menor ou igual a $x$.</p>'
   + '<p><strong>(c)</strong> Assuma $T(1) = T(0) = Θ(1)$, e que cada instrução executa em $Θ(1)$.</p>'
   + '<p>Ler o cabeçalho custa 20 segundos e evita perder pontos por formato.</p>' },

{ id: 'c408', deck: 'D4', tag: 'erro', f: 'Os cinco erros que mais custam ponto nesta prova',
  v: '<p><strong>1.</strong> Responder em $O$ quando pedem $Θ$.</p>'
   + '<p><strong>2.</strong> Aplicar o Teorema Mestre em recorrência subtrativa ou em caso de '
   + 'diferença apenas logarítmica.</p>'
   + '<p><strong>3.</strong> Esquecer a condição de regularidade no caso 3.</p>'
   + '<p><strong>4.</strong> Enunciar o invariante sem o <strong>término</strong>.</p>'
   + '<p><strong>5.</strong> Dar a complexidade sem exibir a <strong>recorrência</strong> — '
   + 'todas as questões de D&C das três provas pedem explicitamente.</p>' },

{ id: 'c409', deck: 'D4', tag: 'erro',
  f: 'Laços aninhados multiplicam ou somam? E laços em sequência?',
  v: '<p><strong>Aninhados: multiplicam.</strong> Dois laços de $n$, um dentro do outro, dão '
   + '$Θ(n^2)$.</p>'
   + '<p><strong>Em sequência: somam</strong> — e a soma é $Θ$ do maior. Um laço $Θ(n^2)$ '
   + 'seguido de um $Θ(n)$ é $Θ(n^2)$.</p>'
   + '<p><strong>O caso sutil:</strong> se o laço interno vai de 1 a $i$ (dependendo do externo), '
   + 'não são $n·n$ iterações, mas $\\S{i=1}{n} i = Θ(n^2)$ — mesma classe, mas o '
   + 'equacionamento precisa aparecer.</p>' },

{ id: 'c410', deck: 'D4', tag: 'erro',
  f: 'Como decidir, em 5 segundos, se o Teorema Mestre serve?',
  v: '<p><strong>Serve</strong> se a recorrência tem a forma $aT(n/b) + f(n)$ com $a ≥ 1$, '
   + '$b > 1$, todos os subproblemas do <em>mesmo</em> tamanho, e $f(n)$ polinomialmente '
   + 'comparável a $n^{log_b a}$.</p>'
   + '<p><strong>Não serve</strong> se: aparece $T(n − k)$; os subproblemas têm tamanhos '
   + 'diferentes; ou $f(n)$ difere de $n^{log_b a}$ apenas por fator logarítmico.</p>'
   + '<p>Nesses casos: <strong>árvore de recursão</strong>. E se houver somatório na '
   + 'recorrência: <strong>remoção de histórico</strong>.</p>' },

/* ------------------------------------------------------------------------
   c411+ — derivados da comparação das três provas (2025.1, 2025.2, 2026.1).
   Tag 'freq' = o que a frequência diz; 'canonicas' = recorrências cobradas.
   ------------------------------------------------------------------------ */

{id: 'c411', deck: 'D4', tag: 'freq',
  f: 'Dos temas da Prova 1, quais caíram nas <strong>três</strong> provas (2025.1, 2025.2, 2026.1)?',
  v: '<p><strong>Três temas, 3/3:</strong></p>'
   + '<p><strong>1.</strong> Resolver recorrências dadas — Teorema Mestre + árvore. '
   + '(2025.1 Q1 · 2025.2 Q2 · 2026.1 Q1) ≈ 2,2 pts</p>'
   + '<p><strong>2.</strong> Analisar um pseudocódigo dado: o que retorna, a recorrência, o $Θ$. '
   + '(2025.1 Q3 · 2025.2 Q3 · 2026.1 Q4) ≈ 2,5 pts</p>'
   + '<p><strong>3.</strong> Projetar um algoritmo de D&amp;C do zero. '
   + '(2025.1 Q4+Q5 · 2025.2 Q4 · 2026.1 Q5+Q6) ≈ 3,5 pts</p>'
   + '<p>Somados, <strong>cerca de 8 dos 10 pontos</strong>. Laços aninhados caiu em 2/3; '
   + 'invariante de laço e a questão conceitual de assintótica, em 1/3 cada.</p>' },

{id: 'c412', deck: 'D4', tag: 'freq',
  f: 'Qual é o <strong>problema mais repetido</strong> do acervo de provas?',
  v: '<p>A <strong>maior diferença</strong> $A[j] − A[i]$ com $i ≤ j$ — o "MaxDif".</p>'
   + '<p>Caiu <strong>duas vezes</strong>, em ângulos opostos:</p>'
   + '<p>· <strong>2025.2 Q3</strong> (2,5 pts): o pseudocódigo era dado, e você tinha de '
   + '<em>analisar</em> — a versão iterativa é $Θ(n^2)$, a de D&amp;C é $Θ(n)$.</p>'
   + '<p>· <strong>2026.1 Q6</strong> (1,0 pt extra): você tinha de <em>projetar</em>.</p>'
   + '<p>Nas duas, a chave é a mesma: cada chamada devolve a tripla '
   + '$(min, max, dif)$, e o caso que cruza sai de $max_D − min_E$ em $Θ(1)$.</p>' },

{id: 'c413', deck: 'D4', tag: 'canonicas',
  f: 'Recorrências já cobradas — <strong>as do Teorema Mestre</strong>. Resolva de cabeça: '
     + '$4T(n/2) + n^2$ · $16T(n/4) + n$ · $2T(n/4) + \\r{n}$ · $2T(n/2) + 1$ · $T(n/2) + 1$',
  v: '<p>$$4T(n/2) + n^2 = Θ(n^2 log n)$$ caso 2 — $n^{log_2 4} = n^2 = f(n)$. (2026.1 Q1a)</p>'
   + '<p>$$16T(n/4) + n = Θ(n^2)$$ caso 1 — $n^{log_4 16} = n^2$ domina $f(n) = n$. (2025.2 Q2A)</p>'
   + '<p>$$2T(n/4) + \\r{n} = Θ(\\r{n} log n)$$ caso 2 — $n^{log_4 2} = n^{1/2} = \\r{n}$. (2025.1 Q1a)</p>'
   + '<p>$$2T(n/2) + 1 = Θ(n)$$ caso 1. (2025.2 Q3 · 2026.1 Q4 · pior caso de 2025.1 Q3)</p>'
   + '<p>$$T(n/2) + 1 = Θ(log n)$$ caso 2 — $a = 1$, $n^{log_2 1} = 1$. (2025.1 Q4 e melhor caso de Q3)</p>' },

{id: 'c414', deck: 'D4', tag: 'canonicas',
  f: 'Recorrências já cobradas — <strong>as que o Teorema Mestre NÃO resolve</strong>. '
     + 'Resolva: $2T(n−1) + 1$ · $2T(n−1) + n$ · $T(n−1) + log n$ · $T(n) = n + \\S{i=1}{n−1} T(i)$',
  v: '<p>$$2T(n−1) + 1 = Θ(2^n)$$ árvore de altura $n$, $2^{i−1}$ nós no nível $i$: '
   + '$\\S{i=1}{n} 2^{i−1} = 2^n − 1$. (2025.2 Q2B)</p>'
   + '<p>$$2T(n−1) + n = Θ(2^n)$$ mesma árvore, nós de custo $n−i+1$. (2026.1 Q1d)</p>'
   + '<p>$$T(n−1) + log n = Θ(n log n)$$ telescopa em $\\S{i=1}{n} log i = log(n!)$. (2025.2 Q2C)</p>'
   + '<p>$$n + \\S{i=1}{n−1} T(i) = Θ(2^n)$$ remoção de histórico: subtraia a equação de $n−1$ '
   + 'e caia em $2T(n−1) + 1$. (2025.1 Q1b)</p>'
   + '<p><strong>Padrão:</strong> subtrativa com coeficiente 2 explode em $Θ(2^n)$ — caiu nas '
   + 'três provas.</p>' },

{id: 'c415', deck: 'D4', tag: 'padrao',
  f: 'O enunciado descreve o algoritmo <strong>só em prosa</strong>, sem pseudocódigo. '
     + 'Como traduzir para recorrência?',
  v: '<p>Dicionário (foi a Q2 de 2025.2, 2,5 pts):</p>'
   + '<p>· "divide em $a$ sub-problemas" → o coeficiente $a$</p>'
   + '<p>· "com entradas $b$ vezes menores" → $T(n/b)$</p>'
   + '<p>· "cada uma com um elemento a menos" → $T(n−1)$, <strong>subtrativa</strong></p>'
   + '<p>· "descarta-se um elemento" → uma única chamada $T(n−1)$</p>'
   + '<p>· "combinadas em tempo linear" → $+ Θ(n)$</p>'
   + '<p>· "tempo de combinar é constante" → $+ Θ(1)$</p>'
   + '<p>· "processar a entrada custa logaritmo" → $+ log n$</p>'
   + '<p><strong>A pegadinha:</strong> "um elemento a menos" é $T(n−1)$, não $T(n/2)$ — a '
   + 'diferença entre $Θ(2^n)$ e $Θ(n)$.</p>' },

{id: 'c416', deck: 'D4', tag: 'assint',
  f: 'Dois programas custam $f(n) = n + 5/n$ e $g(n) = 100\\r{n}$. Qual é mais rápido para '
     + '$n ≤ 1.000$? E para $n > 10.000$?',
  v: '<p>$f = Θ(n)$ e $g = Θ(\\r{n})$ — assintoticamente $g$ é melhor. '
   + 'Mas a pergunta é sobre uma <strong>faixa</strong>.</p>'
   + '<p>· $n ≤ 1.000$: $f(1000) = 1000{,}005$ contra $g(1000) ≈ 3.162$. '
   + 'Ganha o de $Θ(n)$.</p>'
   + '<p>· $n > 10.000$: $g(10000) = 100 × 100 = 10.000$ contra $f(10000) > 10.000$. '
   + 'Ganha o de $Θ(\\r{n})$.</p>'
   + '<p>O cruzamento é em $100\\r{n} = n$, ou seja $n = 10.000$.</p>'
   + '<p><strong>A lição:</strong> a notação assintótica ignora constantes e termos de menor '
   + 'ordem de propósito. Quando o enunciado fixa uma faixa de $n$, compare os '
   + '<em>valores</em>. Como as funções são contínuas e crescentes, basta olhar os extremos. '
   + '(2025.2 Q1, 2,0 pts)</p>' },

{id: 'c417', deck: 'D3', tag: 'potencia',
  f: 'Como calcular $x^n mod k$ em $Θ(log n)$?',
  v: '<p>Pela identidade $(xy) mod k = [(x mod k)(y mod k)] mod k$, que permite reduzir '
   + '<em>dentro</em> da recursão em vez de calcular $x^n$ inteiro (que estouraria).</p>'
   + '<p>Mesma decomposição da potência comum:</p>'
   + '$$x^n = \\c{\\p{x^{n/2}}^2}{se n é par}{x · \\p{x^{(n−1)/2}}^2}{se n é ímpar}$$'
   + '<p>devolvendo $(r^2 × s) mod k$, com $s = x mod k$ no caso ímpar e $s = 1$ no par.</p>'
   + '$$T(n) = T(n/2) + Θ(1) ⇒ Θ(log n)$$'
   + '<p><strong>Diga explicitamente:</strong> a recorrência é no <em>expoente</em> $n$, não '
   + 'em $x$, $k$ ou número de elementos. (2025.1 Q4, 3,0 pts)</p>' },

{id: 'c418', deck: 'D2', tag: 'somas',
  f: '$T(n) = T(n−1) + log n$. Por que não é $Θ(log n)$?',
  v: '<p>Porque há $n$ níveis de recursão, cada um custando um logaritmo — o total é $n$ '
   + 'logaritmos, não um.</p>'
   + '<p>Telescopando e usando que <strong>soma de logaritmos é o logaritmo do produto</strong>:</p>'
   + '$$T(n) = \\S{i=1}{n} log i = log\\p{\\P{i=1}{n} i} = log(n!) = Θ(n log n)$$'
   + '<p>O mesmo raciocínio que faz $T(n−1) + Θ(1)$ dar $Θ(n)$ e não $Θ(1)$. '
   + '(2025.2 Q2C)</p>' },

{id: 'c419', deck: 'D2', tag: 'padrao',
  f: 'Três laços aninhados: o externo faz $i ← ⌊i/2⌋$, o do meio $j ← j × 2$, e o interno '
     + '$k ← k + 2$ até $n$. Complexidade?',
  v: '$$Θ(n log^2 n)$$'
   + '<p>· externo: $i$ parte de $n$ e é <strong>dividido</strong> por 2 → $⌈log_2 n⌉$ voltas</p>'
   + '<p>· meio: $j$ parte de 1 e é <strong>multiplicado</strong> por 2 → $⌈log_2 n⌉$ voltas, '
   + 'e <em>não depende de $i$</em>, pois $j$ é reinicializado</p>'
   + '<p>· interno: $k$ <strong>soma</strong> 2 até $n$ → $n/2 = Θ(n)$ voltas</p>'
   + '<p>Independentes, então multiplicam: $log n × log n × n$.</p>'
   + '<p><strong>A regra:</strong> laço aditivo dá $Θ(n)$; laço multiplicativo dá $Θ(log n)$. '
   + 'Somar 2 em vez de 1 não muda a ordem. (2025.1 Q2)</p>' },

{id: 'c420', deck: 'D3', tag: 'projeto',
  f: 'Elemento majoritário <strong>sem ordenar</strong>, por divisão e conquista. Ideia e complexidade?',
  v: '<p><strong>A dica que fecha o problema:</strong> se há majoritário em $X$, ele é '
   + 'majoritário em ao menos uma das metades — senão somaria no máximo $n/2$. Logo há no '
   + 'máximo <strong>dois candidatos</strong>.</p>'
   + '<p>Particione; se as duas metades devolvem o mesmo valor, é a resposta. Senão, conte as '
   + 'ocorrências de cada candidato em $X$ — varredura linear — e devolva o que passar de '
   + '$(b−a+1)/2$.</p>'
   + '$$T(n) = 2T(n/2) + n ⇒ Θ(n log n)$$'
   + '<p><strong>O padrão:</strong> a recursão só produz <em>candidatos</em>; a validação é '
   + 'linear e separada. Existe solução $Θ(n)$ (Boyer–Moore), mas 2025.2 Q4 pediu D&amp;C com '
   + 'teto $O(n log n)$ — entregue o que o enunciado pede.</p>' },

{id: 'c421', deck: 'D3', tag: 'padrao',
  f: 'Uma mesma função recursiva tem melhor caso $Θ(log n)$ e pior caso $Θ(n)$. O que mudou '
     + 'entre os dois?',
  v: '<p>O <strong>número</strong> de chamadas recursivas — não o tamanho delas.</p>'
   + '<p><strong>Melhor caso:</strong> uma chamada.</p>'
   + '$$T(n) = T(n/2) + 1 = Θ(log n)$$'
   + '<p><strong>Pior caso:</strong> duas chamadas.</p>'
   + '$$T(n) = 2T(n/2) + 1 = Θ(n)$$'
   + '<p>Nos dois casos o subproblema é $n/2$. É só o coeficiente que muda, de 1 para 2.</p>'
   + '<p><strong>O caso concreto (2025.1 Q3, 3,0 pts):</strong> uma função que conta '
   + 'ocorrências de $k$ num vetor ordenado. Se $V[i] ≠ k$, desce por um lado só — busca '
   + 'binária. Se $V[i] = k$, recursa nas <em>duas</em> metades. Melhor caso: $k ∉ V$. '
   + 'Pior caso: $V$ inteiro é cópia de $k$.</p>' },

{id: 'c422', deck: 'D4', tag: 'erro',
  f: 'Numa questão de projeto, o que distingue uma resposta de $Θ(n)$ de uma de $Θ(n log n)$?',
  v: '<p><strong>O custo da combinação.</strong> O número e o tamanho dos subproblemas é o '
   + 'mesmo ($2$ de $n/2$); o que muda é $f(n)$:</p>'
   + '$$2T(n/2) + Θ(1) = Θ(n) \\qquad 2T(n/2) + Θ(n) = Θ(n log n)$$'
   + '<p>Derrubar a combinação para $Θ(1)$ é exatamente o que o <strong>retorno '
   + 'enriquecido</strong> faz: devolver, além da resposta, o que a combinação precisaria '
   + 'recalcular varrendo as metades.</p>'
   + '<p><strong>Na prova:</strong> dizer <em>o que cada chamada devolve</em> é parte da '
   + 'resposta, não detalhe de implementação. E explicitar '
   + '$T(n) = aT(n/b) + f(n)$ — todas as três provas pedem a recorrência.</p>' }

];
