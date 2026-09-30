/* ==========================================================================
   bibliografia.js — mapa tópico → livro → seção, usando os arquivos reais
   da pasta "Bibliografia Oficial".

   Observação sobre páginas: os PDFs desta pasta são edições reflowed/digitais
   cuja paginação não acompanha a edição impressa. Por isso citamos
   CAPÍTULO E SEÇÃO, que são estáveis — use a busca do leitor de PDF.
   ========================================================================== */

window.LIVROS = [
  { id: 'cormen',
    titulo: 'Algoritmos: Teoria e Prática',
    autores: 'Cormen, Leiserson, Rivest & Stein',
    ed: '3ª edição, tradução brasileira',
    arquivo: 'Algoritmos - Teoria e Pratica - Cormen 3ed BR.pdf',
    papel: 'principal',
    nota: 'A referência central do curso e a fonte dos exercícios que a Lista 1 cita por número. '
        + 'Os capítulos 2, 3 e 4 cobrem praticamente toda a Prova 1. Texto em português e '
        + 'totalmente pesquisável.' },

  { id: 'dasgupta',
    titulo: 'Algorithms',
    autores: 'Dasgupta, Papadimitriou & Vazirani',
    ed: 'McGraw-Hill, 2006',
    arquivo: 'Algorithms_Dasgupta_et_al_2006.pdf',
    papel: 'complementar',
    nota: 'Muito mais enxuto que o Cormen e excelente quando uma explicação do Cormen não '
        + '"pegar". O capítulo 2 inteiro é divisão e conquista, em 30 páginas. Em inglês.' },

  { id: 'manber',
    titulo: 'Introduction to Algorithms: A Creative Approach',
    autores: 'Udi Manber',
    ed: '1989',
    arquivo: 'Introduction to Algorithms A Creative Approach (Udi Manber) SEM OCR.pdf',
    papel: 'complementar',
    nota: 'Organiza o projeto de algoritmos em torno de indução matemática — é a melhor fonte '
        + 'para as questões 5 e 6, que pedem que você <em>invente</em> a decomposição. '
        + 'Atenção: este PDF é digitalizado <strong>sem OCR</strong>, então não é pesquisável — '
        + 'navegue pelo sumário.' },

  { id: 'knuth',
    titulo: 'The Art of Computer Programming, vol. 3: Sorting and Searching',
    autores: 'Donald Knuth',
    ed: '2ª edição',
    arquivo: 'Art of Computer Programming, The Volume 3 Sorting and Searching (Knuth, Donald).pdf',
    papel: 'consulta',
    nota: 'Referência exaustiva, com as contagens exatas de comparações. Útil para um ponto '
        + 'específico da Lista 1 (o item 12, do segundo menor elemento). Não é livro para '
        + 'estudar por ele — é para consultar um resultado.' },

  { id: 'garey',
    titulo: 'Computers and Intractability',
    autores: 'Garey & Johnson',
    ed: '1979',
    arquivo: 'Computers_and_Intractability_Garey_Johnson_1979.pdf',
    papel: 'fora-do-escopo',
    nota: 'A referência clássica de NP-completude. Corresponde ao slide 07, que é matéria da '
        + '<strong>Prova 2</strong>. Fora do escopo da Prova 1.' },

  { id: 'bondy',
    titulo: 'Graph Theory with Applications',
    autores: 'Bondy & Murty',
    ed: '1976',
    arquivo: 'Graph_Theory_with_Applications_Bondy_Murty_1976_Z_Library.pdf',
    papel: 'fora-do-escopo',
    nota: 'Teoria dos grafos. Corresponde aos slides 09 e 10, matéria da '
        + '<strong>Prova 2</strong>. Fora do escopo da Prova 1.' }
];

