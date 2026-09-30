/* ==========================================================================
   app.js — shell, persistência e utilitários compartilhados.
   Namespace global: AG
   ========================================================================== */

window.AG = (function () {
  'use strict';

  var KEY = 'ic004_p1_v1';

  /* ------------------------------------------------------------ Persistência */

  var EMPTY = {
    v: 1,
    cards:  {},   // id -> { box, due, seen, wrong, last }
    ex:     {},   // id -> { status, draft, revealed, ts }
    sim:    {},   // id -> { started, finished, answers, scores, durationMin }
    teoria: {},   // id -> { done }
    prefs:  { theme: null, simMin: 100 }
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  var state = null;

  function load() {
    if (state) return state;
    try {
      var raw = localStorage.getItem(KEY);
      state = raw ? JSON.parse(raw) : clone(EMPTY);
    } catch (e) {
      state = clone(EMPTY);
    }
    // Completa chaves ausentes sem descartar o que já existe.
    Object.keys(EMPTY).forEach(function (k) {
      if (state[k] === undefined) state[k] = clone(EMPTY[k]);
    });
    Object.keys(EMPTY.prefs).forEach(function (k) {
      if (state.prefs[k] === undefined) state.prefs[k] = EMPTY.prefs[k];
    });
    return state;
  }

  var saveTimer = null;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      try { localStorage.setItem(KEY, JSON.stringify(load())); }
      catch (e) { console.warn('Não foi possível gravar o progresso:', e); }
    }, 120);
  }
  function saveNow() {
    clearTimeout(saveTimer);
    try { localStorage.setItem(KEY, JSON.stringify(load())); }
    catch (e) { console.warn('Não foi possível gravar o progresso:', e); }
  }

  /* Acesso por seção, criando o registro na primeira escrita. */
  function rec(section, id, defaults) {
    var s = load();
    if (!s[section][id]) s[section][id] = clone(defaults || {});
    return s[section][id];
  }

  /* ------------------------------------------------------------------ Datas */

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function addDays(iso, n) {
    var p = iso.split('-');
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    d.setDate(d.getDate() + n);
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }
  function isDue(iso) { return !iso || iso <= today(); }

  /* -------------------------------------------------------------- Utilidades */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function el(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function shuffle(a) {
    var r = a.slice();
    for (var i = r.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = r[i]; r[i] = r[j]; r[j] = t;
    }
    return r;
  }

  function pct(a, b) { return b > 0 ? Math.round((a / b) * 100) : 0; }

  /* Marcadores de dificuldade: quadrados cheios/vazios (1 a 3). */
  function diff(n) {
    var h = '<span class="diff d' + n + '" title="Dificuldade ' + n + ' de 3" aria-label="Dificuldade ' + n + ' de 3">';
    for (var i = 1; i <= 3; i++) h += '<i' + (i <= n ? ' class="on"' : '') + '></i>';
    return h + '</span>';
  }

  /* ------------------------------------------------ Matemática: mini-DSL */
  /* Converte uma notação compacta em HTML, para que os arquivos de dados não
     precisem carregar <sup>/<sub> à mão. Comandos:
       \f{num}{den}      fração            \S{i=1}{n}   somatório com limites
       \r{x}             radical           \t{texto}    texto em romano
       \c{valor}{cond}…  chave de casos    \M{a}{b}{c}{d} matriz 2x2
       \h{x}             destaque
       \u{expr}{rótulo}  anotação sob o trecho (como \underbrace)
       \p{expr}          parênteses que acompanham a altura do conteúdo
       ^x  ^{xyz}        expoente          _x  _{xyz}   índice
     Variáveis ficam em itálico; dígitos, operadores e nomes de função
     (log, lg, max, …) são postos em romano automaticamente.                */

  /* Um único regex, aplicado em passe único: nada que seja emitido volta a ser
     lido. ∑ e ∏ ficam fora porque só nascem de \S e \P, que já os marcam.   */
  var MATHTOK = new RegExp(
      '\\b(?:log|lg|ln|max|min|lim|mod|div|sup|inf|mdc|mmc|sen|cos|tg|det)\\b'
    + '|\\bO(?=\\s*\\()'
    + '|[ΘΩΣΠ∈∉≤≥≠≈≡'
    +   '⌊⌋⌈⌉∞→⇒∀∃·×'
    +   '±÷√∧∨¬∅∩∪⊆⊂'
    +   '−+=]'
    + '|-'
    + '|[0-9]+(?:[.,][0-9]+)?', 'g');

  function grp(s, i) {                 /* s[i] === '{' → corpo balanceado */
    var d = 0, st = i + 1;
    for (var j = i; j < s.length; j++) {
      if (s[j] === '{') d++;
      else if (s[j] === '}') { d--; if (d === 0) return { body: s.slice(st, j), next: j + 1 }; }
    }
    return { body: s.slice(st), next: s.length };
  }

  function cmd(name, a) {
    switch (name) {
      /* A barra da fração é um border-bottom, então um "/" invisível é inserido
         para que copiar-e-colar e leitores de tela produzam "n/2", não "n2". */
      case 'f':
        return '<span class="frac"><span>' + raw(a[0] || '') + '</span>'
             + '<span class="sr">/</span>'
             + '<span>' + raw(a[1] || '') + '</span></span>';
      case 'S':
      case 'P':
        return '<span class="sum"><span class="lim">' + raw(a[1] || '') + '</span>'
             + '<span class="op">' + (name === 'S' ? '∑' : '∏') + '</span>'
             + '<span class="lim">' + raw(a[0] || '') + '</span></span>';
      /* O √ é caractere real, não content: de CSS — sem ele, "T(√n)" seria
         copiado como "T(n)", o que muda a fórmula. */
      case 'r':
        return '<span class="rad"><i>√</i><span>' + raw(a[0] || '') + '</span></span>';
      case 't':
        return '<span class="op">' + (a[0] || '') + '</span>';
      case 'h':
        return '<span class="hl">' + raw(a[0] || '') + '</span>';
      case 'u':   /* \u{expressão}{rótulo} — anota um trecho, como \underbrace */
        return '<span class="ubr"><span class="e">' + raw(a[0] || '') + '</span>'
             + '<span class="b">' + (a[1] || '') + '</span></span>';
      /* \p{conteúdo} — parênteses que acompanham a altura do conteúdo.
         Os parênteses são caracteres REAIS, não content: de CSS: assim eles
         sobrevivem a copiar-e-colar e são lidos por leitores de tela.        */
      case 'p':
        return '<span class="pren"><i>(</i>' + raw(a[0] || '') + '<i>)</i></span>';
      case 'quad':                       /* espaçamentos, como no TeX */
        return '<span class="quad"></span>';
      case 'qquad':
        return '<span class="quad qq"></span>';
      case 'M':
        return '<span class="mat" style="grid-template-columns:auto auto">'
             + '<span>' + raw(a[0] || '') + '</span><span>' + raw(a[1] || '') + '</span>'
             + '<span>' + raw(a[2] || '') + '</span><span>' + raw(a[3] || '') + '</span></span>';
      case 'c': {
        var h = '<span class="cases">';
        for (var i = 0; i < a.length; i += 2) {
          h += '<span>' + raw(a[i] || '') + '</span>'
             + '<span class="cond">' + (a[i + 1] || '') + '</span>';
        }
        return h + '</span>';
      }
      default:
        return name;
    }
  }

  function raw(s) {                    /* parse sem aplicar romano (feito no fim) */
    var out = '';
    for (var i = 0; i < s.length; ) {
      var c = s.charAt(i);
      if (c === '\\') {
        var m = /^\\([a-zA-Z]+)/.exec(s.slice(i));
        if (m) {
          var k = i + m[0].length, args = [];
          while (s.charAt(k) === '{') { var g = grp(s, k); args.push(g.body); k = g.next; }
          out += cmd(m[1], args);
          i = k;
          continue;
        }
      }
      if (c === '^' || c === '_') {
        var tag = c === '^' ? 'sup' : 'sub', body, nx;
        if (s.charAt(i + 1) === '{') { var g2 = grp(s, i + 1); body = g2.body; nx = g2.next; }
        else { body = s.charAt(i + 1) || ''; nx = i + 2; }
        out += '<' + tag + '>' + raw(body) + '</' + tag + '>';
        i = nx;
        continue;
      }
      out += c;
      i++;
    }
    return out;
  }

  function upright(s) {
    /* Aplica romano só ao texto, jamais dentro de uma tag. */
    return s.replace(/<[^>]*>|[^<]+/g, function (chunk) {
      if (chunk.charAt(0) === '<') return chunk;
      return chunk.replace(MATHTOK, function (tok) {
        return '<span class="op">' + (tok === '-' ? '−' : tok) + '</span>';
      });
    });
  }

  function mt(src) {
    var s = String(src == null ? '' : src)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return upright(raw(s));
  }

  function m(src)  { return '<span class="m">' + mt(src) + '</span>'; }
  function eqn(src, cls) {
    return '<div class="eq' + (cls ? ' ' + cls : '') + '">' + mt(src) + '</div>';
  }

  /* Conteúdo em HTML com matemática embutida: $inline$ e $$destacada$$. */
  function tex(s) {
    return String(s == null ? '' : s)
      .replace(/\$\$([\s\S]+?)\$\$/g, function (_, e) { return eqn(e); })
      .replace(/\$([^$\n]+?)\$/g, function (_, e) { return m(e); });
  }

  /* Bloco de pseudocódigo numerado, no formato dos slides.
     { title, io: [...], lines: [...] } — as linhas aceitam .kw, .cm, .fnn.   */
  function pseudo(o) {
    var h = '<pre class="pseudo">';
    if (o.title) h += '<span class="hd">' + esc(o.title) + '</span>';
    (o.io || []).forEach(function (x) { h += '<span class="io">' + tex(x) + '</span>'; });
    (o.lines || []).forEach(function (l) { h += '<span class="ln">' + l + '</span>'; });
    return h + '</pre>';
  }

  /* ------------------------------------------------------------------- Tema */

  function applyTheme() {
    var t = load().prefs.theme;
    if (t) document.documentElement.setAttribute('data-theme', t);
    else document.documentElement.removeAttribute('data-theme');
    var b = $('#themeBtn');
    if (b) b.textContent = t === 'dark' ? 'Tema claro' : t === 'light' ? 'Tema escuro' : 'Alternar tema';
  }

  function toggleTheme() {
    var s = load();
    var cur = s.prefs.theme;
    if (!cur) {
      var darkOS = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      cur = darkOS ? 'dark' : 'light';
    }
    s.prefs.theme = cur === 'dark' ? 'light' : 'dark';
    saveNow();
    applyTheme();
  }

  /* ------------------------------------------------------- Exportar/Importar */

  function exportJSON() {
    var blob = new Blob([JSON.stringify(load(), null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'ic004-progresso-' + today() + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    toast('Progresso exportado.');
  }

  function importJSON(file) {
    var r = new FileReader();
    r.onload = function () {
      try {
        var incoming = JSON.parse(r.result);
        if (!incoming || typeof incoming !== 'object') throw new Error('formato');
        state = incoming;
        load();            // normaliza chaves ausentes
        saveNow();
        toast('Progresso importado. Recarregando…');
        setTimeout(function () { location.reload(); }, 700);
      } catch (e) {
        toast('Arquivo inválido — esperava o JSON exportado por esta plataforma.', 'bad');
      }
    };
    r.readAsText(file);
  }

  function resetAll() {
    if (!confirm('Isso apaga todo o seu progresso salvo neste navegador (flashcards, exercícios e simulados). Exporte antes se quiser guardar. Continuar?')) return;
    state = clone(EMPTY);
    saveNow();
    location.reload();
  }

  /* ------------------------------------------------------------------ Toast */

  function toast(msg, kind) {
    var host = $('#toasts');
    if (!host) {
      host = el('<div id="toasts" style="position:fixed;bottom:1rem;right:1rem;z-index:99;display:flex;flex-direction:column;gap:.5rem;align-items:flex-end"></div>');
      document.body.appendChild(host);
    }
    var t = el('<div class="pill ' + (kind || 'accent') + '" style="box-shadow:var(--shadow);padding:.4rem .75rem;font-size:var(--t-sm)">' + esc(msg) + '</div>');
    host.appendChild(t);
    setTimeout(function () { t.remove(); }, 2600);
  }

  /* ------------------------------------------------------------- Navegação */

  var PAGES = [
    { g: 'Planejar',  items: [
      { href: 'index.html',       label: 'Trilha da prova' }
    ] },
    { g: 'Aprender',  items: [
      { href: 'estudar.html',     label: 'Teoria' },
      { href: 'flashcards.html',  label: 'Flashcards' }
    ] },
    { g: 'Treinar',   items: [
      { href: 'lista.html',       label: 'Lista de exercícios' },
      { href: 'simulado.html',    label: 'Simulado' },
      { href: 'labs.html',        label: 'Laboratório' }
    ] },
    { g: 'Consultar', items: [
      { href: 'biblioteca.html',  label: 'Bibliografia' }
    ] }
  ];

  function rail() {
    var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var h = '<a class="brand" href="index.html">'
          + '<span class="code">IC0004</span>'
          + '<span class="name">Algoritmos e Grafos</span>'
          + '<span class="sub">Preparação para a Prova 1</span></a>'
          + '<nav class="nav" aria-label="Seções">';
    PAGES.forEach(function (grp) {
      h += '<span class="grp">' + esc(grp.g) + '</span>';
      grp.items.forEach(function (p) {
        var cur = p.href.toLowerCase() === here ? ' aria-current="page"' : '';
        h += '<a href="' + p.href + '"' + cur + '>' + esc(p.label) + '</a>';
      });
    });
    h += '</nav><div class="foot">'
      + '<div class="row tight">'
      + '<button class="btn sm ghost" id="themeBtn" type="button">Alternar tema</button>'
      + '</div>'
      + '<div class="row tight">'
      + '<button class="btn sm ghost" id="expBtn" type="button" title="Baixar seu progresso como JSON">Exportar</button>'
      + '<button class="btn sm ghost" id="impBtn" type="button" title="Carregar um progresso exportado">Importar</button>'
      + '<input type="file" id="impFile" accept="application/json,.json" class="hidden">'
      + '</div>'
      + '<p class="xs muted" style="max-width:13rem">O progresso fica salvo neste navegador. Use <strong>Exportar</strong> para levá-lo ao celular ou à versão publicada.</p>'
      + '<button class="btn sm ghost" id="resetBtn" type="button" style="color:var(--bad);align-self:flex-start">Zerar progresso</button>'
      + '</div>';
    return h;
  }

  function mount() {
    var r = $('.rail');
    if (r) r.innerHTML = rail();
    applyTheme();

    var tb = $('#themeBtn'); if (tb) tb.addEventListener('click', toggleTheme);
    var eb = $('#expBtn');   if (eb) eb.addEventListener('click', exportJSON);
    var ib = $('#impBtn');   if (ib) ib.addEventListener('click', function () { $('#impFile').click(); });
    var rb = $('#resetBtn'); if (rb) rb.addEventListener('click', resetAll);
    var f  = $('#impFile');
    if (f) f.addEventListener('change', function () { if (f.files[0]) importJSON(f.files[0]); });

    window.addEventListener('beforeunload', saveNow);
  }

  document.addEventListener('DOMContentLoaded', mount);

  /* ------------------------------------------------ Resumos de progresso */

  /* Um cartão conta como dominado a partir da caixa 4. */
  function cardStats() {
    var all = (window.FLASHCARDS || []);
    var s = load(), dom = 0, vistos = 0, due = 0;
    all.forEach(function (c) {
      var r = s.cards[c.id];
      if (!r) { due++; return; }
      vistos++;
      if (r.box >= 4) dom++;
      if (isDue(r.due)) due++;
    });
    return { total: all.length, dominados: dom, vistos: vistos, devidos: due };
  }

  function exStats(filterFn) {
    var all = (window.EXERCICIOS || []).filter(filterFn || function () { return true; });
    var s = load(), ok = 0, partial = 0, bad = 0;
    all.forEach(function (x) {
      var r = s.ex[x.id];
      if (!r || !r.status) return;
      if (r.status === 'ok') ok++;
      else if (r.status === 'partial') partial++;
      else if (r.status === 'bad') bad++;
    });
    return { total: all.length, ok: ok, partial: partial, bad: bad,
             feitos: ok + partial + bad };
  }

  function simStats() {
    var all = (window.SIMULADOS || []);
    var s = load(), done = 0, best = null;
    all.forEach(function (sim) {
      var r = s.sim[sim.id];
      if (r && r.finished) {
        done++;
        var t = totalScore(sim, r);
        if (best === null || t > best) best = t;
      }
    });
    return { total: all.length, feitos: done, melhor: best };
  }

  function totalScore(sim, r) {
    if (!r || !r.scores) return 0;
    var t = 0;
    sim.questoes.forEach(function (q) {
      var v = r.scores[q.id];
      if (typeof v === 'number') t += v;
    });
    return Math.round(t * 10) / 10;
  }

  /* --------------------------------------------------------------- Exporta */

  return {
    KEY: KEY,
    load: load, save: save, saveNow: saveNow, rec: rec,
    today: today, addDays: addDays, isDue: isDue,
    esc: esc, el: el, $: $, $$: $$, shuffle: shuffle, pct: pct, diff: diff,
    mt: mt, m: m, eqn: eqn, tex: tex, pseudo: pseudo,
    toast: toast, exportJSON: exportJSON, resetAll: resetAll,
    cardStats: cardStats, exStats: exStats, simStats: simStats, totalScore: totalScore
  };
})();
