/* Fil&Soc Slides — catálogo, página de cada apresentação e apresentador em tela cheia. */
(function () {
  'use strict';
  var DECKS = window.DECKS || [];
  var IMG = window.SLIDES_IMG || {};           // na prévia, as imagens vêm embutidas
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var img = function (n) { return IMG[n] || ('imagens/' + n + '.jpg'); };
  var ICON = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.4-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z"/></svg>',
    grade: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    esq: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg>',
    dir: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>',
    tela: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    notas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
    impr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/></svg>',
    debate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-5A8 8 0 1 1 21 12Z"/><path d="M9.5 9.5a2.5 2.5 0 0 1 4.8 1c0 1.5-2.3 2-2.3 3.5M12 17h.01"/></svg>'
  };
  // símbolos desenhados para as apresentações sem retrato
  var SIMB = {
    coruja: '<svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="3"><circle cx="100" cy="100" r="92" stroke-dasharray="4 10"/><path d="M60 70q40-30 80 0v60q-40 30-80 0z"/><circle cx="82" cy="90" r="14"/><circle cx="118" cy="90" r="14"/><circle cx="82" cy="90" r="4" fill="currentColor"/><circle cx="118" cy="90" r="4" fill="currentColor"/><path d="m94 108 6 8 6-8M60 70l-8-18 22 10M140 70l8-18-22 10"/></svg>',
    elementos: '<svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="3"><circle cx="100" cy="100" r="92" stroke-dasharray="4 10"/><path d="M100 30c18 24 26 40 26 54a26 26 0 0 1-52 0c0-14 8-30 26-54Z"/><path d="M40 140q15-12 30 0t30 0 30 0 30 0M40 158q15-12 30 0t30 0 30 0 30 0"/><circle cx="150" cy="58" r="12"/><path d="M150 36v-8M150 88v-8M128 58h-8M180 58h-8"/></svg>',
    contrato: '<svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="3"><circle cx="100" cy="100" r="92" stroke-dasharray="4 10"/><path d="M62 40h60l20 20v100H62z"/><path d="M122 40v20h20M76 80h52M76 98h52M76 116h36"/><path d="M78 148q10-14 20 0t20-4"/></svg>',
    engrenagem: '<svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="3"><circle cx="100" cy="100" r="92" stroke-dasharray="4 10"/><circle cx="84" cy="92" r="30" stroke-width="14" stroke-dasharray="10 8"/><circle cx="84" cy="92" r="12"/><circle cx="134" cy="132" r="20" stroke-width="10" stroke-dasharray="7 6"/><circle cx="134" cy="132" r="7"/></svg>',
    balanca: '<svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="3"><circle cx="100" cy="100" r="92" stroke-dasharray="4 10"/><path d="M100 46v108M70 154h60M56 66h88M56 66l-22 46h44zM144 66l-22 46h44z"/><circle cx="100" cy="46" r="6"/></svg>',
    tela: '<svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="3"><circle cx="100" cy="100" r="92" stroke-dasharray="4 10"/><rect x="40" y="56" width="120" height="76" rx="6"/><path d="m90 78 26 16-26 16z" fill="currentColor"/><path d="M80 150h40M100 132v18"/></svg>'
  };

  /* ---------- montagem de um slide ---------- */
  function lista(itens, cls) { return '<ul class="s-lista' + (itens.length > 5 ? ' s-lista--6' : '') + (cls || '') + '">' + itens.map(function (t, i) { return '<li class="a" style="--d:' + (i + 2) + '">' + esc(t) + '</li>'; }).join('') + '</ul>'; }
  function moldura(deck, cls, corpo, i, total, extra) {
    return '<div class="slide ' + cls + (deck.disc === 'Sociologia' ? ' slide--soc' : '') + '">' + (extra || '') +
      '<div class="s-disc a">' + esc(deck.disc) + ' · ' + esc(deck.titulo) + '</div>' +
      '<div class="s-corpo">' + corpo + '</div>' +
      '<div class="s-marca">FIL<i>&amp;</i>SOC</div><div class="s-num">' + (i + 1) + ' / ' + total + '</div></div>';
  }
  function slideHTML(deck, i) {
    var total = deck.slides.length + 1;
    if (i === 0) {
      var foto = deck.img ? '<div class="s-foto"><img src="' + img(deck.img) + '" alt=""></div>' : '<div class="s-simbolo">' + (SIMB[deck.simbolo] || SIMB.coruja) + '</div><div class="s-fantasma">' + esc(deck.titulo.charAt(0)) + '</div>';
      var corpo = '<h1 class="s-tit a' + (deck.titulo.length > 18 ? ' s-tit--g' : deck.titulo.length > 11 ? ' s-tit--m' : '') + '" style="--d:1">' + esc(deck.titulo) + '</h1><p class="s-sub a" style="--d:2">' + esc(deck.sub) + '</p>' +
        '<div class="s-tags a" style="--d:3"><span>' + esc(deck.serie) + '</span><span>' + esc(deck.tema) + '</span></div>';
      return moldura(deck, 's-capa' + (deck.img ? '' : ' s-capa--grafico'), corpo, i, total, foto);
    }
    var s = deck.slides[i - 1], c = '';
    switch (s.t) {
      case 'topicos': c = '<h2 class="s-tit a" style="--d:1">' + esc(s.titulo) + '</h2>' + lista(s.itens); return moldura(deck, 's-top', c, i, total);
      case 'conceito': c = '<h2 class="s-termo a" style="--d:1">' + esc(s.termo) + '</h2><p class="s-def a" style="--d:2">' + esc(s.def) + '</p>' + (s.ex ? '<p class="s-ex a" style="--d:3">' + esc(s.ex) + '</p>' : ''); return moldura(deck, 's-con', c, i, total);
      case 'citacao': c = '<div class="s-aspas a" style="--d:1">“</div><p class="s-frase a' + (s.texto.length > 100 ? ' s-frase--g' : s.texto.length > 60 ? ' s-frase--m' : '') + '" style="--d:2">' + esc(s.texto) + '</p><p class="s-autor a" style="--d:3">' + esc(s.autor) + (s.obra ? '<small>' + esc(s.obra) + '</small>' : '') + '</p>'; return moldura(deck, 's-cit', c, i, total);
      case 'compara':
        var col = function (o, d) { return '<div class="s-col a" style="--d:' + d + '"><h3>' + esc(o.nome) + '</h3><ul>' + o.itens.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul></div>'; };
        c = '<h2 class="s-tit a" style="--d:1">' + esc(s.titulo) + '</h2><div class="s-cols">' + col(s.a, 2) + col(s.b, 3) + '</div>'; return moldura(deck, 's-cmp', c, i, total);
      case 'tempo': c = '<h2 class="s-tit a" style="--d:1">' + esc(s.titulo) + '</h2><div class="s-tempo">' + s.marcos.map(function (m, k) { return '<div class="s-marco a" style="--d:' + (k + 2) + '"><b>' + esc(m[0]) + '</b><p>' + esc(m[1]) + '</p></div>'; }).join('') + '</div>'; return moldura(deck, 's-tem', c, i, total);
      case 'bio': c = '<h2 class="s-tit a" style="--d:1">' + esc(s.nome) + '</h2><p class="s-datas a" style="--d:2">' + esc(s.datas) + '</p>' + lista(s.itens); return moldura(deck, 's-bio', c, i, total, deck.img ? '<div class="s-foto"><img src="' + img(deck.img) + '" alt=""></div>' : '');
      case 'debate': c = '<div class="s-deb-ic a" style="--d:1">' + ICON.debate + '</div><h2 class="s-perg a' + (s.pergunta.length > 75 ? ' s-perg--g' : s.pergunta.length > 50 ? ' s-perg--m' : '') + '" style="--d:2">' + esc(s.pergunta) + '</h2><ul>' + s.itens.map(function (t, k) { return '<li class="a" style="--d:' + (k + 3) + '">' + esc(t) + '</li>'; }).join('') + '</ul>'; return moldura(deck, 's-deb', c, i, total);
      case 'resumo': c = '<h2 class="s-tit a" style="--d:1">Para <em>lembrar</em></h2>' + lista(s.itens) + (s.enem ? '<div class="s-enem a" style="--d:6"><b>ENEM</b><p>' + esc(s.enem) + '</p></div>' : ''); return moldura(deck, 's-res', c, i, total);
    }
    return moldura(deck, '', '', i, total);
  }

  /* ---------- escala: o slide 1920×1080 cabe no quadro ---------- */
  var ro = 'ResizeObserver' in window ? new ResizeObserver(function (es) { es.forEach(function (e) { ajusta(e.target); }); }) : null;
  function ajusta(el) { var w = el.clientWidth; if (w) el.style.setProperty('--k', (w / 1920).toFixed(5)); }
  function observa(raiz) { (raiz || document).querySelectorAll('.tela, .quadro').forEach(function (el) { ajusta(el); if (ro) ro.observe(el); }); }
  window.addEventListener('resize', function () { observa(); });
  function tela(deck, i) { return '<div class="tela" aria-hidden="true">' + slideHTML(deck, i) + '</div>'; }

  /* ---------- catálogo ---------- */
  var filtro = 'Todos', termo = '';
  var semAc = function (t) { return t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); };
  function passa(d) {
    if (filtro !== 'Todos' && d.disc !== filtro) return false;
    if (!termo) return true;
    var alvo = semAc([d.titulo, d.sub, d.tema, d.serie, d.disc].concat(d.slides.map(function (s) { return [s.titulo, s.termo, s.nome, s.autor, s.pergunta].join(' '); })).join(' '));
    return alvo.indexOf(semAc(termo)) >= 0;
  }
  function cartao(d, n) {
    return '<button type="button" class="cartao" style="--n:' + n + '" data-abrir="' + d.slug + '" aria-label="' + esc(d.titulo + ', ' + (d.slides.length + 1) + ' slides') + '">' +
      tela(d, 0) + '<span class="qtd">' + (d.slides.length + 1) + ' slides</span><span class="play">' + ICON.play + '</span>' +
      '<span class="cartao-info"><b>' + esc(d.titulo) + '</b><span>' + esc(d.sub) + ' · ' + esc(d.serie) + '</span></span></button>';
  }
  function catalogo() {
    var ds = DECKS.filter(passa), html = '';
    if (termo || filtro !== 'Todos') {
      html = ds.length ? '<section class="fileira wrap"><div class="fileira-cab"><h2>' + (termo ? 'Resultados' : esc(filtro)) + '</h2><span>' + ds.length + ' apresentações</span></div><div class="grade">' + ds.map(cartao).join('') + '</div></section>'
        : '<p class="vazio wrap">Nenhuma apresentação encontrada. Tente outro termo.</p>';
    } else {
      ['Filosofia', 'Sociologia'].forEach(function (disc) {
        var g = ds.filter(function (d) { return d.disc === disc; });
        html += '<section class="fileira wrap' + (disc === 'Sociologia' ? ' fileira--soc' : '') + '"><div class="fileira-cab"><h2>' + disc + '</h2><span>' + g.length + ' apresentações · ' + g.reduce(function (a, d) { return a + d.slides.length + 1; }, 0) + ' slides</span></div><div class="trilho">' + g.map(cartao).join('') + '</div></section>';
      });
    }
    $('#catalogo').innerHTML = html;
    observa($('#catalogo'));
  }

  /* ---------- destaque ---------- */
  function destaque() {
    var d = DECKS.filter(function (x) { return x.slug === 'platao'; })[0] || DECKS[0];
    $('#destaque-txt').innerHTML = '<span class="eyebrow">Apresentação em destaque</span><h1>' + esc(d.titulo) + ': ' + esc(d.sub) + '</h1>' +
      '<p>Slides prontos para projetar: conceitos, comparações, citações, perguntas para debate e um resumo com dica para o Enem.</p>' +
      '<div class="meta"><span class="badge">' + esc(d.disc) + '</span><span>' + (d.slides.length + 1) + ' slides</span><span>' + esc(d.serie) + '</span><span>' + esc(d.tema) + '</span></div>' +
      '<div class="acoes"><button type="button" class="btn btn--red" data-apresentar="' + d.slug + '">' + ICON.play + ' Apresentar</button><button type="button" class="btn btn--glass" data-abrir="' + d.slug + '">' + ICON.grade + ' Ver os slides</button></div>';
    $('#destaque-tela').innerHTML = '<div class="tela-pilha"></div>' + tela(d, 0);
    observa($('#destaque'));
    var n = 0;
    clearInterval(destaque.t);
    destaque.t = setInterval(function () {
      if (document.hidden || $('#apresentador') && !$('#apresentador').hidden) return;
      n = (n + 1) % (d.slides.length + 1);
      $('#destaque-tela .tela').innerHTML = slideHTML(d, n);
    }, 3500);
  }

  /* ---------- página da apresentação ---------- */
  function abrir(slug) {
    var d = DECKS.filter(function (x) { return x.slug === slug; })[0];
    if (!d) return;
    var p = $('#painel');
    p.innerHTML = '<div class="painel-caixa" role="dialog" aria-modal="true" aria-labelledby="painel-t"><button type="button" class="fechar" data-fechar aria-label="Fechar">' + ICON.x + '</button>' +
      '<div class="painel-topo"><div><span class="eyebrow">' + esc(d.disc) + ' · ' + esc(d.tema) + '</span><h2 id="painel-t">' + esc(d.titulo) + '</h2><p>' + esc(d.sub) + '</p>' +
      '<div class="meta"><span class="badge' + (d.disc === 'Sociologia' ? ' badge--soc' : '') + '">' + esc(d.disc) + '</span><span>' + (d.slides.length + 1) + ' slides</span><span>' + esc(d.serie) + '</span></div>' +
      '<div class="acoes"><button type="button" class="btn btn--red" data-apresentar="' + d.slug + '">' + ICON.play + ' Apresentar</button>' +
      '<button type="button" class="btn btn--glass" data-imprimir="' + d.slug + '">' + ICON.impr + ' Imprimir ou salvar em PDF</button></div></div>' + tela(d, 0) + '</div>' +
      '<div class="lista-slides"><h3>Todos os slides</h3><div class="mini-grade">' + d.slides.map(function (s, k) { return '<button type="button" class="mini" data-apresentar="' + d.slug + '" data-ir="' + (k + 1) + '">' + tela(d, k + 1) + '<span>' + (k + 2) + '. ' + esc(rotulo(s)) + '</span></button>'; }).join('') + '</div></div></div>';
    p.hidden = false;
    document.body.style.overflow = 'hidden';
    observa(p);
    $('.fechar', p).focus();
    try { history.replaceState(null, '', '#' + slug); } catch (e) {}
  }
  function rotulo(s) { return s.titulo || s.termo || s.nome || (s.t === 'citacao' ? 'Citação: ' + s.autor : s.t === 'debate' ? 'Debate' : s.t === 'resumo' ? 'Resumo e Enem' : ''); }
  function fechar() { var p = $('#painel'); p.hidden = true; p.innerHTML = ''; document.body.style.overflow = ''; try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {} }

  /* ---------- apresentador ---------- */
  var atual = null, idx = 0, timerOculta;
  function apresentar(slug, ir) {
    atual = DECKS.filter(function (x) { return x.slug === slug; })[0];
    if (!atual) return;
    idx = ir || 0;
    var a = $('#apresentador');
    a.hidden = false;
    document.body.style.overflow = 'hidden';
    $('#ap-titulo').textContent = atual.titulo + ' · ' + atual.sub;
    $('#ap-notas').hidden = !notasLigadas;
    $('#ap-faixa').hidden = true;
    $('#bt-grade').setAttribute('aria-pressed', 'false');
    mostra(0);
    mexeu();
    ajustaQuadro();
    try { if (a.requestFullscreen && window.matchMedia('(pointer: fine)').matches) a.requestFullscreen().catch(function () {}); } catch (e) {}
  }
  function ajustaQuadro() {
    var q = $('#ap-quadro'), p = $('#ap-palco'); if (!p.clientWidth) return;
    var w = Math.min(p.clientWidth, p.clientHeight * 16 / 9);
    q.style.width = Math.floor(w) + 'px'; ajusta(q);
  }
  function mostra(dir) {
    var q = $('#ap-quadro'), total = atual.slides.length + 1;
    var velho = q.querySelector('.slide');
    var tmp = document.createElement('div'); tmp.innerHTML = slideHTML(atual, idx);
    var novo = tmp.firstChild;
    if (dir) novo.classList.add(dir > 0 ? 'entra-dir' : 'entra-esq');
    if (velho) { velho.classList.add('sai'); setTimeout(function () { if (velho.parentNode) velho.parentNode.removeChild(velho); }, 450); }
    q.appendChild(novo);
    $('#ap-cont').textContent = (idx + 1) + ' / ' + total;
    $('#ap-prog').style.width = ((idx + 1) / total * 100) + '%';
    var s = idx ? atual.slides[idx - 1] : null;
    $('#ap-notas').innerHTML = '<b>Nota para o professor</b>' + esc(s && s.n ? s.n : 'Sem nota para este slide.');
    var f = $('#ap-faixa'); if (!f.hidden) marcaFaixa();
  }
  function vai(d) { var total = atual.slides.length + 1, n = Math.max(0, Math.min(total - 1, idx + d)); if (n === idx) return; idx = n; mostra(d); }
  function vaiPara(n) { var d = n > idx ? 1 : -1; if (n === idx) return; idx = n; mostra(d); }
  function sair() {
    $('#apresentador').hidden = true; document.body.style.overflow = $('#painel').hidden ? '' : 'hidden';
    try { if (document.fullscreenElement) document.exitFullscreen(); } catch (e) {}
    $('#ap-quadro').innerHTML = '';
  }
  var notasLigadas = false;
  function faixa() {
    var f = $('#ap-faixa'), on = f.hidden;
    f.hidden = !on; $('#bt-grade').setAttribute('aria-pressed', String(on));
    if (on) { f.innerHTML = [atual.titulo].concat(atual.slides).map(function (s, k) { return '<button type="button" class="mini" data-ir-ap="' + k + '">' + tela(atual, k) + '<span>' + (k + 1) + (k ? '. ' + esc(rotulo(s)) : '. Capa') + '</span></button>'; }).join(''); observa(f); marcaFaixa(); }
  }
  function marcaFaixa() { $('#ap-faixa').querySelectorAll('.mini').forEach(function (m, k) { m.setAttribute('aria-current', String(k === idx)); if (k === idx) m.scrollIntoView({ block: 'nearest', inline: 'center' }); }); }
  function mexeu() { var a = $('#apresentador'); a.classList.remove('oculto'); clearTimeout(timerOculta); timerOculta = setTimeout(function () { if ($('#ap-faixa').hidden) a.classList.add('oculto'); }, 2600); }
  function telaCheia() { var a = $('#apresentador'); try { if (document.fullscreenElement) document.exitFullscreen(); else if (a.requestFullscreen) a.requestFullscreen(); } catch (e) {} }

  /* ---------- impressão / PDF ---------- */
  function imprimir(slug) {
    var d = DECKS.filter(function (x) { return x.slug === slug; })[0]; if (!d) return;
    var box = $('#impressao');
    box.innerHTML = [0].concat(d.slides.map(function (_, k) { return k + 1; })).map(function (k) { return tela(d, k); }).join('');
    box.hidden = false; observa(box);
    box.querySelectorAll('.tela').forEach(function (t) { t.style.setProperty('--k', (1122 / 1920).toFixed(5)); });
    setTimeout(function () { window.print(); box.hidden = true; }, 300);
  }

  /* ---------- eventos ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target : e.target.parentElement;
    var ap = t.closest('[data-apresentar]'); if (ap) { apresentar(ap.dataset.apresentar, +(ap.dataset.ir || 0)); return; }
    var ab = t.closest('[data-abrir]'); if (ab) { abrir(ab.dataset.abrir); return; }
    if (t.closest('[data-fechar]')) { fechar(); return; }
    var im = t.closest('[data-imprimir]'); if (im) { imprimir(im.dataset.imprimir); return; }
    var fi = t.closest('[data-filtro]'); if (fi) { filtro = fi.dataset.filtro; document.querySelectorAll('[data-filtro]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === fi)); }); catalogo(); return; }
    var ia = t.closest('[data-ir-ap]'); if (ia) { vaiPara(+ia.dataset.irAp); return; }
    if (t === $('#painel')) fechar();
  });
  $('#busca').addEventListener('input', function (e) { termo = e.target.value.trim(); catalogo(); });
  $('#zona-esq').addEventListener('click', function () { vai(-1); });
  $('#zona-dir').addEventListener('click', function () { vai(1); });
  $('#bt-ant').addEventListener('click', function () { vai(-1); });
  $('#bt-prox').addEventListener('click', function () { vai(1); });
  $('#bt-sair').addEventListener('click', sair);
  $('#bt-tela').addEventListener('click', telaCheia);
  $('#bt-grade').addEventListener('click', faixa);
  $('#bt-notas').addEventListener('click', function () { notasLigadas = !notasLigadas; $('#ap-notas').hidden = !notasLigadas; this.setAttribute('aria-pressed', String(notasLigadas)); });
  $('#apresentador').addEventListener('mousemove', mexeu);
  document.addEventListener('keydown', function (e) {
    if (!$('#apresentador').hidden) {
      var k = e.key;
      if (k === 'ArrowRight' || k === 'PageDown' || k === ' ' || k === 'Enter') { e.preventDefault(); vai(1); }
      else if (k === 'ArrowLeft' || k === 'PageUp' || k === 'Backspace') { e.preventDefault(); vai(-1); }
      else if (k === 'Home') vaiPara(0);
      else if (k === 'End') vaiPara(atual.slides.length);
      else if (k === 'Escape') { if (!document.fullscreenElement) sair(); }
      else if (k === 'f' || k === 'F') telaCheia();
      else if (k === 'g' || k === 'G') faixa();
      else if (k === 'n' || k === 'N') $('#bt-notas').click();
      mexeu();
      return;
    }
    if (e.key === 'Escape' && !$('#painel').hidden) fechar();
  });
  // deslizar o dedo no celular
  var x0 = null;
  $('#ap-palco').addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  $('#ap-palco').addEventListener('touchend', function (e) { if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) vai(dx < 0 ? 1 : -1); x0 = null; }, { passive: true });
  document.addEventListener('fullscreenchange', ajustaQuadro);
  if ('ResizeObserver' in window) new ResizeObserver(ajustaQuadro).observe($('#ap-palco'));

  window.FILSOC_SLIDE = slideHTML;
  catalogo();
  destaque();
  var h = location.hash.replace('#', '');
  if (h && DECKS.some(function (d) { return d.slug === h; })) abrir(h);
})();
