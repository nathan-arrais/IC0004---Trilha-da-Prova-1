/* ==========================================================================
   lista.js — navegador do banco de exercícios.
   Filtros, rascunho persistido, revelação de dica/solução e automarcação.
   ========================================================================== */

(function () {
  'use strict';

  var filtro = { secao: 'todas', tema: 'todos', dif: 'todas', prova: 'todas',
                 status: 'todos', busca: '' };

  var STATUS = {
    ok:      { rot: 'Acertei',  cls: 'ok'   },
    partial: { rot: 'Parcial',  cls: 'warn' },
    bad:     { rot: 'Errei',    cls: 'bad'  }
  };

  /* --------------------------------------------------------------- Filtros */

  function temas() {
    var set = {};
    window.EXERCICIOS.forEach(function (x) {
      (x.g || []).forEach(function (t) { set[t] = (set[t] || 0) + 1; });
    });
    return Object.keys(set).sort(function (a, b) {
      return set[b] - set[a] || a.localeCompare(b, 'pt-BR');
    }).map(function (t) { return { tag: t, n: set[t] }; });
  }

  function passa(x) {
    var st = AG.load().ex[x.id];
    var s = st && st.status;

    if (filtro.secao !== 'todas' && String(x.s) !== filtro.secao) return false;
    if (filtro.tema !== 'todos' && (x.g || []).indexOf(filtro.tema) < 0) return false;
    if (filtro.dif !== 'todas' && String(x.d) !== filtro.dif) return false;
    if (filtro.prova !== 'todas' && x.p !== filtro.prova) return false;

    if (filtro.status === 'pendentes' && s) return false;
    if (filtro.status === 'errei' && s !== 'bad' && s !== 'partial') return false;
    if (filtro.status === 'acertei' && s !== 'ok') return false;

    if (filtro.busca) {
      var q = filtro.busca.toLowerCase();
      var alvo = (x.e + ' ' + (x.g || []).join(' ') + ' ' + (x.ref || '')
                  + ' ' + x.n + (x.sub || '')).toLowerCase();
      if (alvo.indexOf(q) < 0) return false;
    }
    return true;
  }

  /* ---------------------------------------------------------------- Render */

  function rotulo(x) {
    return x.n + (x.sub ? x.sub : '');
  }

  function cartao(x) {
    var st = AG.load().ex[x.id] || {};
    var s = st.status;
    var secao = window.SECOES.filter(function (S) { return S.id === x.s; })[0] || {};

    return '<article class="ex' + (s ? ' feito' : '') + '" id="ex-' + x.id + '" data-id="' + x.id + '">'
      + '<header>'
      +   '<div class="row tight">'
      +     '<span class="num">' + AG.esc(rotulo(x)) + '</span>'
      +     AG.diff(x.d)
      +     (x.p === 'alta' ? '<span class="pill warn" title="Mapeia direto no padrão da prova">prova</span>' : '')
      +     (x.ref ? '<span class="pill plain">' + AG.esc(x.ref) + '</span>' : '')
      +     '<span class="spacer"></span>'
      +     (s ? '<span class="pill ' + STATUS[s].cls + '">' + STATUS[s].rot + '</span>' : '')
      +   '</div>'
      +   '<div class="xs muted">' + AG.esc(secao.nome || '') + ' · '
      +     (x.g || []).map(AG.esc).join(' · ') + '</div>'
      + '</header>'

      + '<div class="enun">' + AG.tex(x.e) + '</div>'

      + '<div class="resp">'
      +   '<label class="fld"><span>Sua resposta (fica salva neste navegador)</span>'
      +   '<textarea rows="4" placeholder="Resolva aqui — ou no papel, e anote só a conclusão."'
      +   ' data-draft="' + x.id + '">' + AG.esc(st.draft || '') + '</textarea></label>'
      + '</div>'

      + (x.h ? '<details class="reveal"><summary>Ver dica</summary>'
             + '<div class="body">' + AG.tex(x.h) + '</div></details>' : '')

      + '<details class="reveal sol"' + (st.revealed ? ' open' : '') + ' data-sol="' + x.id + '">'
      +   '<summary>Ver solução passo a passo</summary>'
      +   '<div class="body">'
      +     (x.r ? '<div class="resumo"><span class="tag">Resposta</span>' + AG.tex(x.r) + '</div>' : '')
      +     '<ol class="steps">' + (x.sol || []).map(function (p) {
              return '<li><div>' + AG.tex(p) + '</div></li>';
            }).join('') + '</ol>'
      +   '</div>'
      + '</details>'

      + '<footer class="row tight">'
      +   '<span class="xs muted">Como você foi?</span>'
      +   '<button class="btn sm ok'   + (s === 'ok'      ? ' primary' : '') + '" data-mark="ok"      data-for="' + x.id + '" type="button">Acertei</button>'
      +   '<button class="btn sm warn' + (s === 'partial' ? ' primary' : '') + '" data-mark="partial" data-for="' + x.id + '" type="button">Parcial</button>'
      +   '<button class="btn sm bad'  + (s === 'bad'     ? ' primary' : '') + '" data-mark="bad"     data-for="' + x.id + '" type="button">Errei</button>'
      +   (s ? '<button class="btn sm ghost" data-mark="" data-for="' + x.id + '" type="button">limpar</button>' : '')
      + '</footer>'
      + '</article>';
  }

  function render() {
    var lista = window.EXERCICIOS.filter(passa);

    /* Progresso por seção */
    AG.$('#porSecao').innerHTML = window.SECOES.map(function (S) {
      var todos = window.EXERCICIOS.filter(function (x) { return x.s === S.id; });
      var e = AG.exStats(function (x) { return x.s === S.id; });
      var ativo = filtro.secao === String(S.id);
      return '<button class="seccard' + (ativo ? ' on' : '') + '" data-secao="' + S.id + '" type="button">'
        + '<span class="row tight" style="justify-content:space-between;width:100%">'
        +   '<span class="nome">' + AG.esc(S.nome) + '</span>'
        +   '<span class="xs mono muted">' + e.feitos + '/' + todos.length + '</span>'
        + '</span>'
        + '<span class="xs muted desc">' + AG.esc(S.desc) + '</span>'
        + '<span class="bar">'
        +   '<i class="ok" style="width:' + AG.pct(e.ok, todos.length) + '%"></i>'
        +   '<i class="warn" style="width:' + AG.pct(e.partial, todos.length) + '%"></i>'
        +   '<i class="bad" style="width:' + AG.pct(e.bad, todos.length) + '%"></i>'
        + '</span>'
        + '</button>';
    }).join('');

    AG.$$('#porSecao .seccard').forEach(function (b) {
      b.addEventListener('click', function () {
        filtro.secao = (filtro.secao === b.dataset.secao) ? 'todas' : b.dataset.secao;
        render();
      });
    });

    /* Contador */
    AG.$('#contador').innerHTML = '<strong>' + lista.length + '</strong> '
      + (lista.length === 1 ? 'questão' : 'questões')
      + ' de ' + window.EXERCICIOS.length;

    /* Lista */
    AG.$('#itens').innerHTML = lista.length
      ? lista.map(cartao).join('')
      : '<div class="card center" style="padding:var(--s-7)">'
        + '<h3>Nenhuma questão com esses filtros</h3>'
        + '<p class="muted small">Afrouxe um dos filtros acima.</p></div>';

    ligar();
  }

  /* ------------------------------------------------------------- Interação */

  function ligar() {
    /* Rascunho */
    AG.$$('#itens textarea[data-draft]').forEach(function (t) {
      t.addEventListener('input', function () {
        AG.rec('ex', t.dataset.draft, { status: null, draft: '', revealed: false }).draft = t.value;
        AG.save();
      });
    });

    /* Lembrar que a solução foi revelada */
    AG.$$('#itens details[data-sol]').forEach(function (d) {
      d.addEventListener('toggle', function () {
        AG.rec('ex', d.dataset.sol, { status: null, draft: '', revealed: false }).revealed = d.open;
        AG.save();
      });
    });

    /* Automarcação */
    AG.$$('#itens [data-mark]').forEach(function (b) {
      b.addEventListener('click', function () {
        var r = AG.rec('ex', b.dataset.for, { status: null, draft: '', revealed: false });
        r.status = b.dataset.mark || null;
        r.ts = Date.now();
        AG.saveNow();
        /* Redesenha só o cartão, preservando a rolagem. */
        var x = window.EXERCICIOS.filter(function (e) { return e.id === b.dataset.for; })[0];
        var velho = AG.$('#ex-' + b.dataset.for);
        if (velho && x) {
          var novo = AG.el(cartao(x));
          velho.replaceWith(novo);
          ligar();
          atualizarTopo();
        } else {
          render();
        }
      });
    });
  }

  function atualizarTopo() {
    var e = AG.exStats();
    AG.$('#resumo').innerHTML =
      '<span class="mono" style="color:var(--ok)">' + e.ok + '</span> acertos · '
      + '<span class="mono" style="color:var(--warn)">' + e.partial + '</span> parciais · '
      + '<span class="mono" style="color:var(--bad)">' + e.bad + '</span> erros · '
      + '<span class="mono">' + (e.total - e.feitos) + '</span> pendentes';
    /* Barras por seção */
    AG.$$('#porSecao .seccard').forEach(function (b) {
      var id = +b.dataset.secao;
      var todos = window.EXERCICIOS.filter(function (x) { return x.s === id; });
      var s = AG.exStats(function (x) { return x.s === id; });
      var bar = b.querySelector('.bar');
      if (bar) bar.innerHTML =
          '<i class="ok" style="width:' + AG.pct(s.ok, todos.length) + '%"></i>'
        + '<i class="warn" style="width:' + AG.pct(s.partial, todos.length) + '%"></i>'
        + '<i class="bad" style="width:' + AG.pct(s.bad, todos.length) + '%"></i>';
      var cnt = b.querySelector('.mono');
      if (cnt) cnt.textContent = s.feitos + '/' + todos.length;
    });
  }

  /* --------------------------------------------------------------- Início */

  document.addEventListener('DOMContentLoaded', function () {
    /* Selects de filtro */
    AG.$('#fTema').innerHTML = '<option value="todos">Todos os temas</option>'
      + temas().map(function (t) {
          return '<option value="' + AG.esc(t.tag) + '">' + AG.esc(t.tag) + ' (' + t.n + ')</option>';
        }).join('');

    var mapa = { fSecao: 'secao', fTema: 'tema', fDif: 'dif', fProva: 'prova', fStatus: 'status' };
    Object.keys(mapa).forEach(function (id) {
      var el = AG.$('#' + id);
      if (!el) return;
      el.addEventListener('change', function () {
        filtro[mapa[id]] = el.value;
        render();
      });
    });

    var busca = AG.$('#fBusca');
    var timer;
    busca.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () { filtro.busca = busca.value.trim(); render(); }, 200);
    });

    AG.$('#limpar').addEventListener('click', function () {
      filtro = { secao: 'todas', tema: 'todos', dif: 'todas', prova: 'todas',
                 status: 'todos', busca: '' };
      AG.$$('.filtros select').forEach(function (s) { s.selectedIndex = 0; });
      busca.value = '';
      render();
    });

    /* Filtros vindos da URL: ?tag=projeto  ·  ?prova=alta  ·  ?secao=3 */
    var q = new URLSearchParams(location.search);
    if (q.get('tag'))   { filtro.tema  = q.get('tag');   AG.$('#fTema').value  = filtro.tema; }
    if (q.get('prova')) { filtro.prova = q.get('prova'); AG.$('#fProva').value = filtro.prova; }
    if (q.get('secao')) { filtro.secao = q.get('secao'); AG.$('#fSecao').value = filtro.secao; }

    render();
    atualizarTopo();
  });
})();
