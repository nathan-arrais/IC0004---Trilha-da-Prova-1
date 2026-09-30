/* ==========================================================================
   flashcards.js — sessão de estudo com repetição espaçada (Leitner, 5 caixas).
   Caixa 1 → revisar hoje · 2 → +1 dia · 3 → +3 · 4 → +7 · 5 → +21.
   Acertou sobe uma caixa; errou volta para a 1.
   ========================================================================== */

(function () {
  'use strict';

  var INTERVALO = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 21 };
  var DOMINADO  = 4;   /* a partir da caixa 4 o cartão conta como dominado */

  var fila = [], pos = 0, virado = false, sessao = { acertos: 0, erros: 0 };
  var filtro = { deck: 'todos', modo: 'devidos' };

  /* ---------------------------------------------------------- Persistência */

  function reg(id) {
    return AG.rec('cards', id, { box: 1, due: '', seen: 0, wrong: 0, last: 0 });
  }

  function responder(acertou) {
    var c = fila[pos];
    var r = reg(c.id);
    r.seen++;
    r.last = Date.now();
    if (acertou) {
      r.box = Math.min(5, (r.box || 1) + 1);
      sessao.acertos++;
    } else {
      r.box = 1;
      r.wrong++;
      sessao.erros++;
    }
    r.due = AG.addDays(AG.today(), INTERVALO[r.box]);
    AG.save();
    proximo(acertou);
  }

  /* -------------------------------------------------------------- A fila */

  function montarFila() {
    var todos = window.FLASHCARDS.filter(function (c) {
      return filtro.deck === 'todos' || c.deck === filtro.deck;
    });

    if (filtro.modo === 'devidos') {
      todos = todos.filter(function (c) {
        var r = AG.load().cards[c.id];
        return !r || AG.isDue(r.due);
      });
    } else if (filtro.modo === 'errados') {
      todos = todos.filter(function (c) {
        var r = AG.load().cards[c.id];
        return r && (r.wrong > 0 || r.box < 3);
      });
    }
    /* modo 'todos' não filtra nada */

    fila = AG.shuffle(todos);
    pos = 0;
    virado = false;
    sessao = { acertos: 0, erros: 0 };
    render();
  }

  function proximo(acertou) {
    /* Errou: o cartão volta ao fim da fila para ser revisto nesta sessão. */
    if (!acertou) fila.push(fila[pos]);
    pos++;
    virado = false;
    render();
  }

  /* ------------------------------------------------------------- Render */

  function barraDecks() {
    var st = AG.load();
    return window.DECKS.map(function (d) {
      var cards = window.FLASHCARDS.filter(function (c) { return c.deck === d.id; });
      var dom = 0, dev = 0;
      cards.forEach(function (c) {
        var r = st.cards[c.id];
        if (r && r.box >= DOMINADO) dom++;
        if (!r || AG.isDue(r.due)) dev++;
      });
      var ativo = filtro.deck === d.id;
      return '<button class="deckcard' + (ativo ? ' on' : '') + '" data-deck="' + d.id + '" type="button">'
        + '<span class="row tight" style="justify-content:space-between;width:100%">'
        +   '<span class="pill ' + d.cor + '">' + d.id + '</span>'
        +   (dev ? '<span class="xs" style="color:var(--warn);font-weight:700">' + dev + ' hoje</span>'
                 : '<span class="xs muted">em dia</span>')
        + '</span>'
        + '<span class="nome">' + AG.esc(d.nome) + '</span>'
        + '<span class="xs muted desc">' + AG.esc(d.desc) + '</span>'
        + '<span class="bar"><i class="ok" style="width:' + AG.pct(dom, cards.length) + '%"></i></span>'
        + '<span class="xs muted mono">' + dom + '/' + cards.length + ' dominados</span>'
        + '</button>';
    }).join('');
  }

  function render() {
    AG.$('#decks').innerHTML = barraDecks();
    AG.$$('#decks .deckcard').forEach(function (b) {
      b.addEventListener('click', function () {
        filtro.deck = (filtro.deck === b.dataset.deck) ? 'todos' : b.dataset.deck;
        montarFila();
      });
    });

    var host = AG.$('#sessao');

    /* Fila vazia ou concluída */
    if (pos >= fila.length) {
      var total = sessao.acertos + sessao.erros;
      host.innerHTML = '<div class="card center" style="align-items:center;gap:var(--s-4);padding:var(--s-7)">'
        + (total
            ? '<h2>Sessão concluída</h2>'
              + '<p class="lede" style="text-align:center">' + sessao.acertos + ' acertos e '
              + sessao.erros + ' erros em ' + total + ' respostas.</p>'
              + (sessao.erros
                  ? '<p class="small muted">Os cartões que você errou voltaram para a caixa 1 e '
                    + 'reaparecem amanhã.</p>'
                  : '<p class="small muted">Nenhum erro. Os cartões avançaram de caixa e só '
                    + 'voltam no intervalo seguinte.</p>')
            : '<h2>Nada a revisar agora</h2>'
              + '<p class="lede" style="text-align:center">Nenhum cartão deste filtro está '
              + 'vencido hoje. Troque o modo para <strong>deck inteiro</strong> se quiser '
              + 'treinar assim mesmo.</p>')
        + '<div class="row tight" style="justify-content:center">'
        +   '<button class="btn primary" id="reiniciar" type="button">Nova sessão</button>'
        +   '<a class="btn" href="lista.html">Ir para os exercícios</a>'
        + '</div></div>';
      var rb = AG.$('#reiniciar');
      if (rb) rb.addEventListener('click', montarFila);
      atualizarPlacar();
      return;
    }

    var c = fila[pos];
    var r = AG.load().cards[c.id];
    var box = r ? r.box : 1;
    var deck = window.DECKS.filter(function (d) { return d.id === c.deck; })[0] || {};

    host.innerHTML = '<article class="fcard">'
      + '<header class="row tight" style="justify-content:space-between">'
      +   '<span class="row tight">'
      +     '<span class="pill ' + (deck.cor || 'plain') + '">' + c.deck + '</span>'
      +     (c.tag ? '<span class="pill plain">' + AG.esc(c.tag) + '</span>' : '')
      +   '</span>'
      +   '<span class="boxes" title="Caixa ' + box + ' de 5">'
      +     [1,2,3,4,5].map(function (i) {
              return '<i class="' + (i <= box ? 'on' : '') + '"></i>';
            }).join('')
      +   '</span>'
      + '</header>'
      + '<div class="frente">' + AG.tex(c.f) + '</div>'
      + (virado
          ? '<div class="verso">' + AG.tex(c.v) + '</div>'
            + '<footer class="row tight" style="justify-content:center">'
            +   '<button class="btn bad" id="errei" type="button">Errei &nbsp;<kbd>1</kbd></button>'
            +   '<button class="btn ok" id="acertei" type="button">Acertei &nbsp;<kbd>2</kbd></button>'
            + '</footer>'
          : '<footer class="row" style="justify-content:center">'
            +   '<button class="btn primary" id="virar" type="button">Ver resposta &nbsp;<kbd>espaço</kbd></button>'
            + '</footer>')
      + '</article>';

    var vb = AG.$('#virar');
    if (vb) vb.addEventListener('click', virar);
    var eb = AG.$('#errei');
    if (eb) eb.addEventListener('click', function () { responder(false); });
    var ab = AG.$('#acertei');
    if (ab) ab.addEventListener('click', function () { responder(true); });

    atualizarPlacar();
  }

  function virar() { virado = true; render(); }

  function atualizarPlacar() {
    var restantes = Math.max(0, fila.length - pos);
    AG.$('#placar').innerHTML =
      '<span class="mono">' + restantes + '</span> na fila'
      + ' · <span class="mono" style="color:var(--ok)">' + sessao.acertos + '</span> acertos'
      + ' · <span class="mono" style="color:var(--bad)">' + sessao.erros + '</span> erros';
  }

  /* ------------------------------------------------------------- Teclado */

  document.addEventListener('keydown', function (e) {
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
    if (pos >= fila.length) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!virado) virar();
    } else if (virado && (e.key === '1')) {
      e.preventDefault(); responder(false);
    } else if (virado && (e.key === '2')) {
      e.preventDefault(); responder(true);
    }
  });

  /* --------------------------------------------------------------- Início */

  document.addEventListener('DOMContentLoaded', function () {
    AG.$$('#modos button').forEach(function (b) {
      b.addEventListener('click', function () {
        filtro.modo = b.dataset.modo;
        AG.$$('#modos button').forEach(function (x) { x.classList.remove('primary'); });
        b.classList.add('primary');
        montarFila();
      });
    });

    /* Deck pré-selecionado via ?deck=D2 */
    var q = new URLSearchParams(location.search).get('deck');
    if (q && window.DECKS.some(function (d) { return d.id === q; })) filtro.deck = q;

    montarFila();
  });
})();
