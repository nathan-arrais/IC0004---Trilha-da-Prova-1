/* ==========================================================================
   labs.js — quatro visualizações interativas.
     1. Árvore de recursão desenhada a partir de a, b e f(n)
     2. Resolvedor didático do Teorema Mestre (mostra o raciocínio)
     3. Comparador de taxas de crescimento (escala log)
     4. Trace passo a passo de seis algoritmos do curso
   ========================================================================== */

(function () {
  'use strict';

  var m = AG.m, mt = AG.mt;
  function fmt(x, d) {
    if (!isFinite(x)) return '∞';
    var s = x.toFixed(d == null ? 2 : d);
    return s.replace(/\.?0+$/, '').replace('.', ',') || '0';
  }

  /* ═══════════════════════════════════════════ 1 + 2. Árvore e Mestre ═══ */

  /* Formas de f(n) que o lab entende. expo = expoente de n; logs = potência
     de log; rot = rótulo para exibição.                                    */
  var FS = [
    { v: '1',        expo: 0,   logs: 0, rot: 'Θ(1)' },
    { v: 'logn',     expo: 0,   logs: 1, rot: 'Θ(log n)' },
    { v: 'sqrtn',    expo: 0.5, logs: 0, rot: 'Θ(√n)' },
    { v: 'n',        expo: 1,   logs: 0, rot: 'Θ(n)' },
    { v: 'nlogn',    expo: 1,   logs: 1, rot: 'Θ(n log n)' },
    { v: 'nlog2n',   expo: 1,   logs: 2, rot: 'Θ(n log²n)' },
    { v: 'n2',       expo: 2,   logs: 0, rot: 'Θ(n²)' },
    { v: 'n2logn',   expo: 2,   logs: 1, rot: 'Θ(n² log n)' },
    { v: 'n3',       expo: 3,   logs: 0, rot: 'Θ(n³)' }
  ];

  function fInfo(v) { return FS.filter(function (f) { return f.v === v; })[0]; }

  /* Rótulo de n^e, simplificando os casos notáveis. */
  function pot(e) {
    if (Math.abs(e) < 1e-9) return '1';
    if (Math.abs(e - 1) < 1e-9) return 'n';
    if (Math.abs(e - 0.5) < 1e-9) return '\\r{n}';
    var r = Math.round(e);
    if (Math.abs(e - r) < 1e-9) return 'n^' + r;
    return 'n^{' + fmt(e, 3) + '}';
  }

  /* Decide o caso do Teorema Mestre e devolve o raciocínio. */
  function mestre(a, b, fv) {
    var f = fInfo(fv);
    var crit = Math.log(a) / Math.log(b);       /* log_b a */
    var eps = 1e-9;
    var passos = [];

    passos.push('Identificamos ' + m('a = ' + a) + ', ' + m('b = ' + b)
      + ' e ' + m('f(n) = ' + f.rot.replace('Θ(', '').replace(')', '')) + '.');

    passos.push('O número que decide tudo é o peso das folhas: '
      + AG.eqn('n^{log_b a} = n^{log_' + b + ' ' + a + '} ≈ ' + pot(crit)));

    var res, caso, porque;

    if (f.expo < crit - eps) {
      caso = 1;
      porque = m('f(n)') + ' tem expoente ' + m(fmt(f.expo, 3))
        + ', <strong>menor</strong> que ' + m(fmt(crit, 3))
        + ' — e a diferença é polinomial, logo existe '
        + m('ε > 0') + ' com ' + m('f(n) = O(n^{log_b a − ε})') + '.';
      res = pot(crit);
      passos.push('<strong>Caso 1</strong> — as folhas dominam. ' + porque);
      passos.push(AG.eqn('T(n) = Θ\\p{' + res + '}'));
    } else if (f.expo > crit + eps) {
      caso = 3;
      porque = m('f(n)') + ' tem expoente ' + m(fmt(f.expo, 3))
        + ', <strong>maior</strong> que ' + m(fmt(crit, 3))
        + ' — diferença polinomial, logo ' + m('f(n) = Ω(n^{log_b a + ε})') + '.';
      var c = a / Math.pow(b, f.expo);
      passos.push('<strong>Caso 3</strong> — a raiz domina. ' + porque);
      passos.push('<strong>Condição de regularidade</strong> (obrigatória no caso 3): '
        + 'como ' + m('f(n)') + ' é essencialmente ' + m(pot(f.expo)) + ', temos '
        + AG.eqn('\\f{a·f(n/b)}{f(n)} ≈ \\f{a}{b^{' + fmt(f.expo, 3) + '}} = ' + fmt(c, 3))
        + (c < 1
            ? 'que é ' + m('< 1') + ' — a condição vale, com ' + m('c = ' + fmt(c, 3)) + '. ✓'
            : 'que <strong>não</strong> é menor que 1 — reveja os parâmetros.'));
      res = f.rot.replace('Θ(', '').replace(')', '');
      passos.push(AG.eqn('T(n) = Θ\\p{f(n)} = ' + f.rot));
    } else if (f.logs === 0) {
      caso = 2;
      porque = m('f(n)') + ' tem exatamente o mesmo expoente que '
        + m('n^{log_b a}') + ' — empate técnico, ' + m('f(n) = Θ(n^{log_b a})') + '.';
      passos.push('<strong>Caso 2</strong> — todos os níveis custam o mesmo. ' + porque);
      passos.push('O fator ' + m('lg n') + ' que aparece na resposta é, literalmente, '
        + 'o <em>número de níveis</em> da árvore.');
      res = pot(crit) + ' lg n';
      passos.push(AG.eqn('T(n) = Θ\\p{n^{log_b a} · lg n} = Θ\\p{' + res + '}'));
    } else {
      /* Mesmo expoente, mas f tem fator log: a lacuna entre os casos 2 e 3. */
      caso = 0;
      passos.push('<strong>O Teorema Mestre NÃO se aplica.</strong> '
        + m('f(n)') + ' tem o mesmo expoente de ' + m('n^{log_b a}')
        + ', mas o excede por um fator ' + m('log^' + f.logs + ' n')
        + ' — uma diferença <em>logarítmica</em>, não polinomial. '
        + 'Não existe ' + m('ε > 0') + ' com ' + m('f(n) = Ω(n^{log_b a + ε})')
        + ', então o caso 3 falha; e ' + m('f(n) ≠ Θ(n^{log_b a})') + ', então o caso 2 '
        + 'também falha.');
      passos.push('<strong>Resolva pela árvore de recursão.</strong> Cada um dos '
        + m('log_b n') + ' níveis custa ' + m('Θ\\p{n^{log_b a} log^{' + f.logs + '} n}')
        + ' (aproximadamente), e a soma acrescenta uma potência de logaritmo — '
        + 'é a extensão do Cormen 4.6-2:');
      res = pot(crit) + ' lg^' + (f.logs + 1) + ' n';
      passos.push(AG.eqn('T(n) = Θ\\p{n^{log_b a} lg^{' + (f.logs + 1) + '} n} = Θ\\p{' + res + '}'));
    }

    return { caso: caso, crit: crit, res: res, passos: passos, f: f };
  }

  /* Desenha a árvore em SVG. */
  function desenharArvore(a, b, fv, n) {
    var f = fInfo(fv);
    var altura = Math.max(1, Math.round(Math.log(n) / Math.log(b)));
    var niveisMostrados = Math.min(altura, 4);
    var W = 760, padT = 30, rowH = 82;
    var H = padT + (niveisMostrados + 1) * rowH + 40;

    var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="arv" role="img" '
      + 'aria-label="Árvore de recursão com ' + a + ' filhos por nó, tamanho dividido por '
      + b + ' a cada nível.">';

    /* Linhas-guia dos níveis + rótulos à direita */
    var linhas = [];
    for (var i = 0; i <= niveisMostrados; i++) {
      var y = padT + i * rowH;
      var nos = Math.pow(a, i);
      var tam = n / Math.pow(b, i);
      /* custo do nível = a^i · f(n/b^i) */
      var custoRel = Math.pow(a, i) * Math.pow(1 / Math.pow(b, i), f.expo);

      svg += '<line x1="0" y1="' + (y + 26) + '" x2="' + W + '" y2="' + (y + 26)
           + '" class="guia"/>';

      /* Nós: desenha até 8 por nível, depois elipse */
      var mostrar = Math.min(nos, 8);
      var gap = W / (mostrar + 1);
      for (var k = 0; k < mostrar; k++) {
        var cx = gap * (k + 1);
        svg += '<circle cx="' + cx.toFixed(1) + '" cy="' + y + '" r="11" class="no n' + (i % 3) + '"/>';
        /* aresta para o pai */
        if (i > 0) {
          var paiIdx = Math.floor(k / a);
          var mostrarPai = Math.min(Math.pow(a, i - 1), 8);
          var gapPai = W / (mostrarPai + 1);
          var px = gapPai * (Math.min(paiIdx, mostrarPai - 1) + 1);
          svg += '<line x1="' + px.toFixed(1) + '" y1="' + (y - rowH + 11) + '" x2="'
               + cx.toFixed(1) + '" y2="' + (y - 11) + '" class="aresta"/>';
        }
      }
      if (nos > mostrar) {
        svg += '<text x="' + (W - 14) + '" y="' + (y + 4) + '" class="rot elip" '
             + 'text-anchor="end">… ' + nos.toLocaleString('pt-BR') + ' nós</text>';
      }

      linhas.push({
        i: i, nos: nos, tam: tam, custoRel: custoRel
      });
    }

    /* Folhas */
    var y2 = padT + (niveisMostrados + 1) * rowH - 20;
    svg += '<text x="' + (W / 2) + '" y="' + y2 + '" class="rot folhas" text-anchor="middle">'
         + '⋮ &nbsp; até as folhas: n^(log_' + b + ' ' + a + ') ≈ '
         + Math.pow(n, Math.log(a) / Math.log(b)).toExponential(2).replace('e+', '×10^')
         + ' folhas &nbsp; ⋮</text>';
    svg += '</svg>';

    /* Tabela dos níveis */
    var tab = '<div class="tw"><table><thead><tr>'
      + '<th class="num">Nível</th><th class="num">Nós</th><th class="num">Tamanho</th>'
      + '<th>Custo por nó</th><th>Custo do nível</th>'
      + '</tr></thead><tbody>'
      + linhas.map(function (L) {
          var fator = L.custoRel;
          return '<tr>'
            + '<td class="num">' + L.i + '</td>'
            + '<td class="num">' + (L.nos > 1e6 ? L.nos.toExponential(1) : L.nos.toLocaleString('pt-BR')) + '</td>'
            + '<td class="num">' + (L.tam >= 1 ? fmt(L.tam, 1) : fmt(L.tam, 3)) + '</td>'
            + '<td>' + m('f\\p{n/' + b + '^' + L.i + '}') + '</td>'
            + '<td>' + m(fmt(fator, 3) + ' · f(n)') + '</td>'
            + '</tr>';
        }).join('')
      + '</tbody><caption>Custo do nível ' + mt('i') + ' é '
      + mt('a^i · f(n/b^i)') + '. A coluna final mostra esse valor como múltiplo de '
      + mt('f(n)') + ' — é a razão da série geométrica que decide o caso.</caption>'
      + '</table></div>';

    var razao = a / Math.pow(b, f.expo);
    var leitura = razao < 0.999
      ? '<span class="pill ok">razão ' + fmt(razao, 3) + ' &lt; 1</span> — série '
        + '<strong>decrescente</strong>: cada nível custa menos que o anterior, e a soma é '
        + 'dominada pela <strong>raiz</strong>.'
      : razao > 1.001
      ? '<span class="pill bad">razão ' + fmt(razao, 3) + ' &gt; 1</span> — série '
        + '<strong>crescente</strong>: cada nível custa mais, e a soma é dominada pelas '
        + '<strong>folhas</strong>.'
      : '<span class="pill warn">razão ≈ 1</span> — <strong>empate</strong>: todos os níveis '
        + 'custam o mesmo, e a soma é o custo de um nível vezes o número de níveis.';

    return { svg: svg, tab: tab, altura: altura, leitura: leitura, razao: razao };
  }

  function lab1() {
    var a = +AG.$('#arvA').value, b = +AG.$('#arvB').value,
        fv = AG.$('#arvF').value, n = +AG.$('#arvN').value;

    if (!(a >= 1)) { a = 1; AG.$('#arvA').value = 1; }
    if (!(b > 1))  { b = 2; AG.$('#arvB').value = 2; }

    var d = desenharArvore(a, b, fv, n);
    var M = mestre(a, b, fv);

    AG.$('#arvRec').innerHTML = AG.eqn('T(n) = ' + (a === 1 ? '' : a) + 'T\\p{n/'
      + b + '} + ' + fInfo(fv).rot);

    AG.$('#arvSvg').innerHTML = d.svg;

    AG.$('#arvMed').innerHTML = [
      ['Altura', mt('log_' + b + ' n') + ' ≈ ' + fmt(d.altura, 0)],
      ['Nós no nível i', mt(a + '^i')],
      ['Tamanho no nível i', mt('n/' + b + '^i')],
      ['Nº de folhas', mt('n^{log_' + b + ' ' + a + '}') + ' ≈ ' + mt(pot(M.crit))]
    ].map(function (p) {
      return '<div class="med"><span class="k">' + p[0] + '</span>'
        + '<span class="v">' + p[1] + '</span></div>';
    }).join('');

    AG.$('#arvLeitura').innerHTML = d.leitura;
    AG.$('#arvTab').innerHTML = d.tab;

    var badge = M.caso === 0
      ? '<span class="pill bad">Teorema Mestre não se aplica</span>'
      : '<span class="pill ok">Caso ' + M.caso + '</span>';
    AG.$('#mestreOut').innerHTML =
      '<div class="row tight" style="margin-bottom:var(--s-3)">' + badge
      + '<span class="pill accent">' + mt('T(n) = Θ\\p{' + M.res + '}') + '</span></div>'
      + '<ol class="steps">' + M.passos.map(function (p) {
          return '<li><div>' + p + '</div></li>';
        }).join('') + '</ol>';
  }

  /* ═════════════════════════════════════ 3. Taxas de crescimento ════════ */

  var CURVAS = [
    { id: 'c1',     rot: '1',        f: function () { return 1; },                     cor: 0 },
    { id: 'clogn',  rot: 'log n',    f: function (n) { return Math.log2(n); },          cor: 1 },
    { id: 'csqrt',  rot: '√n',       f: function (n) { return Math.sqrt(n); },          cor: 2 },
    { id: 'cn',     rot: 'n',        f: function (n) { return n; },                     cor: 3 },
    { id: 'cnlogn', rot: 'n log n',  f: function (n) { return n * Math.log2(n); },      cor: 4 },
    { id: 'cn2',    rot: 'n²',       f: function (n) { return n * n; },                 cor: 5 },
    { id: 'cn3',    rot: 'n³',       f: function (n) { return n * n * n; },             cor: 6 },
    { id: 'c2n',    rot: '2ⁿ',       f: function (n) { return Math.pow(2, n); },        cor: 7 },
    { id: 'cfat',   rot: 'n!',       f: function (n) {
        var r = 1; for (var i = 2; i <= n; i++) { r *= i; if (!isFinite(r)) return Infinity; }
        return r; }, cor: 8 }
  ];

  function lab3() {
    var nMax = +AG.$('#crN').value;
    var ativos = CURVAS.filter(function (c) {
      var el = AG.$('#' + c.id);
      return el && el.checked;
    });

    AG.$('#crNlab').textContent = nMax;

    /* --- gráfico em escala log no eixo y --- */
    var W = 720, H = 360, padL = 48, padB = 34, padT = 14, padR = 14;
    var yMax = 1;
    ativos.forEach(function (c) {
      for (var n = 1; n <= nMax; n++) {
        var v = c.f(n);
        if (isFinite(v) && v > yMax) yMax = v;
      }
    });
    var logMax = Math.log10(Math.max(yMax, 10));

    function X(n) { return padL + (n - 1) / Math.max(1, nMax - 1) * (W - padL - padR); }
    function Y(v) {
      if (!isFinite(v) || v <= 0) return padT;
      var l = Math.log10(Math.max(v, 1));
      return H - padB - (l / logMax) * (H - padB - padT);
    }

    var g = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="plot" role="img" '
      + 'aria-label="Comparação de taxas de crescimento em escala logarítmica.">';

    /* grade horizontal por década */
    for (var d = 0; d <= Math.ceil(logMax); d++) {
      var yy = Y(Math.pow(10, d));
      if (yy < padT) continue;
      g += '<line x1="' + padL + '" y1="' + yy.toFixed(1) + '" x2="' + (W - padR)
         + '" y2="' + yy.toFixed(1) + '" class="grid"/>'
         + '<text x="' + (padL - 6) + '" y="' + (yy + 4).toFixed(1)
         + '" class="tick" text-anchor="end">10' + sup(d) + '</text>';
    }
    /* eixo x */
    g += '<line x1="' + padL + '" y1="' + (H - padB) + '" x2="' + (W - padR)
       + '" y2="' + (H - padB) + '" class="axis"/>';
    [1, Math.round(nMax / 4), Math.round(nMax / 2), Math.round(3 * nMax / 4), nMax]
      .forEach(function (n) {
        g += '<text x="' + X(n).toFixed(1) + '" y="' + (H - padB + 16)
           + '" class="tick" text-anchor="middle">' + n + '</text>';
      });
    g += '<text x="' + (W / 2) + '" y="' + (H - 2) + '" class="axlab" text-anchor="middle">n</text>';

    /* curvas */
    ativos.forEach(function (c) {
      var pts = [];
      for (var n = 1; n <= nMax; n++) {
        var v = c.f(n);
        if (!isFinite(v)) break;
        pts.push(X(n).toFixed(1) + ',' + Y(v).toFixed(1));
      }
      if (pts.length < 2) return;
      g += '<polyline points="' + pts.join(' ') + '" class="curva k' + c.cor + '"/>';
      var last = pts[pts.length - 1].split(',');
      g += '<text x="' + (+last[0] + 5) + '" y="' + (+last[1] + 4)
         + '" class="curvarot k' + c.cor + '">' + c.rot + '</text>';
    });
    g += '</svg>';
    AG.$('#crPlot').innerHTML = g;

    /* --- tabela de valores --- */
    var cols = [5, 10, 20, 50, 100].filter(function (n) { return n <= Math.max(nMax, 5); });
    if (cols.indexOf(nMax) < 0) cols.push(nMax);
    AG.$('#crTab').innerHTML = '<div class="tw"><table><thead><tr><th>f(n)</th>'
      + cols.map(function (n) { return '<th class="num">n = ' + n + '</th>'; }).join('')
      + '</tr></thead><tbody>'
      + ativos.map(function (c) {
          return '<tr><td>' + m(c.rot) + '</td>'
            + cols.map(function (n) {
                var v = c.f(n);
                return '<td class="num">' + (
                  !isFinite(v) ? '—'
                  : v >= 1e9 ? v.toExponential(2).replace('e+', '·10')
                  : Math.round(v).toLocaleString('pt-BR')) + '</td>';
              }).join('')
            + '</tr>';
        }).join('')
      + '</tbody><caption>Eixo vertical em escala logarítmica — sem isso, tudo além de '
      + mt('n^2') + ' sairia do gráfico. Um traço reto na escala log é crescimento '
      + 'exponencial.</caption></table></div>';
  }

  function sup(d) {
    var mapa = ['⁰','¹','²','³','⁴','⁵','⁶','⁷','⁸','⁹'];
    return String(d).split('').map(function (c) { return mapa[+c] || c; }).join('');
  }

  /* ═════════════════════════════════════════════ 4. Trace passo a passo ══ */

  var ALGOS = {

    buscabin: {
      nome: 'Busca binária',
      rec: 'T(n) = T(n/2) + Θ(1) ⇒ Θ(log n)',
      nota: 'Cada passo descarta metade do intervalo. O contador mostra quantas comparações '
          + 'foram feitas — compare com ' + mt('lg n') + '.',
      entrada: '2, 5, 8, 12, 16, 23, 38, 56, 72, 91',
      param: { rot: 'Valor procurado (K)', val: '23' },
      run: function (A, K) {
        var fr = [], a = 0, b = A.length - 1, ops = 0;
        A = A.slice().sort(function (x, y) { return x - y; });
        fr.push({ A: A, marca: {}, faixa: [a, b], ops: ops,
                  txt: 'Vetor ordenado. Intervalo ativo: todo o vetor.' });
        while (a <= b) {
          var i = Math.floor((a + b) / 2);
          ops++;
          var mk = {}; mk[i] = 'piv';
          if (A[i] === +K) {
            fr.push({ A: A, marca: mk, faixa: [a, b], ops: ops,
                      txt: 'X[' + (i + 1) + '] = ' + A[i] + ' = K. <strong>Encontrado</strong> '
                         + 'na posição ' + (i + 1) + ', após ' + ops + ' comparações.' });
            return fr;
          }
          if (A[i] < +K) {
            fr.push({ A: A, marca: mk, faixa: [a, b], ops: ops,
                      txt: 'X[' + (i + 1) + '] = ' + A[i] + ' &lt; ' + K
                         + ' — descarta a metade esquerda, incluindo o meio.' });
            a = i + 1;
          } else {
            fr.push({ A: A, marca: mk, faixa: [a, b], ops: ops,
                      txt: 'X[' + (i + 1) + '] = ' + A[i] + ' &gt; ' + K
                         + ' — descarta a metade direita, incluindo o meio.' });
            b = i - 1;
          }
        }
        fr.push({ A: A, marca: {}, faixa: [a, b], ops: ops,
                  txt: 'Intervalo vazio (a &gt; b). K não está no vetor. '
                     + ops + ' comparações — note que ' + ops + ' ≈ lg ' + A.length + '.' });
        return fr;
      }
    },

    particiona: {
      nome: 'particiona (Hoare)',
      rec: 'Θ(n) — os índices varrem o intervalo uma única vez',
      nota: 'O pseudocódigo exato do slide 03. Observe que <code>l</code> só cresce e '
          + '<code>r</code> só decresce: é daí que sai o custo linear.',
      entrada: '38, 12, 91, 5, 56, 23, 72, 8, 16, 2',
      param: null,
      run: function (A) {
        var fr = [], ops = 0;
        A = A.slice();
        var a = 0, b = A.length - 1;
        var v = A[a], l = a, r = b;
        fr.push({ A: A.slice(), marca: mk({ 0: 'piv' }), ops: ops,
                  txt: 'Pivô v = X[1] = ' + v + '. Índices l = 1 e r = ' + (b + 1) + '.' });
        while (l < r) {
          while (A[l] <= v && l <= b) { l++; ops++; }
          while (A[r] > v && r >= a) { r--; ops++; }
          var marca = { 0: 'piv' }; marca[l] = 'l'; marca[r] = 'r';
          if (l < r) {
            fr.push({ A: A.slice(), marca: mk(marca), ops: ops,
                      txt: 'l parou em ' + (l + 1) + ' (X[l] = ' + A[l] + ' &gt; v) e '
                         + 'r parou em ' + (r + 1) + ' (X[r] = ' + A[r] + ' ≤ v). '
                         + 'Troca os dois.' });
            var t = A[l]; A[l] = A[r]; A[r] = t;
            fr.push({ A: A.slice(), marca: mk(marca), ops: ops, txt: 'Trocados.' });
          } else {
            fr.push({ A: A.slice(), marca: mk(marca), ops: ops,
                      txt: 'l e r se cruzaram (l = ' + (l + 1) + ', r = ' + (r + 1)
                         + '). Fim do laço externo.' });
          }
        }
        var t2 = A[a]; A[a] = A[r]; A[r] = t2;
        var fin = {}; fin[r] = 'fix';
        fr.push({ A: A.slice(), marca: mk(fin), ops: ops,
                  txt: 'Troca o pivô com X[r]: o pivô ' + v + ' está agora na posição '
                     + (r + 1) + ', sua <strong>posição final ordenada</strong>. '
                     + 'Tudo à esquerda é ≤ v, tudo à direita é &gt; v. '
                     + ops + ' comparações, para n = ' + A.length + '.' });
        return fr;
      }
    },

    intercala: {
      nome: 'Intercala (do Merge Sort)',
      rec: 'Θ(n) — uma passada pelos n elementos',
      nota: 'As duas metades entram já ordenadas. O laço escolhe sempre o menor entre as '
          + 'frentes de L e R.',
      entrada: '5, 12, 38, 56, 91, 2, 8, 16, 23, 72',
      param: { rot: 'Onde termina a metade L (índice)', val: '5' },
      run: function (A, q) {
        var fr = [], ops = 0;
        A = A.slice();
        var meio = Math.max(1, Math.min(A.length - 1, parseInt(q, 10) || Math.floor(A.length / 2)));
        var L = A.slice(0, meio), R = A.slice(meio);
        fr.push({ A: A.slice(), marca: mkRange(0, meio - 1, 'l', meio, A.length - 1, 'r'), ops: 0,
                  txt: 'L = [' + L.join(', ') + '] &nbsp;·&nbsp; R = [' + R.join(', ') + ']. '
                     + 'Ambas devem estar ordenadas.' });
        var out = [], i = 0, j = 0;
        while (i < L.length && j < R.length) {
          ops++;
          if (L[i] <= R[j]) { out.push(L[i]); i++; }
          else { out.push(R[j]); j++; }
          fr.push({ A: out.concat(L.slice(i), R.slice(j)),
                    marca: mkRange(0, out.length - 1, 'fix'), ops: ops,
                    txt: 'Compara L[' + (i + (L[i - 1] !== undefined ? 0 : 0)) + '] com R: '
                       + 'escolhe <strong>' + out[out.length - 1] + '</strong>. '
                       + 'Saída parcial: [' + out.join(', ') + ']' });
        }
        while (i < L.length) { out.push(L[i]); i++; }
        while (j < R.length) { out.push(R[j]); j++; }
        fr.push({ A: out, marca: mkRange(0, out.length - 1, 'fix'), ops: ops,
                  txt: 'Anexa o resto. Vetor intercalado: [' + out.join(', ') + ']. '
                     + ops + ' comparações para n = ' + A.length
                     + ' — no máximo n−1, logo Θ(n).' });
        return fr;
      }
    },

    potencia: {
      nome: 'Potência rápida (xⁿ)',
      rec: 'T(n) = T(n/2) + Θ(1) ⇒ Θ(log n)',
      nota: 'Compare o número de multiplicações com n: é a diferença entre Θ(n) e Θ(log n).',
      entrada: '',
      param: { rot: 'Base x e expoente n (ex.: 3, 13)', val: '3, 13' },
      run: function (_, p) {
        var partes = String(p).split(/[,;\s]+/).filter(Boolean).map(Number);
        var x = partes[0] || 2, n = partes[1] || 10;
        var fr = [], ops = 0;

        function rec(e, prof) {
          if (e === 0) {
            fr.push({ pilha: true, prof: prof, ops: ops,
                      txt: 'H(' + x + ', 0) = 1 &nbsp; <em>(caso base)</em>' });
            return 1;
          }
          fr.push({ pilha: true, prof: prof, ops: ops,
                    txt: 'H(' + x + ', ' + e + ') → chama H(' + x + ', ' + Math.floor(e / 2) + ')' });
          var y = rec(Math.floor(e / 2), prof + 1);
          var r;
          if (e % 2 === 0) { r = y * y; ops++; }
          else { r = x * y * y; ops += 2; }
          fr.push({ pilha: true, prof: prof, ops: ops,
                    txt: 'H(' + x + ', ' + e + '): y = ' + y + ', e ' + e + ' é '
                       + (e % 2 === 0 ? 'par → y·y = ' : 'ímpar → x·y·y = ') + r });
          return r;
        }
        var res = rec(n, 0);
        fr.push({ pilha: true, prof: 0, ops: ops,
                  txt: '<strong>' + x + '^' + n + ' = ' + res + '</strong>, com apenas '
                     + ops + ' multiplicações. O método ingênuo faria ' + (n - 1)
                     + '. Profundidade da recursão: ' + (Math.floor(Math.log2(n)) + 1)
                     + ' ≈ lg ' + n + '.' });
        return fr;
      }
    },

    hanoi: {
      nome: 'Torres de Hanói',
      rec: 'T(n) = 2T(n−1) + 1 ⇒ Θ(2ⁿ)',
      nota: 'O contador de movimentos cresce como 2ⁿ − 1. Aumente n de 1 em 1 e veja o '
          + 'total dobrar — é a cara de uma recorrência subtrativa com a = 2.',
      entrada: '',
      param: { rot: 'Número de discos (n)', val: '4' },
      run: function (_, p) {
        var n = Math.max(1, Math.min(8, parseInt(p, 10) || 4));
        var fr = [], mv = 0;
        var torres = { A: [], B: [], C: [] };
        for (var i = n; i >= 1; i--) torres.A.push(i);
        fr.push({ hanoi: JSON.parse(JSON.stringify(torres)), ops: 0,
                  txt: n + ' discos empilhados em A, em ordem decrescente. '
                     + 'Objetivo: mover todos para C.' });

        function mover(k, de, para, aux) {
          if (k === 1) {
            var d = torres[de].pop();
            torres[para].push(d);
            mv++;
            fr.push({ hanoi: JSON.parse(JSON.stringify(torres)), ops: mv,
                      txt: 'Movimento ' + mv + ': disco ' + d + ' de ' + de + ' → ' + para });
            return;
          }
          mover(k - 1, de, aux, para);
          var d2 = torres[de].pop();
          torres[para].push(d2);
          mv++;
          fr.push({ hanoi: JSON.parse(JSON.stringify(torres)), ops: mv,
                    txt: 'Movimento ' + mv + ': disco ' + d2 + ' (o maior de ' + de + ') de '
                       + de + ' → ' + para });
          mover(k - 1, aux, para, de);
        }
        mover(n, 'A', 'C', 'B');
        fr.push({ hanoi: JSON.parse(JSON.stringify(torres)), ops: mv,
                  txt: '<strong>Concluído em ' + mv + ' movimentos</strong> — e '
                     + '2^' + n + ' − 1 = ' + (Math.pow(2, n) - 1) + '. '
                     + 'Este é o mínimo possível.' });
        return fr;
      }
    },

    kesimo: {
      nome: 'k-ésimo menor elemento',
      rec: 'Pior caso Θ(n²) · caso médio Θ(n)',
      nota: 'Só <strong>uma</strong> das partições é explorada — é o que diferencia seleção de '
          + 'ordenação. Observe o intervalo ativo encolhendo.',
      entrada: '38, 12, 91, 5, 56, 23, 72, 8, 16, 2',
      param: { rot: 'Posição procurada (k)', val: '4' },
      run: function (A, kp) {
        var fr = [], ops = 0;
        A = A.slice();
        var k = Math.max(1, Math.min(A.length, parseInt(kp, 10) || 1));
        var a = 0, b = A.length - 1, kAtual = k;

        fr.push({ A: A.slice(), marca: {}, faixa: [a, b], ops: 0,
                  txt: 'Procurando o ' + k + 'º menor elemento em todo o vetor.' });

        while (a < b) {
          /* particiona(A, a, b) */
          var v = A[a], l = a, r = b;
          while (l < r) {
            while (A[l] <= v && l <= b) { l++; ops++; }
            while (A[r] > v && r >= a) { r--; ops++; }
            if (l < r) { var t = A[l]; A[l] = A[r]; A[r] = t; }
          }
          var t2 = A[a]; A[a] = A[r]; A[r] = t2;
          var p = r;
          var tam = p - a + 1;
          var mkk = {}; mkk[p] = 'fix';

          if (kAtual === tam) {
            fr.push({ A: A.slice(), marca: mk(mkk), faixa: [a, b], ops: ops,
                      txt: 'Pivô ' + A[p] + ' foi para a posição ' + (p + 1)
                         + '. A partição esquerda + pivô tem ' + tam + ' elementos, e k = '
                         + kAtual + '. <strong>O pivô é a resposta: ' + A[p] + '</strong>.' });
            return fr;
          }
          if (kAtual > tam) {
            fr.push({ A: A.slice(), marca: mk(mkk), faixa: [a, b], ops: ops,
                      txt: 'Pivô ' + A[p] + ' na posição ' + (p + 1) + '; partição esquerda + '
                         + 'pivô tem ' + tam + ' elementos. Como k = ' + kAtual + ' &gt; ' + tam
                         + ', a resposta está à <strong>direita</strong>. '
                         + 'Descarta ' + tam + ' elementos e ajusta k para '
                         + (kAtual - tam) + '.' });
            a = p + 1;
            kAtual = kAtual - tam;
          } else {
            fr.push({ A: A.slice(), marca: mk(mkk), faixa: [a, b], ops: ops,
                      txt: 'Pivô ' + A[p] + ' na posição ' + (p + 1) + '; partição esquerda + '
                         + 'pivô tem ' + tam + ' elementos. Como k = ' + kAtual + ' ≤ ' + tam
                         + ', a resposta está à <strong>esquerda</strong>. '
                         + 'k não muda.' });
            b = p - 1;
          }
        }
        var res = {}; res[a] = 'fix';
        fr.push({ A: A.slice(), marca: mk(res), faixa: [a, b], ops: ops,
                  txt: 'Intervalo com um só elemento: o ' + k + 'º menor é '
                     + '<strong>' + A[a] + '</strong>. Total de ' + ops
                     + ' comparações (n = ' + A.length + ').' });
        return fr;
      }
    }
  };

  function mk(o) { return o; }
  function mkRange(a1, b1, c1, a2, b2, c2) {
    var o = {};
    for (var i = a1; i <= b1; i++) o[i] = c1;
    if (c2 !== undefined) for (var j = a2; j <= b2; j++) o[j] = c2;
    return o;
  }

  var trace = { frames: [], idx: 0, algo: 'buscabin' };

  function lab4Config() {
    var A = ALGOS[trace.algo];
    AG.$('#trInfo').innerHTML =
      '<div class="row tight"><span class="pill accent">' + AG.esc(A.nome) + '</span>'
      + '<span class="pill plain">' + mt(A.rec) + '</span></div>'
      + '<p class="small muted" style="margin-top:var(--s-2);max-width:var(--measure)">'
      + A.nota + '</p>';

    AG.$('#trVetorWrap').style.display = A.entrada === '' ? 'none' : '';
    AG.$('#trVetor').value = A.entrada;

    var pw = AG.$('#trParamWrap');
    if (A.param) {
      pw.style.display = '';
      AG.$('#trParamRot').textContent = A.param.rot;
      AG.$('#trParam').value = A.param.val;
    } else {
      pw.style.display = 'none';
    }
  }

  function lab4Rodar() {
    var A = ALGOS[trace.algo];
    var vet = AG.$('#trVetor').value.split(/[,;\s]+/).filter(Boolean).map(Number)
                .filter(function (x) { return !isNaN(x); });
    var par = A.param ? AG.$('#trParam').value : null;

    if (A.entrada !== '' && vet.length < 2) {
      AG.toast('Informe ao menos dois números no vetor.', 'bad');
      return;
    }
    try {
      trace.frames = A.run(vet, par);
    } catch (e) {
      AG.toast('Não foi possível executar com essa entrada.', 'bad');
      console.error(e);
      return;
    }
    trace.idx = 0;
    lab4Render();
  }

  function lab4Render() {
    var f = trace.frames[trace.idx];
    if (!f) { AG.$('#trPalco').innerHTML = ''; return; }
    var total = trace.frames.length;

    var vis = '';
    if (f.A) {
      vis = '<div class="cells">' + f.A.map(function (v, i) {
        var cls = f.marca && f.marca[i] ? ' ' + f.marca[i] : '';
        var fora = f.faixa && (i < f.faixa[0] || i > f.faixa[1]) ? ' fora' : '';
        return '<div class="cell' + cls + fora + '">'
          + '<span class="val">' + v + '</span>'
          + '<span class="ix">' + (i + 1) + '</span></div>';
      }).join('') + '</div>';
    } else if (f.hanoi) {
      vis = '<div class="hanoi">' + ['A', 'B', 'C'].map(function (t) {
        var pilha = f.hanoi[t];
        return '<div class="torre"><div class="discos">'
          + pilha.slice().reverse().map(function (d) {
              return '<span class="disco" style="width:' + (22 + d * 16) + 'px">' + d + '</span>';
            }).join('')
          + '</div><span class="base"></span><span class="rotulo">' + t + '</span></div>';
      }).join('') + '</div>';
    } else if (f.pilha) {
      vis = '<div class="pilha" style="padding-left:' + (f.prof * 1.6) + 'rem">'
          + '<span class="prof">nível ' + f.prof + '</span></div>';
    }

    AG.$('#trPalco').innerHTML =
      '<div class="row tight" style="justify-content:space-between;margin-bottom:var(--s-3)">'
      +   '<span class="xs muted mono">passo ' + (trace.idx + 1) + ' de ' + total + '</span>'
      +   '<span class="pill ' + (f.ops > 0 ? 'warn' : 'plain') + '">'
      +     f.ops + ' operaç' + (f.ops === 1 ? 'ão' : 'ões') + '</span>'
      + '</div>'
      + vis
      + '<p class="passotxt">' + f.txt + '</p>'
      + '<div class="bar" style="margin-top:var(--s-3)"><i style="width:'
      +   ((trace.idx + 1) / total * 100) + '%"></i></div>';

    AG.$('#trAnt').disabled = trace.idx === 0;
    AG.$('#trProx').disabled = trace.idx >= total - 1;
  }

  /* ═══════════════════════════════════════════════════════════ Início ═══ */

  document.addEventListener('DOMContentLoaded', function () {

    /* --- Lab 1 e 2 --- */
    AG.$('#arvF').innerHTML = FS.map(function (f) {
      return '<option value="' + f.v + '"' + (f.v === 'n' ? ' selected' : '') + '>'
        + f.rot + '</option>';
    }).join('');
    ['#arvA', '#arvB', '#arvF', '#arvN'].forEach(function (s) {
      AG.$(s).addEventListener('input', lab1);
      AG.$(s).addEventListener('change', lab1);
    });
    AG.$$('#presets [data-pre]').forEach(function (b) {
      b.addEventListener('click', function () {
        var p = b.dataset.pre.split('|');
        AG.$('#arvA').value = p[0];
        AG.$('#arvB').value = p[1];
        AG.$('#arvF').value = p[2];
        lab1();
        AG.$('#lab-arvore').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    lab1();

    /* --- Lab 3 --- */
    AG.$('#crCurvas').innerHTML = CURVAS.map(function (c) {
      var lig = ['c1', 'clogn', 'cn', 'cnlogn', 'cn2', 'c2n'].indexOf(c.id) >= 0;
      return '<label class="chk-cur k' + c.cor + '">'
        + '<input type="checkbox" id="' + c.id + '"' + (lig ? ' checked' : '') + '>'
        + '<span class="sw"></span><span>' + c.rot + '</span></label>';
    }).join('');
    AG.$$('#crCurvas input').forEach(function (i) { i.addEventListener('change', lab3); });
    AG.$('#crN').addEventListener('input', lab3);
    lab3();

    /* --- Lab 4 --- */
    AG.$('#trAlgo').innerHTML = Object.keys(ALGOS).map(function (k) {
      return '<option value="' + k + '">' + AG.esc(ALGOS[k].nome) + '</option>';
    }).join('');
    AG.$('#trAlgo').addEventListener('change', function () {
      trace.algo = this.value;
      lab4Config();
      lab4Rodar();
    });
    AG.$('#trRodar').addEventListener('click', lab4Rodar);
    AG.$('#trAnt').addEventListener('click', function () {
      if (trace.idx > 0) { trace.idx--; lab4Render(); }
    });
    AG.$('#trProx').addEventListener('click', function () {
      if (trace.idx < trace.frames.length - 1) { trace.idx++; lab4Render(); }
    });
    document.addEventListener('keydown', function (e) {
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      if (e.key === 'ArrowLeft' && trace.idx > 0) { trace.idx--; lab4Render(); }
      if (e.key === 'ArrowRight' && trace.idx < trace.frames.length - 1) { trace.idx++; lab4Render(); }
    });
    lab4Config();
    lab4Rodar();
  });
})();
