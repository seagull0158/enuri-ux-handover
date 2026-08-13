(function () {
  'use strict';

  var projects = window.PROJECTS || [];
  var cardList = document.getElementById('cardList');
  var sideNavList = document.getElementById('sideNavList');
  var summaryList = document.getElementById('summaryList');
  var emptyMessage = document.getElementById('emptyMessage');

  var state = { status: 'all' };

  var STATUS_CLASS = {
    '반영 완료': 'badge--done',
    '디자인 완료': 'badge--design',
    '홀딩': 'badge--hold',
    '보류': 'badge--hold',
    '확인 필요': 'badge--check'
  };

  // 필터 매칭: 'hold-check'는 홀딩·보류·확인 필요를 묶어서 처리
  function matchesStatus(p, filter) {
    if (filter === 'all') return true;
    var statuses = [p.status, p.secondaryStatus].filter(Boolean);
    if (filter === 'hold-check') {
      return statuses.some(function (s) {
        return s === '홀딩' || s === '보류' || s === '확인 필요';
      });
    }
    return statuses.indexOf(filter) !== -1;
  }

  var EXT_ICON =
    '<svg class="ext-icon" viewBox="0 0 12 12" fill="none" aria-hidden="true">' +
    '<path d="M4.5 1.5H1.5v9h9V7.5M7 1h4v4M11 1 5.5 6.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function extLink(label, url, primary) {
    var a = el('a', 'link-btn' + (primary ? ' link-btn--primary' : ''));
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.innerHTML = esc(label) + EXT_ICON +
      '<span class="visually-hidden">(새 창에서 열림)</span>';
    return a;
  }

  function badge(text, cls) {
    var b = el('span', 'badge ' + cls);
    b.textContent = text;
    return b;
  }

  function sectionLabel(text) {
    return el('p', 'section-label', esc(text));
  }

  // 메인 프로젝트 번호가 바뀌어도 문구가 따라오도록 조사(와/과)까지 자동 처리
  function sameFigmaNote(number) {
    var last = number.charAt(number.length - 1);
    var particle = '2459'.indexOf(last) !== -1 ? '와' : '과';
    return number + particle + ' 동일한 Figma 파일 사용';
  }

  /* ---------- 상단 요약 (3개) ---------- */
  function renderSummary() {
    function countBy(filter) {
      return projects.filter(function (p) { return matchesStatus(p, filter); }).length;
    }
    var items = [
      { label: '디자인 완료', num: countBy('디자인 완료') },
      { label: '반영 완료', num: countBy('반영 완료') },
      { label: '홀딩·확인 필요', num: countBy('hold-check') }
    ];
    items.forEach(function (it) {
      var li = el('li', 'summary-item');
      li.innerHTML = '<span class="num">' + it.num + '</span><span class="label">' + esc(it.label) + '</span>';
      summaryList.appendChild(li);
    });
  }

  /* ---------- 문서 사용 기준 / 추가 입력 필요 ---------- */
  function renderGuide() {
    var g = window.USAGE_GUIDE;
    if (!g) return;
    document.getElementById('guideTitle').textContent = g.title;
    var steps = document.getElementById('guideSteps');
    g.steps.forEach(function (s) {
      var li = el('li');
      li.textContent = s;
      steps.appendChild(li);
    });
    document.getElementById('guideNote').textContent = g.note || '';
  }

  function renderPending() {
    var listEl = document.getElementById('pendingList');
    (window.PENDING_INPUTS || []).forEach(function (t) {
      var li = el('li');
      li.textContent = t;
      listEl.appendChild(li);
    });
  }

  /* ---------- 사이드 내비게이션 ---------- */
  function renderNav() {
    projects.forEach(function (p) {
      var li = el('li');
      var a = el('a');
      a.href = '#' + p.id;
      a.dataset.target = p.id;
      a.innerHTML =
        '<span class="nav-num">' + esc(p.number) + '</span>' + esc(p.title) +
        '<span class="nav-status">' + esc(p.status) + (p.secondaryStatus ? ' · ' + esc(p.secondaryStatus) : '') + '</span>';
      li.appendChild(a);
      sideNavList.appendChild(li);
    });
  }

  /* ---------- 프로젝트 카드 ---------- */
  function renderCard(p) {
    var card = el('article', 'project-card');
    card.id = p.id;

    // 1~2. 번호·프로젝트명 (+ 링크 복사)
    var top = el('div', 'card-top');
    var heading = el('div');
    heading.appendChild(el('p', 'card-num', esc(p.number)));
    heading.appendChild(el('h2', 'card-title', esc(p.title)));
    if (p.subtitle) heading.appendChild(el('p', 'card-subtitle', esc(p.subtitle)));
    top.appendChild(heading);
    card.appendChild(top);

    // 3. 상태 배지
    var badges = el('div', 'badge-row');
    badges.appendChild(badge(p.status, STATUS_CLASS[p.status] || 'badge--design'));
    if (p.secondaryStatus) {
      badges.appendChild(badge(p.secondaryStatus, (STATUS_CLASS[p.secondaryStatus] || 'badge--design') + ' badge--sub'));
    }
    card.appendChild(badges);

    // 4. 대상 / 기간 / 기준
    var meta = el('div', 'card-meta');
    meta.appendChild(el('span', null, '<span class="meta-label">대상</span>' + p.platforms.map(esc).join(' · ')));
    if (p.period) meta.appendChild(el('span', null, '<span class="meta-label">기간</span>' + esc(p.period)));
    if (p.referenceDate) meta.appendChild(el('span', null, '<span class="meta-label">기준</span>' + esc(p.referenceDate)));
    card.appendChild(meta);

    // 업무 범위 요약 (통합 프로젝트 등, 짧은 라인만)
    if (p.scopeLines && p.scopeLines.length) {
      var scope = el('ul', 'scope-list');
      p.scopeLines.forEach(function (t) {
        var li = el('li');
        li.textContent = t;
        scope.appendChild(li);
      });
      card.appendChild(scope);
    }

    // 5. Prototype / Figma / 일감 버튼
    var links = el('div', 'link-row');
    if (p.prototypeUrl) links.appendChild(extLink('Prototype', p.prototypeUrl, true));
    if (p.figmaUrl) links.appendChild(extLink(p.figmaLabel || 'Figma', p.figmaUrl, !p.prototypeUrl));
    (p.taskUrls || []).forEach(function (t) {
      links.appendChild(extLink(t.label, t.url, false));
    });
    // URL 미확인 자료: 비활성 버튼 (링크처럼 보이지 않게)
    (p.pendingLinks || []).forEach(function (label) {
      var span = el('span', 'link-btn link-btn--disabled');
      span.setAttribute('aria-disabled', 'true');
      span.textContent = label;
      links.appendChild(span);
    });
    if (links.children.length) card.appendChild(links);

    // 하위업무 한 줄 (P03)
    if (p.subWorkLine) {
      card.appendChild(el('p', 'subwork-line', esc(p.subWorkLine)));
    }

    // 연결 업무 서브 카드 (메인 카드 하단, 독립 프로젝트 아님)
    if (p.relatedWork) {
      var rw = p.relatedWork;
      var rwSub = el('div', 'sub-card');
      rwSub.appendChild(el('p', 'sub-card-label', '연결 업무'));
      rwSub.appendChild(el('h3', 'sub-card-title', esc(rw.title)));
      if (rw.platforms && rw.platforms.length) {
        var rwMeta = el('div', 'card-meta');
        rwMeta.appendChild(el('span', null, '<span class="meta-label">대상</span>' + rw.platforms.map(esc).join(' · ')));
        rwSub.appendChild(rwMeta);
      }
      if (rw.taskUrls && rw.taskUrls.length) {
        var rwLinks = el('div', 'link-row');
        rw.taskUrls.forEach(function (t) { rwLinks.appendChild(extLink(t.label, t.url, false)); });
        rwSub.appendChild(rwLinks);
      }
      if (rw.sameFigma) {
        rwSub.appendChild(el('p', 'same-figma', esc(sameFigmaNote(p.number))));
      }
      card.appendChild(rwSub);
    }

    // 6. 관련 문서 — 문서가 있는 프로젝트에만
    if (p.docs && p.docs.length) {
      card.appendChild(sectionLabel('관련 문서'));
      var docList = el('ul', 'doc-list');
      p.docs.forEach(function (d) {
        var li = el('li');
        if (d.url) {
          li.appendChild(extLink(d.label, d.url, false));
        } else {
          li.innerHTML = '<code>' + esc(d.label) + '</code>' +
            (d.note ? ' <span class="doc-note">— ' + esc(d.note) + '</span>' : '');
        }
        docList.appendChild(li);
      });
      card.appendChild(docList);
    }

    if (p.pdfDocument) {
      var d = p.pdfDocument;
      var docSub = el('div', 'sub-card');
      docSub.appendChild(el('p', 'sub-card-label', '관련 문서'));
      var docCard = el('div', 'doc-card');
      docCard.appendChild(el('div', 'doc-icon', 'PDF'));
      var body = el('div', 'doc-body');
      body.appendChild(el('h3', 'sub-card-title', esc(d.title)));
      body.appendChild(el('p', 'doc-meta',
        '파일 형식 ' + esc(d.format) + ' · 분량 ' + esc(d.pages) + ' · 작성자 ' + esc(d.author)));
      body.appendChild(el('p', 'doc-summary', esc(d.summary)));
      var docLinks = el('div', 'link-row');
      docLinks.appendChild(extLink('PDF 새 창으로 보기', d.file, true));
      var dl = el('a', 'link-btn');
      dl.href = d.file;
      dl.setAttribute('download', '');
      dl.textContent = 'PDF 다운로드';
      docLinks.appendChild(dl);
      body.appendChild(docLinks);
      docCard.appendChild(body);
      docSub.appendChild(docCard);
      card.appendChild(docSub);
    }

    // 연결 프로젝트 / 연결 업무 (앵커 이동)
    if (p.linkedProject) {
      var linked = projects.filter(function (x) { return x.id === p.linkedProject.id; })[0];
      if (linked) {
        var lp = el('div', 'linked-line');
        lp.appendChild(el('span', 'section-label section-label--inline', esc(p.linkedProject.label)));
        var a = el('a', 'linked-project-link');
        a.href = '#' + linked.id;
        a.textContent = linked.number + ' ' + linked.title;
        a.addEventListener('click', function (e) {
          e.preventDefault();
          scrollToCard(linked.id);
        });
        lp.appendChild(a);
        if (p.linkedProject.status) {
          lp.appendChild(badge(p.linkedProject.status, (STATUS_CLASS[p.linkedProject.status] || 'badge--design') + ' badge--sub'));
        }
        card.appendChild(lp);
      }
    }

    // 7. 확인 필요 — 실제 미확정 사항이 있는 경우에만
    if (p.checkNeeded && p.checkNeeded.length) {
      card.appendChild(sectionLabel('확인 필요'));
      var checks = el('ul', 'check-list');
      p.checkNeeded.forEach(function (t) {
        var li = el('li');
        li.textContent = t;
        checks.appendChild(li);
      });
      card.appendChild(checks);
    }

    return card;
  }

  function renderCards() {
    projects.forEach(function (p) {
      cardList.appendChild(renderCard(p));
    });
  }

  /* ---------- 필터 ---------- */
  function applyFilters() {
    var visible = 0;
    projects.forEach(function (p) {
      var card = document.getElementById(p.id);
      var show = matchesStatus(p, state.status);
      card.hidden = !show;
      if (show) visible++;
    });
    emptyMessage.hidden = visible > 0;
  }

  function bindFilterGroup(groupId, dataKey, stateKey) {
    var group = document.getElementById(groupId);
    group.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      state[stateKey] = btn.dataset[dataKey];
      Array.prototype.forEach.call(group.querySelectorAll('.filter-btn'), function (b) {
        var active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      applyFilters();
    });
  }

  /* ---------- 앵커 이동 / 활성 내비 ---------- */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function scrollToCard(id) {
    var card = document.getElementById(id);
    if (!card) return;
    card.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', '#' + id);
    setActiveNav(id);
  }

  function setActiveNav(id) {
    Array.prototype.forEach.call(sideNavList.querySelectorAll('a'), function (a) {
      a.classList.toggle('is-active', a.dataset.target === id);
    });
  }

  sideNavList.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    scrollToCard(a.dataset.target);
  });

  // 스크롤 시 현재 카드 하이라이트
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActiveNav(entry.target.id);
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    window.addEventListener('load', function () {
      Array.prototype.forEach.call(document.querySelectorAll('.project-card'), function (c) {
        observer.observe(c);
      });
    });
  }

  /* ---------- 초기화 ---------- */
  renderSummary();
  renderGuide();
  renderNav();
  renderCards();
  renderPending();
  bindFilterGroup('statusFilters', 'status', 'status');
  if (location.hash) {
    var initial = location.hash.slice(1);
    if (document.getElementById(initial)) {
      setActiveNav(initial);
      document.getElementById(initial).scrollIntoView();
    }
  }
})();