window.BIBLIOGRAFIA = [

  { topico: 'Invariante de laço e corretude',
    modulo: 'm1-inv', prova: 'Q3',
    refs: [
      { livro: 'cormen',   onde: '§2.1',        obs: 'Ordenação por inserção e o invariante, com a prova completa das três propriedades. É a fonte direta da questão 3.' },
      { livro: 'cormen',   onde: '§2.3.1',      obs: 'Invariante do procedimento Intercala (merge).' },
      { livro: 'manber',   onde: 'cap. 2',      obs: 'Indução matemática — o esqueleto lógico de que o invariante é um caso particular.' }
    ] },

  { topico: 'Modelo RAM, melhor/pior/médio caso',
    modulo: 'm1-ram', prova: 'Q2',
    refs: [
      { livro: 'cormen',   onde: '§2.2',        obs: 'Análise de algoritmos, o modelo de computação e a análise exata do insertion sort nos três cenários.' },
      { livro: 'manber',   onde: 'cap. 3',      obs: 'Análise de algoritmos, com ênfase em contagem de operações.' }
    ] },

  { topico: 'Notações O, Ω, Θ, o, ω',
    modulo: 'm1-assint', prova: 'Q1 · Q2',
    refs: [
      { livro: 'cormen',   onde: '§3.1',        obs: 'Definições formais, o Teorema 3.1 e todos os exercícios 3.1-1 a 3.1-8 que a Lista 1 cita (itens 36 a 43).' },
      { livro: 'cormen',   onde: 'problema 3-1', obs: 'Comportamento assintótico de polinômios — é o item 44 da Lista 1.' },
      { livro: 'dasgupta', onde: '§0.3',        obs: 'A apresentação mais curta e direta de big-O que existe. Três páginas.' }
    ] },

  { topico: 'Logaritmos, somatórios, fatoriais',
    modulo: 'm0', prova: 'Q1 · Q2',
    refs: [
      { livro: 'cormen',   onde: '§3.2',        obs: 'Notações padrão e funções comuns: pisos e tetos, logaritmos, fatoriais, Stirling, log iterado, Fibonacci.' },
      { livro: 'cormen',   onde: 'apêndice A',  obs: 'Somatórios — todas as fórmulas fechadas e as técnicas de limitação.' }
    ] },

  { topico: 'Método da substituição',
    modulo: 'm2-subst', prova: 'Q1',
    refs: [
      { livro: 'cormen',   onde: '§4.3',        obs: 'Adivinhar e provar por indução, incluindo as armadilhas e a técnica de fortalecer a hipótese subtraindo um termo de ordem inferior.' },
      { livro: 'manber',   onde: 'cap. 3',      obs: 'A relação entre recorrência e indução, tratada como uma coisa só.' }
    ] },

  { topico: 'Árvore de recursão',
    modulo: 'm2-arvore', prova: 'Q1',
    refs: [
      { livro: 'cormen',   onde: '§4.4',        obs: 'O método, mais os exercícios 4.4-1 a 4.4-4 que a Lista 1 cita (itens 50 a 53).' },
      { livro: 'dasgupta', onde: '§2.2',        obs: 'Deriva o teorema mestre a partir da árvore — é a explicação mais intuitiva de por que os três casos existem.' }
    ] },

  { topico: 'Teorema Mestre',
    modulo: 'm2-mestre', prova: 'Q1',
    refs: [
      { livro: 'cormen',   onde: '§4.5',        obs: 'O enunciado dos três casos e os exercícios 4.5-1 a 4.5-5 (itens 54 a 58 da Lista 1).' },
      { livro: 'cormen',   onde: '§4.6',        obs: 'A demonstração, e os exercícios 4.6-1 a 4.6-3 (itens 59 a 61). O 4.6-2 dá a extensão para f(n) com fator logarítmico.' },
      { livro: 'cormen',   onde: 'problemas 4-1 e 4-2', obs: 'Baterias de recorrências — itens 62 e 63 da Lista 1.' },
      { livro: 'dasgupta', onde: '§2.2',        obs: 'Enunciado equivalente, mais curto, com a prova por soma de série geométrica.' }
    ] },

  { topico: 'Remoção de histórico',
    modulo: 'm2-hist', prova: 'Q1',
    refs: [
      { livro: 'cormen',   onde: '§7.4.2',      obs: 'A análise do caso médio do Quicksort usa a mesma manipulação algébrica, embora o Cormen a apresente por variáveis indicadoras.' },
      { livro: 'knuth',    onde: '§5.2.2',      obs: 'A derivação clássica e detalhada do caso médio do Quicksort.' }
    ] },

  { topico: 'Divisão e conquista: a estratégia',
    modulo: 'm3-fases', prova: 'Q4 · Q5 · Q6',
    refs: [
      { livro: 'cormen',   onde: '§2.3 e cap. 4', obs: 'Merge Sort como exemplo introdutório, e o capítulo 4 inteiro dedicado à análise.' },
      { livro: 'cormen',   onde: '§4.1',        obs: 'Subarranjo de soma máxima por D&C — o protótipo do padrão "retorno enriquecido" cobrado na questão 6.' },
      { livro: 'dasgupta', onde: 'cap. 2',      obs: 'O capítulo mais bem escrito sobre D&C nesta pasta: 30 páginas cobrindo Karatsuba, recorrências, mergesort, medianas e Strassen.' },
      { livro: 'manber',   onde: 'cap. 5',      obs: 'Projeto de algoritmos por indução — a melhor preparação para as questões 5 e 6, que pedem invenção e não reconhecimento.' }
    ] },

  { topico: 'Multiplicação: Karatsuba e Strassen',
    modulo: 'm3-strassen', prova: 'Q1 · Q5',
    refs: [
      { livro: 'cormen',   onde: '§4.2',        obs: 'Algoritmo de Strassen, com os sete produtos e a recombinação. E o exercício 4.5-2 (item 55 da Lista 1) sobre como bater Strassen.' },
      { livro: 'dasgupta', onde: '§2.1',        obs: 'Karatsuba — a multiplicação de inteiros em Θ(n^lg 3). É o item 2 dos exercícios do slide 03.' },
      { livro: 'dasgupta', onde: '§2.5',        obs: 'Strassen numa página e meia.' }
    ] },

  { topico: 'Seleção: k-ésimo menor elemento',
    modulo: 'm3-kesimo', prova: 'Q5',
    refs: [
      { livro: 'cormen',   onde: '§9.2',        obs: 'Seleção em tempo esperado linear — o algoritmo do slide 03, com a análise de caso médio.' },
      { livro: 'cormen',   onde: '§9.3',        obs: 'Seleção em tempo linear no PIOR caso (mediana das medianas). Fora do escopo da prova, mas é a resposta a "dá para garantir Θ(n)?".' },
      { livro: 'dasgupta', onde: '§2.4',        obs: 'Medianas — a mesma ideia em duas páginas.' }
    ] },

  { topico: 'Quick-sort',
    modulo: 'm3-quick', prova: 'Q1 · Q4',
    refs: [
      { livro: 'cormen',   onde: '§7.1 – 7.2',  obs: 'Descrição, particionamento e desempenho (pior e melhor caso).' },
      { livro: 'cormen',   onde: '§7.4',        obs: 'Análise do caso médio, com a série harmônica.' },
      { livro: 'knuth',    onde: '§5.2.2',      obs: 'Tratamento exaustivo, com as constantes exatas.' }
    ] },

  { topico: 'Merge Sort e intercalação',
    modulo: 'm2-extrair', prova: 'Q1 · Q4',
    refs: [
      { livro: 'cormen',   onde: '§2.3.1',      obs: 'Merge Sort e o procedimento Intercala, incluindo a justificativa das sentinelas.' },
      { livro: 'dasgupta', onde: '§2.3',        obs: 'Mergesort, com a versão iterativa por fila.' },
      { livro: 'knuth',    onde: '§5.2.4',      obs: 'Ordenação por intercalação, em profundidade.' }
    ] },

  { topico: 'Busca binária',
    modulo: 'm2-extrair', prova: 'Q5',
    refs: [
      { livro: 'cormen',   onde: 'exercício 2.3-5', obs: 'Onde a busca binária é introduzida — e o exercício 4.5-3 (item 56 da Lista 1) pede que se resolva sua recorrência pelo método mestre.' },
      { livro: 'cormen',   onde: '§4.5',        obs: 'A recorrência T(n) = T(n/2) + Θ(1) como exemplo do caso 2.' },
      { livro: 'knuth',    onde: '§6.2.1',      obs: 'Busca em tabela ordenada, com todas as variantes e análises.' }
    ] },

  { topico: 'Limite inferior de ordenação por comparação',
    modulo: 'm0-fat', prova: 'Q1',
    refs: [
      { livro: 'cormen',   onde: '§8.1',        obs: 'A árvore de decisão e o limite Ω(n lg n) — a aplicação de lg(n!) = Θ(n lg n), que é o item 26(f) e 30(e) da Lista 1.' },
      { livro: 'knuth',    onde: '§5.3.1',      obs: 'Ordenação com número mínimo de comparações — e a análise do problema do segundo menor elemento (item 12 da Lista 1).' }
    ] },

  { topico: 'Pré-processamento e contagem',
    modulo: null, prova: '—',
    refs: [
      { livro: 'cormen',   onde: '§8.2',        obs: 'Ordenação por contagem (counting sort) — o histograma com soma de prefixos é exatamente a estrutura pedida nos itens 74 e 75 da Lista 1.' }
    ] },

  { topico: 'Casamento de cadeias',
    modulo: null, prova: '—',
    refs: [
      { livro: 'cormen',   onde: '§32.1',       obs: 'O algoritmo ingênuo (naive string matcher) do item 73 da Lista 1, com a contagem de comparações.' },
      { livro: 'cormen',   onde: '§32.4',       obs: 'Knuth–Morris–Pratt — a generalização do salto que o item 73(b) pede no caso de caracteres distintos.' }
    ] },

  { topico: 'Elemento majoritário',
    modulo: 'm3-repertorio', prova: 'Q5 · Q6',
    refs: [
      { livro: 'manber',   onde: 'cap. 5',      obs: 'O problema aparece como exercício de projeto por indução. É o item 76 da Lista 1 e o item 5 dos exercícios do slide 03.' }
    ] },

  { topico: 'Par de pontos mais próximos',
    modulo: 'm3-repertorio', prova: 'Q5',
    refs: [
      { livro: 'cormen',   onde: '§33.4',       obs: 'O par de pontos mais próximos em O(n lg n), com o argumento dos 7 vizinhos na faixa. É o item 1 dos exercícios do slide 03.' },
      { livro: 'manber',   onde: 'cap. 8',      obs: 'Algoritmos geométricos, com a mesma construção.' }
    ] },

  { topico: 'O Problema da Parada e computabilidade',
    modulo: 'm1-parada', prova: '—',
    refs: [
      { livro: 'garey',    onde: 'cap. 1',      obs: 'Contextualiza o indecidível antes de tratar do intratável. Leitura de uma sessão, opcional para a Prova 1.' }
    ] }
];
