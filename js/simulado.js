/* ==========================================================================
   simulado.js — prova cronometrada, revelação do gabarito e nota estimada.
   Estados: escolha → em andamento → corrigindo.
   ========================================================================== */

(function () {
  'use strict';

  var atual = null;       /* objeto do simulado em andamento */
  var tela = 'escolha';   /* escolha | prova | correcao */
  var qIdx = 0;
  var tick = null;

  /* ------------------------------------------------------- Estado salvo */

  function est(id) {
    return AG.rec('sim', id, {
      started: 0, finished: 0, answers: {}, scores: {}, durationMin: 0, elapsed: 0
    });
  }

  function simPorId(id) {
    return window.SIMULADOS.filter(function (s) { return s.id === id; })[0];
  }

  function restante(s) {
    var r = est(s.id);
    var total = (r.durationMin || s.minutos) * 60;
    var gasto = Math.floor((Date.now() - r.started) / 1000);
    return Math.max(0, total - gasto);
  }

  /* Acima de uma hora mostra h:mm:ss — "100:00" é ambíguo numa prova de 100 min. */
  function mmss(seg) {
    var h = Math.floor(seg / 3600),
        m = Math.floor((seg % 3600) / 60),
        s = seg % 60;
    var dois = function (n) { return (n < 10 ? '0' : '') + n; };
    return h > 0 ? h + ':' + dois(m) + ':' + dois(s) : dois(m) + ':' + dois(s);
  }

  /* ------------------------------------------------------------- Escolha */

  function telaEscolha() {
    tela = 'escolha';
    pararTimer();

    AG.$('#palco').innerHTML =
      '<div class="grid g3">' + window.SIMULADOS.map(function (s) {
        var r = AG.load().sim[s.id];
        var feito = r && r.finished;
        var andando = r && r.started && !r.finished;
        var nota = feito ? AG.totalScore(s, r) : null;
        var maxPts = AG.maxScore(s);

        return '<article class="simcard' + (s.oficial ? ' oficial' : '') + '">'
          + '<header>'
          +   '<div class="row tight">'
          +     (s.oficial ? '<span class="pill accent">prova real</span>'
                           : '<span class="pill plain">autoral</span>')
          +     (feito ? '<span class="pill ok">feito</span>' : '')
          +     (andando ? '<span class="pill warn">em andamento</span>' : '')
          +   '</div>'
          +   '<h3>' + AG.esc(s.nome) + '</h3>'
          +   '<span class="xs muted">' + AG.esc(s.origem) + '</span>'
          + '</header>'
          + '<p class="small">' + AG.esc(s.resumo) + '</p>'
          + '<dl class="specs">'
          +   '<dt>Questões</dt><dd>' + s.questoes.length + '</dd>'
          +   '<dt>Pontos</dt><dd>' + String(maxPts).replace('.', ',') + '</dd>'
          +   '<dt>Tempo</dt><dd>' + s.minutos + ' min</dd>'
          + '</dl>'
          + (feito
              ? '<div class="notabox"><span class="xs">sua nota</span>'
                + '<strong>' + String(nota).replace('.', ',') + '</strong>'
                + '<span class="xs muted">de ' + String(maxPts).replace('.', ',') + '</span></div>'
              : '')
          + '<div class="row tight">'
          +   '<button class="btn primary" data-abrir="' + s.id + '" type="button">'
          +     (andando ? 'Retomar' : feito ? 'Refazer' : 'Começar') + '</button>'
          +   (feito ? '<button class="btn" data-rever="' + s.id + '" type="button">Ver correção</button>' : '')
          + '</div>'
          + '</article>';
      }).join('') + '</div>'

      + '<div class="callout tip" style="margin-top:var(--s-6);max-width:var(--measure)">'
      +   '<span class="tag">Como usar</span>'
      +   '<p>Comece pela <strong>Prova 1 de 2026.1</strong>, cronometrada e sem consulta — é a '
      +   'mais recente e serve de diagnóstico. Depois revise o que errou na lista e nos '
      +   'flashcards, e siga para <strong>2025.2</strong> e <strong>2025.1</strong>: elas '
      +   'cobram formatos que 2026.1 não cobrou — recorrência a partir de prosa, potenciação '
      +   'modular e a questão em que o assintótico não decide. Os dois simulados autorais '
      +   'ficam para o fim.</p>'
      +   '<p class="xs muted">A duração de 100 minutos é uma estimativa: os PDFs das provas não '
      +   'informam o tempo oficial. Você pode ajustar antes de começar.</p>'
      + '</div>';

    AG.$$('[data-abrir]').forEach(function (b) {
      b.addEventListener('click', function () { abrir(b.dataset.abrir); });
    });
    AG.$$('[data-rever]').forEach(function (b) {
      b.addEventListener('click', function () {
        atual = simPorId(b.dataset.rever);
        telaCorrecao();
      });
    });
  }

  /* --------------------------------------------------------------- Abrir */

  function abrir(id) {
    var s = simPorId(id);
    var r = est(id);

    if (r.started && !r.finished) {
      atual = s; qIdx = 0; telaProva();
      return;
    }

    var min = prompt('Duração do simulado, em minutos:', String(r.durationMin || s.minutos));
    if (min === null) return;
    min = parseInt(min, 10);
    if (!(min > 0)) { AG.toast('Informe um número de minutos maior que zero.', 'bad'); return; }

    r.started = Date.now();
    r.finished = 0;
    r.answers = {};
    r.scores = {};
    r.durationMin = min;
    AG.saveNow();

    atual = s; qIdx = 0;
    telaProva();
  }

  /* ---------------------------------------------------------------- Prova */

  function telaProva() {
    tela = 'prova';
    var s = atual, r = est(s.id);

    AG.$('#palco').innerHTML =
      '<div class="provahd">'
      +   '<div>'
      +     '<span class="eyebrow">' + AG.esc(s.nome) + '</span>'
      +     '<div class="xs muted">' + AG.esc(s.origem) + '</div>'
      +   '</div>'
      +   '<div class="cron" id="cron">--:--</div>'
      +   '<button class="btn bad" id="entregar" type="button">Entregar e corrigir</button>'
      + '</div>'

      + '<div class="callout" style="max-width:none;margin-bottom:var(--s-4)">'
      +   '<span class="tag">Observações</span>'
      +   '<div>' + AG.tex(s.observacoes) + '</div>'
      + '</div>'

      + '<nav class="qnav" id="qnav"></nav>'
      + '<div id="qbox"></div>';

    AG.$('#entregar').addEventListener('click', entregar);
    renderQNav();
    renderQ();
    iniciarTimer();
  }

  function renderQNav() {
    var s = atual, r = est(s.id);
    AG.$('#qnav').innerHTML = s.questoes.map(function (q, i) {
      var respondida = (r.answers[q.id] || '').trim().length > 0;
      return '<button class="qbtn' + (i === qIdx ? ' on' : '')
        + (respondida ? ' feita' : '') + '" data-q="' + i + '" type="button">'
        + '<span class="n">Q' + q.n + '</span>'
        + '<span class="p">' + String(q.pts).replace('.', ',') + (q.extra ? ' extra' : '') + '</span>'
        + '</button>';
    }).join('');
    AG.$$('#qnav .qbtn').forEach(function (b) {
      b.addEventListener('click', function () { qIdx = +b.dataset.q; renderQNav(); renderQ(); });
    });
  }

  function renderQ() {
    var s = atual, r = est(s.id), q = s.questoes[qIdx];

    AG.$('#qbox').innerHTML =
      '<article class="qcard">'
      + '<header class="row tight">'
      +   '<span class="qn">Questão ' + q.n + '</span>'
      +   '<span class="pill ' + (q.extra ? 'gold' : 'accent') + '">'
      +     String(q.pts).replace('.', ',') + ' ' + (q.pts === 1 ? 'ponto' : 'pontos')
      +     (q.extra ? ' · extra' : '') + '</span>'
      +   '<span class="pill plain">' + AG.esc(q.tema) + '</span>'
      + '</header>'
      + '<div class="enun">' + AG.tex(q.e) + '</div>'
      + '<label class="fld"><span>Sua resposta</span>'
      +   '<textarea rows="12" id="resp" placeholder="Escreva aqui. Pseudocódigo, equacionamento e a conclusão em Θ.">'
      +   AG.esc(r.answers[q.id] || '') + '</textarea></label>'
      + '<div class="row tight">'
      +   '<button class="btn" id="ant" type="button"' + (qIdx === 0 ? ' disabled' : '') + '>← Anterior</button>'
      +   '<button class="btn" id="prox" type="button"' + (qIdx === s.questoes.length - 1 ? ' disabled' : '') + '>Próxima →</button>'
      + '</div>'
      + '</article>';

    var ta = AG.$('#resp');
    ta.addEventListener('input', function () {
      est(s.id).answers[q.id] = ta.value;
      AG.save();
      renderQNav();
    });

    AG.$('#ant').addEventListener('click', function () {
      if (qIdx > 0) { qIdx--; renderQNav(); renderQ(); }
    });
    AG.$('#prox').addEventListener('click', function () {
      if (qIdx < s.questoes.length - 1) { qIdx++; renderQNav(); renderQ(); }
    });
  }

  /* ---------------------------------------------------------------- Timer */

  function iniciarTimer() {
    pararTimer();
    atualizarCron();
    tick = setInterval(atualizarCron, 1000);
  }
  function pararTimer() { if (tick) { clearInterval(tick); tick = null; } }

  function atualizarCron() {
    if (tela !== 'prova' || !atual) return pararTimer();
    var el = AG.$('#cron');
    if (!el) return pararTimer();
    var seg = restante(atual);
    el.textContent = mmss(seg);
    el.classList.toggle('alerta', seg <= 600 && seg > 120);
    el.classList.toggle('critico', seg <= 120);
    if (seg === 0) {
      pararTimer();
      AG.toast('Tempo esgotado. Corrigindo o que você escreveu.', 'bad');
      entregar(true);
    }
  }

  /* ------------------------------------------------------------- Entregar */

  function entregar(automatico) {
    if (!automatico) {
      var r0 = est(atual.id);
      var vazias = atual.questoes.filter(function (q) {
        return !(r0.answers[q.id] || '').trim();
      }).length;
      var msg = vazias
        ? 'Você deixou ' + vazias + ' de ' + atual.questoes.length + ' questões em branco. Entregar assim?'
        : 'Entregar e ver o gabarito?';
      if (!confirm(msg)) return;
    }
    var r = est(atual.id);
    r.finished = Date.now();
    r.elapsed = Math.floor((r.finished - r.started) / 1000);
    AG.saveNow();
    pararTimer();
    telaCorrecao();
  }

  /* ------------------------------------------------------------ Correção */

  function telaCorrecao() {
    tela = 'correcao';
    pararTimer();
    var s = atual, r = est(s.id);
    var maxPts = AG.maxScore(s);

    AG.$('#palco').innerHTML =
      '<div class="provahd">'
      +   '<div>'
      +     '<span class="eyebrow">Correção · ' + AG.esc(s.nome) + '</span>'
      +     '<div class="xs muted">'
      +       (r.elapsed ? 'Tempo usado: ' + mmss(r.elapsed)
                         + ' de ' + (r.durationMin || s.minutos) + ' min' : '')
      +     '</div>'
      +   '</div>'
      +   '<div class="notafinal" id="notafinal"></div>'
      +   '<button class="btn" id="voltar" type="button">← Simulados</button>'
      + '</div>'

      + '<div class="callout warn" style="max-width:var(--measure)">'
      +   '<span class="tag">Como se autoavaliar</span>'
      +   '<p>Compare sua resposta com o gabarito e atribua a nota você mesmo. '
      +   'Seja rigoroso com o que o enunciado pede explicitamente: '
      +   '<strong>a recorrência</strong>, <strong>o equacionamento</strong>, '
      +   '<strong>as três propriedades do invariante</strong> e a resposta '
      +   '<strong>em notação $Θ$</strong>. Chegar ao resultado certo por um caminho que você '
      +   'não escreveu não vale ponto cheio na prova.</p>'
      + '</div>'

      + '<div class="corr">' + s.questoes.map(function (q) {
          var minha = (r.answers[q.id] || '').trim();
          var nota = r.scores[q.id];
          return '<article class="qcorr" data-q="' + q.id + '">'
            + '<header class="row tight">'
            +   '<span class="qn">Q' + q.n + '</span>'
            +   '<span class="pill ' + (q.extra ? 'gold' : 'accent') + '">'
            +     String(q.pts).replace('.', ',') + (q.extra ? ' extra' : '') + '</span>'
            +   '<span class="pill plain">' + AG.esc(q.tema) + '</span>'
            +   '<span class="spacer"></span>'
            +   '<span class="notaq" id="nq-' + q.id + '">'
            +     (typeof nota === 'number' ? String(nota).replace('.', ',') + ' / '
                   + String(q.pts).replace('.', ',') : '— / ' + String(q.pts).replace('.', ','))
            +   '</span>'
            + '</header>'

            + '<details class="reveal"><summary>Enunciado</summary>'
            +   '<div class="body">' + AG.tex(q.e) + '</div></details>'

            + '<div class="minha">'
            +   '<span class="tag">Sua resposta</span>'
            +   (minha ? '<pre class="txt">' + AG.esc(minha) + '</pre>'
                       : '<p class="muted small"><em>Em branco.</em></p>')
            + '</div>'

            + '<details class="reveal sol" open><summary>Gabarito</summary>'
            +   '<div class="body"><ol class="steps">'
            +     q.gab.map(function (p) { return '<li><div>' + AG.tex(p) + '</div></li>'; }).join('')
            +   '</ol></div>'
            + '</details>'

            + '<footer>'
            +   '<span class="xs muted">Quanto você se dá nesta questão?</span>'
            +   '<div class="notas">' + escalaNotas(q, nota) + '</div>'
            + '</footer>'
            + '</article>';
        }).join('') + '</div>';

    AG.$('#voltar').addEventListener('click', telaEscolha);

    /* Liga os botões de nota. Chamada de novo após cada redesenho parcial. */
    function ligarNotas() {
      AG.$$('.notas [data-nota]').forEach(function (b) {
        b.onclick = function () {
          var qid = b.dataset.para;
          est(s.id).scores[qid] = parseFloat(b.dataset.nota);
          AG.saveNow();
          var q = s.questoes.filter(function (x) { return x.id === qid; })[0];
          AG.$('.qcorr[data-q="' + qid + '"] .notas').innerHTML =
            escalaNotas(q, est(s.id).scores[qid]);
          AG.$('#nq-' + qid).textContent =
            String(est(s.id).scores[qid]).replace('.', ',') + ' / ' + String(q.pts).replace('.', ',');
          ligarNotas();
          totalizar();
        };
      });
    }
    ligarNotas();

    function totalizar() {
      var r2 = est(s.id);
      var t = AG.totalScore(s, r2);
      var avaliadas = s.questoes.filter(function (q) {
        return typeof r2.scores[q.id] === 'number';
      }).length;
      /* Percentual do máximo DESTA prova — as três reais valem 11,0, 10,0 e 11,5. */
      var frac = maxPts > 0 ? t / maxPts : 0;
      var cls = frac >= 0.7 ? 'ok' : frac >= 0.5 ? 'warn' : 'bad';
      AG.$('#notafinal').innerHTML =
        '<span class="xs">nota estimada</span>'
        + '<strong class="' + cls + '">' + String(t).replace('.', ',') + '</strong>'
        + '<span class="xs muted">de ' + String(maxPts).replace('.', ',')
        + ' · ' + avaliadas + '/' + s.questoes.length + ' avaliadas</span>';
    }
  }

  /* Escala de notas por questão, em passos de 0,25. */
  function escalaNotas(q, atualNota) {
    var passos = [];
    for (var v = 0; v <= q.pts + 1e-9; v += 0.25) passos.push(Math.round(v * 100) / 100);
    return passos.map(function (v) {
      var on = Math.abs((atualNota == null ? -1 : atualNota) - v) < 1e-9;
      return '<button class="btn sm' + (on ? ' primary' : '') + '" data-nota="' + v
        + '" data-para="' + q.id + '" type="button">' + String(v).replace('.', ',') + '</button>';
    }).join('');
  }

  /* -------------------------------------------------------------- Início */

  document.addEventListener('DOMContentLoaded', function () {
    telaEscolha();
    var q = new URLSearchParams(location.search).get('s');
    if (q && simPorId(q)) abrir(q);
  });

  window.addEventListener('beforeunload', function (e) {
    if (tela === 'prova' && restante(atual) > 0) {
      e.preventDefault();
      e.returnValue = '';
    }
  });
})();
