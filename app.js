/* Fil&Soc Slides — catálogo por tema, página de cada apresentação, apresentador em tela cheia,
   editor (salvo neste navegador) e exportação para PowerPoint editável. */
(function () {
  'use strict';
  var BASE = window.DECKS || [];
  var IMG = window.SLIDES_IMG || {};           // na prévia, as imagens locais vêm embutidas
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var clone = function (o) { return JSON.parse(JSON.stringify(o)); };
  function img(n) { if (!n) return ''; if (/^(https?:|data:|blob:)/.test(n)) return n; return IMG[n] || ('imagens/' + n + '.jpg'); }

  /* ---------- armazenamento das edições (só neste navegador) ---------- */
  var CHAVE = 'filsoc-slides:v2', estado = null;
  function st() {
    if (estado) return estado;
    var d = null;
    try { d = JSON.parse(localStorage.getItem(CHAVE) || 'null'); } catch (e) { d = null; }
    estado = d && typeof d === 'object' ? d : {};
    estado.edits = estado.edits || {}; estado.novos = estado.novos || [];
    return estado;
  }
  function grava() { try { localStorage.setItem(CHAVE, JSON.stringify(st())); return true; } catch (e) { return false; } }
  function decks() { var s = st(); return s.novos.concat(BASE.map(function (d) { return s.edits[d.slug] || d; })); }
  function acha(slug) { return decks().filter(function (d) { return d.slug === slug; })[0]; }
  function ehNovo(slug) { return st().novos.some(function (d) { return d.slug === slug; }); }
  function ehEditado(slug) { return !!st().edits[slug]; }
  function original(slug) { return BASE.filter(function (d) { return d.slug === slug; })[0]; }
  function guarda(deck) {
    var s = st();
    if (ehNovo(deck.slug)) s.novos = s.novos.map(function (d) { return d.slug === deck.slug ? deck : d; });
    else s.edits[deck.slug] = deck;
    return grava();
  }
  var novoSlug = function () { return 'minha-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5); };

  var ICON = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.4-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z"/></svg>',
    grade: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    impr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/></svg>',
    lapis: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/></svg>',
    ppt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5"/><path d="M4 17v3h16v-3"/></svg>',
    copia: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/></svg>',
    mais: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    debate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-5A8 8 0 1 1 21 12Z"/><path d="M9.5 9.5a2.5 2.5 0 0 1 4.8 1c0 1.5-2.3 2-2.3 3.5M12 17h.01"/></svg>'
  };
  var CORUJA = '<svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="3"><circle cx="100" cy="100" r="92" stroke-dasharray="4 10"/><path d="M60 70q40-30 80 0v60q-40 30-80 0z"/><circle cx="82" cy="90" r="14"/><circle cx="118" cy="90" r="14"/><circle cx="82" cy="90" r="4" fill="currentColor"/><circle cx="118" cy="90" r="4" fill="currentColor"/><path d="m94 108 6 8 6-8M60 70l-8-18 22 10M140 70l8-18-22 10"/></svg>';

  /* ---------- montagem de um slide (1920×1080) ---------- */
  function lista(itens, cls) { itens = itens || []; return '<ul class="s-lista' + (itens.length > 5 ? ' s-lista--6' : '') + (cls || '') + '">' + itens.map(function (t, i) { return '<li class="a" style="--d:' + (i + 2) + '">' + esc(t) + '</li>'; }).join('') + '</ul>'; }
  function foto(deck) { return deck.img ? '<div class="s-foto"><img src="' + esc(img(deck.img)) + '" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.parentNode.classList.add(\'s-foto--erro\')"></div>' : ''; }
  function moldura(deck, cls, corpo, i, total, extra) {
    return '<div class="slide ' + cls + (deck.disc === 'Sociologia' ? ' slide--soc' : '') + '">' + (extra || '') +
      '<div class="s-disc a">' + esc(deck.disc) + ' · ' + esc(deck.titulo) + '</div>' +
      '<div class="s-corpo">' + corpo + '</div>' +
      '<div class="s-marca">FIL<i>&amp;</i>SOC</div><div class="s-num">' + (i + 1) + ' / ' + total + '</div></div>';
  }
  function slideHTML(deck, i) {
    var total = deck.slides.length + 1, t = deck.titulo || '';
    if (i === 0) {
      var extra = deck.img ? foto(deck) + (deck.cred ? '<div class="s-cred">Imagem: ' + esc(deck.cred[0]) + ' · ' + esc(deck.cred[1]) + ' · Wikimedia Commons</div>' : '')
        : '<div class="s-simbolo">' + CORUJA + '</div><div class="s-fantasma">' + esc(t.charAt(0)) + '</div>';
      var corpo = '<h1 class="s-tit a' + (t.length > 18 ? ' s-tit--g' : t.length > 11 ? ' s-tit--m' : '') + '" style="--d:1">' + esc(t) + '</h1><p class="s-sub a" style="--d:2">' + esc(deck.sub) + '</p>' +
        (deck.tema ? '<div class="s-tags a" style="--d:3"><span>' + esc(deck.tema) + '</span></div>' : '');
      return moldura(deck, 's-capa' + (deck.img ? '' : ' s-capa--grafico'), corpo, i, total, extra);
    }
    var s = deck.slides[i - 1] || {}, c = '';
    switch (s.t) {
      case 'topicos': c = '<h2 class="s-tit a" style="--d:1">' + esc(s.titulo) + '</h2>' + lista(s.itens); return moldura(deck, 's-top', c, i, total);
      case 'conceito': c = '<h2 class="s-termo a" style="--d:1">' + esc(s.termo) + '</h2><p class="s-def a" style="--d:2">' + esc(s.def) + '</p>' + (s.ex ? '<p class="s-ex a" style="--d:3">' + esc(s.ex) + '</p>' : ''); return moldura(deck, 's-con', c, i, total);
      case 'citacao': var tx = s.texto || ''; c = '<div class="s-aspas a" style="--d:1">“</div><p class="s-frase a' + (tx.length > 100 ? ' s-frase--g' : tx.length > 60 ? ' s-frase--m' : '') + '" style="--d:2">' + esc(tx) + '</p><p class="s-autor a" style="--d:3">' + esc(s.autor) + (s.obra ? '<small>' + esc(s.obra) + '</small>' : '') + '</p>'; return moldura(deck, 's-cit', c, i, total);
      case 'compara':
        var col = function (o, d) { o = o || { nome: '', itens: [] }; return '<div class="s-col a" style="--d:' + d + '"><h3>' + esc(o.nome) + '</h3><ul>' + (o.itens || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>'; };
        c = '<h2 class="s-tit a" style="--d:1">' + esc(s.titulo) + '</h2><div class="s-cols">' + col(s.a, 2) + col(s.b, 3) + '</div>'; return moldura(deck, 's-cmp', c, i, total);
      case 'tempo': c = '<h2 class="s-tit a" style="--d:1">' + esc(s.titulo) + '</h2><div class="s-tempo">' + (s.marcos || []).map(function (m, k) { return '<div class="s-marco a" style="--d:' + (k + 2) + '"><b>' + esc(m[0]) + '</b><p>' + esc(m[1]) + '</p></div>'; }).join('') + '</div>'; return moldura(deck, 's-tem', c, i, total);
      case 'bio': c = '<h2 class="s-tit a" style="--d:1">' + esc(s.nome) + '</h2><p class="s-datas a" style="--d:2">' + esc(s.datas) + '</p>' + lista(s.itens); return moldura(deck, 's-bio' + (deck.img ? '' : ' s-bio--sem'), c, i, total, foto(deck));
      case 'debate': var pg = s.pergunta || ''; c = '<div class="s-deb-ic a" style="--d:1">' + ICON.debate + '</div><h2 class="s-perg a' + (pg.length > 75 ? ' s-perg--g' : pg.length > 50 ? ' s-perg--m' : '') + '" style="--d:2">' + esc(pg) + '</h2><ul>' + (s.itens || []).map(function (x, k) { return '<li class="a" style="--d:' + (k + 3) + '">' + esc(x) + '</li>'; }).join('') + '</ul>'; return moldura(deck, 's-deb', c, i, total);
      case 'resumo': c = '<h2 class="s-tit a" style="--d:1">Para <em>lembrar</em></h2>' + lista(s.itens) + (s.enem ? '<div class="s-enem a" style="--d:6"><b>ENEM</b><p>' + esc(s.enem) + '</p></div>' : ''); return moldura(deck, 's-res', c, i, total);
    }
    return moldura(deck, '', '', i, total);
  }

  /* encolhe o conteúdo quando um texto editado fica grande demais para o slide */
  function encaixa(raiz) {
    (raiz || document).querySelectorAll('.slide .s-corpo').forEach(function (c) {
      var f = c.children, k, z = 1;
      for (k = 0; k < f.length; k++) f[k].style.zoom = '';
      while (c.scrollHeight > c.clientHeight + 2 && z > .56) { z -= .06; for (k = 0; k < f.length; k++) f[k].style.zoom = z.toFixed(2); }
    });
  }

  /* ---------- escala: o slide 1920×1080 cabe no quadro ---------- */
  var ro = 'ResizeObserver' in window ? new ResizeObserver(function (es) { es.forEach(function (e) { ajusta(e.target); }); }) : null;
  function ajusta(el) { var w = el.clientWidth; if (w) el.style.setProperty('--k', (w / 1920).toFixed(5)); }
  function observa(raiz) { (raiz || document).querySelectorAll('.tela, .quadro').forEach(function (el) { ajusta(el); if (ro) ro.observe(el); }); encaixa(raiz); }
  window.addEventListener('resize', function () { observa(); });
  function tela(deck, i) { return '<div class="tela" aria-hidden="true">' + slideHTML(deck, i) + '</div>'; }
  function rotulo(s) { return s.titulo || s.termo || s.nome || (s.t === 'citacao' ? 'Citação: ' + (s.autor || '') : s.t === 'debate' ? 'Debate' : s.t === 'resumo' ? 'Para lembrar' : 'Slide'); }

  /* ---------- catálogo por tema ---------- */
  var TEMAS = {
    Filosofia: ['Introdução', 'Filosofia Antiga', 'Filosofia Medieval', 'Filosofia Moderna', 'Filosofia Contemporânea', 'Conhecimento e Ciência', 'Ética', 'Política', 'Estética', 'Lógica', 'Pensamento Plural'],
    Sociologia: ['Fundamentos', 'Clássicos', 'Cultura', 'Trabalho', 'Desigualdades', 'Política', 'Brasil', 'Sociedade Contemporânea']
  };
  var filtro = 'Todos', termo = '';
  var semAc = function (t) { return String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); };
  function passa(d) {
    if (filtro === 'Minhas') { if (!ehNovo(d.slug) && !ehEditado(d.slug)) return false; }
    else if (filtro !== 'Todos' && d.disc !== filtro) return false;
    if (!termo) return true;
    var alvo = semAc([d.titulo, d.sub, d.tema, d.disc].concat(d.slides.map(function (s) { return [s.titulo, s.termo, s.nome, s.autor, s.pergunta].join(' '); })).join(' '));
    return alvo.indexOf(semAc(termo)) >= 0;
  }
  function cartao(d, n) {
    var qtd = d.slides.length + 1;
    return '<button type="button" class="cartao" style="--n:' + Math.min(n, 12) + '" data-abrir="' + esc(d.slug) + '" aria-label="' + esc(d.titulo + ', ' + qtd + ' slides') + '">' +
      tela(d, 0) + '<span class="qtd">' + qtd + ' slides</span>' + (ehEditado(d.slug) ? '<span class="tag-ed">Editada</span>' : '') + '<span class="play">' + ICON.play + '</span>' +
      '<span class="cartao-info"><b>' + esc(d.titulo) + '</b><span>' + esc(d.disc) + ' · ' + qtd + ' slides</span></span></button>';
  }
  var CRIAR = '<button type="button" class="cartao cartao--criar" data-criar><span class="tela"><span class="criar-ic">' + ICON.mais + '</span><span class="criar-tx">Criar apresentação</span></span><span class="cartao-info"><b>Nova apresentação</b><span>Em branco, do seu jeito</span></span></button>';
  function catalogo() {
    var ds = decks().filter(passa), html = '';
    if (termo || filtro !== 'Todos') {
      var cab = termo ? 'Resultados' : filtro === 'Minhas' ? 'Minhas apresentações' : filtro;
      html = '<section class="fileira wrap"><div class="fileira-cab"><h2>' + esc(cab) + '</h2><span>' + ds.length + ' apresentações</span></div>' +
        (ds.length || filtro === 'Minhas' ? '<div class="grade">' + (filtro === 'Minhas' && !termo ? CRIAR : '') + ds.map(cartao).join('') + '</div>' : '<p class="vazio">Nenhuma apresentação encontrada. Tente outro termo.</p>') + '</section>';
    } else {
      var minhas = ds.filter(function (d) { return ehNovo(d.slug); });
      html += '<section class="fileira wrap fileira--minhas"><div class="fileira-cab"><h2>Minhas apresentações</h2><span>' + (minhas.length ? minhas.length + ' criadas por você' : 'Crie a sua ou edite qualquer apresentação') + '</span></div><div class="trilho">' + CRIAR + minhas.map(cartao).join('') + '</div></section>';
      ['Filosofia', 'Sociologia'].forEach(function (disc) {
        var g = ds.filter(function (d) { return d.disc === disc && !ehNovo(d.slug); });
        html += '<div class="disc-cab wrap' + (disc === 'Sociologia' ? ' disc-cab--soc' : '') + '"><h2>' + disc + '</h2><span>' + g.length + ' apresentações · ' + g.reduce(function (a, d) { return a + d.slides.length + 1; }, 0) + ' slides</span></div>';
        var temas = TEMAS[disc].slice();
        g.forEach(function (d) { if (temas.indexOf(d.tema) < 0) temas.push(d.tema); });
        temas.forEach(function (tm) {
          var l = g.filter(function (d) { return d.tema === tm; });
          if (!l.length) return;
          html += '<section class="fileira wrap' + (disc === 'Sociologia' ? ' fileira--soc' : '') + '"><div class="fileira-cab"><h3>' + esc(tm) + '</h3><span>' + l.length + '</span></div><div class="trilho">' + l.map(cartao).join('') + '</div></section>';
        });
      });
    }
    $('#catalogo').innerHTML = html;
    observa($('#catalogo'));
  }

  /* ---------- destaque ---------- */
  function destaque() {
    var d = acha('platao') || decks()[0];
    if (!d) return;
    $('#destaque-txt').innerHTML = '<span class="eyebrow">200 apresentações prontas e editáveis</span><h1>' + esc(d.titulo) + ': ' + esc(d.sub) + '</h1>' +
      '<p>Slides para projetar em sala: conceitos, comparações, citações, debate e resumo com dica para o Enem. Edite o texto, troque a imagem, crie as suas e baixe em PowerPoint.</p>' +
      '<div class="meta"><span class="badge">' + esc(d.disc) + '</span><span>' + (d.slides.length + 1) + ' slides</span><span>' + esc(d.tema) + '</span></div>' +
      '<div class="acoes"><button type="button" class="btn btn--red" data-apresentar="' + esc(d.slug) + '">' + ICON.play + ' Apresentar</button><button type="button" class="btn btn--glass" data-abrir="' + esc(d.slug) + '">' + ICON.grade + ' Ver os slides</button></div>';
    $('#destaque-tela').innerHTML = '<div class="tela-pilha"></div>' + tela(d, 0);
    observa($('#destaque'));
    var n = 0;
    clearInterval(destaque.t);
    destaque.t = setInterval(function () {
      if (document.hidden || !$('#apresentador').hidden || !$('#editor').hidden) return;
      n = (n + 1) % (d.slides.length + 1);
      $('#destaque-tela .tela').innerHTML = slideHTML(d, n);
      encaixa($('#destaque-tela'));
    }, 3500);
  }

  /* ---------- página da apresentação ---------- */
  function abrir(slug) {
    var d = acha(slug);
    if (!d) return;
    var p = $('#painel'), soc = d.disc === 'Sociologia';
    p.innerHTML = '<div class="painel-caixa" role="dialog" aria-modal="true" aria-labelledby="painel-t"><button type="button" class="fechar" data-fechar aria-label="Fechar">' + ICON.x + '</button>' +
      '<div class="painel-topo"><div><span class="eyebrow">' + esc(d.disc) + ' · ' + esc(d.tema) + '</span><h2 id="painel-t">' + esc(d.titulo) + '</h2><p>' + esc(d.sub) + '</p>' +
      '<div class="meta"><span class="badge' + (soc ? ' badge--soc' : '') + '">' + esc(d.disc) + '</span><span>' + (d.slides.length + 1) + ' slides</span>' + (ehEditado(slug) ? '<span class="tag-ed tag-ed--inline">Editada por você</span>' : '') + (ehNovo(slug) ? '<span class="tag-ed tag-ed--inline">Criada por você</span>' : '') + '</div>' +
      '<div class="acoes"><button type="button" class="btn btn--red" data-apresentar="' + esc(slug) + '">' + ICON.play + ' Apresentar</button>' +
      '<button type="button" class="btn btn--glass" data-editar="' + esc(slug) + '">' + ICON.lapis + ' Editar</button>' +
      '<button type="button" class="btn btn--glass" data-pptx="' + esc(slug) + '">' + ICON.ppt + ' PowerPoint</button>' +
      '<button type="button" class="btn btn--glass" data-imprimir="' + esc(slug) + '">' + ICON.impr + ' PDF</button></div>' +
      (d.cred ? '<p class="credito">Imagem: ' + esc(d.cred[0]) + ' · ' + esc(d.cred[1]) + ' · <a href="' + esc(d.cred[2]) + '" target="_blank" rel="noopener">Wikimedia Commons</a></p>' : '') +
      '</div>' + tela(d, 0) + '</div>' +
      '<div class="lista-slides"><h3>Todos os slides</h3><div class="mini-grade">' + d.slides.map(function (s, k) { return '<button type="button" class="mini" data-apresentar="' + esc(slug) + '" data-ir="' + (k + 1) + '">' + tela(d, k + 1) + '<span>' + (k + 2) + '. ' + esc(rotulo(s)) + '</span></button>'; }).join('') + '</div></div></div>';
    p.hidden = false;
    document.body.style.overflow = 'hidden';
    observa(p);
    $('.fechar', p).focus();
    try { history.replaceState(null, '', '#' + slug); } catch (e) {}
  }
  function fechar() { var p = $('#painel'); p.hidden = true; p.innerHTML = ''; document.body.style.overflow = ''; try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {} }

  /* ---------- apresentador ---------- */
  var atual = null, idx = 0, timerOculta;
  function apresentar(slug, ir) {
    atual = acha(slug);
    if (!atual) return;
    idx = ir || 0;
    var a = $('#apresentador');
    a.hidden = false;
    document.body.style.overflow = 'hidden';
    $('#ap-titulo').textContent = atual.titulo + ' · ' + atual.sub;
    $('#ap-notas').hidden = !notasLigadas;
    $('#ap-faixa').hidden = true;
    $('#bt-grade').setAttribute('aria-pressed', 'false');
    $('#ap-quadro').innerHTML = '';
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
    var velho = q.querySelector('.slide:not(.sai)');
    var tmp = document.createElement('div'); tmp.innerHTML = slideHTML(atual, idx);
    var novo = tmp.firstChild;
    if (dir) novo.classList.add(dir > 0 ? 'entra-dir' : 'entra-esq');
    if (velho) { velho.classList.add('sai'); setTimeout(function () { if (velho.parentNode) velho.parentNode.removeChild(velho); }, 450); }
    q.appendChild(novo);
    encaixa(q);
    $('#ap-cont').textContent = (idx + 1) + ' / ' + total;
    $('#ap-prog').style.width = ((idx + 1) / total * 100) + '%';
    var s = idx ? atual.slides[idx - 1] : null;
    $('#ap-notas').innerHTML = '<b>Nota para o professor</b>' + esc(s && s.n ? s.n : 'Sem nota para este slide.');
    if (!$('#ap-faixa').hidden) marcaFaixa();
  }
  function vai(d) { var total = atual.slides.length + 1, n = Math.max(0, Math.min(total - 1, idx + d)); if (n === idx) return; idx = n; mostra(d); }
  function vaiPara(n) { var d = n > idx ? 1 : -1; if (n === idx) return; idx = n; mostra(d); }
  function sair() {
    $('#apresentador').hidden = true; document.body.style.overflow = ($('#painel').hidden && $('#editor').hidden) ? '' : 'hidden';
    try { if (document.fullscreenElement) document.exitFullscreen(); } catch (e) {}
    $('#ap-quadro').innerHTML = '';
  }
  var notasLigadas = false;
  function faixa() {
    var f = $('#ap-faixa'), on = f.hidden;
    f.hidden = !on; $('#bt-grade').setAttribute('aria-pressed', String(on));
    if (on) { f.innerHTML = [null].concat(atual.slides).map(function (s, k) { return '<button type="button" class="mini" data-ir-ap="' + k + '">' + tela(atual, k) + '<span>' + (k + 1) + (k ? '. ' + esc(rotulo(s)) : '. Capa') + '</span></button>'; }).join(''); observa(f); marcaFaixa(); }
  }
  function marcaFaixa() { $('#ap-faixa').querySelectorAll('.mini').forEach(function (m, k) { m.setAttribute('aria-current', String(k === idx)); if (k === idx) m.scrollIntoView({ block: 'nearest', inline: 'center' }); }); }
  function mexeu() { var a = $('#apresentador'); a.classList.remove('oculto'); clearTimeout(timerOculta); timerOculta = setTimeout(function () { if ($('#ap-faixa').hidden) a.classList.add('oculto'); }, 2600); }
  function telaCheia() { var a = $('#apresentador'); try { if (document.fullscreenElement) document.exitFullscreen(); else if (a.requestFullscreen) a.requestFullscreen(); } catch (e) {} }

  /* ---------- impressão / PDF ---------- */
  function imprimir(slug) {
    var d = acha(slug); if (!d) return;
    var box = $('#impressao');
    box.innerHTML = [0].concat(d.slides.map(function (_, k) { return k + 1; })).map(function (k) { return tela(d, k); }).join('');
    box.hidden = false; observa(box);
    box.querySelectorAll('.tela').forEach(function (t) { t.style.setProperty('--k', (1122 / 1920).toFixed(5)); });
    box.querySelectorAll('img').forEach(function (i) { i.loading = 'eager'; });
    setTimeout(function () { window.print(); box.hidden = true; }, 600);
  }

  /* ---------- editor ---------- */
  var CAMPOS = {
    capa: [['titulo', 'Título', 'linha'], ['sub', 'Subtítulo', 'linha'], ['tema', 'Tema', 'linha'], ['disc', 'Disciplina', 'disc'], ['img', 'Imagem da capa', 'img']],
    topicos: [['titulo', 'Título', 'linha'], ['itens', 'Tópicos (um por linha)', 'lista']],
    conceito: [['termo', 'Conceito', 'linha'], ['def', 'Definição', 'texto'], ['ex', 'Exemplo', 'texto']],
    citacao: [['texto', 'Citação', 'texto'], ['autor', 'Autor', 'linha'], ['obra', 'Obra ou fonte', 'linha']],
    compara: [['titulo', 'Título', 'linha'], ['a.nome', 'Coluna 1: nome', 'linha'], ['a.itens', 'Coluna 1: itens (um por linha)', 'lista'], ['b.nome', 'Coluna 2: nome', 'linha'], ['b.itens', 'Coluna 2: itens (um por linha)', 'lista']],
    tempo: [['titulo', 'Título', 'linha'], ['marcos', 'Marcos (um por linha, assim: data | acontecimento)', 'marcos']],
    bio: [['nome', 'Nome', 'linha'], ['datas', 'Datas', 'linha'], ['itens', 'Tópicos (um por linha)', 'lista']],
    debate: [['pergunta', 'Pergunta', 'texto'], ['itens', 'Pistas para o debate (uma por linha)', 'lista']],
    resumo: [['itens', 'Pontos para lembrar (um por linha)', 'lista'], ['enem', 'Dica para o Enem', 'texto']]
  };
  var NOMES = { topicos: 'Tópicos', conceito: 'Conceito', citacao: 'Citação', compara: 'Comparação', tempo: 'Linha do tempo', bio: 'Biografia', debate: 'Debate', resumo: 'Resumo e Enem' };
  var MODELO = {
    topicos: { t: 'topicos', titulo: 'Novo tópico', itens: ['Primeiro ponto', 'Segundo ponto', 'Terceiro ponto'] },
    conceito: { t: 'conceito', termo: 'Conceito', def: 'Escreva aqui a definição.', ex: 'Um exemplo do dia a dia.' },
    citacao: { t: 'citacao', texto: 'Escreva aqui a citação.', autor: 'Autor', obra: 'Obra' },
    compara: { t: 'compara', titulo: 'Comparação', a: { nome: 'Lado A', itens: ['Característica', 'Característica'] }, b: { nome: 'Lado B', itens: ['Característica', 'Característica'] } },
    tempo: { t: 'tempo', titulo: 'Linha do tempo', marcos: [['Data', 'Acontecimento'], ['Data', 'Acontecimento'], ['Data', 'Acontecimento']] },
    bio: { t: 'bio', nome: 'Nome', datas: 'nascimento – morte', itens: ['Fato importante', 'Obra principal', 'Ideia central'] },
    debate: { t: 'debate', pergunta: 'Pergunta para a turma?', itens: ['Pista 1', 'Pista 2', 'Pista 3'] },
    resumo: { t: 'resumo', itens: ['Ponto 1', 'Ponto 2', 'Ponto 3'], enem: '' }
  };
  var ed = { deck: null, i: 0, tSalva: 0, tPrev: 0, confirma: '' };
  function pega(o, p) { return p.split('.').reduce(function (a, k) { return a == null ? a : a[k]; }, o); }
  function poe(o, p, v) { var ks = p.split('.'), a = o; for (var k = 0; k < ks.length - 1; k++) { if (a[ks[k]] == null) a[ks[k]] = {}; a = a[ks[k]]; } a[ks[ks.length - 1]] = v; }
  var linhas = function (v) { return String(v || '').split('\n').map(function (x) { return x.trim(); }).filter(Boolean); };

  function editar(slug) {
    var d = acha(slug); if (!d) return;
    ed.deck = clone(d); ed.i = 0; ed.confirma = '';
    fechar();
    var e = $('#editor');
    e.hidden = false; document.body.style.overflow = 'hidden';
    montaEditor();
    try { history.replaceState(null, '', '#editar-' + slug); } catch (er) {}
  }
  function montaEditor() {
    var d = ed.deck;
    $('#ed-nome').textContent = d.titulo || 'Sem título';
    $('#ed-lista').innerHTML = [null].concat(d.slides).map(function (s, k) {
      return '<div class="ed-item' + (k === ed.i ? ' ed-item--on' : '') + '"><button type="button" class="mini" data-ed-ir="' + k + '">' + tela(d, k) + '<span>' + (k + 1) + '. ' + esc(k ? rotulo(s) : 'Capa') + '</span></button>' +
        (k ? '<div class="ed-acoes"><button type="button" data-ed-acao="sobe" data-k="' + k + '" aria-label="Subir slide ' + (k + 1) + '"' + (k < 2 ? ' disabled' : '') + '>↑</button><button type="button" data-ed-acao="desce" data-k="' + k + '" aria-label="Descer slide ' + (k + 1) + '"' + (k === d.slides.length ? ' disabled' : '') + '>↓</button><button type="button" data-ed-acao="dup" data-k="' + k + '" aria-label="Duplicar slide ' + (k + 1) + '">⧉</button><button type="button" data-ed-acao="apaga" data-k="' + k + '" aria-label="Apagar slide ' + (k + 1) + '"' + (d.slides.length < 2 ? ' disabled' : '') + '>✕</button></div>' : '') + '</div>';
    }).join('') + '<div class="ed-novo"><label for="ed-tipo">Novo slide</label><select id="ed-tipo">' + Object.keys(NOMES).map(function (k) { return '<option value="' + k + '">' + NOMES[k] + '</option>'; }).join('') + '</select><button type="button" class="btn btn--glass" data-ed-add>' + ICON.mais + ' Adicionar</button></div>';
    observa($('#ed-lista'));
    var it = $('#ed-lista .ed-item--on'); if (it) it.scrollIntoView({ block: 'nearest' });
    previa();
    formulario();
  }
  function previa() { var q = $('#ed-quadro'); q.innerHTML = slideHTML(ed.deck, ed.i); ajusta(q); if (ro) ro.observe(q); encaixa(q); }
  function campo(f, val) {
    var id = 'f-' + f[0].replace('.', '-'), rot = '<label for="' + id + '">' + esc(f[1]) + '</label>';
    if (f[2] === 'linha') return '<div class="ed-campo">' + rot + '<input id="' + id + '" type="text" data-campo="' + f[0] + '" data-tipo="linha" value="' + esc(val) + '"></div>';
    if (f[2] === 'texto') return '<div class="ed-campo">' + rot + '<textarea id="' + id + '" rows="3" data-campo="' + f[0] + '" data-tipo="texto">' + esc(val) + '</textarea></div>';
    if (f[2] === 'lista') return '<div class="ed-campo">' + rot + '<textarea id="' + id + '" rows="6" data-campo="' + f[0] + '" data-tipo="lista">' + esc((val || []).join('\n')) + '</textarea></div>';
    if (f[2] === 'marcos') return '<div class="ed-campo">' + rot + '<textarea id="' + id + '" rows="6" data-campo="' + f[0] + '" data-tipo="marcos">' + esc((val || []).map(function (m) { return m[0] + ' | ' + m[1]; }).join('\n')) + '</textarea></div>';
    if (f[2] === 'disc') return '<div class="ed-campo">' + rot + '<select id="' + id + '" data-campo="disc" data-tipo="linha"><option' + (val === 'Filosofia' ? ' selected' : '') + '>Filosofia</option><option' + (val === 'Sociologia' ? ' selected' : '') + '>Sociologia</option></select></div>';
    if (f[2] === 'img') {
      var ext = val && !/^data:/.test(val) ? val : '';
      return '<div class="ed-campo ed-img">' + rot + '<input id="' + id + '" type="url" inputmode="url" placeholder="Cole o endereço de uma imagem (https://...)" data-campo="img" data-tipo="linha" value="' + esc(ext) + '">' +
        '<div class="ed-img-acoes"><label class="btn btn--glass btn--peq">Enviar do computador<input type="file" accept="image/*" data-ed-arquivo hidden></label>' + (val ? '<button type="button" class="btn btn--glass btn--peq" data-ed-semimg>Remover imagem</button>' : '') + '</div>' +
        (/^data:/.test(val || '') ? '<p class="ed-dica">Imagem enviada do seu computador.</p>' : '') + '<p class="ed-dica">Use imagens livres ou suas. A imagem enviada fica guardada só neste navegador.</p></div>';
    }
    return '';
  }
  function formulario() {
    var d = ed.deck, k = ed.i, s = k ? d.slides[k - 1] : d, fs = k ? (CAMPOS[s.t] || []) : CAMPOS.capa, html = '';
    html += '<h3>' + (k ? 'Slide ' + (k + 1) + ' · ' + esc(NOMES[s.t] || '') : 'Capa da apresentação') + '</h3>';
    html += fs.map(function (f) { return campo(f, pega(s, f[0])); }).join('');
    if (k) html += campo(['n', 'Nota para o professor (aparece só no modo apresentação)', 'texto'], s.n || '');
    html += '<div class="ed-rodape">';
    if (ehNovo(d.slug)) html += '<button type="button" class="btn btn--perigo btn--peq" data-ed-excluir>' + (ed.confirma === 'excluir' ? 'Clique de novo para excluir' : 'Excluir apresentação') + '</button>';
    else html += '<button type="button" class="btn btn--glass btn--peq" data-ed-restaurar' + (ehEditado(d.slug) ? '' : ' disabled') + '>' + (ed.confirma === 'restaurar' ? 'Clique de novo para desfazer tudo' : 'Restaurar original') + '</button>';
    html += '<button type="button" class="btn btn--glass btn--peq" data-ed-duplicar>' + ICON.copia + ' Duplicar apresentação</button></div>';
    $('#ed-form').innerHTML = html;
  }
  function alterou(imediato) {
    clearTimeout(ed.tPrev); clearTimeout(ed.tSalva);
    $('#ed-status').textContent = 'Salvando…';
    ed.tPrev = setTimeout(function () {
      previa();
      var mini = $('#ed-lista .ed-item--on .tela'); if (mini) { mini.innerHTML = slideHTML(ed.deck, ed.i); encaixa(mini); }
      var lab = $('#ed-lista .ed-item--on .mini span'); if (lab) lab.textContent = (ed.i + 1) + '. ' + (ed.i ? rotulo(ed.deck.slides[ed.i - 1]) : 'Capa');
      $('#ed-nome').textContent = ed.deck.titulo || 'Sem título';
    }, imediato ? 0 : 120);
    ed.tSalva = setTimeout(salvaAgora, imediato ? 0 : 500);
  }
  function salvaAgora() {
    clearTimeout(ed.tSalva);
    if (!ed.deck) return true;
    var ok = guarda(clone(ed.deck));
    $('#ed-status').textContent = ok ? 'Salvo neste navegador' : 'Não deu para salvar: o espaço do navegador acabou. Use imagens menores ou endereços de imagem.';
    $('#ed-status').classList.toggle('ed-status--erro', !ok);
    var rs = $('[data-ed-restaurar]'); if (rs && ok && !ehNovo(ed.deck.slug)) rs.disabled = false;
    return ok;
  }
  function fechaEditor() {
    var slug = ed.deck && ed.deck.slug;
    salvaAgora();
    $('#editor').hidden = true; document.body.style.overflow = '';
    $('#ed-quadro').innerHTML = ''; $('#ed-lista').innerHTML = '';
    ed.deck = null;
    catalogo(); destaque();
    if (slug && acha(slug)) abrir(slug); else { try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {} }
  }
  function lerArquivo(f) {
    if (!f || !/^image\//.test(f.type)) return;
    var fr = new FileReader();
    fr.onload = function () {
      var im = new Image();
      im.onload = function () {
        var max = 1280, w = im.naturalWidth, h = im.naturalHeight, r = Math.min(1, max / Math.max(w, h));
        var c = document.createElement('canvas'); c.width = Math.round(w * r); c.height = Math.round(h * r);
        c.getContext('2d').drawImage(im, 0, 0, c.width, c.height);
        ed.deck.img = c.toDataURL('image/jpeg', .82); delete ed.deck.cred;
        formulario(); alterou(true); atualizaListaInteira();
      };
      im.src = fr.result;
    };
    fr.readAsDataURL(f);
  }
  function atualizaListaInteira() { setTimeout(montaEditor, 10); }
  function acaoSlide(a, k) {
    var sl = ed.deck.slides, j = k - 1;
    if (a === 'sobe' && j > 0) { sl.splice(j - 1, 0, sl.splice(j, 1)[0]); ed.i = k - 1; }
    else if (a === 'desce' && j < sl.length - 1) { sl.splice(j + 1, 0, sl.splice(j, 1)[0]); ed.i = k + 1; }
    else if (a === 'dup') { sl.splice(j + 1, 0, clone(sl[j])); ed.i = k + 1; }
    else if (a === 'apaga' && sl.length > 1) { sl.splice(j, 1); ed.i = Math.min(k, sl.length); }
    ed.confirma = '';
    montaEditor(); alterou(true);
  }
  function criar(base) {
    var d = base ? clone(base) : { disc: filtro === 'Sociologia' ? 'Sociologia' : 'Filosofia', titulo: 'Nova apresentação', sub: 'Escreva o subtítulo', tema: 'Minhas apresentações', img: '', slides: [clone(MODELO.topicos), clone(MODELO.conceito), clone(MODELO.debate), clone(MODELO.resumo)] };
    d.slug = novoSlug();
    if (base) { d.titulo = d.titulo + ' (cópia)'; d.tema = 'Minhas apresentações'; }
    st().novos.unshift(d);
    if (!grava()) { st().novos.shift(); alert('Não há espaço no navegador para criar outra apresentação.'); return; }
    editar(d.slug);
  }

  /* ---------- PowerPoint (editável) ---------- */
  function carregaPptx() {
    if (window.PptxGenJS) return Promise.resolve();
    if (carregaPptx.p) return carregaPptx.p;
    carregaPptx.p = new Promise(function (ok, falha) {
      var s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/pptxgenjs@4.0.1/dist/pptxgen.bundle.js';
      s.onload = function () { ok(); }; s.onerror = function () { carregaPptx.p = null; falha(new Error('script')); };
      document.head.appendChild(s);
    });
    return carregaPptx.p;
  }
  function carregaImagem(src) {
    if (!src) return Promise.resolve(null);
    var pega = /^data:/.test(src) ? Promise.resolve(src) : fetch(src, { mode: 'cors', referrerPolicy: 'no-referrer' }).then(function (r) { if (!r.ok) throw new Error('img'); return r.blob(); }).then(function (b) {
      return new Promise(function (ok) { var fr = new FileReader(); fr.onload = function () { ok(fr.result); }; fr.readAsDataURL(b); });
    });
    return pega.then(function (du) { return new Promise(function (ok) { var im = new Image(); im.onload = function () { ok(im); }; im.onerror = function () { ok(null); }; im.src = du; }); }).catch(function () { return null; });
  }
  function recorte(im, bw, bh, py) {
    var ar = bw / bh, w = im.naturalWidth, h = im.naturalHeight, sw, sh, sx, sy;
    if (w / h > ar) { sh = h; sw = h * ar; sx = (w - sw) / 2; sy = 0; } else { sw = w; sh = w / ar; sx = 0; sy = (h - sh) * py; }
    var c = document.createElement('canvas'); c.width = Math.round(Math.min(1400, sw)); c.height = Math.round(c.width / ar);
    var g = c.getContext('2d'); g.drawImage(im, sx, sy, sw, sh, 0, 0, c.width, c.height);
    var grd = g.createLinearGradient(0, 0, c.width * .35, 0);
    if (py >= 0) { grd.addColorStop(0, 'rgba(14,12,16,1)'); grd.addColorStop(1, 'rgba(14,12,16,0)'); g.fillStyle = grd; g.fillRect(0, 0, c.width * .35, c.height); }
    return c.toDataURL('image/jpeg', .86).replace(/^data:/, '');
  }
  function recorteBio(im, bw, bh) {
    var ar = bw / bh, w = im.naturalWidth, h = im.naturalHeight, sw, sh, sx, sy;
    if (w / h > ar) { sh = h; sw = h * ar; sx = (w - sw) / 2; sy = 0; } else { sw = w; sh = w / ar; sx = 0; sy = (h - sh) * .2; }
    var c = document.createElement('canvas'); c.width = Math.round(Math.min(1100, sw)); c.height = Math.round(c.width / ar);
    var g = c.getContext('2d'); g.drawImage(im, sx, sy, sw, sh, 0, 0, c.width, c.height);
    var grd = g.createLinearGradient(c.width, 0, c.width * .6, 0); grd.addColorStop(0, 'rgba(14,12,16,1)'); grd.addColorStop(1, 'rgba(14,12,16,0)');
    g.fillStyle = grd; g.fillRect(c.width * .6, 0, c.width * .4, c.height);
    return c.toDataURL('image/jpeg', .86).replace(/^data:/, '');
  }
  function montaPptx(d, im) {
    var p = new window.PptxGenJS();
    p.layout = 'LAYOUT_WIDE'; p.title = d.titulo; p.author = 'Fil&Soc'; p.subject = d.disc + ' · ' + (d.tema || '');
    var ACC = d.disc === 'Sociologia' ? '4F8FF7' : 'E0372C', TIT = 'Bebas Neue', TXT = 'Arial', INK = 'F2EBDD', MUT = 'AAA3AD', CX = '1D1A20', total = d.slides.length + 1;
    var up = function (t) { return String(t || '').toUpperCase(); };
    function base(i) {
      var s = p.addSlide(); s.background = { color: '0E0C10' };
      s.addText(up(d.disc + ' · ' + d.titulo), { x: .6, y: .3, w: 9.5, h: .4, fontFace: TXT, fontSize: 11, bold: true, color: ACC, charSpacing: 2 });
      s.addText([{ text: 'FIL', options: { color: 'E0372C' } }, { text: '&', options: { color: INK } }, { text: 'SOC', options: { color: 'E0372C' } }], { x: .6, y: 6.85, w: 2, h: .4, fontFace: TIT, fontSize: 20 });
      s.addText((i + 1) + ' / ' + total, { x: 11.1, y: 6.85, w: 1.6, h: .4, align: 'right', fontFace: TXT, fontSize: 12, color: MUT });
      return s;
    }
    var bul = function (itens, o) { return (itens || []).map(function (t) { return { text: t, options: Object.assign({ bullet: { indent: 18 }, paraSpaceAfter: 8 }, o || {}) }; }); };
    var num = function (itens) { return (itens || []).map(function (t) { return { text: t, options: { bullet: { type: 'number', indent: 26 }, paraSpaceAfter: 10 } }; }); };
    // capa
    var s = base(0);
    if (im) s.addImage({ data: recorte(im, 6.6, 7.5, .22), x: 6.73, y: 0, w: 6.6, h: 7.5 });
    var tl = (d.titulo || '').length;
    s.addText(up(d.titulo), { x: .6, y: 1.3, w: 6.3, h: 2.9, fontFace: TIT, fontSize: Math.min(tl > 22 ? 50 : tl > 12 ? 62 : 76, Math.floor(6.3 * 72 / (Math.max.apply(null, (d.titulo || 'x').split(/\s+/).map(function (w) { return w.length; })) * .62))), color: INK, valign: 'bottom', fit: 'shrink', lineSpacingMultiple: .85 });
    s.addText(d.sub || '', { x: .6, y: 4.35, w: 6, h: 1.1, fontFace: TXT, fontSize: 20, color: 'E4DCCB', valign: 'top', fit: 'shrink' });
    if (d.tema) s.addText(d.tema, { x: .6, y: 5.55, w: 3.4, h: .45, fontFace: TXT, fontSize: 12, bold: true, color: INK, align: 'center', shape: p.ShapeType.roundRect, rectRadius: .08, line: { color: '5A555C', width: 1 } });
    if (im && d.cred) s.addText('Imagem: ' + d.cred[0] + ' · ' + d.cred[1] + ' · Wikimedia Commons', { x: 6.9, y: 7.12, w: 6.2, h: .3, fontSize: 8, color: 'CFCFCF', align: 'right', fontFace: TXT });
    d.slides.forEach(function (sl, k) {
      var s = base(k + 1);
      switch (sl.t) {
        case 'topicos':
          s.addText(up(sl.titulo), { x: .6, y: .85, w: 12.1, h: 1.2, fontFace: TIT, fontSize: 48, color: INK, fit: 'shrink' });
          s.addText(num(sl.itens), { x: .7, y: 2.2, w: 11.8, h: 4.4, fontFace: TXT, fontSize: (sl.itens || []).length > 5 ? 20 : 23, color: INK, valign: 'top', fit: 'shrink' });
          break;
        case 'conceito':
          s.addText(up(sl.termo), { x: .6, y: 1, w: 12.1, h: 1.3, fontFace: TIT, fontSize: 60, color: ACC, fit: 'shrink' });
          s.addText(sl.def || '', { x: .6, y: 2.45, w: 12, h: 1.9, fontFace: TXT, fontSize: 26, bold: true, color: INK, valign: 'top', fit: 'shrink' });
          if (sl.ex) s.addText(sl.ex, { x: .6, y: 4.55, w: 12.1, h: 1.7, fontFace: TXT, fontSize: 19, color: 'E4DCCB', fill: { color: CX }, line: { color: ACC, width: 1.5 }, margin: 14, valign: 'middle', fit: 'shrink' });
          break;
        case 'citacao':
          s.addText('“', { x: .5, y: .7, w: 1.5, h: 1.4, fontFace: 'Georgia', fontSize: 110, color: ACC });
          s.addText(up(sl.texto), { x: .6, y: 1.95, w: 12, h: 3.1, fontFace: TIT, fontSize: (sl.texto || '').length > 100 ? 36 : 46, color: INK, valign: 'middle', fit: 'shrink' });
          s.addText([{ text: sl.autor || '', options: { bold: true, fontSize: 22, color: INK, breakLine: true } }, { text: sl.obra || '', options: { fontSize: 15, color: MUT } }], { x: .6, y: 5.2, w: 12, h: 1.1, fontFace: TXT, valign: 'top' });
          break;
        case 'compara':
          s.addText(up(sl.titulo), { x: .6, y: .85, w: 12.1, h: 1.1, fontFace: TIT, fontSize: 46, color: INK, fit: 'shrink' });
          [sl.a || {}, sl.b || {}].forEach(function (c, j) {
            s.addText([{ text: up(c.nome), options: { fontFace: TIT, fontSize: 30, color: j ? INK : ACC, breakLine: true, paraSpaceAfter: 10 } }].concat(bul(c.itens, { fontSize: 18, color: INK })),
              { x: .6 + j * 6.15, y: 2.15, w: 5.95, h: 4.35, fontFace: TXT, valign: 'top', margin: 16, fill: { color: CX }, line: { color: j ? '4A464E' : ACC, width: 1.5 }, fit: 'shrink' });
          });
          break;
        case 'tempo':
          s.addText(up(sl.titulo), { x: .6, y: .85, w: 12.1, h: 1.1, fontFace: TIT, fontSize: 46, color: INK, fit: 'shrink' });
          var ms = sl.marcos || [], cw = 12.1 / Math.max(1, ms.length);
          s.addShape(p.ShapeType.line, { x: .6, y: 2.45, w: 12.1, h: 0, line: { color: ACC, width: 2.5 } });
          ms.forEach(function (m, j) {
            s.addShape(p.ShapeType.ellipse, { x: .6 + j * cw, y: 2.3, w: .3, h: .3, fill: { color: ACC }, line: { color: ACC } });
            s.addText([{ text: up(m[0]), options: { fontFace: TIT, fontSize: 26, color: ACC, breakLine: true, paraSpaceAfter: 6 } }, { text: m[1] || '', options: { fontFace: TXT, fontSize: 15, color: INK } }],
              { x: .6 + j * cw, y: 2.8, w: cw - .2, h: 3.6, valign: 'top', fit: 'shrink' });
          });
          break;
        case 'bio':
          var x0 = im ? 5.55 : .6;
          if (im) s.addImage({ data: recorteBio(im, 5.3, 7.5), x: 0, y: 0, w: 5.3, h: 7.5 });
          s.addText(up(sl.nome), { x: x0, y: .9, w: 13.33 - x0 - .6, h: 1.2, fontFace: TIT, fontSize: 52, color: INK, fit: 'shrink' });
          s.addText(sl.datas || '', { x: x0, y: 2.05, w: 7, h: .5, fontFace: TXT, fontSize: 18, bold: true, color: ACC });
          s.addText(num(sl.itens), { x: x0 + .1, y: 2.75, w: 13.33 - x0 - .8, h: 3.8, fontFace: TXT, fontSize: 19, color: INK, valign: 'top', fit: 'shrink' });
          break;
        case 'debate':
          s.addShape(p.ShapeType.ellipse, { x: 6.27, y: .85, w: .8, h: .8, fill: { color: ACC }, line: { color: ACC } });
          s.addText('?', { x: 6.27, y: .85, w: .8, h: .8, align: 'center', valign: 'middle', fontFace: TXT, bold: true, fontSize: 28, color: 'FFFFFF' });
          s.addText(up(sl.pergunta), { x: .8, y: 1.85, w: 11.7, h: 2.8, fontFace: TIT, fontSize: (sl.pergunta || '').length > 75 ? 38 : 48, color: INK, align: 'center', valign: 'middle', fit: 'shrink' });
          s.addText((sl.itens || []).join('     •     '), { x: .8, y: 4.9, w: 11.7, h: 1.3, fontFace: TXT, fontSize: 17, color: 'E4DCCB', align: 'center', valign: 'top', fit: 'shrink' });
          break;
        case 'resumo':
          s.addText([{ text: 'PARA ', options: { color: INK } }, { text: 'LEMBRAR', options: { color: ACC } }], { x: .6, y: .85, w: 12, h: 1.1, fontFace: TIT, fontSize: 48 });
          s.addText((sl.itens || []).map(function (t) { return { text: t, options: { bullet: { code: '2713', indent: 26 }, paraSpaceAfter: 8 } }; }), { x: .7, y: 2.05, w: 11.8, h: sl.enem ? 3 : 4.4, fontFace: TXT, fontSize: 21, color: INK, valign: 'top', fit: 'shrink' });
          if (sl.enem) s.addText([{ text: 'ENEM   ', options: { fontFace: TIT, fontSize: 26, color: ACC } }, { text: sl.enem, options: { fontFace: TXT, fontSize: 16, color: INK } }], { x: .6, y: 5.25, w: 12.1, h: 1.25, fill: { color: CX }, line: { color: ACC, width: 1.5 }, margin: 14, valign: 'middle', fit: 'shrink' });
          break;
      }
      if (sl.n) s.addNotes(sl.n);
    });
    return p;
  }
  function baixarPptx(slug, bt) {
    var d = acha(slug); if (!d) return;
    var txt = bt ? bt.innerHTML : '';
    if (bt) { bt.disabled = true; bt.textContent = 'Preparando…'; }
    var volta = function (m) { if (bt) { bt.disabled = false; bt.innerHTML = txt; } if (m) aviso(m); };
    Promise.all([carregaPptx(), carregaImagem(img(d.img))]).then(function (r) {
      return montaPptx(d, r[1]).writeFile({ fileName: (d.titulo || 'apresentacao').replace(/[\\/:*?"<>|]+/g, '').slice(0, 60) + '.pptx' }).then(function () { volta(r[1] || !d.img ? 'PowerPoint baixado. Abra no PowerPoint, Google Apresentações ou Keynote para editar.' : 'PowerPoint baixado sem a imagem (ela não pôde ser copiada).'); });
    }).catch(function () { volta('Não foi possível gerar o PowerPoint agora. Verifique a internet e tente de novo.'); });
  }
  function aviso(m) { var a = $('#aviso'); a.textContent = m; a.hidden = false; clearTimeout(aviso.t); aviso.t = setTimeout(function () { a.hidden = true; }, 5200); }

  /* ---------- backup das edições e créditos ---------- */
  function exportaEdicoes() {
    var b = new Blob([JSON.stringify(st())], { type: 'application/json' }), a = document.createElement('a');
    a.href = URL.createObjectURL(b); a.download = 'filsoc-slides-minhas-edicoes.json'; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function importaEdicoes(f) {
    var fr = new FileReader();
    fr.onload = function () {
      try {
        var d = JSON.parse(fr.result), s = st();
        if (!d || typeof d !== 'object') throw 0;
        Object.keys(d.edits || {}).forEach(function (k) { if (original(k)) s.edits[k] = d.edits[k]; });
        (d.novos || []).forEach(function (n) { if (n && n.slug && n.slides && !ehNovo(n.slug)) s.novos.push(n); });
        aviso(grava() ? 'Edições importadas.' : 'Não coube no espaço do navegador.');
        catalogo(); destaque();
      } catch (e) { aviso('Arquivo inválido.'); }
    };
    fr.readAsText(f);
  }
  function creditos() {
    var p = $('#painel'), ds = decks().filter(function (d) { return d.cred; });
    p.innerHTML = '<div class="painel-caixa painel-caixa--texto" role="dialog" aria-modal="true" aria-labelledby="cred-t"><button type="button" class="fechar" data-fechar aria-label="Fechar">' + ICON.x + '</button>' +
      '<h2 id="cred-t">Créditos das imagens</h2><p>As imagens vêm do Wikimedia Commons, em domínio público ou com licença livre. As licenças CC BY e CC BY-SA pedem que o autor seja citado, por isso o crédito aparece na capa de cada apresentação.</p><ul class="cred-lista">' +
      ds.map(function (d) { return '<li><b>' + esc(d.titulo) + '</b><span>' + esc(d.cred[0]) + ' · ' + esc(d.cred[1]) + ' · <a href="' + esc(d.cred[2]) + '" target="_blank" rel="noopener">ver no Commons</a></span></li>'; }).join('') + '</ul></div>';
    p.hidden = false; document.body.style.overflow = 'hidden'; $('.fechar', p).focus();
  }

  /* ---------- eventos ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target : e.target.parentElement; if (!t) return;
    var x;
    if ((x = t.closest('[data-apresentar]'))) { if (!$('#editor').hidden) salvaAgora(); apresentar(x.dataset.apresentar, +(x.dataset.ir || 0)); return; }
    if ((x = t.closest('[data-editar]'))) { editar(x.dataset.editar); return; }
    if ((x = t.closest('[data-pptx]'))) { baixarPptx(x.dataset.pptx, x); return; }
    if (t.closest('[data-criar]')) { criar(); return; }
    if ((x = t.closest('[data-abrir]'))) { abrir(x.dataset.abrir); return; }
    if (t.closest('[data-fechar]')) { fechar(); return; }
    if ((x = t.closest('[data-imprimir]'))) { imprimir(x.dataset.imprimir); return; }
    if ((x = t.closest('[data-filtro]'))) { filtro = x.dataset.filtro; document.querySelectorAll('[data-filtro]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === x)); }); catalogo(); return; }
    if ((x = t.closest('[data-ir-ap]'))) { vaiPara(+x.dataset.irAp); return; }
    if (t.closest('[data-creditos]')) { creditos(); return; }
    if (t.closest('[data-exportar]')) { exportaEdicoes(); return; }
    // editor
    if (t.closest('[data-ed-fechar]')) { fechaEditor(); return; }
    if ((x = t.closest('[data-ed-ir]'))) { ed.i = +x.dataset.edIr; ed.confirma = ''; montaEditor(); return; }
    if ((x = t.closest('[data-ed-acao]'))) { acaoSlide(x.dataset.edAcao, +x.dataset.k); return; }
    if (t.closest('[data-ed-add]')) { var tp = $('#ed-tipo').value; ed.deck.slides.splice(ed.i, 0, clone(MODELO[tp])); ed.i = ed.i + 1; montaEditor(); alterou(true); var c = $('#ed-form input, #ed-form textarea'); if (c) c.focus(); return; }
    if (t.closest('[data-ed-semimg]')) { ed.deck.img = ''; delete ed.deck.cred; formulario(); alterou(true); atualizaListaInteira(); return; }
    if (t.closest('[data-ed-apresentar]')) { salvaAgora(); apresentar(ed.deck.slug, ed.i); return; }
    if (t.closest('[data-ed-pptx]')) { salvaAgora(); baixarPptx(ed.deck.slug, t.closest('[data-ed-pptx]')); return; }
    if (t.closest('[data-ed-duplicar]')) { salvaAgora(); var base = clone(ed.deck); $('#editor').hidden = true; criar(base); return; }
    if (t.closest('[data-ed-restaurar]')) {
      if (ed.confirma !== 'restaurar') { ed.confirma = 'restaurar'; formulario(); return; }
      delete st().edits[ed.deck.slug]; grava(); ed.deck = clone(original(ed.deck.slug)); ed.i = 0; ed.confirma = ''; montaEditor(); $('#ed-status').textContent = 'Original restaurado'; return;
    }
    if (t.closest('[data-ed-excluir]')) {
      if (ed.confirma !== 'excluir') { ed.confirma = 'excluir'; formulario(); return; }
      var sl = ed.deck.slug; st().novos = st().novos.filter(function (d) { return d.slug !== sl; }); grava(); ed.deck = null; $('#editor').hidden = true; document.body.style.overflow = ''; catalogo(); return;
    }
    if (t === $('#painel')) fechar();
  });
  document.addEventListener('input', function (e) {
    var el = e.target;
    if (!ed.deck || !el.closest || !el.closest('#ed-form') || !el.dataset.campo) return;
    var s = ed.i ? ed.deck.slides[ed.i - 1] : ed.deck, v = el.value, tp = el.dataset.tipo;
    if (tp === 'lista') v = linhas(v);
    else if (tp === 'marcos') v = linhas(v).map(function (l) { var j = l.indexOf('|'); return j < 0 ? [l, ''] : [l.slice(0, j).trim(), l.slice(j + 1).trim()]; });
    if (el.dataset.campo === 'img') { v = v.trim(); delete ed.deck.cred; }
    poe(s, el.dataset.campo, v);
    if (el.dataset.campo === 'disc') { alterou(true); atualizaListaInteira(); return; }
    ed.confirma = '';
    alterou();
  });
  document.addEventListener('change', function (e) {
    var el = e.target;
    if (el.matches && el.matches('[data-ed-arquivo]') && el.files && el.files[0]) lerArquivo(el.files[0]);
    if (el.matches && el.matches('[data-importar]') && el.files && el.files[0]) { importaEdicoes(el.files[0]); el.value = ''; }
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
    if (e.key === 'Escape' && !$('#editor').hidden && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { fechaEditor(); return; }
    if (e.key === 'Escape' && !$('#painel').hidden) fechar();
  });
  var x0 = null;
  $('#ap-palco').addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  $('#ap-palco').addEventListener('touchend', function (e) { if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) vai(dx < 0 ? 1 : -1); x0 = null; }, { passive: true });
  document.addEventListener('fullscreenchange', ajustaQuadro);
  if ('ResizeObserver' in window) new ResizeObserver(ajustaQuadro).observe($('#ap-palco'));
  window.addEventListener('pagehide', function () { if (ed.deck) salvaAgora(); });

  window.FILSOC_SLIDE = slideHTML;
  window.FILSOC = { decks: decks, encaixa: encaixa, montaPptx: montaPptx, editar: editar, acha: acha };
  catalogo();
  destaque();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { encaixa(); });
  var h = location.hash.replace('#', '');
  if (h.indexOf('editar-') === 0 && acha(h.slice(7))) editar(h.slice(7));
  else if (h && acha(h)) abrir(h);
})();
